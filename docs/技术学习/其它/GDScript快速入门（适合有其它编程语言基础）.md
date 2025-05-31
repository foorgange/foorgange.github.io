# GDScript快速入门（适合有其它编程语言基础）

# 从零开始学 GDScript

Godot 是一款开源、跨平台的游戏引擎，因其轻量、易用和强大的功能而受到广大开发者的喜爱。在 Godot 中，GDScript 是其专为游戏开发设计的脚本语言，具有简洁的语法和与引擎的深度集成。本文将带你从零开始，逐步掌握 GDScript 的基础知识。

---

## 什么是 GDScript？

GDScript 是 Godot 引擎自带的高级、动态类型的编程语言，语法类似于 Python，但专为游戏开发进行了优化。它与 Godot 的节点系统紧密结合，使得开发者可以更高效地控制游戏逻辑。

---

## 第一个 GDScript 脚本

在 Godot 中，每个场景由多个节点组成。你可以为节点附加脚本，以定义其行为。以下是一个简单的 GDScript 脚本示例：

```gdscript
extends Node2D

func _ready():
    print("Hello, Godot!")
```

* ​`extends Node2D`​：表示该脚本继承自 Node2D 类。
* ​`func _ready()`​：定义了一个在节点准备就绪时自动调用的函数。
* ​`print()`​：在输出窗口打印消息。

---

## 变量与数据类型

GDScript 支持多种数据类型，如整数、浮点数、字符串、布尔值等。你可以使用 `var`​ 关键字声明变量：

```gdscript
var score = 0
var player_name = "Alice"
var is_alive = true
```

从 Godot 4.0 开始，GDScript 引入了静态类型支持，允许你显式声明变量类型：

```gdscript
var score: int = 0
var player_name: String = "Alice"
var is_alive: bool = true
```

使用静态类型可以提高代码的可读性和运行效率。

---

## 控制结构

GDScript 提供了常见的控制结构，如条件语句和循环语句。

### 条件语句

```gdscript
if score > 100:
    print("High score!")
elif score == 100:
    print("Exactly 100!")
else:
    print("Keep trying!")
```

### 循环语句

```gdscript
for i in range(5):
    print(i)
```

上述代码将打印 0 到 4。

---

## 函数与参数

你可以使用 `func`​ 关键字定义函数，并通过参数传递数据：

```gdscript
func greet(name: String):
    print("Hello, " + name)
```

调用函数：

```gdscript
greet("Bob")
```

---

## 信号与事件

Godot 使用信号机制实现节点之间的通信。你可以连接信号到函数，以响应特定事件：

```gdscript
func _on_button_pressed():
    print("Button was pressed!")
```

在编辑器中，将按钮的 `pressed`​ 信号连接到上述函数。

---

# 进阶部分：

‍

## 一、静态类型：提升代码质量与性能

Godot 4.0 引入了更强大的静态类型支持，使得 GDScript 能够在编译时检测更多错误，提升代码的可读性和运行效率。

### 1.1 变量与函数的类型声明

你可以为变量、函数参数和返回值添加类型注解：

```gdscript
var health: int = 100
var name: String = "Hero"

func take_damage(amount: int) -> void:
    health -= amount
```

这样可以在编辑器中获得更好的自动补全和类型检查。

### 1.2 强制静态类型

虽然 GDScript 是动态类型语言，但你可以通过在编辑器中启用类型提示来鼓励使用静态类型。这有助于减少运行时错误，提高代码的健壮性。

---

## 二、信号机制：实现解耦的事件驱动架构

Godot 的信号机制允许节点之间进行松耦合的通信，是实现事件驱动架构的关键。

### 2.1 自定义信号

你可以在脚本中定义自定义信号：

```gdscript
signal health_changed(new_health: int)
```

当需要通知其他节点时，使用 `emit_signal`​ 触发信号：

```gdscript
emit_signal("health_changed", health)
```

### 2.2 连接信号

可以在代码中连接信号到函数：

```gdscript
health_bar.connect("health_changed", self, "_on_health_changed")
```

这样，当 `health_changed`​ 信号被触发时，`_on_health_changed`​ 函数将被调用。

---

## 三、GDScript 2.0 的新特性

Godot 4.0 中的 GDScript 2.0 引入了多项新特性，提升了语言的表达力和灵活性。

### 3.1 Lambda 表达式与函数式编程

GDScript 现在支持匿名函数（Lambda 表达式），使得函数式编程更加方便：

```gdscript
var double = func(x): return x * 2
print(double(4))  # 输出 8
```

### 3.2 `await`​ 关键字与异步编程

使用 `await`​ 可以等待异步操作完成，例如等待动画播放结束：

```gdscript
await $AnimationPlayer.animation_finished
```

这使得异步编程更加直观和简洁。

---

## 四、最佳实践：编写高质量的 GDScript 代码

### 4.1 使用静态类型

尽可能为变量和函数添加类型注解，提升代码的可读性和可维护性。

### 4.2 合理使用信号

利用信号机制实现节点之间的解耦通信，避免直接引用其他节点，增强代码的模块化。

### 4.3 避免硬编码字符串

使用常量或枚举代替硬编码的字符串，减少错误并提高代码的可维护性。

## 五、推荐资源

* [Godot 官方文档（英文）](https://docs.godotengine.org/en/stable/)
* [GDQuest 的 GDScript 教程](https://gdquest.com/tutorial/godot/)
* [GDScript 2.0 新特性介绍](https://gdscript.com/articles/godot-4-gdscript/)
