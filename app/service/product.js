const { Service } = require('egg')
const { Op } = require('sequelize')

const MODEL_NAME = 'Product'

module.exports = MODEL_NAME ? class extends Service {
  async findAll ({ where, offset, limit, order }) {
    offset = offset && Number(offset)
    limit = limit && Number(limit)
    
    return {
      total: await this.ctx.model[ MODEL_NAME ].count({
        where
      }),
      data: await this.ctx.model[ MODEL_NAME ].findAll({
        where, offset, limit, order
      })
    }
  }
  
  async findOne (where) {
    return await this.ctx.model[ MODEL_NAME ].findOne({
      where
    })
  }
  
  async count (where) {
    return await this.ctx.model[ MODEL_NAME ].count({
      where
    })
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