# NUXT

## 1. 使用 命令安装 nuxt 脚手架
`npx create-nuxt-app`

注意：一定是要新建的空文件夹作为项目目录

## 2. 选择配置
* project name: 直接回车(自动会有一个项目名称，不要删掉，直接回车就行)
* Programming language: JavaScript
* Package manager: Npm
* UI framework: Bootstarp Vue
* Nuxt.js modules: Progressive Web App(PWA)
* Linting tools: Prettier
* Testing framework: Jest
* Rendering mode: Single Page App
* Deployment target: Server (Node.js hosting)
* Development tools: jsconfig.json
* Continuons integration: None
* Version control system: Git

## 3. 使用命令构建你的项目

`npm run dev`
要中断正在运行的项目
使用 ctrl + c 然后输入 Y 回车


## 4.使用 less CSS预编译语言

`npm i less less-loader`


## 5. 项目文件夹

+ assets        需要编译才能使用的资源文件放这里
+ components    组件目录，在这些自定义页面所需要的组件
+ layout        页面布局文件夹
+ middleware    中间件文件夹
+ pages         页面文件夹
    每一个文件代表一个路径
    例如： index.vue    代表url  / 
+ plugins       插件文件夹
+ static        静态资源文件夹，和 koa 的 public 文件夹一样

## 6. 安装 vue 支持插件

+ Vetur [https://marketplace.visualstudio.com/items?itemName=octref.vetur]
+ Vue Peek [https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek]


## 7. 项目构成

一个项目可以看成很多 页面组成（pages文件夹里面的一个文件）
定网站架构

一个页面可以看成很多 组件组成（component文件夹里面的文件）
定页面的布局和功能

一个组件可以看成很多 html元素、属性和已有组件组成（html 元素与 component文件夹里面的文件）
实现每一个功能（html css js）
```
http
 index.html -> http://127.0.0.1/
 store/index.html -> http://127.0.0.1/store

koa
 /store/:id -> http://127.0.0.1/store/10

nuxt
 文件名是index 指向所在的目录
 index.vue -> http://127.0.0.1/
 test.vue -> http://127.0.0.1/test
 store/index.vue -> http://127.0.0.1/store
 store/_id_.vue -> http://127.0.0.1/store/1
```


## 8. 安装 KOA 支持

`npm i koa koa-router koa-body koa-session koa-orm`


## 9. 添加配置文件

在 `nuxt.config.js` 文件下添加 

```json
export default {

  // 其它内容 ....

  // TODO 添加下面内容
  // 使用 nuxt 框架提供的 服务器中间件功能，实现 KOA 的后端服务
  serverMiddleware: [
    // /api 的地址请求，只有数据，没有页面
    // 所有的 /api 的请求都会转发到 api/app.js 脚本文件中
    { path: "/api", handler: "~/api/app.js" }
  ]

}   // 注意这个大括号是原来有的

```

## 10. 实例化 KOA 并作为Nuxt 的 serverMiddleware 使用

```js
import path from "path";
import KOA from "koa";
import Body from "koa-body";
import Session from "koa-session";
import Router from "koa-router";
import ORM from "koa-orm";

// import 路由定义

const app = new KOA(); // 实例化 koa 框架
app.keys = ['koa-key']; // 设置 koa cookie key

const ormConfig = {
    name: 'user',
    modelPath: path.join(path.resolve("./"), 'api/service/models'),
    database: '数据库名称',
    username: 'root',
    password: '123456',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    }
};

const orm = ORM(ormConfig);
console.log("orm: %O", orm);
app.use(orm.middleware);

const SessionConfig = {  // session 配置
    key: 'session-key',
    maxAge: 1000 * 60 * 60,
}
app.use(Session(SessionConfig, app));  // 将 session 中间件 组注册到 koa

const bodyParser = new Body(); // 创建 koa body 的中间件实例
app.use(bodyParser);            // 将 koa body 的中间件实例注册到 koa

const router = new Router();    // 创建 koa 路由处理中间件的实例

// 将 引入的自定义路由 实例绑定到指定 url 下，进行分流
// 所有 /api 的请求会到 rootRouter
// 如：router.use("/", rootRouter.routes(), rootRouter.allowedMethods());

// 将 总路由中间件实例注册到 koa 中
app.use(router.routes(), router.allowedMethods());


// 将 koa 作为插件，注册给 nuxt 使用
// 将 koa 作为一个回调方法提供给 nuxt 作为 serverMiddleware 使用
// 这将直接使用 nuxt 服务器启动的地址和端口作为入口。
export default app.callback();
```
