import m from '/vndr/mithril.mod.js'
import b from '/vendor/bss.js'
import {encode, decode} from '/vendor/lzstring.js'
import {debounce} from './utils.js'
import FS from './fragment.js'

const {log, clear} = console; clear()

let value;

const index = {
  oninit: () => {
    value = FS.get('value')
    FS.on = () => {
      value = FS.get('value')
      m.redraw()
    }
  }, view: () => m('div'+b`d flex; fd column`,
    m('textarea'+b`h 10em`, {
      value,
      oninput: ({target}) => {
        value = target.value
        FS.set('value', value)
      }
    })
  )
}


m.mount(document.body, index)
