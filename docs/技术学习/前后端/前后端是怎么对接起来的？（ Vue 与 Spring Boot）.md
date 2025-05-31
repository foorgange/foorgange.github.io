# 前后端是怎么对接起来的？（ Vue 与 Spring Boot）

很多刚学习前端（HTML/CSS/JS/Vue）或者后端（Java/Spring Boot）的朋友，都会遇到一个共通的困惑：

> “我能写页面，也能写接口，但它们怎么连起来的？”

本篇文章就为你解锁介绍这个最基础的知识点，从**前后端分离的思想入门**，到**Vue 使用 Axios 调用 Spring Boot 接口的案例**，一步步带你搞定。

## 一、什么是前后端分离？

### 1. 传统开发模式：页面与接口混在一起

在早期的 Web 应用开发中，前端页面和后端逻辑常常紧密耦合在一起。例如，一个 Java Web 项目往往采用 **JSP 页面 + Servlet 或 Spring MVC Controller** 的模式。用户请求一个页面，服务器会在后端拼接 HTML 并将整页内容返回给浏览器。

这种模式的特点是：

* **页面渲染在服务端完成**，前端只负责展示结果；
* **前端和后端代码耦合严重**，一处改动往往需要同时修改后端 JSP 文件与 Controller 逻辑；
* **开发效率受限**，前端无法独立开发或测试功能，后端压力较大；
* 不利于适配现代多端设备（PC、移动、App）。

### 2. 前后端分离模式：各司其职、职责清晰

随着前端技术的发展，特别是 **Vue、React、Angular 等现代前端框架的流行**，前后端分离逐渐成为主流架构模式。

**前后端分离指的是：**

> 前端和后端分为两个独立的项目，分别负责不同的职责，通过接口（API）进行通信。

####  前端职责：

* 使用 Vue / React / 原生 HTML+CSS+JS 等构建用户界面；
* 负责页面渲染、交互逻辑（如按钮点击、表单输入）；
* 通过 Ajax、Axios 等工具调用后端接口，动态获取或提交数据。

####  后端职责：

* 使用 Spring Boot / Node.js / Python 等语言框架处理业务逻辑；
* 与数据库交互，完成增删改查；
* 向前端提供标准的 HTTP 接口（通常返回 JSON 数据）。

####  通信方式：

* 通常采用 **HTTP 协议 + JSON 数据格式**；
* 前端通过调用 RESTful 接口（如 `/api/user/list`​）获取或操作数据；
* 也可以使用 WebSocket 实现实时通信。

---

### 3. 前后端分离的优点：

|优点|说明|
| --------------------| -----------------------------------------------------------------|
|代码职责清晰|前后端各自专注领域，分工明确，减少相互干扰|
|便于团队协作|前端和后端可以并行开发，提高效率|
|更易于测试与部署|接口可独立测试，部署时前后端可以分别上线|
|更适配现代应用需求|支持 SPA（单页应用）、PWA、移动端、小程序等多种终端|
|更灵活的技术选型|前后端可使用不同技术栈，如 Vue + Spring Boot 或 React + Node.js|
|更好的用户体验|页面加载更快、响应更灵活，可实现局部刷新与动态更新|

## 二、前后端工程结构与开发流程

在前后端分离的开发模式中，前后端分别作为两个独立项目进行开发和部署。下面是一个典型的工程结构：

```
📁 vue-front         # 前端项目，使用 Vue3 + Vite 开发，独立启动
📁 springboot-back   # 后端项目，使用 Spring Boot 开发，提供 RESTful 接口
```

### 2.1 开发流程简述：

1. **后端先行：定义接口**

    * 例如：`GET /api/users/{id}`​，返回指定用户的信息，数据格式为 JSON。
2. **前端对接：使用 Axios 请求接口**

    * 获取数据并渲染到页面中。
3. **前后协作：依赖接口文档**

    * 接口文档可以手动编写，也可以通过 Swagger 等工具自动生成，便于双方协作。  

      ---

      ‍

‍

> 在编写好了后端部分的程序后，我们通常提供一个后端接口 Spring Boot API，那么核心操作就是获取后端接口提供的数据然后渲染在前端
>
> 上，这一部分我们主要通过**Axios来完成。**

---

### 2.2 什么是axios?

**Axios** 是一个基于 Promise 的 HTTP 客户端，运行在浏览器和 Node.js 中，用于发送网络请求（比如 GET、POST 等），常用于前端项目中向后端接口获取或提交数据。

简单来说：

> Vue/React 项目中，你想调用后端的接口？就用 Axios！

---

##  Axios 的优势

为什么不用原生 `fetch`​，而要用 Axios 呢？看看 Axios 的好处：

|优势|说明|
| --------------------| -----------------------------------|
|简单语法|比`fetch`​写法更直观，不需要额外`.json()`​|
|请求拦截/响应拦截|可统一加 Token、统一处理错误|
|自动转换 JSON|请求参数和响应结果都自动处理 JSON|
|支持超时、取消请求|网络不稳定时很有用|
|支持并发请求|可同时发送多个请求，如`axios.all`​|
|浏览器兼容性好|比 fetch 更广泛支持老版本浏览器|

---

## 🛠 Axios 安装与基本用法

### 安装

```bash
npm install axios
```

### 导入使用

```js
import axios from 'axios'
```

---

## 基础请求示例

### 1. GET 请求（获取数据）

```js
axios.get('/api/users/1')
  .then(res => {
    console.log(res.data) // 拿到后端返回的数据
  })
  .catch(err => {
    console.error('请求失败', err)
  })
```

### 2. POST 请求（提交数据）

```js
axios.post('/api/users', {
  name: '小红',
  email: 'hong@example.com'
})
```

### 3. PUT 请求（更新数据）

```js
axios.put('/api/users/1', {
  name: '新名字'
})
```

### 4. DELETE 请求（删除数据）

```js
axios.delete('/api/users/1')
```

---

> 但是注意，我们不推荐在组件中直接写 `axios.get(...)`​，而是**在一个单独的文件中封装**接口逻辑，便于统一维护、修改和复用。以一个用户接口为例子。
>
> ---
>
> ‍

### 封装 Axios 请求（services/user.js）

```js
// 📁 src/services/user.js
import axios from 'axios'

// 后端接口基础地址
const base = 'http://localhost:8080/api/users'

// 获取指定用户
export function getUser(id) {
  return axios.get(`${base}/${id}`)
}
```

> 注意：这里的 `base`​ 就是你提到的“后端接口地址”的来源！我们用字符串拼接的方式，把用户 ID 加到 URL 上，形成完整请求地址。

---

### 在组件中调用（UserInfo.vue）

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getUser } from '../services/user.js'

// 用 ref 创建响应式用户对象
const user = ref({})

// 页面加载时请求后端接口
onMounted(async () => {
  const res = await getUser(1) // 发起 HTTP 请求，参数 1 是用户 ID
  user.value = res.data // 响应结果赋值给 user
})
</script>

<template>
  <div v-if="user.name">
    <h2>用户名：{{ user.name }}</h2>
    <p>邮箱：{{ user.email }}</p>
  </div>
</template>
```

---

## 三. 额外的......

### 全局拦截器（加 Token）

在登录系统中，很多请求需要携带用户的身份凭证（Token）。你可以配置一个请求拦截器，自动给所有请求加上 Token：

```js
// 在 main.js 或 http.js 中统一配置
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token') // 从本地获取 Token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

###  可选优化：使用 Vite 代理简化请求地址

你可能注意到请求地址写成 `http://localhost:8080/...`​ 很不优雅。如果你在 `vite.config.js`​ 中加了代理：

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}
```

那么在封装 Axios 时可以把 base 改为：

```js
const base = '/api/users'
```

这样你写 `axios.get('/api/users/1')`​，其实内部就会代理成 `http://localhost:8080/api/users/1`​，前端代码更简洁，跨域问题也解决了。

‍
