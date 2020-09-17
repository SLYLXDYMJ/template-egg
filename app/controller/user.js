const Controller = require('egg').Controller
const jsonWebToken = require('jsonwebtoken')

class UserController extends Controller {
  async login () {
    const { ctx, app } = this
    
    ctx.body = {
      token: jsonWebToken.sign({
        id: 10086
      }, app.config.jwt.secret)
    }
  }
  async getUserInfo () {
    const { ctx, app } = this
    
    ctx.body = ctx.user
  }
}

module.exports = UserController
