import m from '/vndr/mithril.mod.js'
import b from '/vendor/bss.js'
import {encode, decode} from '/vendor/lzstring.js'
import {debounce} from './utils.js'
import f from './fragment.js'

const {log, clear} = console; clear()

const index = {
  oninit: () => {
    f.on = () => {
      log('redraw', f.value)
      m.redraw()
    }
  }, view: () => m('div'+b`d flex; fd column`,
    m('textarea'+b`h 10em`, {
      value: f.value.text,
      oninput: ({target}) => f.update({text: target.value})
    })
  )
}

m.mount(document.body, index)
