# java面向对象进阶

## java面向对象进阶

```
static,继承，多态，final,抽象类，接口，内部类，匿名内部类，泛型，泛型类，泛型接口
```

**目标**：用一个小项目（`src`​ 下的若干 Java 文件）把 `static`​、继承/多态、`final`​、抽象类、接口、内部类与匿名内部类、泛型（类/方法/接口）等核心面向对象与泛型知识点串起来、讲透。

`src`​ 下文件（`Main.java`​, `StaticDemo.java`​, `Animal.java`​, `Dog.java`​, `Cat.java`​, `FinalDemo.java`​, `MyInterface.java`​, `MyInterfaceImpl.java`​, `OuterClass.java`​, `GenericBox.java`​, `GenericProcessor.java`​, `GenericProcessorImpl.java`​）

---

## 概览

​`static`​（静态成员）详解 — `StaticDemo.java`​

抽象类、继承与多态 — `Animal.java`​ / `Dog.java`​ / `Cat.java`​ / `Main.java`​

​`final`​ 的三种用法 — `FinalDemo.java`​

接口（含 default / static） — `MyInterface.java`​ / `MyInterfaceImpl.java`​

内部类、静态内部类、局部内部类、匿名内部类 — `OuterClass.java`​ + `Main.java`​ 示例

泛型：泛型类、泛型方法、泛型接口与实现 — `GenericBox.java`​ / `GenericProcessor.java`​ / `GenericProcessorImpl.java`​

---

## 项目结构

所有文件均在`src`​ 根目录

- ​`Main.java`​

  - 程序入口。通过打印与调用各类方法来演示所有知识点的运行效果。
- ​`StaticDemo.java`​

  - 演示 `static`​：静态变量、静态方法、静态初始化块、静态内部类。
- ​`Animal.java`​（抽象类）

  - 抽象方法、普通方法、`final`​ 方法示例；作为继承/多态的基类。
- ​`Dog.java`​, `Cat.java`​（继承类）

  - 分别实现 `Animal`​ 的抽象方法并展示特有方法、覆盖普通方法等。
- ​`FinalDemo.java`​

  - 演示 `final`​ 在类、方法、变量上的语义。
- ​`MyInterface.java`​, `MyInterfaceImpl.java`​

  - 演示接口、接口默认方法（`default`​）、接口静态方法（`static`​）以及实现类如何使用。
- ​`OuterClass.java`​

  - 演示：非静态内部类、静态内部类、局部内部类（方法内）、如何访问外部成员等。
- ​`GenericBox.java`​

  - 泛型类与泛型方法示例，演示类型参数 `<T>`​ 与方法级别泛型 。
- ​`GenericProcessor.java`​, `GenericProcessorImpl.java`​

  - 泛型接口与实现类（`GenericProcessor<T>`​），展示接口如何声明泛型与实现类如何指定/保留泛型。

‍

---

## `static`​（静态成员）— `StaticDemo.java`​

### 要点

- ​`static`​ 成员属于类，不属于任何实例（对象）。类加载时（第一次使用类）会初始化静态成员。
- 静态变量在内存中只有一份（类级别），所有对象共享。
- 静态方法没有 `this`​，不能直接访问实例字段或方法（除非通过对象引用）。
- 静态初始化块（`static { ... }`​）用于复杂的静态初始化逻辑，类首次加载时执行一次。
- 静态内部类（`public static class X`​）等价于外部类的静态成员，不持有外部类实例引用。
- 说明：多次 new `StaticDemo`​ 不会重复执行静态初始化块。
- `StaticHelper`​（静态内部类）可以直接访问 `StaticDemo.count`​。

### 代码

```java
/**
 * StaticDemo.java
 * 演示 static 关键字（静态变量、静态方法、静态初始化块、静态内部类）
 *
 * 说明：
 *  - static 成员属于类本身，不属于某个实例（对象）。
 *  - 静态方法只能直接访问静态成员，不能直接访问实例成员（没有 this）。
 *  - 静态内部类（StaticNested）与外部类实例无关，可以直接 new。
 */
public class StaticDemo {
    // 静态变量：类加载时初始化，所有实例共享

    // 这个变量 不是属于某个对象的
    //
    //是属于 类本身的
    //
    //所有对象都共享同一个 count

    public static int count = 0;

    // 静态初始化块：类第一次被加载时执行一次（用于复杂初始化）
    static {
        System.out.println("StaticDemo 类被加载，静态初始化块执行");
        count = 100; // 示例赋初值
    }

    // 静态方法 不用 new 对象，可以直接用类名调用
    public static void printStatic() {
        System.out.println("这是静态方法 printStatic()，当前 count = " + count);
    }

    // 非静态方法（示例对比）

    /*
    这个必须通过对象调用：

    StaticDemo demo = new StaticDemo();
    demo.printInstance();

     */

    public void printInstance() {
        System.out.println("这是实例方法 printInstance()");
    }

    // 静态内部类（等价于外部类的静态成员）
    public static class StaticHelper {
        public void help() {
            // 可以直接访问外部类的静态成员
            System.out.println("StaticHelper.help() 访问 StaticDemo.count = " + StaticDemo.count);
        }
    }
}
```

---

## 抽象类、继承与多态 — `Animal.java`​ / `Dog.java`​ / `Cat.java`​

### 要点

- **抽象类**：包含抽象方法（没有实现）和具体方法。抽象类不能实例化，常用于定义“模板”和公共行为。关键字 `abstract`​。
- **继承**：子类 `extends`​ 父类，获得父类成员（可覆盖可继承）。构造时通过 `super()`​ 调用父类构造。
- **多态**：父类引用可以指向子类对象（`Animal a = new Dog()`​），在调用时发生动态绑定（运行时决定方法实现）。编译器以引用类型检查可调用的方法，运行时以对象真实类型执行具体实现。
- **向下转型**：将父类引用转换成子类引用需要显式强制转换（`(Dog) a`​），并建议先用 `instanceof`​ 检查。
- 通过 `Main.java`​：`Animal a1 = new Dog("旺财"); a1.makeSound();`​ 展示动态绑定（调用 `Dog`​ 的实现）。
- `finalInfo()`​ 为 `final`​ 方法，子类不能覆盖
- 向下转型示例：`if (unknown instanceof Dog) { Dog d = (Dog) unknown; d.fetch(); }`​。

### 代码

​`Animal.java`​

```java
/**
 * Animal.java
 * 抽象类示例
 *
 * 说明：
 *  - 抽象类可以包含抽象方法（没有实现）和普通方法。
 *  - 抽象类不能被实例化（new Animal() 会报错）。
 *  - 抽象类适合"部分实现"、"模板设计"的场景。
 */
public abstract class Animal {

    protected String name;

    //构造方法（Constructor）。
    //
    //构造方法有什么作用？
    //
    //当你 new 一个对象时，用来给对象做初始化。
    //Animal a = new Animal("猫");
    public Animal(String name) {
        this.name = name;
    }

    // 抽象方法：子类必须实现
    public abstract void makeSound();

    // 普通方法：子类可继承、也可以覆盖（override）
    public void eat() {
        System.out.println(name + " 在吃东西");
    }

    // final 方法：子类不能覆盖（不能重写），但可以被继承
    public final void finalInfo() {
        System.out.println(name + " 的 finalInfo（不可被重写）");
    }
}
```

​`Dog.java`​：

```java
/**
 * Dog.java
 * 继承自 Animal（演示继承、重写、向下转型可调用特有方法）
 */
public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    // 实现抽象方法
    @Override
    public void makeSound() {
        System.out.println(name + "：汪汪！");
    }

    // Dog 的特有方法（抽象类引用转为 Dog 后才能调用）
    public void fetch() {
        System.out.println(name + " 去叼球！");
    }

    // 在抽象类中已经有 finalInfo()，不能被重写
    public void finalMethodDemo() {
        System.out.println("调用 Animal.finalInfo():");
        finalInfo();
    }
}
```

​`cat.java`​：

```java
/**
 * Cat.java
 * 继承自 Animal，演示覆盖（override）
 */
public class Cat extends Animal {
    public Cat(String name) {
        super(name);//调用父类（Animal）的构造方法，把 name 传给父类去初始化。
    }

    @Override
    public void makeSound() {
        System.out.println(name + "：喵喵！");
    }

    // 覆盖 eat()（不是 final，所以可以覆盖）
    @Override
    public void eat() {
        System.out.println(name + " 小口小口地吃猫粮");
    }
}
```

## `final`​ 的三种用法 — `FinalDemo.java`​

### 要点

- ​`final`​ 可以修饰类（`public final class C`​）：表示该类不能被继承（例如 `String`​）。
- ​`final`​ 可以修饰方法（`public final void m()`​）：表示该方法不能被子类覆盖（override）。
- ​`final`​ 可以修饰变量（局部变量或字段）：赋值后不可变（常量）。对于对象引用，`final`​ 意味着引用不可变，但对象内部状态仍可变（除非对象不可变设计）。

### 代码

```java
/**
 * FinalDemo.java
 * 演示 final 关键字在类、方法、变量上的使用
 *
 * 说明：
 *  - final 类：不能被继承（例如 String 是 final 的）。
 *  - final 方法：不能被子类重写。
 *  - final 变量：一旦赋值后不能改变（常量）。
 */

// final 类示例：不能被继承
public final class FinalDemo {
    // final 成员变量（常量）
    private final String name = "FinalDemo实例";

    // final 方法（不能被重写）
    public final void sayHello() {
        System.out.println("Hello from FinalDemo, name = " + name);
    }
}
```

---

## 接口（含 `default`​ / `static`​） — `MyInterface.java`​ / `MyInterfaceImpl.java`​

接口（interface）是一种**能力规范**，只定义“能做什么”，不关心“怎么做”。接口里通常只有方法的声明，而实现类通过 `implements`​ 接口，必须把这些方法全部实现，从而获得接口规定的能力。接口支持多实现，一个类可以同时实现多个接口，因此非常适合扩展功能、实现多态、统一规范。简单来说：**抽象类定义“是什么”，接口定义“能做什么”。**

### 要点

- 接口是方法签名的集合（Java 8 起允许带实现的 `default`​ 方法和 `static`​ 方法）。
- 类使用 `implements`​ 实现接口，必须实现接口的抽象方法（除非类为抽象类）。
- 接口支持多实现（类可以实现多个接口），比单继承更灵活。
- ​`default`​ 方法用于在接口中提供默认实现（方便在不破坏已有实现类的情况下扩展接口）。
- ​`static`​ 方法在接口中类似工具方法，只能通过接口名调用（`MyInterface.staticMethod()`​）。
- 用 `MyInterfaceImpl`​ 的 `sayHello()`​ 展示接口实现。
- 展示 `MyInterface.staticMethod()`​ 的调用。
- 接口与抽象类的区别（抽象类可以有字段和构造函数；接口更侧重行为规范；接口支持多实现）。

### 代码

​`MyInterface.java`​

```java
/**
 *
 * MyInterface.java
 * 接口示例（包含抽象方法、默认方法、静态方法）
 *
 * 说明：
 *  - 接口可以被类实现（implements）。
 *  - Java8+ 接口可以有 default 方法（带实现）和 static 方法。
 *  - 接口方法默认是 public abstract（除非是 default/static）。
 */

public interface MyInterface {
    // 抽象方法（实现类必须实现）
    void sayHello();

    // 默认方法：实现类可以选择覆盖，也可以使用接口提供的默认实现
    default void defaultGreet() {
        System.out.println("接口默认 greet()");
    }

    // 静态方法：通过接口名调用
    static void staticMethod() {
        System.out.println("接口静态方法 staticMethod()");
    }
}
```

​`MyInterfaceImpl.java`​

```java
/**
 * MyInterfaceImpl.java
 * MyInterface 的实现类
 */
public class MyInterfaceImpl implements MyInterface {
    @Override
    public void sayHello() {
        System.out.println("MyInterfaceImpl 实现 sayHello()");
    }

    // 可以选择覆盖 defaultGreet()，这里我们不覆盖，使用默认实现
}
```

## 内部类、静态内部类、局部内部类、匿名内部类 — `OuterClass.java`​ / `Main.java`​

### 要点

- **非静态内部类（Inner）** ：每个内部类实例隐含持有外部类实例引用（可以直接访问外部类的实例字段）。实例化需要外部类实例：`outer.new Inner(...)`​。
- **静态内部类（StaticNested）** ：像静态成员一样，与外部实例无关；不能直接访问外部实例字段，只能访问静态成员。
- **局部内部类**：在方法内部定义的类，作用域仅限该方法，常用于封装方法局部逻辑。
- **匿名内部类**：没有类名的内部类，常用于快速实现接口或继承类（如 `new Runnable() { ... }`​）。在 Java 8+ 可用 lambda 替代（当接口为函数式接口时）。
- 通过 `OuterClass`​ 的示例展示如何分别 new 内部类和静态内部类：

  - ​`OuterClass.Inner inner = outer.new Inner(42);`​
  - ​`OuterClass.StaticNested nested = new OuterClass.StaticNested("x");`​
- 匿名内部类：常见场景 `new Runnable() { public void run() { ... } }`​

### 代码

​`OuterClass.java`​

```java
/**
 * OuterClass.java
 * 演示内部类（非静态内部类）、静态内部类、以及如何访问外部类成员
 *
 * 说明：
 *  - 非静态内部类（Inner）持有外部类引用，可以访问外部类的实例成员。
 *  - 静态内部类（StaticNested）不持有外部类实例引用，只能访问外部类的静态成员。
 */
public class OuterClass {
    private String outerName;
    public static String staticOuter = "外部类静态成员";

    public OuterClass(String name) {
        this.outerName = name;
    }

    // 非静态内部类（Inner）
    public class Inner {
        private int value;

        public Inner(int value) {
            this.value = value;
        }

        public void print() {
            // 访问外部类的实例成员
            System.out.println("Inner: outerName = " + outerName + ", value = " + value);
        }
    }

    // 静态内部类（StaticNested）
    public static class StaticNested {
        private String name;
        public StaticNested(String name) {
            this.name = name;
        }
        public void print() {
            System.out.println("StaticNested: name = " + name + ", staticOuter = " + staticOuter);
        }
    }

    // 方法示例：在方法内部定义局部内部类（只能在方法内使用）
    public void methodWithLocalClass() {
        class Local {
            void hello() {
                //局部内部类可以访问外部类的实例变量
                System.out.println("Local class 可以访问 outerName = " + outerName);
            }
        }
        Local l = new Local();
        l.hello();
    }
}
```

---

## 泛型：泛型类、泛型方法、泛型接口与实现

文件：`GenericBox.java`​, `GenericProcessor.java`​, `GenericProcessorImpl.java`​

### 要点

- **泛型类**：在类定义时使用类型参数（`class GenericBox<T>`​），实例化时指定具体类型（`new GenericBox<String>("x")`​），类型安全、避免强转。
- **泛型方法**：方法本身声明类型参数（`public <U> void inspect(U u)`​），可以与类的泛型参数无关。
- **泛型接口**：接口声明类型参数（`interface GenericProcessor<T>`​），实现类可以在实现时指定具体类型或继续保持泛型（`class GenericProcessorImpl<T> implements GenericProcessor<T>`​）。
- **类型擦除**：Java 泛型在运行时通过类型擦除实现，所有泛型信息在编译期检查，运行时丢失。编写泛型代码要注意与 `instanceof`​、原始类型兼容性等问题。

### 代码

​`GenericBox`​：

```java
/**
 * GenericBox.java
 * 泛型类示例
 *
 * 说明：
 *  - 泛型类允许在类定义时使用类型参数 <T>，使用时指定具体类型（类型安全，编译检查）。
 *  - 泛型在运行时会被类型擦除（类型擦除不影响编译期类型检查）。
 */

//T 可以理解为“占位符”，代表任意类型
public class GenericBox<T> {
    private T value;

    public GenericBox(T value) {
        this.value = value;
    }

    // 泛型方法（返回同类型）
    public T get() {
        return value;
    }

    public void set(T value) {
        this.value = value;
    }

    // 泛型方法示例：方法自己声明类型参数 <U>
    public <U> void inspect(U u) {
        System.out.println("T 的类型为: " + value.getClass().getName());
        System.out.println("U 的类型为: " + u.getClass().getName());
    }
}
```

​`GenericProcessor`​：

```java
/**
 * GenericProcessor.java
 * 泛型接口示例
 *
 * 说明：
 *  - 泛型接口定义了方法签名包括类型参数，具体实现类在实现时可以指定类型或继续保持泛型。
 */
public interface GenericProcessor<T> {
    T process(T input);
}
```

​`GenericProcessorImpl`​：

```java
/**
 * GenericProcessorImpl.java
 * 泛型接口实现类示例
 */
public class GenericProcessorImpl<T> implements GenericProcessor<T> {
    @Override
    public T process(T input) {
        // 简单的处理示例：这里只是返回输入（实际可以有复杂逻辑）
        System.out.println("GenericProcessorImpl.process() 被调用，输入类型 = " + input.getClass().getName());
        return input;
    }
}
```

## 综合流程 — `Main.java`​

​`Main.java`​

```java
/**
 * Main.java
 * 程序入口：演示所有概念的使用
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== StaticDemo 演示 ===");

        StaticDemo.printStatic();                // 静态方法调用
        System.out.println("StaticDemo.count = " + StaticDemo.count);

        System.out.println("\n=== 抽象类 + 继承 + 多态 演示 ===");
        // 抽象类 Animal 的引用可以指向其子类对象（多态）
        Animal a1 = new Dog("旺财");
        Animal a2 = new Cat("咪咪");
        a1.makeSound(); // 动态绑定：运行时调用 Dog 的实现
        a2.makeSound(); // 调用 Cat 的实现

        // 抽象类中可以有非抽象(final)方法
        System.out.println("Dog final method demo:");
        ((Dog) a1).finalMethodDemo();

        System.out.println("\n=== final 类 演示 ===");
        FinalDemo finalDemo = new FinalDemo(); //int[] arr = new int[5];

        finalDemo.sayHello();

        System.out.println("\n=== 接口 与 默认方法/静态方法 演示 ===");
        MyInterface impl = new MyInterfaceImpl();
        impl.sayHello();
        MyInterface.staticMethod(); // 接口的静态方法

        System.out.println("\n=== 内部类 与 静态内部类 演示 ===");
        OuterClass outer = new OuterClass("外部X");
        // 非静态内部类需要外部对象实例化
        OuterClass.Inner inner = outer.new Inner(42);
        inner.print();

        // 静态内部类直接 new
        OuterClass.StaticNested staticNested = new OuterClass.StaticNested("静态内部");
        staticNested.print();

        System.out.println("\n=== 匿名内部类 演示 ===");
        // 使用匿名内部类实现 Runnable（常见用法）
        // 匿名内部类是没有名字的内部类，通常用来临时实现接口或继承类，马上创建对象使用。（快速创建任务）
        //r —— 这个名字指向“实现了 Runnable 接口的匿名对象”
        //public interface Runnable {
        //    void run(); // 定义任务的执行内容
        //}

        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("匿名内部类的 run 被调用");
            }
        };
        r.run();

        // 匿名内部类也可直接实现自定义接口
        MyInterface anon = new MyInterface() {
            @Override
            public void sayHello() {
                System.out.println("匿名实现的 sayHello()");
            }
        };
        anon.sayHello();

        System.out.println("\n=== 泛型类 和 泛型方法 演示 ===");

        GenericBox<String> box = new GenericBox<>("你好");
        System.out.println("Box contains: " + box.get());
        GenericBox<Integer> intBox = new GenericBox<>(123);
        System.out.println("Int box: " + intBox.get());

        // 泛型接口与实现
        GenericProcessor<String> processor = new GenericProcessorImpl<>();
        System.out.println("Processed: " + processor.process("abcd"));

        System.out.println("\n=== 多态与 instanceof 与向下转型 演示 ===");

        Animal unknown = new Dog("小黑");
        //检查 unknown 是否是 Dog 类型
        if (unknown instanceof Dog) {
            Dog d = (Dog) unknown; // 向下转型（安全地在 instanceof 检查后进行）
            d.fetch();
        }

        System.out.println("\n=== 示例结束 ===");
    }
}
```

---
