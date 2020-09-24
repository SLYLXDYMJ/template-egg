'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  // const jwtAuth = app.middleware.jwtAuth(
  //   app.config,
  //   app
  // )
  
  router.get('/product', controller.product.findAll)
  router.get('/product/count', controller.product.count)
  router.get('/product/:id', controller.product.findOne)
  router.post('/product', controller.product.create)
  router.put('/product/:id', controller.product.update)
  router.delete('/product/:id', controller.product.delete)
}
