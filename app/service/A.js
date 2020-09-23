const { Service } = require('egg')

const MODEL_NAME = ''

module.exports = MODEL_NAME ? class extends Service {
  async findAll (where) {
    return await this.ctx.model[ MODEL_NAME ].findAll({
      where
    })
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
    return await this.ctx.model[ MODEL_NAME ].create({
      ...data
    })
  }
  
  async update (where, data) {
    return await this.ctx.model[ MODEL_NAME ].update(
      data,
      where
    )
  }
  
  async delete (where) {
    return await this.ctx.model[ MODEL_NAME ].destroy(
      where
    )
  }
} : null