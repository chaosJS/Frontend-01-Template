# 每周总结可以写在这里

1. 重学 css，选择器
   1. 简单选择器，工作中常用的
   2. 复合选择器 `$('#id.cls')`
   3. 复杂选择器 `$('#id .list')`
2. 优先级
   1. 优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：
      1. 如果存在内联样式，那么 A = 1, 否则 A = 0;
      2. B 的值等于 ID 选择器 出现的次数;
      3. C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数;
      4. D 的值等于 标签选择器 和 伪元素 出现的总次数 。
      ```css
      #.cls {
        font-size: 12px;
      }
      div#a.b .c[id=x] => [0,1,3,1]
      div.a [0,0,0,1]
      比较规则：
      从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的
      ```
3. 伪类(:last-child/nth-chind)/伪元素(:before/after)

### 排版 layout

1. 盒（Box）—— 排版和渲染的基本单位

   - 标签（Tag） —— 源代码
   - 元素（Element） —— 语义
   - 盒（Box） —— 表现
   - HTML 代码中可以书写开始**标签**，结束**标签**和自闭合**标签**。
   - 一对起止**标签**，表示一个**元素**。
   - DOM 树中存储的是**元素**和其它类型的节点（Node）。
   - CSS 选择器选中的是**元素**。
   - CSS 选择器选中的**元素**，在排版时可能产生多个**盒**。
     - inline 元素有多行的情况会产生多个盒
     - 带伪元素（::before ::after :: first-letter）的情况会产生多个盒
   - 排版和渲染的基本单位是**盒**。

2. [盒模型](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)

3. 正常流

   - 正常流排版
     - 收集**盒**进行
     - 计算盒在行中的排布
     - 计算行的排布
   - IFC（inline formatting context）
   - BFC（block formatting context）
   - 正常流的行模型
   - 扩展：
     - [Element.getClientRects\(\)](https://developer.mozilla.org/en-US/docs/Web/API/Element/getClientRects)

4. float 与 clear
5. margin 折叠
   - 只会发生在[BFC](https://www.w3.org/TR/CSS21/visuren.html#block-formatting)里
6. overflow:visible 与[BFC](https://www.w3.org/TR/CSS21/visuren.html#block-formatting)

   - block-level 表示可以被放入 bfc
     - display: flex | table | block
   - block-container 表示可以容纳 bfc
     - display: block | inline-block
   - block-box = block-level && block-container
     - display: block
   - block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并

7. [Flex](https://www.w3.org/TR/css-flexbox-1/)排版

- 收集盒进行
  - 根据主轴尺寸，把元素分进行
  - 若设置了 no-wrap，则强行分配进一行
- 计算盒在主轴方向的排布
  - 找出所有 Flex 元素
  - 把主轴方向的剩余尺寸按比例分配给这些元素
  - 若剩余空间为负数，所以 Flex 元素为 0，等比压缩剩余元素
- 计算盒在交叉轴方向的排布
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高 flex-align 和 item-align，确定元素具体位置
