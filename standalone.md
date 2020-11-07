# standalone

## url schema

### Init `https://miruku.li/#[src]`
*Examples*
  * local
    * `https://miruku.li/#/null/dummy.js`
    *  [demo](https://miruku.li/#/null/dummy.js)
  * external
    * `https://miruku.li/#//unpkg.com/ace-custom-element`
    *  [demo](https://miruku.li/#//unpkg.com/ace-custom-element)
  * data-url
    * `https://miruku.li/#data:text/javascript;charset=utf-8;...`
    *  [demo](https://miruku.li/#data:text/javascript;charset=utf-8;base64,Y29uc3QgbmFtZT0iYS1iIjtjdXN0b21FbGVtZW50cy5kZWZpbmUoImEtYiIsY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudHtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5pbm5lckhUTUw9IjxidXR0b24+IzwvYnV0dG9uPiIsKHRoaXMuYnRuPXRoaXMucXVlcnlTZWxlY3RvcigiYnV0dG9uIikpLm9uY2xpY2s9KCk9Pnt0aGlzLnZhbHVlPU1hdGguZmxvb3IoNipNYXRoLnJhbmRvbSgpKSx0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCJpbnB1dCIpKX19Z2V0IGRlZmF1bHRWYWx1ZSgpe3JldHVybiJ1RDgzRXVERENBIn1nZXQgdmFsdWUoKXtyZXR1cm4gdGhpcy5fdmFsdWUkfXNldCB2YWx1ZShhKXtPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywiX3ZhbHVlJCIse2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTphfSksdGhpcy5idG4uaW5uZXJIVE1MPXRoaXMudmFsdWV9fSk7ZXhwb3J0IGRlZmF1bHQgY3VzdG9tRWxlbWVudHMuZ2V0KCJhLWIiKTs=)
### Running `https://miruku.li/#0=[lz-encoded-state]`
  * After initialisation, the src is packt into a serializes-lz-encode state object. This hash will be updated after each update (debounce-time: 666ms)
     * [demo hello world](https://miruku.li/#0=N4IgLiBcIJYHYAcCuEA0IBuUQAsCmANgQPYAEA7sQE4EAmIAvkA)


### Configuration
  * cf. http://juicy.github.io/juicy-ace-editor/ or https://www.webcomponents.org/element/ace-custom-element
    * `theme` and `mode` are passed as attributes
    * content ist passed als child element
### FIXME Menu
  * configuration
  * qr-code
  * new
  * copy code
  * set title
