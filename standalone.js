import {encode, decode} from '/vendor/lzstring.js'

const {log} = console

let state = {}, debounce
function oninput ({target}) {
  const {value} = target
  insp.innerHTML = JSON.stringify(value, null, '  ')
  clearTimeout(debounce)
  debounce = setTimeout( () => {
    window.location.hash = `${state.name}<${encode(value)}`
  }, 600)
}

async function process() { // #[cmd:]element?data
  let fragment = window.location.hash.slice(1)
  let [name, value] = decodeURIComponent(fragment).split('<', 2)
  name = name.trim().toLowerCase()
  if (name.length<1) return
  value = decode(value) ?? undefined  // null turns into undefined
  // log('process', {name, value})
  if (state.name != name) { // init new component
    state.name = name
    document.body.innerHTML = '<div id="host"></div><hr><pre id="insp"></pre>'
    document.body.style='display flex; flex-direction: column';
    if (name.match(/^[a-z-]{1,}$/)) {
      log('new tag');
    } else {
      const module = await import(name)
      state.elt = new(module.default)()

    }
    state.elt.value = value
    state.elt.oninput = oninput;
    host.appendChild(state.elt)
    insp.innerHTML = JSON.stringify(value,null, '  ')
    log(name)
    window.location.hash = `${name}<${encode(value)}`
  } else {
    log('stay', name, value)
  }
}

window.addEventListener('hashchange', process)
process()

/*import m from '/vendor/mithril.js'
import s from '/vendor/stream.js'
import b from '/vendor/bss.js'
import {encode, decode} from '/vendor/lzstring.js'

const stringify = (a, b = null, c='  ') => JSON.stringify(a,b,c)

let serial = window.location.hash.slice(1), data = decode(serial)

let debounce

function updateHash() {
	clearTimeout(debounce)
	debounce = setTimeout(() => window.location.hash = '#'+ (serial = encode(data)), 600)
}

function setValue(value) {
	value = typeof value == 'string' ? value
		: typeof value?.value == 'string' ? value.value : ''
	data = {... (typeof data == 'object' ? data : {}), value}
	updateHash()
}



window.addEventListener('hashchange', ({target}) => {
	let newSerial = target.location.hash.slice(1)
	if (serial == newSerial)) return
	data = decode(serial)
	m.redraw()
}, {capture: true})

const index = {
	view: ({attrs}) => m('div'+b`d flex; fd column`,

		m('textarea'+b`height 10em`, {
			oninput: ({target}) => setValue(target),
			value: data?.value ?? data ?? '',
		}),
		m('pre', stringify(data))
	)
}

m.mount(document.body, index)*/
