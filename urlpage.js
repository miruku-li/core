import m from '/vndr/mithril.mod.js'
import b from '/vendor/bss.js'
import {encode,decode} from '/vendor/lzstring.js'
import {debounce} from './utils.js'

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
    m('textarea'+b`h 10em`, {
      oninput: ({target}) => {
        value = target.value
        sync = false
        dWrite(value)
      }
    }, value ?? data),
    m('pre', `hash[${sync?'in':'out of'} sync]: ${window.location.hash}`),
  )
}


m.mount(document.body, index)

function read() {
  return decode(window.location.hash.slice(1))
}

function write(data) {
  window.location.hash = encode(data)
}
const dWrite = debounce(write, 666)
