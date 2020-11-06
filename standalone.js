import {encode, decode} from '/vendor/lzstring.js'

const {log, info, assert, warn, error, clear} = console; clear()

const model = {}, runtime = {}

function process () {
  let hash, data
  hash = window.location.hash.trim().slice(1)
  if (!hash) return error('FIXME empty hash')
  if (hash.match(/^[a-z]*$/i)) return setHash({t: hash})
  data = decode(hash.slice(2))
  if (data == null) return error('FIXME invalid hash')
  if (data.t) {
    if (!runtime.elem || model.t != data.t) {
      runtime.elem = document.createElement(model.t = data.t)
      runtime.elem.oninput = oninput;
      setValueOf(data)
      mount(slot, runtime.elem)
      return
    } else if (!deepEqual(model.v, data.v)) {
      return setValueOf(data)
    } return
  } else if (data.src) {

  } error('FIXME no tag or src')
}

let debounceOnInput
function oninput () {
  model.v = runtime.elem.value
  inspect.innerHTML = JSON.stringify(model, null, '  ')
  clearTimeout(debounceOnInput)
  debounceOnInput = setTimeout(()=> {
    setHash(model)
  }, 666)
}
function setHash(data) {
  info('sa-sethash', data)
  window.location.hash = '0='+encode(data)
}
function setValueOf(data) {
  if(data.v==undefined) {
    delete model.v
    runtime.elem.value = runtime.elem.defaultValue
  } else {
    runtime.elem.value = model.v = data.v
  } inspect.innerHTML = JSON.stringify(data, null, '  ')
}
function deepEqual(a, b) {
  return JSON.stringify(a)==JSON.stringify(b)
}
function mount(tar, elem) {
  tar.firstChild ? tar.replaceChild(elem, tar.firstChild) : tar.appendChild(elem)
}

window.onload = ()=> {
  document.body.innerHTML = '<div id="slot"></div><pre id="inspect"></pre>'
  process()
}

window.onhashchange = process
