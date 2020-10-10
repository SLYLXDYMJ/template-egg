const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

/**
 *  初始化模型表结构
 *  ! development 使用 sync 的方式
 *  ! production  建议使用 migrations 的方式
 **/
exports.initModel = async function () {
  return await this.model.sync({
    force: process.env.NODE_ENV === 'development'
  })
}

/**
 *  初始化权限表数据
 *
 *  默认角色
 *    admin - 超级管理员
 *    user  - 普通用户
 *
 *  超级管理远默认账号密码
 *    administrator
 *    administrator
 **/
exports.initRole = async function () {
  let ctx = this.createAnonymousContext()
  
  let adminRole =
    await ctx.service.role.findOne({
      where: { name: 'admin' }
    }) ||
    await ctx.service.role.create({
      data: {
        name: 'admin',
        description: '超级管理员'
      }
    })
  
  let userRole =
    await ctx.service.role.findOne({
      where: { name: 'user' }
    }) ||
    await ctx.service.role.create({
      data: {
        name: 'user',
        description: '普通用户'
      }
    })
  
  let admin = (await adminRole.getUsers()).length
  
  admin || adminRole.addUser(await ctx.service.user.create({
    data: {
      username: 'administrator',
      password: 'administrator'
    }
  }))
}

/**
 *  初始化 jwt 验证
 **/
exports.initPassport = async function () {
  let app = this
  
  // jwt
  app.passport.use(new JwtStrategy(
    {
      secretOrKey: app.config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    },
    (req, payload, done) => {
      app.passport.doVerify(req, {
        provider: 'jwt',
        id: payload.id
      }, done)
    }
  ))
  
  app.passport.verify(async (ctx, userParams) => {
    let { provider } = userParams
    
    switch (provider) {
      case 'jwt': {
        return await ctx.service.user.findOne({
          where: { id: userParams.id }
        })
      }
      default: {
        return null
      }
    }
  })
}
