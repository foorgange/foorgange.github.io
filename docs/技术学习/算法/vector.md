# vector

​`std::vector`​ 是 C++ 中非常强大的容器，除了基本的 `push_back`​、`size`​、`[]`​ 运算符等常见操作外，还有一些 **高级用法** 可以大幅提升代码的表达力和效率。下面我会分类讲解，并附上实用示例。

---

##  一、初始化技巧

### 1. 用值初始化

```cpp
vector<int> v(5, 100); // 长度为5，每个元素是100：v = {100, 100, 100, 100, 100}
```

### 2. 用数组/列表初始化

```cpp
vector<int> v = {1, 2, 3, 4, 5};
```

### 3. 从已有容器拷贝一部分

```cpp
vector<int> v2(v.begin() + 1, v.begin() + 4); // v2 = {2, 3, 4}
```

---

## 二、修改与操作技巧

### 1. 插入与删除

```cpp
v.insert(v.begin() + 2, 99); // 在下标2前插入99
v.erase(v.begin() + 1);      // 删除下标1的元素
```

### 2. 删除一段区间

```cpp
v.erase(v.begin() + 2, v.begin() + 4); // 删除下标2~3的元素
```

### 3. 清空与判断

```cpp
v.clear();        // 清空所有元素
v.empty();        // 判断是否为空
```

### 4. 交换两个 vector

```cpp
vector<int> a = {1, 2}, b = {3, 4};
swap(a, b);       // a = {3,4}, b = {1,2}
```

---

##  三、查找与排序相关

### 1. 查找元素位置

```cpp
auto it = find(v.begin(), v.end(), 3);
if (it != v.end()) {
    int index = it - v.begin(); // 找到3的位置
}
```

### 2. 排序

```cpp
sort(v.begin(), v.end()); // 升序
sort(v.rbegin(), v.rend()); // 降序（用反向迭代器）
```

### 3. 自定义排序

```cpp
sort(v.begin(), v.end(), [](int a, int b) { return a % 10 < b % 10; });
```

---

##  四、遍历技巧

### 1. 范围 for（推荐）

```cpp
for (int x : v) cout << x << " ";
```

### 2. 用迭代器遍历

```cpp
for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " ";
}
```

### 3. 使用 `for_each`​ 和 Lambda

```cpp
for_each(v.begin(), v.end(), [](int x) {
    cout << x << " ";
});
```

---

##  五、技巧与陷阱

### 1. 快速清空 vector 并释放内存

```cpp
vector<int>().swap(v); // 清空 v 并释放内存
```

### 2. vector 的容量（capacity）

```cpp
v.reserve(1000); // 预分配空间，减少动态扩容的性能开销
```

---

## 六、二维 vector 高级用法

### 1. 初始化

```cpp
vector<vector<int>> matrix(3, vector<int>(4, 0)); // 3x4 的二维数组，每个元素为0
```

### 2. 排序二维 vector（按行最大值排序）

```cpp
sort(matrix.begin(), matrix.end(), [](const vector<int> &a, const vector<int> &b) {
    return *max_element(a.begin(), a.end()) < *max_element(b.begin(), b.end());
});
```

---

##  七、和算法结合的写法

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {1, 5, 2, 4, 3};

    // 保留偶数
    vector<int> evens;
    copy_if(v.begin(), v.end(), back_inserter(evens), [](int x) { return x % 2 == 0; });

    // 全部+1
    transform(v.begin(), v.end(), v.begin(), [](int x) { return x + 1; });

    // 输出
    for (int x : v) cout << x << " ";
}
```

---

## 总结

|功能|方法|
| ------------| ----------------------|
|插入/删除|​`insert`​、`erase`​、`clear`​|
|排序|​`sort`​、自定义比较函数|
|查找|​`find`​、迭代器运算|
|遍历|范围 for、`for_each`​|
|容量控制|​`reserve`​、`shrink_to_fit`​|
|二维数组|​`vector<vector<T>>`​|
|函数式操作|​`copy_if`​、`transform`​|

‍
