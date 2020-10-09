const { Controller: EggController } = require('egg')
const _ = require('lodash')
const helper = require('../extend/helper')

const MODEL_NAME = 'Role'

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
