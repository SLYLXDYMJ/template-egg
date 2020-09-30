const _ = require('lodash')
const { Service: EggService } = require('egg')
const helper = require('../extend/helper')

/** 模型名称 **/
const MODEL_NAME = ''

const Service = MODEL_NAME ? class extends EggService {
} : null

/**
 *  生成模型基础的 "增删改查" service
 **/
MODEL_NAME && _.each(helper.createModelBaseService(MODEL_NAME), (handler, key) => {
  Service.prototype[ key ] = Service.prototype[ key ] || handler
})

module.exports = Service
