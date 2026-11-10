import { scheduleCallback } from "@soppy-react/scheduler"
import { createWorkInProgress } from "./fiber"
import { beginWork } from "./beginWork"

import { completeWork } from "./completeWork"
import { commitRoot } from "./commitWork"

let ownerDocument

/**
 * NOTICE: WIP-fiber of current processing fiber
 */
let workInProgress = null

const prepareFreshStack = (root) => {
  ownerDocument = root.containerInfo.ownerDocument ?? root.containerInfo
  workInProgress = createWorkInProgress(root.current, null)
}

function renderRootSync(root) {
  // build fiber tree
  prepareFreshStack(root)
  // actual workLoopConcurrent here
  workLoopSync()
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate
  const next = beginWork(current, unitOfWork)
  unitOfWork.memoizedProps = unitOfWork.pendingProps

  if (next === null) {
    completeUnitOfWork(unitOfWork)
  } else {
    workInProgress = next
  }
}

function completeUnitOfWork(unit) {
  // Finish ancestors until a sibling provides the next unit of work.
  let fiber = unit
  do {
    completeWork(fiber.alternate, fiber, ownerDocument)
    if (fiber.sibling) {
      workInProgress = fiber.sibling
      return
    }
    fiber = fiber.return
  } while (fiber)
  workInProgress = null
}

function performConcurrentWorkOnRoot(root) {
  root.callbackScheduled = false
  renderRootSync(root)
  commitRoot(root, root.current.alternate)
}

export function scheduleUpdateOnFiber(root) {
  if (!root || root.callbackScheduled) return
  root.callbackScheduled = true
  scheduleCallback(() => performConcurrentWorkOnRoot(root))
}
