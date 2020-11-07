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
    *  [demo](https://miruku.li/#data:text/javascript;charset=utf-8;base64,Y29uc3QgbmFtZSA9ICJhLWIiOwpjdXN0b21FbGVtZW50cy5kZWZpbmUoImEtYiIsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQgewogICAgY29uc3RydWN0b3IoKSB7CiAgICAgICAgc3VwZXIoKSwKICAgICAgICB0aGlzLmlubmVySFRNTCA9ICI8YnV0dG9uPiM8L2J1dHRvbj4iLAogICAgICAgICh0aGlzLmJ0biA9IHRoaXMucXVlcnlTZWxlY3RvcigiYnV0dG9uIikpLm9uY2xpY2sgPSAoKT0+ewogICAgICAgICAgICB0aGlzLnZhbHVlID0gTWF0aC5mbG9vcig2ICogTWF0aC5yYW5kb20oKSksCiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoImNoYW5nZSIpKQogICAgICAgIH0KICAgIH0KICAgIGdldCBkZWZhdWx0VmFsdWUoKSB7CiAgICAgICAgcmV0dXJuICIjIgogICAgfQogICAgZ2V0IHZhbHVlKCkgewogICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSQKICAgIH0KICAgIHNldCB2YWx1ZShhKSB7CiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICJfdmFsdWUkIiwgewogICAgICAgICAgICBjb25maWd1cmFibGU6ICEwLAogICAgICAgICAgICB2YWx1ZTogYQogICAgICAgIH0pLAogICAgICAgIHRoaXMuYnRuLmlubmVySFRNTCA9IHRoaXMudmFsdWUKICAgIH0KfQopOwpleHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5nZXQoImEtYiIpOwo=)
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
