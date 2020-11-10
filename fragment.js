import {encode, decode} from '/vndr/lz-string.mod.js'
import merge from '/vndr/mergerino.js'
import { queryParam } from './utils.js'

const
  debounce = +queryParam(import.meta.url, 'debounce', 666),
  observers = [],
  state = { }

self.onhashchange = () => {
  clearTimeout(debounceTimeout);
  read()
}

read()


export default {

  get value () {
    return state.value
  },

  set value (value) {
    state.value = value
    write()
  },

  clear() {
      state.value = undefined;
      write()
  },

  update(patch) {
    state.value = merge(state.value, patch)
    write()
  },

  set on (callback) {
    if (typeof callback != 'function') return
    observers.push(callback)
  }
}


// helpers ----------------------------------------------------------------------

let debounceTimeout;

function write () {
  clearTimeout(debounceTimeout)
  const h = '0='+encode(state.value);
  if (state.hash == h) return;
  state.hash = h;
  debounceTimeout = setTimeout( () => {
    self.location.hash = state.hash
  }, debounce)
}

function read () {

  let h = window.location.hash.slice(1);
  if (!h.startsWith('0=')) {
    delete state.value
    return;
  } // console.log('read...', h, state.hash)
  if (h.startsWith('0=') && h != state.hash ) {
      state.hash = h
      state.value = decode(h.slice(2)) || {}
      console.log('>', state)
      observers.forEach(o => o())
  }
}
