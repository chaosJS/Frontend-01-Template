function parse(source) {
  const stack = []

  for (let c of source) {
    if (['(', '[', '{'].includes(c)) stack.push(c)

    if (c === ')') {
      if (stack[stack.length - 1] === '(') stack.pop()
      else return false
    }

    if (c === ']') {
      if (stack[stack.length - 1] === '[') stack.pop()
      else return false
    }

    if (c === '}') {
      if (stack[stack.length - 1] === '{') stack.pop()
      else return false
    }
  }

  if (stack.length === 0) return true
  else return false
}
console.log(parse('x[a(b){c}y]'))
