# js入门

# JS入门

**JavaScript (JS)**  是一种高级的、解释型的编程语言，它与 HTML 和 CSS 并称为网页开发的三大基石。HTML 负责结构，CSS 负责样式，而 JavaScript 则负责**行为**，让网页从静态的文档变为可以与用户交互的动态应用程序。

## 核心：将 JavaScript 添加到网页

要在网页中使用 JavaScript，你需要使用 `<script>`​ 标签。它有两种主要的使用方式：内联（直接在 HTML 文件中编写）和外链（引入外部的 `.js`​ 文件）。

### 基本用法：

#### 1. 内联脚本

将 JavaScript 代码直接写在 HTML 文件的 `<script>`​ 和 `</script>`​ 标签之间。通常建议将它放在 `<body>`​ 标签的末尾，以确保在执行脚本前，页面的 HTML 元素已经完全加载。

```html
<!DOCTYPE html>
<html>
<head>
    <title>内联脚本示例</title>
</head>
<body>

    <p id="intro">这是一个段落。</p>

    <script>
        // 获取 id 为 "intro" 的 HTML 元素
        let paragraph = document.getElementById("intro");
        // 修改该元素的文本内容
        paragraph.textContent = "你好, JavaScript!";
    </script>

</body>
</html>
```

说明：这段代码会找到页面上 `id="intro"`​ 的段落，并修改其内容。

---

#### 2. 外链脚本

这是更推荐的做法。将所有的 JavaScript 代码保存在一个单独的 `.js`​ 文件中，然后通过 `<script>`​ 标签的 `src`​ 属性引入。这样做可以使 HTML 结构和 JavaScript 逻辑分离，更易于维护。

**main.js 文件:**

```javascript
// 定义一个函数，用于初始化页面
function initPage() {
    let paragraph = document.getElementById("intro");
    paragraph.textContent = "你好, 来自外部文件的 JavaScript!";
}

// 当文档加载完毕时，执行 initPage 函数
document.addEventListener("DOMContentLoaded", initPage);
```

**index.html 文件:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>外链脚本示例</title>
</head>
<body>

    <p id="intro">这是另一个段落。</p>

    <!-- 链接到外部的 main.js 文件 -->
    <script src="main.js"></script>

</body>
</html>
```

说明：通过外部脚本文件引入 JavaScript，可以实现代码的模块化和复用。

---

## 变量与数据类型

在 JavaScript 中，我们使用 `let`​ 和 `const`​ 声明变量和常量。

### 声明与类型

```javascript
// 变量声明：let 和 const
let score = 100;      // score 是一个数字 (Number)
const GREETING = "你好"; // GREETING 是一个字符串 (String)，且值不能改变

// 字符串
let userName = "Alice";

// 数字
let temperature = 25.5;

// 布尔值 (Boolean)
let isOnline = true;

// 数组 (Array)：特殊的对象，用于存储有序列表
let fruits = ["苹果", "香蕉", "橙子"];

// 对象 (Object)：用于存储键值对 (Key-Value Pairs)
let user = {
    name: "Bob",
    age: 30,
    isVerified: false
};

// 检查数据类型
console.log(typeof score);    // "number"
console.log(typeof userName); // "string"
console.log(typeof user);     // "object"
console.log(typeof fruits);   // "object"

// 访问数组和对象的属性
console.log(fruits[0]);        // "苹果" (数组索引从 0 开始)
console.log(user.name);        // "Bob" (使用点符号访问对象属性)
```

说明：在现代 JavaScript 中，我们主要使用 `let`​（变量）和 `const`​（常量），尽量避免使用 `var`​。

---

## 控制流：

控制流语句用于决定代码执行的顺序，使程序能够根据条件作出决策或重复执行任务。

### 1. 条件语句 (`if`​/`else`​)

```javascript
let age = 18;

// if 语句：如果条件为真，则执行代码块
if (age >= 18) {
    console.log("你是成年人。");
} else {
    // else 语句：如果条件为假，则执行此代码块
    console.log("你是未成年人。");
}

// 多个条件判断
let scoreValue = 85;

if (scoreValue >= 90) {
    console.log("优秀");
} else if (scoreValue >= 60) {
    // else if 用于处理多个条件
    console.log("及格");
} else {
    console.log("不及格");
}
```

---

### 2. 循环 (`for`​ 和 `while`​)

```javascript
// for 循环：用于执行已知次数的循环
// i = 0：初始化计数器
// i < 5：循环继续的条件
// i++：每次循环后更新计数器
for (let i = 0; i < 5; i++) {
    console.log("循环次数：" + i);
}
// 输出: 0, 1, 2, 3, 4

// 遍历数组
const items = ["A", "B", "C"];
for (let i = 0; i < items.length; i++) {
    console.log("索引 " + i + " 的元素是: " + items[i]);
}

// while 循环：用于执行未知次数的循环，只要条件为真就继续
let count = 3;
while (count > 0) {
    console.log("倒计时: " + count);
    count--; // 递减计数器，避免无限循环
}
```

---

## 函数：

函数定义了可复用的代码块。在现代 JavaScript (ES6+) 中，我们更多地使用**箭头函数**（Arrow Functions）。

### 传统函数与箭头函数

```javascript
// 传统函数声明
function add(a, b) {
    return a + b;
}
console.log(add(5, 3)); // 输出: 8

// 箭头函数 (ES6+)：语法更简洁
// 适用于简单的、不涉及 this 绑定的函数
const multiply = (a, b) => {
    return a * b;
};
console.log(multiply(4, 2)); // 输出: 8

// 简化的箭头函数：如果只有一行返回语句，可以省略 {} 和 return
const subtract = (a, b) => a - b;
console.log(subtract(10, 3)); // 输出: 7
```

说明：箭头函数是现代 JavaScript 开发中推荐的函数定义方式，它提供了更简洁的语法和不同的 `this`​ 绑定机制。

---

## DOM 操作与事件处理

DOM 操作是 JavaScript 让网页具有动态性的关键。我们可以获取 HTML 元素，修改它们的属性，并响应用户的交互。

```html
<!DOCTYPE html>
<html>
<body>

    <h1 id="title">原始标题</h1>
    <button id="changeButton">点击改变标题</button>

    <script>
        // 获取 HTML 元素
        const titleElement = document.getElementById('title');
        const buttonElement = document.getElementById('changeButton');

        // 定义一个事件处理函数
        const handleClick = () => {
            // 修改元素的文本内容
            titleElement.textContent = "标题已被修改!";
            
            // 改变元素的样式 (CSS)
            // .style.color 是 JavaScript 操作 CSS 的方式
            titleElement.style.color = "blue";
            
            // 禁用按钮
            buttonElement.disabled = true;
        };

        // 添加事件监听器：当按钮被点击时，执行 handleClick 函数
        buttonElement.addEventListener('click', handleClick);
    </script>

</body>
</html>
```

说明：`addEventListener()`​ 是处理用户交互的核心。`.textContent`​ 用于修改文本，`.style`​ 用于修改 CSS 样式。

---

## 异步编程：Promises 和 Async/Await

JavaScript 是单线程的，但它需要处理网络请求、文件读取等耗时任务。**异步编程**允许这些任务在后台进行，而不阻塞主线程。

### Promise

Promise 是处理异步操作的标准方式，代表一个异步操作的最终完成或失败。

```javascript
// 模拟一个异步操作，例如网络请求
function fetchData() {
    // 创建一个新的 Promise
    return new Promise((resolve, reject) => {
        // 模拟 2 秒钟后数据返回成功
        setTimeout(() => {
            const data = "这是异步获取的数据";
            resolve(data); // 成功时调用 resolve
        }, 2000); 
    });
}

console.log("开始获取数据...");

// 使用 .then() 链式调用来处理 Promise 成功时的结果
fetchData()
    .then(data => {
        console.log("数据获取成功:", data);
    })
    .catch(error => {
        // .catch() 用于处理错误
        console.error("数据获取失败:", error);
    });

console.log("主线程继续执行...");
// 即使 fetchData 需要 2 秒，这行代码会立即执行
```

说明：`Promise`​ 是异步操作的基石。`fetchData()`​ 函数返回一个 Promise，`.then()`​ 接收成功时的结果。

```c++
// fetch 是一个内置的、返回 Promise 的函数，用于发起网络请求
console.log("开始点餐..."); // 主线程立即执行

fetch('https://api.example.com/data') // 发起请求，返回一个 Promise (取餐器)
    .then(response => {
        // 第一个 .then()：当 Promise 状态从 Pending 变为 Fulfilled 时执行
        // 就像取餐器震动了，你走到了柜台
        // response 是原始的 HTTP 响应，还需要一步处理才能拿到数据
        console.log("取餐器震动了，拿到了响应！");
        return response.json(); // .json() 也是一个异步操作，同样返回一个 Promise
    })
    .then(data => {
        // 第二个 .then()：处理上一个 .then() 返回的新 Promise
        // 这时你才真正拿到了咖啡（JSON 数据）
        console.log("成功拿到咖啡(数据):", data);
    })
    .catch(error => {
        // .catch()：当任何一个环节的 Promise 状态变为 Rejected 时执行
        // 比如网络断了，或服务器出错了
        console.error("出错了，订单被取消:", error);
    })
    .finally(() => {
        // .finally()：无论成功还是失败，最后都会执行
        // 就像你无论拿到咖啡还是被告知订单取消，最后都会离开柜台
        console.log("点餐流程结束。");
    });

console.log("我已经拿到取餐器了，现在去玩手机..."); // 主线程不会等待，立即执行
```

### Async/Await

​`async/await`​ 是处理 Promise 的现代、更简洁的语法糖，它让异步代码看起来像同步代码一样。

```javascript
// 定义一个异步函数
async function loadData() {
    console.log("准备加载数据...");

    try {
        // await 关键字：等待 Promise 解决（完成）后再继续执行
        // await 只能在 async 函数内部使用
        const response = await fetchData(); 
        
        console.log("成功使用 await 获取数据:", response);

    } catch (error) {
        // 使用 try...catch 结构来捕获异步操作中的错误
        console.error("加载数据失败:", error);
    }
}

loadData();
```

说明：`async`​ 关键字将函数定义为异步的，`await`​ 关键字暂停函数的执行，直到它后面的 Promise 完成。这极大地简化了异步代码的编写。

```c++
// 1. 将代码包裹在一个 async 函数中
async function orderCoffee() {
    console.log("开始点餐...");

    // 2. 使用 try...catch 结构来处理可能发生的错误
    try {
        // 3. 使用 await 等待 fetch 的 Promise 完成
        // 代码会在这里“暂停”，直到网络响应回来
        // 但整个浏览器不会卡住，只是 orderCoffee 这个函数暂停了
        const response = await fetch('https://api.example.com/data');
        console.log("取餐器震动了，拿到了响应！");

        // 4. 再次使用 await 等待 .json() 的 Promise 完成
        const data = await response.json();
        console.log("成功拿到咖啡(数据):", data);

        return data; // async 函数的返回值会被包装成一个 Fulfilled 的 Promise

    } catch (error) {
        // 如果任何一个 await 后面的 Promise 失败了，
        // 代码会直接跳转到 catch 块
        console.error("出错了，订单被取消:", error);
        // 在 async 函数中抛出错误，会返回一个 Rejected 的 Promise
        throw error;
    } finally {
        console.log("点餐流程结束。");
    }
}

// 调用这个 async 函数
orderCoffee();

console.log("我已经拿到取餐器了，现在去玩手机...");
```

---

‍
