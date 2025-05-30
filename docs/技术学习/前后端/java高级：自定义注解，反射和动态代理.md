# java高级：自定义注解，反射和动态代理

在企业级开发中，Spring 等主流框架广泛应用注解与代理机制实现依赖注入、切面编程（AOP）、事务管理等功能。要真正理解这些框架的底层实现机制，需要掌握三项核心技术：**自定义注解、反射机制与动态代理**。

本文将系统梳理这三者的基础概念、使用方式及典型应用场景，帮助开发者从原理层面构建知识体系。

---

## 一、自定义注解（Custom Annotations）

### 1.1 注解的基本概念

注解（Annotation）是 Java 5 引入的一种元数据机制，允许开发者为类、方法、字段等代码元素添加信息。编译器和运行时工具可以读取这些信息以执行特定逻辑。

例如：

```java
@Override
public String toString() {
    return "Example";
}
```

​`@Override`​ 是一个标准注解，用于提示编译器该方法是重写父类方法。

### 1.2 为什么要自定义注解？

通过自定义注解，我们可以为代码元素打上业务相关的标签，并结合反射机制，在运行时解析注解内容，从而实现配置驱动或声明式编程。

这在日志打印、权限控制、参数校验、事务处理等场景中尤为常见。

### 1.3 自定义注解示例

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogTime {
    String value() default "default log";
}
```

* ​`@Retention(RetentionPolicy.RUNTIME)`​：指定注解在运行时可被 JVM 读取。
* ​`@Target(ElementType.METHOD)`​：该注解仅可用于方法上。
* ​`value()`​：定义注解的一个参数属性，支持默认值。

---

## 二、反射机制（Reflection）

### 2.1 概述

反射是 Java 提供的一种运行时机制，允许开发者在程序运行期间动态获取类的信息并操作其成员。例如可以获取类名、方法名、注解信息，也可以动态调用方法、访问字段等。

### 2.2 结合反射解析注解并执行逻辑

```java
import java.lang.reflect.Method;

public class MyService {

    @LogTime("记录执行时间")
    public void doWork() {
        System.out.println("Working...");
    }

    public static void main(String[] args) throws Exception {
        MyService service = new MyService();
        Method method = service.getClass().getMethod("doWork");

        if (method.isAnnotationPresent(LogTime.class)) {
            LogTime annotation = method.getAnnotation(LogTime.class);
            System.out.println("注解值：" + annotation.value());

            long start = System.currentTimeMillis();
            method.invoke(service); // 反射调用方法
            long end = System.currentTimeMillis();

            System.out.println("耗时：" + (end - start) + "ms");
        }
    }
}
```

这段代码演示了如何通过反射读取注解并在方法执行前后进行性能监控，类似于日志记录与性能分析的 AOP 场景。

---

## 三、动态代理（Dynamic Proxy）

### 3.1 动态代理的意义

在实际开发中，往往需要在方法执行前后添加统一的增强逻辑，例如记录日志、执行权限校验、事务控制等。为了避免在每个方法中重复编写这些逻辑，可以借助代理模式，将增强逻辑集中管理。

### 3.2 使用 JDK 动态代理实现增强

JDK 动态代理适用于代理接口（Interface）的实现类。

#### 示例代码

```java
import java.lang.reflect.*;

interface UserService {
    void login();
}

class UserServiceImpl implements UserService {
    public void login() {
        System.out.println("用户登录中...");
    }
}

class LogHandler implements InvocationHandler {
    private final Object target;

    public LogHandler(Object target) {
        this.target = target;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("方法调用前日志");
        Object result = method.invoke(target, args);
        System.out.println("方法调用后日志");
        return result;
    }
}

public class ProxyTest {
    public static void main(String[] args) {
        UserService target = new UserServiceImpl();
        UserService proxy = (UserService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            new LogHandler(target)
        );

        proxy.login(); // 实际执行的是 LogHandler 的 invoke 方法
    }
}
```

### 3.3 动态代理执行流程

1. 定义接口及实现类（UserService 和 UserServiceImpl）；
2. 实现 InvocationHandler 接口，封装增强逻辑；
3. 使用 `Proxy.newProxyInstance()`​ 创建代理对象；
4. 所有代理对象的方法调用均会被拦截至 `invoke()`​ 方法，统一增强处理。

这正是 Spring AOP 在底层的实现原理之一。

---

## 四、典型应用场景

|技术点|常见应用场景|
| ------------| ------------------------------------------------------|
|自定义注解|声明式事务、参数校验、权限控制、自定义配置解析等|
|反射机制|框架初始化、注解解析、配置扫描、对象实例化等|
|动态代理|AOP 实现、日志记录、性能监控、事务管理、RPC 拦截器等|
