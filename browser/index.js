var json = require('./fsj.json')
var render = require('./render')

module.exports = makePage

function makePage(main, nav) {
  main = main || document.createElement('div')
  nav = nav || document.createElement('ul')

  nav.className = 'navigation'
  main.className = 'main'

  document.body.appendChild(nav)
  document.body.appendChild(main)

  var ee = render(main, nav, json)

  ee.on('data', function(data) {
     window.location.hash = '#!' + data.__path__
  })

  hash = decodeURIComponent(window.location.hash.slice(2))

  ee.write(hash)
}
