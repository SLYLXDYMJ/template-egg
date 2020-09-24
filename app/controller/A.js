const { Controller } = require('egg')

const _ = require('lodash')

const MODULE_NAME = ''
const SERVICE_NAME = MODULE_NAME.toLowerCase()

module.exports = MODULE_NAME ? class extends Controller {
  /**
   *  @api { GET } /[model-name] 获取数据列表
   *  @apiGroup 模型增删改查
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
    
    offset = offset && Number(offset)
    limit = limit && Number(limit)
    order = order && _.chain(order)
      .split(',')
      .map(item => item.split(':'))
      .value()
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].findAll(_.omitBy({
        offset, limit, order
      }, _.isNil))
    )
  }
  
  /**
   *  @api { GET } /[model-name]/:id 根据 id 查询单条数据
   *  @apiGroup 模型增删改查
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
   *  @api { GET } /[model-name]/count 获取数量
   *  @apiGroup 模型增删改查
   *
   *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
   *  @apiSuccess (成功响应_) { Number } data 数量
   *
   *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
   **/
  async count () {
    let { ctx } = this
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].count()
    )
  }
  
  /**
   *  @api { POST } /[model-name] 创建条目
   *  @apiGroup 模型增删改查
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
   *  @api { PUT } /[model-name]/:id 更新条目
   *  @apiGroup 模型增删改查
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
   *  @api { DELETE } /[model-name]/:id 删除条目
   *  @apiGroup 模型增删改查
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