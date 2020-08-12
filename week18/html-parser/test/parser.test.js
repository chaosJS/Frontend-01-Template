import { parseHTML } from '../src/parser'
let assert = require('assert')

it('parse a single element', () => {
  let doc = parseHTML('<div></div>')
  let div = doc.children[0]
  assert.equal(div.tagName, 'div')
  assert.equal(div.children.length, 0)
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 2)
})

it('self closing tag', () => {
  let doc = parseHTML('<div/>')
  let div = doc.children[0]
  assert.equal(div.tagName, 'div')
})

it('parse a single element with text content', () => {
  let doc = parseHTML('<div>hello</div>')
  let text = doc.children[0].children[0]

  assert.equal(text.content, 'hello')
  assert.equal(text.type, 'text')
})

it('tag name is div1', () => {
  let doc = parseHTML('<div1>hello</div1>')
  let text = doc.children[0].children[0]

  assert.equal(text.content, 'hello')
  assert.equal(text.type, 'text')
})

it('tag mismatch', () => {
  try {
    let doc = parseHTML('<div></vid>')
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match!")
  }
})

it('text with <', () => {
  let doc = parseHTML('<div>a < b</div>')
  let text = doc.children[0].children[0]
  assert.equal(text.content, 'a < b')
  assert.equal(text.type, 'text')
})

it('property value with no quote 1', () => {
  let doc = parseHTML('<div id=a></div>')
  let div = doc.children[0]

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      assert.equal(attr.value, 'a')
    }
  }
})

it('property value with no quote 2', () => {
  let doc = parseHTML('<div id=a/>')
  let div = doc.children[0]

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      assert.equal(attr.value, 'a')
    }
  }
})

it('with property 1', () => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc" ></div>')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.ok(count === 3)
})

it('with property 2', () => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc"></div>')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.ok(count === 3)
})

it('with property 3', () => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc"/>')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.ok(count === 3)
})

it('with property 4', () => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc"checked ></div>')
})

it('before attribute value with \t', () => {
  let doc = parseHTML("<div   data=''></div>")
})

it('before attribute value with >', () => {
  let doc = parseHTML("<div data=>''></div>")
})

it('attribute with no value', () => {
  let doc = parseHTML('<div class />')
})

it('attribute with no value and a new attribute name', () => {
  let doc = parseHTML('<div class id/>')
})

it('script', () => {
  let content = `
    <div>abcd</div>
    <span>x</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script
`
  let doc = parseHTML(`<script>${content}</script>`)
  let text = doc.children[0].children[0]

  assert.equal(text.content, content)
  assert.equal(text.type, 'text')
})

it('script', () => {
  let content = `<`
  let doc = parseHTML(`<script>${content}</script>`)
  let text = doc.children[0].children[0]

  assert.equal(text.content, content)
  assert.equal(text.type, 'text')
})
