# 牛客周赛 Round 93题解（个人向A-E）

题目链接：<https://ac.nowcoder.com/acm/contest/109904>

### a题

签到题，直接按题意模拟即可

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
int main()
{
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);
  int n;
  cin>>n;
  long long a = pow(2,n);
  ll b = n*n*n;
  if(a<b){
  	cout<<'A';
  }else{
  	cout<<'B';
  }
  
  return 0;
}
```

### b题

同样是简单的模拟字符串题目，可以用substr取子串，然后注意判断完美对称的条件不要漏了就行

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

bool dc(string ss){
	if(ss[0]==ss[2]&&ss[2]==ss[4]){
		if(ss[1]==ss[3]){
			if(ss[0]!=ss[1]){
			
			return true;
		}
		}
	}
	return false;
}
int main()
{
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);
  string s;
  cin>>s;
  
  int le = s.size();
  ll sum = 0;
  
  for(int i = 0;i+4<=le-1;i++){
  	string ss = s.substr(i,5);
  	bool as = dc(ss);
  	if(as){
  		sum++;
	  }
  }
  
  
  cout<<sum<<endl;
  return 0;
}
```

### c题

我看的第一反应是dfs，但是看复杂度显然不可能，然后想到是不是类似今年蓝桥杯的那个连通器问题，不过马上就排除了，先按模拟思路分情况讨论了以下，马上就可以看出是思维题，要么不放障碍，要放也只可能放一个，因为只有两行，多放影响一个必然也影响另一个，没有意义。只需要考虑两人的相对位置就行，终点前需特判一下。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
const int N = 1e5+10;
int a[2][N];
int main()
{
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);
  int b;
  int n;
  cin>>n;
  int x1,y1;
  int x2,y2;
  cin>>x1>>y1;
  cin>>x2>>y2;
  int bo = 0;//-1 no  1  yes
  if(x1==x2&&y1==y2){
  	bo = 1;
  }
  if(x1==x2&&y1!=y2){
  	bo = -1;
  }
  if(x1!=x2&&y1==y2){
  	bo = -1;
  }
  if(x1!=x2&&y1!=y2){
  	if((x1==x2-1&&y1 == y2+1)||(x1==x2+1&&y1 == y2-1)){
  		bo = 1;
	  }else if((x2 == x1+1&&y2 ==y1+1)||(x1 == x2+1&&y1 ==y2+1)){
	  	if(y1!=n-1&&y2!=n-1){
	  		bo = 1;
		  }
	  }
  	
  }
  
  if(bo==-1||bo == 0){
  	cout<<"NO";
  }else if(bo==1){
  	cout<<"YES";
  }
  
  return 0;
}
```

### d题

思维题，既然确定处理k次，那处理后的数组长度是确定的，比较字典序只需要让第一个数最大就行。（假设处理后的数组是以第二个数字作为基底的，那么移开a[1]需要1个代价，那么肯定不如累加在a[2]上，那么此操作应该与a[2]加到a[1]上。如果有许多这样相同的数，那么优先累加最靠近数组尾部的数。把这个命题反向思考易得。

需要注意数据范围，对第一个数一直加可能会爆int。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
const int N = 2e5+10;
ll f;
ll a;
ll c[N];
int main()
{
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);
  ll T;
  cin>>T;
  while(T--){
  	int n,k;
  	cin>>n>>k;
  	memset(c, 0, sizeof c);
  	priority_queue<ll>pq;
  //	priority_queue<int>().swap(pq); 
  	for(int i = 1;i<=n;i++){
  		if(i==1){
  			cin>>f;
  			c[i] = f;
		  }else{
		  	cin>>a;
		  	c[i] = a;
		  	pq.push(a);
		  }
	  }
	  for(int i = 1;i<=k;i++){
	  	ll b = pq.top();
	  	for(int j = n;j>=1;j--){//记录用掉的数字，反向遍历，相同的数有多个，优先用后面的
	  		if(c[j]==b){
	  			c[j] = -1;
	  			break;
			  }
		  }
	  	pq.pop();
	  	f+=b;
	  }
	  ll s = n-k;
	  c[1] = f; 
	  ll as = 0;
	  for(int i = 1;i<=n;i++){
	  	if(c[i]!=-1){
	  		cout<<c[i]<<" ";
	  		as++;
		  }
		  if(as==s){
		  	break;
		  }
		  //cout<<" ";
	  }
	  cout<<endl;
  }
  
  return 0;
}
```

### e题

这题也不好想，根据复杂度直接模拟暴力显然不可能，正解是根据mex分类讨论，mex如果等于0，那集合内数字必然全部相等，直接算它的非空子集就行，有t个元素，公式2 的t次方-1。如果mex不为零，那么最小值肯定是0，要想满足mex大于最大值，那么数字序列必须是连续的，而且集合内的数字必然只能存在[0, mex-1]区间的数字。以每个数字可以产生的方案数为元素进行计算即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int mod=1e9+7;
const int N=1e6+1000;
long long net[N];
int a[N];

long long qmi(long long a, long long b, long long m) {
  a %= m;
  long long res = 1;
  while (b > 0) {
    if (b & 1) res = res * a % m;
    a = a * a % m;
    b >>= 1;
  }
  return res;
}

int cal(int x){
    return qmi(2, x, mod)-1;
}

int main()
{
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);
  
	int n;
    cin>>n;
    int maxn=0;
    for(int i=1; i<=n; ++i){
        cin>>a[i];
        net[a[i]]++;
        maxn=max(maxn, a[i]);
    }
 
    for(int i=0; i<=maxn; ++i)net[i]=cal(net[i]);
    long long ans=0;
    for(int i=1; i<=maxn; ++i){
        ans+=net[i];
        ans%=mod;
    }
         
    for(int i=1; i<=n; ++i){
        net[i]*=net[i-1];
        net[i]%=mod;
    }
     
    for(int i=0; i<=maxn; ++i){
        ans+=net[i];
        ans%=mod;
    }
    cout<<ans<<endl;
  
  return 0;
}
```

‍

‍
