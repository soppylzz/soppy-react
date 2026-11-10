import { createContainer, updateContainer } from "@soppy-react/react-reconciler"

class ReactDOMRoot {
  constructor(/* FiberRootNode */ internalRoot) {
    this._internalRoot = internalRoot
  }

  render(children) {
    const root = this._internalRoot
    if (root === null) {
      throw new Error("Cannot update an unmounted root")
    }

    updateContainer(children, root, null, null)
  }
}

export function createRoot(container) {
  // div#root => container => FiberRootNode.containerInfo
  const root = createContainer(container)
  return new ReactDOMRoot(root)
}
