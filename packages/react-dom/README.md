# @soppy-react/react-dom

This package exports `createRoot` from both `@soppy-react/react-dom` and `@soppy-react/react-dom/client`. It currently creates a root wrapper whose `_internalRoot.containerInfo` refers to the supplied container. Rendering and unmounting are pending implementation.

It uses `@soppy-react/react-reconciler` to create the internal root and declares `@soppy-react/react` as a peer dependency.
