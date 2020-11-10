

const debounce = (callback, wait = 666, timeout) => (...args) => (
    clearTimeout(timeout),
    timeout = setTimeout(() => callback(...args), wait)
)

const dispatch = (target, type, message) =>
  target.dispatchEvent( new CustomEvent(type, { detail : { message }}));

const queryParam = (url, param, defaultValue) => {
  url = new URL(url)
  let searchParams = new URLSearchParams(url.search)
  if (searchParams.has(param)) {
    return searchParams.get(param) !== '' ? searchParams.get(param) : true
  }
  return defaultValue
}

export {debounce, dispatch, queryParam}
