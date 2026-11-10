# @soppy-react/scheduler

The reconciler uses `scheduleCallback` to defer root work with `requestIdleCallback`, falling back to a timer when idle callbacks are unavailable. Each scheduled render runs to completion.
