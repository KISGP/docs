---
title: 使用 Cloudflare Workers 优化 Github 文件国内访问速度
time: 2024-6
---

为了能通过链接访问我放在 Github 上的[模型文件](https://github.com/kisssssssss/model)，刚开始我是使用 [jsdelivr](https://www.jsdelivr.com/) 。但 jsdelivr 的问题是在基本上国内访问不了，必须使用代理才能正常访问。

> 当然如果有国内服务器的话，可以不用考虑这些问题。

为了国内不使用代理就能正常访问，决定使用 [Cloudflare Workers](https://workers.cloudflare.com) 和 [hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)

# 创建一个 Cloudflare Workers

打开 Cloudflare 仪表盘

在侧边栏选择 [Workers 和 Pages]，在创建使选择 [常见 Worker 示例] 即可。

![](./assets/20.png)

名称可以随便取一个，之后可以在管理处修改。

设定完名称后点击部署即可。

![](./assets/21.png)

现在已经部署完成了

![](./assets/22.png)

# 修改 Worker 的代码

> 下面简单说一下步骤，如果需要详细了解可以看 [hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)

部署完成后，点击编辑代码进入到以下页面。

1. 把 worker.js 的代码全部删除
2. 打开 [index.js](https://cdn.jsdelivr.net/gh/hunshcn/gh-proxy@master/index.js)，并把代码全部粘贴到 worker.js
3. 在右侧预览区会显示页面
4. 点击右上角部署，部署成功后就可以退出了

![](./assets/25.png)

> 如果已经关闭了部署成功页面，且不知道哪里编辑代码，可以在 [Workers 和 Pages] 选择刚才创建的 Worker，并点击编辑代码。
> 
>![](./assets/23.png)
> 
> ![](./assets/24.png)

# 查看部署情况

在浏览器地址栏输入 名称.子域 即可访问刚才部署的页面

![](./assets/26.png)

# 缩短 Worker 地址

如果前面部署时使用的是一直是默认的话，生成的地址会很长，下面提供两种方法缩短地址。

## 使用自定义域名

::: tip 前提

使用这个方法的前提是在 Cloudflare 中托管了一个域名，如果没有就只能考虑另一种方法了。

:::

打开你的域名管理界面，选择你需要绑定的域名

![](./assets/28.png)

在左侧边栏选择 [Workers 路由]，点击添加路由

![](./assets/27.png)

- 路由

  可以仿照我的设置，proxy.kisssssssss.space/\*，前面的 proxy 可以随意更改，后面的 kisssssssss.space 则需要改成自己的域名

- Worker

  选择刚刚创建 Worker 即可

![](./assets/29.png)

选择完成后点击保存

> 在 [Workers 和 Pages] 中可以发现已经更改了
>
> ![](./assets/30.png)

在左侧边栏选择 [DNS 记录]，点击添加记录

![](./assets/31.png)

![](./assets/32.png)

点击保存，现在就可以通过自定义的域名访问了

::: info

- 当DNS记录没有开启代理时，Cloudflare 仅作为 DNS 解析器工作，请求直接从用户流向源服务器，不经过 Cloudflare。

- 启用了代理模式，DNS查询将会解析为 Cloudflare 的 Anycast IP 地址。这意味着所有流量会先经过Cloudflare，然后再将请求转发到你的源服务器

:::

## 修改名称和子域

修改名称

![](./assets/33.png)

修改子域

![](./assets/34.png)
