const { Service, Controller } = require('egg')

module.exports = class extends Controller {
  /**
   *  统一的成功响应
   *
   *  @param { Any } [data] - 数据
   *  @param { String } [msg] - 备注消息
   *
   *  @example
   *    this.success({ a: 1 }, '成功')
   *    // => { status: 200, data: { a:1 }, msg: '成功' }
   **/
  success (data, msg = '√') {
    this.ctx.body = {
      status: 200,
      msg: msg || '√',
      data
    }
  }
  
  /**
   *  统一的失败响应
   *
   *  @param { Number } status - 失败状态码
   *  @param { String } msg - 备注消息
   *  @param { Any } data - 数据
   *
   *  @example
   *    this.fail(401, '未授权')
   *    // => { status: 401, msg: '未授权' }
   **/
  fail (status = 403, msg = '×', data) {
    let err = new Error(msg)
    
    err.status = status
    err.data = data
    err.expose = true
    
    throw err
  }
}
