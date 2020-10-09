/**
 *  初始化模型表结构
 *  ! development 使用 sync 的方式
 *  ! production  建议使用 migrations 的方式
 **/
exports.initModel = async function () {
  return await this.model.sync({
    force: process.env.NODE_ENV === 'development'
  })
}

/**
 *  初始化权限表数据
 *
 *  默认角色
 *    admin - 超级管理员
 *    user  - 普通用户
 *
 *  超级管理远默认账号密码
 *    admin
 *    admin
 **/
exports.initRole = async function () {
  let ctx = this.createAnonymousContext()
  
  let adminRole =
    await ctx.service.role.findOne({
      where: { name: 'admin' }
    }) ||
    await ctx.service.role.create({
      data: {
        name: 'admin',
        description: '超级管理员'
      }
    })
  
  let userRole =
    await ctx.service.role.findOne({
      where: { name: 'user' }
    }) ||
    await ctx.service.role.create({
      data: {
        name: 'user',
        description: '普通用户'
      }
    })
  
  let admin = (await adminRole.getUsers()).length
  
  admin || userRole.addUser(await ctx.service.user.create({
    data: {
      username: 'admin',
      password: 'admin'
    }
  }))
}
