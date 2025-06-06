# java开发常用注解

## 一、Java内置注解

### 1.1 @Override

**作用：**   
标记一个方法是重写自父类的方法。编译器会检查重写是否正确，防止因拼写错误或参数不匹配而未真正重写。

**示例：**

```java
public class Animal {
    public void sound() {
        System.out.println("Animal sound");
    }
}

public class Dog extends Animal {
    @Override
    public void sound() {  // 如果没有正确重写，编译器会报错
        System.out.println("Bark");
    }
}
```

### 1.2 @Deprecated

**作用：**   
标记某个类、方法或字段已过时，建议使用替代方案。使用该注解时，编译器会提示警告。

**示例：**

```java
public class OldApi {
    @Deprecated
    public void oldMethod() {
        System.out.println("This method is deprecated.");
    }
}

public class Test {
    public static void main(String[] args) {
        OldApi api = new OldApi();
        api.oldMethod(); // 编译时会提示警告，建议不要使用
    }
}
```

### 1.3 @SuppressWarnings

**作用：**   
抑制编译器的警告信息，常用于处理泛型、未检查类型转换等问题。

**示例：**

```java
public class WarningDemo {
    @SuppressWarnings("unchecked")
    public void process() {
        List rawList = new ArrayList();
        rawList.add("item");
        // 转换时可能会产生 unchecked 警告，但被此注解抑制
    }
}
```

---

## 二、元注解

元注解用于修饰其他注解，主要包括：

### 2.1 @Retention

**作用：**   
指定注解保留的级别。主要取值有：

* **SOURCE**：注解仅存在于源码中，编译后被丢弃；
* **CLASS**：注解存在于字节码中，但运行时不可见；
* **RUNTIME**：运行时可通过反射获取。

**示例：**

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
public @interface RuntimeAnnotation {
    String info() default "";
}
```

### 2.2 @Target

**作用：**   
指定注解应用到哪些程序元素上，例如：

* **ElementType.TYPE**：类、接口、枚举
* **ElementType.METHOD**：方法
* **ElementType.FIELD**：字段
* **ElementType.PARAMETER**：方法参数

**示例：**

```java
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyTargetAnnotation {
    String value();
}
```

### 2.3 @Documented 与 @Inherited

**作用：**

*  **@Documented**：表示该注解将包含在 Javadoc 中。
*  **@Inherited**：表示子类会继承父类的注解。

**示例：**

```java
import java.lang.annotation.*;

@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface MyInheritedAnnotation {
    String role();
}
```

---

## 三、自定义注解

### 3.1 简单自定义注解

自定义注解通常由 `@interface`​ 声明，可包含成员变量和默认值。

**示例：**

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface AuditLog {
    String action();
    String description() default "No description provided";
}
```

**使用示例：**

```java
public class AccountService {
    @AuditLog(action = "转账", description = "记录转账操作")
    public void transfer(double amount) {
        // 转账逻辑
    }
}
```

### 3.2 参数级别的自定义注解

例如，用于方法参数的校验或提示。

**示例：**

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface ParamValid {
    String value() default "default validation";
}
```

**使用示例：**

```java
public class UserController {
    public void updateUser(@ParamValid("userId must be positive") int userId,
                           @ParamValid("userName should not be empty") String userName) {
        // 更新逻辑
    }
}
```

### 3.3 重复注解

Java 8 引入了重复注解，允许在同一程序元素上使用同一类型的注解多次，需要定义一个容器注解。

**示例：**

```java
import java.lang.annotation.*;

@Repeatable(Schedules.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Schedule {
    String day();
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Schedules {
    Schedule[] value();
}
```

**使用示例：**

```java
public class WorkSchedule {
    @Schedule(day = "Monday")
    @Schedule(day = "Tuesday")
    public void work() {
        // 工作逻辑
    }
}
```

### 3.4 类型注解

Java 8 还支持在任意使用类型的地方使用注解，这对于静态检查工具十分有用。

**示例：**

```java
import java.lang.annotation.*;

@Target({ElementType.TYPE_USE, ElementType.TYPE_PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface NonNull {
}
```

**使用示例：**

```java
public class DataProcessor {
    private @NonNull String data;

    public void setData(@NonNull String data) {
        this.data = data;
    }

    public @NonNull String getData() {
        return data;
    }
}
```

---

## 四、框架中常用的注解示例

### 4.1 Spring框架

#### 4.1.1 依赖注入相关

*  **@Component / @Service / @Repository / @Controller**  
  用于标记组件，告诉 Spring 该类需要被管理。

  ```java
  @Service
  public class OrderService {
      // 业务逻辑
  }
  ```
*  **@Autowired**  
  自动注入 Bean。

  ```java
  @RestController
  public class OrderController {
      @Autowired
      private OrderService orderService;
  }
  ```
*  **@Qualifier**  
  当存在多个 Bean 时，用于指定注入哪个 Bean。

  ```java
  @Autowired
  @Qualifier("primaryOrderService")
  private OrderService orderService;
  ```

#### 4.1.2 配置与Bean创建

*  **@Configuration &amp; @Bean**  
  通过 Java 代码定义配置类和 Bean。

  ```java
  @Configuration
  public class AppConfig {
      @Bean
      public UserService userService() {
          return new UserServiceImpl();
      }
  }
  ```
*  **@PropertySource &amp; @Value**  
  从外部属性文件中加载配置，并注入到 Bean 中。

  ```java
  @Configuration
  @PropertySource("classpath:application.properties")
  public class PropertyConfig {
      @Value("${app.name}")
      private String appName;
  }
  ```

#### 4.1.3 事务管理

*  **@Transactional**  
  声明方法或类使用事务管理，确保数据一致性。

  ```java
  @Service
  public class PaymentService {
      @Transactional(rollbackFor = Exception.class)
      public void processPayment(Payment payment) {
          // 处理支付逻辑
      }
  }
  ```

#### 4.1.4 AOP（面向切面编程）

*  **@Aspect, @Before, @AfterReturning, @Around**  
  用于定义切面以及前置、后置、环绕通知等。

  ```java
  @Aspect
  @Component
  public class LoggingAspect {
      @Before("execution(* com.example.service.*.*(..))")
      public void logBefore(JoinPoint joinPoint) {
          System.out.println("Entering: " + joinPoint.getSignature().getName());
      }

      @AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", returning = "result")
      public void logAfterReturning(JoinPoint joinPoint, Object result) {
          System.out.println("Exiting: " + joinPoint.getSignature().getName() + " with result: " + result);
      }
  }
  ```

### 4.2 Hibernate/JPA注解

*  **@Entity, @Table, @Id, @GeneratedValue, @Column**  
  用于将 Java 类映射到数据库表，并定义字段属性。

  ```java
  @Entity
  @Table(name = "users")
  public class User {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      @Column(name = "username", nullable = false, length = 50)
      private String username;

      @Column(name = "password", nullable = false)
      private String password;
  }
  ```
*  **@OneToMany, @ManyToOne, @ManyToMany**  
  定义实体之间的关系。

  ```java
  @Entity
  public class Department {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      @OneToMany(mappedBy = "department")
      private List<Employee> employees;
  }

  @Entity
  public class Employee {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      @ManyToOne
      @JoinColumn(name = "dept_id")
      private Department department;
  }
  ```

---

## 五、Android中注解的应用（举例说明）

在 Android 开发中，注解不仅用于编译时类型检查，还广泛用于自动生成代码（如 ButterKnife、Dagger2）。例如：

### 5.1 用于视图绑定（ButterKnife 示例）

*  **@BindView**  
  自动绑定 View 控件。

  ```java
  public class MainActivity extends Activity {
      @BindView(R.id.tv_title)
      TextView titleText;

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          ButterKnife.bind(this);  // 自动生成绑定代码
          titleText.setText("Hello, Annotation!");
      }
  }
  ```

### 5.2 用于事件绑定（自定义 @OnClick 实现）

* 自定义实现点击事件注解，通过 APT 和动态代理技术将点击事件自动映射到对应方法上。  
  **定义事件基注解：**

  ```java
  @Target(ElementType.ANNOTATION_TYPE)
  @Retention(RetentionPolicy.RUNTIME)
  public @interface EventBase {
      String listenerSetter();
      Class<?> listenerType();
      String callbackMethod();
  }
  ```

  **定义点击注解 @OnClick：**

  ```java
  @Target(ElementType.METHOD)
  @Retention(RetentionPolicy.RUNTIME)
  @EventBase(listenerSetter = "setOnClickListener",
             listenerType = View.OnClickListener.class,
             callbackMethod = "onClick")
  public @interface OnClick {
      int[] value() default -1;
  }
  ```

  **使用示例：**

  ```java
  public class MainActivity extends Activity {
      @OnClick(R.id.btn_submit)
      public void onSubmitClick(View view) {
          Toast.makeText(this, "Button clicked!", Toast.LENGTH_SHORT).show();
      }

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          InjectUtils.inject(this); // 通过反射和动态代理实现事件绑定
      }
  }
  ```

注解处理工具会扫描 `@OnClick`​ 注解，并生成或动态代理代码实现点击监听，从而减少样板代码【

[cnblogs.com](https://www.cnblogs.com/qiyuexiaxun/p/16983603.html)

】。---

## 六、总结

通过以上丰富的示例与详细说明，你可以看到 Java 注解不仅能用于简单的编译时标记，还能与 AOP、依赖注入、事务管理、ORM 映射等技术深度结合。在 Android 中，注解同样在视图绑定和事件处理方面发挥巨大作用。掌握内置注解、元注解以及如何自定义注解，并了解它们在不同框架下的应用，将大大提升你的代码质量和开发效率。

‍

---

### 框架注解详解

## 一、Spring 框架常用注解

### 1.1 应用入口与配置类

*  **@SpringBootApplication**  
  **解释：**  这是 Spring Boot 应用的入口注解。它综合了 @Configuration（配置类）、@ComponentScan（组件扫描）和 @EnableAutoConfiguration（自动配置）三个注解。  
  **通俗比喻：**  就像在一个工厂的门口贴上“本厂自动装配所有零件”，让工厂自动识别和加载所需的各个部分。
*  **@Configuration**  
  **解释：**  用来标识一个 Java 类是一个配置类，这个类里面可以定义各种 Bean。  
  **通俗比喻：**  就像一个“设置面板”，在这里你可以告诉系统如何创建和配置各种组件。
*  **@Bean**  
  **解释：**  用在 @Configuration 类中，表示方法返回的对象需要交由 Spring 管理（即成为 Spring 容器中的一个 Bean）。  
  **通俗比喻：**  就像你在“设置面板”里写下一个配方，告诉系统如何做出某个成品，然后系统按照配方制作并管理它。
*  **@PropertySource** 与  **@Value**  
  **解释：**  @PropertySource 用于加载外部配置文件（如 .properties 或 .yml），而 @Value 用于把配置文件中的值注入到字段中。  
  **通俗比喻：**  就像你从一本说明书中摘取配方中需要的原材料信息，然后把这些信息填进自己的菜谱里。

### 1.2 组件扫描与依赖注入

* **@Component、@Service、@Repository、@Controller / @RestController**  
  **解释：**  这些注解用于标记一个类属于哪个层次：

  *  **@Controller / @RestController**：处理 HTTP 请求（前端控制器）；@RestController 是 @Controller 和 @ResponseBody 的组合，直接返回数据。
  *  **@Service**：业务逻辑层，处理复杂业务操作。
  *  **@Repository**：数据访问层，操作数据库。
  *  **@Component**：通用组件标记，当你不确定归在哪一层时使用。  
    **通俗比喻：**  就像给工厂中的不同车间贴上标签，明确每个车间的职责。
*  **@Autowired**  
  **解释：**  自动把需要的 Bean 注入到目标对象中，简化手动创建和管理依赖的工作。  
  **通俗比喻：**  就像你不需要自己去市场购买所有材料，系统会自动把所需的材料送到你的手边。
*  **@Qualifier**  
  **解释：**  当有多个同类型的 Bean 时，用它来指定到底使用哪一个。  
  **通俗比喻：**  如果市场上有好几个牌子的面粉，而你只想用指定牌子的，这时你就会注明“请用 XX 面粉”。

### 1.3 生命周期、懒加载与性能优化

*  **@Lazy**  
  **解释：**  延迟加载 Bean，即只有当你真正需要时才会创建它。  
  **通俗比喻：**  就像你在家里不会提前把所有的家电都开着，只有在需要用的时候才打开，节约能量。
*  **@Scope**  
  **解释：**  定义 Bean 的作用域，如单例（singleton）、原型（prototype）、request（每次请求一个）和 session（每个会话一个）。  
  **通俗比喻：**  就像你买的某个工具是全家共享（单例）还是每个人都有一份（原型）。
*  **@Transactional**  
  **解释：**  声明某个方法或类要参与事务管理，确保一组操作要么全部成功，要么全部回滚。  
  **通俗比喻：**  就像银行转账，钱要么全转过去，要么一点也不动，保证账户数据一致。
*  **@Cacheable**  
  **解释：**  用于方法级别，将方法的返回值缓存起来，下次调用时直接返回缓存数据，提高性能。  
  **通俗比喻：**  类似于记事本，当你第一次查询后把结果记下来，下次再查询就直接查记事本，而不必重复劳动。

### 1.4 AOP（面向切面编程）相关注解

*  **@Aspect**  
  **解释：**  标记一个类为切面，负责封装横切关注点（如日志、安全检查、性能监控等）的逻辑。  
  **通俗比喻：**  就像在工厂中设立一个质量监控部门，独立处理各车间都需要的公共监控任务，而不干扰各自的生产。
*  **@Before、@AfterReturning、@AfterThrowing、@Around**  
  **解释：**  分别用于在目标方法执行前、返回后、异常后和环绕执行时添加通知逻辑。  
  **通俗比喻：**  就像你在上班前检查出门必备的东西（前置通知）、下班后总结当天的成绩（后置通知）或在遇到问题时采取补救措施（异常通知）。
*  **@Pointcut**  
  **解释：**  定义哪些方法需要被切面拦截，相当于一个过滤器。  
  **通俗比喻：**  就像工厂中设置的门禁系统，只允许符合条件的员工进入某些区域。

---

## 二、Spring MVC 常用注解

*  **@RestController**  
  **解释：**  相当于 @Controller 与 @ResponseBody 的组合，用于直接返回数据而非视图。  
  **通俗比喻：**  就像快递直接送货上门，不用再经过中转或包装。
*  **@RequestMapping / @GetMapping / @PostMapping / @PutMapping / @DeleteMapping / @PatchMapping**  
  **解释：**  用于映射 HTTP 请求到特定方法上，帮助你定义 API 接口。  
  **通俗比喻：**  就像在路标上写明不同的路线，告诉每个请求“该往哪儿走”。
*  **@PathVariable**  
  **解释：**  从 URL 路径中提取变量（例如 /user/{id} 中的 id）。  
  **通俗比喻：**  就像你看到地址中的门牌号，可以直接识别出是哪个房间。
*  **@RequestParam**  
  **解释：**  用于获取 URL 查询参数（例如 /search?keyword\=java）。  
  **通俗比喻：**  就像在问路时，你提供具体的关键词来获取方向。
*  **@RequestBody** 与  **@ResponseBody**  
  **解释：**  前者将请求体（通常为 JSON）转换为 Java 对象；后者将 Java 对象直接作为响应返回。  
  **通俗比喻：**  就像翻译服务，把收到的外文信息翻译成你能理解的语言，再把你的回答直接反馈出去。
*  **@ExceptionHandler** 与  **@ControllerAdvice**  
  **解释：**  前者用于在控制器中捕获特定异常；后者用于全局捕获所有控制器的异常。  
  **通俗比喻：**  就像设置紧急救援电话，当某个部门出现问题时，可以统一调度专业人员处理。

---

## 三、JPA / Hibernate 注解

*  **@Entity**  
  **解释：**  标记一个类为数据库实体，对应数据库中的一张表。  
  **通俗比喻：**  就像给每个实体贴上标签，说明“这张纸就是数据库中的一张表”。
*  **@Table**  
  **解释：**  指定实体对应的表名及其他表级属性。  
  **通俗比喻：**  就像在表格上写明标题和说明，明确这份数据的存储位置。
*  **@Id** 与  **@GeneratedValue**  
  **解释：**  @Id 标记主键；@GeneratedValue 定义主键生成策略（如自增长）。  
  **通俗比喻：**  就像每个档案都有一个唯一编号，并告诉系统这个编号如何自动生成。
*  **@Column**  
  **解释：**  用于指定字段映射到数据库表中的列属性，如名称、长度、是否允许为空。  
  **通俗比喻：**  就像在填写表单时注明每个字段的格式要求。
* **关系注解：@OneToMany、@ManyToOne、@OneToOne、@ManyToMany**  
  **解释：**  用于定义实体之间的关联关系，告诉框架如何在数据表间建立连接。  
  **通俗比喻：**  就像描述家族中父母与子女、兄弟姐妹之间的关系，让系统知道如何关联这些数据。
*  **@JoinColumn** 与  **@JoinTable**  
  **解释：**  指定关联时所使用的外键或中间关联表的详细信息。  
  **通俗比喻：**  就像说明两个部门之间如何通过“联络簿”来沟通和共享信息。
*  **@Transient**  
  **解释：**  标记不需要持久化到数据库的字段。  
  **通俗比喻：**  就像你写的草稿不需要保存到正式档案里，只是临时使用的笔记。
*  **@Enumerated**  
  **解释：**  指定枚举类型的存储方式（存名称或数值）。  
  **通俗比喻：**  就像你决定是用汉字还是数字记录性别。
*  **@Version**  
  **解释：**  用于乐观锁管理，防止并发更新时数据丢失。  
  **通俗比喻：**  就像你在文件上加版本号，确保更新前后不会出现冲突。

---

## 四、MyBatis 及相关注解

*  **@Mapper**  
  **解释：**  标记接口为 MyBatis 的映射器，框架会自动生成实现。  
  **通俗比喻：**  就像给一个操作说明贴上“自动执行”标签，告诉系统该接口中的方法对应数据库操作。
*  **@Select、@Insert、@Update、@Delete**  
  **解释：**  直接在接口方法上书写 SQL 语句，指定查询、插入、更新或删除操作。  
  **通俗比喻：**  就像你在菜单上写明菜谱的制作方法，系统直接根据说明执行操作。
* **MyBatis-Plus 注解**（例如  **@TableName、@TableId、@TableField**）  
  **解释：**  用于简化实体与数据库表之间映射的配置。  
  **通俗比喻：**  就像给每个字段标上标签，告诉系统如何和数据库表中的列一一对应。

---

## 五、Swagger / OpenAPI 注解

*  **@Api**  
  **解释：**  用于描述一个控制器，提供接口文档的整体说明。  
  **通俗比喻：**  就像为整个店铺写一个介绍，让用户了解这里提供的服务。
*  **@ApiOperation**  
  **解释：**  描述某个接口方法的功能，生成详细的 API 文档。  
  **通俗比喻：**  就像在菜单上详细写出每道菜的做法和特点。
*  **@ApiParam**  
  **解释：**  描述接口方法中参数的意义。  
  **通俗比喻：**  就像说明每个菜谱中原料的作用和注意事项。
*  **@ApiModel 与 @ApiModelProperty**  
  **解释：**  用于描述数据模型和属性，帮助生成结构化文档。  
  **通俗比喻：**  就像对产品的各个属性进行说明，便于用户理解和使用。

---

## 六、其他常见注解

### 6.1 Lombok 注解

虽然不属于框架注解，但在现代开发中非常常用，用于减少样板代码：

*  **@Data**  
  **解释：**  自动生成 getter、setter、toString、equals 和 hashCode 方法。  
  **通俗比喻：**  就像让电脑帮你把所有琐碎的“组装”工作都做好，你只关注核心业务。
*  **@Getter / @Setter / @NoArgsConstructor / @AllArgsConstructor**  
  **解释：**  分别自动生成各自对应的方法或构造函数。  
  **通俗比喻：**  就像你只写下核心逻辑，其他的 boilerplate 工作自动完成。

### 6.2 其他依赖注入框架

例如 Dagger、Guice、Hilt 等：

*  **@Inject**  
  **解释：**  与 Spring 的 @Autowired 类似，用于自动注入依赖。  
  **通俗比喻：**  就像系统自动帮你准备所需工具，无需你手动去找。
*  **@Module 与 @Provides**  
  **解释：**  在 Dagger 中定义如何构造对象的“配方”。  
  **通俗比喻：**  就像告诉系统“这是我做菜的配方，照着做就对了”。
*  **@Singleton**  
  **解释：**  确保整个系统中只存在该 Bean 的一个实例。  
  **通俗比喻：**  就像一个工厂里只有一台主控机器，其他都围绕它运作。

---

## 总结

这些注解覆盖了各个主流框架中的常用场景，从 Spring 的依赖注入、事务管理、AOP，到 JPA/Hibernate 的对象关系映射，再到 MyBatis、Swagger 等工具的 API 文档描述，都可以通过注解大大简化配置和开发工作。

在解释这些晦涩名词时，我们可以把它们看作是给代码“贴标签”的工具——这些标签不仅告诉系统如何处理各个部分，还让开发者之间的沟通更加明确。  
例如：

* **依赖注入（DI）/控制反转（IoC）**  就像让系统自动帮你采购所需材料；
* **AOP** 就像设立一个公共服务部门，专门处理日志、安全检查等横切任务；
* **事务管理** 则确保操作像银行转账一样，要么全部成功，要么全部回滚，保证数据安全。

希望这份详细清单和人性化解释能帮助你更全面地理解和应用这些框架注解，从而在实际开发中更高效、更优雅地完成工作。
