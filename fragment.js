import {encode, decode} from '/vndr/lz-string.mod.js'
import merge from '/vndr/mergerino.js'
import xpath from '/vndr/xpath.mod.js'
import { queryParam } from './utils.js'

const observers = [], defaultDebounce = 666

let data, hash, timeout

self.onhashchange = load

load()

// -- api -------------------------------------------------------------------

const fragment = {

  get () {
    return data
  },

  post (payload, debounce) {
    data = payload
    save(debounce)
  },

  clear(debounce) {
      data = undefined
      save(debounce)
  },

  put(payload, debounce) {
    const type = typeof payload
    if (type!='object' && type!='function' && patch!==null) {
      return fragment.post(payload, debounce)
    }
    data = merge(data, payload)
    save(debounce)
  },

  set on (callback) {
    if (typeof callback != 'function') return
    observers.push(callback)
  }

}

export default fragment

// -- helpers ------------------------------------------------------------------

function save (debounce = defaultDebounce) {
  clearTimeout(timeout)
  hash = '#0='+encode(data);
  if (self.location.hash == hash) { return }
  timeout = setTimeout( () => { self.location.hash = hash }, debounce)
}

function load () {
  clearTimeout(timeout)
  if (self.location.hash != hash) {
      hash = self.location.hash
      data = decode(hash.slice(3)) // #0=[lz-encoded data]
      observers.forEach(o => o())
  }
}
