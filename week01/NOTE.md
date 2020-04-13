# 每周总结可以写在这里

### 4.9 前端知识框架思维导图

1. [语雀文档](https://www.yuque.com/lichao-ieckx/kb/fmyvlq)
2. ECMA 中找到所有的类型（Type）[ECMAScript® 2019](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-language-types)
   ```javascript
   The undefined Type
   The null Type
   The Boolean Type
   The String Type
   The Symbol Type
   The Number Type
   The Object Type
   ```
3. 解析 url

   ```javascript
   function parseURL(url) {
     var parser = document.createElement('a'),
       searchObject = {},
       queries,
       split,
       i // Let the browser do the work
     parser.href = url // Convert query string to object
     ueries = parser.search.replace(/^\?/, '').split('&')
     for (i = 0; i < queries.length; i++) {
       split = queries[i].split('=')
       searchObject[split[0]] = split[1]
     }
     return {
       protocol: parser.protocol,
       host: parser.host,
       hostname: parser.hostname,
       port: parser.port,
       pathname: parser.pathname,
       search: parser.search,
       searchObject: searchObject,
       hash: parser.hash
     }
   }
   ```

### 4.11

[职业/技能/规划相关](./4.11.md)，
