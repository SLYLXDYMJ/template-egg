'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  const jwtAuth = app.middleware.jwtAuth(
    app.config,
    app
  )
  
  router.get('/', controller.home.index)
  
  router.post('/login', controller.user.login)
  router.get('/user/info', jwtAuth, controller.user.getUserInfo)
}
