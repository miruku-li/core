import HyperHTMLElement from "/vendor/hyperhtmlelement.js"
import merge from "/vendor/mergerino.js"

export default class extends HyperHTMLElement {

	constructor(props) {
		super().attachShadow({mode: 'open'})
		Object.assign(this, props)
	}

	patch(payload, options) {
		const {detail, render, notify} = Object(options)
		//console.log('patch', payload, options)
		this.state = merge(this.state, payload)
		if (render!==false) this.render()
		if (notify!==false) this.dispatchEvent(new CustomEvent('change', {detail, bubble: true}))
	}
}
