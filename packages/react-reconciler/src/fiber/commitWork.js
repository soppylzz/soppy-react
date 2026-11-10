import { ChildDeletion, Placement, Update } from "./flags"
import { HostRoot, HostText } from "./workTags"
import { updateProperties } from "./hostConfig"

function hostNode(fiber) {
  return fiber.tag === HostRoot ? fiber.stateNode.containerInfo : fiber.stateNode
}

function commitMutationEffects(fiber) {
  if (fiber.flags & ChildDeletion) {
    for (const child of fiber.deletions) hostNode(fiber).removeChild(child.stateNode)
    fiber.deletions = null
  }
  if (fiber.subtreeFlags) {
    for (let child = fiber.child; child; child = child.sibling) {
      commitMutationEffects(child)
    }
  }
  if (fiber.flags & Placement) {
    // Insert before the next stable host sibling, or append at the end.
    let before = fiber.sibling
    while (before && before.flags & Placement) before = before.sibling
    hostNode(fiber.return).insertBefore(fiber.stateNode, before?.stateNode ?? null)
    fiber.flags &= ~Placement
  }
  if (fiber.flags & Update) {
    if (fiber.tag === HostText) fiber.stateNode.nodeValue = fiber.memoizedProps
    else updateProperties(fiber.stateNode, fiber.alternate.memoizedProps, fiber.memoizedProps)
  }
}

export function commitRoot(root, finishedWork) {
  // Keep the previous tree current until all host mutations have completed.
  if (root.current.memoizedState === null) root.containerInfo.textContent = ""
  commitMutationEffects(finishedWork)
  root.current = finishedWork
  const queue = finishedWork.updateQueue
  const callbacks = queue.callbacks ?? []
  queue.callbacks = null
  for (const callback of callbacks) callback()
}
