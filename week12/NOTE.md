# 每周总结可以写在这里

1. LL 算法构建 AST，主要是状态机只能做词法分析，做语法分析就不行了
2. 编程练习就是解析四则运算，构建成 AST，不用状态机

   1. reg.exec() 方法对表达式进行词法分析
   2. generator 函数解析出 token，在 for...of 中循环读取
   3. filter 空格/换行符，将 token 放入数组 source 中
   4. 根据乘法/加法的产生式编写 MultiplicativeExpression/AdditiveExpression 函数
   5. 编写 Expression 函数处理 EOF 终结符

3. 字符串分析算法，主要介绍了六种算法
   1. 字典树 (Trie): 大量字符串的完整模式匹配(On)
   2. KMP
      - 长字符串中找子串
      - 时间复杂度 O(m + n)
   3. WildCard
      - 通配符算法 O(m+n)
      - 长字符串中找子串升级版
   4. 正则:字符串通用模式匹配
   5. 状态机, 通用的字符串分析
   6. LL 和 LR：字符串多层级结构分析
