function create(Cls, attrs, ...children) {
  let o = new Cls({
    age: 18
  })
  for (const name in attrs) {
    o.setAttribute(name, attrs[name])
  }

  // 遍历children，放到o中
  for (const child of children) {
    // appendChild不是一个好的实践
    // o.appendChild(child)
    o.children.push(child)
  }
  return o
}
class Parent {
  constructor(config) {
    this.children = []
  }
  // property
  set class(val) {
    debugger
    console.log('Parent--class--', val)
  }

  // attr
  setAttribute(name, val) {
    console.log(name, val)
  }

  // children
  // appendChild(child) {
  //   console.log('Parent--appendChild-fn--', child)
  // }
}
class Children {}

let comp = (
  <Parent id='a' class='b'>
    <Children></Children>
    <Children></Children>
  </Parent>
)
// 在jsx中构建顺序是先children后parent
// 被翻译成如下代码
// var comp = create(
//   Parent,
//   {
//     id: 'a',
//     class: 'b'
//   },
//   create(Children, null),
//   create(Children, null)
// )
console.log('comp::', comp)
