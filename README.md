# template-egg
> egg 常用代码模板

## 统一的成功响应
> 核心代码：
> /app/extend/helper.js（success部分）

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
> 核心代码:
> /app/middleware/error.js

> 别忘了注册中间件 <br/>
> 否则不生效的

```javascript
/**
 *  {
 *    status: 400,
 *    msg: '出错了'
 *  }
 **/
ctx.throw(400, '出错了')
```