// Here are origin source code abstract, we just do a litte changes
import { HostRoot } from "./workTags"
import { NoFlags } from "./flags"

/* ==================== core: fiber structure ==================== */
class FiberNode {
  constructor(tag, pendingProps, key, mode) {
    this.tag = tag
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
    this.child = null
    this.sibling = null

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
 */
const createFiber = (tag, pendingProps, key, mode) => new FiberNode(tag, pendingProps, key, mode)

/* ==================== pack: fiber factory exposed ==================== */
export function createHostRootFiber() {
  // Tip: `createXXXFiber` always create a fiber

  // TODO: add mode auto-calc latter
  return createFiber(HostRoot, null, null, undefined)
}
