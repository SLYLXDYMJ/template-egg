const JwtStrategy = require('passport-jwt').Strategy
const JwtExtractJwt = require('passport-jwt').ExtractJwt

let jwtAuth = function (options, app) {
  return app.passport.authenticate('jwt', {
    session: false,
    successReturnToOrRedirect: null
  })
}

jwtAuth.init = function (app) {
  app.passport.use(
    new JwtStrategy(
      {
        passReqToCallback: true,
        jwtFromRequest: JwtExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: app.config.jwt.secret
      },
      function (...args) {
        app.passport.doVerify(...args)
      }
    )
  )
  
  app.passport.verify(async (ctx, jwtPayload) => {
    // 这里应该根据 jwtPayload 的用户数据查询数据库
    // 并返回用户数据 或 null
    return { id: 10086, name: '静态数据' }
  })
}

module.exports = jwtAuth