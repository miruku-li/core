
export debounce = (callback, wait = 666, timeout) => (...args) => (
    clearTimeout(timeout),
    timeout = setTimeout(() => callback(...args), wait)
)
