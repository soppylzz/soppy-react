# @soppy-react/react-reconciler

Use this package to trace a root update from the shared update queue through the Fiber work loop. The scheduler starts a synchronous render pass. `beginWork` reconciles host elements and text, and `completeWork` assembles detached nodes and bubbles mutation flags.

During commit, `commitRoot` applies deletions, placements, and updates before switching the current tree. The renderer supports HTML elements, text, and flat child arrays, including moves of keyed siblings.
