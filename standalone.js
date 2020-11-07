import {encode, decode} from '/vendor/lzstring.js'

const model = {};
let elem, loaded = false

async function process () {
  let hash, data
  hash = window.location.hash.trim().slice(1)
  if (!hash) return //error('empty data fragment')
  !loaded && (document.body.innerHTML = '<div role="host"></div><pre id="inspect"></pre>')
  loaded = true;
  if (!hash.match(/^0=/i)) return setHash({s: hash})
  data = decode(hash.slice(2))
  if (data == null) return error('invalid data fragment')
  if (data.s) {
    if (!elem || model.s != data.s) {
      const modul = await import(model.s=data.s)
      elem = new (modul.default)()

      elem.onchange = onchange;
      setValueOf(data)
      mount(elem)
      return
    } else if (!deepEqual(model.v, data.v)) {
      return setValueOf(data)
    } return
  } error('no src defined')
}

let debounceOnInput
function onchange () {
  model.v = elem.value
  inspect.innerHTML = '[draft] '+JSON.stringify(model, null, '  ')
  clearTimeout(debounceOnInput)
  debounceOnInput = setTimeout(()=> {
    setHash(model)
  }, 666)
}

function setHash(data) {
  inspect.innerHTML = '[synced] ' +JSON.stringify(data, null, '  ')
  window.location.hash = '0='+encode(data)
}

function setValueOf(data) {
  if(data.v==undefined) {
    delete model.v
    elem.value = elem.defaultValue
  } else {
    elem.value = model.v = data.v
  } inspect.innerHTML = '[synced] ' +JSON.stringify(data, null, '  ')
}

function deepEqual(a, b) {
  return JSON.stringify(a)==JSON.stringify(b)
}

function mount(guest) {
  const host = document.querySelector('[role=host]')
  guest.setAttribute('role', 'guest')
  host.firstChild ? host.replaceChild(guest, host.firstChild) : host.appendChild(guest)
}

function error(msg) {
  inspect.innerHTML = '<span style="color: red">'+msg+'</span>'
}

window.onload = ()=> {
  process()
}

window.onhashchange = process
