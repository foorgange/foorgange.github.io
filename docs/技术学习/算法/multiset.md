# multiset

## 常用操作总结

|操作|语法|复杂度|说明|
| ------------| ------| --------| ------------------------|
|插入|​`ms.insert(x)`​|​`O(log n)`​|插入元素，自动排序|
|删除一个|​`ms.erase(ms.find(x))`​|​`O(log n)`​|删除一个匹配的迭代器|
|删除所有`x`​|​`ms.erase(x)`​|​`O(log n + count)`​|删除所有等于`x`​的元素|
|查找|​`ms.find(x)`​|​`O(log n)`​|返回指向某个`x`​的迭代器|
|统计|​`ms.count(x)`​|​`O(log n)`​|统计等于`x`​的元素个数|
|最小值|​`*ms.begin()`​|​`O(1)`​|获取最小元素|
|最大值|​`*prev(ms.end())`​|​`O(1)`​|获取最大元素|

```cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
    multiset<int> ms = {1, 2, 2, 3, 4};

    // 显示原始内容
    cout << "原始 multiset：";
    for (int x : ms) cout << x << " ";
    cout << endl;

    // 查找元素 2
    auto it = ms.find(2);  // 返回第一个等于 2 的迭代器

    if (it != ms.end()) {
        cout << "找到一个2，准备删除它。" << endl;
        ms.erase(it);  // 只删掉一个 2（注意不是所有）
    } else {
        cout << "没找到 2" << endl;
    }

    // 显示删除后的内容
    cout << "删除一个 2 后的 multiset：";
    for (int x : ms) cout << x << " ";
    cout << endl;

    return 0;
}

```
