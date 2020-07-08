# 每周总结可以写在这里

### proxy/reactive/effect/range

1. 主要讲 js 中的 proxy，以 vue3 的 reactive 为思路，模拟实现 reactive
2. proxy 的 api：
   ```javascript
   new proxy(targer, handler)
   ```
3. 库或者框架中使用，劫持对象的操作
4. 难点在于怎么收集依赖

### 组件基础

1. 组件与对象
   1. 都有 Properties/Methods/Inherit
   2. 组件有更多的特性，包括不限于 Attribut/Config & state/Event/Lifecycle/Children
