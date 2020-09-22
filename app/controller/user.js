const Controller = require('egg').Controller
const jsonWebToken = require('jsonwebtoken')

class UserController extends Controller {
  async login () {
    const { ctx, app } = this
    
    let user = await ctx.model.User.create({
      name: new Date().getTime()
    })
    
    ctx.body = {
      token: jsonWebToken.sign({
        id: user.id
      }, app.config.jwt.secret)
    }
  }
  
  async getUserInfo () {
    const { ctx, app } = this
    
    ctx.body = ctx.user
  }
}

module.exports = UserController
