# 每周总结可以写在这里

### Range API

1.  一个面试题：子元素逆序

    1.  解法 1:
        ```javascript
        let el = document.getElementById('a')
        function reverseChildren(el) {
          var l = el.childNodes.length;
          whild(l-->0){
            el.appendChild(el.childNodes[l])
          }
        }
        reverseChildren(el)
        ```
    2.  解法 2
        ```javascript
        function rangeReverse(el) {
          let range = new Range()
          range.selectNodeContents(el)
          let fragment = range.extractContents()
          let l = fragment.childNodes.length
          while (l-- > 0) {
            fragment.appendChild(fragment.childNodes[l])
          }
          element.appendChild(fragment)
        }
        rangeReverse(el)
        ```

2.  range API 用途：精确操作 dom
    - var range = new Range()
    - range.setStart(element, 9)
    - range.setEnd(element,4)
    - var range = document.getSelection().getRangeAt(0)
    - range.setStartBefore
    - range.setEndBefore
    - range.setStartAfter
    - range.setEndAfter
    - range.selectNode
    - range.selectNodeContents

### CSSOM

- Rules
  - **document.styleSheets[0].cssRules**
  - **document.styleSheets[0].insertRule()**
    - document.styleSheets[0].insertRule("p{color: pink;}", 0)
  - **document.styleSheets[0].removeRule(0)**
  - **CSSStyleRule** (普通 Rule)
  - CSSCharsetRule
  - CSSImportRule
  - CSSMediaRule
  - CSSFontFaceRule
  - CSSPageRule
  - CSSNamespaceRule
  - CSSKeyframesRule
  - CSSKeyframeRule
  - CSSSupportsRule
  - ...
- getComputedStyle
  - window.getComputedStyle(elt, pseudoElt);
    - elt 想要获取的元素
    - pseudoElt 伪元素，可选
- window
  - window.open();
    - eg: let childWindow = window.open('about:blank', '\_blank', 'width=100,height=100,left=100,right=100');
  - moveBy() 不可作用于本身，可作用于子窗口
  - resizeBy() 不可作用于本身，可作用于子窗口
  - 滚动
    - scrollX()
    - scrollY()
    - scrollBy()
    - scrollTo()
    - scrollTop
    - scrollLeft
    - scrollHeight
  - getClientRects()
  - document.documentElement.getBoundingClientRect()
  - window.innerWidth
  - window.innerHeight
  - window.outerWidth
  - window.outerHeight
  - window.devicePixelRatio
