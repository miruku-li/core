import HyperHTMLElement from "/vendor/hyperhtmlelement.js"
import merge from "/vendor/mergerino.js"

export default class extends HyperHTMLElement {

	constructor(props) {
		super().attachShadow({mode: 'open'})
		Object.assign(this, props) // FIXME use crelt aproach
	}

	// @override alway together !
	set state(value) { this.change(value, { mode: 'override', render: false , notify: false }) }
	get state() { return this._state$ || (this.state = this.defaultState); }

	// @override
	setState(state, render) {
		this.change(state, { mode: 'shallow', render, notify: false})
	}

	change(payload, options) {
		const {subject, verb, mode = 'merge', render, notify,  } = Object(options)
		console.log(subject, verb, mode, render, notify)
		if (mode=='shallow') {
			payload = typeof payload === 'function' ? payload.call(this, this.state) : payload;
			Object.assign(this.state, payload)
		} else {
			Object.defineProperty(this, '_state$', {
					configurable: true,
					value: mode=='override' ? payload : merge(this.state, payload)
			});
		}
		if (render!==false) this.render()
		if (notify!==false) this.dispatchEvent(new CustomEvent('change', {
			detail: {subject, verb, mode, render, notify}, bubble: true}))
	}
}
