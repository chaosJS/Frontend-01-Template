# 每周总结可以写在这里

### 4.30 笔记

1. 结构化设计
   - 事件循环 eventloop [朴灵评事件循环](https://blog.csdn.net/c__ilikeyouma/article/details/40143961)
   - oc 模拟事件循环机制

### 5.7 笔记

1. realm 的概念，遍历全局对象上所有的属性，包括函数属性和对象属性,

        ```javascript
        var set = new Set()
        var globalProperties = [
        'eval',
        'isFinite',
        'isNaN',
        'parseFloat',
        'parseInt',
        'decodeURI',
        'decodeURIComponent',
        'encodeURI',
        'encodeURIComponent',
        'Object',
        'Function',
        'Boolean',
        'Symbol',
        'Error',
        'EvalError',
        'RangeError',
        'ReferenceError',
        'SyntaxError',
        'TypeError',
        'URIError',
        'Number',
        'BigInt',
        'Math',
        'Date',
        'String',
        'RegExp',
        'Array',
        'Int8Array',
        'Uint8Array',
        'Uint8ClampedArray',
        'Int16Array',
        'Uint16Array',
        'Int32Array',
        'Uint32Array',
        'Float32Array',
        'Float64Array',
        'BigInt64Array',
        'BigUint64Array',
        'Map',
        'Set',
        'WeakMap',
        'WeakSet',
        'ArrayBuffer',
        'SharedArrayBuffer',
        'Atomics',
        'DataView',
        'JSON',
        'Promise',
        'Reflect',
        'Proxy',
        'Intl',
        'WebAssembly'
        ]
        var queue = []
        for (let p of globalProperties) {
        queue.push({
            path: [p],
            object: this[p] 
        })
        }
        let current
        while (queue.length) {
        current = queue.shift()
        if (set.has(current.object)) continue
        set.add(current.object)
        let proto = Object.getPrototypeOf(current.object)
        if (proto && proto !== Function.prototype) {
            queue.push({
            path: current.path.concat(['__proto__']),
            object: proto
            })
        }
        console.log(current.path.join('.'))

        for (let p of Object.getOwnPropertyNames(current.object)) {
            var property = Object.getOwnPropertyDescriptor(current.object, p)
            if (
            (property.value != null && typeof property.value == 'object') ||
            typeof property.value == 'function'
            )
            queue.push({
                path: current.path.concat([p]),
                object: property.value
            })

            if (property.hasOwnProperty('get') && property.get instanceof Object)
            queue.push({
                path: current.path.concat([p]),
                object: property.get
            })

            if (property.hasOwnProperty('set') && property.set instanceof Object)
            queue.push({
                path: current.path.concat([p]),
                object: property.set
            })
        }
        }
        ```
2. 函数调用
    1. 重点是理解函数调用栈的执行机制，区分函数执行上下文和作用域[链接1](https://juejin.im/entry/599e949251882524472239c4) [链接2](https://juejin.im/post/5cf409d36fb9a07ecf720e9b)
    2. 难点是找到函数执行中的自由变量的取值问题
    3. 理解以上就不难理解闭包：带着外部环境记录（Environment Record）的函数