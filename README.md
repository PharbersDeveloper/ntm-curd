# ts-exp-mongo-demo

CURD前端化 工程demo
Typescript + express + json-api + mongoose

## 安装说明
1. 下载工程，更改文件夹名字
2. 修改package.json文件中的name，到你需要工程名字
3. yarn 安装各种依赖
4. npm run build 编译
5. npm run start 启动程序
8. 访问http://localhost:8080 即可看到API的使用情况

## 自文档
1. 在工程目录下运行 npm run docs

## Log 管理
1. 
```ts
import PhLogger from "./logger/phLogger"

PhLogger.trace(<what ever you want>)
PhLogger.debug(<what ever you want>)
PhLogger.info(<what ever you want>)
PhLogger.warn(<what ever you want>)
PhLogger.error(<what ever you want>)
PhLogger.fatal(<what ever you want>)
```

2. 在log文件夹下生成log文件，log同时会在console中打出

## 使用说明
1. 在models文件夹下，添加你想要的名字
> 特别注意：名字必须是大驼峰命名
2. 修改conf文件夹下的yml文件，看例子
```yml
models:
  - file: <文件名：大驼峰>
    reg: <访问名：在json-api下是文件名的复数>
```
3. 修改conf文件夹下的yml文件，配置数据库
```yml
mongo:
  algorithm: <访问协议>
  host: <访问域名>
  port: <访问端口>
  username: <用户名：暂时不支持>
  pwd: <密码：暂时不支持>
  coll: <数据库>
```
3. 可以使用了，杠杠的，就是这么的简单
4. 访问接口详情见: http://jsonapi.org
