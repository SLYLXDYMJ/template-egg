module.exports = function (options, app) {
  return async function (ctx, next) {
    try {
      await next()
    }
    catch (err) {
      let status = err.status || 500
      let errMsg = err.message || '服务器错误'
      
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, this)
      
      ctx.status = 200
      ctx.body = {
        status,
        msg: errMsg
      }
    }
  }
}