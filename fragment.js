import {encode, decode} from '/vendor/lzstring.js'
import { queryParam } from './utils.js'

const
  defaultDebounceTime = 666,
  observers = [],
  debug = !!queryParam(import.meta.url, 'debug'),
  {log} = console,
  {stringify} = JSON

let
  data = {},
  currentHash = ''

self.onhashchange = () => {
  clearTimeout(debounceTimeout);
  read()
}

read()

export default {

  // Returns an array representing all keys in this storage
  keys () {
    const keys = Object.keys(data)
    debug && log(`%cfragment.keys() → [${keys}]`, "color: green;");
    return Object.keys(keys)
  },

  // When passed a key name, will return that key's value.
  get (key) {
    debug && console.log(`%cfragment.get(${key}) → ${stringify(data[key])}`, "color: green;");
    return data[key]
  },

  // When passed a key name and value, will add that key to the storage,
  // or update that key's value if it already exists.
  set (key, value, debounce = defaultDebounceTime) {
    data[key] = value
    debug && log(`%cfragment.set(${key}, ${stringify(value)}, ${debounce})`, "color: green;");
    write(debounce)
  },

  // When passed a key name, will remove that key from the storage.
  remove (key, debounce = defaultDebounceTime) {
    delete data[key]
    debug && log(`%cfragment.remove(${key}, ${debounce})`, "color: green;");
    write(debounce)
  },

  // When invoked, will empty all keys out of the storage.
  clear (debounce = defaultDebounceTime) {
    data = {}
    debug && log(`%cfragment.clear(${debounce})`, "color: green;");
    write(debounce)
  },

  // register callback
  // only user input will notify observers
  set on (callback) {
    debug && log(`%cfragment.on = ${callback}`, "color: green;");
    if (typeof callback != 'function') return
    observers.push(callback)
  }
}


// helpers ----------------------------------------------------------------------

let debounceTimeout;

function write (debounce) {
  clearTimeout(debounceTimeout)
  const hash = '0='+encode(data);
  if (currentHash==hash) return;
  debug && console.log(`%cfragment>write fragment update debounced by ${debounce}ms`, "color: blue;");
  currentHash = hash;
  debounceTimeout = setTimeout( () => {
    self.location.hash = currentHash
    debug && console.log(`%cfragment>write fragment updated`, "color: blue;");
  }, debounce)
}

function read () {
  let hash = window.location.hash.slice(1);
  if (!hash.startsWith('0=')) {
    data = {};
    return;
  }
  if (hash.startsWith('0=') && hash != currentHash ) {
      currentHash = hash
      data = decode(hash.slice(2)) || {}
      observers.forEach(o => o())
  }
}
