'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const localAuth = app.middleware.passportLocal(
    app.config,
    app
  )
  const jwtAuth = app.middleware.passportJwt(
    app.config,
    app
  )
  
  router.post('/login', localAuth, controller.user.login)
  router.post('/register', controller.user.register)
  router.get('/me', jwtAuth, controller.user.getInfo)
  router.put('/password', jwtAuth, controller.user.changePassword)
  
  router.get('/product', controller.product.findAll)
  router.get('/product/count', controller.product.count)
  router.get('/product/:id', controller.product.findOne)
  router.post('/product', controller.product.create)
  router.put('/product/:id', controller.product.update)
  router.delete('/product/:id', controller.product.delete)
}
