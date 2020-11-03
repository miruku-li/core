import HyperHTMLElement from "/vendor/hyperhtmlelement.js"
import merge from "/vendor/mergerino.js"

const {log} = console

export default class extends HyperHTMLElement {

	constructor(props) {
		super().attachShadow({mode: 'open'})
		Object.assign(this, props) // FIXME use crelt aproach
	}

	//override
	// set state(value) { this.change(value, { mode: 'override'}) }

	//override
	//setState(state, render) {
	//	this.change(state, { mode: 'shallow', render})
	//}

	change(payload, options) {
		const {detail, render, notify, mode} = Object(options)
		this.state = merge(this.state, payload)
		if (render!==false) this.render()
		if (notify!==false) this.dispatchEvent(new CustomEvent('change', {detail, bubble: true}))
	}
}

/*
// currently a state is a shallow copy, like in Preact or other libraries.
// after the state is updated, the render() method will be invoked.
// ⚠️ do not ever call this.setState() inside this.render()
setState(state, render) {
	const target = this.state;
	const source = typeof state === 'function' ? state.call(this, target) : state;
	for (const key in source) target[key] = source[key];
	if (render !== false) this.render();
return this;
}
*/
