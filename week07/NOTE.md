# 每周总结可以写在这里

1. 排版布局,如何解析出 cssRules 并且用浏览器完成布局
2. 主要解析了 flex 布局，根据不同的 flex 语法的值完成不同的绘制和合成
3. 找出(css 标准)[https://www.w3.org/TR/?tag=css]中属性相关标准

```javascript
var list = document.getElementById('container').children
var result = []
for (let li of list) {
  if (li.getAttribute('data-tag').match(/css/))
    result.push({
      name: li.children[1].innerText,
      url: li.children[1].children[0].href
    })
}
console.log(result)
// {name: "Requirements for Chinese Text Layout中文排版需求", url: "https://www.w3.org/TR/2020/WD-clreq-20200521/"}
// 2. 在iframe中 解析出CSS 属性相关标准
let iframe = document.createElement('iframe')
document.body.innerHTML = ''
document.body.appendChild(iframe)

function happen(element, event) {
  return new Promise(function (resolve) {
    let handler = () => {
      resolve()
      element.removeEventListener(event, handler)
    }
    element.addEventListener(event, handler)
  })
}
void (async function () {
  for (let standard of result) {
    iframe.src = standard.url
    console.log(standard.name)
    await happen(iframe, 'load')
  }
})()
```
