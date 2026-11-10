import { HostRoot } from "./workTags"
import { NoFlags } from "./flags"

/* ==================== core: fiber structure ==================== */
class FiberNode {
  constructor(tag, pendingProps, key, mode) {
    this.tag = tag
    this.type = null
    this.deletions = null
    this.key = key
    this.mode = mode

    this.pendingProps = pendingProps
    this.memoizedProps = null

    // Real DOM belongs to `this` fiber
    // Deps chain: VNode => FiberNode => stateNode
    this.stateNode = null

    /* =============== fiber tree mapping =============== */
    // fiber tree mapping relatives: parent, first-child, next-sibling
    this.return = null
    this.child = null // initial at null, rootFiber can be routed to
    this.sibling = null
    this.index = 0

    this.memoizedState = null

    this.updateQueue = null

    /* =============== side effects (?similar to vue's patch) =============== */
    this.flags = NoFlags
    // a summary of sideEffects updates for subtree nodes, used to
    // optimize recursive traversal (react 18 feat)
    this.subtreeFlags = NoFlags

    // DOM diff releatives
    this.alternate = null
  }
}

/**
 * general factory for creating FiberNode
 *
 * @param {*} tag Fiber type
 * @param {*} pendingProps
 * @param {*} key VNode key
 * @param {*} mode
 */
export const createFiber = (tag, pendingProps, key, mode) =>
  new FiberNode(tag, pendingProps, key, mode)

/* ==================== pack: fiber factory exposed ==================== */
export function createHostRootFiber() {
  // Tip: `createXXXFiber` always create a fiber

  // TODO: add mode auto-calc latter
  return createFiber(HostRoot, null, null, undefined)
}

/**
 * build new-fiber via old-fiber and `pendingProps`
 * @param {*} current Old FiberNode
 * @param {*} pendingProps
 */
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate

  if (workInProgress === null) {
    workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode)

    workInProgress.type = current.type
    workInProgress.stateNode = current.stateNode
    workInProgress.alternate = current

    current.alternate = workInProgress
  } else {
    workInProgress.pendingProps = pendingProps
    workInProgress.type = current.type

    workInProgress.deletions = null
    workInProgress.flags = NoFlags
    workInProgress.subtreeFlags = NoFlags
  }

  workInProgress.child = current.child
  workInProgress.memoizedProps = current.memoizedProps
  workInProgress.memoizedState = current.memoizedState
  workInProgress.updateQueue = current.updateQueue
  workInProgress.sibling = current.sibling
  workInProgress.index = current.index
  return workInProgress
}
