import { createFiberRoot } from "./root"
import { createUpdate, enqueueUpdate } from "./updateQueue"
import { scheduleUpdateOnFiber } from "./workLoop"

export function createContainer(containerInfo) {
  return createFiberRoot(containerInfo)
}

/**
 * @param {*} element VNode
 * @param {*} container FiberRootNode
 */
export function updateContainer(element, container, parentComponent, callback) {
  const current = container.current

  const update = createUpdate()
  update.payload = { element }
  callback = callback === undefined ? null : callback
  if (callback !== null) {
    update.callback = callback
  }

  const root = enqueueUpdate(current, update)

  // do updates here
  scheduleUpdateOnFiber(root)
}
