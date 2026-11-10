export function scheduleCallback(callback) {
  if (typeof requestIdleCallback === "function") requestIdleCallback(callback)
  else setTimeout(callback, 0)
}
