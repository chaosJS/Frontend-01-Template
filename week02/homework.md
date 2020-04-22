### 编程语言通识与 JavaScript 语言设计
1. 随堂练习

   1. 带括号的四则运算产生式

   ```
       <Number> = "0" | "1" | "2" | ..... | "9"
       <DecimalNumber> = "0" | (("1" | "2" | ..... | "9") <Number>* )

       <PrimaryExpression> = <DecimalNumber> |
       "(" <LogicalExpression> ")"

       <MultiplicativeExpression> = <PrimaryExpression> |
       <MultiplicativeExpression> "*" <PrimaryExpression>|
       <MultiplicativeExpression> "/" <PrimaryExpression>

       <AdditiveExpression> = <MultiplicativeExpression> |
       <AdditiveExpression> "+" <MultiplicativeExpression>|
       <AdditiveExpression> "-" <MultiplicativeExpression>

       <LogicalExpression> = <AdditiveExpression> |
       <LogicalExpression> "||" <AdditiveExpression> |
       <LogicalExpression> "&&" <AdditiveExpression>
   ```

   2. 分类你知道的计算机语言
      1. python 动态强类型
      2. java 静态强类型
      3. JavaScript 动态弱类型

### JavaScript | 词法，类型

1.  课后作业
    1.  正则 匹配所有 Number 直接量
        ```javascript
        let reg = /^0[x|X]([0-9]|[a-f]|[A-F])+$|^0[o|O][0-7]+$|^0[b|B][0-1]+$|^0$|^[1-9][0-9]*?\.?(([0-9]*)?)([e|E][-|+]?([0-9]|[1-9][0-9])+)?$|\.([0-9]+)([e|E][-|+]?([0-9]|[1-9][0-9])+)?$/
        ```


      2. UTF-8 Encoding 的函数
         ```javascript
          function encodeUtf8(text) {
              const code = encodeURIComponent(text);
              const bytes = [];
              for (var i = 0; i < code.length; i++) {
                  const c = code.charAt(i);
                  if (c === '%') {
                      const hex = code.charAt(i + 1) + code.charAt(i + 2);
                      const hexVal = parseInt(hex, 16);
                      bytes.push(hexVal);
                      i += 2;
                  } else bytes.push(c.charCodeAt(0));
              }
              return bytes;
          }
         ```
      3. 正则 匹配所有的字符串直接量，单引号和双引号
         ```javascript
          var reg = /(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E])[\u0021-\u007E]{6,16}$)|(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x21-\x7E]{6,16}$)|((?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*)/

         ```
