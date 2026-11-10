import { createFiber, createWorkInProgress } from "./fiber"
import { ChildDeletion, Placement } from "./flags"
import { processUpdateQueue } from "./updateQueue"
import { HostRoot, HostComponent, HostText } from "./workTags"

function reconcileChildren(current, parent, children) {
  const existing = new Map()
  for (let old = current?.child; old; old = old.sibling) {
    existing.set(old.key ?? old.index, old)
  }

  const values = Array.isArray(children) ? children : [children]
  let previous = null
  let lastPlacedIndex = 0
  parent.child = null
  for (let index = 0; index < values.length; index++) {
    const value = values[index]
    if (value == null || typeof value === "boolean" || value === "") continue
    const isText = typeof value === "string" || typeof value === "number"
    if (!isText && typeof value.type !== "string") {
      throw new TypeError("Expected a host element or text")
    }
    const type = isText ? null : value.type
    const key = isText || value.key == null ? null : String(value.key)
    const props = isText ? String(value) : value.props
    const old = existing.get(key ?? index)
    let child
    if (old && old.type === type) {
      existing.delete(key ?? index)
      child = createWorkInProgress(old, props)
      // A reused child behind the last stable index must move during commit.
      if (old.index < lastPlacedIndex) child.flags |= Placement
      else lastPlacedIndex = old.index
    } else {
      child = createFiber(isText ? HostText : HostComponent, props, key, parent.mode)
      child.type = type
      // New descendants are assembled offscreen by completeWork.
      if (current) child.flags |= Placement
    }
    child.index = index
    child.return = parent
    child.sibling = null
    if (previous) previous.sibling = child
    else parent.child = child
    previous = child
  }
  if (existing.size) {
    parent.deletions = [...existing.values()]
    parent.flags |= ChildDeletion
  }
}

export function beginWork(current, workInProgress) {
  switch (workInProgress.tag) {
    case HostRoot:
      // update.payload => wip.memoizedState, update.cb => wip.updateQueue.cbs
      processUpdateQueue(workInProgress)
      reconcileChildren(current, workInProgress, workInProgress.memoizedState.element)
      break
    case HostComponent:
      reconcileChildren(current, workInProgress, workInProgress.pendingProps.children)
      break
    case HostText:
      break
  }
  return workInProgress.child
}
