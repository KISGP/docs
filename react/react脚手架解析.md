---
title: react脚手架解析
index: 3
---

# 前端工程的复杂化

如果我们只是开发几个小的 demo 程序，那么永远不需要考虑一些复杂的问题：

- 比如目录结构如何组织划分；
- 比如如何管理文件之间的相互依赖；
- 比如如何管理第三方模块的依赖；
- 比如项目发布前如何压缩、打包项目；
- ...

现代的前端项目已经越来越复杂了：

- 不会再是在 HTML 中引入几个 css 文件，引入几个编写的 js 文件或者第三方的 js 文件这么简单；
- 比如 css 可能是使用 less、sass 等预处理器进行编写，我们需要将它们转成普通的 css 才能被浏览器解析；
- 比如 JavaScript 代码不再只是编写在几个文件中，而是通过模块化的方式，被组成在成百上千个文件中，我们需要通过模块化的技术来管理它们之间的相互依赖；
- 比如项目需要依赖很多的第三方库，如何更好的管理它们（比如管理它们的依赖、版本升级等）；

为了解决上面这些问题，我们需要再去学习一些工具：

- 比如 babel、webpack、gulp，配置它们转换规则、打包依赖、热更新等等一些的内容；
- 脚手架的出现，就是帮助我们解决这一系列问题的；

# 脚手架是什么呢？

传统的脚手架指的是建筑学的一种结构：在搭建楼房、建筑物时，临时搭建出来的一个框架；

<br/>

编程中提到的脚手架（Scaffold），其实是一种工具，帮我们可以快速生成项目的工程化结构；

- 每个项目作出完成的效果不同，但是它们的基本工程化结构是相似的；
- 既然相似，就没有必要每次都从零开始搭建，完全可以使用一些工具，帮助我们生产基本的工程化模板；
- 不同的项目，在这个模板的基础之上进行项目开发或者进行一些配置的简单修改即可；
- 这样也可以间接保证项目的基本机构一致性，方便后期的维护；

<br/>

总结：脚手架让项目从搭建到开发，再到部署，整个流程变得快速和便捷；

# 前端脚手架

对于现在比较流行的三大框架都有属于自己的脚手架：

- Vue 的脚手架：@vue/cli

- Angular 的脚手架：@angular/cli

- React 的脚手架：create-react-app

它们的作用都是帮助我们生成一个通用的目录结构，并且已经将我们所需的工程环境配置好。

<br/>

使用这些脚手架需要依赖什么呢？

- 目前这些脚手架都是使用 node 编写的，并且都是基于 webpack 的；

- 所以我们必须在自己的电脑上安装 node 环境；

# 创建 React 项目

创建 React 项目的命令如下：

```sh
create-react-app 项目名称
```

::: tip
项目名称不能包含大写字母
:::

# 目录结构分析

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/31.png)

# 了解 PWA

比如 chrome 浏览器，在一些网站的地址栏右边有个图标

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/32.png)

<br/>

点击会提示是否安装应用，这就是 PWA

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/33.png)

---

在目录中

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/34.png)

---

PWA 相关的概念：

- PWA 全称 Progressive Web App，即渐进式 WEB 应用；
- 一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用；
- 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能；
- 这种 Web 存在的形式，我们也称之为是 Web App；

<br/>

PWA 解决了哪些问题呢？

- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏；
- 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能；
- 实现了消息推送；
- 等等一系列类似于 Native App 相关的功能；

<br/>

更多 PWA 相关的知识，可以自行去学习更多；

https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps

# 编写 react 代码

删除目录下无用文件后，目录结构如下：

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/35.png)

src 文件夹夹下的 index.js 是项目的入口文件,我们就是在 index.js 文件里编写 react 代码

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/36.png)

::: tip
导入 react-dom 的时候导入的应该是 react-dom 下的 client，而不是 react-dom。虽然并不会报错，但会有一个警告。

```tsx
import ReactDOM from "react-dom"; // warning
import ReactDOM from "react-dom/client"; // success
```

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/39.png)
:::

---

# 封装组件

将 APP 组件的内容抽离到 APP.jsx 的文件内容中，需要在 APP.jsx 导入 react 以及导出 APP 组件。

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/38.png)

::: tip
文件后缀名也可以是 js，不一定是 jsx，但是 jsx 的代码提示会比 js 好
:::

<br/>

在 index 导入 APP 组件，由于这个时候 index 里没有组件自然就不用导入 react，保留 react-dom 就行了

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/37.png)

# 脚手架中的 webpack

React 脚手架默认是基于 Webpack 来开发的；但是，我们并没有在目录结构中看到任何 webpack 相关的内容？

原因是 React 脚手架将 webpack 相关的配置隐藏起来了（其实从 Vue CLI3 开始，也是进行了隐藏）；

<br/>

如果我们希望看到 webpack 的配置信息，我们可以执行一个 package.json 文件中的一个脚本：

```json
"eject": "react-scripts eject"
```

这个操作是不可逆的，所以在执行过程中会给与我们提示；

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/40.png)

执行后目录下会多出两个文件夹，config 和 script

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/41.png)

package.json 也会多出各种依赖

![](https://model.kisssssssss.space/https://raw.githubusercontent.com/kisssssssss/IMG/main/docs/WEB/react/42.png)
