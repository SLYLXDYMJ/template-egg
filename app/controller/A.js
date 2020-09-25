const { Controller } = require('egg')

const _ = require('lodash')

const MODULE_NAME = ''
const SERVICE_NAME = MODULE_NAME.toLowerCase()

module.exports = MODULE_NAME ? class extends Controller {
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
   *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
   **/
  async findAll () {
    let { ctx } = this
    let { query } = ctx
    let { offset, limit, order } = query
    let where = null
    
    where = ctx.helper.formatOperatorQuery(query)
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
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].findOne({
        id
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
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].count(
        ctx.helper.formatOperatorQuery(query)
      )
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
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].create(
        body
      )
    )
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
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].update(
        { id },
        body
      )
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
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].delete({
        id
      })
    )
  }
} : null