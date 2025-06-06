# vue目录架构

---

# 典型 Vue 项目的目录结构和讲解

```bash
my-vue-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── store/
│   ├── utils/
│   ├── services/
│   ├── App.vue
│   ├── main.js
├── package.json
├── vite.config.js
```

下面我**逐个目录和文件讲清楚**：

---

## 根目录

* **package.json**

  * 记录**项目的基本信息**（比如名字、版本）
  * 定义了**项目用到的依赖**（比如 vue、axios、vite）
  * 配置了**常用脚本命令**（比如 npm run dev 启动项目）
* **vite.config.js**

  * 是**Vite 的配置文件**，比如配置别名（`@`​ 指向 `src/`​），设置代理跨域等等。

---

## public/ 文件夹（静态资源）

* 放**不会被打包处理的文件**。
* 比如网站的 **favicon.ico**（网页小图标）、**纯 HTML 文件**。
* 打包上线时，里面的文件直接原样复制到最终部署目录。

**例子：**

* ​`public/favicon.ico`​：网页上那个小图标。

---

## src/ 文件夹（核心代码都在这里）

> 注意：**src 是最重要的，90%开发都在这里进行！**

### 1. assets/ （静态资源）

* 放**图片、字体、全局样式**等。
* **图片**：页面上要展示的图（比如 logo、背景图）。
* **CSS/SCSS 文件**：可以放全局样式，所有页面通用。

**例子：**

* ​`assets/logo.png`​
* ​`assets/styles/global.css`​

---

### 2. components/ （可复用的小组件）

* **一个个可以复用的组件**。
* 比如按钮、弹窗、表单输入框、分页器。
* **不是单独页面，只是页面上的小部分。**

**例子：**

* ​`components/BaseButton.vue`​：通用按钮
* ​`components/Modal.vue`​：弹窗

---

### 3. views/ （页面级组件）

* **一整页**，比如首页、登录页、个人中心。
* 一般和**路由 router 配合使用**。
* 每个 view 里面可以用很多 components。

**例子：**

* ​`views/Home.vue`​：首页
* ​`views/Login.vue`​：登录页
* ​`views/Profile.vue`​：用户个人资料页

---

### 4. router/ （前端路由管理）

* 这里管理**页面跳转的规则**。
* 配置：**访问**  **​`/login`​**​ **，加载 Login 页面**；**访问**  **​`/home`​**​ **，加载 Home 页面**。
* 使用 vue-router 来控制。

**例子：**

* ​`router/index.js`​：统一配置路由跳转规则。

**示例代码：**

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

---

### 5. store/ （全局状态管理）

* 管理一些**全局共享的数据**。
* 比如用户登录状态、购物车数据等。
* Vue 3 里常用 **Pinia**（以前 Vue 2 用 Vuex）。

**例子：**

* ​`store/user.js`​：存用户信息（用户名、token）
* ​`store/cart.js`​：存购物车信息

---

### 6. utils/ （工具函数）

* 放一些**常用的小工具函数**。
* 不直接显示在页面上，主要**提供功能**。

**例子：**

* ​`utils/formatDate.js`​：把时间戳转成好看的日期。
* ​`utils/validate.js`​：一些输入校验（比如手机号是否合法）。

---

### 7. services/ （请求接口层）

* 封装**请求后端接口**的逻辑。
* 比如登录、拉取商品列表、提交表单。
* 这里通常用 **Axios** 发请求。

**例子：**

* ​`services/user.js`​：封装了登录、注册接口
* ​`services/product.js`​：封装了商品列表查询接口

**示例代码：**

```js
import request from '@/utils/request'

export function login(data) {
  return request.post('/api/login', data)
}
```

---

### 8. App.vue （应用的根组件）

* 整个网站的**最外层骨架**。
* 类似一张网页的基础框架，内部用 `<router-view />`​ 占位显示不同页面内容。

---

### 9. main.js （入口文件）

* 是项目的**程序入口**。
* 主要功能：

  * **把 App.vue 挂载到网页上**。
  * **初始化路由、状态管理**。
  * **引入全局样式、全局组件等**。

**示例代码：**

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
```

---

# 总结一下

|文件/目录|主要干什么|
| -----------------| --------------------------------|
|public/|放静态文件，比如网站图标|
|src/assets/|图片、样式|
|src/components/|可复用小组件（按钮、弹窗）|
|src/views/|页面级组件（首页、登录页）|
|src/router/|页面跳转控制|
|src/store/|管理全局数据（用户、购物车）|
|src/utils/|工具函数（日期格式化、校验）|
|src/services/|接口请求封装（登录、商品列表）|
|App.vue|网站骨架|
|main.js|程序入口|
