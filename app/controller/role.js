const _ = require('lodash')
const { RestFulController } = require('../core/rest-ful')

/**
 *  ! 必须有值，否则默认跳过
 *  首字母大写，对应的模型名称
 **/
const MODEL_NAME = 'Role'

const Controller = MODEL_NAME ? class extends RestFulController {
  constructor (...args) {
    super(...args)
    this.SERVICE_NAME = MODEL_NAME.toLowerCase()
  }
} : null

module.exports = Controller
