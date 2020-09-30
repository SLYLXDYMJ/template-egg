const _ = require('lodash')
const { Op } = require('sequelize')

/**
 *  统一的成功的响应消息
 **/
exports.success = function (data, msg = '√') {
  let { ctx } = this
  
  ctx.body = {
    status: 200,
    msg, data
  }
}

/**
 *  查询字符串转为操作符查询对象
 **/
exports.qsToOp = function (query) {
  let result = {}
  let innerResult = {}
  let supportQuery = _.pick(query, [
    'eq', 'ne',
    'in', 'notIn',
    'lt', 'lte', 'gt', 'gte',
    'like', 'notLike'
  ])
  
  /**
   *  构建 innerResult
   **/
  _.each(supportQuery, (qsStr, opStr) => {
    _.chain(qsStr)
      .split(',')
      .tap(result => {
        /**
         *  before:
         *    id:1,id:2,type:web
         *    ------------
         *    name:jason
         *  after:
         *    [ 'id:1', 'id:2', 'type:web' ]
         *    ------------
         *    [ 'name:jason' ]
         **/
        // console.log(result)
      })
      .map(qsItemStr => {
        return _.split(qsItemStr, ':')
      })
      .tap(result => {
        /**
         *  before:
         *    [ 'id:1', 'id:2', 'type:web' ]
         *    ------------
         *    [ 'name:jason' ]
         *  after:
         *    [ [ id, 1 ], [ id, 2 ], [ type, web ] ]
         *    ------------
         *    [ [ name, jason ] ]
         **/
        // console.log(result)
      })
      .each(qsItem => {
        /**
         *  [ id, 1 ]
         **/
        let [ key, value ] = qsItem
        
        /**
         *  value 若可以转为 number 则转换
         *  防止数据库查询时类型带来的问题
         **/
        value = Number(value) || value
        
        /**
         *  in，like 操作符
         *  value 转换
         **/
        switch (opStr) {
          case 'in':
          case 'notIn' : {
            value = [ value ]
            break
          }
          case 'like':
          case 'notLike' : {
            value = `%${ value }%`
            break
          }
        }
        
        /**
         *  初始化对应 key 值的查询对象
         *  ex:
         *    innerResult = { id: {} }
         **/
        innerResult[ key ] = innerResult[ key ] || {}
        
        /**
         *  整合操作符查询条件
         *    ex:
         *      innerResult.id.in = [ 1, 2 ]
         *      innerResult.type.eq = 'php'
         **/
        innerResult[ key ][ opStr ] = innerResult[ key ][ opStr ] ?
          _.concat([], innerResult[ key ][ opStr ], value) :
          value
      })
      .tap(() => {
        /**
         *  innerResult = {
         *    id: { in: [ 1, 2 ] },
         *    type: { eq: 'web', in: [ 'web' ] }
         *  }
         **/
      })
      .value()
  })
  
  /**
   *  根据 innerResult 构建 result
   **/
  _.each(innerResult, (innerResultItemQuery, key) => {
    let root = result[ Op.and ] = result[ Op.and ] || []
    let transformItemQuery = {
      [ key ]: { [ Op.and ]: {} }
    }
    
    _.each(innerResultItemQuery, (val, opStr) => {
      transformItemQuery[ key ][ Op.and ][ Op[ opStr ] ] = val
    })
    
    root.push(transformItemQuery)
  })
  
  return result
}

/**
 *  增强版的 router.resources
 *  @param { Object } app        - app
 *  @param { String } prefix     - url 前缀
 *  @param { String } ctorName   - 控制器名称
 *  @param { Object } middleware - 中间件对象
 *  @example middleware
 *    {
 *      update: [ middleware1 ],
 *      update: [ middleware1, middleware2 ]
 *    }
 **/
exports.registerRestful = function (app, prefix, ctorName, middleware = {}) {
  let { router, controller } = app
  let baseUrl = `${ prefix }${ ctorName }`
  
  // Get -> /product
  router.get(
    `${ baseUrl }`,
    ...[ ...(middleware.findAll || []) ],
    controller[ ctorName ].findAll
  )
  
  // Get -> /product/count
  // 注意：要放在 /product/:id 上面
  router.get(
    `${ baseUrl }/count`,
    ...[ ...(middleware.count || []) ],
    controller[ ctorName ].count
  )
  
  // Get -> /product/10
  router.get(
    `${ baseUrl }/:id`,
    ...[ ...(middleware.findOne || []) ],
    controller[ ctorName ].findOne
  )
  
  // Post -> /product/10
  router.post(
    `${ baseUrl }`,
    ...[ ...(middleware.create || []) ],
    controller[ ctorName ].create
  )
  
  // Put -> /product/10
  router.put(
    `${ baseUrl }/:id`,
    ...[ ...(middleware.update || []) ],
    controller[ ctorName ].update
  )
  
  // Delete -> /product/10
  router.delete(
    `${ baseUrl }/:id`,
    ...[ ...(middleware.delete || []) ],
    controller[ ctorName ].delete
  )
}

/**
 *  根据 model 封装统一的查询 server
 *  @param { String } modelName - 模型名称，首字母应该大写
 **/
exports.createModelBaseService = function (modelName, include = [
  'findAll',
  'findOne',
  'count',
  'create',
  'delete'
]) {
  return {
    async findAll ({ where, offset, limit, order }) {
      offset = offset && Number(offset)
      limit = limit && Number(limit)
      
      return {
        total: await this.ctx.model[ modelName ].count({
          where
        }),
        data: await this.ctx.model[ modelName ].findAll({
          where, offset, limit, order
        })
      }
    },
    async findOne (where) {
      return await this.ctx.model[ modelName ].findOne({
        where
      })
    },
    async count (where) {
      return await this.ctx.model[ modelName ].count({
        where
      })
    },
    async create (data) {
      return await this.ctx.model[ modelName ].create(
        data
      )
    },
    async update (where, data) {
      return await this.ctx.model[ modelName ].update(
        data,
        { where }
      )
    },
    async delete (where) {
      return await this.ctx.model[ modelName ].destroy({
        where
      })
    }
  }
}

/**
 *  根据统一封装的查询 service 实现 model 基础增删改查控制器
 *   @param { String } modelName - 模型名称，首字母应该大写
 **/
exports.createModelBaseController = function (modelName, include = [
  'findAll',
  'findOne',
  'count',
  'create',
  'delete'
]) {
  const SERVICE_NAME = modelName.toLowerCase()
  return {
    /**
     *  @apiIgnore
     *  @api { GET } /[model-name] 获取数据列表
     *  @apiGroup model
     *
     *  @apiSchema (查询字符串_) {jsonschema=../../apidoc/schema/operator-query.json} apiParam
     *
     *  @apiParam (查询字符串) { Number } [offset] 用于分页查询，跳过 offset 条结果
     *  @apiParam (查询字符串) { Number } [limit]  用于分页查询，限制返回的条目数
     *  @apiParam (查询字符串) { String } [order]  排序，格式：createdAt:DESC,id:ASC
     *
     *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
     *
     *  @apiSuccess (成功响应 data) { Number } total 匹配的条目总数量，用于分页
     *  @apiSuccess (成功响应 data) { Array } data 条目数据
     *
     *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
     **/
    async findAll () {
      let { ctx } = this
      let { query } = ctx
      let { offset, limit, order } = query
      let where = null
      
      where = ctx.helper.qsToOp(query)
      offset = offset && Number(offset)
      limit = limit && Number(limit)
      order = order && _.chain(order)
        .split(',')
        .map(item => item.split(':'))
        .value()
      
      return ctx.helper.success(
        await ctx.service[ SERVICE_NAME ].findAll(_.omitBy({
          where, offset, limit, order
        }, _.isNil))
      )
    },
    
    /**
     *  @apiIgnore
     *  @api { GET } /[model-name]/:id 根据 id 查询单条数据
     *  @apiGroup model
     *
     *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
     *
     *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
     **/
    async findOne () {
      let { ctx } = this
      let { id } = ctx.params
      
      return ctx.helper.success(
        await ctx.service[ SERVICE_NAME ].findOne({
          id
        })
      )
    },
    
    /**
     *  @apiIgnore
     *  @api { GET } /[model-name]/count 获取数量
     *  @apiGroup model
     *
     *  @apiSchema (查询字符串) {jsonschema=../../apidoc/schema/operator-query.json} apiParam
     *
     *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
     *  @apiSuccess (成功响应_) { Number } data 数量
     *
     *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
     **/
    async count () {
      let { ctx } = this
      let { query } = ctx
      
      return ctx.helper.success(
        await ctx.service[ SERVICE_NAME ].count(
          ctx.helper.qsToOp(query)
        )
      )
    },
    
    /**
     *  @apiIgnore
     *  @api { POST } /[model-name] 创建条目
     *  @apiGroup model
     *
     *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
     *
     *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
     **/
    async create () {
      let { ctx } = this
      let { body } = ctx.request
      
      return ctx.helper.success(
        await ctx.service[ SERVICE_NAME ].create(
          body
        )
      )
    },
    
    /**
     *  @apiIgnore
     *  @api { PUT } /[model-name]/:id 更新条目
     *  @apiGroup model
     *
     *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
     *
     *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
     **/
    async update () {
      let { ctx } = this
      let { params, request } = ctx
      let { body } = request
      let { id } = params
      
      return ctx.helper.success(
        await ctx.service[ SERVICE_NAME ].update(
          { id },
          body
        )
      )
    },
    
    /**
     *  @apiIgnore
     *  @api { DELETE } /[model-name]/:id 删除条目
     *  @apiGroup model
     *
     *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
     *
     *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
     **/
    async delete () {
      let { ctx } = this
      let { id } = ctx.params
      
      return ctx.helper.success(
        await ctx.service[ SERVICE_NAME ].delete({
          id
        })
      )
    }
  }
}

