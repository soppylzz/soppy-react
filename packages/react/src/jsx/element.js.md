# ReactElement 为什么写成函数表达式？

React 18.2.0 里，`jsxDEV` 处理完 `key`、`ref` 和 `props` 之后调用 `ReactElement(...)`，拿到的结果是一个带 `$$typeof` 标记的普通对象。上游注释交代了调用方式和这个标记的用途，但没有解释为什么用函数表达式来定义工厂。

## 两种写法

同一个简化工厂，可以写成函数声明，也可以写成赋给 `const` 的函数表达式。

```js
// Function declaration
function ReactElement(type) {
  return { type }
}
```

```js
// Function expression assigned to a const
const ReactElement = function (type) {
  return { type }
}
```

定义之后再调用，两者都返回 `{ type: "button" }`，都没有依赖 React 的内部机制。差别只有两处：名字在什么位置能读到，以及之后还能不能重新赋值。

## 声明之前读不到名字

进入作用域时，JavaScript 已经为 `let` 和 `const` 声明的名字建好绑定，但要执行到声明、完成初始化之后才能读取。这段从进入作用域到初始化完成的时间叫暂时性死区（Temporal Dead Zone，TDZ），期间读取名字会抛 `ReferenceError`。

假设四种写法分别放在独立模块里，名字都叫 `factory`，在声明之前执行 `factory("button")`，结果如下。

| 写法 | 声明前读取 `factory` | 声明前调用 | 初始化后能否重新赋值 |
| --- | --- | --- | --- |
| `function factory() {}` | 拿到函数本身 | 正常执行 | 可以 |
| `var factory = function () {}` | `undefined` | 抛 `TypeError`，`undefined` 不可调用 | 可以 |
| `let factory = function () {}` | 抛 `ReferenceError` | 读取名字时就抛 `ReferenceError` | 可以 |
| `const factory = function () {}` | 抛 `ReferenceError` | 读取名字时就抛 `ReferenceError` | 不可以 |

`var` 的陷阱在于它提前初始化的是变量，初始值为 `undefined`，右侧的函数表达式要等赋值语句执行时才赋上去。函数声明不一样，模块代码开始执行之前，名字已经绑定到函数对象。

## 重新赋值

下面两个名字最初指向同一个函数，给 `declared` 重新赋值后，只有它换了引用。

```js
function declared() {
  return "first"
}
const fixed = declared

declared = () => "second"
declared() // "second"
fixed() // "first"

fixed = declared // TypeError
```

`function` 声明的名字可以重新赋值，所以 `declared` 能指向新函数，旧函数仍然可以通过 `fixed` 调用。`const` 约束的是 `fixed` 这个绑定，最后一行因此抛错。
