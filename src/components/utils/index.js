import $ from 'jquery'

const formToObj = (selector) => {
  let arr = undefined
  if (typeof selector === 'string') {
    arr = $(selector).serializeArray()
  } else {
    arr = selector
  }
  return arr
    .reduce((acc, curr) => {
      const tmp = {}
      tmp[curr.name] = curr.value
      return Object.assign({}, acc, tmp)
    }, {})
}

export {formToObj}
