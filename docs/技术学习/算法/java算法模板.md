# java算法模板

### **一、基础模板结构**

```java
import java.util.*;
import java.io.*;

public class Main {
    // 类似 C++ 的全局变量区
    static final int MAX_N = 100010;
    static int[] arr = new int[MAX_N];
  
    public static void main(String[] args) throws Exception {
        // 输入输出加速（比 Scanner 快 5-10 倍）
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter pw = new PrintWriter(System.out);
    
        // 算法代码区
        int n = Integer.parseInt(br.readLine());
        String[] s = br.readLine().split(" ");
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(s[i]);
        }
      for (int i = 0; i < n; i++) {
            pw.print(arr[i] + " ");
        }
        pw.println();
        // 输出结果
        pw.println("Result");
        pw.flush(); // 必须调用才能输出
    }
}
```

---

### **二、关键要素对比（C++ vs Java）**

1. **输入输出优化**

    * **C++** : `ios::sync_with_stdio(false);`​
    * **Java**: 使用 `BufferedReader`​ + `PrintWriter`​ 组合

      ```java
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      PrintWriter pw = new PrintWriter(System.out);
      ```
2. **多组输入处理**

    ```java
    // 类似 C++ 的 while(cin >> n)
    String line;
    while ((line = br.readLine()) != null && !line.isEmpty()) {
        int n = Integer.parseInt(line);
        // 处理逻辑
    }
    ```
3. |**常用数据结构映射**||
    |C++|Java|
    | ------| ------|
    |​`vector<int>`​|​`ArrayList<Integer>`​|
    |​`priority_queue`​|​`PriorityQueue`​|
    |​`unordered_map`​|​`HashMap`​|
    |​`set`​|​`TreeSet`​|

---

### **三、高频代码片段**

1. **快速排序数组**

    ```java
    int[] a = new int[]{3,1,4,2};
    Arrays.sort(a); // 升序
    Integer[] b = Arrays.stream(a).boxed().toArray(Integer[]::new);
    Arrays.sort(b, (x,y) -> y - x); // 降序技巧
    ```
2. **自定义排序对象**

    ```java
    class Node {
        int x, y;
        Node(int x, int y) { this.x = x; this.y = y; }
    }

    // 按 x 升序，x 相同时按 y 降序
    Arrays.sort(nodes, (a,b) -> {
        if (a.x != b.x) return a.x - b.x;
        else return b.y - a.y;
    });
    ```
3. **大数处理**

    ```java
    BigInteger a = new BigInteger("123456789");
    BigInteger b = a.add(BigInteger.ONE);
    ```

---

### **四、效率优化技巧**

1. **避免频繁创建对象**  
    在循环外预分配内存（如数组、StringBuilder）
2. **字符串拼接优化**

    ```java
    StringBuilder sb = new StringBuilder();
    sb.append("A").append(123); // 代替 String += 操作
    ```
3. **静态工具类**（类似 C++ 的函数）

    ```java
    static class Utils {
        static int max(int a, int b) {
            return a > b ? a : b;
        }
    }
    ```

---

### **五、调试技巧**

1. **重定向输入输出**

    ```java
    public static void main(String[] args) throws Exception {
        // 本地调试时使用文件输入
        System.setIn(new FileInputStream("input.txt"));
        // 后续代码不变
    }
    ```
2. **快速打印数组**

    ```java
    int[] arr = {1,2,3};
    System.out.println(Arrays.toString(arr)); // [1, 2, 3]
    ```

---

### **六、完整模板示例**

```java
import java.util.*;
import java.io.*;

public class Main {
    static final int INF = 0x3f3f3f3f;
    static int N = 100010;
    static int[] a = new int[N];
  
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] s = br.readLine().split(" ");
        int n = Integer.parseInt(s[0]), m = Integer.parseInt(s[1]);
    
        // 示例：读取一维数组
        s = br.readLine().split(" ");
        for (int i = 0; i < n; i++) {
            a[i] = Integer.parseInt(s[i]);
        }
    
	for (int i = 0; i < n; i++) {
            pw.print(arr[i] + " ");
        }
        pw.println();
        // 示例：输出
        PrintWriter pw = new PrintWriter(System.out);
        pw.println("Hello " + n);
        pw.flush();
    }
}
```

### **一、C++ 函数 → Java 方法结构对比**

#### **1. 基础函数转换**

```cpp
// C++ 全局函数
int add(int a, int b) {
    return a + b;
}
```

```java
// Java 静态方法（必须写在类内）
public class Main {
    // 静态方法
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(3, 5)); // 调用
    }
}
```

#### **2. 常用算法函数示例**

**示例1：交换函数**

```cpp
// C++ 传引用
void swap(int &a, int &b) {
    int tmp = a;
    a = b;
    b = tmp;
}
```

```java
// Java 需要用数组模拟引用传递
static void swap(int[] arr, int i, int j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

// 调用示例：
int[] a = {3, 5};
swap(a, 0, 1); // a变为[5,3]
```

**示例2：快速幂**

```cpp
// C++ 
long long qpow(int a, int n) {
    long long res = 1;
    while (n) {
        if (n & 1) res *= a;
        a *= a;
        n >>= 1;
    }
    return res;
}
```

```java
// Java
static long qpow(int a, int n) {
    long res = 1;
    while (n > 0) {
        if ((n & 1) == 1) res *= a;
        a *= a;
        n >>= 1;
    }
    return res;
}
```

---

### **二、初学者友好模板（Scanner 版）**

```java
import java.util.Scanner;
import java.util.Arrays; // 数组工具类

public class Main {
    public static void main(String[] args) {
        // 初始化 Scanner
        Scanner sc = new Scanner(System.in);
    
        // 示例1：读取整数
        int n = sc.nextInt(); 
    
        // 示例2：读取数组
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
    
        // 示例3：读取字符串（注意 next() 与 nextLine() 的区别）
        String s1 = sc.next();    // 读取非空字符序列
        String s2 = sc.nextLine();// 读取整行（包括空格）
    
        // 示例4：格式化输出
        System.out.println("n = " + n);
        System.out.println(Arrays.toString(arr)); // 打印数组
    
        sc.close(); // 关闭 Scanner（非必须但建议）
    }
}
```

---

### **三、关键对比说明**

|**特性**|**C++**|**Java (Scanner版)**|
| ------------| ------| --------------------|
|输入速度|快|慢（适合小数据量）|
|基础输入|​`cin >> n`​|​`sc.nextInt()`​|
|读取整行|​`getline(cin, s)`​|​`sc.nextLine()`​|
|数组初始化|​`int arr[100];`​|​`int[] arr = new int[100];`​|
|动态数组|​`vector<int>`​|​`ArrayList<Integer>`​|
|排序|​`sort(arr, arr+n)`​|​`Arrays.sort(arr)`​|

---

### **四、Scanner 模板增强版**

```java
import java.util.*;

public class Main {
    // 工具函数示例：求最大值
    static int max(int a, int b) {
        return a > b ? a : b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
  
        // 处理多组输入（类似 while(cin >> n)）
        while (sc.hasNextInt()) {
            int n = sc.nextInt();
            int m = sc.nextInt();
      
            // 创建动态数组
            ArrayList<Integer> list = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                list.add(sc.nextInt());
            }
      
            // 排序示例
            Collections.sort(list);
      
            // 字符串处理
            String s = sc.next();
            char[] chars = s.toCharArray();
        }
  
        sc.close();
    }
}

```

---

### **五、何时该换掉 Scanner？**

1. **数据量超过 10^5** → 改用 `BufferedReader`​
2. **需要读含空格的长字符串** → `BufferedReader.readLine()`​
3. **需要更精细的输入控制** → 手动解析字符串

---

### **六、常见问题解决方案**

**问题1：混合使用 nextInt() 和 nextLine() 出错**

```java
int n = sc.nextInt();
sc.nextLine(); // 吸收残留的换行符
String s = sc.nextLine();
```

**问题2：自定义对象排序**

```java
class Student {
    String name;
    int score;
    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}

// 按分数降序排列
Collections.sort(list, (a, b) -> b.score - a.score);
```
