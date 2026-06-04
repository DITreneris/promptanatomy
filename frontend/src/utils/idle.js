/**
 * Run a task after first paint without blocking the critical path.
 * Uses requestIdleCallback with a timeout fallback, then window load.
 */
export function scheduleIdleTask(task, { timeout = 3000 } = {}) {
  if (typeof window === 'undefined') return

  const run = () => {
    try {
      task()
    } catch {
      /* non-critical background work */
    }
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout })
    return
  }

  if (document.readyState === 'complete') {
    setTimeout(run, 0)
    return
  }

  window.addEventListener('load', run, { once: true })
}
