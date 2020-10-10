const { Service } = require('egg')
const BaseController = require('./base-controller')
const { Op } = require('sequelize')
const _ = require('lodash')

/**
 *  restFul 控制器基类
 *
 *  ! 子类必须指定 SERVICE_NAME
 *
 *  @example
 *    class Controller extends RestFulController {
 *      constructor (...args) {
 *        super(...args)
 *        this.MODEL_NAME = 'Xxx'
 *        this.SERVICE_NAME = 'xxx'
 *      }
 *    }
 **/
exports.RestFulController = class extends BaseController {
  constructor (...args) {
    super(...args)
    this.SERVICE_NAME = null
  }
  
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
    
    where = ctx.service[ this.SERVICE_NAME ].qsToOp(query)
    offset = offset && Number(offset)
    limit = limit && Number(limit)
    order = order && _.chain(order)
      .split(',')
      .map(item => item.split(':'))
      .value()
    
    return this.success(
      await ctx.service[ this.SERVICE_NAME ].findAll(_.omitBy({
        where, offset, limit, order
      }, _.isNil))
    )
  }
  
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
    
    return this.success(
      await ctx.service[ this.SERVICE_NAME ].findOne({
        where: { id }
      })
    )
  }
  
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
    
    return this.success(
      await ctx.service[ this.SERVICE_NAME ].count({
        where: ctx.service[ this.SERVICE_NAME ].qsToOp(query)
      })
    )
  }
  
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
    
    await ctx.service[ this.SERVICE_NAME ].create({
      data: body
    })
    
    return this.success()
  }
  
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
    
    return this.success(
      await ctx.service[ this.SERVICE_NAME ].update({
        where: { id },
        data: body
      })
    )
  }
  
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
    
    return this.success(
      await ctx.service[ this.SERVICE_NAME ].delete({
        where: { id }
      })
    )
  }
}

/**
 *  restFul 服务基类
 *
 *  ! 子类必须指定 SERVICE_NAME 属性
 *  ! 子类可以指定 include 属性查询时拼接关联数据
 *  ! 子类可以指定 attributes 属性来筛选查询时的属性
 *
 *  @example
 *    class Service extends RestFulService {
 *      constructor (...args) {
 *        super(...args)
 *        this.MODEL_NAME = 'Xxx'
 *        this.SERVICE_NAME = 'xxx'
 *      }
 *    }
 **/
exports.RestFulService = class extends Service {
  constructor (...args) {
    super(...args)
    this.MODEL_NAME = null
    this.include = null
    this.attributes = null
  }
  
  qsToOp (queryString) {
    let result = {}
    let innerResult = {}
    let supportQuery = _.pick(queryString, [
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
  
  async findAll ({ where, include, attributes, offset, limit, order }) {
    offset = offset && Number(offset)
    limit = limit && Number(limit)
    include = include || this.include
    attributes = attributes || this.attributes
    
    return {
      total: await this.ctx.model[ this.MODEL_NAME ].count({
        where, include
      }),
      data: await this.ctx.model[ this.MODEL_NAME ].findAll({
        where, include, attributes, offset, limit, order
      })
    }
  }
  
  async findOne ({ where, include, attributes }) {
    include = include || this.include
    attributes = attributes || this.attributes
    
    return await this.ctx.model[ this.MODEL_NAME ].findOne({
      where, include, attributes
    })
  }
  
  async count ({ where }) {
    return await this.ctx.model[ this.MODEL_NAME ].count({
      where
    })
  }
  
  async create ({ data }) {
    return await this.ctx.model[ this.MODEL_NAME ].create(
      data
    )
  }
  
  async update ({ where, data }) {
    return await this.ctx.model[ this.MODEL_NAME ].update(
      data,
      { where }
    )
  }
  
  async delete ({ where }) {
    return await this.ctx.model[ this.MODEL_NAME ].destroy({
      where
    })
  }
}
