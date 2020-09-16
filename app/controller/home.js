'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    const { ctx } = this
    
    // ctx.body = 'hi, egg';
    // ctx.helper.success({ data: 1 })
    ctx.throw(400, '出错了')
  }
}

module.exports = HomeController
