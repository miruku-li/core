export default (href) => document.head.appendChild(
	Object.assign(
		document.createElement('link'), {
			href,
			rel: 'stylesheet'
        })
)
