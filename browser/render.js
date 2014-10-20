var EventEmitter = require('events').EventEmitter

var navved

module.exports = function(element, nav, json_blob) {
  var ee = new EventEmitter

  ee.routes = {}
  ee.write = function(route) {
    ee.routes[route] && ee.routes[route]()
  }

  render(element, nav, collapse(json_blob), [], ee)

  return ee
}


function render(element, nav, json_blob, path, ee) {
  var keys = Object.keys(json_blob)
  var key
  var ul
  var li

  while(keys.length) {
    key = keys.shift()

    if(typeof json_blob[key] === 'object') {
      ul = document.createElement('ul')
      li = document.createElement('li')

      li.innerHTML = key + '/'

      nav.appendChild(li)
      nav.appendChild(ul)

      render(element, ul, collapse(json_blob[key]), path.concat([key]), ee)
    } else {
      a = document.createElement('a')
      li = document.createElement('li')

      li.appendChild(a)
      nav.appendChild(li)
      a.__data__ = json_blob[key]
      a.__path__ = '/' + path.concat([key]).join('/')
      a.element = element

      ee.routes[a.__path__] = show.bind(ee, a)

      a.__key__ = key
      a.href = '#'

      a.onclick = function(event) {
        event.preventDefault()
        show(this)
        ee.emit('data', this)
      }

      a.innerHTML = '<pre>' + key + '</pre>'
    }
  }
}

function show(obj) {
    obj.element.innerHTML = obj.__data__
    obj.element.scrollIntoView(true)
}

function collapse(blob) {
  if(typeof blob != 'object') {
    return blob
  }

  var result = {}

  var keys = Object.keys(blob)
    , newkey
    , key

  while(keys.length) {
    key = keys.shift()

    if(typeof blob[key] !== 'object') {
      result[key] = blob[key]

      continue
    }

    if(Object.keys(blob[key]).length != 1) {
      result[key] = collapse(blob[key])

      continue

    }

    newkey = Object.keys(blob[key])[0]
    result[key + '/' + newkey] = blob[key][newkey]
    collapse(result[key + '/' + newkey])
  }

  return result
}
