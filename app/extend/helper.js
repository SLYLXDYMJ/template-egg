/**
 *  统一的成功的响应消息
 **/
exports.success = function (data, msg = '√') {
  let { ctx } = this
  
  ctx.body = {
    status: 200,
    msg, data
  }
}