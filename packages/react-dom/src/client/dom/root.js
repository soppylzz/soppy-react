import { createContainer } from "@soppy-react/react-reconciler"

class ReactDOMRoot {
  constructor(/* FiberRootNode */ internalRoot) {
    this._internalRoot = internalRoot
  }
}

export function createRoot(container) {
  // div#root => container => FiberRootNode.containerInfo
  const root = createContainer(container)
  return new ReactDOMRoot(root)
}
