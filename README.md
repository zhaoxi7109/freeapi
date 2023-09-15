# 免费API开放平台

> 作者：zhaoxi(https://github.com/zhaoxi7109)
>
> Gitee：https://gitee.com/zhaoxi7109
>
> 本地开发时访问地址  http://47.96.37.10:8000/
>
> 本地json文档地址：http://localhost:7529/api/v3/api-docs
>
> 本地swagger文档啊地址: http://localhost:7529/api/doc.html#/home

## 1. 项目介绍

基于React+SpringBoot_Dubbo+Spring Cloud Gateway的免费api开放平台。包含了管理员端和客服端。管理员可以对接口信息及用户进行增删改查的操作，以及可视化地查看各接口的调用情况；用户可以开通接口调用权限，浏览接口以及在线调试，并通过客服端SDK调用接口

项目模块：

- 核心模块 core
- 网关模块 gateway
- （SDK）模块 sdk
- 接口模块 interface
- 通用模块 common

项目结构：

```
freeapi-backend     //父项目
├─dockerfile        //dockerfile目录
├─freeapi-client-sdk    //sdk模块
├─freeapi-common        //通用模块
├─freeapi-core          //核心模块  9527  
├─freeapi-gateway       //网关模块  8080
├─freeapi-interface     //接口模块  8123
└─sql                   //数据库
```

> 另外还需开放端口：nacos：8848、9848、9849，Nginx：80 redis：6379 MySQL：3306

## 2. 功能分析

主要功能有：

- 接口信息管理
- 用户管理
- api调用情况可视化
- api在线调试

## 3. 技术选型

前端

- React 18
- Ant Design Pro 5.x 脚手架
- Ant Design & Procomponents 组件库
- Umi 4 前端框架
- OpenAPI 前端代码生成

后端

- Java Spring Boot
- MyBatis-Plus 及 MyBatis X 自动生成
- API 签名认证（Http 调用）
- Spring Boot Starter（SDK 开发）
- Dubbo 分布式（RPC、Nacos）
- Swagger + Knife4j 接口文档生成
- Spring Cloud Gateway 微服务网关
- Hutool、Apache Common Utils、Gson 等工具库

## 4. 环境

- jdk 1.8

- node v16.13.0  (v18.14.2)

- npm 8.1.0  (9.5.0)

- Docker
- Redis docker最新
- Mysql 8.0.12
- Redis docker最新
- Nacos docker最新
- nginx

**开发运行**

1、克隆项目到本地

2、使用idea打开并加载依赖项（自己修改项目配置，项目jdk版本，maven版本）

3、执行sql文件夹中的freeapi.sql文件

4、在application.yml文件中修改redis、mysql、nacos配置

5、前端资源存放在freeapi-ui目录下，没有node_modules，需要执行`npm isntall`下载

## 5. 数据库设计

数据库名：freeapi_db

1. 用户及管理员表：user

| 字段名        | 类型         | 是否为空 | 描述                        | 备注               |
| ------------- | ------------ | -------- | --------------------------- | ------------------ |
| id            | bigint       | not null | 主键                        |                    |
| user_account  | varchar(256) | not null | 账号                        |                    |
| user_password | varchar(256) | not null | 密码                        |                    |
| user_name     | varchar(256) | null     | 昵称                        |                    |
| user_avatar   | varchar(256) | null     | 头像                        | url地址            |
| user_profile  | text         | null     | 签名                        |                    |
| user_role     | tinyint      | not null | 角色 0-普通 1-管理员 2-封号 | 默认为0            |
| create_time   | datetime     | null     | 创建时间                    |                    |
| update_time   | datetime     | null     | 更新时间                    |                    |
| is_delete     | tinyint      | null     | 是否删除                    | 逻辑删除默认0-没删 |

2. 接口信息表：

| 字段名         | 类型         | 是否为空 | 描述     | 备注                 |
| -------------- | ------------ | -------- | -------- | -------------------- |
| id             | bigint       | not null | 主键     |                      |
| name           | varchar(256) | not null | 接口名称 |                      |
| description    | text         |          | 接口描述 |                      |
| url            | varchar(256) | not null | 接口地址 |                      |
| method         | varchar(32)  | not null | 请求类型 |                      |
| request_header | text         |          | 请求头   |                      |
| reponse_header | text         |          | 响应头   |                      |
| create_user_id | bigint       |          | 接口作者 |                      |
| status         | tinyint      |          | 接口状态 | 默认0-关闭           |
| create_time    | datetime     |          | 创建时间 |                      |
| update_time    | datetime     |          | 更新时间 |                      |
| is_delete      | tinyint      |          | 是否删除 | 逻辑删除，默认0-没删 |

3. 用户与接口关系表

## 6. 相关接口

用户相关：

1. 用户注册

参数：账号（4位以上），密码（8位以上），校验密码（和密码一致）

返回值：注册成功返回对应id

需要有一个默认的admin

2. 用户登录

参数：用户名，密码

返回值：

3. 微信登录（不实现）

4. 获取当前登录用户

5. 判断是否位管理员
6. 用户注销
7. 添加用户：管理员添加普通用户和其他管理员（默认密码为角色拼接账号）
8. 分页获取用户（未完成）

接口信息相关

还没有做全局的请求拦截

1. 添加接口信息

- 普通用户添加不用指定接口作者，管理员添加如果没有指定接口作者就默认为那个管理员自己是作者
- 只有登录了才能添加接口信息
- 请求方式可以为大小写，内部已经转换

2. 删除接口信息

- 管理员可以删除所有的接口信息，普通用户只能删除作者是自己的接口信息

3. 根据id更新接口信息

- 只要有id就能更新
- 传参时没有设置的属性就不作更改
- 另外定义方法实现了小驼峰到下划线的转换
- 只有管理员和接口作者能更新接口

4. 分页获取接口信息

- 获取当前页（必填  ）默认值为1
- 每次查询条数（必填）默认值为10
- 默认升序

5. 根据id进行分页查询

- id默认为-1，即为未指定，此时默认查询当前登录用户对应id

## 7. 模拟接口后端

**API签名认证**

accessKey  ak  复杂，无序，无规律，大小写加数字

secretKey  sk   复杂，无序，无规律，大小写加数字

ak  sk 无状态

ak ，sk ，请求参数，签名sign，随机数nonce，时间timestamp戳

SDK

用户注册ak时使用的表，用户密钥表

| 字段名      | 类型         | 是否为空 | 描述      | 备注       |
| ----------- | ------------ | -------- | --------- | ---------- |
| id          | bigint       | not null | 主键      |            |
| user_id     | bigint       | not null | 用户id    |            |
| access_key  | varchar(256) | not null | accessKey |            |
| screte_key  | varchar(256) | not null | secretKey |            |
| status      | tinyint      | not null | 密钥状态  | 默认开启 1 |
| create_time | datetime     | null     | 创建时间  |            |
| update_time | datetime     | null     | 更新时间  |            |
| is_delete   | tinyint      | null     | 逻辑删除  | 默认0      |

获取密钥，需要登录，

删除密钥

修改密钥状态

查询密钥

随机数表，添加索引，使用布隆过滤器

| 字段名 | 类型   | 是否为空 | 描述   | 备注 |
| ------ | ------ | -------- | ------ | ---- |
| id     | bigint | not null | 主键   |      |
| random |        |          | 随机数 |      |

签名认证：

1. accessKey 个人密钥  新建数据库存储用户id ， accessKey与secretKey
2. secretKey 私密（不发送给用户，直接存储在数据库中）
3. 用户参数 （普通参数，对象参数，放于请求头，放于请求体 ）
4. 签名  用户accessKey+参数+加密算法 => 签名
5. 随机数  建立随机数表，使用redis，表且需要防止随机数重复（发送请求前还是后，使用布隆过滤器），api客服端随机生成随机数，如果随机数没有使用过就存入redis（就不放到MySQL了）
6. 时间戳 后端校验时间戳范围不能超过某一范围（统一设置5min）

逻辑分析：注册后的用户需要使用我发布的api需要先获取accessKey（其他用户发布的没有做签名认证的就不用），注册后将accessKey发给用户，accessKey与secretKey都存放到数据库。提供api调用客服端向发送api请求，同时需要配合网关拦截路径，客服端只提供一个accessKey的有参构造方法new对象（并且可能需要使用单例模式），用户调用api时只需传入参数，客服端内部自动根据accessKey和参数生成签名，并获取随机数，获取当前时间时间戳，并添加到请求头，api后端获取相应参数并作校验

优化：将上述逻辑解耦，将调用api的客服端与api本身分离，客服端发请求需要传入URL与请求参数，其余一致，网关拦截api的路径防止用户直接访问api地址

也就是说有两个模块，一个是api调用客服端模块，一个是自己开发的api模块

对于api模块我们直接在内部调用别人的接口（每日一言）

https://v1.hitokoto.cn/?encode=json&c=d&c=j&c=k&c=k&c=i&lang=cn

## 8. 部署

服务器ip

- 47.96.37.10
- 47.115.206.65

使用DockerCompose部署，相关的jar包，前端资源都放到了docker目录下

[安装Docker Compose](https://www.runoob.com/docker/docker-compose.html)，docker-compose.yml文件版本需与docker版本兼容

```
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

修改文件权限

```
sudo chmod +x /usr/local/bin/docker-compose
```

参看版本，是否安装成功

```
docker-compose --version
```

打开终端，切换到包含 `docker-compose.yml` 文件的目录中。然后运行以下命令来构建和启动服务：-d是后台运行

````bash
docker-compose up -d
````

查看服务状态，运行以下命令可以查看正在运行的服务的状态：

````bash
docker-compose ps
````

停止和删除服务，如果你想停止和删除服务，可以运行以下命令：

````bash
docker-compose down
````

## 9. 更新日志

时间：2023-9

- 改善架构模式，使架构形式更直观、规范（更加规范的maven聚合继承项目）
- 优化依赖包导入，避免大部分依赖包重复导入
- 统一各模块版本
- 删除了自动配置依赖项，并作相应修改

- 完善Readme文档项目结构

- 使用fastjson代替gson
- 为数据库增加数据库连接池Druid
- 将MySQL由5.7+转为使用8.0+
- 移除了test依赖和junit依赖
- 移除不需要的模块
- 添加了阿里云短信服务调用接口
- 完善dockerfile部分，统一加载文件
- 部署时将前后端合一
- 修改Nginx默认端口由8000到80，完善Nginx配置文件
- 关闭了不必要的端口暴露
- 完善Nacos充当配置中心和注册中心
- 新增freeapi-ui目录存放前端资源，下的dist目录存放打包后的文件，也就删除原本的前端分支