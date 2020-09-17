# template-egg
> egg 常用代码模板

## 统一的成功响应
`核心代码`
`/app/extend/helper.js（success部分）`
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
`核心代码`
`/app/middleware/error.js`
```javascript
/**
 *  {
 *    status: 400,
 *    msg: '出错了'
 *  }
 **/
ctx.throw(400, '出错了')
```

`别忘了加载中间件`
`/config/config.default.js`
```javascript
config.middleware = [
  'error'
]
```

## jwt鉴权（passport-jwt）

1. 安装依赖
```bash
npm i --save egg-passport passport-jwt jsonwebtoken
```

2. 核心代码，复制到自己项目中
`/app/middleware/jwt-auth.js`

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