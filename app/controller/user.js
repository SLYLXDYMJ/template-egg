const _ = require('lodash')
const { RestFulController } = require('../core/rest-ful')
const jwt = require('jsonwebtoken')
const rules = require('../validate/rules')
const Validator = require('async-validator').default

/**
 *  ! 必须有值，否则默认跳过
 *  首字母大写，对应的模型名称
 **/
const MODEL_NAME = 'User'

const Controller = MODEL_NAME ? class extends RestFulController {
  constructor (...args) {
    super(...args)
    this.SERVICE_NAME = MODEL_NAME.toLowerCase()
  }
  
  async login () {
    let { ctx, app } = this
    let { request, service } = ctx
    let { username, password } = request.body
    
    // 判断格式
    let errs = await new Validator({
      username: rules.username,
      password: rules.password
    })
      .validate({ username, password })
      .catch(err => err.errors)
    
    /**
     *  ! 格式错误
     **/
    if (errs) {
      return this.fail(403, errs[ 0 ].message)
    }
    
    // 查找用户
    let user = await service.user.findOne({
      where: { username, password }
    })
    
    /**
     *  ! 用户没找到
     **/
    if (!user) {
      return this.fail(403, '用户名或密码错误')
    }
    
    return this.success({
      user,
      token: jwt.sign(
        { id: user.id },
        app.config.jwt.secret,
        { expiresIn: '15d' }
      )
    })
  }
  
  async register () {
    let { ctx, app } = this
    let { request, service } = ctx
    let { username, password } = request.body
    
    // 判断格式
    let errs = await new Validator({
      username: rules.username,
      password: rules.password
    })
      .validate({ username, password })
      .catch(err => err.errors)
    
    /**
     *  ! 格式错误
     **/
    if (errs) {
      return this.fail(403, errs[ 0 ].message)
    }
    
    /**
     *  ! 已有用户
     **/
    else if (await service.user.findOne({
      where: { username }
    })) {
      return this.fail(403, '该用户名已被使用')
    }
    
    // 创建用户
    let user = await service.user.create({
      data: { username, password }
    })
    
    // 将用户添加到 user 组中
    let userRole = await service.role.findOne({
      where: { name: 'user' }
    })
    userRole.addUser(user)
    
    return this.success(null, '用户注册成功')
  }
} : null

module.exports = Controller
