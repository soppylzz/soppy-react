import { createHostRootFiber } from "./fiber"
import { initializeUpdateQueue } from "./updateQueue"

class FiberRootNode {
  // Tip: `XXXNode` always means VNode
  constructor(containerInfo) {
    this.containerInfo = containerInfo

    // pointe at current rendered root fiber
    this.current = null
  }
}

export function createFiberRoot(containerInfo) {
  // NOTICE: root node has real DOM from the very beginning, not hold a VNode
  const root = new FiberRootNode(containerInfo)

  const uninitializedFiber = createHostRootFiber()

  // bi-binding between VNode and Fiber at root
  root.current = uninitializedFiber
  uninitializedFiber.stateNode = root

  initializeUpdateQueue(uninitializedFiber)

  return root
}
