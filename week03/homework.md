1. convertStringToNumber

   ```javascript
   function convertNumberToString(number, x = 10) {
     let integer = Math.floor(number)
     let decimal = number - integer
     let string = !integer ? '0' : ''
     while (integer > 0) {
       string = `${integer % x}${string}`
       integer = Math.floor(integer / x)
     }

     if (decimal) {
       string += '.'
       while (decimal && !/\.\d{20}$/.test(string)) {
         decimal *= x
         string += `${Math.floor(decimal)}`
         decimal -= Math.floor(decimal)
       }
     }
     return string
   }
   ```

2. convertNumberToString

   ```javascript
   function convertStringToNumber(chars, x = 10) {
     if (!/^(0\.?|0?\.\d+|[1-9]\d*\.?\d*?)$/.test(chars)) {
       throw Error(`${chars} 并不是一个合法的数字`)
     }
     const zeroCodePoint = '0'.codePointAt(0)
     let integer = 0
     let i = 0
     for (; i < chars.length && chars[i] !== '.'; i++) {
       integer *= x
       integer += chars[i].codePointAt(0) - zeroCodePoint
     }

     let decimal = 0
     for (let j = chars.length - 1; i < j; j--) {
       decimal += chars[j].codePointAt(0) - zeroCodePoint
       decimal /= x
     }
     return integer + decimal
   }
   ```

3. JavaScript 标准里有哪些对象是我们无法实现出来的

    - Built-in Exotic Object Internal Methods and Slots
      - Bound Function Exotic Objects
      - Array Exotic Objects
      - String Exotic Objects
      - Arguments Exotic Objects
      - Integer-Indexed Exotic Objects
      - Module Namespace Exotic Objects
      - Immutable Prototype Exotic Objects
    - Global Object
      - Constructor Protptype of the Global Object
        - Array
        - ArrayBuffer
        - Boolean
        - DataView
        - Date
        - Error
        - EvalError
        - Float32Array
        - Float64Array
        - Function
        - Int8Array
        - Int16Array
        - Int32Array
        - Map
        - Number
        - Object
        - Promise
        - Proxy
        - RangeError
        - ReferanceError
        - RegExp
        - Set
        - SharedArrayBuffer
        - String
        - Symbol
        - SyntaxError
        - TypeError
        - Unit8Array
        - Unit8ClampedArray
        - Unit16Array
        - Unit32Array
        - URIError
        - WeakMap
        - WeakSet
    - Object Objects
    - Function Objects
    - Control Abstraction Object
      - Iteration
      - GeneratorFunction
      - AsyncGeneratorFunction
      - Generator
      - AsyncGenerator
      - Promise
      - AsyncFunction
    - Reflection
      - Reflect
      - Proxy
