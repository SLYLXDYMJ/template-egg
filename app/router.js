const { registerRestful } = require('./extend/helper')

module.exports = app => {
  const { router, controller } = app
  
  registerRestful(app, '/', 'product')
}
