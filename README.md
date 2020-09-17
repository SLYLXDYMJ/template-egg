# template-egg
> egg 常用代码模板

## 统一的成功响应
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

## jwt鉴权（passport-jwt）

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