import m from '/vndr/mithril.mod.js'
import b from '/vndr/bss.js'
import f from './fragment.js'

const {log, clear} = console; clear()

const title = () => {
  let {title, body} = Object(f.get())
  if (title) return title
  if (body) {
    body = body.trim().split(/\n/,1)[0]
    if (body.length>32)
      body = body.slice(0, 57)+'…'
    return body
  }
  return 'title'
}

//window.onhashchange = m.redraw
f.on = m.redraw

const index = {
  view: ({state}) => m('div'+b`position relative;d flex;fd column;height 100%`, {
    run: document.title = title()
  },
    m('div'+b`d flex; ai center;border-bottom: 1px solid silver`,
      m('input'+b`fg 1`, {
        placeholder: title(),
        value: f.get()?.title,
        oninput: ({target}) => f.put({title: target.value})
      }),
      m('tt'+b`padding 1ex; c silver`, window.location.hash.length-3, ' bytes'), // ☰
      m('tt'+b`padding 1ex; cursor: pointer`, { onclick: () => f.clear() }, '❌'), // ☰
    ),
    m('textarea'+b`fg 1`, {
      placeholder: 'type here – then share',
      value: f.get()?.body,
      oninput: ({target}) => f.put({ body: target.value })
    })
  )
}

m.mount(document.body, index)
