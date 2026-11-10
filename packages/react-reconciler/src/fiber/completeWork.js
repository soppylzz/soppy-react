import { Update } from "./flags"
import { HostComponent, HostText } from "./workTags"
import { updateProperties } from "./hostConfig"

export function completeWork(current, fiber, ownerDocument) {
  // Children complete first. Only append to newly created nodes in the render phase.
  if (fiber.tag === HostComponent || fiber.tag === HostText) {
    if (current) {
      if (current.memoizedProps !== fiber.pendingProps) fiber.flags |= Update
    } else if (fiber.tag === HostText) {
      fiber.stateNode = ownerDocument.createTextNode(fiber.pendingProps)
    } else {
      const node = ownerDocument.createElement(fiber.type)
      updateProperties(node, {}, fiber.pendingProps)
      for (let child = fiber.child; child; child = child.sibling) {
        node.appendChild(child.stateNode)
      }
      fiber.stateNode = node
    }
  }
  for (let child = fiber.child; child; child = child.sibling) {
    fiber.subtreeFlags |= child.flags | child.subtreeFlags
  }
}
