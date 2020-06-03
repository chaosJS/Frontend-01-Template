function match(selector, element) {
  const id_reg = /(#\w+)+/g
  const class_reg = /(\.\w+)/g
  const parentheses_reg = /\[(.+?)\]/g
  const id_arr = selector.match(id_reg)
  const class_arr = selector.match(class_reg)
  const parentheses_arr = selector.match(parentheses_reg)
  const element_arr = selector
    .split(' ')
    .filter(
      (s) => s.charAt(0) !== '#' && s.charAt(0) !== '.' && s.charAt(0) !== '['
    )

  let isMatched = 0
  if (id_arr && id_arr[0].charAt(0) === '#') {
    if (element.attributes['id'].value === id_arr[0].substring(1)) {
      isMatched++
    }
  }
  if (class_arr && class_arr[0].charAt(0) === '.') {
    let class_name = element.attributes['class'].value
    if (class_name && class_name === class_arr[0].substring(1)) {
      isMatched++
    }
  }
  if (parentheses_arr) {
    const split_parentheses = parentheses_arr[0]
      .substring(1, parentheses_arr[0].length - 1)
      .split('=')
    if (
      element.attributes[split_parentheses[0]].value === split_parentheses[1]
    ) {
      isMatched++
    }
  }
  if (element_arr[0] === element.tagName.toLowerCase()) {
    isMatched++
  }

  return !!isMatched
}

match('div #id.class', document.getElementById('id'))
