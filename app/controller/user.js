const { Controller } = require('egg')

const _ = require('lodash')
const jwt = require('jsonwebtoken')

const MODULE_NAME = 'User'
const SERVICE_NAME = MODULE_NAME.toLowerCase()

module.exports = MODULE_NAME ? class extends Controller {
  /**
   *  @api { Post } /login 登录
   *  @apiGroup 用户
   *
   *  @apiParam (请求体) { String } username 用户名
   *  @apiParam (请求体) { String } password 密码
   *
   *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
   *
   *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
   **/
  async login () {
    let { ctx, app } = this
    
    return ctx.helper.success({
      token: jwt.sign(
        {
          id: ctx.user.id
        },
        app.config.jwt.secret,
        {
          expiresIn: '15d'
        }
      ),
      user: ctx.user
    })
  }
  
  /**
   *  @api { Post } /register 注册
   *  @apiGroup 用户
   *
   *  @apiParam (请求体) { String } username 用户名
   *  @apiParam (请求体) { String } password 密码
   *
   *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
   *
   *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
   **/
  async register () {
    let { ctx } = this
    let { username, password } = ctx.request.body
    
    if (!username || !password) {
      return ctx.throw(400, '用户名或密码不能为空')
    }
    else if (await ctx.service.user.findOne({ username })) {
      return ctx.throw(400, '用户名已存在')
    }
    
    try {
      await ctx.service.user.create({
        username,
        password
      })
      return ctx.helper.success('注册成功')
    }
    catch (err) {
      return ctx.throw(err)
    }
  }
  
  /**
   *  @api { Get } /me 获取用户信息
   *  @apiGroup 用户
   *
   *  @apiSchema (请求头) {jsonschema=../../apidoc/schema/jwt-auth.json} apiHeader
   *
   *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
   *
   *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
   **/
  async getInfo () {
    let { ctx, app } = this
    
    return ctx.helper.success(
      ctx.user
    )
  }
  
  /**
   *  @api { Put } /password 修改密码
   *  @apiGroup 用户
   *
   *  @apiSchema (请求头) {jsonschema=../../apidoc/schema/jwt-auth.json} apiHeader
   *
   *  @apiParam (请求体) { String } originPassword 原始密码
   *  @apiParam (请求体) { String } newPassword    新密码
   *
   *  @apiSchema (成功响应) {jsonschema=../../apidoc/schema/success.json} apiSuccess
   *
   *  @apiSchema (失败响应) {jsonschema=../../apidoc/schema/fail.json} apiSuccess
   **/
  async changePassword () {
    let { ctx } = this
    let { user } = ctx
    let { originPassword, newPassword } = ctx.request.body
    
    if (!originPassword || !newPassword) {
      return ctx.throw(400, '原始密码和新密码不能为空')
    }
    else if (user.password !== originPassword) {
      return ctx.throw(400, '原始密码错误')
    }
    
    await ctx.service.user.update(
      { id: user.id },
      { password: newPassword }
    )
    
    return ctx.helper.success()
  }
  
  /**
   *  @apiIgnore
   *  @api { GET } /user 获取数据列表
   *  @apiGroup 用户
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
    
    where = ctx.helper.queryToOpQuery(query)
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
   *  @api { GET } /user/:id 根据 id 查询单条数据
   *  @apiGroup 用户
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
   *  @api { GET } /user/count 获取数量
   *  @apiGroup 用户
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
        ctx.helper.queryToOpQuery(query)
      )
    )
  }
  
  /**
   *  @apiIgnore
   *  @api { POST } /user 创建条目
   *  @apiGroup 用户
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
   *  @api { PUT } /user/:id 更新条目
   *  @apiGroup 用户
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
   *  @api { DELETE } /user/:id 删除条目
   *  @apiGroup 用户
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