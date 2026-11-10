import { markUpdateLaneFromFiberToRoot } from "./concurrentUpdates"

export function initializeUpdateQueue(fiber) {
  const queue = {
    shared: { pending: /* circular linked list */ null },
  }
  fiber.updateQueue = queue
}

export function createUpdate() {
  const update = {}
  return update
}

export function enqueueUpdate(fiber, update) {
  const { updateQueue } = fiber
  if (updateQueue === null) {
    // Origin: only occurs if the fiber has been unmounted.
    return null
  }

  /* =============== unsafe render phase update =============== */
  // NORMAL: misc => setState => enqueueUpdate => scheduleUpdate => scheduleUpdate => render
  // UNSAFE: ... => render(setState) => triggerUpdate => render again
  const sharedQueue = updateQueue.shared
  const { pending } = sharedQueue

  if (pending === null) {
    update.next = update
  } else {
    update.next = pending.next
    pending.next = update
  }

  updateQueue.shared.pending = update

  return markUpdateLaneFromFiberToRoot(fiber)
}

export function processUpdateQueue(workInProgress) {
  const queue = workInProgress.updateQueue
  const pending = queue.shared.pending
  if (pending === null) return
  queue.shared.pending = null

  // The tail points back to the oldest update. Apply callbacks in insertion order.
  const first = pending.next
  let update = first
  const callbacks = []
  do {
    // we only care abount last update payload, and all cbs
    workInProgress.memoizedState = update.payload
    if (update.callback) callbacks.push(update.callback)
    update = update.next
  } while (update !== first)
  workInProgress.updateQueue = { shared: queue.shared, callbacks }
}
