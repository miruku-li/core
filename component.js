import HyperHTMLElement from "/vendor/hyperhtmlelement.js"
import merge from "/vendor/mergerino.js"

export default class extends HyperHTMLElement {

	constructor(props) {
		super().attachShadow({mode: 'open'})
		Object.assign(this, props)
	}

	patch(payload, render, notify) {
		const newState = merge(this.state, payload)
		this.state = newState;
		if (render!=false) this.render();
		if (render!=false) this.dispatchEvent(new CustomEvent('change', {detail: newState}))
	}
}
