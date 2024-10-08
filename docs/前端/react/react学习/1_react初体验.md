---
title: react初体验
index: 1
---

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/Snipaste_1.png)

# React 是什么

React 是用于构建 Web 和原生交互界面的库。

React 的官网文档：https://zh-hans.react.dev/

React 的官网文档（旧版）：https://zh-hans.legacy.reactjs.org/docs/getting-started.html

# React 的特点

## 声明式编程

- 声明式编程是目前整个大前端开发的模式：Vue、React、Flutter、SwiftUI
- 它允许我们只需要维护自己的状态，当状态改变时，React 可以根据最新的状态去渲染我们的 UI 界面

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/Snipaste_2.png)

## 组件化开发

- 组件化开发页面目前前端的流行趋势，我们会将复杂的界面拆分成一个个小的组件；
- 如何合理的进行组件的划分和设计也是后面我会讲到的一个重点；

## 多平台适配

- 2013 年，React 发布之初主要是开发 Web 页面；
- 2015 年，Facebook 推出了 ReactNative，用于开发移动端跨平台；
- 2017 年，Facebook 推出 ReactVR，用于开发虚拟现实 Web 应用程序；

# React 的开发依赖

- 开发 React 必须依赖三个库：
  1. `react`：包含 react 所必须的核心代码
  2. `react-dom`：react 渲染在不同平台所需要的核心代码
  3. `babel`：将 jsx 转换成 React 代码的工具

对于 Vue 来说，我们只是依赖一个 vue.js 文件即可，但是 react 居然要依赖三个包。其实这三个库是各司其职的，目的就是让每一个库只单纯做自己的事情;在 React 的 0.14 版本之前是没有 react-dom 这个概念的，所有功能都包含在 react 里；

为什么要进行拆分呢？
原因就是 react-native。react 包中包含了 react web 和 react-native 所共同拥有的核心代码。react-dom 针对 web 和 native 所完成的事情不同：

- web 端：react-dom 会将 jsx 最终渲染成真实的 DOM，显示在浏览器中
- native 端：react-dom 会将 jsx 最终渲染成原生的控件（比如 Android 中的 Button，iOS 中的 UIButton）。

# Babel 和 React 的关系

- babel 是什么呢？

  `Babel` ，又名 `Babel.js`。是目前前端使用非常广泛的编译器、转移器。

  比如当下很多浏览器并不支持 ES6 的语法，但是确实 ES6 的语法非常的简洁和方便，我们开发时希望使用它。那么编写源码时我们就可以使用 ES6 来编写，之后通过 Babel 工具，将 ES6 转成大多数浏览器都支持的 ES5 的语法。

- React 和 Babel 的关系：

  默认情况下开发 React 其实可以不使用 babel。但是前提是我们自己使用 React.createElement 来编写源代码，它编写的代码非常的繁琐和可读性差。

  使用 Babel 了我们就可以直接编写 jsx（JavaScript XML）的语法，并且让 babel 帮助我们转换成 React.createElement。

# React 的依赖引入

引入方式：

- 直接 CDN 引入
- 下载后，添加本地依赖
- 通过 npm 下载

> 这个 crossorigin 属性的目的是为了拿到跨域脚本的错误信息

``` html
// 通过cdn引用
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

# Hello World 小案例

![](./assets/3.png)

- 必须添加 type="text/babel" ，作用是可以让 babel 解析 jsx 的语法

- ReactDOM.createRoot 函数用于创建一个 React 根，之后渲染的内容会包含在这个根中。使用时需要传入一个参数（即将渲染的内容将要挂载到哪一个 HTML 元素上）

- root.render 函数传入一个参数，即要渲染的根组件

# Hello World – 组件化开发

- 整个逻辑其实可以看做一个整体，那么我们就可以将其封装成一个组件：

  我们说过 root.render 参数是一个 HTML 元素或者一个组件；

  所以我们可以先将之前的业务逻辑封装到一个组件中，然后传入到 ReactDOM.render 函数中的第一个参数；

- 在 React 中，如何封装一个组件呢？这里我们暂时使用类的方式封装组件：

  1. 定义一个类（类名大写，组件的名称是必须大写的，小写会被认为是 HTML 元素），继承自 React.Component
  2. 实现当前组件的 render 函数

     render 当中返回的 jsx 内容，就是之后 React 会帮助我们渲染的内容

     ![](./assets/4.png)
