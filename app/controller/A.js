const { Controller } = require('egg')

const MODEL_NAME = ''

module.exports = MODEL_NAME ? class extends Controller {
  async findAll () {
    let { ctx } = this
    let { query } = ctx
    
    return ctx.helper.success(
      await ctx.service[ MODEL_NAME ].findAll(
        query
      )
    )
  }
  
  async findOne () {
    let { ctx } = this
    let { id } = ctx.params
    
    return ctx.helper.success(
      await ctx.service[ MODEL_NAME ].findOne({
        id
      })
    )
  }
  
  async count () {
    let { ctx } = this
    let { query } = ctx
    
    return ctx.helper.success(
      await ctx.service[ MODEL_NAME ].count(
        query
      )
    )
  }
  
  async create () {
    let { ctx } = this
    let { body } = ctx
    
    return ctx.helper.success(
      await ctx.service[ MODEL_NAME ].create(
        body
      )
    )
  }
  
  async update () {
    let { ctx } = this
    let { body, params } = ctx
    let { id } = params
    
    return ctx.helper.success(
      await ctx.service[ MODEL_NAME ].update(
        { id },
        body
      )
    )
  }
  
  async delete () {
    let { ctx } = this
    let { id } = ctx.params
    
    return ctx.helper.success(
      await ctx.service[ MODEL_NAME ].delete({
        id
      })
    )
  }
} : null