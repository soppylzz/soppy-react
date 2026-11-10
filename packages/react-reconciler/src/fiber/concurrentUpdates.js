import { HostRoot } from "./workTags"

export function markUpdateLaneFromFiberToRoot(sourceFiber) {
  // for now, only implement function of finding FiberRootNode
  let node = sourceFiber
  let parent = sourceFiber.return

  while (parent !== null) {
    node = parent
    parent = parent.return
  }

  if (node.tag === HostRoot) {
    return node.stateNode
  }
  return null
}
