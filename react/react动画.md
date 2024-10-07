---
title: react动画
index: 6
---

# React的过渡动画

## 介绍

在开发中，我们想要给一个组件的显示和消失添加某种过渡动画时，可以通过原生的CSS来实现这些过渡动画，但是React社区为我们提供了react-transition-group用来完成过渡动画。

React曾为开发者提供过动画插件 react-addons-css-transition-group，后由社区维护，形成了现在的 [react transition group](https://reactcommunity.org/react-transition-group/)。

这个库可以帮助我们方便的实现组件的入场和离场动画，使用时需要进行额外的安装。

```sh
npm install react-transition-group --save
```

> react-transition-group本身非常小，不会为我们应用程序增加过多的负担。

## 主要组件

### Transition

该组件是一个和平台无关的组件（不一定要结合CSS），在前端开发中比较常用的是CSSTransition；

### CSSTransition

在前端开发中，通常使用CSSTransition来完成过渡动画效果；

CSSTransition是基于Transition组件构建的。

CSSTransition执行过程中，有三个状态：appear、enter、exit；其中每个状态又有三类状态：

- 第一类，开始状态：对于的类是-appear、-enter、-exit；
- 第二类：执行动画：对应的类是-appear-active、-enter-active、-exit-active；
- 第三类：执行结束：对应的类是-appear-done、-enter-done、-exit-done；

CSSTransition常见对应的属性：

1. in：触发进入或者退出状态；

   - 当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class， 并添加-enter-done的class；
   - 当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并添加-enter-done的class；

2. unmountOnExit：退出后卸载组件；

3. classNames：动画class的名称；

   决定了在编写css时，对应的class名称。

4. timeout： 过渡动画的时间，最好与css里面的transition时间保持一致；

5. appear：是否在初次进入添加动画（需要和in同时为true）；

CSSTransition对应的钩子函数：

- onEnter：在进入动画之前被触发；
- onEntering：在应用进入动画时被触发；
- onEntered：在应用进入动画结束后被触发；

> 下面代码是文字的淡入淡出的效果实现

```tsx
import { PureComponent } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

export default class APP extends PureComponent {
  constructor() {
    super();
    this.state = {
      isShow: true,
    };
  }
  render() {
    const { isShow } = this.state;
    return (
      <div>
        <button onClick={() => {this.setState({ isShow: !isShow });}}>切换</button>
        <CSSTransition classNames="foo" in={isShow} unmountOnExit={true} timeout={1000} appear onEnter={() => {}}>
          <h1>Hello</h1>
        </CSSTransition>
      </div>
    );
  }
}
```

```css
.foo-appear {
  transform: translateX(-150px);
}

.foo-appear-active {
  transform: translateX(0);
  transition: transform 1s ease;
}

.foo-enter {
  opacity: 0;
}

.foo-enter-active {
  opacity: 1;
  transition: opacity 1s ease;
}

.foo-exit {
  opacity: 1;
}

.foo-exit-active {
  opacity: 0;
  transition: opacity 1s ease;
}
```

::: tip 解决StrictMode模式下的警告

只需要手动设置ref，内部就不会使用findDomNode了，也就不会警告了。

```tsx
<CSSTransition nodeRef={hRef} ...>
	<h1 ref={hRef}>World</h1>
</CSSTransition>
```

:::

### SwitchTransition

SwitchTransition可以完成两个组件之间切换的炫酷动画：

SwitchTransition中主要有一个属性mode，有两个值：

- in-out：表示新组件先进入，旧组件再移除；
- out-in：表示就组件先移除，新组建再进入；

使用SwitchTransition组件时，应该用CSSTransition或者Transition组件包裹你想要切换的组件，不能用SwitchTransition组件直接包裹你想要切换的组件。

SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是 key属性；

> 下面代码是按钮的移入移出动画效果实现

```tsx
import { PureComponent } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./App.css";

export default class APP extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLogin: true,
    };
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <SwitchTransition mode="out-in">
          <CSSTransition key={isLogin} classNames="login" timeout={1000}>
            <button onClick={(e) => this.setState({ isLogin: !isLogin })}>{isLogin ? "退出" : "登录"}</button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }
}
```

```css
.login-enter {
  opacity: 0;
  transform: translateX(10px);
}

.login-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 1s ease;
}

.login-exit {
  opacity: 1;
  transform: translateX(0);
}

.login-exit-active {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 1s ease;
}
```

### TransitionGroup

当我们有一组动画时，需要将这些CSSTransition放入到一个TransitionGroup中来完成动画。

> 下面是列表添加和删除的动画效果实现

> 在实际开发时，key应该是唯一的，下面代码的key使用index只是为了演示方便

```tsx
import { PureComponent } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

export default class APP extends PureComponent {
  constructor() {
    super();
    this.state = {
      books: [
        { name: "a", price: 1 },
        { name: "b", price: 2 },
        { name: "c", price: 3 },
      ],
    };
  }
  add() {
    const books = [...this.state.books];
    books.push({ name: "d", price: 4 });
    this.setState({ books });
  }
  delete() {
    const books = [...this.state.books];
    books.pop({ name: "d", price: 4 });
    this.setState({ books });
  }
  render() {
    const { books } = this.state;
    return (
      <div>
        <button onClick={() => this.add()}>add</button>
        <button onClick={() => this.delete()}>delete</button>
        <TransitionGroup component="ul">
          {books.map((item, index) => {
            return (
              <CSSTransition key={index} classNames="book" timeout={1000}>
                <li>
                  {item.name}-{item.price}
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }
}
```

```css
.book-enter {
  opacity: 0;
  transform: translateX(50px);
}

.book-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 1s ease;
}

.book-exit {
  opacity: 1;
  transform: translateX(0);
}

.book-exit-active {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 1s ease;
}
```



# React如何编写CSS

在组件化中选择合适的CSS解决方案应该符合以下条件：

- 可以编写局部css：css具备自己的具备作用域，不会随意污染其他组件内的元素； 
- 可以编写动态的css：可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；
- 支持所有的css特性：伪类、动画、媒体查询等；
- 编写起来简洁方便、最好符合一贯的css风格特点； 
- ...

React官方并没有给出在React中统一的样式风格

## 内联样式

style 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串；并且可以引用state中的状态来设置相关的样式；

优点：

1. 内联样式, 样式之间不会有冲突 
2. 可以动态获取当前state中的状态

缺点：

1. 写法上都需要使用驼峰标识 
2. 2.某些样式没有提示 
3. 3.大量的样式, 代码混乱 
4. 某些样式无法编写(比如伪类/伪元素)

```tsx
import { PureComponent } from "react";
import "./App.css";

export default class APP extends PureComponent {
  render() {
    return <h1 style={{ color: "red", fontSize: "50px" }}>Hello</h1>;
  }
}
```

## 普通的css

编写css到一个单独的文件，之后再进行引入。

这样的编写方式和普通的网页开发中编写方式是一致的，如果我们按照普通的网页标准去编写，那么也不会有太大的问题；

在组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会相互影响； 但是普通的css都属于全局的css，样式之间会相互影响；

这种编写方式最大的问题是样式之间会相互层叠掉；

```tsx
import { PureComponent } from "react";
import "./App.css";

export default class APP extends PureComponent {
  render() {
    return <h1 className="h">Hello</h1>;
  }
}
```

```css
.h{
  color: red;
  font-size: 50px;
}
```

## css modules

css modules并不是React特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用的。

> 如果在其他项目中使用它，那么我们需要自己来进行配置，比如配置webpack.config.js中的modules: true等。

React的脚手架已经内置了css modules的配置。我们只需将 .css/.less/.scss 等样式文件修改成 .module.css/.module.less/.module.scss 等； 然后就可以引用并且进行使用了；

css modules确实解决了局部作用域的问题，也是很多人喜欢在React中使用的一种方案。

缺点：

1. 引用的类名，不能使用连接符(.home-title)，在JavaScript中是不识别的；
2. 所有的className都必须使用{style.className} 的形式来编写；
3. 不方便动态来修改某些样式，依然需要使用内联样式的方式；

```tsx
import { PureComponent } from "react";
import style from "./App.module.css";

export default class APP extends PureComponent {
  render() {
    return <h1 className={style.h}>Hello</h1>;
  }
}
```

```css
.h{
  color: red;
  font-size: 50px;
}
```

## CSS in JS

“CSS-in-JS” 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义；

::: tip

此功能并不是 React 的一部分，而是由第三方库提供；

:::

CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括类似于CSS预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等； 

虽然CSS预处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点； 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案；

目前比较流行的CSS-in-JS的库有：

- styled-components
- emotion
- glamorous

---

styled-components的本质是通过函数的调用，最终创建出一个组件。这个组件会被自动添加上一个不重复的class，styled-components会给该class添加相关的样式；

它支持类似于CSS预处理器一样的样式嵌套：

- 支持直接子代选择器或后代选择器，并且直接编写样式；
- 可以通过`&`符号获取当前元素；
- 直接伪类选择器、伪元素等；

基本使用：

```tsx
import { PureComponent } from "react";
import { AppWrapper } from "./style";

export default class APP extends PureComponent {
  render() {
    return (
      <AppWrapper>
        <h1 className="h">
          Hello
          <i>,world</i>
        </h1>
      </AppWrapper>
    );
  }
}
```

```javascript
// style.js
import styled from "styled-components";

export const AppWrapper = styled.div`
	border: 1px solid red;
  .h {
    color: red;
    &:hover {
      background-color: black;
    }
    i{
      font-size:20px;
    }
  }
`;
```

> 在模板字符串里面写css正常情况下是没有代码提示和高亮的，但可以安装vscode-styled-component这个插件来获取这些功能

其它功能：

1. 解决动态样式

   可以使用props解决，props可以被传递给styled组件。获取props需要通过`${}`传入一个插值函数，props会作为该函数的参数；

   ```tsx
   export default class APP extends PureComponent {
     constructor() {
       super();
       this.state = {
         size: "10px",
       };
     }
     render() {
       return (
         <AppWrapper size={this.state.size}>
         </AppWrapper>
       );
     }
   }
   ```

   ```javascript
   export const AppWrapper = styled.div`
     i {
       font-size: ${(props) => props.size};
     }
   `;
   ```

2. 默认值

   可以使用attrs给标签模板字符串提供属性

   ```javascript
   export const AppWrapper = styled.div.attrs(props=>{
     return{
       size:props.size || "10px"
     }
   })`
   	font-size: ${(props) => props.size};
   
   `;
   ```

3. css变量

   在一个js文件里面导出多个js常量，然后直接在样式文件导入相关的变量即可。

4. 共享主题

   - 通过定义css变量实现

     在一个js文件里面导出多个js常量，然后直接在样式文件导入相关的变量即可。

     ```javascript
     export const themeColor = "red";

   - 或者通过ThemeProvider组件实现

     ```tsx
     import { ThemeProvider } from "styled-components";
     ...
     ReactDOM.createRoot(document.getElementById("root")).render(
       <ThemeProvider theme={{ color: "red" }}>
         <App />
       </ThemeProvider>
     );
     ```

     ```tsx
     export const AppWrapper = styled.div`
       .h {
         color: ${(props) => props.theme.color};
       }
     `;
     ```

5. 样式继承

   ```tsx
   const wrapper = styled(AppWrapper)`
     ...
   `
   ```

   

# React如何编写less

- 修改webpack配置：

  通过`npm run eject`暴露webpack配置，然后手动添加相关loader；

- 由于修改原生的webpack配置繁琐，可以使用 craco 插件来修改：https://craco.js.org/docs/getting-started/





# 动态添加class

可以像编写JavaScript代码一样，通过一些逻辑来决定是否添加某些class：

```tsx
export default class APP extends PureComponent {
  render() {
    const classList = ["aaa", "bbb", "ccc"];
    return (
      <div>
        <h1 className={"title" + (isActive ? "active" : "")}></h1>
        <h1 className={`title ${isActive ? "active" : ""}`}></h1>
        <h1 className={classList.join(" ")}></h1>
      </div>
    );
  }
}
```

但当需要添加的class过多的时候，这样操作会很麻烦。因此Wimbledon可以使用第一个第三方库classnames。

```sh
npm i classnames
```

使用方法：

```javascript
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

