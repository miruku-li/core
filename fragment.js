import {encode, decode} from '/vndr/lz-string.mod.js'
import merge from '/vndr/mergerino.js'
import { queryParam } from './utils.js'

const
  //debounce = +queryParam(import.meta.url, 'debounce', 666),
  debounce = 666,
  observers = [],
  state = { }

let debounceTimeout

self.onhashchange = () => {
  clearTimeout(debounceTimeout);
  read()
}

read()


const fragment = {

  set debounce(value) {
    debounce = Math.max(0, ~~Number(value))
  },

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
    const type = typeof patch
    //console.log(patch, type)
    if (type!='object' && type!='function' && patch!==null) {
      //console.log('sc')
      return fragment.value = patch
    } //console.log('<', patch)
    state.value = merge(state.value, patch)
    //console.log('>', state.value)
    write()
  },

  set on (callback) {
    if (typeof callback != 'function') return
    observers.push(callback)
  }
}

export default fragment

// helpers ----------------------------------------------------------------------


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
      state.value = decode(h.slice(2))
      //console.log('>', state)
      observers.forEach(o => o())
  }
}
