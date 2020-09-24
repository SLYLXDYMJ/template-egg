const { Service } = require('egg')

const _ = require('lodash')

const MODEL_NAME = 'User'

module.exports = MODEL_NAME ? class extends Service {
  async findAll ({ offset, limit, order }) {
    offset = offset && Number(offset)
    limit = limit && Number(limit)
    
    return {
      total: await this.ctx.model[ MODEL_NAME ].count(),
      data: await this.ctx.model[ MODEL_NAME ].findAll({
        offset, limit, order
      })
    }
  }
  
  async findOne (where) {
    return await this.ctx.model[ MODEL_NAME ].findOne({
      where
    })
  }
  
  async count () {
    return await this.ctx.model[ MODEL_NAME ].count()
  }
  
  async create (data) {
    return await this.ctx.model[ MODEL_NAME ].create(
      data
    )
  }
  
  async update (where, data) {
    return await this.ctx.model[ MODEL_NAME ].update(
      data,
      { where }
    )
  }
  
  async delete (where) {
    return await this.ctx.model[ MODEL_NAME ].destroy({
      where
    })
  }
} : null