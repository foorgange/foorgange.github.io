# Vue入门

# Vue入门

**Vue.js** (通常简称为 Vue) 是一个用于构建用户界面的**渐进式 JavaScript 框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。同时，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用（SPA）提供驱动。

## 核心概念：Vue 实例与模板语法

Vue 应用的核心是一个通过 `new Vue`​ 创建的 **Vue 实例**。它负责将数据和 DOM 进行关联。数据和 DOM 之间的关联是**响应式**的，这意味着当数据发生变化时，视图也会自动更新。

### 基本用法：

```html
<!-- HTML 结构 -->
<div id="app">
  <p>{{ message }}</p>
  <p>Using v-bind: <span v-bind:title="dynamicTitle">鼠标悬停查看动态标题</span></p>
  <p>Using v-model: <input v-model="message"></p>
  <button v-on:click="reverseMessage">反转消息</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

```javascript
// JavaScript (Vue 实例)
var app = new Vue({
  // el 属性用于指定一个页面上已存在的 DOM 元素来挂载 Vue 实例。
  el: '#app',

  // data 对象是 Vue 实例的数据源。模板中的数据都来自于这里。
  data: {
    message: 'Hello Vue!', // 定义一个名为 message 的数据属性
    dynamicTitle: '页面加载于 ' + new Date().toLocaleString() // 定义一个动态标题
  },

  // methods 对象包含了可以在 Vue 实例中调用的方法。
  methods: {
    reverseMessage: function () {
      // this 关键字指向当前的 Vue 实例
      // this.message 访问的是 data 对象中的 message 属性
      // .split('') 将字符串分割成字符数组
      // .reverse() 将数组反转
      // .join('') 将数组中的元素合并成一个字符串
      this.message = this.message.split('').reverse().join('');
    }
  }
});
```

说明：

- ​**​`el: '#app'`​** ​: 将这个 Vue 实例挂载到 `id`​ 为 `app`​ 的 DOM 元素上。
- ​**​`data`​**​: 存储应用所需的数据。当 `data`​ 中的数据改变时，所有用到该数据的地方都会自动更新。
- ​ **​`{{ message }}`​** ​: 这是数据绑定的最基本形式，称为“Mustache”语法，它会将 `data.message`​ 的值渲染到模板中。
- ​**​`v-bind:title`​**​: 这是**指令 (Directive)** 。指令是带有 `v-`​ 前缀的特殊特性。`v-bind`​ 的作用是动态地绑定一个或多个特性。这里将 `<span>`​ 元素的 `title`​ 特性与 `data.dynamicTitle`​ 的值绑定。
- ​**​`v-model`​**​: 这是双向绑定指令，常用于表单元素。它将 `<input>`​ 的 `value`​ 与 `data.message`​ 绑定在一起。当用户在输入框中输入内容时，`data.message`​ 会更新；反之，当 `data.message`​ 改变时，输入框的内容也会更新。
- ​**​`v-on:click`​**​: 用于监听 DOM 事件。这里监听了按钮的 `click`​ 事件，并在事件触发时调用 `methods`​ 中的 `reverseMessage`​ 方法。

---

## 条件与循环：`v-if`​ & `v-for`​

Vue 提供了强大的指令来根据数据状态条件性地渲染 DOM 或循环渲染一个列表。

### 基本用法：

```html
<!-- HTML 结构 -->
<div id="app-2">
  <!-- v-if: 根据表达式的真假值来插入或移除元素 -->
  <p v-if="seen">现在你看到我了</p>
  <button v-on:click="toggleSeen">显示/隐藏</button>

  <hr>

  <!-- v-for: 基于一个数组来渲染一个列表 -->
  <ol>
    <!-- todo 是数组中的元素别名，todos 是源数据数组 -->
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

```javascript
// JavaScript (Vue 实例)
var app2 = new Vue({
  el: '#app-2', // 挂载到 id 为 app-2 的元素
  data: {
    seen: true, // 定义一个布尔值，用于 v-if 的判断
    todos: [    // 定义一个对象数组，用于 v-for 循环
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '学习整个项目' }
    ]
  },
  methods: {
    toggleSeen: function() {
      // 点击时，将 this.seen 的值取反
      this.seen = !this.seen;
    }
  }
});
```

说明：

- ​**​`v-if="seen"`​** ​: `seen`​ 是 `data`​ 中的一个布尔值。当 `seen`​ 为 `true`​ 时，`<p>`​ 元素会被渲染到 DOM 中；当为 `false`​ 时，该元素会从 DOM 中被移除。
- ​**​`v-for="todo in todos"`​** ​: 这个指令会遍历 `data.todos`​ 数组。对于数组中的每一个对象，它都会创建一个 `<li>`​ 元素。`todo`​ 是当前遍历到的数组元素的别名，你可以在 `<li>`​ 元素内部访问它，例如 `{{ todo.text }}`​。

---

## 组件化开发：`Vue.component`​

组件系统是 Vue 的另一个重要概念。它允许我们将一个大型应用拆分成一个个功能独立、可复用的单元。一个组件就是一个拥有自己模板、脚本和样式的自定义元素。

### 基本用法：

```html
<!-- HTML 结构 -->
<div id="app-3">
  <!-- 直接像使用 HTML 标签一样使用自定义的组件 -->
  <!-- :todo="item" 是 v-bind:todo="item" 的缩写，用于向子组件传递数据 -->
  <!-- key 是 Vue 推荐为 v-for 设置的唯一标识，以提高渲染性能 -->
  <todo-item
    v-for="item in groceryList"
    v-bind:todo="item"
    v-bind:key="item.id">
  </todo-item>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

```javascript
// JavaScript (组件定义和 Vue 实例)

// 使用 Vue.component() 定义一个全局组件，名为 'todo-item'
Vue.component('todo-item', {
  // props 用于接收从父组件传递过来的数据
  // 'todo' 是我们定义的 prop 名称
  props: ['todo'],

  // template 定义了该组件的 HTML 结构
  // {{ todo.text }} 显示的是从 props 接收到的 todo 对象的 text 属性
  template: '<li>{{ todo.text }}</li>'
});

var app3 = new Vue({
  el: '#app-3', // 挂载 Vue 实例
  data: {
    groceryList: [ // 定义一个购物清单数组
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
});
```

说明：

- ​**​`Vue.component('todo-item', { ... })`​** ​: 这是注册一个全局组件的方式。第一个参数是组件的标签名，第二个参数是选项对象。
- ​**​`props: ['todo']`​** ​: 组件通过 `props`​ 选项来声明它期望从父级接收的数据。`'todo'`​ 就是一个 prop，父级可以通过 `v-bind:todo="..."`​ 的方式将数据传递给它。这实现了父组件到子组件的数据传递。
- ​**​`template: '<li>...</li>'`​** ​: 定义了组件的渲染内容。组件最终会被这段 HTML 替换。
- ​ **​`<todo-item ...>`​** ​: 在 HTML 中，我们可以像使用普通 HTML 标签一样使用我们注册的组件。
- ​**​`v-bind:todo="item"`​** ​: 在 `v-for`​ 循环中，`item`​ 是 `groceryList`​ 数组中的当前项。通过 `v-bind:todo`​，我们将这个 `item`​ 对象传递给了 `todo-item`​ 组件的 `todo`​ prop。

---

## 生命周期钩子 (Lifecycle Hooks)

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

```html
<div id="app-4">
  <p>{{ message }}</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>

var app4 = new Vue({
  el: '#app-4',
  data: {
    message: 'Hello'
  },
  // created 钩子：在实例创建完成后被立即调用。
  // 在这一步，实例已完成数据观测、属性和方法的运算，但 $el 属性尚不可用。
  created: function () {
    // `this` 指向 vm 实例
    console.log('实例已创建，message is: ' + this.message); // 可以访问 data
  },
  // mounted 钩子：在 el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。
  // 在这一步，DOM 已经渲染完成，可以进行 DOM 操作。
  mounted: function () {
    console.log('实例已挂载到 DOM');
    // 可以在这里操作 DOM
    console.log(document.getElementById('app-4').textContent);
  },
  // updated 钩子：数据更新时调用。
  updated: function () {
    console.log('视图已更新');
  }
});
```

说明：

- ​**​`created`​**​: 这个钩子在 Vue 实例被创建后立即同步调用。此时实例已经可以访问 `data`​ 和 `methods`​，但尚未挂载到 DOM 上。适合用于初始化数据、发起网络请求等。
- ​**​`mounted`​**​: 这个钩子在实例被挂载到页面上之后调用（即 `el`​ 选项对应的 DOM 元素被 Vue 实例的模板替换后）。此时可以通过 `this.$el`​ 访问到 DOM 元素，适合执行依赖 DOM 的操作。
- ​**​`updated`​**​: 当实例的 `data`​ 发生变化，导致虚拟 DOM 重新渲染和打补丁后，会调用此钩子。你可以此钩子中执行依赖于更新后 DOM 的操作。

---

‍
