# ACM板子总结

## <center> ACM

## 二分查找模板

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 6;                     // 数组长度
    int a[] = {0, 2, 4, 6, 8, 10, 12}; // 数组，a[0]占位
    int x = 8;                     // 要查找的目标值
    int l = 1, r = n;              // 左边界l，右边界r
    int pos = -1;                  // 存储目标值下标，默认-1表示未找到
    while (l <= r) {               // 循环直到左右边界重叠或越界
        int m = (l + r) / 2;       // 中间位置m
        if (a[m] == x) {           // 找到目标值
            pos = m;               // 记录下标
            break;                 // 退出循环
        } else if (a[m] < x) l = m + 1; // 目标值在右区间
        else r = m - 1;            // 目标值在左区间
    }
    if (pos != -1) cout << "Found at: " << pos << endl;
    else cout << "Not found" << endl;
    return 0;
}
```

#### 二分答案法经典题目实现形式

二分答案法的步骤：  
确定搜索区间：根据题目要求，设定一个可能的答案范围。  
条件判断函数：定义一个函数 check(mid)，判断在当前值 mid 时，是否满足条件。  
二分查找：使用二分法在答案空间中查找满足条件的值。  
如果 check(mid) 返回 true，说明当前 mid 可能是一个可行解，尝试更大的值。  
如果 check(mid) 返回 false，说明当前 mid 不是可行解，尝试更小的值。

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
long long c;
const int N = 2e5 + 10;
int a[N];
long long check(int m){
	long long s = 0;
	for(int i = 1;i<=n;i++){
		s += (a[i] + 2LL * m) * (a[i] + 2LL * m); 
	if (s > c) return s; 
	}
	return s;
}


int main() {
	cin>>n>>c;
	for(int i = 1;i<=n;i++){
		cin>>a[i];
	}

	int l = 1, r = 1e6;          
    int pos = -1;              
    while (l <= r) {           
        int m = (l + r) / 2;
		long long s  = check(m);  
        if (s == c) {       
            pos = m;
            break;              
        } else if (s < c) l = m + 1; 
        else r = m - 1;        
    }

cout<<pos;


	return 0;
}
```

#### 整数二分答案法模板（acwing）

```cpp
bool check(int x) {/* ... */} // 检查x是否满足某种性质

// 区间[l, r]被划分成[l, mid]和[mid + 1, r]时使用：
(满足性质的是右“半”边)
int bsearch_1(int l, int r)
{
    while (l < r)
    {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;    // check()判断mid是否满足性质
        else l = mid + 1;
    }
    return l;
}
// 区间[l, r]被划分成[l, mid - 1]和[mid, r]时使用：
(满足性质的是左“半”边)
int bsearch_2(int l, int r)
{
    while (l < r)
    {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    return l;
}
```

### 浮点数二分答案法模板

```cppbool
double bsearch_3(double l, double r)
{
    const double eps = 1e-6;   // eps 表示精度，取决于题目对精度的要求(1e-的这个数要比要求的有效位数大2)
    while (r - l > eps)
    {
        double mid = (l + r) / 2;
        if (check(mid)) r = mid;
        else l = mid;
    }
    return l;
}
```

‍

## 一维前缀和模板

```cpp

#include<bits/stdc++.h>
using namespace std;

const int N = 1e5 + 10;
int sum[N],a[N];
int n,m;
int  l,r;

int main() {
	
	cin>>n>>m;  //n为数组a的长度，m为询问次数
	
	for(int i = 1;i<=n;i++){
		cin>>a[i];
		sum[i] = sum[i-1] + a[i];
	}
	for(int i = 1;i<=m;i++){
		cin>>l>>r;   ////左区间和右区间
		cout<<sum[r] - sum[l-1]<<endl; //区间[l, r]内元素的和,非下标
	}
	
	return 0;
}


```

## 一维差分处理区间增量问题

```cpp
#include <iostream> 
using namespace std;

int main() {
    const int N = 1e5 + 10;     //N表示数组的最大长度
    int a[N] = {0}, b[N] = {0};
    int n, m;                   //n为数组a的长度，m为询问次数
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];            
        b[i] = a[i] - a[i - 1]; // 构建差分数组b
    }

    while (m--) {
        int l, r, c;            // l 和 r 表示操作的区间 [l, r]，c 表示加的值
        cin >> l >> r >> c; 
        b[l] += c;
        if (r + 1 <= n) {       // 如果 r+1 没有越界
            b[r + 1] -= c;
        }
    }
    // 根据差分数组 b 计算最终的数组a
    for (int i = 1; i <= n; i++) {
        a[i] = a[i - 1] + b[i]; // 根据前缀和恢复原数组a
    }
    
    for (int i = 1; i <= n; i++) {
        cout << a[i] << " "; 
    }
    cout << endl;
    return 0; 
}
```

## 二维前缀和模板

```cpp

#include<bits/stdc++.h>
using namespace std;

const int N = 1e9+100;
int s[N][N],a[N][N];
int x,y,w;
int main() {

	int n,m,q;
	cin>>n>>m>>q;

	for(int i = 1;i<=n;i++){
		for(int j =1;j<=m;j++){
			cin>>a[i][j];
			s[i][j] = s[i-1][j]+ s[i][j-1]+a[i][j] - s[i-1][j-1];//二维前缀和模板数组
		}
	}
		
	int x1,y1,x2,y2;
	for(int i = 1;i<=q;i++){
		cin>>x1>>y1>>x2>>y2;
		cout<<s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1]<<endl; //求从x1,y1到x2,y2的区域和
	}
	
	return 0;
}
```

## 二维差分增量模板

```cpp
#include<bits/stdc++.h>
using namespace std;

const int N = 1000 + 10;
int a[N][N], b[N][N];
int n, m, q;

void insert(int x1, int y1, int x2, int y2, int c) {     
    b[x1][y1] += c;
    b[x2 + 1][y1] -= c;
    b[x1][y2 + 1] -= c;
    b[x2 + 1][y2 + 1] += c;
}

int main() {
    cin >> n >> m >> q;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> a[i][j];
            b[i][j] = a[i][j] - a[i-1][j] - a[i][j-1] + a[i-1][j-1];
        }
    }
    while (q--) {
        int x1, y1, x2, y2, c;
        cin >> x1 >> y1 >> x2 >> y2 >> c;
        insert(x1, y1, x2, y2, c);
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            a[i][j] = b[i][j] + a[i-1][j] + a[i][j-1] - a[i-1][j-1];
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

## 其他常用代码片段

#### 遍历所有排列情况

```cpp
do {   } while (next_permutation(v.begin(), v.end()));
```

#### 清理缓存区

```cpp
cin.ignore(numeric_limits<streamsize>::max(), '\n');
```

#### 经典队列操作应用题目

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int m, n;           //m表示缓存最大容量，n表示询问次数
    cin >> m >> n;      // 读取缓存容量 m 和页面访问次数 n
    deque<int> q(m);  // 创建一个大小为 m 的双端队列，用来模拟缓存，默认大小为 m
    int a;  // 用来存储当前访问的页面
    int cnt = 0;  // 用来记录页面缺失的次数
    int qq[1010] = {0};  // 定义一个数组 qq，长度为 1010，初始化所有元素为 0，用来记录哪些页面在缓存中
    for (int i = 1; i <= n; i++) {  // 遍历所有页面访问
        cin >> a;  // 读取当前访问的页面号
        if (!qq[a]) {  // 如果页面 a 不在缓存中
            cnt++;  // 页面缺失，增加缺页次数
            if (q.size() == m) {  // 如果缓存已满
                int x = q.front();  // 获取队列的第一个元素，即最久未使用的页面
                q.pop_front();  // 从队列中移除最久未使用的页面
                qq[x] = 0;  // 更新数组 qq，标记页面 x 不在缓存中
            }
            q.push_back(a);  // 将当前页面 a 加入队列（缓存）
            qq[a] = 1;  // 更新数组 qq，标记页面 a 已经在缓存中
        }
    }
    cout << cnt;  // 输出缺页次数
    return 0;  // 程序结束
}
```

#### 字符串输入

```cpp
string arr[100];
getline(cin, arr[i]);
```

#### 自定义排序函数

```cpp
bool cmp(类型 a, 类型 b) {
    // 第一条件: 比较 a 和 b
    if (条件1) {
        return 排序规则1;
    }
    // 第二条件: 如果第一条件不满足，比较 a 和 b
    if (条件2) {
        return 排序规则2;
    }
    // 第三条件: 如果前面所有条件都不满足，继续比较
    if (条件3) {
        return 排序规则3;
    }
    // 默认返回
    return 排序规则默认;
}
```

### 循环数组索引更新

```cpp
index = (index + 1) % n; // 因为是循环，使用%运算确保数组循环
```

> 解释：
> 这段代码的含义是在一个固定大小为 n 的数组中循环更新 index，确保它始终保持在合法范围内（0 到 n-1）。它通过取模运算（%）实现循环行为。
> 具体分析：
> **1.index + 1:** 
> 将当前索引值 index 增加 1，表示向后移动一个位置。
> **2.% n:** 
> 模运算确保索引不会超出数组的边界。如果增加后索引等于或大于 n，模运算会使它“回到”开头。
> 例如：
> 2.1 如果 index + 1 = n，则 (index + 1) % n = 0。
> 2.2 如果 index + 1 = n + 1，则 (index + 1) % n = 1。
> **3.循环效果:** 
> 模运算的结果总是一个小于 n 的非负数，这样可以实现数组的循环访问。
> 3.1 当 index 为数组最后一个位置（n-1）时，执行 (index + 1) % n 会将索引跳转到第一个位置 0。
> 3.2 否则，索引会正常向后移动。

#### 注意做题时样例输入陷阱，特殊样例，比如数组长度为0，尤其注意题目给的范围，比如＞＝

#### 格式化输出

```cpp
cout << setfill('0') << setw(2) << sum;
cout << fixed << setprecision(2) << num << endl;
```

#### 输出32位二进制形式

```cpp
cout << bitset<32>(n) << endl;
cin >> oct >> n; // 从输入以八进制形式读取一个整数
cout << dec << n; // 以十进制形式输出该整数
```

#### sawp函数不要忘了使用

#### 注意样例空格

#### 字符串和整数转换

> ![Example Image](./image.png)
>
> 以字符串的形式输入数组进行数字的运算时，字符’0’实际上是48
> 注意在C++中，字符和整数之间可以进行转换。字符'0'到'9'的ASCII码分别是48到57。当你从一个字符中减去'0'时，实际上是将该字符转换为对应的数字。

#### 注意int long范围，数组可能是double类型等等

#### 字符数组长度

```cpp
char a[100];
int b = strlen(a);
```

#### 字符串长度

```cpp
string a;
int b = a.size();
```

#### 宏定义

```cpp
#define 宏名 替换内容
```

#### 定义尽量都在主函数外定义

#### 类型别名

```cpp
using ll = long long;

typedef long long ll;
```

#### 结构体数组示例（贪心排序题可能用到）

```cpp
#include <iostream>
#include <algorithm> // 包含 sort 函数
using namespace std;

struct Point {
    int x, y;
};

// 自定义比较函数
bool cmp(const Point &a, const Point &b) {
    if (a.x == b.x) {
        return a.y < b.y;  // 如果 x 相同，按 y 排序
    }
    return a.x < b.x;  // 否则按 x 排序
}

int main() {
    Point points[3];
    // 通过 cin 输入结构体数组
    for (int i = 0; i < 3; i++) {
        cin >> points[i].x >> points[i].y;
    }
    // 使用自定义比较函数进行排序
    sort(points, points + 3, cmp);
    // 输出排序后的数组
    for (int i = 0; i < 3; ++i) {
        cout << "points[" << i << "]: x=" << points[i].x << ", y=" << points[i].y << endl;
    }
    return 0;
}
```

### `lower_bound` 和 `upper_bound`

> lower_bound 是 C++ 标准库 <algorithm> 中的一个非常有用的函数，它用于在已排序的容器中查找第一个不小于（即大于或等于）给定值的元素的位置。它可以用于数组、vector、deque、set 和 map 等支持随机访问或二叉搜索的数据结构。
> （容器中的元素必须是已排序的。lower_bound 使用二分查找，因此只有在排序容器中才能正确工作。）
> auto 是 C++11 引入的一个关键字，用于自动推导变量的类型。通过使用 auto，编译器可以根据变量初始化时的值自动推导出该变量的类型。这使得代码更加简洁，特别是在处理复杂的类型时（例如迭代器或类型较长的容器元素）。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

vector<int> vec = {1, 3, 3, 5, 7, 9};
// 查找第一个不小于 3 的位置（即第一个 3）
auto lb = lower_bound(vec.begin(), vec.end(), 3);
// 查找第一个大于 3 的位置（即第一个大于 3 的元素位置）
auto ub = upper_bound(vec.begin(), vec.end(), 3);
//lb 的位置是 vec.begin() + 1，即指向第一个 3。
//ub 的位置是 vec.begin() + 3，即指向第一个大于 3 的元素 5。
cout << "lb: " << (lb - vec.begin()) << endl;  // 输出 1，表示第一个 3
cout << "ub: " << (ub - vec.begin()) << endl;  // 输出 3，表示 5
```

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 10;

long long a[N], b[N];

int main() {
    int n, m, sum;
    cin >> n >> m >> sum;
    
    // 输入数组 a[] 和 b[]
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    for (int i = 0; i < m; i++) {
        cin >> b[i];
    }

    // 对数组 b[] 进行排序
    sort(b, b + m);

    // 遍历数组 a[]，对于每个 a[i] 使用二分查找
    for (int i = 0; i < n; i++) {
        long long target = sum - a[i];
        // 在 b[] 中查找 target
        int idx = lower_bound(b, b + m, target) - b;

        // 检查是否找到并且满足 a[i] + b[idx] == sum
        if (idx < m && b[idx] == target) {
            cout << i << " " << idx << endl;
            return 0;  // 找到后直接退出
        }
    }

    // 如果没有找到符合条件的 pair
    cout << -1 << endl;
    return 0;
}
```

### STL 常用函数

#### 最值

```cpp
max(x, y);  // 返回 x 和 y 较大值
min(x, y);  // 返回 x 和 y 较小值
```

#### 排序

`sort(va.begin(), va.end(), cmp);`

#### 子串操作

```cpp

#include <iostream>
#include <cstring> // 包含 C 字符串处理函数 strstr
using namespace std;

int main() {
    //子串截取
    string s = "Hello, World!";
    string sub = s.substr(7, 5);    // 从下标 7 开始截取 5 个字符
    s.erase(7, 10);                 // 从下标7 删除 10 个字符

    //查找子串
    size_t pos = s.find("World");   // 查找 "World" 的位置，一般返回第一个字母起始下标
    if (pos != string::npos) {
    cout << "Found at: " << pos << endl; // 如果找到，输出位置
    }

    // 定义两个字符数组，用于存储输入的源字符串和需要查找的子串
    char str[100];                  // 源字符串
    char target[100];               // 子串
    cin.getline(str, 100);          // 使用 getline 读取一整行字符串
    cin.getline(target, 100);       // 输入需要查找的子串
    const char* pos = strstr(str, target);  // 使用 strstr 函数查找子串在源字符串中的位置
     // 判断是否找到子串
    if (pos != nullptr) {
        // 如果找到，计算子串的起始下标，并输出
        cout << "Substring found at index: " << (pos - str) << endl;  
    } else {
        cout << "Substring not found!" << endl;  
    }
    return 0; 
}
```

### 双指针模板

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n, x;           // n为数组大小，x为目标和
    cin >> n >> x;      // 输入n和目标和x
    int a[n + 1];       // 数组，从1开始存储
    for (int i = 1; i <= n; i++) {
        cin >> a[i];    // 输入数组
    }
    sort(a + 1, a + n + 1); // 排序数组
    int i = 1, j = n;   // 双指针初始化
    while (i < j) {
        int s = a[i] + a[j]; // 当前两个数的和
        if (s == x) {
            cout << a[i] << " " << a[j] << endl;
            break;
        } else if (s < x) {
            i++;        // 左指针右移
        } else {
            j--;        // 右指针左移
        }
    }
    if (i >= j) {
        cout << "No solution" << endl; // 没有找到满足条件的数对
    }
    return 0;
}

```

#### 1.7.0输出单词

给定一行句子，输出其中的单词

> 样例输入
>
> i am student

> 样例输出
>
> i
>
> am
>
> student

```cpp
#include <bits/stdc++.h>
#include <string>
using namespace std;

int main()
{
    char str[1000];
    // 使用 gets() 读取一行字符串（注意：gets() 已被弃用，推荐使用 fgets() 或 getline()）
    gets(str);
  
    // 获取字符串的长度
    int n = strlen(str);
  
    // 遍历字符串，逐个输出单词
    for (int i = 0; i < n; i++)
    {
        int j = i;
        // 指针 j 扫描字符串，直到遇到空格或者字符串结束
        while (j < n && str[j] != ' ') 
            j++; // j 指向当前单词结束的位置（空格处或者字符串末尾）
      
        // 输出当前单词（从 i 到 j-1）
        for (int k = i; k < j; k++) 
            cout << str[k];
        cout << endl; // 输出换行符，每个单词单独占一行
      
        // 将 i 移动到 j 处，即空格后的第一个字符位置
        // 注意：这里 i 在 for 循环的自增中会自动 +1，因此如果想跳过空格，
        // 可能需要额外处理多个连续空格的情况（当前代码假设单词间仅有一个空格）
        i = j;
    }
    return 0;
}

```

‍

#### 注意事项补充

不要忘了把oj的编译模式换成C++

一定注意输入的是n的范围还是n个整数的范围！！！！

注意输入样例形式，如1111与1 1 1 1你就要考虑不同的接收输入的方式了

别把2*i写成2i

为防止爆long long ,需对等式右边进行强转
如:s += (a[i] + 2LL * m) * (a[i] + 2LL * m);

定义cmp时,不要带等号

使用auto遍历容器时,要改变容器内元素加&,不改变不加.

#### continue用法示例

```cpp
//数字反转,消除原数末尾0,但中间0不动.
int flag = 1;
for(int i = p-1;i>=0;i--){
    if(a[i]=='0' && flag==1 && i>0){
        continue;
    }
    flag = 0;
    cout<<a[i];

}
```

#### 字符串经典操作例题(包含回文,去重,取子串)

```cpp
#include<bits/stdc++.h>
using namespace std;
string s;
string zican(string sub){
	string a = "";
	a+=sub[0];
	
	for(int i = 0;i<sub.size()-1;i++){
		if(sub[i+1]!=sub[i]){
			a += sub[i+1];
		}
	}
	return a;
	
}
bool huiwen(string subb){
	int i = 0;
	int j = subb.size()-1;
	while(i<=j){
		if(subb[i]!=subb[j]){
			return false;
		}
		i++;
		j--;
	}
	return true;
}

int main() {
	long long sumj = 0;
	long long sumo = 0;
	cin>>s;
	int n = s.size();
	for(int i = 0;i<n;i++){
		for(int j = 1;i+j<=n;j++){
			string sub = s.substr(i,j);
			string subb = zican(sub);
			if(huiwen(subb)){
				if(j%2==0){
					sumo++;
				}else{
					sumj++;
				}
			}
		}
	}
	cout<<sumo<<" "<<sumj;
	
	return 0;
}
```

#### C风格字符串处理

1. int result = strcmp(str1, str2);
   strcmp 用于比较两个 C 风格字符串（即 char 数组）
   返回 0：如果两个字符串相等。
   返回一个负整数：如果 str1 小于 str2（按字典顺序比较）。
   返回一个正整数：如果 str1 大于 str2（按字典顺序比较）.
2. strcpy 用于将一个 C 风格字符串的内容复制到另一个字符串中.
   char* strcpy(char* dest, const char* src);
   dest：目标字符数组，拷贝的结果会存储在这里。
   src：源字符数组，即你要复制的字符串。
   返回值：返回目标字符串 dest 的指针。
3. strcat 用于将一个字符串连接到另一个字符串的末尾。
   char* strcat(char* dest, const char* src);
   dest：目标字符数组，连接结果将存储在此。
   src：源字符数组，要追加的字符串。
   返回值：返回目标字符串 dest 的指针。
4. strchr 用于查找字符串中第一次出现指定字符的位置。
   str：要查找的字符串。
   ch：要查找的字符。
   返回值：返回指向找到的字符的指针，如果没有找到，则返回 nullptr。

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    const char* str = "Hello, world!";
    char* pos = strchr(str, 'o');  // 查找字符 'o'

    if (pos != nullptr) {
        cout << "Found 'o' at position: " << (pos - str) << endl;  // 计算相对位置
    } else {
        cout << "'o' not found!" << endl;
    }

    return 0;
}
```

输出:Found 'o' at position: 4

5. strtok 用于分割字符串，它根据指定的分隔符把一个字符串分解为多个子字符串。
   char* strtok(char* str, const char* delimiters);
   str：待分割的字符串。首次调用时需要传入原始字符串，后续调用可以传入 nullptr 来继续分割。
   delimiters：用于分割的分隔符（多个字符）。
   返回值：返回指向子字符串的指针。

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char str[] = "Hello, world, C++!";
    char* token = strtok(str, ", ");  // 以 ", " 作为分隔符

    while (token != nullptr) {
        cout << "Token: " << token << endl;
        token = strtok(nullptr, ", ");  // 继续分割
    }

    return 0;
}
```

输出:Token: Hello
Token: world
Token: C++

6. strncat 类似于 strcat，但它会限制连接的字符数量，防止溢出
   dest：目标字符数组。
   src：源字符串。
   n：要连接的最大字符数。

#### 快速幂算法

```cpp
#include <iostream>
using namespace std;

// 快速幂函数：计算 a^b
int qp(int a, int b) {
    int r = 1;         // r 存储结果，初始为 1
    while (b > 0) {    // 当指数 b 大于 0 时继续循环
        if (b % 2)     // 如果 b 是奇数
            r *= a;    // 将当前基数累乘到结果
        a *= a;        // 基数自乘
        b /= 2;        // 指数减半
    }
    return r;          // 返回计算结果
}

int main() {
    int a, b;
    cout << "输入底数和指数：";
    cin >> a >> b;              // 输入底数 a 和指数 b
    cout << a << "^" << b << " = " << qp(a, b) << endl;
    return 0;
}



------------------------------------------------------------------------------

#include <iostream>
#include <cstring>
#include <algorithm>
#include <cstdio>
using namespace std;

// 定义长整型别名，便于后续使用
typedef long long LL;

// 快速幂函数，计算 (a^k) % p
int qmi(int a, int k, int p)
{
    int res = 1; // 初始化结果为 1
    while (k) // 当指数 k 不为 0 时循环
    {
        if (k & 1) // 如果 k 是奇数，累乘当前的 a 并取模
            res = (LL)res * a % p;
        k /= 2; // 指数 k 右移一位，相当于整除 2
        a = (LL)a * a % p; // 底数自乘并取模
    }
    return res; // 返回计算结果
}

int main()
{
    int n;
    cin >> n; // 读取测试用例数量
    while (n--) // 循环处理每个测试用例
    {
        int a, k, p;
        cin >> a >> k >> p; // 读取底数 a，指数 k 和模数 p
        cout << qmi(a, k, p) << endl; // 输出快速幂结果
    }
    return 0;
}

```

‍

### 快速幂

#### 4.4.1快速幂

![](https://i-blog.csdnimg.cn/blog_migrate/c43dce09485420a03ad2f4faa4f566d2.png)

![](https://i-blog.csdnimg.cn/blog_migrate/8b5f523e7d6d170db8c10dfc0b8efc3b.png)

时间复杂度为O(log n)

![](https://i-blog.csdnimg.cn/blog_migrate/3e8b8f7e0ce1a96ad49f0f4fa9debe15.png)

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
#include <cstdio>
using namespace std;
typedef long long LL;

int qmi(int a,int k,int p)
{
    int res=1;
    while(k)
    {
        if(k&1) res=(LL)res*a%p;
        k/=2;
        a=(LL)a*a%p;
    }
    return res;
}
int main()
{
    int n;
    cin>>n;
    while(n--)
    {
        int a,k,p;
        cin>>a>>k>>p;
        cout<<qmi(a,k,p)<<endl;
    }
    return 0;
}
```

# accumulate

```cpp
vector<int> vec = {1, 2, 3, 4, 5};
// 计算 vec 中所有元素的和，初始值为 0
int sum = accumulate(vec.begin(), vec.end(), 0);
```

2. 还通过提供自定义的二元操作 op，可以实现不同的聚合操作。例如，计算区间内所有元素的乘积。

```cpp
vector<int> vec = {1, 2, 3, 4, 5};

 // 使用乘法作为操作符计算元素的乘积，初始值为 1
 int product = accumulate(vec.begin(), vec.end(), 1, multiplies<int>());

//multiplies<int>() 是 C++ 标准库中提供的一个函数对象，它执行乘法操作。
```

3. accumulate 也可以用于其他类型的数据聚合，例如字符串的拼接。通过传入一个适当的操作函数（如加法运算符），可以将一个字符串序列拼接成一个完整的字符串。

```cpp
vector<string> words = {"Hello", " ", "World", "!"};

// 使用字符串拼接操作，将所有字符串拼接起来
 string result = accumulate(words.begin(), words.end(), string());
```

5. 如果我们想要找出一组元素中的最大值，也可以使用 accumulate，配合自定义的操作函数（如 std::max）。

```cpp
vector<int> vec = {1, 9, 3, 7, 5};

// 使用 max 来查找最大值
int max_value = accumulate(vec.begin(), vec.end(), vec[0], max<int>());
```

### 单调栈模板

```cpp
常见模型：找出每个数左边离它最近的比它大/小的数
int tt = 0;
for (int i = 1; i <= n; i ++ )
{
    while (tt && check(stk[tt], i)) tt -- ;
    stk[ ++ tt] = i;
}

-------------------------------------------------------------------------------------------------------------

#include <iostream>
using namespace std;
const int N = 100010;
int stk[N], tt;
 
int main()
{
    int n;
    cin >> n;
    while (n -- )
    {
        int x;
        scanf("%d", &x);
        while (tt && stk[tt] >= x) tt -- ;//如果栈顶元素大于当前待入栈元素，则出栈
        if (!tt) printf("-1 ");//如果栈空，则没有比该元素小的值。
        else printf("%d ", stk[tt]);//栈顶元素就是左侧第一个比它小的元素。
        stk[ ++ tt] = x;
    }
    return 0;
}

```

#### 单调栈stl实现

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main() {
    int n;
    cin >> n;
    stack<int> st;  // 使用 STL 的栈容器

    while (n--) {
        int x;
        cin >> x;  // 读入当前数字

        // 将栈中所有大于等于 x 的元素弹出
        while (!st.empty() && st.top() >= x)
            st.pop();

        // 如果栈为空，则说明左侧没有比 x 小的数
        if (st.empty())
            cout << "-1 ";
        else
            cout << st.top() << " ";  // 栈顶元素就是左侧第一个比 x 小的数

        // 将当前数字入栈，作为后续数字的候选者
        st.push(x);
    }
    return 0;
}

```

给定  个非负整数表示每个宽度为  的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

例如，当给定数字序列为 `0,1,0,2,1,0,1,3,2,1,2,1`​ 时，柱子高度图如下所示，最多可以接  个单位的雨水。

![rainwatertrap.png](https://cdn.acwing.com/media/article/image/2020/04/03/19_ba03555675-rainwatertrap.png)

#### 输入格式

第一行包含整数 。

第二行包含  个非负整数。

#### 输出格式

输出一个整数，表示最大接水量。

#### 输入样例：

```hljs
12
0 1 0 2 1 0 1 3 2 1 2 1
```

#### 输出样例：

```hljs
6
```

```cpp
#include <iostream>

using namespace std;

const int N = 1e5 + 10;

int n;
int h[N], q[N];                                     //h为障碍物高度，q为单调栈

int main()
{
    cin >> n;
    for (int i  =0; i < n; i ++ ) cin >> h[i];

    int res = 0;
    int tt = -1;                                    //tt为栈顶指针，q[tt]为障碍物序号
                                                    //h[q[tt]]表示序号为q[tt]的障碍物的高度
    for (int i = 0; i < n; i ++ )
    {
        int last = 0;                               //储存上一个高度
        while (tt >= 0 && h[q[tt]] < h[i])          //判断栈不为空且栈顶元素小于等于当前元素时
        {
            //在删掉一个较矮的障碍物前，先计算它与前一障碍物的储水量
            //两障碍物间雨水容量 = 两障碍物高度差 * 两障碍物距离
            res += (h[q[tt]] - last) * (i - q[tt] - 1);   
            last = h[q[tt]];
            tt -- ;
        }

        if (tt >= 0) res += (h[i] - last) * (i - q[tt] - 1);
        q[ ++ tt] = i;                              //当前障碍物入栈
    }

    cout << res << endl;

    return 0;
}
```

### 深度优先搜索（DFS）

```cpp
int search(int t)
{
    if(满足输出条件)
    {
        输出解;
    }
    else
    {
        for(int i=1;i<=尝试方法数;i++)
            if(满足进一步搜索条件)
            {
                为进一步搜索所需要的状态打上标记;
                search(t+1);
                恢复到打标记前的状态;//也就是说的{回溯一步}
            }
    }
}
```

dfs基本应用：类似树的形式，一直向深处搜索，然后进行回溯。

![](https://i-blog.csdnimg.cn/blog_migrate/ac466161c36580f9fd7baddbcb83d389.png)

```cpp
#include<bits/stdc++.h>
using namespace std;

int n;                // 用于存储输入的整数 n，代表全排列的元素个数
bool st[1000];        // 用于标记某个数字是否已经被使用
int path[1000];       // 用于存储当前的排列路径

// 深度优先搜索函数，用于生成全排列
void dfs(int u)
{
    if (u == n) // 如果当前排列的长度已经达到 n
    {
        for (int i = 0; i < n; i++) // 输出当前排列
            printf("%d ", path[i]);
        puts(""); // 换行
        return;
    }

    // 枚举从 1 到 n 的所有数字
    for (int i = 1; i <= n; i++)
        if (!st[i]) // 如果数字 i 尚未被使用
        {
            path[u] = i;     // 将数字 i 放到当前排列的位置 u
            st[i] = true;    // 标记数字 i 已经被使用
            dfs(u + 1);      // 递归调用，进入下一层
            st[i] = false;   // 回溯，撤销数字 i 的使用标记
        }
}

int main()
{
    cin >> n; // 输入整数 n
    dfs(0);   // 从第 0 层开始进行深度优先搜索
    return 0;
}




---------------------------------------------------------------------------

#include <bits/stdc++.h>
using namespace std;

int n; // 输入的整数 n，代表全排列的元素个数

int main() {
    cin >> n; // 输入整数 n

    stack<pair<vector<int>, vector<bool>>> stk; 
    // 栈中存储的元素为：当前排列路径和数字使用标记

    // 初始化栈，开始时路径为空，所有数字均未被使用
    vector<int> path;             // 当前排列路径
    vector<bool> used(n + 1, false); // 标记数组，n+1大小便于直接用数字 1 到 n
    stk.push({path, used});       // 压入初始状态

    while (!stk.empty()) { // 栈非空时循环
        auto [path, used] = stk.top(); // 取出栈顶状态
        stk.pop(); // 弹出栈顶

        if (path.size() == n) { // 如果当前排列长度达到 n，则输出排列
            for (int x : path) cout << x << " ";
            cout << endl;
            continue;
        }

        // 枚举从 1 到 n 的所有数字，尝试扩展路径
        for (int i = n; i >= 1; --i) { // 倒序枚举，保证路径扩展时顺序正确
            if (!used[i]) { // 如果数字 i 尚未被使用
                vector<int> new_path = path; // 当前路径的副本
                vector<bool> new_used = used; // 当前标记数组的副本
                new_path.push_back(i);        // 添加数字 i 到路径
                new_used[i] = true;           // 标记数字 i 已被使用
                stk.push({new_path, new_used}); // 将新状态压入栈
            }
        }
    }

    return 0;
}

```

##### n皇后问题中，一个坐标是u,i的点，在u+i这条对角线上，也在n-u+i这条<span data-type="text" style="color: var(--b3-font-color8);">反</span>对角线上。

### 广度优先搜索(BFS)

bfs:一层一层地向外进行扩展，直到搜到终点位置，本质是队列，最先搜到的位置一定是最短路径，所以bfs有最短路径。

```cpp


#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=110;
typedef pair<int,int> PII;
int d[N][N];
int g[N][N];
bool st[N][N];
int n,m;
PII q[N*N];
PII Pre[N][N];
int bfs()
{
    int hh=0,tt=-1;
    q[++tt]={1,1};//把起始位置放进来
    st[1][1]=true;//对起始位置进行标记
    d[1][1]=0;
    int dx[4]={-1,0,1,0},dy[4]={0,1,0,-1};//记下偏移量
    while(hh<=tt)
    {
        auto t=q[hh++];
        for(int i=0;i<4;i++)
        {
            int x=t.first+dx[i],y=t.second+dy[i];
            if(x>=1&&x<=n&&y>=1&&y<=m&&g[x][y]==0&&!st[x][y])//该点符合待更新的点
            {
                d[x][y]=d[t.first][t.second]+1;//路径从上一个路径更新过来
                Pre[x][y]=t;
                q[++tt]={x,y};//入队
                st[x][y]=true;//标记
            }
        }
    }
    /*输出路径
    int x=n,y=m;
    while(x||y)
    {
        cout<<x<<" "<<y<<endl;
        auto t=Pre[x][y];
        x=t.first,y=t.second;
    }
    */
    return d[n][m];
}
 
int main()
{
    scanf("%d%d",&n,&m);
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
            cin>>g[i][j];
    printf("%d\n",bfs());
    return 0;
}



---------------------------------------
#include <bits/stdc++.h>
using namespace std;

const int N = 110; // 假设网格的最大边长为 110
typedef pair<int, int> PII; // 定义坐标点的类型 (x, y)

// 定义全局变量
int d[N][N];     // 距离数组，存储每个点到起点的最短路径长度
int g[N][N];     // 网格数组，输入地图
bool st[N][N];   // 标记数组，判断某点是否已经访问过
int n, m;        // 网格的大小 n 行 m 列
PII Pre[N][N];   // 记录路径的前驱节点，用于输出路径

// 宽度优先搜索（BFS）
int bfs() {
    queue<PII> q;          // 定义队列
    q.push({1, 1});        // 把起始位置放入队列
    st[1][1] = true;       // 标记起点已访问
    d[1][1] = 0;           // 起点到起点的距离为 0

    // 定义方向数组，用于上下左右的四个方向
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};

    while (!q.empty()) { // 当队列不为空
        auto t = q.front(); // 取出队头元素
        q.pop();            // 弹出队头元素

        for (int i = 0; i < 4; i++) { // 枚举四个方向
            int x = t.first + dx[i], y = t.second + dy[i]; // 新的坐标
            // 检查新坐标是否有效：1. 不越界；2. 是空地；3. 没访问过
            if (x >= 1 && x <= n && y >= 1 && y <= m && g[x][y] == 0 && !st[x][y]) {
                d[x][y] = d[t.first][t.second] + 1; // 更新距离
                Pre[x][y] = t;                     // 记录路径的前驱节点
                q.push({x, y});                    // 新点入队
                st[x][y] = true;                   // 标记新点已访问
            }
        }
    }

    /*
    如果需要输出路径，可以启用这段代码：
    int x = n, y = m; // 从终点回溯路径
    while (x || y) {
        cout << x << " " << y << endl; // 输出路径点
        auto t = Pre[x][y]; // 找到当前点的前驱
        x = t.first, y = t.second; // 回到前驱点
    }
    */

    return d[n][m]; // 返回终点的最短路径长度
}

int main() {
    // 输入网格大小
    scanf("%d%d", &n, &m);

    // 输入网格数据
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> g[i][j];

    // 输出从起点到终点的最短路径长度
    printf("%d\n", bfs());
    return 0;
}

```

---

## 双向BFS

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N = 110;
typedef pair<int, int> PII;
int d1[N][N], d2[N][N];  // 分别存储从起点和终点出发的距离
bool st1[N][N], st2[N][N];  // 标记数组，分别表示从起点和终点出发的访问情况
int g[N][N];  // 图的表示
PII Pre1[N][N], Pre2[N][N];  // 记录路径

int n, m;

int dx[4] = {-1, 0, 1, 0};  // 方向数组
int dy[4] = {0, 1, 0, -1};

// 双向 BFS
int bidirectionalBFS() {
    int hh1 = 0, tt1 = -1, hh2 = 0, tt2 = -1;
    PII q1[N * N], q2[N * N];  // 队列分别表示从起点和终点出发的队列
    q1[++tt1] = {1, 1};  // 起点
    q2[++tt2] = {n, m};  // 终点
    st1[1][1] = true;  // 起点标记
    st2[n][m] = true;  // 终点标记
    d1[1][1] = 0;  // 起点距离为0
    d2[n][m] = 0;  // 终点距离为0

    while (hh1 <= tt1 || hh2 <= tt2) {
        // 从起点进行 BFS
        if (hh1 <= tt1) {
            auto t = q1[hh1++];
            for (int i = 0; i < 4; i++) {
                int x = t.first + dx[i], y = t.second + dy[i];
                if (x >= 1 && x <= n && y >= 1 && y <= m && g[x][y] == 0 && !st1[x][y]) {
                    d1[x][y] = d1[t.first][t.second] + 1;
                    Pre1[x][y] = t;
                    q1[++tt1] = {x, y};
                    st1[x][y] = true;
                }
            }
        }

        // 从终点进行 BFS
        if (hh2 <= tt2) {
            auto t = q2[hh2++];
            for (int i = 0; i < 4; i++) {
                int x = t.first + dx[i], y = t.second + dy[i];
                if (x >= 1 && x <= n && y >= 1 && y <= m && g[x][y] == 0 && !st2[x][y]) {
                    d2[x][y] = d2[t.first][t.second] + 1;
                    Pre2[x][y] = t;
                    q2[++tt2] = {x, y};
                    st2[x][y] = true;
                }
            }
        }
      
        // 检查是否相遇
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (st1[i][j] && st2[i][j]) {
                    return d1[i][j] + d2[i][j];  // 返回相遇点的最短路径长度
                }
            }
        }
    }

    return -1;  // 如果没有找到路径
}

int main() {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> g[i][j];
  
    printf("%d\n", bidirectionalBFS());  // 输出结果
    return 0;
}

```

### 迭代加深搜索

```cpp
#include<bits/stdc++.h>
using namespace std;

const int N = 110;
int g[N][N], n, m;
int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};

// 判断是否合法
bool valid(int x, int y) {
    return x >= 1 && x <= n && y >= 1 && y <= m && g[x][y] == 0;
}

// 深度优先搜索
bool dfs(int x, int y, int d, int max_d, vector<vector<bool>>& vis) {
    if (d > max_d) return false;
    if (x == n && y == m) return true;
    vis[x][y] = true;
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (valid(nx, ny) && !vis[nx][ny]) {
            if (dfs(nx, ny, d + 1, max_d, vis)) return true;
        }
    }
    vis[x][y] = false;
    return false;
}

// 迭代加深搜索
bool IDS() {
    for (int depth = 0; depth <= n * m; depth++) {
        vector<vector<bool>> vis(n + 1, vector<bool>(m + 1, false));
        if (dfs(1, 1, 0, depth, vis)) return true;
    }
    return false;
}

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> g[i][j];
        }
    }
    cout << (IDS() ? "Found" : "Not Found") << endl;
    return 0;
}

```

### 启发式搜索（A\*）

```cpp
#include<bits/stdc++.h>
using namespace std;

const int N = 110;
typedef pair<int, int> pii;
int g[N][N], n, m;
int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};

// 判断是否合法
bool valid(int x, int y) {
    return x >= 1 && x <= n && y >= 1 && y <= m && g[x][y] == 0;
}

// 启发式函数：曼哈顿距离
int h(int x, int y) {
    return abs(x - n) + abs(y - m);
}

// A* 算法
int Astar() {
    vector<vector<int>> gscore(n + 1, vector<int>(m + 1, INT_MAX));
    vector<vector<int>> fscore(n + 1, vector<int>(m + 1, INT_MAX));
    priority_queue<pii, vector<pii>, greater<pii>> pq;
  
    gscore[1][1] = 0;
    fscore[1][1] = h(1, 1);
    pq.push({fscore[1][1], 1});
  
    while (!pq.empty()) {
        auto [f, u] = pq.top();
        pq.pop();
        int x = u / m, y = u % m;
      
        if (x == n && y == m) return gscore[x][y];
      
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (valid(nx, ny)) {
                int tent = gscore[x][y] + 1;
                if (tent < gscore[nx][ny]) {
                    gscore[nx][ny] = tent;
                    fscore[nx][ny] = tent + h(nx, ny);
                    pq.push({fscore[nx][ny], nx * m + ny});
                }
            }
        }
    }
    return -1;
}

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> g[i][j];
        }
    }
    cout << (Astar() != -1 ? "Found" : "Not Found") << endl;
    return 0;
}

```

### 记忆化搜索

```cpp
#include<bits/stdc++.h>
using namespace std;

const int N = 110;
int dp[N][N];  // dp 数组用于记忆化
int n, m;

// 递归函数模板
int dfs(int x, int y) {
    if (x == n && y == m) return 0;  // 达到目标，返回结果

    if (dp[x][y] != -1) return dp[x][y];  // 如果已经计算过，直接返回

    dp[x][y] = INT_MAX;  // 先设置为一个较大的值

    // 递归搜索周围的点
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (valid(nx, ny)) {
            dp[x][y] = min(dp[x][y], dfs(nx, ny) + 1);  // 更新最短路径
        }
    }

    return dp[x][y];  // 返回计算结果
}

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> g[i][j];
            dp[i][j] = -1;  // 初始化为未计算状态
        }
    }

    cout << dfs(1, 1) << endl;  // 开始计算
    return 0;
}

```

##### cin.tie(0);和ios::sync_with_stdio(false);可以提升效率。

---

#### 快速排序

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=100010;  // 定义数组最大容量
int q[N];            // 静态分配数组，避免动态内存开销

/**
 * 快速排序函数（双指针法）
 * @param q[] 待排序数组
 * @param l 当前区间的左边界
 * @param r 当前区间的右边界
 * 时间复杂度: 平均O(nlogn)，最坏O(n²)
 * 空间复杂度: O(logn) 递归栈空间
 */
void quick_sort(int q[], int l, int r) {
    // 递归终止条件：区间长度<=1时无需排序
    if (l >= r) return;
  
    // 选取中间元素作为基准值（比经典选首元素更抗退化）
    int x = q[l + r >> 1];  // 位运算等效 (l+r)/2
    int i = l - 1;          // 左扫描指针（从界外开始）
    int j = r + 1;          // 右扫描指针（从界外开始）

    // 核心分区逻辑：将数组分为<=x和>=x的两部分
    while (i < j) {
        // 找到左边第一个 >=x 的元素
        do i++; while (q[i] < x);  // 注意没有等号，保证稳定性
      
        // 找到右边第一个 <=x 的元素
        do j--; while (q[j] > x);  // 注意没有等号，保证稳定性
      
        // 当指针未交叉时交换元素
        if (i < j) swap(q[i], q[j]);
    }

    // 递归处理子区间（选择j作为分界点保证区间分裂）
    quick_sort(q, l, j);      // 处理左半区间
    quick_sort(q, j + 1, r);  // 处理右半区间
}

int main() {
    int n;
    cin >> n;
  
    // 输入数据
    for (int i = 0; i < n; i++) 
        cin >> q[i];
  
    // 调用快速排序
    quick_sort(q, 0, n - 1);
  
    // 输出排序结果
    for (int i = 0; i < n; i++) 
        cout << q[i] << " ";
  
    return 0;
}
```

#### 归并排序

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 100010;  // 定义数组的最大容量

int q[N], tmp[N];  // q 数组用于存放待排序的数据，tmp 数组用于归并排序时的临时存储

// 归并排序函数，参数 q 是数组，l 和 r 分别是当前排序区间的左右边界索引
void merge_sort(int q[], int l, int r) {
    // 如果区间内只有一个元素或无元素，则无需排序，直接返回
    if(l >= r) return;
  
    // 计算中间位置
    int mid = l + r >> 1;  // 注意：这里等同于 mid = (l + r) / 2
  
    // 对左右两个子区间分别进行归并排序
    merge_sort(q, l, mid);
    merge_sort(q, mid + 1, r);
  
    // 合并两个已排序的子区间
    int k = 0;  // tmp 数组的索引
    int i = l, j = mid + 1;  // 两个子区间的起始索引
  
    // 当两个子区间都未遍历完时，比较两边元素，将较小的元素存入 tmp 数组中
    while(i <= mid && j <= r)
        if(q[i] < q[j])
            tmp[k++] = q[i++];  // 如果左边元素较小，存入 tmp，并移动左边索引
        else
            tmp[k++] = q[j++];  // 否则存入右边元素，并移动右边索引
  
    // 将剩余的左子区间元素存入 tmp（如果有剩余的话）
    while(i <= mid)
        tmp[k++] = q[i++];
  
    // 将剩余的右子区间元素存入 tmp（如果有剩余的话）
    while(j <= r)
        tmp[k++] = q[j++];
  
    // 将排好序的 tmp 数组复制回原数组对应位置
    for(i = l, j = 0; i <= r; i++, j++)
        q[i] = tmp[j];
}

int main()
{
    int n;
    // 读取数据个数
    scanf("%d", &n);
  
    // 读取 n 个整数存入数组 q
    for(int i = 0; i < n; i++) 
        scanf("%d", &q[i]);
  
    // 对整个数组进行归并排序
    merge_sort(q, 0, n - 1);
  
    // 输出排序后的数组
    for(int i = 0; i < n; i++)
        cout << q[i] << " ";
  
    return 0;
}

```

#### 位运算

&:按位与,1&0\=0,0&1\=0,0&0\=0,1&1\=1,只有都为1时才为1.

|:按位或,1|1\=1,1|0\=1,0|1\=1,0|0\=0,只有都为0时才为0.

\^:按位异或,1\^1\=0,1\^0\=1,0\^a\=a,相同为0，不同为非0的那个数.

\>\>:右移，a\>\>x,表示a除以2\^x;

\<\<:左移，a\<\<x,表示a乘2\^x;

\~:把0变成1，把1变成0；

-x\=\~x+1;

(1)lowbit(x)

将十进制数的二进制表示的最低位1取出来。

```cpp
int lowbit(int x)
{
    return x&-x;
}
```

如x的二进制表示时100,-x在计算机中为\~x+1,则\~x\=011,\~x+1\=111,那么就有

(100)&(111)\=(100)，这样就可以把最低位上面的1取出来。

(2)把n对应二进制表示中第k位取出来(注意有第0位)

```cpp
int get(int n,int k)
{
    return n>>k&1;
}
```

(3)输出所有小于k的十进制

```cpp
for(int i=0;i<1<<k;i++)
    cout<<i;
```

---

#### 区间合并

给定 n 个区间 [li,ri]，要求合并所有有交集的区间。

注意如果在端点处相交，也算有交集。

输出合并完成后的区间个数。

例如：[1,3] 和 [2,6] 可以合并为一个区间 [1,6]。

输入格式

第一行包含整数 nn。

接下来 nn 行，每行包含两个整数 l 和 r。

输出格式

共一行，包含一个整数，表示合并区间完成后的区间个数。

数据范围

1≤n≤100000,

−109≤li≤ri≤109

输入样例：

5

1 2

2 4

5 6

7 8

7 9

输出样例：

3

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
 
using namespace std;
 
// 定义一个 pair 类型，表示区间，first 表示区间的左端点，second 表示右端点
typedef pair<int, int> PII;
 
int n;  // 区间的数量
 
// merge 函数用于合并重叠的区间，输入参数 interval 为区间集合
void merge(vector<PII> &interval)
{
    // 用 ans 存储合并后的区间结果
    vector<PII> ans;
 
    // 对区间进行排序，排序规则是先按照区间的左端点升序，
    // 如果左端点相同，则按照右端点升序排序
    sort(interval.begin(), interval.end()); //! pair排序 优先左端点， 再以右端点排序
 
    // 初始化当前区间的左右边界 st 和 ed
    // 初始化为一个很小的值，确保第一次比较时一定满足条件 ed < item.first
    int st = -1e9 - 10, ed = -1e9 - 10;  //! 只要比 -1e9 小就可以
 
    // 遍历排序后的区间
    for(auto item : interval)
    {
        // 如果当前区间与遍历到的区间没有重叠（即当前区间的结束点小于新区间的起始点）
        if(ed < item.first)
        {
            // 如果 st 不是初始值，则说明前面存在一个合法区间，加入 ans
            if(st != -1e9 - 10)
                ans.push_back({st, ed}); //! 第一次在这里初始化
 
            // 更新当前区间为新区间
            st = item.first;
            ed = item.second; //! 第一段区间从这里开始
        }
        else
        {
            // 如果有重叠，则更新当前区间的结束点为两个区间结束点的最大值
            ed = max(ed, item.second);
        }
    }
    // todo 这个循环结束之后还会剩下一个未加入的区间
    // 最后一次合并后的区间需要加入结果中
    if(st != -1e9 - 10)
        ans.push_back({st, ed});  //! 如果不是空的  那我们就加上一段
 
    // 更新输入的区间集合为合并后的结果
    interval = ans;
}
 
int main(void)
{
    // 提高输入输出效率
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    // 输入区间数量
    cin >> n;
 
    // 定义一个 vector 用来存储所有区间
    vector<PII> interval;
    while(n--)
    {
        int l, r;
        // 输入每个区间的左右端点
        cin >> l >> r;
 
        // 将输入的区间加入集合
        interval.push_back({l, r});
    }
 
    // 调用 merge 函数合并所有重叠区间
    merge(interval);
 
    // 输出合并后区间的数量
    cout << interval.size() << endl;
 
    return 0;
}

```

#### 

用数组模拟链表。

### 单链表

实现一个单链表，链表初始为空，支持三种操作：

向链表头插入一个数；

删除第 k 个插入的数后面的数；

在第 k个插入的数后插入一个数。

现在要对该链表进行 M次操作，进行完所有操作后，从头到尾输出整个链表。

注意:题目中第 k 个插入的数并不是指当前链表的第 k个数。例如操作过程中一共插入了 n 个数，则按照插入的时间顺序，这 n 个数依次为：第 1 个插入的数，第 2 个插入的数，…第 n 个插入的数。

输入格式

第一行包含整数 M，表示操作次数。

接下来 M 行，每行包含一个操作命令，操作命令可能为以下几种：

H x，表示向链表头插入一个数 x。

D k，表示删除第 k个插入的数后面的数（当 k为 0 时，表示删除头结点）。

I k x，表示在第 k 个插入的数后面插入一个数 x（此操作中 k 均大于 0）。

输出格式

共一行，将整个链表从头到尾输出。

数据范围

1≤M≤100000

所有操作保证合法。

输入样例：

10

H 9

I 1 1

D 1

D 0

H 6

I 3 6

I 4 5

I 4 5

I 3 4

D 6

输出样例：

6 4 6 5

![](https://i-blog.csdnimg.cn/blog_migrate/629fe2b5558d362425ea4a6c9d30387d.png)

我们用-1表示空指针。

实现一些基本的操作：

(1)初始化

头节点指向-1表示空节点,idx\=0表示从0好节点进行编号。

```cpp
void init()//链表的初始化
{
    head=-1;//头节点指向空节点
    idx=0;
}
```

(2)向头节点后面插入一个新节点

![](https://i-blog.csdnimg.cn/blog_migrate/0487075fb3da0c6345ad8a12a751c5fd.png)

(3)向第k个插入的点后面添加一个点同(2)

```cpp
void add(int k,int x)//向第k个插入的数后面插入一个数
{
    e[idx]=x,ne[idx]=ne[k],ne[k]=idx++;
}
```

因为是从0号节点进行编号的，所以第k个插入的点其实是第k-1个点add(k-1,x);

(4)删除头节点

![](https://i-blog.csdnimg.cn/blog_migrate/5b0709f78562e68a8f9a91601bacd67c.png)

```cpp
void remove()//删除头节点
{
    head=ne[head];
}
```

(5)删除第k个插入的点

```cpp
void de(int k)//删除第k个插入的数
{
    ne[k]=ne[ne[k]];
}
```

remove(k-1);

AC代码

```cpp
#include<bits/stdc++.h>
#include<string>
using namespace std;
const int N=1e6+10;
int head,e[N],ne[N],idx;

void init()//链表的初始化
{
    head=-1;
    idx=0;
}

void add_head(int x)//向头节点之后插入一个数
{
    e[idx]=x,ne[idx]=head,head=idx++;
}

void add(int k,int x)//向第k个插入的数后面插入一个数
{
    e[idx]=x,ne[idx]=ne[k],ne[k]=idx++;
}

void de(int k)//删除第k个插入的数
{
    ne[k]=ne[ne[k]];
}

void remove()//删除头节点
{
    head=ne[head];
}

int main()
{
    int t;
    scanf("%d",&t);
    init();
    while(t--){
        string op;
        int k,x;
        cin>>op;
        if(op=="H"){
            scanf("%d",&x);
            add_head(x);
        }
        else if(op=="D"){
            scanf("%d",&k);
            if(k==0) remove();
            de(k-1);
        }
        else{
            scanf("%d%d",&k,&x);
            add(k-1,x);
        }
    }
    for(int i=head;i!=-1;i=ne[i])
        cout<<e[i]<<" ";
    return 0;
}
```

### 双链表

实现一个双链表，双链表初始为空，支持 55 种操作：

在最左侧插入一个数；

在最右侧插入一个数；

将第 k 个插入的数删除；

在第 k 个插入的数左侧插入一个数；

在第 k 个插入的数右侧插入一个数

现在要对该链表进行 M 次操作，进行完所有操作后，从左到右输出整个链表。

注意:题目中第 k 个插入的数并不是指当前链表的第 k 个数。例如操作过程中一共插入了 n 个数，则按照插入的时间顺序，这 n 个数依次为：第 1 个插入的数，第 2 个插入的数，…第 n 个插入的数。

输入格式

第一行包含整数 M，表示操作次数。

接下来 M 行，每行包含一个操作命令，操作命令可能为以下几种：

L x，表示在链表的最左端插入数 x。

R x，表示在链表的最右端插入数 x。

D k，表示将第 k 个插入的数删除。

IL k x，表示在第 k 个插入的数左侧插入一个数。

IR k x，表示在第 k 个插入的数右侧插入一个数。

输出格式

共一行，将整个链表从左到右输出。

数据范围

1≤M≤100000

所有操作保证合法。

输入样例：

10

R 7

D 1

L 3

IL 2 10

D 3

IL 2 7

L 8

R 9

IL 4 7

IR 2 2

输出样例：

8 7 7 3 2 9

双链表类似单链表的操作进行处理，只是每个节点都有两个指针l[],r[],分别指向前驱和后继。

模板：

```cpp
// e[]表示节点的值，l[]表示节点的左指针，r[]表示节点的右指针，idx表示当前用到了哪个节点
int e[N], l[N], r[N], idx;

// 初始化
void init()
{
    //0是左端点，1是右端点
    r[0] = 1, l[1] = 0;
    idx = 2;
}

// 在节点a的右边插入一个数x
void insert(int a, int x)
{
    e[idx] = x;
    l[idx] = a, r[idx] = r[a];
    l[r[a]] = idx, r[a] = idx ++ ;
}

// 删除节点a
void remove(int a)
{
    l[r[a]] = l[a];
    r[l[a]] = r[a];
}
```

```cpp
#include<bits/stdc++.h>
#include<string>
#include<algorithm>
using namespace std;
const int N=1e6+10;
int l[N],r[N],e[N],idx;
void init()
{
    r[0]=1;
    l[1]=0;
    idx=2;
}

void add(int k,int x)
{
    e[idx]=x;
    r[idx]=r[k];
    l[idx]=k;
    l[r[k]]=idx;
    r[k]=idx;
    idx++;
}

void remove(int k)
{
    r[l[k]]=r[k];
    l[r[k]]=l[k];
}
int main()
{
    init();
    int t;
    cin>>t;
    while(t--)
    {
        string op;
        cin>>op;
        int k,x;
        if(op=="R")
        {
            cin>>x;
            add(l[1],x);
        }
        else if(op=="L")
        {
            cin>>x;
            add(0,x);
        }
        else if(op=="D")
        {
            cin>>k;
            remove(k+1);
        }
        else if(op=="IL")
        {
            cin>>k>>x;
            add(l[k+1],x);
        }
        else
        {
            cin>>k>>x;
            add(k+1,x);
        }
    }
    for(int i=r[0];i!=1;i=r[i])
        cout<<e[i]<<" ";
    return 0;
}
```

### 栈

#### 模拟栈

实现一个栈，栈初始为空，支持四种操作：

push x – 向栈顶插入一个数 x；

pop – 从栈顶弹出一个数；

empty – 判断栈是否为空；

query – 查询栈顶元素。

现在要对栈进行 M 个操作，其中的每个操作 3 和操作 4 都要输出相应的结果。

输入格式

第一行包含整数 M，表示操作次数。

接下来 M 行，每行包含一个操作命令，操作命令为 push x，pop，empty，query 中的一种。

输出格式

对于每个 empty 和 query 操作都要输出一个查询结果，每个结果占一行。

其中，empty 操作的查询结果为 YES 或 NO，query 操作的查询结果为一个整数，表示栈顶元素的值。

数据范围

1≤M≤100000,

1≤x≤1e9

所有操作保证合法。

输入样例：

10

push 5

query

push 6

pop

query

pop

empty

push 4

query

empty

输出样例：

5

5

YES

4

NO

栈：后进先出的数据结构。

![](https://i-blog.csdnimg.cn/blog_migrate/0fd62bbd7db86b69886a6d42ea970af8.png)

```cpp
// tt表示栈顶
int stk[N], tt = 0;

// 向栈顶插入一个数
stk[ ++ tt] = x;

// 从栈顶弹出一个数
tt -- ;

// 栈顶的值
stk[tt];

// 判断栈是否为空
if (tt > 0)
{

}
```

AC代码

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e6+10;
int stk[N],tt=0;
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        string op;
        cin>>op;
        if(op=="push")
        {
            int x;
            cin>>x;
            stk[++tt]=x;
        }
        else if(op=="pop")
        {
            tt--;
        }
        else if(op=="empty")
        {
            if(tt>0)
            cout<<"NO"<<endl;
            else
            cout<<"YES"<<endl;
        }
        else if(op=="query")
        {
            cout<<stk[tt]<<endl;
        }
    }
    return 0;
}
```

### 队列

实现一个队列，队列初始为空，支持四种操作：

push x – 向队尾插入一个数 x；

pop – 从队头弹出一个数；

empty – 判断队列是否为空；

query – 查询队头元素。

现在要对队列进行 M个操作，其中的每个操作 3和操作 4 都要输出相应的结果。

输入格式

第一行包含整数 M，表示操作次数。

接下来 M行，每行包含一个操作命令，操作命令为 push x，pop，empty，query 中的一种。

输出格式

对于每个 empty 和 query 操作都要输出一个查询结果，每个结果占一行。

其中，empty 操作的查询结果为 YES 或 NO，query 操作的查询结果为一个整数，表示队头元素的值。

数据范围

1≤M≤100000,

1≤x≤1e9,

所有操作保证合法。

输入样例：

10

push 6

empty

query

pop

empty

push 3

push 4

pop

query

push 6

输出样例：

NO

6

YES

4

队列:先进先出。

普通队列

```cpp
// hh 表示队头，tt表示队尾
int q[N], hh = 0, tt = -1;

// 向队尾插入一个数
q[ ++ tt] = x;

// 从队头弹出一个数
hh ++ ;

// 队头的值
q[hh];

// 判断队列是否为空
if (hh <= tt)
{

}
```

循环队列

```cpp
// hh 表示队头，tt表示队尾的后一个位置
int q[N], hh = 0, tt = 0;

// 向队尾插入一个数
q[tt ++ ] = x;
if (tt == N) tt = 0;

// 从队头弹出一个数
hh ++ ;
if (hh == N) hh = 0;

// 队头的值
q[hh];

// 判断队列是否为空
if (hh != tt)
{

}
```

AC代码

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e6+10;
int q[N],hh=0,tt=-1;
int main()
{
    ios::sync_with_stdio(false);
    int T;
    cin>>T;
    while(T--){
        string op;
        cin>>op;
        if(op=="push"){
            int x;
            cin>>x;
            q[++tt]=x;
        }
        else if(op=="pop"){
            hh++;
        }
        else if(op=="empty"){
            if(hh<=tt) cout<<"NO"<<endl;
            else cout<<"YES"<<endl;
        }
        else cout<<q[hh]<<endl;
    }
    return 0;
}
```

### 单调队列

#### 滑动窗口

给定一个大小为 n≤1e6的数组。

有一个大小为 k的滑动窗口，它从数组的最左边移动到最右边。

你只能在窗口中看到 kk 个数字。

每次滑动窗口向右移动一个位置。

以下是一个例子：

该数组为 [1 3 -1 -3 5 3 6 7]，k 为 3。

![](https://i-blog.csdnimg.cn/blog_migrate/93bd904a2cce9648d7f1be09d215df1d.png)

你的任务是确定滑动窗口位于每个位置时，窗口中的最大值和最小值。

输入格式

输入包含两行。

第一行包含两个整数 n 和 k，分别代表数组长度和滑动窗口的长度。

第二行有 n个整数，代表数组的具体数值。

同行数据之间用空格隔开。

输出格式

输出包含两个。

第一行输出，从左至右，每个位置滑动窗口中的最小值。

第二行输出，从左至右，每个位置滑动窗口中的最大值。

输入样例：

8 3

1 3 -1 -3 5 3 6 7

输出样例：

-1 -3 -3 -3 3 3

3 3 5 5 6 7

性质：队列里面的元素值是单调的，递增或者递减。

思想：

例如：求滑动窗口的最大值。

用单调队列储存当前窗口内单调递减的元素的下标，并且队头是窗口内的最大值，队尾是窗口内的尾元素。也就是说，队列从队头到队尾对应窗口内从最大值到窗口的尾元素的子序列下标。

1.队头出队：当队头元素从滑动窗口划出时，队头元素出队，hh++。

2.队尾出队：当新的元素进入滑动窗口时，要把新元素从队尾插入，分两种情况：

(1).直接插入：如果新元素小于队尾元素，那么直接从队尾插入(q[++tt]\=i)，因为他可能在前面的最大值滑出窗口后成为最大值。

(2).先删后插:如果新元素大于等于队尾元素，那就先删除队尾元素(因为队尾不可能成为滑动窗口的最大值），删除队尾tt--,循环删除，直到队列为空或遇到一个大于新元素的值，再插入。

![](https://i-blog.csdnimg.cn/blog_migrate/cfa71fa26d17e94f07ccf89e2a394efd.png)

求最小值的思路相同。

AC代码

```cpp
#include<iostream>
using namespace std;
const int N = 1e6+10;
int a[N],q[N];
int n,k;
int main()
{
    int n,k;
    cin>>n>>k;
    for(int i=1;i<=n;i++) cin>>a[i];

    //求滑动窗口里面的最小值。
    int hh=0,tt=-1;
    for(int i=1;i<=n;i++)
    {
        if(hh<=tt&&q[hh]<i-k+1) hh++; //如果队头元素值表示序列的下表不在滑动窗口的范围内，队头出队。
        while(hh<=tt&&a[i]<=a[q[tt]]) tt--; //如果插入的元素小于队尾元素，队尾出队，直到不小于为止。
        q[++tt]=i; //下表入队
        if(i>k-1) cout<<a[q[hh]]<<" "; //如果在滑动窗口的范围，输出最小值即可。
    }
    puts("");

    //求滑动窗口里面的最大值
    hh=0,tt=-1;
    for(int i=1;i<=n;i++)
    {
        if(hh<=tt&&q[hh]<i-k+1) hh++;
        while(hh<=tt&&a[i]>=a[q[tt]]) tt--;
        q[++tt]=i;
        if(i>k-1) cout<<a[q[hh]]<<" ";
    }
    return 0;
}
```

#### 单调队列stl实现

```cpp
#include <iostream>
#include <deque>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // 求滑动窗口最小值
    deque<int> dqMin; // 存放下标，保证对应的 a 值单调递增
    for (int i = 0; i < n; i++) {
        // 移除不在窗口中的下标
        if (!dqMin.empty() && dqMin.front() <= i - k)
            dqMin.pop_front();
        // 移除所有比当前数 a[i] 大的下标
        while (!dqMin.empty() && a[i] <= a[dqMin.back()])
            dqMin.pop_back();
        dqMin.push_back(i);
        if (i >= k - 1)
            cout << a[dqMin.front()] << " ";
    }
    cout << "\n";

    // 求滑动窗口最大值
    deque<int> dqMax; // 存放下标，保证对应的 a 值单调递减
    for (int i = 0; i < n; i++) {
        // 移除不在窗口中的下标
        if (!dqMax.empty() && dqMax.front() <= i - k)
            dqMax.pop_front();
        // 移除所有比当前数 a[i] 小的下标
        while (!dqMax.empty() && a[i] >= a[dqMax.back()])
            dqMax.pop_back();
        dqMax.push_back(i);
        if (i >= k - 1)
            cout << a[dqMax.front()] << " ";
    }
    cout << "\n";

    return 0;
}

```

### KMP

给定一个字符串 S，以及一个模式串 P，所有字符串中只包含大小写英文字母以及阿拉伯数字。

模式串 P在字符串 S中多次作为子串出现。

求出模式串 P在字符串 S中所有出现的位置的起始下标。

输入格式

第一行输入整数 N，表示字符串 P 的长度。

第二行输入字符串 P。

第三行输入整数 M，表示字符串 S的长度。

第四行输入字符串 S。

输出格式

共一行，输出所有出现位置的起始下标（下标从 0开始计数），整数之间用空格隔开。

数据范围

1≤N≤1e5

1≤M≤1e6

输入样例：

3

aba

5

ababa

输出样例：

0 2

1.串的普通算法BF

BF算法图示过程(返回匹配成功的位置)

![](https://i-blog.csdnimg.cn/blog_migrate/4cf810983a46bfd36e749ac3c58b7e30.png)

思想:

从主串的第pos个字符开始匹配和模式串中第一个字符串开始比较。

(1)如果相等：继续比后续字符,i++,j++;

(2)如果不相等，从主串的下一个字符和模式串 的第一个字符相比较。

任何求主串的下一个字符的位置？

方法一：设置一个变量k，在主串未开始时，领k\=i+1(主串的下一个位置),每当匹配失败，另i\=j，即可。

```cpp
int bf(char s[],char t[],int pos)
{
    int i=pos,j=1;//从主串的第pos个字符，和模式串第一个字符比较
    while(i<=s.length&&j<=t.length)
    {
        int k=i+1; //让k等于i的下一个位置
        if(s[i]==t[j]) //匹配成功，继续比较下一个位置
        {
            ++i;
            ++j;
        }
        else //匹配失败
        {
            i=k;
            j=1;
        }
    }
    if(j>T.length) return i-T.length;//如果j大于模式串的长度，说明匹配成功
    else return 0; //匹配失败
}
```

方法二：找出每次失败i和j的关系。

![](https://i-blog.csdnimg.cn/blog_migrate/895aeec07513453916944506104dca5a.png)

则下一个位置是i-j+2.

```cpp
int BF(char s[],char t[],int pos)
{
    int i=pos,j=1;
    while(i<=s.length&&j<t.length)
    {
        if(s[i]==s[j]) 
        {
            ++i;
            ++j;
        }
        else
        {
            i=i-j+2;
            j=1;
        }
    }
    if(j>t.length) return i-t.length;
    else return 0;
}
```

2.KMP算法

特点：在匹配过程中，不需要回溯主串的指针i，时间复杂度为O(m+n)

思路：

![](https://i-blog.csdnimg.cn/blog_migrate/42771039e1b4490c3fb5901ef9929b95.png)

则我们可知next数组的含义，next[i]表示：以i结尾的后缀和从1开始模式串的前缀相等，且相等最大 。

假设我们已知next数组，则模式匹配如下：

![](https://i-blog.csdnimg.cn/blog_migrate/38273daedadafc0dd49549c065d3a423.png)

思想

主串的第pos个字符和模式串的第一个字符串进行比较

(1).相等：继续比较后继字符 i++，j++。

(2).不相等：主串的位置不变和模式串的第next[j]字符比较，j\=next[j]。

下面展示一个代码：

```cpp
int KMP(char s[],char t[],int pos)
{
    int i=pos,j=1;
    while(i<=s.length&&j<=t.length)
    {
        if(j==0||s[i]==t[j]) //j==0表示当前比较的是模式串的首字符且不匹配，应从主串的后一个位置继续匹配；s[i]==t[j]表示匹配成功，继续匹配。
        {
            ++i;
            ++j;
        }
        else j=next[j];
    }
    if(j>t.length) return i-t.length;
    else return 0;
}
```

求KMP的next指针的值

(1)如果t[j]\=\=t[next[j]]，则next[j+1]\=next[j]+1.

(2)如果t[j]!\=t[next[j]],判断t[j]和t[next[...next[j]...]]，重复 过程（1），直到相等，退到0时，表示不存在，next[j+1]\=1.

换句话说，要求next[j]，需要判断t[j-1]和t[next[j-1]].

```cpp
void get_next(char t[],int next[])
{
    int j=1,k=0;
    next[1]=0;
    while(j<t.length)
    {
        if(k==0||t[j]==t[k])//k为0，或者找到时,next[j+1]=k。
        {
            ++j;
            ++k;
            next[j]=k;
        }
        else k=next[k];
    }
}
```

KMP的nextval值

思想：

当s[i]和t[j]比较后，发现两者不相等时，但t[j]和t[k]相等，那就意味着s[i]和t[k]不需要进行额外的比较，因此j的位置的nextval值修改为k位置的nextval值，当s[i]和t[j]比较后，发现两者不相等，发现t[j]和t[k]也不相等，因此j位置的nextval值仍是k，即nextval[j]\=next[j].

已知next[j]，应如下修改nextval值

k\=next[j];

if(t[j]\=\=t[k]) nextval[j]\=next[k];

else nextval[j]\=next[j];

例如：求aaaab的nextval值。

如果t[j]\=\=t[next[j]],nextval[j]\=nextval[next[j]]

否则nextval[j]\=next[j].

![](https://i-blog.csdnimg.cn/blog_migrate/33c7b0b5ac5a2c3505ba276bd51844f3.png)

```cpp
void get_nextval(chat t[],int next[],int nextval[])
{
    int j=2,k=0;
    get_next(t,next);
    nextval[1]=0;
    while(j<=t.length())
    {
        k=next[j];
        if(t[j]==t[k]) nextval[j]=nextval[j];
        else nextval[j]=next[j];
    }
}
```

匹配过程和next的匹配过程类似。

AC代码

```cpp
#include <iostream>
using namespace std;

const int N = 100100, M = 1000010;

int n, m;       // n：模式串 p 的长度，m：主串 s 的长度
int ne[N];      // next 数组（又称为部分匹配表），用于记录模式串 p 中每个位置的最长相等前后缀长度
char s[M], p[N]; // s：主串，p：模式串
                  // 注意：这里均采用 1-indexing，即字符串从下标 1 开始存储

// 求模式串 p 的 next 数组，也就是部分匹配表
void get_next() {
    // i 从 2 开始，因为位置 1 的 next 值通常为 0（空串没有前后缀匹配）
    // j 表示当前匹配到的位置（即 p[1...j] 是 p[1...i-1] 的后缀，同时也是前缀）
    for (int i = 2, j = 0; i <= n; i++) {
        // 如果 p[i]与 p[j+1]不匹配，就回退 j 到 ne[j]，直到找到合适的 j 或者 j 回退到 0
        while (j && p[i] != p[j + 1])
            j = ne[j];  // 这里利用已经计算好的部分匹配信息，将 j 回退到较小的匹配值
      
        // 如果 p[i]与 p[j+1]匹配，则 j 向前扩展一位
        if (p[i] == p[j + 1])
            j++;
      
        // 将当前位置 i 的 next 值设为 j，即 p[1...j]为 p[1...i] 的最长相等前后缀
        ne[i] = j;
    }
}

// 利用 KMP 算法在主串 s 中查找模式串 p 出现的位置
void kmp() {
    // i：遍历主串 s，j：当前匹配模式串 p 的位置
    for (int i = 1, j = 0; i <= m; i++) {
        // 当 j > 0 且当前字符 s[i] 与 p[j+1]不匹配时，
        // 通过 next 数组将 j 回退到较小的匹配状态（即继续尝试匹配）
        while (j && s[i] != p[j + 1])
            j = ne[j];  // 回退至上一个可能的匹配位置
      
        // 如果 s[i] 与 p[j+1]匹配，则 j 向前扩展一位
        if (s[i] == p[j + 1])
            j++;
      
        // 当 j 达到模式串长度 n 时，说明找到了一个完整匹配
        if (j == n) {
            // 输出匹配位置，注意这里输出的是 i - n，
            // 因为 i 表示匹配结束的位置，i - n 即为匹配起始位置（以 1 为下标时）
            printf("%d ", i - n);
          
            // 继续查找下一个匹配，将 j 回退到上一个可能继续匹配的位置
            j = ne[j];
        }
    }
}

int main() {
    // 输入格式：首先输入模式串长度 n，
    // 接着输入模式串 p（从 p+1 开始存储，即 p[1] 为模式串的第一个字符），
    // 然后输入主串长度 m，接着输入主串 s（同样从 s+1 开始存储）。
    cin >> n >> (p + 1) >> m >> (s + 1);
  
    // 预处理模式串，求出部分匹配表
    get_next();
  
    // 执行 KMP 算法，查找模式串在主串中所有的出现位置
    kmp();
  
    return 0;
}

```

---

‍

### 并查集

```cpp
(1)朴素并查集：

    int p[N]; //存储每个点的祖宗节点

    // 返回x的祖宗节点
    int find(int x)
    {
        if (p[x] != x) p[x] = find(p[x]);
        return p[x];
    }

    // 初始化，假定节点编号是1~n
    for (int i = 1; i <= n; i ++ ) p[i] = i;

    // 合并a和b所在的两个集合：
    p[find(a)] = find(b);


(2)维护size的并查集：

    int p[N], size[N];
    //p[]存储每个点的祖宗节点, size[]只有祖宗节点的有意义，表示祖宗节点所在集合中的点的数量

    // 返回x的祖宗节点
    int find(int x)
    {
        if (p[x] != x) p[x] = find(p[x]);
        return p[x];
    }

    // 初始化，假定节点编号是1~n
    for (int i = 1; i <= n; i ++ )
    {
        p[i] = i;
        size[i] = 1;
    }

    // 合并a和b所在的两个集合：
    size[find(b)] += size[find(a)];
    p[find(a)] = find(b);


(3)维护到祖宗节点距离的并查集：

    int p[N], d[N];
    //p[]存储每个点的祖宗节点, d[x]存储x到p[x]的距离

    // 返回x的祖宗节点
    int find(int x)
    {
        if (p[x] != x)
        {
            int u = find(p[x]);
            d[x] += d[p[x]];
            p[x] = u;
        }
        return p[x];
    }

    // 初始化，假定节点编号是1~n
    for (int i = 1; i <= n; i ++ )
    {
        p[i] = i;
        d[i] = 0;
    }

    // 合并a和b所在的两个集合：
    p[find(a)] = find(b);
    d[find(a)] = distance; // 根据具体问题，初始化find(a)的偏移量
```

---

### 4.1质数

#### 4.1.1试除法判定质数

给定 n个正整数 ai，判定每个数是否是质数。

输入格式

第一行包含整数 n。

接下来 n行，每行包含一个正整数 ai。

输出格式

共 n行，其中第 i行输出第 i个正整数 ai是否为质数，是则输出 Yes，否则输出 No。

数据范围

1≤n≤100,

1≤ai≤2\^31−1

输入样例：

2

2

6

输出样例：

Yes

No

用试除法判断一个数n是不是质数的时间复杂度为O(sqrt(n)).

```cpp
#include<bits/stdc++.h>
#include<algorithm>
using namespace std;
bool isprime(int n)
{
    if(n<2) return false;
    for(int i=2;i<=n/i;i++)
    {
        if(n%i==0) return false;
    }
    return true;
}
int main()
{
    int t;
    scanf("%d",&t);
    while(t--)
    {
        int n;
        scanf("%d",&n);
        if(isprime(n)) printf("Yes\n");
        else printf("No\n");
    }
    return 0;
}
```

#### 4.1.2分解质因数

给定 n个正整数 ai，将每个数分解质因数，并按照质因数从小到大的顺序输出每个质因数的底数和指数。

输入格式

第一行包含整数 n。

接下来 n行，每行包含一个正整数 ai。

输出格式

对于每个正整数 ai，按照从小到大的顺序输出其分解质因数后，每个质因数的底数和指数，每个底数和指数占一行。

每个正整数的质因数全部输出完毕后，输出一个空行。

数据范围

1≤n≤100,

2≤ai≤2×1e9

输入样例：

2

6

8

输出样例：

2 1

3 1

2 3

```cpp
#include<bits/stdc++.h>
#include<algorithm>
using namespace std;
int main()
{
    int n;
    cin>>n;
    while(n--)
    {
        int a;
        cin>>a;
        for(int i=2;i<=a/i;i++)
        {
            if(a%i==0)
            {
                int s=0;
                while(a%i==0)
                {
                    a/=i;
                    s++;
                }
                cout<<i<<" "<<s<<endl;
            }
        }
        if(a>1) cout<<a<<" "<<1<<endl;
        cout<<endl;
    }
}
```

#### 4.1.3筛质数

给定一个正整数 n，请你求出 1∼n 中质数的个数。

输入格式

共一行，包含整数 n。

输出格式

共一行，包含一个整数，表示1∼n 中质数的个数。

数据范围

1≤n≤1e6

输入样例：

8

输出样例：

4

质数定理：1\~n中有近似n/lnn个质数(粗略计算)

当n\=1e6,线性筛法和埃氏筛法时间近乎一样

当n\=1e7,线性筛法比埃氏筛法快一倍

st[]数组标记合数

(1)朴素筛法O(nlogn)

![](https://i-blog.csdnimg.cn/blog_migrate/a45045472bf705d2b7cc497a97a09f28.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1e6+10;

int primes[N],cnt;
bool st[N];//标记是否被筛过

void get_primes(int n)
{
    for(int i=2;i<=n;i++)
    {
        if(!st[i])
        {
            primes[cnt++]=i;
        }
        for(int j=i+i;j<=n;j+=i) st[j]=true;//把质数的倍数筛掉，质数的倍数一定是合数
    }
}

int main()
{
    int n;
    cin>>n;

    get_primes(n);

    cout<<cnt<<endl;

    return 0;
}
```

(2)埃氏筛法O(nloglogn)近乎O(n)

![](https://i-blog.csdnimg.cn/blog_migrate/3d52228ce0fc018d250a996d5313550f.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1e6+10;

int primes[N],cnt;
bool st[N];//标记是否被筛过

void get_primes(int n)
{
    for(int i=2;i<=n;i++)
    {
        if(!st[i])
        {
            primes[cnt++]=i;
            for(int j=i+i;j<=n;j+=i) st[j]=true;
        }
    }
}

int main()
{
    int n;
    cin>>n;

    get_primes(n);

    cout<<cnt<<endl;

    return 0;
}
```

(3)线性筛法

线性筛法

思路：每个合数，只会被它的最小质因子筛掉.

![](https://i-blog.csdnimg.cn/blog_migrate/25b34be17b4ecdd257acd16cbbd53cf5.png)

```cpp
void get_primes(){
    //外层从2~n迭代，因为这毕竟算的是1~n中质数的个数，而不是某个数是不是质数的判定
    for(int i=2;i<=n;i++){
        if(!st[i]) primes[cnt++]=i;
        for(int j=0;primes[j]<=n/i;j++){//primes[j]<=n/i:变形一下得到——primes[j]*i<=n,把大于n的合数都筛了就
        //没啥意义了
            st[primes[j]*i]=true;//用最小质因子去筛合数

      /*(1)当i%primes[j]!=0时,说明此时遍历到的primes[j]不是i的质因子，那么只可能是此时的primes[j]<i的          最小质因子,所以primes[j]*i的最小质因子就是primes[j];
        (2)当有i%primes[j]==0时,说明i的最小质因子是primes[j],因此primes[j]*i的最小质因子也就应该是
            prime[j]，之后接着用st[primes[j+1]*i]=true去筛合数时，就不是用最小质因子去更新了,因为i有
            最小质因子primes[j]<primes[j+1],此时的primes[j+1]不是primes[j+1]*i的最小质因子，此就              应该退出循环，避免之后重复进行筛选。*/
            if(i%primes[j]==0) break;
        }
    }

}
```

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1e6+10;

int primes[N],cnt;
bool st[N];//标记是否被筛过

void get_primes(int n)
{
    for(int i=2;i<=n;i++)
    {
        if(!st[i]) primes[cnt++]=i;
        for(int j=0;primes[j]<=n/i;j++)/*从小到大枚举所有的质数，primes[j]*i<=n保证了要筛的合数
在n的范围内*/
        {
            st[primes[j]*i]=true;//每次把当前质数和i的乘积筛掉，也就是筛掉一个合数
            if(i%primes[j]==0) break;//当这一语句执行，primes[j]一定是i的最小质因子
        }
    }
}

int main()
{
    int n;
    cin>>n;

    get_primes(n);

    cout<<cnt<<endl;

    return 0;
}
```

### 4.2约数

![](https://i-blog.csdnimg.cn/blog_migrate/ffd1753b02172e4d92721ed02cf07771.png)

#### 4.2.1 试除法求约数

给定 n个正整数 ai，对于每个整数 ai，请你按照从小到大的顺序输出它的所有约数。

输入格式

第一行包含整数 n。

接下来 n 行，每行包含一个整数 ai。

输出格式

输出共 n 行，其中第 i 行输出第 i 个整数 ai 的所有约数。

数据范围

1≤n≤100,

2≤ai≤2×1e9

输入样例：

2

6

8

输出样例：

1 2 3 6

1 2 4 8

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int n;

void get_divisors(int n)
{
    vector<int> res;

    for (int i = 1; i <= n / i; i++) {
        if (n % i == 0) {
            res.push_back(i);

            if (i != n / i) {  // 避免 i==n/i, 重复放入 （n是完全平方数
                res.push_back(n / i);
            }
        }
    }

    sort(res.begin(), res.end());
    for (auto item : res) {
        cout << item << " ";
    }
    puts("");
}

int main()
{
    cin >> n;
    while (n--) {
        int x;
        cin >> x;
        get_divisors(x);
    }
    return 0;
}
```

#### 4.2.2约数个数

给定 n 个正整数 ai，请你输出这些数的乘积的约数个数，答案对 1e9+7 取模。

输入格式

第一行包含整数n。

接下来 n 行，每行包含一个整数 ai。

输出格式

输出一个整数，表示所给正整数的乘积的约数个数，答案需对1e9+7 取模。

数据范围

1≤n≤100,

1≤ai≤2×1e9

输入样例：

3

2

6

8

输出样例：

12

![](https://i-blog.csdnimg.cn/blog_migrate/6d0c4dc2f9ca0f319d0c0359cf4c4a95.png)

![](https://i-blog.csdnimg.cn/blog_migrate/bf2d9eb56fcefcfcfae1eeda8f257097.png)

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long LL;
const int mod=1e9+7;
int main()
{
    int n,x;
    LL ans=1;
    unordered_map<int,int> hash;
    cin>>n;
    while(n--)
    {
        cin>>x;
        for(int i=2;i<=x/i;i++)
        {
            while(x%i==0)
            {
                x/=i;
                hash[i]++;
            }
        }
        if(x>1) hash[x]++;
    }
    for(auto i:hash) ans=ans*(i.second+1)%mod;
    cout<<ans;
    return 0;
}
```

#### 4.2.3约数之和

给定 n 个正整数 ai，请你输出这些数的乘积的约数之和，答案对 1e9+7 取模。

输入格式

第一行包含整数 n。

接下来 n 行，每行包含一个整数 ai。

输出格式

输出一个整数，表示所给正整数的乘积的约数之和，答案需对 1e9+7 取模。

数据范围

1≤n≤100,

1≤ai≤2×1e9

输入样例：

3

2

6

8

输出样例：

252

![](https://i-blog.csdnimg.cn/blog_migrate/8820126454e9090587d6c1fea281c9a1.png)

```cpp
#include <iostream>
#include <algorithm>
#include <unordered_map>
#include <vector>

using namespace std;

typedef long long LL;

const int N = 110, mod = 1e9 + 7;

int main()
{
    int n;
    cin >> n;

    unordered_map<int, int> primes;

    while (n -- )
    {
        int x;
        cin >> x;

        for (int i = 2; i <= x / i; i ++ )
            while (x % i == 0)
            {
                x /= i;
                primes[i] ++ ;
            }

        if (x > 1) primes[x] ++ ;
    }

    LL res = 1;
    for (auto p : primes)
    {
        LL a = p.first, b = p.second;
        LL t = 1;
        while (b -- ) t = (t * a + 1) % mod;
        res = res * t % mod;
    }

    cout << res << endl;

    return 0;
}
```

#### 4.2.4最大公约数

给定 n 对正整数ai,bi，请你求出每对数的最大公约数。

输入格式

第一行包含整数 n。

接下来 n 行，每行包含一个整数对 ai,bi。

输出格式

输出共 n 行，每行输出一个整数对的最大公约数。

数据范围

1≤n≤1e5,

1≤ai,bi≤2×1e9

输入样例：

2

3 6

4 6

输出样例：

3

2

![](https://i-blog.csdnimg.cn/blog_migrate/a7b59c7101b98feb199d1bbb29d7f1a9.png)

![](https://i-blog.csdnimg.cn/blog_migrate/3680976b9de16cb3b0bd9b2e83a42217.png)

```cpp
#include<bits/stdc++.h>
using namespace std;
int gcd(int a,int b)
{
    return b ? gcd(b,a%b) : a;
}
int main()
{
    int n;
    scanf("%d",&n);
    while(n--)
    {
        int a,b;
        scanf("%d%d",&a,&b);
        printf("%d\n",gcd(a,b));
    }
    return 0;
}
```

```cpp
int gcd(int a,int b){
    if(b > 0) return gcd(b,a % b); //如果b大于0，那么继续除
    else return a; //否则直接返回a
}
```

### 进制转换模板

```cpp

#include <iostream>
using namespace std;

void toTridecimal(int a) {
    if (a >= 13) toTridecimal(a / 13);
    int remainder = a % 13;
    if (remainder < 10) cout << remainder;
    else cout << char('a' + remainder - 10);
}

int main() {
    int a;
    cin >> a;
    if (a == 0) cout << 0; // 特殊情况处理，当输入为0时直接输出0
    else toTridecimal(a);
    return 0;
}
```

### 堆

```cpp
// h[N]存储堆中的值, h[1]是堆顶，x的左儿子是2x, 右儿子是2x + 1
// ph[k]存储第k个插入的点在堆中的位置
// hp[k]存储堆中下标是k的点是第几个插入的
int h[N], ph[N], hp[N], size;

// 交换两个点，及其映射关系
void heap_swap(int a, int b)
{
    swap(ph[hp[a]],ph[hp[b]]);
    swap(hp[a], hp[b]);
    swap(h[a], h[b]);
}

void down(int u)
{
    int t = u;
    if (u * 2 <= size && h[u * 2] < h[t]) t = u * 2;
    if (u * 2 + 1 <= size && h[u * 2 + 1] < h[t]) t = u * 2 + 1;
    if (u != t)
    {
        heap_swap(u, t);
        down(t);
    }
}

void up(int u)
{
    while (u / 2 && h[u] < h[u / 2])
    {
        heap_swap(u, u / 2);
        u >>= 1;
    }
}

// O(n)建堆
for (int i = n / 2; i; i -- ) down(i);
```

#### 堆排序

输入一个长度为 n的整数数列，从小到大输出前 m小的数。

输入格式

第一行包含整数 n和 m。

第二行包含 n个整数，表示整数数列。

输出格式

共一行，包含 m个整数，表示整数数列中前 m小的数。

数据范围

1≤m≤n≤1e5，

1≤数列中元素≤1e9

输入样例：

5 3

4 5 1 3 2

输出样例：

1 2 3

一、堆的基本概念

堆：是一个完全二叉树。

堆分成两类，小根堆和大根堆。

小根堆：父节点小于等于左右孩子节点；

大根堆：父节点大于等于左右孩子节点。

STL里面的堆又称为优先队列；

如何手写一个堆？

本篇文章以小根堆为例，实现堆的一些基本的操作。

我们用一维数组来维护一个堆，规定数组的下标从1开始，每个下标的左右儿子分别为2\*x，2\*x+1；

![](https://i-blog.csdnimg.cn/blog_migrate/c03be99dee2ca2b0b3bdd2a354d6f14a.png)

我们先讲述堆中两个最基本的操作down(x),up(x)两个操作。

down(x),如果我们修改堆某个节点或者删除某个节点 ，我们就需要用down和up来维护我们堆中的关系，我们以小根堆为例，如果父节点变大，那么他就要往下沉，因为我们小根堆满足父节点小于等于左右儿子，同理，up恰好相反，如果父节点变小，它就要和自己的父节点比较，直到满足小根堆的定义为止。

二、堆的基本操作

那么我们就可以用down和up操作完成堆中最基本的操作：

1.插入一个数

我们插入一个数一般是插入到堆中最后一个数的后面再进行up操作。

**heap[++size]=x,up(size);**

2.求集合当中的最小值

因为是小根堆，我们堆顶元素是最小值。

**heap[1];**

3.删除最小值

我们需要删除堆顶元素，都是如果直接删除堆顶元素的话，会很麻烦，我们可以用最后一个元素来覆盖堆顶元素，如何进行down(1)操作。

**heap[1]=heap[size];size--;down(1);**

4.删除任意一个值

我们类似于删除堆顶元素的操作，我们先用最后一个元素的值覆盖删除元素的值，因为我们不知道覆盖后的元素是变大还是变小了，所有我们需要判断是执行up还是down。

```cpp
int t\=heap[k];

heap[k]\=heap[size];

size--;

if(heap[k]\>t) down(k);

else up(k);
```

当然我们可以简化：

```cpp
heap[k]\=heap[size];

size--;

down(k);

up(k);
```

5.修改任意一个元素

```cpp
heap[k]\=x;

down(k);

up(k);
```

![屏幕截图 2025-02-05 180008](assets/屏幕截图%202025-02-05%20180008-20250205180100-bznqdk2.png)AC代码

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;
const int N=1e5+10;
int h[N],siz;
int n,m;

void down(int u)
{
    int t=u;//t存储3个节点中的最小值，开始时假设最小值为父节点
    if(2*u<=siz&&h[2*u]<h[t]) t=2*u;//和左儿子比较
    if(2*u+1<=siz&&h[2*u+1]<h[t]) t=2*u+1;//和右儿子比较
    if(t!=u)
    {
        swap(h[t],h[u]);
        down(t);
    }
}

int main()
{
    cin>>n>>m;
    for(int i=1;i<=n;i++) cin>>h[i];
    siz=n;
    for(int i=n/2;i;i--) down(i);
    while(m--)
    {
        cout<<h[1]<<" ";
        h[1]=h[siz];
        siz--;
        down(1);
    }
    return 0;
}
```

#### 模拟堆

维护一个集合，初始时集合为空，支持如下几种操作：

I x，插入一个数 x；

PM，输出当前集合中的最小值；

DM，删除当前集合中的最小值（数据保证此时的最小值唯一）；

D k，删除第 k个插入的数；

C k x，修改第 k个插入的数，将其变为 x；

现在要进行 N次操作，对于所有第 2个操作，输出当前集合的最小值。

输入格式

第一行包含整数 N。

接下来 N行，每行包含一个操作指令，操作指令为 I x，PM，DM，D k 或 C k x 中的一种。

输出格式

对于每个输出指令 PM，输出一个结果，表示当前集合中的最小值。

每个结果占一行。

数据范围

1≤N≤1e5

−1e9≤x≤1e9

数据保证合法。

输入样例：

8

I -10

PM

I -10

D 1

C 2 8

I 6

PM

DM

输出样例：

-10

6

思路：

我们需要维护第i个插入的数，则需要再开两个数组维护信息；

![](https://i-blog.csdnimg.cn/blog_migrate/cb2d0b08eccb7b0d9c2b8bb434d81a66.png)

AC代码

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;
const int N=1e6+10;
int n,h[N],ph[N],hp[N],siz;

void heap_swap(int a,int b)
{
    swap(ph[hp[a]],ph[hp[b]]);//在堆中对应的下标互换
    swap(hp[a],hp[b]);//插入的顺序互换
    swap(h[a],h[b]);//对应的值互换
}

void down(int u)
{
    int t=u;
    if(2*u<=siz&&h[2*u]<h[t]) t=2*u;
    if(2*u+1<=siz&&h[2*u+1]<h[t]) t=2*u+1;
    if(u!=t)
    {
        heap_swap(t,u);
        down(t);
    }
}

void up(int u)
{
    if(u/2&&h[u/2]>h[u])
    {
        heap_swap(u/2,u);
        up(u/2);
    }
}

int main()
{
    scanf("%d",&n);
    int m=0;
    while(n--)
    {
        string op;
        cin>>op;
        if(op=="I")
        {
            int x;
            scanf("%d",&x);
            m++;
            h[++siz]=x;
            ph[m]=siz;
            hp[siz]=m;
            up(siz);
        }
        else if(op=="PM") printf("%d\n",h[1]);
        else if(op=="DM")
        {
            heap_swap(1,siz);
            siz--;
            down(1);
        }
        else if(op=="D")
        {
            int k;
            scanf("%d",&k);
            k=ph[k];
            heap_swap(k,siz);
            siz--;
            down(k);
            up(k);
        }
        else
        {
            int k,x;
            scanf("%d%d",&k,&x);
            k=ph[k];
            h[k]=x;
            down(k);
            up(k);
        }
    }

    return 0;
}
```

### 哈希表

```cpp
(1) 拉链法
    int h[N], e[N], ne[N], idx;

    // 向哈希表中插入一个数
    void insert(int x)
    {
        int k = (x % N + N) % N;
        e[idx] = x;
        ne[idx] = h[k];
        h[k] = idx ++ ;
    }

    // 在哈希表中查询某个数是否存在
    bool find(int x)
    {
        int k = (x % N + N) % N;
        for (int i = h[k]; i != -1; i = ne[i])
            if (e[i] == x)
                return true;

        return false;
    }

(2) 开放寻址法
    int h[N];

    // 如果x在哈希表中，返回x的下标；如果x不在哈希表中，返回x应该插入的位置
    int find(int x)
    {
        int t = (x % N + N) % N;
        while (h[t] != null && h[t] != x)
        {
            t ++ ;
            if (t == N) t = 0;
        }
        return t;
    }
```

1.什么是哈希表？

哈希表就是当范围很大时，我们可以通过哈希表将范围缩小，并快速找出一些数，如数组的下标范围是1\~1000000000，但是其中的数很少，我们可以将其映射为1\~100000，并快速找出，如原本数组下标是500000，我们可以映射成50，40....

2.哈希表产生的冲突

我们可以在映射的过程中，把两个数映射成为一个数，这个就是哈希表的冲突。

如何解决冲突？

有两种办法：开放寻址法和链地址法

(1)开放寻址法

我们可以先将h[]中每个位置上的值初始化成一个很大的数，如何通过除留余数法来找到每个数映射后的地址，如果该位置上有数，那么就继续向下一个位置探测，如果探测到最后一个位置，从第0个位置再进行探测。

![](https://i-blog.csdnimg.cn/blog_migrate/72e907f29105f73ab1b52b77fd3e36fe.png)

查找一个数也是类似的，如果这个数待探测的位置上有数，那么就向下一个位置探测，如果最终探测的位置上面的数为很大的数，那么查找失败，哈希表中没有该数。

(2)拉链法

拉链法不同于开放地址法的是，把每个位置看成一个单链表，如果要某个数通过除留余数法算出来的数位置上有数，不用向后探测，只需要用头插法插入到该位置上的单链表上，查找也是如此。

![](https://i-blog.csdnimg.cn/blog_migrate/cfef09caa8bd9419cc2a5ddf6857dff3.png)

#### 2.11.1模拟散列表

维护一个集合，支持如下几种操作：

I x，插入一个数 x；

Q x，询问数 x是否在集合中出现过；

现在要进行 N次操作，对于每个询问操作输出对应的结果。

输入格式

第一行包含整数 N，表示操作数量。

接下来 N行，每行包含一个操作指令，操作指令为 I x，Q x 中的一种。

输出格式

对于每个询问指令 Q x，输出一个询问结果，如果 xx 在集合中出现过，则输出 Yes，否则输出 No。

每个结果占一行。

数据范围

1≤N≤1e5

−1e9≤x≤1e9

输入样例：

5

I 1

I 2

I 3

Q 2

Q 5

输出样例：

Yes

No

开放寻址法

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=2e5+3;
const int null=0x3f3f3f3f;
int h[N];
int n;

int find(int x)
{
    int t=(x%N+N)%N;
    while(h[t]!=null&&h[t]!=x)
    {
        t++;
        if(t==N) t=0;
    }
    return t;
}

int main()
{
    cin>>n;
    memset(h,0x3f,sizeof h);
    while(n--)
    {
        string op;
        int x;
        cin>>op>>x;
        if(op=="I") h[find(x)]=x;
        else
        {
            if(h[find(x)]==null) puts("No");
            else puts("Yes");
        }
    }
    return 0;
}
```

链地址法

```cpp
#include <cstring>
#include <iostream>

using namespace std;

const int N = 1e5 + 3;  // 取大于1e5的第一个质数，取质数冲突的概率最小 可以百度

//* 开一个槽 h
int h[N], e[N], ne[N], idx;  //邻接表

void insert(int x) {
    // c++中如果是负数 那他取模也是负的 所以 加N 再 %N 就一定是一个正数
    int k = (x % N + N) % N;
    e[idx] = x;
    ne[idx] = h[k];
    h[k] = idx++;
}

bool find(int x) {
    //用上面同样的 Hash函数 讲x映射到 从 0-1e5 之间的数
    int k = (x % N + N) % N;
    for (int i = h[k]; i != -1; i = ne[i]) {
        if (e[i] == x) {
            return true;
        }
    }
    return false;
}

int n;

int main() {
    cin >> n;

    memset(h, -1, sizeof h);  //将槽先清空 空指针一般用 -1 来表示

    while (n--) {
        string op;
        int x;
        cin >> op >> x;
        if (op == "I") {
            insert(x);
        } else {
            if (find(x)) {
                puts("Yes");
            } else {
                puts("No");
            }
        }
    }
    return 0;
}
```

#### 2.11.2字符串哈希表

给定一个长度为 n的字符串，再给定 m个询问，每个询问包含四个整数 l1,r1,l2,r2，请你判断 [l1,r1]和 [l2,r2]这两个区间所包含的字符串子串是否完全相同。

字符串中只包含大小写英文字母和数字。

输入格式

第一行包含整数 n和 m，表示字符串长度和询问次数。

第二行包含一个长度为 n的字符串，字符串中只包含大小写英文字母和数字。

接下来 m行，每行包含四个整数 l1,r1,l2,r2，表示一次询问所涉及的两个区间。

注意，字符串的位置从 1开始编号。

输出格式

对于每个询问输出一个结果，如果两个字符串子串完全相同则输出 Yes，否则输出 No。

每个结果占一行。

数据范围

1≤n,m≤1e5

输入样例：

8 3

aabbaabb

1 3 5 7

1 3 6 8

1 2 1 2

输出样例：

Yes

No

Yes

字符串前缀哈希法。

str\="ABCADEFGKLM"

预处理出所有字符串的前缀的哈希

h[0]\=0

h[1]\="A"的哈希值

h[2]\="AB"的哈希值

h[3]\="ABC"的哈希值

1.如何定义某个前缀的哈希？

把字符串看成P进制的数。

如"ABCD"可以看成P进制的1234

转化成十进制的数就是(1\*p\^3+2\*p\^2+3\*p\^1+4\*p\^0)%Q;

由于结果很大，我们模上2\^64次方，可以直接用unsigned long long 来存储，unsigned long long 相当于2\^64,溢出的部分就相当于取模。

注：一般不能映射成0，比如A-\>0,则AA-\>00,这样就十分容易产生冲突。

前面的数字哈希会产生冲突，但是这里如果P取131或者13331的话，在99.99%的情况下不会产生冲突，则不需要进行处理冲突。

2.好处就是可以快速的求[l,r]子串的哈希值，判断两个子串是否相等。

前缀和公式 h[i+1]\=h[i]×P+s[i] i∈[0,n−1] h为前缀和数组，s为字符串数组；

区间和公式 h[l,r]\=h[r]−h[l−1]×P\^(r−l+1)；

![](https://i-blog.csdnimg.cn/blog_migrate/1885060057fbb818afbd2f4d2d0ef4b1.png)

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

typedef unsigned long long ULL;

const int N = 100010, P = 131;

int n, m;
char str[N];
ULL h[N], p[N];

ULL get(int l, int r)
{
    return h[r] - h[l - 1] * p[r - l + 1];
}

int main()
{
    scanf("%d%d", &n, &m);
    scanf("%s", str + 1);

    p[0] = 1;
    for (int i = 1; i <= n; i ++ )
    {
        h[i] = h[i - 1] * P + str[i];
        p[i] = p[i - 1] * P;
    }

    while (m -- )
    {
        int l1, r1, l2, r2;
        scanf("%d%d%d%d", &l1, &r1, &l2, &r2);

        if (get(l1, r1) == get(l2, r2)) puts("Yes");
        else puts("No");
    }

    return 0;
}
```

### 拓扑排序

给定一个 n个点 m 条边的有向图，点的编号是 1 到 n，图中可能存在重边和自环。

请输出任意一个该有向图的拓扑序列，如果拓扑序列不存在，则输出 −1。

若一个由图中所有点构成的序列 A 满足：对于图中的每条边 (x,y)，x 在 A 中都出现在 y之前，则称 A是该图的一个拓扑序列。

输入格式

第一行包含两个整数 n和 m。

接下来 m 行，每行包含两个整数 x 和 y，表示存在一条从点 x 到点 y 的有向边 (x,y)。

输出格式

共一行，如果存在拓扑序列，则输出任意一个合法的拓扑序列即可。

否则输出 −1。

数据范围

1≤n,m≤1e5

输入样例：

3 3

1 2

2 3

1 3

输出样例：

1 2 3

思路：

![](https://i-blog.csdnimg.cn/blog_migrate/2cd82d620e8930292975a7f4c765f588.png)

AC代码

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1e6+10;

//邻接表表示方法
int h[N],e[N*2],ne[N*2],idx;

int d[N*2];
int q[N*2];//定义一个队列
int n,m;

void add(int a,int b)
{
    e[idx]=b,ne[idx]=h[a],h[a]=idx++;
}

bool topsort()
{
    int hh=0,tt=-1;
    for(int i=1;i<=n;i++)
        if(!d[i]) q[++tt]=i;//将入度为0的点入队
    while(hh<=tt)
    {
        auto t=q[hh++];
        for(int i=h[t];i!=-1;i=ne[i])
        {
            int j=e[i];
            d[j]--;
            if(d[j]==0) q[++tt]=j;
        }
    }
    return tt==n-1;//如果队列里面有n个点，则存在拓扑序列，否则有环，不存在拓扑序列
}

int main()
{
    memset(h,-1,sizeof h);
    cin>>n>>m;
    for(int i=1;i<=m;i++)
    {
        int a,b;
        cin>>a>>b;
        add(a,b);
        d[b]++;//b的入度++
    }
    if(topsort())
    {
        for(int i=0;i<n;i++)
            cout<<q[i]<<" ";
        puts("");
    }
    else puts("-1");
    return 0;
}
```

#### 拓扑排序stl实现

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
#include<queue>
using namespace std;
const int N=1e6+10;

// 邻接表存储图
int h[N], e[N*2], ne[N*2], idx; // h: 头节点，e: 目标点，ne: 下一条边，idx: 记录边序号
int d[N*2]; // 记录入度
queue<int> q;
int n, m; // 节点数，边数

// 添加边 a -> b
void add(int a, int b)
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx++; // 建立邻接表
}

// 拓扑排序（Kahn 算法）
bool topsort()
{
    for(int i = 1; i <= n; i++)
        if(!d[i]) q.push(i); // 先将入度为 0 的点入队

    int cnt = 0; // 统计拓扑序列中的节点数
    while(!q.empty())
    {
        int t = q.front(); q.pop(); // 取出队头
        for(int i = h[t]; i != -1; i = ne[i]) // 遍历 t 的所有出边
        {
            int j = e[i]; // 目标节点
            d[j]--; // 入度减少
            if(d[j] == 0) q.push(j); // 入度变 0，入队
        }
        cnt++; // 统计遍历的点数
    }
    return cnt == n; // 如果遍历所有点，说明无环，否则有环
}

int main()
{
    memset(h, -1, sizeof h); // 初始化邻接表（所有点无边）
  
    cin >> n >> m;
    for(int i = 1; i <= m; i++)
    {
        int a, b;
        cin >> a >> b;
        add(a, b); // 添加有向边 a -> b
        d[b]++; // b 的入度 +1
    }

    if(topsort()) puts("1"); // 无环
    else puts("-1"); // 有环
    return 0;
}


```

### 树和图的一些预备知识

树与图的存储

树是一种特殊的图，与图的存储方式相同。

对于无向图中的边ab，存储两条有向边a-\>b, b-\>a。

因此我们可以只考虑有向图的存储。

n：点数，m：边数

稀疏图:如果m和n是一个级别的，用邻接表。

稠密图:如果m和n\^2是一个级别的，用邻接矩阵。

(1) 邻接矩阵：g[a][b] 存储边a-\>b，先初始化g位正无穷

```cpp
memset(g,0x3f,sizeof g);
g[a][b]=c;
```

(2) 邻接表：

```cpp
// 对于每个点k，开一个单链表，存储k所有可以走到的点。h[k]存储这个单链表的头结点
int h[N], e[N], ne[N], idx;

// 添加一条边a->b
void add(int a, int b)
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
}

// 初始化
idx = 0;
memset(h, -1, sizeof h);//初始化表头
```

(1) 深度优先遍历

时间复杂度 O(n+m) ，n表示点数，m表示边数.

```cpp
int dfs(int u)
{
    st[u] = true; // st[u] 表示点u已经被遍历过

    for (int i = h[u]; i != -1; i = ne[i])
    {
        int j = e[i];
        if (!st[j]) dfs(j);
    }
}
```

(2) 宽度优先遍历

```cpp
queue<int> q;
st[1] = true; // 表示1号点已经被遍历过
q.push(1);

while (q.size())
{
    int t = q.front();
    q.pop();

    for (int i = h[t]; i != -1; i = ne[i])
    {
        int j = e[i];
        if (!st[j])
        {
            st[j] = true; // 表示点j已经被遍历过
            q.push(j);
        }
    }
}
```

### 3.3树的深度优先遍历

树和图的深度优先遍历的模板：

```cpp
// 需要标记数组st[N],  遍历节点的每个相邻的便
void dfs(int u) {
    st[u] = true; // 标记一下，记录为已经被搜索过了，下面进行搜索过程
    for (int i = h[u]; i != -1; i = ne[i]) {
        int j = e[i];
        if (!st[j]) {
            dfs(j);
        }
    }
}
```

#### 3.3.1树的重心

给定一颗树，树中包含 n个结点（编号 1∼n）和 n−1 条无向边。

请你找到树的重心，并输出将重心删除后，剩余各个连通块中点数的最大值。

重心定义：重心是指树中的一个结点，如果将这个点删除后，剩余各个连通块中点数的最大值最小，那么这个节点被称为树的重心。

输入格式

第一行包含整数 n，表示树的结点数。

接下来 n−1行，每行包含两个整数 a和 b，表示点 a和点 b之间存在一条边。

输出格式

输出一个整数 m，表示将重心删除后，剩余各个连通块中点数的最大值。

数据范围

1≤n≤1e5

输入样例

9

1 2

1 7

1 4

2 8

2 5

4 3

3 9

4 6

输出样例：

4

![](https://i-blog.csdnimg.cn/blog_migrate/29a0d93ff6782c402a6e3b973ef2d272.png)

每次算出他下面的size和n-size进行比较即可。

AC代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

const int N = 1e5 + 10; //数据范围是10的5次方
const int M = 2 * N; //以有向图的格式存储无向图，所以每个节点至多对应2n-2条边

int h[N]; //邻接表存储树，有n个节点，所以需要n个队列头节点
int e[M]; //存储元素
int ne[M]; //存储列表的next值
int idx; //单链表指针
int n; //题目所给的输入，n个节点
int ans = N; //表示重心的所有的子树中，最大的子树的结点数目

bool st[N]; //记录节点是否被访问过，访问过则标记为true

//a所对应的单链表中插入b  a作为根 
void add(int a, int b) {
    e[idx] = b, ne[idx] = h[a], h[a] = idx++;
}

// dfs 框架
/*
void dfs(int u){
    st[u]=true; // 标记一下，记录为已经被搜索过了，下面进行搜索过程
    for(int i=h[u];i!=-1;i=ne[i]){
        int j=e[i];
        if(!st[j]) {
            dfs(j);
        }
    }
}
*/

//返回以u为根的子树中节点的个数，包括u节点
int dfs(int u) {
    int res = 0; //存储 删掉某个节点之后，最大的连通子图节点数
    st[u] = true; //标记访问过u节点
    int sum = 1; //存储 以u为根的树 的节点数, 包括u，如图中的4号节点

    //访问u的每个子节点
    for (int i = h[u]; i != -1; i = ne[i]) {
        int j = e[i];
        //因为每个节点的编号都是不一样的，所以 用编号为下标 来标记是否被访问过
        if (!st[j]) {
            int s = dfs(j);  // u节点的单棵子树节点数 如图中的size值
            res = max(res, s); // 记录最大联通子图的节点数
            sum += s; //以j为根的树 的节点数
        }
    }

    //n-sum 如图中的n-size值，不包括根节点4；
    res = max(res, n - sum); // 选择u节点为重心，最大的 连通子图节点数
    ans = min(res, ans); //遍历过的假设重心中，最小的最大联通子图的 节点数
    return sum;
}

int main() {
    memset(h, -1, sizeof h); //初始化h数组 -1表示尾节点
    cin >> n; //表示树的结点数

    // 题目接下来会输入，n-1行数据，
    // 树中是不存在环的，对于有n个节点的树，必定是n-1条边
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        add(a, b), add(b, a); //无向图
    }

    dfs(1); //可以任意选定一个节点开始 u<=n

    cout << ans << endl;

    return 0;
}
```

### 3.4树的广度优先遍历

#### 3.4.1图中点的层次

给定一个 n个点 m条边的有向图，图中可能存在重边和自环。

所有边的长度都是 1，点的编号为 1∼n。

请你求出 1号点到 n号点的最短距离，如果从 1号点无法走到 n号点，输出 −1。

输入格式

第一行包含两个整数 n和 m。

接下来 m行，每行包含两个整数 a和 b，表示存在一条从 a走到 b的长度为 1 的边。

输出格式

输出一个整数，表示 1号点到 n号点的最短距离。

数据范围

1≤n,m≤1e5

输入样例：

4 5

1 2

2 3

3 4

1 3

1 4

输出样例：

1

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1e6+10;

//邻接表表示方法
int h[N],e[N*2],ne[N*2],idx;
int n,m;
int d[N];//标记距离1号点的最短距离
bool st[N];//标记访问标志
int q[N];//定义一个队列

//从a->b连接一条边
void add(int a,int b)
{
    e[idx]=b,ne[idx]=h[a],h[a]=idx++;
}

int bfs()
{
    memset(d,-1,sizeof d);
    int hh=0,tt=-1;
    d[1]=0;
    q[++tt]=1;//从1号点开始搜索
    st[1]=true;
    while(hh<=tt)
    {
        int t=q[hh++];
        for(int i=h[t];i!=-1;i=ne[i])//访问该点的邻接点
        {
            int j=e[i];
            if(!st[j])
            {
                d[j]=d[t]+1;
                q[++tt]=j;
                st[j]=true;
            }
        }
    }
    return d[n];
}

int main()
{
    memset(h,-1,sizeof h);//初始化邻接表头
    scanf("%d%d",&n,&m);
    while(m--)
    {
        int a,b;
        scanf("%d%d",&a,&b);
        add(a,b);
    }
    printf("%d\n",bfs());
    return 0;
}
```

### 高精度算法

性质：数组或者容器从低位往高位依次存储大整数，方便进位。

#### 1.5.1高精度加法

给定两个正整数（不含前导 0），计算它们的和。

输入格式

共两行，每行包含一个整数。

输出格式

共一行，包含所求的和。

数据范围

1≤整数长度≤100000

输入样例：

12

23

输出样例：

35

思路：

模拟人工加法。

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
#include<vector>
using namespace std;

// 高精度加法，A 和 B 代表两个大数（低位在前）
vector<int> sum(vector<int> &A,vector<int> &B)
{
    vector<int> C;
    int k=0; // 进位
    for(int i=0;i<max(A.size(),B.size());i++)
    {
        if(i<A.size()) k+=A[i];
        if(i<B.size()) k+=B[i];
        C.push_back(k%10); // 取当前位
        k/=10; // 计算进位
     }
     if(k) C.push_back(1); // 处理最高位可能的进位
     return C;
} 

int main()
{
    string a,b;
    vector<int> A,B;
    cin>>a>>b;
    for(int i=a.size()-1;i>=0;i--) A.push_back(a[i]-'0'); // 逆序存储
    for(int i=b.size()-1;i>=0;i--) B.push_back(b[i]-'0'); // 逆序存储
    vector<int> C=sum(A,B);
    for(int i=C.size()-1;i>=0;i--) cout<<C[i]; // 逆序输出
    return 0;
}

```

#### 1.5.2高精度减法

给定两个正整数（不含前导 0），计算它们的差，计算结果可能为负数。

输入格式

共两行，每行包含一个整数。

输出格式

共一行，包含所求的差。

数据范围

1≤整数长度≤105

输入样例：

32

11

输出样例：

21

思路：

模拟人工减法。

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> A,B;

// 比较两个高精度数的大小，A >= B 返回 true，否则返回 false
bool cmp(vector<int> &A,vector<int> &B){
    if(A.size()!=B.size()) return A.size()>B.size(); // 长度不同，长度长的数大
    else{
        for(int i=A.size()-1;i>=0;i--){ // 长度相同，从高位开始比较
            if(A[i]!=B[i]) return A[i]>B[i];
        }
    }
    return 1; // 数值相等，视为 A >= B
}

// 高精度减法，计算 A - B，保证 A >= B
vector<int> sub(vector<int> &A,vector<int> &B){
    int k=0; // 进位标记（上一位借走的位数）
    vector<int> C;
    for(int i=0;i<A.size();i++){
        int t=A[i]-k;
        if(i<B.size()) t-=B[i]; // 若 B 还有数，则减去 B[i]
        if(t<0) t+=10,k=1; // 借位处理
        else k=0;
        C.push_back(t);
    }
    while(C.size()>1&&C.back()==0) C.pop_back(); // 去除前导零
    return C;
}

int main(){
    string a,b;
    cin>>a>>b;
    for(int i=a.size()-1;i>=0;i--) A.push_back(a[i]-'0'); // 逆序存储
    for(int i=b.size()-1;i>=0;i--) B.push_back(b[i]-'0'); // 逆序存储
    vector<int> C;
    if(cmp(A,B)) C=sub(A,B);  // A >= B，结果为非负
    else C=sub(B,A),cout<<"-";  // A < B，输出负号
    for(int i=C.size()-1;i>=0;i--) cout<<C[i]; // 逆序输出
    return 0;
}

```

#### 1.5.3高精度乘法

给定两个非负整数（不含前导 0)A 和 B，请你计算 A×B 的值。

输入格式

共两行，第一行包含整数 A，第二行包含整数 B。

输出格式

共一行，包含 A×B 的值。

数据范围

1≤A的长度≤100000,

0≤B≤10000

输入样例：

2

3

输出样例：

6

高精度x低精度

```cpp
// 高精度 x 低精度
#include<bits/stdc++.h>
#include<vector>

using namespace std;

// 计算 A * b，A 是高精度数（低位在前），b 是普通整数
vector<int> mul(vector<int> &A,int b)
{
    vector<int> C;
    int t=0; // 进位
    for(int i=0;i<A.size();i++)
    {
        t+=A[i]*b; // 当前位相乘加上进位
        C.push_back(t%10); // 取当前位
        t/=10; // 计算进位
    }
    while(t) // 处理剩余的进位
    {
        C.push_back(t%10);
        t/=10;
    }
    while(C.size()>1&&C.back()==0) C.pop_back(); // 去除前导零
    return C;
}

int main()
{
    string a;
    int b;
    cin>>a>>b;

    vector<int> A;
    for(int i=a.size()-1;i>=0;i--) A.push_back(a[i]-'0'); // 逆序存储
    auto C=mul(A,b);
    for(int i=C.size()-1;i>=0;i--) cout<<C[i]; // 逆序输出
    return 0;
}

```

高精度x高精度

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N = 1e5+10;

int A[N],B[N],C[N];
int la,lb,lc;

// 高精度乘法：计算 A * B，结果存入 C
void mul(int A[],int B[],int C[])
{
    for(int i=0;i<la;i++)
        for(int j=0;j<lb;j++)
        {
            C[i+j]+=A[i]*B[j]; // 乘法累加
            C[i+j+1]+=C[i+j]/10; // 处理进位
            C[i+j]%=10; // 保留当前位
        }
    while(lc&&C[lc]==0) lc--; // 去除前导零
}

int main()
{
    string a,b;
    cin>>a>>b;
    la=a.size();
    lb=b.size();
    lc=la+lb+10; // 乘积最多占 la + lb 位
    for(int i=a.size()-1;i>=0;i--) A[la-i-1]=a[i]-'0'; // 逆序存储
    for(int i=b.size()-1;i>=0;i--) B[lb-i-1]=b[i]-'0'; // 逆序存储
    mul(A,B,C);
    for(int i=lc;i>=0;i--) cout<<C[i]; // 逆序输出
    return 0;
}

```

#### 1.5.4高精度除法

给定两个非负整数（不含前导 0)A，B，请你计算 A/B的商和余数。

输入格式

共两行，第一行包含整数 A，第二行包含整数 B。

输出格式

共两行，第一行输出所求的商，第二行输出所求余数。

数据范围

1≤A的长度≤100000,

1≤B≤10000,

B 一定不为 00

输入样例：

7

2

输出样例：

3

1

```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

// 高精度除法：计算 A / B，返回商 C，余数存入 r
vector<int> div(vector<int> &A, int B, int &r)
{
    vector<int> C;
    for(int i=0; i<A.size(); i++)
    {
        r = r * 10 + A[i]; // 余数左移一位，加上当前位
        C.push_back(r / B); // 计算当前位的商
        r %= B; // 更新余数
    }
    reverse(C.begin(), C.end()); // 逆序存储，调整为高位在前
    while(C.size() > 1 && C.back() == 0) C.pop_back(); // 去除前导零
    return C;
}

int main()
{
    string a;
    int B, r = 0;
    cin >> a >> B;
    vector<int> A;
    for(int i=0; i<a.size(); i++) A.push_back(a[i] - '0'); // 转换为数字数组
    auto C = div(A, B, r);
    for(int i=C.size()-1; i>=0; i--) cout << C[i]; // 逆序输出商
    cout << endl << r; // 输出余数
    return 0;
}

```

#### 1.5.5高精度阶乘

问题描述

　　输入一个正整数*n*，输出*n*!的值。

　　其中*n*!\=1\*2\*3\*…\**n*。

算法描述

　　*n*!可能很大，而计算机能表示的整数范围有限，需要使用高精度计算的方法。使用一个数组*A*来表示一个大整数*a*，*A*[0]表示*a*的个位，*A*[1]表示*a*的十位，依次类推。

　　将*a*乘以一个整数*k*变为将数组*A*的每一个元素都乘以*k*，请注意处理相应的进位。

　　首先将*a*设为1，然后乘2，乘3，当乘到*n*时，即得到了*n*!的值。

输入格式

　　输入包含一个正整数*n*，*n*\<\=1000。

输出格式

　　输出*n*!的准确值。

样例输入

10

样例输出

3628800

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>

using namespace std;
const int N = 1e5+10;
int n;
int a[N];

int main()
{
    scanf("%d", &n);
    a[1] = 1; // 初始化阶乘结果为 1
    int t = 0; // 进位

    for(int i = 2; i <= n; i++) // 计算 n!
    {
        for(int j = 1; j <= 10000; j++) // 逐位相乘
        {
            int p = a[j] * i + t; // 当前位乘积加进位
            a[j] = p % 10; // 仅保留个位
            t = p / 10; // 计算新的进位
        }
    }

    n = 10000; 
    while(a[n] == 0) n--; // 去除前导零，找到最高位
    for(int i = n; i >= 1; i--) cout << a[i]; // 逆序输出结果
    return 0;
}

```

### 背包问题

![](https://i-blog.csdnimg.cn/blog_migrate/90e64bc21a47ad592cc043a56e0b915f.png)

![](https://i-blog.csdnimg.cn/blog_migrate/0b561cb994cc363a9442b6b30280dcf1.png)

#### 5.1.1 01背包问题

有 N 件物品和一个容量是 V 的背包。每件物品只能使用一次。

第 i件物品的体积是 vi，价值是 wi。

求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。

输出最大价值。

输入格式

第一行两个整数，N，V，用空格隔开，分别表示物品数量和背包容积。

接下来有 N行，每行两个整数 vi,wi，用空格隔开，分别表示第 i 件物品的体积和价值。

输出格式

输出一个整数，表示最大价值。

数据范围

0\<N,V≤1000

0\<vi,wi≤1000

输入样例

4 5

1 2

2 4

3 4

4 5

输出样例：

8

思路：

![](https://i-blog.csdnimg.cn/blog_migrate/44dfb9e3cf8ec715bef668ebda0f59fa.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;

const int N=1005;
int v[N*N],w[N*N]; // v[i] 表示第 i 件物品的体积, w[i] 表示第 i 件物品的价值
int f[N][N]; // f[i][j] 表示前 i 件物品在容量 j 下的最大价值
int n,m;

int main()
{
    cin>>n>>m;
    for(int i=1;i<=n;i++) cin>>v[i]>>w[i]; // 读取 n 件物品的体积和价值

    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=m;j++)
        {
            f[i][j]=f[i-1][j]; // 不选当前物品 i，则价值等于前 i-1 件物品的最优解
            if(j>=v[i]) // 只有当容量 j 能放下物品 i 时才考虑选它
                f[i][j]=max(f[i][j],f[i-1][j-v[i]]+w[i]); // 选与不选取较优解
        }
    }
    cout<<f[n][m]<<endl; // 输出前 n 件物品在容量 m 下的最大价值
    return 0;
}

```

##### 优化到一维

```cpp
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 1005;
int v[N], w[N], f[N]; // f[j] 只存一行数据，减少空间

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> v[i] >> w[i]; // 读取 n 件物品的体积和价值

    for (int i = 1; i <= n; i++) {
        for (int j = m; j >= v[i]; j--) { // 逆序遍历，避免覆盖
            f[j] = max(f[j], f[j - v[i]] + w[i]);
        }
    }
    cout << f[m] << endl; // 输出容量 m 下的最大价值
    return 0;
}

```

#### 5.1.2 完全背包问题

有 N 种物品和一个容量是 V的背包，每种物品都有无限件可用。

第 i种物品的体积是 vi，价值是 wi。

求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。

输出最大价值。

输入格式

第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。

接下来有 N 行，每行两个整数vi,wi，用空格隔开，分别表示第 i 种物品的体积和价值。

输出格式

输出一个整数，表示最大价值。

数据范围

0\<N,V≤1000

0\<vi,wi≤1000

输入样例

4 5

1 2

2 4

3 4

4 5

输出样例：

10

思路：

完全背包是求前缀的最大值，第一次求前1项的max，第二次求前2项的max，......

![](https://i-blog.csdnimg.cn/blog_migrate/6ff7e5d014ed82c13b63112256e60b9b.png)

```cpp
#include<iostream>
using namespace std;
const int N = 1010;
int f[N][N]; // f[i][j] 表示前 i 件物品在容量 j 下的最大价值
int v[N],w[N];

int main()
{
    int n,m;
    cin>>n>>m;
    for(int i = 1 ; i <= n ;i ++) cin>>v[i]>>w[i]; // 读取物品体积和价值

    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=m;j++)
        {
            f[i][j]=f[i-1][j]; // 不选当前物品 i
            if(j>=v[i])
                f[i][j]=max(f[i][j],f[i][j-v[i]]+w[i]); // 选当前物品 i，可重复选
        }
    }
    cout<<f[n][m]<<endl; // 输出最大价值
    return 0;
}

```

#### 优化到一维

```cpp
#include<iostream>
using namespace std;
const int N = 1010;
int f[N], v[N], w[N];

int main()
{
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> v[i] >> w[i];

    for (int i = 1; i <= n; i++) {
        for (int j = v[i]; j <= m; j++) { // 正序遍历，保证可以重复选
            f[j] = max(f[j], f[j - v[i]] + w[i]);
        }
    }
    cout << f[m] << endl;
    return 0;
}

```

#### 5.1.3 多重背包问题I

有 N种物品和一个容量是 V 的背包。

第 i种物品最多有 si 件，每件体积是 vi，价值是 wi。

求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。

输出最大价值。

输入格式

第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。

接下来有 N 行，每行三个整数 vi,wi,si，用空格隔开，分别表示第 ii 种物品的体积、价值和数量。

输出格式

输出一个整数，表示最大价值。

数据范围

0\<N,V≤100

0\<vi,wi,si≤100

输入样例

4 5

1 2 3

2 4 1

3 4 3

4 5 2

输出样例：

10

完全背包模型的基础上加了一个限制。

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1010;
int v[N],w[N],s[N]; // v[i]: 物品体积, w[i]: 物品价值, s[i]: 物品数量限制
int f[N][N]; // f[i][j] 表示前 i 件物品在容量 j 下的最大价值
int n,m;

int main()
{
    cin>>n>>m;
    for(int i=1;i<=n;i++) cin>>v[i]>>w[i]>>s[i]; // 读取每件物品的体积、价值和数量限制

    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
        {
            f[i][j]=f[i-1][j]; // 不选当前物品 i
            for(int k=1;k<=s[i];k++) // 枚举选取 k 件物品 i
                if(j>=k*v[i]) 
                    f[i][j]=max(f[i][j],f[i-1][j-k*v[i]]+k*w[i]); // 选 k 件的最优解
        }
    cout<<f[n][m]<<endl; // 输出最大价值
    return 0;
}

```

按照01背包进行优化为一维：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 1100;

int n,m,v,w,s;
int f[N];

int main()
{
    scanf("%d%d", &n,&m);

    for(int i=1;i<=n;i++)
    {
        cin>>v>>w>>s;
        for(int j=m;j>=0;j--) // 逆序遍历容量，保证物品不会被重复计算
            for(int k=0;k<=s&&k*v<=j;k++) // 枚举当前物品的选取数量 k
                f[j]=max(f[j],f[j-k*v]+k*w); // 取选与不选的最优解
    }
    cout<<f[m]<<endl; // 输出最大价值
    return 0;
}

```

#### 5.1.4多重背包问题 II

有 N种物品和一个容量是 V 的背包。

第 i 种物品最多有 si 件，每件体积是 vi，价值是 wi。

求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。

输出最大价值。

输入格式

第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。

接下来有N 行，每行三个整数 vi,wi,si，用空格隔开，分别表示第 i 种物品的体积、价值和数量。

输出格式

输出一个整数，表示最大价值。

数据范围

0\<N≤1000

0\<V≤2000

0\<vi,wi,si≤2000

提示：

本题考查多重背包的二进制优化方法。

输入样例

4 5

1 2 3

2 4 1

3 4 3

4 5 2

输出样例：

10

我们可以用二进制对其进行优化。

```cpp
#include<iostream>
using namespace std;

const int N = 12010, M = 2010;

int n, m;
int v[N], w[N]; // 存储物品的体积和价值（经过二进制拆分）
int f[M]; // 01 背包的动态规划数组

int main()
{
    cin >> n >> m;
    int cnt = 0; // 拆分后的物品数量
    for(int i = 1; i <= n; i++)
    {
        int a, b, s;
        cin >> a >> b >> s;
        int k = 1; // 进行二进制拆分的当前数量
        while(k <= s)
        {
            cnt++; // 增加新物品
            v[cnt] = a * k; // 拆分出的物品体积
            w[cnt] = b * k; // 拆分出的物品价值
            s -= k; // 剩余数量减少
            k *= 2; // 采用二进制倍增法
        }
        // 处理剩余的部分
        if(s > 0)
        {
            cnt++;
            v[cnt] = a * s;
            w[cnt] = b * s;
        }
    }

    n = cnt; // 物品数量变为拆分后的总数

    // 01 背包一维优化
    for(int i = 1; i <= n; i++)
        for(int j = m; j >= v[i]; j--) // 逆序遍历，避免状态污染
            f[j] = max(f[j], f[j - v[i]] + w[i]);

    cout << f[m] << endl; // 输出最大价值
    return 0;
}

```

#### 分组背包问题

有 N组物品和一个容量是 V 的背包。

每组物品有若干个，同一组内的物品最多只能选一个。

每件物品的体积是 vij，价值是 wij，其中 i 是组号，j 是组内编号。

求解将哪些物品装入背包，可使物品总体积不超过背包容量，且总价值最大。

输出最大价值。

输入格式

第一行有两个整数 N，V，用空格隔开，分别表示物品组数和背包容量。

接下来有 N组数据：

每组数据第一行有一个整数 Si，表示第 i 个物品组的物品数量；

每组数据接下来有Si 行，每行有两个整数 vij,wij，用空格隔开，分别表示第 i个物品组的第 j个物品的体积和价值；

输出格式

输出一个整数，表示最大价值。

数据范围

0\<N,V≤100

0\<Si\<100

0\<vij,wij≤100

输入样例

3 5

2

1 2

2 4

1

3 4

1

4 5

输出样例：

8

![](https://i-blog.csdnimg.cn/blog_migrate/7c1d8d9aa1774ec9fe17aad5b89d7a3e.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N = 110;

int w[N][N],v[N][N];
int f[N][N];
int s[N];
int n,m;

int main()
{
    cin>>n>>m;
    for(int i=1;i<=n;i++) 
    {
        cin>>s[i];
        for(int k=1;k<=s[i];k++)
            cin>>v[i][k]>>w[i][k];
    }
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
        {
            f[i][j]=f[i-1][j];
            for(int k=1;k<=s[i];k++)
            {
                if(v[i][k]<=j) f[i][j]=max(f[i][j],f[i-1][j-v[i][k]]+w[i][k]);
            }
        }
    cout<<f[n][m]<<endl;
    return 0;
}
```

5.1.6二维背包的费用问题

有 N件物品和一个容量是 V 的背包，背包能承受的最大重量是 M。

每件物品只能用一次。体积是 vi，重量是 mi，价值是 wi。

求解将哪些物品装入背包，可使物品总体积不超过背包容量，总重量不超过背包可承受的最大重量，且价值总和最大。

输出最大价值。

输入格式

第一行三个整数，N,V,M，用空格隔开，分别表示物品件数、背包容积和背包可承受的最大重量。

接下来有 N行，每行三个整数vi,mi,wi，用空格隔开，分别表示第 i件物品的体积、重量和价值。

输出格式

输出一个整数，表示最大价值。

数据范围

0\<N≤1000

0\<V,M≤100

0\<vi,mi≤100

0\<wi≤1000

输入样例

4 5 6

1 2 3

2 4 4

3 4 5

4 5 6

输出样例：

8

思路：01背包的变形，多加了一个限制条件。

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;
const int M = 1100;

int N,V,W,x,y,z;

int f[M][M];

int main()
{
    cin>>N>>V>>W;
    for(int i=1;i<=N;i++)
    {
        cin>>x>>y>>z;
        for(int j=V;j>=x;j--)
            for(int k=W;k>=y;k--)
                f[j][k]=max(f[j][k],f[j-x][k-y]+z);
    }
    cout<<f[V][W]<<endl;
    return 0;
}
```

### Prim

#### 3.10.1Prim求最小生成树

给定一个 n个点 m条边的无向图，图中可能存在重边和自环，边权可能为负数。

求最小生成树的树边权重之和，如果最小生成树不存在则输出 impossible。

给定一张边带权的无向图 G\=(V,E)，其中 VV 表示图中点的集合，E表示图中边的集合，n\=|V|，m\=|E|。

由 V中的全部 n个顶点和 E中 n−1 条边构成的无向连通子图被称为 G的一棵生成树，其中边的权值之和最小的生成树被称为无向图 G的最小生成树。

输入格式

第一行包含两个整数 n和 m。

接下来 m行，每行包含三个整数u,v,w，表示点 u和点 v之间存在一条权值为 w的边。

输出格式

共一行，若存在最小生成树，则输出一个整数，表示最小生成树的树边权重之和，如果最小生成树不存在则输出 impossible。

数据范围

1≤n≤500,

1≤m≤105,

图中涉及边的边权的绝对值均不超过10000。

输入样例：

4 5

1 2 1

1 3 2

1 4 3

2 3 2

3 4 4

输出样例：

6

思路：

![](https://i-blog.csdnimg.cn/blog_migrate/57886ff80daf7a6054f30456904ce55b.png)

模拟样例

![](https://i-blog.csdnimg.cn/blog_migrate/f8dd7161decc6c75692add64c785aa5c.png)

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 510, INF = 0x3f3f3f3f;

int n, m;
int g[N][N];
int dist[N];
bool st[N];


int prim()
{
    memset(dist, 0x3f, sizeof dist);

    int res = 0;
    for (int i = 1; i<=n; i ++ )
    {
        int t = -1;
        for (int j = 1; j <= n; j ++ )
            if (!st[j] && (t == -1 || dist[t] > dist[j]))
                t = j;

        if (i!=1 && dist[t] == INF) return INF;//如果不是第一个点，并且该点和集合不连通，则没有最小生成树

        if (i!=1) res += dist[t];//我们把1号点原本就看成集合内部的点，所以1号点到集合的距离是0，只需要加上其他点到集合内部的最短距离
        st[t] = true;

        for (int j = 1; j <= n; j ++ ) dist[j] = min(dist[j], g[t][j]);
    }

    return res;
}


int main()
{
    scanf("%d%d", &n, &m);

    memset(g, 0x3f, sizeof g);

    while (m -- )
    {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        g[a][b] = g[b][a] = min(g[a][b], c);
    }

    int t = prim();

    if (t == INF) puts("impossible");
    else printf("%d\n", t);

    return 0;
}
```

### Kruskal

#### 3.11.1Kruskal求最小生成树

给定一个 n个点 m条边的无向图，图中可能存在重边和自环，边权可能为负数。

求最小生成树的树边权重之和，如果最小生成树不存在则输出 impossible。

给定一张边带权的无向图 G\=(V,E)，其中 VV 表示图中点的集合，EE 表示图中边的集合，n\=|V|，m\=|E|。

由 V中的全部 n个顶点和 E中 n−1 条边构成的无向连通子图被称为 G的一棵生成树，其中边的权值之和最小的生成树被称为无向图 G的最小生成树。

输入格式

第一行包含两个整数 n和 m。

接下来 m行，每行包含三个整数u,v,w，表示点 u和点 v之间存在一条权值为 w的边。

输出格式

共一行，若存在最小生成树，则输出一个整数，表示最小生成树的树边权重之和，如果最小生成树不存在则输出 impossible。

数据范围

1≤n≤105,

1≤m≤2∗1e5,

图中涉及边的边权的绝对值均不超过 1000。

输入样例：

4 5

1 2 1

1 3 2

1 4 3

2 3 2

3 4 4

输出样例：

6

![](https://i-blog.csdnimg.cn/blog_migrate/b873d2cd8c6fc38b849f99998069887d.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N = 2e6+10;
int n,m;
int p[N];

struct Edg
{
    int a,b,w;
}edg[N];

bool cmp(Edg &a,Edg &b)
{
    return a.w<b.w;
}

int find(int x)
{
    if(p[x]!=x) p[x]=find(p[x]);
    return p[x];
}

int main()
{
    cin>>n>>m;
    for(int i=1;i<=m;i++)
    {
        int a,b,w;
        cin>>a>>b>>w;
        edg[i]={a,b,w};
    }
    sort(edg+1,edg+m+1,cmp);
    for (int i = 1; i <= n; i ++ ) p[i] = i;
    int res=0,cnt=0;
    for(int i=1;i<=m;i++)
    {
        int a=find(edg[i].a),b=find(edg[i].b),w=edg[i].w;
        if(a!=b)
        {
            p[a]=b;
            res+=w;
            cnt++;
        }
    }

    if(cnt<n-1) puts("impossible");
    else cout<<res<<endl;
    return 0;
}
```

### 线性DP

#### 5.2.1数字三角形

给定一个如下图所示的数字三角形，从顶部出发，在每一结点可以选择移动至其左下方的结点或移动至其右下方的结点，一直走到底层，要求找出一条路径，使路径上的数字的和最大。

7

3 8

8 1 0

2 7 4 4

4 5 2 6 5

输入格式

第一行包含整数 n，表示数字三角形的层数。

接下来 n行，每行包含若干整数，其中第 i 行表示数字三角形第 i层包含的整数。

输出格式

输出一个整数，表示最大的路径数字和。

数据范围

1≤n≤500,

−10000≤三角形中的整数≤10000

输入样例：

5

7

3 8

8 1 0

2 7 4 4

4 5 2 6 5

输出样例：

30

思路：

数字三角形的模型

![](https://i-blog.csdnimg.cn/blog_migrate/2e9ccc4cb4f2260b4c770be04e8fd567.png)

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 510, INF = 1e9;

int n;
int a[N][N];
int f[N][N];

int main()
{
    scanf("%d", &n);
    for (int i = 1; i <= n; i ++ )
        for (int j = 1; j <= i; j ++ )
            scanf("%d", &a[i][j]);

    for (int i = 0; i <= n; i ++ )
        for (int j = 0; j <= i + 1; j ++ )
            f[i][j] = -INF;

    f[1][1] = a[1][1];
    for (int i = 2; i <= n; i ++ )
        for (int j = 1; j <= i; j ++ )
            f[i][j] = max(f[i - 1][j - 1], f[i - 1][j])+a[i][j];

    int res = -INF;
    for (int i = 1; i <= n; i ++ ) res = max(res, f[n][i]);

    printf("%d\n", res);
    return 0;
}
```

#### 5.2.2最长上升子序列

给定一个长度为 N的数列，求数值严格单调递增的子序列的长度最长是多少。

输入格式

第一行包含整数 N。

第二行包含 N个整数，表示完整序列。

输出格式

输出一个整数，表示最大长度。

数据范围

1≤N≤1000，

−1e9≤数列中的数≤1e9

输入样例：

7

3 1 2 1 8 5 6

输出样例：

4

思路：

![](https://i-blog.csdnimg.cn/blog_migrate/52f656a66f45d6fd9e70b074a1d28715.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N = 1100;
int a[N];
int f[N];
int n,ans;
int main()
{
    cin>>n;
    for(int i=1;i<=n;i++) cin>>a[i];
    for(int i=1;i<=n;i++)
    {
        f[i]=1;
        for(int j=1;j<i;j++)
            if(a[i]>a[j]) f[i]=max(f[i],f[j]+1);
        ans=max(ans,f[i]);
    }
    cout<<ans;
    return 0;
}
```

#### 5.2.3 最长上升子序列 II

给定一个长度为 N的数列，求数值严格单调递增的子序列的长度最长是多少。

输入格式

第一行包含整数 N。

第二行包含 N个整数，表示完整序列。

输出格式

输出一个整数，表示最大长度。

数据范围

1≤N≤100000，

−1e9≤数列中的数≤1e9

输入样例：

7

3 1 2 1 8 5 6

输出样例：

4

![](https://i-blog.csdnimg.cn/blog_migrate/354039034d018da34ca45ed8780445af.png)

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 100010;

int n;
int a[N];
int q[N];//存储不同长度下，结尾的最小值

int main()
{
    scanf("%d", &n);
    for (int i = 0; i < n; i ++ ) scanf("%d", &a[i]);

    int len = 0;
    for (int i = 0; i < n; i ++ )
    {
        int l = 0, r = len;
        while (l < r)
        {
            int mid = l + r + 1 >> 1;
            if (q[mid] < a[i]) l = mid;
            else r = mid - 1;
        }
        len = max(len, r + 1);//每次都是更大的范围
        q[r + 1] = a[i];//r是小于a[i]的最大的数
    }

    printf("%d\n", len);

    return 0;
}
```

#### 5.2.4最长公共子序列

给定两个长度分别为 N 和 M 的字符串 A和 B，求既是 A 的子序列又是 B 的子序列的字符串长度最长是多少。

输入格式

第一行包含两个整数 N 和 M。

第二行包含一个长度为 N 的字符串，表示字符串 A。

第三行包含一个长度为 M的字符串，表示字符串 B。

字符串均由小写字母构成。

输出格式

输出一个整数，表示最大长度。

数据范围

1≤N,M≤1000

输入样例：

4 5

acbd

abedc

输出样例：

3

![](https://i-blog.csdnimg.cn/blog_migrate/2b0ef08b522afced0f1047cd12cdf2ab.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1100;

char A[N],B[N];
int n,m;
int f[N][N];

int main()
{
    cin>>n>>m;
    for(int i=1;i<=n;i++) cin>>A[i];
    for(int i=1;i<=m;i++) cin>>B[i];

    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
        {
            f[i][j]=max(f[i-1][j],f[i][j-1]);
            if(A[i]==B[j]) f[i][j]=max(f[i][j],f[i-1][j-1]+1);
        }
    cout<<f[n][m]<<endl;
    return 0;
}
```

#### 5.2.5最短编辑距离

给定两个字符串 A 和 B，现在要将 A 经过若干操作变为 B，可进行的操作有：

删除–将字符串 A 中的某个字符删除。

插入–在字符串 A 的某个位置插入某个字符。

替换–将字符串 A 中的某个字符替换为另一个字符。

现在请你求出，将 A 变为 B 至少需要进行多少次操作。

输入格式

第一行包含整数 n，表示字符串 A 的长度。

第二行包含一个长度为 n 的字符串 A。

第三行包含整数 m，表示字符串 B 的长度。

第四行包含一个长度为 m 的字符串 B。

字符串中均只包含大小写字母。

输出格式

输出一个整数，表示最少操作次数。

数据范围

1≤n,m≤1000

输入样例：

10

AGTCTGACGC

11

AGTAAGTAGGC

输出样例：

4

![](https://i-blog.csdnimg.cn/blog_migrate/40e59d5635fb9f4b69f62f8aa5690afe.png)

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010;

int n, m;
char a[N], b[N];
int f[N][N];

int main()
{
    scanf("%d%s", &n, a + 1);
    scanf("%d%s", &m, b + 1);

    /*先初始化边界，当a的前0个字母与b匹配时只能添加和b对应位置上相同的字母,次数为a的长度*/
    for (int i = 0; i <= m; i ++ ) f[0][i] = i;

    /*同理，当a与b的前0个字母匹配时，只能删除a中所有的字母，次数为a的长度*/
    for (int i = 0; i <= n; i ++ ) f[i][0] = i;

    for (int i = 1; i <= n; i ++ )
        for (int j = 1; j <= m; j ++ )
        {
            f[i][j] = min(f[i - 1][j] + 1, f[i][j - 1] + 1);
            if (a[i] == b[j]) f[i][j] = min(f[i][j], f[i - 1][j - 1]);
            else f[i][j] = min(f[i][j], f[i - 1][j - 1] + 1);
        }

    printf("%d\n", f[n][m]);

    return 0;
}
```

#### 5.2.6编辑距离

给定 n 个长度不超过 10 的字符串以及 m 次询问，每次询问给出一个字符串和一个操作次数上限。

对于每次询问，请你求出给定的 n 个字符串中有多少个字符串可以在上限操作次数内经过操作变成询问给出的字符串。

每个对字符串进行的单个字符的插入、删除或替换算作一次操作。

输入格式

第一行包含两个整数 n 和 m。

接下来 n 行，每行包含一个字符串，表示给定的字符串。

再接下来 m 行，每行包含一个字符串和一个整数，表示一次询问。

字符串中只包含小写字母，且长度均不超过10。

输出格式

输出共 m 行，每行输出一个整数作为结果，表示一次询问中满足条件的字符串个数。

数据范围

1≤n,m≤1000,

输入样例：

3 2

abc

acd

bcd

ab 1

acbd 2

输出样例：

1

和上一题思路相同

```cpp
#include <iostream>
#include <algorithm>
#include <string.h>

using namespace std;

const int N = 15, M = 1010;

int n, m;
int f[N][N];
char str[M][N];

int edit_distance(char a[], char b[])
{
    int la = strlen(a + 1), lb = strlen(b + 1);

    for (int i = 0; i <= lb; i ++ ) f[0][i] = i;
    for (int i = 0; i <= la; i ++ ) f[i][0] = i;

    for (int i = 1; i <= la; i ++ )
        for (int j = 1; j <= lb; j ++ )
        {
            f[i][j] = min(f[i - 1][j] + 1, f[i][j - 1] + 1);
            f[i][j] = min(f[i][j], f[i - 1][j - 1] + (a[i] != b[j]));
        }

    return f[la][lb];
}

int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i ++ ) scanf("%s", str[i] + 1);

    while (m -- )
    {
        char s[N];
        int limit;
        scanf("%s%d", s + 1, &limit);

        int res = 0;
        for (int i = 0; i < n; i ++ )
            if (edit_distance(str[i], s) <= limit)
                res ++ ;

        printf("%d\n", res);
    }

    return 0;
}
```

### 区间DP

#### 5.3.1石子合并

设有 N 堆石子排成一排，其编号为 1,2,3,…,N。

每堆石子有一定的质量，可以用一个整数来描述，现在要将这 N 堆石子合并成为一堆。

每次只能合并相邻的两堆，合并的代价为这两堆石子的质量之和，合并后与这两堆石子相邻的石子将和新堆相邻，合并时由于选择的顺序不同，合并的总代价也不相同。

例如有 4 堆石子分别为 1 3 5 2， 我们可以先合并 1、2 堆，代价为 4，得到 4 5 2， 又合并 1、2 堆，代价为 9，得到 9 2 ，再合并得到 11，总代价为 4+9+11\=24；

如果第二步是先合并 2、3 堆，则代价为 7，得到 4 7，最后一次合并代价为 11，总代价为 4+7+11\=22。

问题是：找出一种合理的方法，使总的代价最小，输出最小代价。

输入格式

第一行一个数 N 表示石子的堆数 N。

第二行 N 个数，表示每堆石子的质量(均不超过1000)。

输出格式

输出一个整数，表示最小代价。

数据范围

1≤N≤300

输入样例：

4

1 3 5 2

输出样例：

22

![](https://i-blog.csdnimg.cn/blog_migrate/bc14224b4acf66c37fd141bc3cf0014c.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N = 310;

int a[N],s[N];
int f[N][N];
int n;

int main()
{
    cin>>n;
    for(int i=1;i<=n;i++)
    {
        cin>>a[i];
        s[i]=s[i-1]+a[i];
    }
    for(int len=2;len<=n;len++)
    {
        for(int i=1;i+len-1<=n;i++)
        {
            int j=i+len-1;
            f[i][j]=1e8;
            for(int k=i;k<j;k++) f[i][j]=min(f[i][j],f[i][k]+f[k+1][j]+s[j]-s[i-1]);
        }
    }
    cout<<f[1][n]<<endl;
    return 0;
}
```

### 计数类DP

#### 5.4.1整数划分

![](https://i-blog.csdnimg.cn/blog_migrate/726c61e2012939513de53e41287f792a.png)

![](https://i-blog.csdnimg.cn/blog_migrate/7b2e71bf9b1ab919eb38c7b6b1caa496.png)

思路：完全背包求方案数的模型。

完全背包解法

状态表示：

f[i][j]表示只从1\~i中选，且总和等于j的方案数

状态转移方程:

f[i][j] \= f[i - 1][j] + f[i][j - i];

二维

```cpp
#include <iostream>

using namespace std;

const int N = 1e3 + 7, mod = 1e9 + 7;

int f[N][N];

int main() {
    int n;
    cin >> n;

    for (int i = 0; i <= n; i ++) {
        f[i][0] = 1; // 容量为0时，前 i 个物品全不选也是一种方案
    }

    for (int i = 1; i <= n; i ++) {
        for (int j = 1; j <= n; j ++) {
            f[i][j] = f[i - 1][j] % mod; // 特殊 f[0][0] = 1
            if (j >= i) f[i][j] = (f[i - 1][j] + f[i][j - i]) % mod;
        }
    }

    cout << f[n][n] << endl;
}
```

一维优化

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010, mod = 1e9 + 7;

int n;
int f[N];

int main()
{
    cin >> n;

    f[0] = 1;
    for (int i = 1; i <= n; i ++ )
        for (int j = i; j <= n; j ++ )
            f[j] = (f[j] + f[j - i]) % mod;

    cout << f[n] << endl;

    return 0;
}
```

### 数位统计DP

#### 5.5.1计数问题

![](https://i-blog.csdnimg.cn/blog_migrate/228f9f0913c5666baebfad40b953ed49.png)

![](https://i-blog.csdnimg.cn/blog_migrate/aafffb90418dce496407b63771e1c91a.png)

![](https://i-blog.csdnimg.cn/blog_migrate/568169ae05e74ecf9e0347b60deeabb6.png)

![](https://i-blog.csdnimg.cn/blog_migrate/5e795d7582a9ae20ef18deb058be1b61.png)

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

const int N = 10;

/*

001~abc-1, 999

abc
    1. num[i] < x, 0
    2. num[i] == x, 0~efg
    3. num[i] > x, 0~999

*/

int get(vector<int> num, int l, int r)
{
    int res = 0;
    for (int i = l; i >= r; i -- ) res = res * 10 + num[i];
    return res;
}

int power10(int x)
{
    int res = 1;
    while (x -- ) res *= 10;
    return res;
}

int count(int n, int x)
{
    if (!n) return 0;

    vector<int> num;
    while (n)
    {
        num.push_back(n % 10);
        n /= 10;
    }
    n = num.size();

    int res = 0;
    for (int i = n - 1 - !x; i >= 0; i -- )
    {
        if (i < n - 1)
        {
            res += get(num, n - 1, i + 1) * power10(i);
            if (!x) res -= power10(i);
        }

        if (num[i] == x) res += get(num, i - 1, 0) + 1;
        else if (num[i] > x) res += power10(i);
    }

    return res;
}

int main()
{
    int a, b;
    while (cin >> a >> b , a)
    {
        if (a > b) swap(a, b);

        for (int i = 0; i <= 9; i ++ )
            cout << count(b, i) - count(a - 1, i) << ' ';
        cout << endl;
    }

    return 0;
}
```

### 树形DP

#### 5.7.1 没有上司的舞会

![](https://i-blog.csdnimg.cn/blog_migrate/6e5c224f6d1afe94c36f2ab73504eb84.png)

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=6e3+10;
int n,w[N];
vector<int> g[N];
int f[N][3];
int fa[N];

void dfs(int u) {
	f[u][1]=w[u];
	for(auto x: g[u]) {
		dfs(x);
		f[u][0]+=max(f[x][0],f[x][1]);
		f[u][1]+=f[x][0];
	}
}

signed main() {
	cin>>n;
	for(int i=1;i<=n;i++) cin>>w[i];
	for(int i=1;i<n;i++) {
		int a,b;
		cin>>a>>b;
		g[b].push_back(a);
		fa[a]++;
	}
	int root=0;
	for(int i=1;i<=n;i++)
		if(!fa[i]) {
			root=i;
			break;
		} 
	dfs(root);
	cout<<max(f[root][0],f[root][1]);
	return 0;
}
```

### 状态压缩DP

状态压缩动态规划（DP）是一种将状态空间压缩的技术，主要通过位掩码（bitmask）来表示状态，以节省空间并提高计算效率。它通常用于处理有限状态的动态规划问题，比如求解旅行商问题（TSP）或求解子集问题等。

### 状态压缩动态规划常见的应用场景：

1. **子集问题**：对于一个集合，求解所有子集的最优解。
2. **旅行商问题（TSP）** ：求解在给定城市集合中，访问所有城市并返回起点的最短路径。
3. **排列组合问题**：处理大量的排列或组合问题，状态压缩能够帮助减少内存使用。

### 旅行商问题（TSP）示例

假设有 `n`​ 个城市，要求找到一条路径访问所有城市，并返回起点，路径总长度最短。每个城市之间有已知的距离。

**旅行商问题的状态压缩动态规划实现**：

```cpp
#include<bits/stdc++.h>
using namespace std;

const int N = 16;  // 假设最多有15个城市
const int INF = 1e9;

int dist[N][N], dp[1 << N][N];  // dp[i][j] 表示访问了状态 i 的所有城市，最后在城市 j
int n;

int TSP() {
    // 初始化 dp 数组，设置为 INF
    memset(dp, 0x3f, sizeof(dp));  // 将 dp 数组初始化为 INF
    dp[1][0] = 0;  // 从城市 0 开始，只有第 0 城市被访问
  
    // 遍历所有状态
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (mask & (1 << u)) {  // 如果 u 城市已经在状态 mask 中
                for (int v = 0; v < n; v++) {
                    if (!(mask & (1 << v))) {  // 如果 v 城市不在状态 mask 中
                        dp[mask | (1 << v)][v] = min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]);
                    }
                }
            }
        }
    }

    int ans = INF;
    // 找到最短路径，回到起点
    for (int i = 1; i < n; i++) {
        ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0]);
    }

    return ans;
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> dist[i][j];
        }
    }

    cout << TSP() << endl;

    return 0;
}
```

### 代码解释：

1. ​**​`dist[i][j]`​** ​：表示城市 `i`​ 到城市 `j`​ 的距离。
2. ​**​`dp[mask][i]`​** ​：表示当前已经访问过的城市集合为 `mask`​，且当前在城市 `i`​ 时的最短路径。

    * ​`mask`​ 是一个位掩码，用于表示哪些城市已经被访问过。
    * ​`i`​ 是当前的城市，表示在状态 `mask`​ 中，最后一个访问的城市是 `i`​。
3. ​**​`TSP()`​** ​：动态规划函数。我们初始化 `dp[1][0] = 0`​，表示从城市 `0`​ 出发，当前城市为 `0`​，没有任何城市被访问。
4. **状态转移**：遍历每个状态 `mask`​ 和每个城市 `u`​，如果城市 `u`​ 在状态 `mask`​ 中，就尝试访问一个未访问过的城市 `v`​，更新状态 `mask | (1 << v)`​，即表示添加城市 `v`​ 到已访问城市集合中，并且更新路径的长度。
5. **最终结果**：遍历所有城市 `i`​，得到从城市 `i`​ 返回起点的最短路径。

### 时间复杂度：

* 状态空间大小为 `O(2^n * n)`​，即每个状态有 `2^n`​ 种可能，每种状态有 `n`​ 个城市可选择。
* 因此，时间复杂度为 `O(n^2 * 2^n)`​，适用于城市数量较少（例如 `n <= 15`​）的场景。

### 状态压缩常见问题：

1. **最大状态数**：对于每一个状态，我们使用一个位掩码来表示。如果状态数过多（例如 `n`​ 很大），可能会超出内存限制。
2. **位操作**：位操作是核心，尤其是在处理集合时。位运算（如 `mask | (1 << v)`​）允许我们高效地处理状态空间。

    ‍

### 离散化

概念：在一些问题中，我们只关心n个数字之间的相对大小关系，而不关心他们具体是什么，因此我们可以将这n个数映射成1\~n的整数，从而降低规模，通常的实现方法是对所有的数字进行排序，然后再重新遍历一遍所有的数字，通过二分查找法来找到他们的"排名"，然后用排名代替数字。

如我们将9999 1 100 1000进行离散化：

![](https://i-blog.csdnimg.cn/blog_migrate/a4ea470254ab7e4d70dc833a08af4d11.png)

![](https://i-blog.csdnimg.cn/blog_migrate/76aa4f87f0119c657b9d05c8d06367af.png)

#### (1)离散化方法1--map哈希映射离散化后的值(考虑相对大小)，查询离散化后值的时间复杂度O(1)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
#include<vector>
#include<unordered_map>
using namespace std;
unordered_map<int,int> mp;
vector<int> v,h;
int n;

int main()
{
    scanf("%d",&n);
    for(int i=0;i<n;i++)
    {
        int x;
        scanf("%d",&x);
        v.push_back(x);
        h.push_back(x);
    }

    sort(h.begin(),h.end());
    h.erase(unique(h.begin(),h.end()),h.end());

    for(int i=0;i<h.size();i++)
        mp[h[i]]=i+1;
    int x;
    scanf("%d",&x);
    printf("%d",mp[x]);
    return 0;
}
```

#### (2)离散化方法2--二分查找离散化的值(考虑相对大小),查询离散化后的值的时间复杂度O(logn)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
#include<vector>
#include<unordered_map>
using namespace std;
unordered_map<int,int> mp;
vector<int> v,h;
int n;

int find(int x)
{
    int l=0,r=h.size()-1;
    while(l<r)
    {
        int mid=l+r>>1;
        if(h[mid]>=x) r=mid;
        else l=mid+1;
    }
    return l+1;
}

int main()
{
    scanf("%d",&n);
    for(int i=0;i<n;i++)
    {
        int x;
        scanf("%d",&x);
        v.push_back(x);
        h.push_back(x);
    }

    sort(h.begin(),h.end());
    h.erase(unique(h.begin(),h.end()),h.end());
    int x;
    scanf("%d",&x);
    printf("%d",find(x));
    return 0;
}
```

#### (3) 离散化方法3--不需要保序的离散化--unordered\_map

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
#include<unordered_map>
using namespace std;
unordered_map<int,int> h;
int idx;
int x;

int get(int x)
{
    if(h.count(x)==0) h[x]=++idx;
    return h[x];
}

int main()
{
    scanf("%d",&x);
    printf("%d",get(x));
    return 0;
}
```

### Trie

#### 2.8.1Trie字符串统计

维护一个字符串集合，支持两种操作：

I x 向集合中插入一个字符串 x；

Q x 询问一个字符串在集合中出现了多少次。

共有 N个操作，所有输入的字符串总长度不超过 1e5，字符串仅包含小写英文字母。

输入格式

第一行包含整数 N，表示操作数。

接下来 N行，每行包含一个操作指令，指令为 I x 或 Q x 中的一种。

输出格式

对于每个询问指令 Q x，都要输出一个整数作为结果，表示 xx 在集合中出现的次数。

每个结果占一行。

数据范围

1≤N≤2∗1e4

输入样例：

5

I abc

Q abc

Q ab

I ab

Q ab

输出样例：

1

0

1

一.Trie树的原理

1.Trie树的作用

快速地查询某个字符串在集合中出现的次数，高效地存储和查找字符串，时间复杂度可以达到O(n)。

2.实现思路

类似于树的形式，将字符串存储起来，如果存在以某个字符结尾的字符串，我们就进行标记次数，方便查找字符串出现的次数。

我们把小写字母或者大写字母映射成0-25进行创建Trie树。

3.各个变量代表的意思

儿子数组son[p][j]:存储从节点p沿着j这条边走的子节点。边为26个小写的字母(a-z)对应的映射值0-25，每个节点最多可以有26个分支。

例如，son[0][2]\=1,son[1][2]\=0.

计数数组cnt[p]:存储以p结尾字符串出现的次数。

节点编号idx：来给节点进行编号。

二.建Trie树

1.过程

(1)空的Trie树只有一个节点，节点编号为0.

(2)从根开始进行插入，枚举字符串的每个字符，如果有儿子，p 指针走到儿子，如果没有儿子，先创建儿子，p指针再走向儿子。

(3).在单词的结尾记录插入的次数。

2.图解过程

![](https://i-blog.csdnimg.cn/blog_migrate/83270171152366040f4659ff6fe2b727.png)

3.代码展示

```cpp
void insert(char str[])
{
    int p=0;//从根开始遍历
    for(int i=0;str[i];i++)//沿着字符串一直走
    {
        int j=str[i]-'a';//映射成分支
        if(!son[p][j]) son[p][j]=++idx;//如果没有这个节点，创建节点
        p=son[p][j];//令p走向该节点
    }
    cnt[p]++;//记录次字符串出现的次数
}
```

三.查询Trie

1.过程

(1).从根开始查询，对字符串进行扫描。

(2).有字符串str[i]，则走到下一个节点，走到字符串尾，返回插入的次数。

(3).没有字符串str[i],返回0.

2.代码展示

```cpp
int query(char str[])
{
    int p=0;//从根开始
    for(int i=0;str[i];i++)  
    {
        int j=str[i]-'a';
        if(!son[p][j]) return 0;//不存在节点，返回0
        p=son[p][j];
    }
    return cnt[p];//返回字符串的次数
}
```

AC代码

#### 2.8.2最大异或对

在给定的 N个整数 A1，A2……AN中选出两个进行 xor（异或）运算，得到的结果最大是多少？

输入格式

第一行输入一个整数 N。

第二行输入 N个整数 A1～AN。

输出格式

输出一个整数表示答案。

数据范围

1≤N≤1e5,

0≤Ai\<2\^31,

输入样例：

3

1 2 3

输出样例：

3

1.思路

我们首先考虑遍历枚举的方法，然后通过发现某些性质去优化它。

```cpp
int res=0;
for(int i=1;i<=n;i++)
    for(int j=1;j<=n;j++)
        res=max(res,a[i]^a[j]);
cout<<res<<endl;
```

显然暴力的方法为O(n2)，会超时。

我们发现异或(\^)的性质为二进制表示中，两个数某一位进行异或， 相同为0，不同为1，如果二进制100，我们首先考虑011，因为只有不同的位时,得到的值才能最大，我们可以用trie树从高位往低位存储，如果找某一个数的最大值时，我们应该首先考虑它对于二进制某一位不同的值是否存在，如果存在，我们沿着这个分支走到 下一个节点，如果不存在，只能走和他相同的分支。

说明

用Trie存储单词，由26个字母构成的Trie树，是一颗26叉树，26个字母构成分支，深度为最长单词的长度。

用Trie存储整数，由整数的十进制位构成的Trie，是一颗10叉树，0-9个数字构成分支，深度为10层。

用Trie存储整数，由整数的二进制位构成的Trie，是一颗二叉树，0和1构成分支，深度为31层。

2. 图解

![](https://i-blog.csdnimg.cn/blog_migrate/82303ebc225afc41c3e3cb901dca1d01.png)

```cpp
int res=0;
for(int i=1;i<=n;i++)
    for(int j=1;j<=n;j++)
        res=max(res,a[i]^a[j]);
cout<<res<<endl;
```

AC代码

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;
const int N=1e6+10,M=30000000;
int n,a[N],son[M][2],idx;

void insert(int x)//和字典树一样的思路
{
    int p=0;
    for(int i=30;i>=0;i--)//从二进制的最高位开始建树
    {
        int j=x>>i&1;//取出该位置的二进制表示的数
        if(!son[p][j]) son[p][j]=++idx;
        p=son[p][j];
    }
}

int query(int x)
{
    int res=0,p=0;
    for(int i=30;i>=0;i--)
    {
        int j=x>>i&1;
        if(son[p][!j])//如果存在某个节点和x该位置的二进制数不相同的话，说明异或结果为1，加上这一个二进制位对应十进制的数值，让p走到下一个节点
        {
            res+=1<<i;
            p=son[p][!j];
        }
        else p=son[p][j];//否则只能走相等的分支，说明异或结果为0，即res+=0<<i,因为0<<i的结果为0，所有可以省略，p走到下一个节点
    }
    return res;
}

int main()
{
    cin>>n;
    for(int i=0;i<n;i++)
    {
        cin>>a[i];
        insert(a[i]);
    }
    int res=0;
    for(int i=0;i<n;i++)
        res=max(res,query(a[i]));
    cout<<res<<endl;
    return 0;
}
```

### 线段树

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1e5 + 10;
int seg[4 * N], arr[N];

// 建树：构建线段树
void build(int node, int l, int r) {
    if (l == r) {
        seg[node] = arr[l];
    } else {
        int mid = (l + r) / 2;
        build(2 * node, l, mid);
        build(2 * node + 1, mid + 1, r);
        seg[node] = seg[2 * node] + seg[2 * node + 1];  // 区间和
    }
}

// 区间查询：查询区间 [l, r] 的和
int query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;  // 无交集
    if (ql <= l && r <= qr) return seg[node];  // 完全包含
    int mid = (l + r) / 2;
    return query(2 * node, l, mid, ql, qr) + query(2 * node + 1, mid + 1, r, ql, qr);  // 合并结果
}

// 单点更新：更新位置 idx 的值为 val
void update(int node, int l, int r, int idx, int val) {
    if (l == r) {
        arr[idx] = val;
        seg[node] = val;
    } else {
        int mid = (l + r) / 2;
        if (idx <= mid) update(2 * node, l, mid, idx, val);
        else update(2 * node + 1, mid + 1, r, idx, val);
        seg[node] = seg[2 * node] + seg[2 * node + 1];  // 更新当前节点
    }
}

int main() {
    int n, q;
    cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> arr[i];

    build(1, 1, n);  // 初始化线段树

    while (q--) {
        int op;
        cin >> op;
        if (op == 1) {
            int l, r;
            cin >> l >> r;
            cout << query(1, 1, n, l, r) << endl;
        } else if (op == 2) {
            int idx, val;
            cin >> idx >> val;
            update(1, 1, n, idx, val);
        }
    }

    return 0;
}

```

* ​`l`​, `r`​ 表示区间的左右端点。
* ​`node`​ 表示当前线段树节点。
* ​`ql`​, `qr`​ 表示查询区间的左右端点。
* ​`idx`​, `val`​ 表示更新位置和更新的值。

‍

### 最短路问题

![](https://i-blog.csdnimg.cn/blog_migrate/710e2ad24e0e65056eb2752af8e928a6.png)

### 3.6Dijkstra

#### 3.6.1Dijkstra求最短路I

给定一个 n个点 m条边的有向图，图中可能存在重边和自环，所有边权均为正值。

请你求出 1号点到 n号点的最短距离，如果无法从 1号点走到 n号点，则输出 −1。

输入格式

第一行包含整数 n和 m。

接下来 m行每行包含三个整数 x,y,z，表示存在一条从点 x到点 y的有向边，边长为 z。

输出格式

输出一个整数，表示 11 号点到 nn 号点的最短距离。

如果路径不存在，则输出 −1。

数据范围

1≤n≤500,

1≤m≤1e5,

图中涉及边长均不超过10000。

输入样例：

3 3

1 2 2

2 3 1

1 3 4

输出样例：

3

![](https://i-blog.csdnimg.cn/blog_migrate/e2ab2135763858a126a5fcc84e00f445.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;
const int N=1e6+10;
const int M=2*N;

int h[N],e[N],w[N],ne[N],idx;
int g[510][510];
int dist[N];
int n,m;
bool st[N];

void add(int a,int b,int c)
{
    e[idx]=b,w[idx]=c,ne[idx]=h[a],h[a]=idx++;
}

//邻接矩阵法
int dijkstra1()
{
    memset(dist,0x3f,sizeof dist);
    dist[1]=0;
    for(int i=1;i<=n;i++)
    {
        int t=-1;
        for(int j=1;j<=n;j++)
            if(!st[j]&&(t==-1||dist[j]<dist[t])) t=j;
        st[t]=true;
        for(int j=1;j<=n;j++)
            dist[j]=min(dist[j],dist[t]+g[t][j]);
    }
    if(dist[n]==0x3f3f3f3f) return -1;
    return dist[n];
}

//邻接表法
int dijkstra2()
{
    memset(dist,0x3f,sizeof dist);
    dist[1]=0;
    for(int i=1;i<=n;i++)
    {
        int t=-1;
        for(int j=1;j<=n;j++)
            if(!st[j]&&(t==-1||dist[j]<dist[t])) t=j;
        st[t]=true;
        for(int j=h[t];j!=-1;j=ne[j])
        {
            int k=e[j];
            dist[k]=min(dist[k],dist[t]+w[j]);
        }
    }
    if(dist[n]==0x3f3f3f3f) return -1;
    return dist[n];
}
int main()
{
    memset(h,-1,sizeof h);
    memset(g,0x3f,sizeof g);
    cin>>n>>m;
    for(int i=1;i<=m;i++)
    {
        int a,b,c;
        cin>>a>>b>>c;
        g[a][b]=min(g[a][b],c);
        add(a,b,c);
    }
    cout<<dijkstra2();
    return 0;
}
```

#### 3.6.2Dijkstra求最短路II

给定一个 n个点 m条边的有向图，图中可能存在重边和自环，所有边权均为非负值。

请你求出 1号点到 n号点的最短距离，如果无法从 1号点走到 n号点，则输出 −1。

输入格式

第一行包含整数 n和 m。

接下来 m行每行包含三个整数x,y,z，表示存在一条从点 x 到点 y 的有向边，边长为 z。

输出格式

输出一个整数，表示 1号点到 n号点的最短距离。

如果路径不存在，则输出−1。

数据范围

1≤n,m≤1.5×1e5,

图中涉及边长均不小于 0，且不超过10000。

数据保证：如果最短路存在，则最短路的长度不超过 1e9。

输入样例：

3 3

1 2 2

2 3 1

1 3 4

输出样例：

3

用小根堆即可，我们把每次求离起点最近进行了堆优化，可以缩短时间。

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>
#include <queue>//堆的头文件

using namespace std;

typedef pair<int, int> PII;//堆里存储距离和节点编号

const int N = 1e6 + 10;

int n, m;//节点数量和边数
int h[N], w[N], e[N], ne[N], idx;//邻接矩阵存储图
int dist[N];//存储距离
bool st[N];//存储状态

void add(int a, int b, int c)
{
    e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
}

int dijkstra()
{
    memset(dist, 0x3f, sizeof dist);//距离初始化为无穷大
    dist[1] = 0;
    priority_queue<PII, vector<PII>, greater<PII>> heap;//小根堆
    heap.push({0, 1});//插入距离和节点编号

    while (heap.size())
    {
        auto t = heap.top();//取距离源点最近的点
        heap.pop();

        int ver = t.second, distance = t.first;//ver:节点编号，distance:源点距离ver 的距离

        if (st[ver]) continue;//如果距离已经确定，则跳过该点
        st[ver] = true;

        for (int i = h[ver]; i != -1; i = ne[i])//更新ver所指向的节点距离
        {
            int j = e[i];
            if (dist[j] > dist[ver] + w[i])
            {
                dist[j] = dist[ver] + w[i];
                heap.push({dist[j], j});//距离变小，则入堆
            }
        }
    }

    if (dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}

int main()
{
    scanf("%d%d", &n, &m);

    memset(h, -1, sizeof h);
    while (m -- )
    {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        add(a, b, c);
    }

    cout << dijkstra() << endl;

    return 0;
}
```

### 3.7bellman-ford

#### 3.7.1有边数限制的最短路

给定一个 n个点 m条边的有向图，图中可能存在重边和自环， 边权可能为负数。

请你求出从 1号点到 n号点的最多经过 k条边的最短距离，如果无法从 1号点走到 n号点，输出 impossible。

注意：图中可能 存在负权回路 。

输入格式

第一行包含三个整数 n,m,k。

接下来 m行，每行包含三个整数x,y,z，表示存在一条从点 x到点 y的有向边，边长为 z。

点的编号为 1∼n。

输出格式

输出一个整数，表示从 1号点到 n号点的最多经过 k条边的最短距离。

如果不存在满足条件的路径，则输出 impossible。

数据范围

1≤n,k≤500,

1≤m≤10000,

1≤x,y≤n，

任意边长的绝对值不超过10000。

输入样例：

3 3 1

1 2 1

2 3 1

1 3 3

输出样例：

3

思路：

![](https://i-blog.csdnimg.cn/blog_migrate/3d1aba1bb639d2057f8613a2f264550d.png)

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 510, M = 10010;

struct Edge
{
    int a, b, c;
}edges[M];

int n, m, k;
int dist[N];
int last[N];

void bellman_ford()
{
    memset(dist, 0x3f, sizeof dist);

    dist[1] = 0;
    for (int i = 0; i < k; i ++ )
    {
        memcpy(last, dist, sizeof dist);
        for (int j = 0; j < m; j ++ )
        {
            auto e = edges[j];
            dist[e.b] = min(dist[e.b], last[e.a] + e.c);
        }
    }
}

int main()
{
    scanf("%d%d%d", &n, &m, &k);

    for (int i = 0; i < m; i ++ )
    {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        edges[i] = {a, b, c};
    }

    bellman_ford();

    if (dist[n] > 0x3f3f3f3f / 2) puts("impossible");//可能存在负权回路，可能在求最短路径的时候
    //存在负权边，把正无穷相对于原来的正无穷减少，所以要>0x3f3f3f3f/2
    else printf("%d\n", dist[n]);

    return 0;
}
```

### 3.8spfa

#### 3.8.1spfa求最短路

给定一个 n个点 m条边的有向图，图中可能存在重边和自环， 边权可能为负数。

请你求出 1号点到 n号点的最短距离，如果无法从 1号点走到 n号点，则输出 impossible。

数据保证不存在负权回路。

输入格式

第一行包含整数 n和 m。

接下来 m行每行包含三个整数x,y,z，表示存在一条从点 x到点 y的有向边，边长为 z。

输出格式

输出一个整数，表示 1号点到 n号点的最短距离。

如果路径不存在，则输出 impossible。

数据范围

1≤n,m≤1e5,

图中涉及边长绝对值均不超过10000。

输入样例：

3 3

1 2 5

2 3 -3

1 3 4

输出样例：

2

spfa用的最多

![](https://i-blog.csdnimg.cn/blog_migrate/2a78669a2ff389d436d03044ff760b75.png)

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>
#include <queue>

using namespace std;

const int N = 100010;

int n, m;
int h[N], w[N], e[N], ne[N], idx;
int dist[N];
bool st[N];

void add(int a, int b, int c)
{
    e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
}

int spfa()
{
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;

    queue<int> q;
    q.push(1);
    st[1] = true;

    while (q.size())
    {
        int t = q.front();
        q.pop();

        st[t] = false;

        for (int i = h[t]; i != -1; i = ne[i])
        {
            int j = e[i];
            if (dist[j] > dist[t] + w[i])
            {
                dist[j] = dist[t] + w[i];
                if (!st[j])
                {
                    q.push(j);
                    st[j] = true;
                }
            }
        }
    }

    return dist[n];
}

int main()
{
    scanf("%d%d", &n, &m);

    memset(h, -1, sizeof h);

    while (m -- )
    {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        add(a, b, c);
    }

    int t = spfa();

    if (t == 0x3f3f3f3f) puts("impossible");
    else printf("%d\n", t);

    return 0;
}
```

#### 3.8.2spfa判断负环

给定一个 n个点 m条边的有向图，图中可能存在重边和自环， 边权可能为负数。

请你判断图中是否存在负权回路。

输入格式

第一行包含整数 n和 m。

接下来 m行每行包含三个整数 x,y,z，表示存在一条从点 x到点 y的有向边，边长为 z。

输出格式

如果图中存在负权回路，则输出 Yes，否则输出 No。

数据范围

1≤n≤2000,

1≤m≤10000,

图中涉及边长绝对值均不超过 10000。

输入样例：

3 3

1 2 -1

2 3 4

3 1 -4

输出样例：

Yes

![](https://i-blog.csdnimg.cn/blog_migrate/ff75967090f174750da296d2e606251b.png)

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>
#include <queue>

using namespace std;

const int N = 2010, M = 10010;

int n, m;
int h[N], w[M], e[M], ne[M], idx;
int dist[N], cnt[N];
bool st[N];

void add(int a, int b, int c)
{
    e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
}

bool spfa()
{
    queue<int> q;

    for (int i = 1; i <= n; i ++ )
    {
        st[i] = true;
        q.push(i);
    }

    while (q.size())
    {
        int t = q.front();
        q.pop();

        st[t] = false;

        for (int i = h[t]; i != -1; i = ne[i])
        {
            int j = e[i];
            if (dist[j] > dist[t] + w[i])
            {
                dist[j] = dist[t] + w[i];
                cnt[j] = cnt[t] + 1;

                if (cnt[j] >= n) return true;
                if (!st[j])
                {
                    q.push(j);
                    st[j] = true;
                }
            }
        }
    }

    return false;
}

int main()
{
    scanf("%d%d", &n, &m);

    memset(h, -1, sizeof h);

    while (m -- )
    {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        add(a, b, c);
    }

    if (spfa()) puts("Yes");
    else puts("No");

    return 0;
}
```

### 3.9Floyd

#### 3.9.1Floyd求最短路

给定一个 n个点 m条边的有向图，图中可能存在重边和自环，边权可能为负数。

再给定 k个询问，每个询问包含两个整数 x 和 y，表示查询从点 x到点 y的最短距离，如果路径不存在，则输出 impossible。

数据保证图中不存在负权回路。

输入格式

第一行包含三个整数 n,m,k。

接下来 m行，每行包含三个整数x,y,z，表示存在一条从点 x到点 y的有向边，边长为 z。

接下来 k 行，每行包含两个整数 x,y，表示询问点 x到点 y的最短距离。

输出格式

共 k行，每行输出一个整数，表示询问的结果，若询问两点间不存在路径，则输出 impossible。

数据范围

1≤n≤200,

1≤k≤n2

1≤m≤20000,

图中涉及边长绝对值均不超过10000。

输入样例：

3 3 2

1 2 1

2 3 2

1 3 1

2 1

1 3

输出样例：

impossible

1

多源汇最短路

![](https://i-blog.csdnimg.cn/blog_migrate/6c12dce82dd974e3fbd4adbf290934e0.png)

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<cstdio>
using namespace std;

const int N = 210, INF = 1e9;

int n, m, Q;
int d[N][N];

void floyd()
{
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
}

int main()
{
    scanf("%d%d%d", &n, &m, &Q);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (i == j) d[i][j] = 0;
            else d[i][j] = INF;
    while (m--)
    {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        d[a][b] = min(d[a][b], c);
    }
    floyd();
    while (Q--)
    {
        int a, b;
        scanf("%d%d", &a, &b);
        int t = d[a][b];
        if (t > INF / 2) puts("impossible");
        else printf("%d\n", t);
    }
    return 0;
}
```

---

### 二叉树

```cpp
#include<bits/stdc++.h>
using namespace std;

const int N = 1e5;
int lson[N], rson[N], val[N];
int tot; // 当前节点总数

// 创建新节点
int newNode(int x) {
    val[tot] = x;
    lson[tot] = rson[tot] = -1; // 初始化左右子节点为空
    return tot++; // 返回新节点编号
}

// 插入节点
void insert(int& root, int x) {
    if (root == -1) { // 如果树为空，则创建新节点
        root = newNode(x);
        return;
    }
    // 根据值大小插入左右子树
    if (x < val[root]) insert(lson[root], x);
    else insert(rson[root], x);
}

// 中序遍历树
void inorder(int root) {
    if (root == -1) return; // 如果节点为空，直接返回
    inorder(lson[root]); // 递归遍历左子树
    printf("%d ", val[root]); // 输出当前节点值
    inorder(rson[root]); // 递归遍历右子树
}

int main() {
    ios::sync_with_stdio(0); cin.tie(0); // 提高输入输出效率
    int root = -1; // 初始化树为空
    insert(root, 10);
    insert(root, 20);
    insert(root, 5);
    insert(root, 15);
  
    inorder(root); // 输出中序遍历结果
    puts("");
  
    return 0;
}

```

**C++ 标准模板库 (STL, Standard Template Library)**

‍

# 2 常用容器

## 2.2 向量 [vector]

​ **​`#include <vector>`​** ​

### 2.2.1 常用方法

#### 构造

​**​`vector<类型> arr(长度, [初值])`​** ​.

```cpp
vector<int> arr;         // 构造int数组
vector<int> arr(100);    // 构造初始长100的int数组
vector<int> arr(100, 1); // 构造初始长100的int数组，初值为1

vector<vector<int>> mat(100, vector<int> ());       // 构造初始100行，不指定列数的二维数组
vector<vector<int>> mat(100, vector<int> (666, -1)) // 构造初始100行，初始666列的二维数组，初值为-1
```

#### 尾接 & 尾删

* ​ **​`.push_back(元素)`​** ​：在 vector 尾接一个元素，数组长度 $+1$.
* ​ **​`.pop_back()`​** ​：删除 vector 尾部的一个元素，数组长度 $-1$

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

​ **​`.clear()`​** ​

清空 vector

#### 判空

​ **​`.empty()`​** ​

如果是空返回 `true`​ 反之返回 `false`​.

时间复杂度：$O(1)$

#### 改变长度

​ **​`.resize(新长度, [默认值])`​** ​

修改 vector 的长度

* 如果是缩短，则删除多余的值
* 如果是扩大，且指定了默认值，则新元素均为默认值 **（旧元素不变）**

时间复杂度：$O(n)$

### 2.2.2 适用情形

一般情况 `vector`​ 可以替换掉普通数组，除非该题卡常。

有些情况普通数组没法解决：$n\times m$ 的矩阵，$1\leq n,m\leq 10^6$ 且 $n\times m \leq 10^6$

* 如果用普通数组 `int mat[1000010][1000010]`​，浪费内存，会导致 MLE。
* 如果使用 `vector<vector<int>> mat(n + 10, vector<int> (m + 10))`​，完美解决该问题。

另外，`vector`​ 的数据储存在堆空间中，不会爆栈。

### 2.2.3 注意事项

#### 提前指定长度

如果长度已经确定，那么应当直接在构造函数指定长度，而不是一个一个 `.push_back()`​. 因为 `vector`​ 额外内存耗尽后的重分配是有时间开销的，直接指定长度就不会出现重分配了。

#### 当心 size_t 溢出

vector 获取长度的方法 `.size()`​ 返回值类型为 `size_t`​，通常 OJ 平台使用的是 32 位编译器（有些平台例如 cf 可选 64 位），那么该类型范围为 $[0,2^{32})$.

```cpp
vector<int> a(65536);
long long a = a.size() * a.size(); // 直接溢出变成0了
```

## 2.3 栈 [stack]

​ **​`#include <stack>`​** ​

通过二次封装双端队列 (deque) 容器，实现先进后出的栈数据结构。

### 2.3.1 常用方法

|作用|用法|示例|
| ------------------------| ------| ------|
|构造|​`stack<类型> stk`​|​`stack<int> stk;`​|
|进栈|​`.push(元素)`​|​`stk.push(1);`​|
|出栈|​`.pop()`​|​`stk.pop();`​|
|取栈顶|​`.top()`​|​`int a = stk.top();`​|
|查看大小 / 清空 / 判空|略|略|

### 2.3.2 适用情形

如果不卡常的话，就可以直接用它而不需要手写栈了。

另外，vector 也可以当栈用，vector 的 `.back()`​ 取尾部元素，就相当于取栈顶，`.push_back()`​ 相当于进栈，`.pop_back()`​ 相当于出栈。

### 2.3.3 注意事项

#### 不可访问内部元素！(cout<<)

## 2.4 队列 [queue]

​ **​`#include <queue>`​** ​

通过二次封装双端队列 (deque) 容器，实现先进先出的队列数据结构。

### 2.4.1 常用方法

|作用|用法|示例|
| ------------------------| ------| ------|
|构造|​`queue<类型> que`​|​`queue<int> que;`​|
|进队|​`.push(元素)`​|​`que.push(1);`​|
|出队|​`.pop()`​|​`que.pop();`​|
|取队首|​`.front()`​|​`int a = que.front();`​|
|取队尾|​`.back()`​|​`int a = que.back();`​|
|查看大小 / 清空 / 判空|略|略|

### 2.4.2 适用情形

如果不卡常的话，就可以直接用它而不需要手写队列了。

### 2.4.3 注意事项

#### 不可访问内部元素！

## 2.5 优先队列 [priority_queue]

​ **​`#include <queue>`​** ​

提供常数时间的最大元素查找，对数时间的插入与提取，底层原理是二叉堆。

### 2.5.1 常用方法

#### 构造

​**​`priority_queue<类型, 容器, 比较器> pque`​**​

* 类型：要储存的数据类型
* 容器：储存数据的底层容器，默认为 `vector<类型>`​，竞赛中保持默认即可
* 比较器：比较大小使用的比较器，默认为 `less<类型>`​，可自定义

```cpp
priority_queue<int> pque1;                            // 储存int的大顶堆
priority_queue<int, vector<int>, greater<int>> pque2; // 储存int的小顶堆
```

#### 其他

|作用|用法|示例|
| -----------------| ------| ------|
|进堆|​`.push(元素)`​|​`que.push(1);`​|
|出堆|​`.pop()`​|​`que.pop();`​|
|取堆顶|​`.top()`​|​`int a = que.top();`​|
|查看大小 / 判空|略|略|

进出队复杂度 $O(\log n)$，取堆顶 $O(1)$.

### 2.5.2 适用情形

持续维护元素的有序性：每次向队列插入大小不定的元素，或者每次从队列里取出大小最小/最大的元素，元素数量 $n$，插入操作数量 $k$.

* 每次插入后进行快速排序：$k\cdot n\log n$
* 使用优先队列维护：$k\cdot\log n$

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

​ **​`#include <set>`​** ​

提供对数时间的插入、删除、查找的集合数据结构。底层原理是红黑树。

|集合三要素|解释|set|multiset|unordered_set|
| ------------| --------------------------------| ----------------| ----------------| ---------------|
|确定性|一个元素要么在集合中，要么不在|✔|✔|✔|
|互异性|一个元素仅可以在集合中出现一次|✔|❌（任意次）|✔|
|无序性|集合中的元素是没有顺序的|❌（从小到大）|❌（从小到大）|✔|

### 2.6.1 常用方法

#### 构造

​**​`set<类型, 比较器> st`​**​

* 类型：要储存的数据类型
* 比较器：比较大小使用的比较器，默认为 `less<类型>`​，可自定义

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
| ------------------------| ------| ------|
|插入元素|​`.insert(元素)`​|​`st.insert(1);`​|
|删除元素|​`.erase(元素)`​|​`st.erase(2);`​|
|查找元素|​`.find(元素)`​|​`auto it = st.find(1);`​|
|判断元素是否存在|​`.count(元素)`​|​`st.count(3);`​|
|查看大小 / 清空 / 判空|略|略|

增删查时间复杂度均为 $O(\log n)$

### 2.6.2 适用情形

* 元素去重：$[1,1,3,2,4,4]\to[1,2,3,4]$
* 维护顺序：$[1,5,3,7,9]\to[1,3,5,7,9]$
* 元素是否出现过：元素大小 $[-10^{18},10^{18}]$，元素数量 $10^6$，vis 数组无法实现，通过 set 可以完成。

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

​ **​`#include`​**​

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
| --------| ------------------------------| ----------------| ----------------| ---------------|
|互异性|一个键仅可以在映射中出现一次|✔|❌（任意次）|✔|
|无序性|键是没有顺序的|❌（从小到大）|❌（从小到大）|✔|

### 2.7.1 常用方法

#### 构造

​**​`map<键类型, 值类型, 比较器> mp`​**​

* 键类型：要储存键的数据类型
* 值类型：要储存值的数据类型
* 比较器：键比较大小使用的比较器，默认为 `less<类型>`​，可自定义

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
#include
using namespace std;

int main() {
	map
```

```cpp
#include 
using namespace std;

int main() {
    map
```

#### 其他

|作用|用法|示例|
| ------------------------| --------| ------|
|增 / 改 / 查元素|中括号|​`mp[1] = 2;`​|
|查元素（返回迭代器）|​`.find(元素)`​|​`auto it = mp.find(1);`​|
|删除元素|​`.erase(元素)`​|​`mp.erase(2);`​|
|判断元素是否存在|​`.count(元素)`​|​`mp.count(3);`​|
|查看大小 / 清空 / 判空|略|略|

增删改查时间复杂度均为 $O(\log n)$

### 2.7.2 适用情形

需要维护映射的场景可以使用：输入若干字符串，统计每种字符串的出现次数。(`map`​)

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

### **​`unordered_map`​**​ **简介**

​`unordered_map`​ 是 C++ STL 提供的一种哈希表容器，用于存储键值对（Key-Value Pair），其中：

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

​ **​`#include`​**​

顾名思义，就是储存字符串的。

### 2.8.1 常用方法

#### 构造

构造函数：`string(长度, 初值)`​

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
| ------------------------| ------| ------|
|修改、查询指定下标字符|​`[]`​|​`s[1] = 'a';`​|
|是否相同|​`==`​|​`if (s1 == s2) ...`​|
|字符串连接|​`+`​|​`string s = s1 + s2;`​|
|尾接字符串|​`+=`​|​`s += "awa";`​|
|取子串|​`.substr(起始下标, 子串长度)`​|​`string sub = s.substr(2, 10);`​|
|查找字符串|​`.find(字符串, 起始下标)`​|​`int pos = s.find("awa");`​|

#### 数值与字符串互转（C++11）

|源|目的|函数|
| ------------------------------------------------| -------------| -------------|
|int / long long / float / double / long double|string|to_string()|
|string|int|stoi()|
|string|long long|stoll()|
|string|float|stof()|
|string|double|stod()|
|string|long double|stold()|

### 2.8.3 注意事项

#### 尾接字符串一定要用 `+=`​

string 的 += 运算符，将会在原字符串原地尾接字符串。而 + 了再 = 赋值，会先生成一个临时变量，在复制给 string.

通常字符串长度可以很长，如果使用 + 字符串很容易就 TLE 了。

#### `.substr()`​ 方法的奇葩参数

一定要注意，C++ string 的取子串的第一个参数是**子串起点下标**，第二个参数是**子串长度**。

第二个参数不是子串终点！不是子串终点！要与 java 等其他语言区分开来。

#### `.find()`​ 方法的复杂度

该方法实现为暴力实现，时间复杂度为 $O(n^2)$.

## 2.9 二元组 [pair]

​ **​`#include`​**​

顾名思义，就是储存二元组的。

### 2.9.1 常用方法

#### 构造

​**​`pair<第一个值类型, 第二个值类型> pr`​**​

* 第一个值类型：要储存的第一个值的数据类型
* 第二个值类型：要储存的第二个值的数据类型

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

* 取第一个值：`.first`​
* 取第二个值：`.second`​

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

直接用 `==`​ 运算符

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

*是取出迭代器代表的值，然后prev(it)可以指it前一个迭代器。
```

* ​`a.begin()`​ 是一个迭代器，指向的是第一个元素
* ​`a.end()`​ 是一个迭代器，指向的是最后一个元素**再后面一位**
* 上述迭代器具有自增运算符，自增则迭代器向下一个元素移动
* 迭代器与指针相似，如果对它使用解引用运算符，即 `*it`​，就能取到对应值了

通过迭代器，我们就能遍历 set 中的元素了：

```cpp
for (set<int>::iterator it = st.begin(); it != st.end(); ++it)
    cout << *it << endl;
```

## 3.3 迭代器用法

对于 vector 容器，它的迭代器功能比较完整，以它举例：

* ​`.begin()`​：头迭代器
* ​`.end()`​：尾迭代器
* ​`.rbegin()`​：反向头迭代器
* ​`.rend()`​：反向尾迭代器
* 迭代器 `+`​ 整型：将迭代器向后移动
* 迭代器 `-`​ 整型：将迭代器向前移动
* 迭代器 `++`​：将迭代器向后移动 1 位
* 迭代器 `--`​：将迭代器向前移动 1 位
* 迭代器 `-`​ 迭代器：两个迭代器的距离
* ​`prev(it)`​：返回 it 的前一个迭代器
* ​`next(it)`​：返回 it 的后一个迭代器

对于其他容器，由于其结构特性，上面的功能不一定都有（例如 set 的迭代器是不能相减求距离的）

## 3.4 常见问题

​ **​`.end()`​** ​ **和**  **​`.rend()`​** ​ **指向的位置是无意义的值**

对于一个长度为 10 的数组：`for (int i = 0; i < 10; i++)`​，第 10 位是不可访问的

对于一个长度为 10 的容器：`for (auto it = a.begin(); it != a.end(); ++it)`​，.end 是不可访问的

**不同容器的迭代器功能可能不一样**

迭代器细化的话有正向、反向、双向，每个容器的迭代器支持的运算符也可能不同，因此不同容器的迭代器细节很有可能是不一样的。

**删除操作时需要警惕**

<div>
<center><b>建议：如无必要，别用迭代器操作容器。（遍历与访问没关系）</b></center>
</div>

# 4 常用算法

## 4.4 `lower_bound()`​ / `upper_bound()`​

在**已升序排序**的元素中，应用二分查找检索指定元素，返回对应元素迭代器位置。**找不到则返回尾迭代器。**

* ​`lower_bound()`​: 寻找 $\geq x$ 的第一个元素的位置
* ​`upper_bound()`​: 寻找 $>x$ 的第一个元素的位置

怎么找 $\leq x$ / $< x$ 的第一个元素呢？

* $>x$ 的第一个元素的前一个元素（如果有）便是 $\leq x$ 的第一个元素
* $\geq x$ 的第一个元素的前一个元素（如果有）便是 $<x$ 的第一个元素

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

## 4.5 `reverse()`​

反转一个可迭代对象的元素顺序

**用法示例**

```cpp
vector<int> arr(10);
iota(arr.begin(), arr.end(), 1);
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
reverse(arr.begin(), arr.end());
// 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

## 4.6 `max()`​ / `min()`​

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

## 4.7 `unique()`​

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

所有函数参数均支持 `int`​ / `long long`​ / `float`​ / `double`​ / `long double`​

|公式|示例|
| ------| ------|
|$f(x)=\lvert x\rvert$|​`abs(-1.0)`​|
|$f(x)=e^x$|​`exp(2)`​|
|$f(x)=\ln x$|​`log(3)`​|
|$f(x,y)=x^y$|​`pow(2, 3)`​|
|$f(x)=\sqrt x$|​`sqrt(2)`​|
|$f(x)=\lceil x\rceil$|​`ceil(2.1)`​|
|$f(x)=\lfloor x\rfloor$|​`floor(2.1)`​|
|$f(x)=\left<x\right>$|​`rount(2.1)`​|

**注意事项**

由于浮点误差，有些的数学函数的行为可能与预期不符，导致 WA。如果你的操作数都是整型，那么用下面的写法会更稳妥。

* $\lfloor\frac{a}{b}\rfloor$

  * 别用：`floor(1.0 * a / b)`​
  * 要用：`a / b`​
* $\lceil\frac{a}{b}\rceil$

  * 别用：`ceil(1.0 * a / b)`​
  * 要用：`(a + b - 1) / b`​  （$\lceil\frac{a}{b}\rceil=\lfloor\frac{a+b-1}{b}\rfloor$）
* $\lfloor\sqrt a\rfloor$

  * 别用：`(int) sqrt(a)`​
  * 要用：二分查找
* $a^b$

  * 别用：`pow(a, b)`​
  * 要用：快速幂 https://io.zouht.com/18.html
* $\lfloor\log_2 a\rfloor$

  * 别用：`log2(a)`​
  * 要用：`__lg`​ （不规范，但是这是竞赛）/ `bit_width`​（C++20 可用）

## 4.9 `gcd()`​ / `lcm()`​

（C++17）返回最大公因数 / 最小公倍数

```cpp
int x = gcd(8, 12); // 4
int y = lcm(8, 12); // 24
```

如果不是 C++17，但是是 GNU 编译器（g++），那么可以用内置函数 `__gcd()`​.

当然，`gcd`​ / `lcm`​ 函数也挺好写，直接写也行（欧几里得算法）：

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

set<int, cmp> s;//采用自定义的cmp比较规则
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

pq.emplace(people[j].r, people[j].idx);等效于pq.push(make_pair(people[j].r, people[j].idx));
在优先队列 pq 中，直接构造一个 pair(r, idx) 对象，

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

##### 若取模时,因为可能是负数取模影响正确性,常采取加模再取模的方式.

‍

###### 小根堆重载为大根堆

```cpp
struct node {
    int x;
    double val;
    bool operator <(const node &a)const{
	return val>a.val;
	}
};

 priority_queue<node> qu;
```

‍
