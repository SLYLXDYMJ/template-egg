# template-egg
> egg 常用代码模板

## 运行本项目
```bash
npm i
=> 修改 database/migrations 数据库配置
npm run dev
```

## 功能大纲
- [x] 统一的成功/失败响应 json 格式
- [x] 前后端分离文档
- [x] 集成 ORM 库（sequelize）
- [x] 根据 ORM 库，实现通用 model 模板
- [x] 根据 ORM 库，实现通用的模型 "增删改查" service 模板
- [x] 根据 "增删改查" service 模板，实现模型对应的 "增删改查" 控制器
- [ ] 给控制器增加更复杂的查询功能（findAll、count）
- [ ] 根据 ORM 库，实现用户基础模型、通用功能接口、鉴权中间件
  - [ ] 注册
  - [ ] 登录
  - [ ] 修改密码
  - [ ] 忘记密码
  - [ ] jwt 鉴权中间件

## 统一的成功响应
> 对应的 json schema：<br/>
> apidoc/schema/success.json

1. 复制核心代码到自己项目中相同位置
```text
app/extend/helper.js
```

2. 控制器返回数据时，使用 ctx.helper.success 方法
```javascript
/***
 *  {
 *    status: 200,
 *    msg: '请求成功',
 *    data: '响应数据'
 *  }
 ***/
ctx.helper.success(data, msg)
```

## 统一的失败响应
> 对应的 json schema：<br/>
> apidoc/schema/fail.json

1. 复制核心代码到自己项目中相同位置
```text
/app/middleware/error.js
```

2. 加载全局中间件
```javascript
// config/config.default.js
config.middleware = [
  'error'
]
```

3. 使用 ctx.throw 方法
```javascript
/**
 *  {
 *    status: 400,
 *    msg: '出错了'
 *  }
 **/
ctx.throw(400, '出错了')
```

## apidoc 文档
1. 安装依赖
```bash
npm install -save-dev apidoc apidoc-plugin-schema
```

2. package.json scripts 中定义打包命令
```json
{
  "build:docs": "apidoc -i app/ -o app/public/docs"
}
```

3. 项目根目录创建 apidoc/schema 目录，并自定义 json 模型

4. 写控制器时书写文档
```javascript
/**
 * @api { post } /login 登录
 * @apiGroup 用户
 *
 * @apiSchema (请求头) {jsonschema=../../apidoc/schema/jwt-auth.json} apiHeader
 *
 * @apiParam (请求体) { String } username 账号
 * @apiParam (请求体) { String } password 密码
 *
 * @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
 *
 * @apiSuccess (data) { String/Number } id id
 * @apiSuccess (data) { String } name 用户名
 *
 * @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
 */
```

4. 使用命令生成文档
```bash
npm run build:docs
```

5. 启动项目，访问文档
```bash
http://localhost:7001/public/docs/index.html
```

## 集成 ORM 库（sequelize）
1. 安装依赖
```bash
npm install --save egg-sequelize mysql2
npm install --save-dev sequelize-cli
```

2. 注册插件
> config/plugin.js
```javascript
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}
```

3. 创建 Migrations 配置文件
> app/.sequelizerc
```javascript
'use strict';

const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
```

4. 初始化 Migrations 配置文件和目录
> 执行完会生成 database 目录
```bash
npx sequelize init:config
npx sequelize init:migrations
```

5. 配置各个环境的数据库信息
> database/config.json
```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "egg-sequelize-doc-default",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "egg-sequelize-doc-unittest",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

6. 在 egg 配置中引入 database/config.json 配置
> config/config.default.js
```javascript
const dbConfig = require('../database/config')

module.exports = appInfo => {
  const userConfig = {
    /* ... */
    sequelize: {
      ...dbConfig[ process.env.NODE_ENV ]
    }
    /* ... */
  }
}
```

7. 同步表模型
> app.js <br/>
> 在开发环境中使用 sync({ alter: true }) 同步 <br/>
> 在线上环境中每张表的首次使用 sync() 同步，修改字段时使用 migrations 同步
```javascript
module.exports = class {
  constructor (app) {
    this.app = app
  }
  async willReady () {
    /**
     *  在开发环境中使用 sync({ alter: true }) 同步
     *  在线上环境中每张表的首次使用 sync() 同步，修改字段时使用 migrations 同步
     **/
    await this.app.model.sync({
      alter: process.env.NODE_ENV === 'development'
    })
  }
}
```

## 根据 ORM 库，实现通用 model、service、controller 模板
> 模板文件：<br/>
> app/model/A.js <br/>
> app/service/A.js <br/>
> app/controller/A.js <br/>

1. 想一个模型名字（比如 Product）
2. 复制 model，service，controller 模板，在对应目录下创建 product.js
3. 在文件中找 MODEL_NAME 常量写 Product
4. 在 model/product.js 中还要写表名 products（复数小写形式）
5. 定义 restful 路由，如下：

```javascript
router.get('/product', controller.product.findAll)
router.get('/product/count', controller.product.count)
router.get('/product/:id', controller.product.findOne)
router.post('/product', controller.product.create)
router.put('/product/:id', controller.product.update)
router.delete('/product/:id', controller.product.delete)
```

备注：
在 app/controller/A.js 中已有统一 apidoc 文档注释


## jwt鉴权（passport-jwt）
> 对应的 json schema（header）：<br/>
> apidoc/schema/jwt-auth.json

1. 安装依赖
```bash
npm i --save egg-passport passport-jwt jsonwebtoken
```

2. 核心代码，复制到自己项目相同位置，并修改 app.passport.verify 逻辑
```javascript
// app/middleware/jwt-auth.js
jwtAuth.init = function (app) {
  /** ... **/
  
  app.passport.verify(async (ctx, jwtPayload) => {
    // 这里应该根据 jwtPayload 的用户数据查询数据库
    // 并返回用户数据 或 null
    return { id: 10086, name: '静态数据' }
  })
}
```

3. 在 app.js 中初始化 passport-jwt
```javascript
const jwtAuth = require('./app/middleware/jwt-auth')

class AppBootHook {
  async willReady () {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    jwtAuth.init(this.app)
  }
}
```

4. 开启插件
```javascript
// config/plugin.js
exports.passport = {
  enable: true,
  package: 'egg-passport'
}
```

5. 定义 jwt secret
```javascript
// config/config.default.js
const userConfig = {
  jwt: {
    secret: '加密钥匙'
  }
}
```

6. 在登录接口控制器使用 jsonwebtoken 生成 token
```javascript
// 登录控制器
const jsonWebToken = require('jsonwebtoken')

class UserController extends Controller {
  async login () {
    const { ctx, app } = this
    
    ctx.body = {
      token: jsonWebToken.sign({
        /** ... **/
      }, app.config.jwt.secret)
    }
  }
}
```

7. 在路由中使用鉴权中间件
```javascript
// app/router.js
module.exports = app => {
  const { router, controller } = app
  const jwtAuth = app.middleware.jwtAuth(
    app.config,
    app
  )
 
  router.get('/** ... **/', jwtAuth, /** ... **/)
}
```

