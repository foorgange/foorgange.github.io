# 前后端分离项目中的跨域问题全解：以 Vue + Spring Boot 为例

> 本文面向刚接触前后端分离开发的个人开发者，一篇文章了解跨域原理、开发解决方案与生产配置技巧.

---

## 一、什么是跨域？为什么会出现？

在前后端分离架构中，前端项目（如 Vue）和后端服务（如 Spring Boot）通常运行在不同端口，比如：

* 前端地址：`http://localhost:8080`​
* 后端地址：`http://localhost:8081`​

**这两个端口不一致就构成了“跨域请求”。**

### 浏览器的同源策略（Same-Origin Policy）

浏览器为了安全，只允许访问**同协议、同域名、同端口**的资源。否则就会阻止请求并抛出跨域错误。

例如：

```js
axios.get('http://localhost:8081/api/user')
```

在浏览器控制台中会看到报错：

```
Access to XMLHttpRequest at 'http://localhost:8081/xxx' from origin 'http://localhost:8080' has been blocked by CORS policy
```

---

## 二、什么是 CORS？

\*\*CORS（Cross-Origin Resource Sharing）\*\*是浏览器与服务器之间的一种协议，允许浏览器向服务器发起跨域请求。它的核心是由后端服务器设置 HTTP 响应头，告诉浏览器：“这个请求我允许”。

---

## 三、Spring Boot 如何解决跨域问题

Spring Boot 提供了三种主流方式来开启 CORS 支持。

### 方法一：使用 `@CrossOrigin`​ 注解（适合个人快速开发）

```java
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}
```

* 可作用于类或方法级别；
* 可指定允许的源、方法、是否允许携带 Cookie 等；
* 缺点是需要对每个接口单独配置，不适合大型项目。

---

### 方法二：全局配置 CORS（推荐企业项目）

对于接口较多或多人协作的项目，可以通过配置类统一管理跨域策略。

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 所有接口
                .allowedOrigins("http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true); // 允许携带 Cookie
    }
}
```

### 🚨 注意事项：

* 如果允许携带 Cookie，则 `allowedOrigins`​ 不可为 `"*"`​，必须指定具体来源；
* OPTIONS 请求是浏览器的“预检请求”，务必放行。

---

## 四、Vue 前端如何适配跨域

### 开发阶段推荐使用 `vue.config.js`​ 配置代理

创建或修改 `vue.config.js`​ 文件：

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Spring Boot 地址
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
```

这样就可以在前端代码中发请求时只写 `/api`​ 前缀，而不涉及跨域：

```js
axios.get('/api/users')
```

 Tip：代理只在开发环境有效，打包后不会生效。

---

## 五、生产环境怎么做？用 Nginx 反向代理！

上线部署后，通常不建议在服务端启用跨域，而是通过 **Nginx** 来统一转发请求，避免跨域。

### 示例 Nginx 配置（前端 Vue + 后端 Spring Boot）

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /usr/share/nginx/html/; # Vue build 目录
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8081/;
        proxy_set_header Host $host;
    }
}
```

这样，所有 `/api`​ 开头的请求都会由 Nginx 转发到 Spring Boot，浏览器不会感知到跨域，前后端就可以愉快协作啦！

---

## 六、其他实用建议

* 如果涉及认证（如 JWT / Cookie），需设置 `withCredentials: true`​，并确保后端也允许携带凭据；
* 建议为不同环境（开发、测试、生产）设置不同的配置文件；
* 跨域仅存在于浏览器环境中，Postman、curl 是没有跨域限制的。

---

## 七、总结：开发者应该如何选择方案？

|场景|推荐方式|
| --------------| ---------------------------------------|
|本地开发|Vue 代理 + Spring CORS 注解或全局配置|
|项目上线部署|使用 Nginx 做反向代理|
|微服务架构|使用 Spring Cloud Gateway 配置 CORS|

---

## 写在最后

跨域问题看似麻烦，其实本质只是浏览器的安全机制。掌握了 CORS 的本质与前后端配合技巧，便可轻松解决这个问题。
