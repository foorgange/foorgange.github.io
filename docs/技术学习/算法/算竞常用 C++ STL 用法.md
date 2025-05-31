# 算竞常用 C++ STL 用法

**C++ 标准模板库 (STL, Standard Template Library)**

‍

# 2 常用容器

## 2.2 向量 [vector]

 **​`#include <vector>`​**

### 2.2.1 常用方法

#### 构造

**​`vector<类型> arr(长度, [初值])`​** .

```cpp
vector<int> arr;         // 构造int数组
vector<int> arr(100);    // 构造初始长100的int数组
vector<int> arr(100, 1); // 构造初始长100的int数组，初值为1

vector<vector<int>> mat(100, vector<int> ());       // 构造初始100行，不指定列数的二维数组
vector<vector<int>> mat(100, vector<int> (666, -1)) // 构造初始100行，初始666列的二维数组，初值为-1
```

#### 尾接 & 尾删

-  **​`.push_back(元素)`​** ：在 vector 尾接一个元素，数组长度 $+1$.
-  **​`.pop_back()`​** ：删除 vector 尾部的一个元素，数组长度 $-1$

```cpp
// init: arr = []
arr.push_back(1);
// after: arr = [1]
arr.push_back(2);
// after: arr = [1, 2]
arr.pop_back();
// after: arr = [1]
arr.pop_back();
// after: arr = []
```

#### 清空

 **​`.clear()`​**

清空 vector

#### 判空

 **​`.empty()`​**

如果是空返回 `true` 反之返回 `false`.

时间复杂度：$O(1)$

#### 改变长度

 **​`.resize(新长度, [默认值])`​**

修改 vector 的长度

- 如果是缩短，则删除多余的值
- 如果是扩大，且指定了默认值，则新元素均为默认值 **（旧元素不变）**

时间复杂度：$O(n)$

### 2.2.2 适用情形

一般情况 `vector` 可以替换掉普通数组，除非该题卡常。

有些情况普通数组没法解决：$n\times m$ 的矩阵，$1\leq n,m\leq 10^6$ 且 $n\times m \leq 10^6$

- 如果用普通数组 `int mat[1000010][1000010]`，浪费内存，会导致 MLE。
- 如果使用 `vector<vector<int>> mat(n + 10, vector<int> (m + 10))`，完美解决该问题。

另外，`vector` 的数据储存在堆空间中，不会爆栈。

### 2.2.3 注意事项

#### 提前指定长度

如果长度已经确定，那么应当直接在构造函数指定长度，而不是一个一个 `.push_back()`. 因为 `vector` 额外内存耗尽后的重分配是有时间开销的，直接指定长度就不会出现重分配了。

#### 当心 size_t 溢出

vector 获取长度的方法 `.size()` 返回值类型为 `size_t`，通常 OJ 平台使用的是 32 位编译器（有些平台例如 cf 可选 64 位），那么该类型范围为 $[0,2^{32})$.

```cpp
vector<int> a(65536);
long long a = a.size() * a.size(); // 直接溢出变成0了
```

## 2.3 栈 [stack]

 **​`#include <stack>`​**

通过二次封装双端队列 (deque) 容器，实现先进后出的栈数据结构。

### 2.3.1 常用方法

|作用|用法|示例|
| ----------------------| ----| ----|
|构造|`stack<类型> stk`|`stack<int> stk;`|
|进栈|`.push(元素)`|`stk.push(1);`|
|出栈|`.pop()`|`stk.pop();`|
|取栈顶|`.top()`|`int a = stk.top();`|
|查看大小 / 清空 / 判空|略|略|

### 2.3.2 适用情形

如果不卡常的话，就可以直接用它而不需要手写栈了。

另外，vector 也可以当栈用，vector 的 `.back()` 取尾部元素，就相当于取栈顶，`.push_back()` 相当于进栈，`.pop_back()` 相当于出栈。

### 2.3.3 注意事项

#### 不可访问内部元素！(cout<<)

## 2.4 队列 [queue]

 **​`#include <queue>`​**

通过二次封装双端队列 (deque) 容器，实现先进先出的队列数据结构。

### 2.4.1 常用方法

|作用|用法|示例|
| ----------------------| ----| ----|
|构造|`queue<类型> que`|`queue<int> que;`|
|进队|`.push(元素)`|`que.push(1);`|
|出队|`.pop()`|`que.pop();`|
|取队首|`.front()`|`int a = que.front();`|
|取队尾|`.back()`|`int a = que.back();`|
|查看大小 / 清空 / 判空|略|略|

### 2.4.2 适用情形

如果不卡常的话，就可以直接用它而不需要手写队列了。

### 2.4.3 注意事项

#### 不可访问内部元素！

## 2.5 优先队列 [priority_queue]

 **​`#include <queue>`​**

提供常数时间的最大元素查找，对数时间的插入与提取，底层原理是二叉堆。

### 2.5.1 常用方法

#### 构造

**​`priority_queue<类型, 容器, 比较器> pque`​**

- 类型：要储存的数据类型
- 容器：储存数据的底层容器，默认为 `vector<类型>`，竞赛中保持默认即可
- 比较器：比较大小使用的比较器，默认为 `less<类型>`，可自定义

```cpp
priority_queue<int> pque1;                            // 储存int的大顶堆
priority_queue<int, vector<int>, greater<int>> pque2; // 储存int的小顶堆


priority_queue<int> pq;
// 清空方法
priority_queue<int>().swap(pq);
//每次循环重新定义优先队列的话没必要清空，初始化后本就是空的
```

#### 其他

|作用|用法|示例|
| ---------------| ----| ----|
|进堆|`.push(元素)`|`que.push(1);`|
|出堆|`.pop()`|`que.pop();`|
|取堆顶|`.top()`|`int a = que.top();`|
|查看大小 / 判空|略|略|

进出队复杂度 $O(\log n)$，取堆顶 $O(1)$.

### 2.5.2 适用情形

持续维护元素的有序性：每次向队列插入大小不定的元素，或者每次从队列里取出大小最小/最大的元素，元素数量 $n$，插入操作数量 $k$.

- 每次插入后进行快速排序：$k\cdot n\log n$
- 使用优先队列维护：$k\cdot\log n$

### 2.5.3 注意事项

#### 仅堆顶可读

只可访问堆顶，其他元素都无法读取到。**下面是错误用法：**

```cpp
cout << pque[1] << endl;
```

#### 所有元素不可写

堆中所有元素是不可修改的。**下面是错误用法：**

```cpp
pque[1] = 2;
pque.top() = 1;
```

如果你恰好要修改的是堆顶元素，那么是可以完成的：

```cpp
int tp = pque.top();
pque.pop();
pque.push(tp + 1);
```

## 2.6 集合 [set]

 **​`#include <set>`​**

提供对数时间的插入、删除、查找的集合数据结构。底层原理是红黑树。

|集合三要素|解释|set|multiset|unordered_set|
| ----------| ------------------------------| --------------| --------------| -------------|
|确定性|一个元素要么在集合中，要么不在|✔|✔|✔|
|互异性|一个元素仅可以在集合中出现一次|✔|❌（任意次）|✔|
|无序性|集合中的元素是没有顺序的|❌（从小到大）|❌（从小到大）|✔|

### 2.6.1 常用方法

#### 构造

**​`set<类型, 比较器> st`​**

- 类型：要储存的数据类型
- 比较器：比较大小使用的比较器，默认为 `less<类型>`，可自定义

```cpp
set<int> st1;               // 储存int的集合（从小到大）
set<int, greater<int>> st2; // 储存int的集合（从大到小）
```

#### 遍历

可使用迭代器进行遍历：

```cpp
for (set<int>::iterator it = st.begin(); it != st.end(); ++it)
    cout << *it << endl;
```

基于范围的循环（C++ 11）：

```cpp
for (auto &ele : st)
    cout << ele << endl;
```

#### 其他

|作用|用法|示例|
| ----------------------| ----| ----|
|插入元素|`.insert(元素)`|`st.insert(1);`|
|删除元素|`.erase(元素)`|`st.erase(2);`|
|查找元素|`.find(元素)`|`auto it = st.find(1);`|
|判断元素是否存在|`.count(元素)`|`st.count(3);`|
|查看大小 / 清空 / 判空|略|略|

增删查时间复杂度均为 $O(\log n)$

### 2.6.2 适用情形

- 元素去重：$[1,1,3,2,4,4]\to[1,2,3,4]$
- 维护顺序：$[1,5,3,7,9]\to[1,3,5,7,9]$
- 元素是否出现过：元素大小 $[-10^{18},10^{18}]$，元素数量 $10^6$，vis 数组无法实现，通过 set 可以完成。

### 2.6.3 注意事项

#### 不存在下标索引

set 虽说可遍历，但仅可使用迭代器进行遍历，它不存在下标这一概念，无法通过下标访问到数据。**下面是错误用法：**

```cpp
cout << st[0] << endl;
```

#### 元素只读

set 的迭代器取到的元素是只读的（因为是 const 迭代器），不可修改其值。如果要改，需要先 erase 再 insert. **下面是错误用法：**

```cpp
cout << *st.begin() << endl; // 正确。可读。
*st.begin() = 1;             // 错误！不可写！
```

#### 不可用迭代器计算下标

set 的迭代器不能像 vector 一样相减得到下标。**下面是错误用法：**

```cpp
auto it = st.find(2);      // 正确，返回2所在位置的迭代器。
int idx = it - st.begin(); // 错误！不可相减得到下标。
```

## 2.7 映射 [map]

 **​`#include <map>`​**

提供对数时间的有序键值对结构。底层原理是红黑树。

映射：

$$
\begin{matrix}
1&\to&2\\
2&\to&2\\
3&\to&1\\
4&\to&5\\
&\vdots
\end{matrix}
$$

|性质|解释|map|multimap|unordered_map|
| ------| ----------------------------| --------------| --------------| -------------|
|互异性|一个键仅可以在映射中出现一次|✔|❌（任意次）|✔|
|无序性|键是没有顺序的|❌（从小到大）|❌（从小到大）|✔|

### 2.7.1 常用方法

#### 构造

**​`map<键类型, 值类型, 比较器> mp`​**

- 键类型：要储存键的数据类型
- 值类型：要储存值的数据类型
- 比较器：键比较大小使用的比较器，默认为 `less<类型>`，可自定义

```cpp
map<int, int> mp1;               // int->int 的映射（键从小到大）
map<int, int, greater<int>> st2; // int->int 的映射（键从大到小）
```

> 对于需要自定义比较器的情况，涉及一些初学时容易看迷糊的语法（重载小括号运算符 / lambda 表达式），在此就不展开讲了。

#### 遍历

可使用迭代器进行遍历：

```cpp
for (map<int, int>::iterator it = mp.begin(); it != mp.end(); ++it)
    cout << it->first << ' ' << it->second << endl;
```

基于范围的循环（C++ 11）：

```cpp
for (auto &pr : mp)
    cout << pr.first << ' ' << pr.second << endl;
```

结构化绑定 + 基于范围的循环（C++17）：

```cpp
for (auto &[key, val] : mp)
    cout << key << ' ' << val << endl;
```

#### 示例

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
	map<string ,int>mp;
  int n;
  cin>>n;
  vector<string> word(n);
  for(int i = 0;i<n;i++){
    cin>>word[i];
  }
  word.push_back("awa");
  for(int i = 0;i<word.size();i++){
    mp[word[i]]++;
  }
  for(auto &pr : mp){
    cout<<pr.first<<' '<<pr.second<<endl;
  }
	
	return 0;
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    map<string, int> mp;
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        mp[word]++;
    }

    mp["awa"]++;  // 添加额外统计

    for (auto &pr : mp) {
        cout << pr.first << ' ' << pr.second << endl;
    }

    return 0;
}
```

#### 其他

|作用|用法|示例|
| ----------------------| ------| ----|
|增 / 改 / 查元素|中括号|`mp[1] = 2;`|
|查元素（返回迭代器）|`.find(元素)`|`auto it = mp.find(1);`|
|删除元素|`.erase(元素)`|`mp.erase(2);`|
|判断元素是否存在|`.count(元素)`|`mp.count(3);`|
|查看大小 / 清空 / 判空|略|略|

增删改查时间复杂度均为 $O(\log n)$

### 2.7.2 适用情形

需要维护映射的场景可以使用：输入若干字符串，统计每种字符串的出现次数。(`map<string, int> mp`)

### 2.7.3 注意事项

#### 中括号访问时默认值

如果使用中括号访问 map 时对应的键不存在，那么会新增这个键，并且值为默认值，因此中括号会影响键的存在性。

```cpp
map<char, int> mp;
cout << mp.count('a') << endl; // 0
mp['a'];                       // 即使什么都没做，此时mp['a']=0已经插入了
cout << mp.count('a') << endl; // 1
cout << mp['a'] << endl;       // 0
```

#### 不可用迭代器计算下标

map 的迭代器不能像 vector 一样相减得到下标。**下面是错误用法：**

```cpp
auto it = mp.find('a');      // 正确，返回2所在位置的迭代器。
int idx = it - mp.begin();   // 错误！不可相减得到下标。
```

### **​`unordered_map<string, int>`​** ​ **简介**

​`unordered_map<string, int>`​ 是 C++ STL 提供的一种哈希表容器，用于存储键值对（Key-Value Pair），其中：

* **键（Key）** ：`string`​ 类型，用于唯一标识每个键值对。
* **值（Value）** ：`int`​ 类型，存储与键关联的整数值。

这种容器通过哈希表实现，支持 **快速查找、插入、删除** 操作，平均时间复杂度为 $O(1)$。

---

### **主要特点**

1. **键唯一**：`unordered_map`​ 中的键是唯一的，如果尝试插入一个已存在的键，新值会覆盖旧值。
2. **无序存储**：键值对的存储顺序不保证任何规律，具体顺序依赖于哈希函数。
3. **高效查找**：使用哈希表进行查找，效率通常比 `map`​ 更高。
4. **自动扩容**：当哈希表容量不足时，容器会自动调整大小以适应新增元素。
5. **键类型限制**：键类型必须支持哈希函数和比较操作（如 `==`​）.
6. ### **常用方法**

    |方法|功能说明|
    | ------| ----------------------------------------------------|
    |​`d[key]`​|访问或插入键为`key`​的值。如果键不存在，会创建默认值。|
    |​`d.at(key)`​|返回键为`key`​的值。如果键不存在，会抛出异常。|
    |​`d.find(key)`​|查找键`key`​是否存在，返回指向键值对的迭代器或`d.end()`​。|
    |​`d.insert({key, value})`​|插入键值对`{key, value}`​，如果键已存在，不更新值。|
    |​`d.erase(key)`​|删除键为`key`​的键值对。|
    |​`d.clear()`​|清空容器。|
    |​`d.size()`​|返回容器中键值对的数量。|
    |​`d.empty()`​|检查容器是否为空。|
    |​`d.bucket_count()`​|返回哈希表中桶的数量（用于哈希性能分析）。|
    |​`d.load_factor()`​|返回平均每个桶的元素数量（负载因子）。|

|特性|​`unordered_map`​|​`map`​|
| ------| --------------------| --------------------------|
|**底层实现**|哈希表|红黑树|
|**存储顺序**|无序|按键的顺序存储|
|**操作效率**|平均$O(1)$，最坏$O(n)$|稳定$O(\log n)$|
|**内存占用**|较大|较小|
|**适用场景**|快速查找、无序存储|有序存储、需要按顺序访问|

**选择建议**：

* 如果需要快速查找或修改，且对顺序无要求，用 **​`unordered_map`​**​。
* 如果需要有序存储或遍历，用 **​`map`​**​。

‍

## 2.8 字符串 [string]

 **​`#include <string>`​**

顾名思义，就是储存字符串的。

### 2.8.1 常用方法

#### 构造

构造函数：`string(长度, 初值)`

```cpp
string s1;           // 构造字符串，为空
string s2 = "awa!";  // 构造字符串，并赋值awa!
string s3(10, '6');  // 构造字符串，通过构造函数构造为6666666666
```

#### 输入输出

C++

```cpp
string s;
cin >> s;
cout << s;
```

C

```cpp
string s;
char buf[100];
scanf("%s", &buf);
s = buf;
printf("%s", s.c_str());
```

#### 其他

|作用|用法|示例|
| ----------------------| ----| ----|
|修改、查询指定下标字符|`[]`|`s[1] = 'a';`|
|是否相同|`==`|`if (s1 == s2) ...`|
|字符串连接|`+`|`string s = s1 + s2;`|
|尾接字符串|`+=`|`s += "awa";`|
|取子串|`.substr(起始下标, 子串长度)`|`string sub = s.substr(2, 10);`|
|查找字符串|`.find(字符串, 起始下标)`|`int pos = s.find("awa");`|

#### 数值与字符串互转（C++11）

|源|目的|函数|
| ----------------------------------------------| -----------| -----------|
|int / long long / float / double / long double|string|to_string()|
|string|int|stoi()|
|string|long long|stoll()|
|string|float|stof()|
|string|double|stod()|
|string|long double|stold()|

### 2.8.3 注意事项

#### 尾接字符串一定要用 `+=`

string 的 += 运算符，将会在原字符串原地尾接字符串。而 + 了再 = 赋值，会先生成一个临时变量，在复制给 string.

通常字符串长度可以很长，如果使用 + 字符串很容易就 TLE 了。

#### `.substr()` 方法的奇葩参数

一定要注意，C++ string 的取子串的第一个参数是**子串起点下标**，第二个参数是**子串长度**。

第二个参数不是子串终点！不是子串终点！要与 java 等其他语言区分开来。

#### `.find()` 方法的复杂度

该方法实现为暴力实现，时间复杂度为 $O(n^2)$.

## 2.9 二元组 [pair]

 **​`#include <utility>`​**

顾名思义，就是储存二元组的。

### 2.9.1 常用方法

#### 构造

**​`pair<第一个值类型, 第二个值类型> pr`​**

- 第一个值类型：要储存的第一个值的数据类型
- 第二个值类型：要储存的第二个值的数据类型

```cpp
pair<int, int> p1;
pair<int, long long> p2;
pair<char, int> p3;
// ...
```

#### 赋值

老式

```cpp
pair<int, char> pr = make_pair(1, 'a');
```

列表构造 C++11

```cpp
pair<int, char> pr = {1, 'a'};
```

#### 取值

直接取值

- 取第一个值：`.first`
- 取第二个值：`.second`

#### 排序定义

```cpp
bool cmp(pair<int, int> a, pair<int, int> b)
{
    if (a.second != b.second)
        return a.second < b.second;
    return a.first > b.first;
}
```

```cpp
pair<int, char> pr = {1, 'a'};
int awa = pr.first;
char bwb = pr.second;
```

结构化绑定 C++17

```cpp
pair<int, char> pr = {1, 'a'};
auto &[awa, bwb] = pr;
```

#### 判同

直接用 `==` 运算符

```cpp
pair<int, int> p1 = {1, 2};
pair<int, int> p2 = {1, 3};
if (p1 == p2) { ... } // false
```

### 2.9.2 适用场景

所有需要二元组的场景均可使用，效率和自己定义结构体差不多。

# 3 迭代器简介

## 3.1 迭代器是什么？

对于一个 vector，我们可以用下标遍历：

```cpp
for (int i = 0; i < a.size(); i++)
    cout << a[i] << endl;
```

我们同时也可以用迭代器来遍历：

```cpp
for (vector<int>::iterator it = a.begin(); it != a.end(); ++it)
    cout << *it << endl;
```

- `a.begin()` 是一个迭代器，指向的是第一个元素
- `a.end()` 是一个迭代器，指向的是最后一个元素**再后面一位**
- 上述迭代器具有自增运算符，自增则迭代器向下一个元素移动
- 迭代器与指针相似，如果对它使用解引用运算符，即 `*it`，就能取到对应值了

通过迭代器，我们就能遍历 set 中的元素了：

```cpp
for (set<int>::iterator it = st.begin(); it != st.end(); ++it)
    cout << *it << endl;
```

## 3.3 迭代器用法

对于 vector 容器，它的迭代器功能比较完整，以它举例：

- `.begin()`：头迭代器
- `.end()`：尾迭代器
- `.rbegin()`：反向头迭代器
- `.rend()`：反向尾迭代器
- 迭代器 `+` 整型：将迭代器向后移动
- 迭代器 `-` 整型：将迭代器向前移动
- 迭代器 `++`：将迭代器向后移动 1 位
- 迭代器 `--`：将迭代器向前移动 1 位
- 迭代器 `-` 迭代器：两个迭代器的距离
- `prev(it)`：返回 it 的前一个迭代器
- `next(it)`：返回 it 的后一个迭代器

对于其他容器，由于其结构特性，上面的功能不一定都有（例如 set 的迭代器是不能相减求距离的）

## 3.4 常见问题

 **​`.end()`​**​ ** 和 **​ **​`.rend()`​**​ ** 指向的位置是无意义的值**

对于一个长度为 10 的数组：`for (int i = 0; i < 10; i++)`，第 10 位是不可访问的

对于一个长度为 10 的容器：`for (auto it = a.begin(); it != a.end(); ++it)`，.end 是不可访问的

**不同容器的迭代器功能可能不一样**

迭代器细化的话有正向、反向、双向，每个容器的迭代器支持的运算符也可能不同，因此不同容器的迭代器细节很有可能是不一样的。

**删除操作时需要警惕**

<div>
<center><b>建议：如无必要，别用迭代器操作容器。（遍历与访问没关系）</b></center>
</div>

# 4 常用算法

## 4.4 `lower_bound()` / `upper_bound()`

在**已升序排序**的元素中，应用二分查找检索指定元素，返回对应元素迭代器位置。**找不到则返回尾迭代器。**

- `lower_bound()`: 寻找 $\geq x$ 的第一个元素的位置
- `upper_bound()`: 寻找 $&gt;x$ 的第一个元素的位置

怎么找 $\leq x$ / $&lt; x$ 的第一个元素呢？

- $&gt;x$ 的第一个元素的前一个元素（如果有）便是 $\leq x$ 的第一个元素
- $\geq x$ 的第一个元素的前一个元素（如果有）便是 $&lt;x$ 的第一个元素

返回的是迭代器，如何转成下标索引呢？减去头迭代器即可。

**用法示例**

```cpp
template< class ForwardIt, class T >
ForwardIt lower_bound( ForwardIt first, ForwardIt last, const T& value );
```

```cpp
vector<int> arr{0, 1, 1, 1, 8, 9, 9};
vector<int>::iterator it = lower_bound(arr.begin(), arr.end(), 7);
int idx = it - arr.begin();
// idx = 4
```

我们通常写成一行：

```cpp
vector<int> arr{0, 1, 1, 1, 8, 9, 9};
idx = lower_bound(arr.begin(), arr.end(), 7) - arr.begin(); // 4
idx = lower_bound(arr.begin(), arr.end(), 8) - arr.begin(); // 4
idx = upper_bound(arr.begin(), arr.end(), 7) - arr.begin(); // 4
idx = upper_bound(arr.begin(), arr.end(), 8) - arr.begin(); // 5
```

## 4.5 `reverse()`

反转一个可迭代对象的元素顺序

**用法示例**

```cpp
vector<int> arr(10);
iota(arr.begin(), arr.end(), 1);
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
reverse(arr.begin(), arr.end());
// 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

## 4.6 `max()` / `min()`

返回最大值 / 最小值的**数值**

**用法示例**

```cpp
int mx = max(1, 2); // 2
int mn = min(1, 2); // 1
```

在 C++11 之后，可以使用列表构造语法传入一个列表，这样就能一次性给多个元素找最大值而不用套娃了：

```cpp
// Before C++11
int mx = max(max(1, 2), max(3, 4)); // 4
int mn = min(min(1, 2), min(3, 4)); // 1

// After C++11
int mx = max({1, 2, 3, 4}); // 4
int mn = min({1, 2, 3, 4}); // 1
```

## 4.7 `unique()`

消除数组的重复**相邻**元素，数组长度不变，但是有效数据缩短，返回的是有效数据位置的结尾迭代器。

例如：$[1,1,4,5,1,4]\to[1,4,5,1,4,\underline?]$，下划线位置为返回的迭代器指向。

```cpp
template< class ForwardIt >
ForwardIt unique( ForwardIt first, ForwardIt last );
```

**用法示例**

单独使用 unique 并不能达成去重效果，因为它只消除**相邻**的重复元素。但是如果序列有序，那么它就能去重了。

但是它去重后，序列尾部会产生一些无效数据：$[1,1,2,4,4,4,5]\to[1,2,4,5,\underline?,?,?]$，为了删掉这些无效数据，我们需要结合 erase.

最终，给 vector 去重的写法便是：

```cpp
vector<int> arr{1, 2, 1, 4, 5, 4, 4};
sort(arr.begin(), arr.end());
arr.erase(unique(arr.begin(), arr.end()), arr.end());
```

## 4.8 数学函数

所有函数参数均支持 `int` / `long long` / `float` / `double` / `long double`

|公式|示例|
| ----| ----|
|$f(x)=\lvert x\rvert$|`abs(-1.0)`|
|$f(x)=e^x$|`exp(2)`|
|$f(x)=\ln x$|`log(3)`|
|$f(x,y)=x^y$|`pow(2, 3)`|
|$f(x)=\sqrt x$|`sqrt(2)`|
|$f(x)=\lceil x\rceil$|`ceil(2.1)`|
|$f(x)=\lfloor x\rfloor$|`floor(2.1)`|
|$f(x)=\left&lt;x\right&gt;$|`rount(2.1)`|

**注意事项**

由于浮点误差，有些的数学函数的行为可能与预期不符，导致 WA。如果你的操作数都是整型，那么用下面的写法会更稳妥。

- $\lfloor\frac{a}{b}\rfloor$
  - 别用：`floor(1.0 * a / b)`
  - 要用：`a / b`
- $\lceil\frac{a}{b}\rceil$
  - 别用：`ceil(1.0 * a / b)`
  - 要用：`(a + b - 1) / b`  （$\lceil\frac{a}{b}\rceil=\lfloor\frac{a+b-1}{b}\rfloor$）
- $\lfloor\sqrt a\rfloor$
  - 别用：`(int) sqrt(a)`
  - 要用：二分查找
- $a^b$
  - 别用：`pow(a, b)`
  - 要用：快速幂 https://io.zouht.com/18.html
- $\lfloor\log_2 a\rfloor$
  - 别用：`log2(a)`
  - 要用：`__lg` （不规范，但是这是竞赛）/ `bit_width`（C++20 可用）

## 4.9 `gcd()` / `lcm()`

（C++17）返回最大公因数 / 最小公倍数

```cpp
int x = gcd(8, 12); // 4
int y = lcm(8, 12); // 24
```

如果不是 C++17，但是是 GNU 编译器（g++），那么可以用内置函数 `__gcd()`.

当然，`gcd` / `lcm` 函数也挺好写，直接写也行（欧几里得算法）：

```cpp
int gcd(int a, int b)
{
    if (!b)
        return a;
    return gcd(b, a % b);
}

int lcm(int a, int b) {
    return a / gcd(a, b) * 1LL * b;  // 先转换为 long long 以避免溢出
}
```

# 常用精华总结(节选自acwing)

### STL

#### 2.12.1 sort

1.头文件：\<algorithm\>

2.采用的是[快速排序算法](https://so.csdn.net/so/search?q=%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95&spm=1001.2101.3001.7020)，可以保证很好的平均性能。

3.时间复杂度：O(nlogn)

4.对数字排序

(1)从小到大

```cpp
for(int i=1;i<=n;i++) cin>>a[i];
sort(a+1,a+n+1);
```

(2)从大到小

```cpp
bool cmp(int a,int b)
{
    return a>b;
}

for(int i=1;i<=n;i++) cin>>a[i];
sort(a+1,a+n+1,cmp);
```

5.对字母排序

(1)从小到大

```cpp
char a[7]="abcedfg";
sort(a,a+7);//从小到大
```

(2)从大到小

```cpp
char a[7]="abcedfg";
sort(a,a+7,greater<char>());//从大到小
```

#### 2.12.2 lower\_bound/upper\_bound（二分）

1. 原理：二分
2. 数组：a[1\~n];
3. lower\_bound(a+1,a+n+1,x):从数组1\~n查找第一个大于等于x的数，返回该数的地址，不存在的话返回n+1,然后减去起始地址a，得到下标。

```cpp
for(int i=1;i<=n;i++) cin>>a[i];
int x;
cin>>x;
cout<<lower_boumd(1,n,x)-a<<endl;

//如果想要查找降序数组
cout<<lower_bound(a+1,a+n+1,x,greater<int>())-a<<endl;
```

1. upper\_bound(a+1,a+n+1,x):从数组1\~n查找第一个大于x的数，返回该数的地址，不存在的话返回n+1,然后减去起始地址a，得到下标。

```cpp
for(int i=1;i<=n;i++) cin>>a[i];
int x;
cin>>x;
cout<<upper_boumd(1,n,x)-a<<endl;

//如果想要查找降序数组
cout<<upper_bound(a+1,a+n+1,x,greater<int>())-a<<endl;
```

#### 2.12.3 vector

1. 原理：变长数组倍增的思想。
2. 一些基本操作

```cpp
vector<int> v;
v.resverse(30);//调整空间大小

v.size();//返回大小

v.push_back(x);//尾部插入一个数x
v.pop_back();//尾部删除一个数

v.insert(v.begin(),x);//向v的头部插入一个数
v.insert(v.end(),x);//向v的尾部插入一个数
v.insert(v.begin()+2,x)//向第二个元素前插入一个数

v.erase(v,begin()+1);//删除第二个数
v.erase(v.begin(),begin+2);删除前3个元素

v.front()/v.end();//返回头/尾

v.empty();//判空

v.clear();//清空

reverse(v.begin(),v.end());//反转
```

#### 2.12.4 pair

1. 头文件：\<utility\>
2. 作用：将一对值组合成一个元素，必须通过两个类型名，两个类型的属性可以不相同。
3. 一些操作

```cpp
pair<int,double> P;//包含两种属性

pair<int,double> P[10];//数组

P.first;//第一个元素类型的元素值
P.second;//第二个元素类型的元素值

pair<int,pair<int,int>> P;//存3种属性

//用make_pair来生成pair
pair<string,double> p=make_pair("zsy",100.0);
```

#### 2.12.5 set

1.头文件\<set\>

2.不会插入重复元素

3.类似树形结构

4.时间复杂度：O(logn)

5.检索效率高于vector,deque,list等容器

6.迭代器 set\<int\>::iterator it;定义了一个set\<int\>类型的迭代器。

7.用法

```cpp
set<int> s;
s.insert(x);//插入整数x
s.erase(s.begin());//删除首元元素
s.find(x);//查找x
s.count(x);//返回x在集合中的数量

//迭代器
for(set<int>::iterator it=s.begin();it!=s.end();it++)
    cout<<*it<<" ";

s.clear();//清空
s.empty();//判空
```

8.说明

使用insert()将元素插入set集合中，集合默认从小到大的顺序插入元素，可以直接编写从大到小。

```cpp
//方法一
struct cmp{
    bool operator()(const int &a,const int &b)const
    {
        return a>b;
    }
};
set<int,cmp> s;

//方法二
set<int,greater<int>> s;
```

#### 2.12.6 multiset

1. 允许插入重复元素，用法和set类似
2. 时间复杂度:O(logn)
3. 头文件\<set\>

#### 2.12.7 deque（双端队列）

1. 头文件\<set\>
2. 作用

是一种双向开口的连续线性空间，可以高效地在头尾两端插入和删除元素，时间复杂度为O(1),考虑容器的内存分配策略和操作性能时,deque比vector有优势。

3.操作

```cpp
deque<string> d;
d.push_back("A");//尾部插入元素
d.push_front("B");//头部插入元素
d.pop_back();//删除尾部元素
d.pop_front();//删除头部元素
d.erase(d.begin()+x);//删除指定位置上的元素
d.erase();//清空
d.insert(d.end()-2,"0");//指定位置插入元素
reverse(d.begin(),d.end());//反转
swap(d[1],d[2]);//交换
deque<string>::iterator it;//迭代器
d.empty();//判空
d.size();//长度
d.front();//首元素
d.end();//尾元素
```

#### 2.12.8 list（双向链表）

1. 头文件：\<list\>
2. 作用：对任意位置元素的查找、插入、删除都有高效的常数阶算法时间复杂度。

3.操作

```cpp
list<int> l;

l.push_back(x);//尾部插入一个数x
l.push_front(x);//头部插入一个数x

list<int>::iterator it;//迭代器
l.insert(it,20);//当前位置插入新的元素
l.erase(it);//删除迭代器位置上的元素
l.remove(x);//删除所有值为x的元素
l.pop_front();//删除链表首元素
l.pop_back();//删除链表尾元素
it=find(l.begin(),l.end(),x);//查找值为x的元素
l.sort();//升序
l.unique();//删除连续重复的元素，只保留一个
for(auto it=l.begin();it!=l.end();it++)//正向遍历
```

#### 2.12.9 map

1. 头文件\<map\>
2. map和set都是采用红黑树来实现的，插入的元素不能重复，重复的元素个数会增加，元素是默认按键值由小到大排序的，如果定义比较函数，比较函数也只能对元素的键值进行比较。
3. map和set的区别：map是处理带有键值记录型元素数据的快速插入、删除、检索，而set对单一的数据进行处理。
4. 操作

```cpp
map<char,float> m;
m['x']=3.4;

//迭代器
map<string,int> h;
for(map<string,int>::iterator it=h.begin();it!=h.end();it++)
{
    it->first;
    it->second;
}

h.find(x);//查找
h.count(x);//条件x数量
h.erase(h.begin(),h.end());//删除全部元素
h.size();//返回大小
h.empty();//判空
```

#### 2.12.10 生成排列组合

1.STL提供了两个用来分析排列组合的算法，分别是next\_permutation()和prev\_permutation().例如有3个字符的{'a','b','c'}，生成的全排列abc,acb,bac,bca,cab,cba,使用两者可以很方便地生成排列组合。

2.next\_permutation():按照字典序升序。

3.prev\_permutation():按照字典序降序。

4.时间复杂度O(n!)

```cpp
for(int i=1;i<=n;i++) cin>>a[i];

do
{
    for(int i=1;i<=n;i++) cout<<a[i]<<" ";
    puts("");
}while(next_permutation(a+1,a+n+1));
```

#### 2.12.11 stable\_sort稳定排序

stable\_sort()和sort()的区别：前者排序后可以使原来相同的值在排好序之后相对位置不发生改变，但是后者不可以，用法和sort类似。

#### 2.12.12 multimap（多重映照容器)

可以插入重复的元素，用法和sort类似。

#### 2.12.13 stack（栈）

头文件\<stack\>

```cpp
stack<int> s;
s.push(x);
s.top();//栈顶元素
s.pop();//从栈顶弹出一个元素
s.size();//返回栈的大小
s.empty();//判空
```

#### 2.12.14 queue（队列）

头文件\<queue\>

```cpp
queue<int> q;
q.push(x);//插入一个数x
q.pop();//弹出队头元素
q.front();//取队头
q.back();//取队尾
q.empty();//判空
```

#### 2.12.15 priority\_queue（优先队列/堆）

```cpp
//大根堆
priority_queue<int> heap;

//小根堆
priority_queue<int,vector<int>,greater<int>> heap;

heap.push(x);//插入一个数x
heap.top();//返回堆顶元素
heap.pop();//弹出堆顶元素
```

#### 2.12.16 bitset（压位）

用法：想开一个1024B的bool数组(1KB\=1024B),如果存一个10000\*10000B的bool数组(1e8-\>100MB),但是限制为64MB，我们用bitset存储，bitset\<10000\> s;

#### 2.12.17 其他容器和函数

unordered\_set,unordered\_map,unordered\_multiset,unordered\_multimap,和上面类似，增删改查的时间复杂度为O(1),不支持lower\_bound/upper\_bound

```cpp
count(a+1,a+n+1,x);//返回x在数组a中的个数
find(a+1,a+n+1,x);//查找x在数组a中是否出现过
any();//判断至少有一个1
none();//判断是否全为0
set();//把所有位置变为1
set(k,v);//把第k为变为v
reset();//把所有位置变为0
flip();//等价于~
flip(k);//把第k位取反
```

‍
