export function initializeUpdateQueue(fiber) {
  const queue = {
    shared: { pending: /* circular linked list */ null },
  }
  fiber.updateQueue = queue
}
