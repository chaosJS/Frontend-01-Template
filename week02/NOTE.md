# 每周总结可以写在这里

### 编程语言通识与 JavaScript 语言设计

1. 乔姆斯基/形式语言
   1. 0 型； 无限制文法(有严格定义的文法)
   2. 1 型: 上下文相关文法(根据上下文相关)
   3. 2 型: 上下文无关文法(大部分计算机主体都是) JavaScript 就不是(但 99%是)
   4. 3 型: 正则文法(限制我们的表达能力)-使用正则表达式解析
2. BNF 巴科斯范式 :一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。


### JavaScript | 词法，类型

1.  Unicode [字符集](https://www.cnblogs.com/leesf456/p/5317574.html) 分类
    1. Blocks
    2. Categories
2.  词法
    1. WhiteSpace： `<NBSP>`
    2. LineTerminator
       ```
         LF: \n
         CR: \r
       ```
    3. Comment
    4. Token
       1. Punctuator
       2. IdentifierName
       3. Literal
       4. String
       5. Boolean
       6. Null
       7. Undefined
