const { Strategy, ExtractJwt } = require('passport-local')

let passportLocal = function (options, app) {
  return app.passport.authenticate('local', {
    session: false,
    successReturnToOrRedirect: null
  })
}

passportLocal.init = function (app) {
  app.passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
      },
      function (req, username, password, done) {
        app.passport.doVerify(req, {
          provider: 'local',
          username,
          password
        }, done)
      }
    )
  )
}
passportLocal.verify = async (ctx, { username, password }) => {
  let user = await ctx.service.user.findOne({
    username,
    password
  })
  
  if (!user) {
    return ctx.throw(400, '用户名或密码错误')
  }
  
  return user
}

module.exports = passportLocal