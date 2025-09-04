export function throttle<F extends (...args: unknown[]) => void>(
  func: F,
  delay: number
) {
  let lastCall = 0
  return function (...args: Parameters<F>) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}
