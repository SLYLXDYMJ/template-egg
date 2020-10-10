/**
 *  注册 restFul 风格的接口
 *
 *  @param { String } basePath   - 基础路径
 *  @param { String } controller - 控制器
 *  @param { Object } middleware - 中间件对象
 *
 *  @example controller
 *    // 必须有以下控制器方法
 *    // findAll、findOne、count、update、delete
 *
 *  @example middleware
 *    {
 *      findOne: [ middleware1 ],
 *      update: [ middleware1, middleware2 ]
 *    }
 **/
exports.registerRestful = function (basePath, controller, middleware = {}) {
  let { app } = this
  let { router } = app
  
  // Get -> /product
  router.get(
    `${ basePath }`,
    ...[ ...(middleware.findAll || []) ],
    controller.findAll
  )
  
  // Get -> /product/count
  // 注意：要放在 /product/:id 上面
  router.get(
    `${ basePath }/count`,
    ...[ ...(middleware.count || []) ],
    controller.count
  )
  
  // Get -> /product/10
  router.get(
    `${ basePath }/:id`,
    ...[ ...(middleware.findOne || []) ],
    controller.findOne
  )
  
  // Post -> /product/10
  router.post(
    `${ basePath }`,
    ...[ ...(middleware.create || []) ],
    controller.create
  )
  
  // Put -> /product/10
  router.put(
    `${ basePath }/:id`,
    ...[ ...(middleware.update || []) ],
    controller.update
  )
  
  // Delete -> /product/10
  router.delete(
    `${ basePath }/:id`,
    ...[ ...(middleware.delete || []) ],
    controller.delete
  )
}
