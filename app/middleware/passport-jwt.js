const { Strategy, ExtractJwt } = require('passport-jwt')

let passportJwt = function (options, app) {
  return app.passport.authenticate('jwt', {
    session: false,
    successReturnToOrRedirect: null
  })
}

passportJwt.init = function (app) {
  app.passport.use(
    new Strategy(
      {
        passReqToCallback: true,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: app.config.jwt.secret
      },
      function (req, payload, done) {
        app.passport.doVerify(req, {
          provider: 'jwt',
          ...payload
        }, done)
      }
    )
  )
}
passportJwt.verify = async (ctx, jwtPayload) => {
  // 这里应该根据 jwtPayload 的用户数据查询数据库
  // 并返回用户数据 或 null
  return await ctx.service.user.findOne({
    id: jwtPayload.id
  })
}

module.exports = passportJwt