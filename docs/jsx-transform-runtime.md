# 一行 JSX 如何变成 React 元素<sup><code>jsx-transform-runtime</code></sup>

## 1. 编译前的 JSX

```jsx
const button = <button disabled>保存</button>
```

这行 JSX 描述了一个禁用的按钮，文字是“保存”。以 React 18.2.0 为例，下面对照 classic 和 automatic 两种模式，看看编译器如何把同一个标签改写成不同的函数调用。[Babel 的 JSX 转换示例](https://babeljs.io/docs/babel-plugin-transform-react-jsx)

## 2. 通过 classic 模式调用 React.createElement

```js
import React from "react"

const button = React.createElement("button", { disabled: true }, "保存")
```

默认的 classic 转换会生成对 `React.createElement` 的引用，所以上例中的 `import React from "react"` 需要在源码里手动写入。读参数时从左到右看：第一个是元素类型，第二个是属性，后面是子节点。这里 `createElement` 将第三个参数放到 `props.children`。[React 18.2.0 的 createElement 实现](https://github.com/facebook/react/blob/v18.2.0/packages/react/src/ReactElement.js)

## 3. 通过 automatic 模式自动导入 jsx

```js
import { jsx as _jsx } from "react/jsx-runtime"

const button = _jsx("button", { disabled: true, children: "保存" })
```

这次导入由编译器补上，源码只写 JSX 就够了。子节点也由编译器直接写进 `children`。遇到并列的多个 JSX 子节点时，编译器通常改用 `jsxs`；在 React 18.2.0 的生产构建里，`jsx` 和 `jsxs` 指向同一个实现。[React 18.2.0 的 JSX 运行时入口](https://github.com/facebook/react/blob/v18.2.0/packages/react/src/jsx/ReactJSX.js)

两段代码得到的元素都有 `type === "button"`、`props.disabled === true` 和 `props.children === "保存"`。此时还没有 DOM 按钮；元素描述会在后续渲染中交给 React 处理。[React 18.2.0 的 jsx 实现](https://github.com/facebook/react/blob/v18.2.0/packages/react/src/jsx/ReactJSXElement.js)
