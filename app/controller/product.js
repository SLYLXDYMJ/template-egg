const _ = require('lodash')
const { Controller: EggController } = require('egg')
const helper = require('../extend/helper')

const MODEL_NAME = 'Product'

const SERVICE_NAME = MODEL_NAME.toLowerCase()

const Controller = MODEL_NAME ? class extends EggController {

} : null

/**
 *  生成模型基础的 "增删改查" controller
 **/
MODEL_NAME && _.each(helper.createModelBaseController(MODEL_NAME), (handler, key) => {
  Controller.prototype[ key ] = Controller.prototype[ key ] || handler
})

module.exports = Controller

