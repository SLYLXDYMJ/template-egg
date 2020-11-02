const { registerRestful } = require('./extend/helper')

module.exports = app => {
  let { router, controller, middleware } = app
  let ctx = app.createAnonymousContext()
  
  let auth = app.passport.authenticate('jwt', { successRedirect: null })
  let isUser = middleware.permission('user', app)
  let isAdmin = middleware.permission('admin', app)
  
  router.post('/login', controller.user.login)
  router.post('/register', controller.user.register)
  
  ctx.helper.registerRestful('/product', controller.product)
  ctx.helper.registerRestful('/user', controller.user)
  ctx.helper.registerRestful('/role', controller.role, {
    findAll: [ auth, isAdmin ]
  })
}
