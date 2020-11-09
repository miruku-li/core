import m from '/vndr/mithril.mod.js'
import b from '/vendor/bss.js'
import {encode,decode} from '/vendor/lzstring.js'

const {log} = console
let value, data, sync

const index = {
  oninit: () => {
    value = data = read()
    sync = true
    window.onhashchange = () => {
      data = read()
      if (value!=data) {
          value = data
      } sync = true
      m.redraw()
    }
  }, view: () => m('div'+b`d flex; fd column`,
    { run: log('render')},
    m('textarea'+b`h 10em`, {
      oninput: ({target}) => {
        value = target.value
        sync = false
        writeDebounced(value)
      }
    }, value || data),
    m('pre', 'location: ', window.location.href),
    m('pre', 'hash: ', data),
    m('pre', 'sync: ', sync?'in sync':'out of sync'),
  )
}


m.mount(document.body, index)

function read() {
  return decode(window.location.hash.slice(1))
}

function write(data) {
  window.location.hash = encode(data)
}

let debounce
function writeDebounced(data) {
  clearTimeout(debounce)
  debounce = setTimeout(() => {
    write(data)
  }, 666)
}
