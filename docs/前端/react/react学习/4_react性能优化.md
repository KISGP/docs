---
title: react性能优化
index: 4
---

# React 的更新流程

React 在 props 或 state 发生改变时，会调用 React 的 render 方法，会创建一颗不同的树。

React 需要基于这两颗不同的树之间的差别来判断如何有效的更新 UI

<br/>

React 是如何优化的

1. 同层节点之间相互比较，不会垮节点比较；
2. 不同类型的节点，产生不同的树结构；
3. 开发中，可以通过 key 来指定哪些节点在不同的渲染下保持稳定；

# key 的优化

我们在前面遍历列表时，总是会提示一个警告，让我们加入一个 key 属性

<br/>

插入数据的情况：

- 情况一：在最后位置插入数据
  这种情况，有无 key 意义并不大

- 情况二：在前面插入数据
  这种做法，在没有 key 的情况下，所有的子元素都需要进行修改；

<br/>

当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素;

如果需要将 key 为 333 的元素插入到最前面的位置，那么 key 为 111 和 222 的元素仅仅进行位移，不需要进行任何的修改；

<br/>

key 的注意事项：

- key 应该是唯一的；
- key 不要使用随机数（随机数在下一次 render 时，会重新生成一个数字）；
- 使用 index 作为 key，对性能是没有影响的；

# shouldComponentUpdate (SCU)

默认情况下，我们只要是修改了 App 中的数据，所有的组件都需要重新 render，进行 diff 算法，很容易浪费性能。

事实上，很多的组件没有必须要重新调用 render；

它们调用 render 应该有一个前提，就是依赖的数据（state、props）发生改变时，再调用自己的 render 方法；

<br/>

**我们可以通过 `shouldComponentUpdate (SCU)` 方法来控制 render 方法是否被调用。**

参数:

- 参数一：修改之后，最新的 props 属性
- 参数二：修改之后，最新的 state 属性

```tsx
shouldComponentUpdate(nextProps,nextState){

}
```

返回值：

- 返回值为 true，调用 render 方法；
- 返回值为 false，不需要调用 render 方法；
- 默认返回的是 true，也就是只要 state 发生改变，就会调用 render 方法；

```tsx
shouldComponentUpdate(nextProps,nextState){
  return false;
}
```

使用示例：

```tsx
shouldComponentUpdate(nextProps,nextState){
  // 判断新传入的props和以前的props是否一样
  if(this.props.message !== nextProps.message){
    return true;
  }
  return false;
}
```

# PureComponent

如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给我们开发者增加非常多的工作量。

事实上 React 已经默认帮我们实现好了

在类组件中，我们只需要将 class 继承自 PureComponent。

```tsx
import React, { Component } from "react";
export default class APP extends Component {
  // ...
}

// 将导入 Component 改为导入 PureComponent
import React, { PureComponent } from "react";
export default class APP extends PureComponent {
  // ...
}
```

::: tip
PureComponent 的本质是进行浅层比较，不会比较深层
:::

# memo

`PureComponent`是针对类组件的 ，那么函数式组件呢？

我们需要使用一个高阶组件 memo：将之前的函数式组件都通过 memo 函数进行一层包裹。

memo包裹起来的组件的特点：只有props发生变化，才会重新渲染

```tsx
function f() {
  return <h2>f</h2>
}

export default f

// 修改为

import { memo } from "react";

const f = memo(function () {
  return <h2>f</h2>;
});

export default f;

```
