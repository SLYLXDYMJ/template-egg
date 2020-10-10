const _ = require('lodash')
const { RestFulService } = require('../core/rest-ful')

/**
 *  ! 必须有值，否则默认跳过
 *  首字母大写，对应的模型名称
 **/
const MODEL_NAME = 'User'

const Service = MODEL_NAME ? class extends RestFulService {
  constructor (...args) {
    super(...args)
    this.MODEL_NAME = MODEL_NAME
    this.include = [
      this.ctx.model.Role
    ]
    this.attributes = {
      exclude: [ 'password' ]
    }
  }
} : null

module.exports = Service
