# React 18 源码里的 Flow 类型系统<sup><code>type-system</code></sup>

打开 React 18.2.0 的 `packages/shared/ReactTypes.js`，文件扩展名是 `.js`，开头却有 `@flow`，下面还有 `export type`。这是因为 React 18 的核心源码采用 **Flow** 做静态类型检查。我们平时用 TypeScript 写 React 组件，编辑器里的类型提示通常来自 `@types/react`；那是应用侧使用的 TypeScript 声明。[React 18.2.0 的 ReactTypes.js](https://github.com/facebook/react/blob/v18.2.0/packages/shared/ReactTypes.js)

## 1. 读懂一行类型声明

```js
export type ReactText = string | number
```

`ReactText` 是一个类型名，竖线表示“或”。如果参数标成 `ReactText`，传入 `"保存"` 或 `42` 都符合声明，传入 `true` 会被 Flow 报为类型不匹配。这条声明只描述允许的值，构建时会被移除，运行时不会生成名为 `ReactText` 的变量。

## 2. 遇到 Flow 特有的写法

读到 `?T` 时，把它展开成“一个 `T` 值、`null` 或 `undefined`”。例如 `?string` 用熟悉的 TypeScript 语法可以写成 `string | null | undefined`。手写实现时，先读清上游允许哪些值，再选本地的类型写法。[Flow 的可空类型](https://flow.org/en/docs/types/maybe/)
