// 难点在于依赖的收集和处理
let handlers = new Map()
let reactivities = new Map()
// 全局或者reactive和effect都能访问的一个数组，用来保存调用过的函数
let usedReactivities = []
let object = {
  a: {
    x: 3
  },
  b: 2
}

function reactive(obj) {
  if (reactivities.has(obj)) {
    // 去重
    return reactivities.get(obj)
  }
  let proxy = new Proxy(obj, {
    // vue3的reactive是在get时进行依赖收集
    get(obj, prop) {
      usedReactivities.push([obj, prop])
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop]) // 应该返回reactive本身 否则会被认为是新的对象依赖
      }
      return obj[prop]
    },
    set(obj, prop, val) {
      obj[prop] = val
      if (handlers.get(obj)) {
        if (handlers.get(obj).get(prop)) {
          // 循环取出调用handler
          for (let handler of handlers.get(obj).get(prop)) {
            handler()
          }
        }
      }
      return obj[prop]
    }
  })

  reactivities.set(obj, proxy)
  return proxy
}

function effect(handler) {
  // 先清空一下
  usedReactivities = []
  handler()
  for (let usedReactivity of usedReactivities) {
    let [obj, prop] = usedReactivity
    if (!handlers.has(obj)) {
      handlers.set(obj, new Map())
    }
    if (!handlers.get(obj).has(prop)) {
      handlers.get(obj).set(prop, [])
    }

    handlers.get(obj).get(prop).push(handler)
  }
}

let dummy
let p1 = reactive({ a: { x: 999 } })
effect(() => (dummy = p1.a.x))
p1.a.x = 10000
console.log(dummy)
