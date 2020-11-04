import HyperHTMLElement from "/vendor/hyperhtmlelement.js"
import merge from "/vendor/mergerino.js"

const {log} = console

export default class extends HyperHTMLElement {

	constructor() {
		super().attachShadow({mode: 'open'})
	}

	// @override alway together !
	set state(value) { this.change(value, { mode: 'override', render: false , notify: false }) }
	get state() {	return this._state$ ?? this.defaultState }

	// @override
	setState(state, render) { this.change(state, { mode: 'shallow', render, notify: false}) }

	change(payload, options) {
		const {who, what, mode = 'merge', render, notify} = Object(options)
		if (mode=='shallow') {
			payload = typeof payload === 'function' ? payload.call(this, this.state) : payload;
			Object.assign(this.state, payload)
		} else {
			Object.defineProperty(this, '_state$', {
					configurable: true,
					value: mode=='override' ? payload : merge(this.state, payload)
			});
		}
		if (render !== false) {
			console.log('render')
			this.render()
		}
		if (notify!==false) this.dispatchEvent(new CustomEvent('change', {
			detail: {who, what, when: Date.now(), payload,mode, render, notify}, bubble: true}))
	}
}
