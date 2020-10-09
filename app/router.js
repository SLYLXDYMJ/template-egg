const { registerRestful } = require('./extend/helper')

module.exports = app => {
  let { router, controller, middleware } = app
  
  let isAdmin = middleware.permission('admin', app)
  let isUser = middleware.permission('user', app)
  
  registerRestful(app, '/', 'product')
  registerRestful(app, '/', 'user', {
    findAll: [ isAdmin ],
    findOne: [ isAdmin ],
    count: [ isAdmin ],
    update: [ isAdmin ],
    delete: [ isAdmin ]
  })
  registerRestful(app, '/', 'role', {
    findAll: [ isAdmin ],
    findOne: [ isAdmin ],
    count: [ isAdmin ],
    update: [ isAdmin ],
    delete: [ isAdmin ]
  })
}
