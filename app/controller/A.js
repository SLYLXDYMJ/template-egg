const { Controller } = require('egg')

const MODULE_NAME = ''
const SERVICE_NAME = MODULE_NAME.toLowerCase()

module.exports = MODULE_NAME ? class extends Controller {
  async findAll () {
    let { ctx } = this
    let { query } = ctx
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].findAll(
        query
      )
    )
  }
  
  async findOne () {
    let { ctx } = this
    let { id } = ctx.params
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].findOne({
        id
      })
    )
  }
  
  async count () {
    let { ctx } = this
    let { query } = ctx
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].count(
        query
      )
    )
  }
  
  async create () {
    let { ctx } = this
    let { body } = ctx.request
    
    return ctx.helper.success(
      await ctx.service[ SERVICE_NAME ].create(
        body
      )
    )
  }
  
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