# 第一周周报

---

Day 1

1.完成了Mysql的安装和环境配置，完成了Datagrip的安装。

2.学习了DDL语句，对数据库和表进行操作

3.学习了DML语句。

4.学习了用Datagrip对数据库进行可视化操作。

5.学习了mysql的数据类型。

![屏幕截图 2025-01-14 110246](assets/屏幕截图%202025-01-14%20110246-20250114110713-71i9tsn.png)

![屏幕截图 2025-01-14 110644](assets/屏幕截图%202025-01-14%20110644-20250114110721-skgmqze.png)

-- ddl（数据定义语言）

1. create table users (id int primary key, name varchar(50), age int); // 创建名为 users 的表，包含 id、name 和 age 字段
2. alter table users add email varchar(100); // 在 users 表中添加 email 字段
3. drop table users; // 删除名为 users 的表
4. create index idx_users_name on users(name); // 为 users 表的 name 字段创建索引
5. drop index idx_users_name; // 删除名为 idx_users_name 的索引
6. create view user_view as select name, age from users; // 创建视图 user_view，用于查询 name 和 age 字段
7. drop view user_view; // 删除名为 user_view 的视图
8. truncate table users; // 清空 users 表中的所有数据

-- dml（数据操作语言）  
9. insert into users (id, name, age) values (1, 'alice', 25); // 向 users 表中插入一条记录  
10. update users set age = 26 where id = 1; // 更新 users 表中 id 为 1 的记录，将 age 改为 26  
11. delete from users where id = 1; // 删除 users 表中 id 为 1 的记录  
12. select * from users; // 查询 users 表中的所有数据  
13. select name, age from users where age > 20; // 查询 users 表中 age 大于 20 的用户的 name 和 age  
14. insert into users select * from old_users; // 将 old_users 表中的数据插入到 users 表中  
15. merge into users as target using new_users as source on target.id = source.id when matched then update set target.name = source.name when not matched then insert (id, name, age) values (source.id, source.name, source.age); // 合并新旧数据

‍

Day2

1.学习了DQL语句（基础查询，条件查询，聚合函数，分组查询，排序查询，分页查询，执行顺序）

2.学习了DCL语句（用户管理，权限控制）

3.学习了函数相关内容（字符串，数值，日期，流程函数）![屏幕截图 2025-01-14 215417](assets/屏幕截图%202025-01-14%20215417-20250114231604-3vcyp9v.png)![屏幕截图 2025-01-14 201711](assets/屏幕截图%202025-01-14%20201711-20250114231614-cxb77ao.png)![屏幕截图 2025-01-14 221040](assets/屏幕截图%202025-01-14%20221040-20250114231625-ggue42u.png)![屏幕截图 2025-01-14 231332](assets/屏幕截图%202025-01-14%20231332-20250114231631-n6mp61f.png)

```undefined

-- day2
select  name,workno,age from employee;
select  * from employee;
select idcard 'id' from employee;
select  distinct entrydate from employee;
select * from employee where age = 88;
select * from employee where age < 20;
select * from employee where idcard is null;
select * from employee where idcard is not null;
select * from employee where age != 88;
select * from employee where age >=15 && employee.age <= 20;
select * from employee where age between 15 and 20;
select * from employee where gender = '女' and age < 20;
select * from employee where age = 18 or  age = 20;
select * from employee where age in (18,20);
select * from employee where name like '__';
select * from employee where idcard like '%X';
select count(*) from employee;
select count(id) from employee;
select count(idcard) from employee;
select avg(age) from employee;
select max(age) from employee;
select min(age) from employee;
select sum(age) from employee where gender = '女';
select gender,count(*) from employee group by gender ;
select gender,avg(age) from employee group by gender ;
select  entrydate,count(*) from employee where age < 45 group by entrydate having count(*) >= 3;
select * from employee order by age asc;
select * from employee order by age desc;
select * from employee order by entrydate desc ;
select * from employee order by age asc,entrydate desc ;
select * from employee limit 0,10;
select * from employee limit 10,10;
select * from employee where gender = '女' and age in(20,21,22,23);
select * from employee where gender = '男' and age between 20 and 40 order by age asc ,entrydate asc limit 0,5;
-- 创建用户 itcast , 只能够在当前主机localhost访问, 密码123456;
create user 'itcast'@'localhost' identified by '123456';

-- 创建用户 heima , 可以在任意主机访问该数据库, 密码123456 ;
create user 'heima'@'%' identified by '123456';


-- 修改用户 heima 的访问密码为 1234 ;
alter user 'heima'@'%' identified with mysql_native_password by '1234';


-- 删除itcast@localhost用户
drop user 'itcast'@'localhost';




-- 查询权限
show grants for 'heima'@'%';


-- 授予权限
grant all on itcast.* to 'heima'@'%';


-- 撤销权限
revoke all on itcast.* from 'heima'@'%';

-- ----------------------------------------------------
select concat('Hello' , ' MySQL');
select lower('Hello');
select upper('Hello');
select lpad('01', 5, '-');
select rpad('01', 5, '-');
select trim(' Hello  MySQL ');
select substring('Hello MySQL',1,5);
update employee set workno = lpad(workno, 5, '0');
select ceil(1.1);
select floor(1.9);
select mod(7,4);
select rand();
select round(2.344,2);
select lpad(round(rand()*1000000,0),6,'0');
select curdate();
select curtime();
select now();
select YEAR(now());
select MONTH(now());
select DAY(now());
select date_add(now(), INTERVAL 70 YEAR );
select datediff('2021-10-01', '2021-12-01');
select name,datediff(curdate(),entrydate) dd from employee order by dd desc ;
select if(true,'OK','Error');
select ifnull('Ok','Default');
select ifnull('','Default');
select ifnull(null,'Default');
select
    name,
    (case workaddress when 'beijing' then '一线' when '上海' then '一线' else '二线城市' end) as '工作地址'
from employee ;
select
    id,
    name,
    (case when math >= 85 then '优秀' when math >=60 then '及格' else '不及格' end ) '数学',
    (case when english >= 85 then '优秀' when english >=60 then '及格' else '不及格' end ) '英语',
    (case when chinese >= 85 then '优秀' when chinese >=60 then '及格' else '不及格' end ) '语文'
from score;







```

‍

Day 3

1.学习了外键约束。

2.学习了多表查询（内连接，外连接，自连接，联合查询，子查询）

3.学习了事务。

![屏幕截图 2025-01-15 203647](assets/屏幕截图%202025-01-15%20203647-20250115234813-ms2el4x.png)

![屏幕截图 2025-01-15 204313](assets/屏幕截图%202025-01-15%20204313-20250115234825-obxp6d8.png)![屏幕截图 2025-01-15 210529](assets/屏幕截图%202025-01-15%20210529-20250115234833-gsnsmdy.png)![屏幕截图 2025-01-15 213330](assets/屏幕截图%202025-01-15%20213330-20250115234842-212kpbk.png)![屏幕截图 2025-01-15 222559](assets/屏幕截图%202025-01-15%20222559-20250115234850-4myk1l2.png)![屏幕截图 2025-01-15 233156](assets/屏幕截图%202025-01-15%20233156-20250115234859-wtj02u6.png)

```undefined

-- -----------------------------------------------------------------------------------------------------------------
create table user(
    id int primary key  auto_increment comment '主键',
    name varchar(10) not null unique comment '姓名',
    age int check ( age > 0 && age <= 120 ) comment '年龄',
    status char(1) default '1' comment '状态',
    gender char(1) comment '性别'
) comment '用户表';
insert into user( name, age, status, gender) VALUES ('Tom1','18','1','男');
insert into user(name,age,status,gender) values ('Tom3',19,'1','男');
insert into user(name,age,status,gender) values (null,19,'1','男');
insert into user(name,age,status,gender) values ('Tom3',19,'1','男');

insert into user(name,age,status,gender) values ('Tom4',80,'1','男');
insert into user(name,age,status,gender) values ('Tom5',-1,'1','男');
insert into user(name,age,status,gender) values ('Tom5',121,'1','男');

insert into user(name,age,gender) values ('Tom5',120,'男');


create table dept(
    id   int auto_increment comment 'ID' primary key,
    name varchar(50) not null comment '部门名称'
)comment '部门表';
INSERT INTO dept (id, name) VALUES (1, '研发部'), (2, '市场部'),(3, '财务部'), (4, '销售部'), (5, '总经办');


create table emp(
    id  int auto_increment comment 'ID' primary key,
    name varchar(50) not null comment '姓名',
    age  int comment '年龄',
    job varchar(20) comment '职位',
    salary int comment '薪资',
    entrydate date comment '入职时间',
    managerid int comment '直属领导ID',
    dept_id int comment '部门ID'
)comment '员工表';

INSERT INTO emp (id, name, age, job,salary, entrydate, managerid, dept_id) VALUES
            (1, '金庸', 66, '总裁',20000, '2000-01-01', null,5),(2, '张无忌', 20, '项目经理',12500, '2005-12-05', 1,1),
            (3, '杨逍', 33, '开发', 8400,'2000-11-03', 2,1),(4, '韦一笑', 48, '开发',11000, '2002-02-05', 2,1),
            (5, '常遇春', 43, '开发',10500, '2004-09-07', 3,1),(6, '小昭', 19, '程序员鼓励师',6600, '2004-10-12', 2,1);

alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept (id);
alter table emp drop foreign key fk_emp_dept_id;
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id) on UPDATE cascade on DELETE cascade ;

alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id) on update set null on delete set null ;

-- 多对多 ----------------
create table student(
    id int auto_increment primary key comment '主键ID',
    name varchar(10) comment '姓名',
    no varchar(10) comment '学号'
) comment '学生表';
insert into student values (null, '黛绮丝', '2000100101'),(null, '谢逊', '2000100102'),(null, '殷天正', '2000100103'),(null, '韦一笑', '2000100104');


create table course(
    id int auto_increment primary key comment '主键ID',
    name varchar(10) comment '课程名称'
) comment '课程表';
insert into course values (null, 'Java'), (null, 'PHP'), (null , 'MySQL') , (null, 'Hadoop');


create table student_course(
    id int auto_increment comment '主键' primary key,
    studentid int not null comment '学生ID',
    courseid  int not null comment '课程ID',
    constraint fk_courseid foreign key (courseid) references course (id),

    constraint fk_studentid foreign key (studentid) references student (id)
)comment '学生课程中间表';

insert into student_course values (null,1,1),(null,1,2),(null,1,3),(null,2,2),(null,2,3),(null,3,4);


create table tb_user(
    id int auto_increment primary key comment '主键ID',
    name varchar(10) comment '姓名',
    age int comment '年龄',
    gender char(1) comment '1: 男 , 2: 女',
    phone char(11) comment '手机号'
) comment '用户基本信息表';

create table tb_user_edu(
    id int auto_increment primary key comment '主键ID',
    degree varchar(20) comment '学历',
    major varchar(50) comment '专业',
    primaryschool varchar(50) comment '小学',
    middleschool varchar(50) comment '中学',
    university varchar(50) comment '大学',
    userid int unique comment '用户ID',
    constraint fk_userid foreign key (userid) references tb_user(id)
) comment '用户教育信息表';


insert into tb_user(id, name, age, gender, phone) values
        (null,'黄渤',45,'1','18800001111'),
        (null,'冰冰',35,'2','18800002222'),
        (null,'码云',55,'1','18800008888'),
        (null,'李彦宏',50,'1','18800009999');

insert into tb_user_edu(id, degree, major, primaryschool, middleschool, university, userid) values
        (null,'本科','舞蹈','静安区第一小学','静安区第一中学','北京舞蹈学院',1),
        (null,'硕士','表演','朝阳区第一小学','朝阳区第一中学','北京电影学院',2),
        (null,'本科','英语','杭州市第一小学','杭州市第一中学','杭州师范大学',3),
        (null,'本科','应用数学','阳泉第一小学','阳泉区第一中学','清华大学',4);

-- ------------------------------------> 多表查询 <--------------------------------------------
create table dept(
    id   int auto_increment comment 'ID' primary key,
    name varchar(50) not null comment '部门名称'
)comment '部门表';

create table emp(
    id  int auto_increment comment 'ID' primary key,
    name varchar(50) not null comment '姓名',
    age  int comment '年龄',
    job varchar(20) comment '职位',
    salary int comment '薪资',
    entrydate date comment '入职时间',
    managerid int comment '直属领导ID',
    dept_id int comment '部门ID'
)comment '员工表';

-- 添加外键
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id);

INSERT INTO dept (id, name) VALUES (1, '研发部'), (2, '市场部'),(3, '财务部'), (4, '销售部'), (5, '总经办'), (6, '人事部');
INSERT INTO emp (id, name, age, job,salary, entrydate, managerid, dept_id) VALUES
            (1, '金庸', 66, '总裁',20000, '2000-01-01', null,5),

            (2, '张无忌', 20, '项目经理',12500, '2005-12-05', 1,1),
            (3, '杨逍', 33, '开发', 8400,'2000-11-03', 2,1),
            (4, '韦一笑', 48, '开发',11000, '2002-02-05', 2,1),
            (5, '常遇春', 43, '开发',10500, '2004-09-07', 3,1),
            (6, '小昭', 19, '程序员鼓励师',6600, '2004-10-12', 2,1),

            (7, '灭绝', 60, '财务总监',8500, '2002-09-12', 1,3),
            (8, '周芷若', 19, '会计',48000, '2006-06-02', 7,3),
            (9, '丁敏君', 23, '出纳',5250, '2009-05-13', 7,3),

            (10, '赵敏', 20, '市场部总监',12500, '2004-10-12', 1,2),
            (11, '鹿杖客', 56, '职员',3750, '2006-10-03', 10,2),
            (12, '鹤笔翁', 19, '职员',3750, '2007-05-09', 10,2),
            (13, '方东白', 19, '职员',5500, '2009-02-12', 10,2),

            (14, '张三丰', 88, '销售总监',14000, '2004-10-12', 1,4),
            (15, '俞莲舟', 38, '销售',4600, '2004-10-12', 14,4),
            (16, '宋远桥', 40, '销售',4600, '2004-10-12', 14,4),
            (17, '陈友谅', 42, null,2000, '2011-10-12', 1,null);


-- 多表查询 -- 笛卡尔积
select * from emp , dept where emp.dept_id = dept.id;




-- 内连接演示
-- 1. 查询每一个员工的姓名 , 及关联的部门的名称 (隐式内连接实现)
-- 表结构: emp , dept
-- 连接条件: emp.dept_id = dept.id
select emp.name , dept.name from emp , dept where emp.dept_id = dept.id ;

select e.name,d.name from emp e , dept d where e.dept_id = d.id;


-- 2. 查询每一个员工的姓名 , 及关联的部门的名称 (显式内连接实现)  --- INNER JOIN ... ON ...
-- 表结构: emp , dept
-- 连接条件: emp.dept_id = dept.id

select e.name, d.name from emp e inner join dept d  on e.dept_id = d.id;

select e.name,d.name from emp e join dept d on e.dept_id = d.id;
-- 外连接演示
-- 1. 查询emp表的所有数据, 和对应的部门信息(左外连接)
-- 表结构: emp, dept
-- 连接条件: emp.dept_id = dept.id

select e.*, d.name from emp e left outer join dept d on e.dept_id = d.id;

select e.*, d.name from emp e left join dept d on e.dept_id = d.id;

-- 2. 查询dept表的所有数据, 和对应的员工信息(右外连接)

select d.*, e.* from emp e right outer join dept d on e.dept_id = d.id;

select d.*, e.* from dept d left outer join emp e on e.dept_id = d.id;

-- 自连接
-- 1. 查询员工 及其 所属领导的名字
-- 表结构: emp

select a.name , b.name from emp a , emp b where a.managerid = b.id;

-- 2. 查询所有员工 emp 及其领导的名字 emp , 如果员工没有领导, 也需要查询出来
-- 表结构: emp a , emp b

select a.name,b.name from emp a left join  emp b on a.managerid = b.id;

-- union all , union
-- 1. 将薪资低于 5000 的员工 , 和 年龄大于 50 岁的员工全部查询出来.

select * from emp where salary < 5000
union all
select * from emp where age > 50;


select * from emp where salary < 5000
union
select * from emp where age > 50;




-- -------------------------------------- 子查询 ------------------------

-- 标量子查询
-- 1. 查询 "销售部" 的所有员工信息
-- a. 查询 "销售部" 部门ID
select id from dept where name = '销售部';

-- b. 根据销售部部门ID, 查询员工信息
select * from emp where dept_id = (select id from dept where emp.name = '销售部');



-- 2. 查询在 "方东白" 入职之后的员工信息
-- a. 查询 方东白 的入职日期
select entrydate from emp where name = '方东白';

-- b. 查询指定入职日期之后入职的员工信息
select * from emp where entrydate > (select entrydate from emp where name = '方东白');

-- 1. 查询 "销售部" 和 "市场部" 的所有员工信息
-- a. 查询 "销售部" 和 "市场部" 的部门ID
select id from dept where name = '销售部' or name = '市场部';

-- b. 根据部门ID, 查询员工信息
select * from emp where dept_id in (select id from dept where name = '销售部' or name = '市场部');


-- 2. 查询比 财务部 所有人工资都高的员工信息
-- a. 查询所有 财务部 人员工资
select id from dept where name = '财务部';

select salary from emp where dept_id = (select id from dept where name = '财务部');

-- b. 比 财务部 所有人工资都高的员工信息
select * from emp where salary > all ( select salary from emp where dept_id = (select id from dept where name = '财务部') );


-- 3. 查询比研发部其中任意一人工资高的员工信息
-- a. 查询研发部所有人工资
select salary from emp where dept_id = (select id from dept where name = '研发部');

-- b. 比研发部其中任意一人工资高的员工信息
select * from emp where salary > some ( select salary from emp where dept_id = (select id from dept where name = '研发部') );

-- 行子查询
-- 1. 查询与 "张无忌" 的薪资及直属领导相同的员工信息 ;
-- a. 查询 "张无忌" 的薪资及直属领导
select salary, managerid from emp where name = '张无忌';

-- b. 查询与 "张无忌" 的薪资及直属领导相同的员工信息 ;
select * from emp where (salary,managerid) = (select salary, managerid from emp where name = '张无忌');


-- 表子查询
-- 1. 查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息
-- a. 查询 "鹿杖客" , "宋远桥" 的职位和薪资
select job, salary from emp where name = '鹿杖客' or name = '宋远桥';

-- b. 查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息
select * from emp where (job,salary) in ( select job, salary from emp where name = '鹿杖客' or name = '宋远桥' );


-- 2. 查询入职日期是 "2006-01-01" 之后的员工信息 , 及其部门信息
-- a. 入职日期是 "2006-01-01" 之后的员工信息
select * from emp where entrydate > '2006-01-01';

-- b. 查询这部分员工, 对应的部门信息;
select e.*, d.* from (select * from emp where entrydate > '2006-01-01') e left join dept d on e.dept_id = d.id ;

-- ---------------------------- 事务操作 ----------------------------
-- 数据准备
create table account(
    id int auto_increment primary key comment '主键ID',
    name varchar(10) comment '姓名',
    money int comment '余额'
) comment '账户表';
insert into account(id, name, money) VALUES (null,'张三',2000),(null,'李四',2000);


-- 恢复数据
update account set money = 2000 where name = '张三' or name = '李四';


select @@autocommit;

set @@autocommit = 0; -- 设置为手动提交

-- 转账操作 (张三给李四转账1000)
-- 1. 查询张三账户余额
select * from account where name = '张三';

-- 2. 将张三账户余额-1000
update account set money = money - 1000 where name = '张三';

程序执行报错 ...
update account set money = money + 1000 where name = '李四';


-- 提交事务
commit;

-- 回滚事务
rollback ;



-- 方式二
-- 转账操作 (张三给李四转账1000)
start transaction ;

-- 1. 查询张三账户余额
select * from account where name = '张三';

-- 2. 将张三账户余额-1000
update account set money = money - 1000 where name = '张三';

程序执行报错 ...

-- 3. 将李四账户余额+1000
update account set money = money + 1000 where name = '李四';


-- 提交事务
commit;

-- 回滚事务
rollback;




-- 查看事务隔离级别
select @@transaction_isolation;

-- 设置事务隔离级别
set session transaction isolation level read uncommitted ;

set session transaction isolation level repeatable read ;




```

Day4

休息，简单复习javase.

Day5

休息.

Day6,7

周末
