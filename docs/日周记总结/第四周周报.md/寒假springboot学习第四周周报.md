# 第四周周报

```cpp
继上周敲完黑马“大事件”项目后端部分后，这周学习目标主要是挑着看黑马“SSM框架”和“javaweb”的视频来补基础。
```

‍

### Day 1

1.学习了web网站的工作流程和javaweb的开发流程。

2.继续深入学习了maven(之前在springboot项目周报学过大部分)。

3.学习复习了java开发中常用注解及其使用场景。

4.复习了javase。

‍

![屏幕截图 2025-02-10 120121](assets/屏幕截图%202025-02-10%20120121-20250210120141-9vlqxnn.png)

![屏幕截图 2025-02-10 123516](assets/屏幕截图%202025-02-10%20123516-20250210123603-09ulr2o.png)

![屏幕截图 2025-02-10 124027](assets/屏幕截图%202025-02-10%20124027-20250210124855-84qjcze.png)

![屏幕截图 2025-02-10 124727](assets/屏幕截图%202025-02-10%20124727-20250210124914-jk9m546.png)

![屏幕截图 2025-02-10 130226](assets/屏幕截图%202025-02-10%20130226-20250210130236-b3j9yzd.png)

![屏幕截图 2025-02-10 130434](assets/屏幕截图%202025-02-10%20130434-20250210130443-8vnshc0.png)

‍

---

### Day 2

1.学习了http协议。

2.学习了tomcat。

![屏幕截图 2025-02-11 132459](assets/屏幕截图%202025-02-11%20132459-20250211134417-4t7ntbc.png)![屏幕截图 2025-02-11 133507](assets/屏幕截图%202025-02-11%20133507-20250211134423-x9y95jl.png)

![屏幕截图 2025-02-11 141201](assets/屏幕截图%202025-02-11%20141201-20250211142543-jqswupc.png)![屏幕截图 2025-02-11 142238](assets/屏幕截图%202025-02-11%20142238-20250211142547-wmvnd7b.png)

---

### Day 3

1.学习了请求响应。

2.学习了分层解耦。

![屏幕截图 2025-02-12 145255](assets/屏幕截图%202025-02-12%20145255-20250212151500-w3kq0jb.png)![屏幕截图 2025-02-12 150740](assets/屏幕截图%202025-02-12%20150740-20250212151510-5uazqy4.png)![屏幕截图 2025-02-12 151206](assets/屏幕截图%202025-02-12%20151206-20250212151516-4f39639.png)

```cpp
package itheima.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//统一响应结果
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Result<T> {
    private Integer code;//业务状态码  0-成功  1-失败
    private String message;//提示信息
    private T data;//响应数据

    //快速返回操作成功响应结果(带响应数据)
    public static <E> Result<E> success(E data) {
        return new Result<>(0, "操作成功", data);
    }

    //快速返回操作成功响应结果
    public static Result success() {
        return new Result(0, "操作成功", null);
    }

    public static Result error(String message) {
        return new Result(1, message, null);
    }
}

```

![屏幕截图 2025-02-12 152521](assets/屏幕截图%202025-02-12%20152521-20250212152529-2iwwme4.png)

![屏幕截图 2025-02-12 162954](assets/屏幕截图%202025-02-12%20162954-20250212163003-m1qxoo1.png)

![屏幕截图 2025-02-12 165320](assets/屏幕截图%202025-02-12%20165320-20250212165443-u33183t.png)

![屏幕截图 2025-02-12 163858](assets/屏幕截图%202025-02-12%20163858-20250212165457-lvnz759.png)

### Day 4

休息。

---

### Day 5

休息

---

### Day 6

1.学习了mysql--索引。

2.学习了mybatis-入门。

![屏幕截图 2025-02-16 153429](assets/屏幕截图%202025-02-16%20153429-20250216154919-ltnpmya.png)

![屏幕截图 2025-02-16 154905](assets/屏幕截图%202025-02-16%20154905-20250216154925-qn1ehh7.png)

```cpp
package com.itheima.mapper;

import com.itheima.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper //在运行时,会自动生成该接口的实现类对象(代理对象), 并且将该对象交给IOC容器管理
public interface UserMapper {

    //查询全部用户信息
    @Select("select * from user")
    public List<User> list();

}

```

```cpp
package com.itheima;

import com.itheima.mapper.UserMapper;
import com.itheima.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest //springboot整合单元测试的注解
class SpringbootMybatisQuickstartApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testListUser(){
        List<User> userList = userMapper.list();
        userList.stream().forEach(user -> {
            System.out.println(user);
        });
    }

    @Test
    public void testJdbc() throws Exception {
        //1. 注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");

        //2. 获取连接对象
        String url = "jdbc:mysql://localhost:3306/mybatis";
        String username = "root";
        String password = "1234";
        Connection connection = DriverManager.getConnection(url, username, password);

        //3. 获取执行SQL的对象Statement,执行SQL,返回结果
        String sql = "select * from user";
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(sql);

        //4. 封装结果数据
        List<User> userList = new ArrayList<>();
        while (resultSet.next()){
            int id = resultSet.getInt("id");
            String name = resultSet.getString("name");
            short age = resultSet.getShort("age");
            short gender = resultSet.getShort("gender");
            String phone = resultSet.getString("phone");

            User user = new User(id,name,age,gender,phone);
            userList.add(user);
        }

        //5. 释放资源
        statement.close();
        connection.close();
    }
}

```

![屏幕截图 2025-02-16 163200](assets/屏幕截图%202025-02-16%20163200-20250216163233-z8hpf9k.png)

![屏幕截图 2025-02-16 163350](assets/屏幕截图%202025-02-16%20163350-20250216163404-4f37kdr.png)

![屏幕截图 2025-02-16 163920](assets/屏幕截图%202025-02-16%20163920-20250216163928-9i26ini.png)

---

‍
