const _ = require('lodash')

module.exports = function (roleName, app) {
  return async function (ctx, next) {
    let user = ctx.user;
    let userRoleArr = _.map(ctx.user.roles, 'name')
    
    /**
     *  验证用户身份
     *  这里代码仅包含身份验证
     *  所以只要身份不对就会抛出错误
     *  给 catch 执行
     **/
    try {
      /**
       *  普通用户角色只需要 jwt 验证通过就可以了
       *  其他的角色才要继续验证
       **/
      if (
        roleName !== 'user' &&
        _.includes(userRoleArr, roleName) === false
      ) {
        throw new Error()
      }
      
      return next()
    }
      
      /**
       *  统一给出响应信息
       **/
    catch (err) {
      return ctx.throw(403, '您无权限调用该接口')
    }
  }
}
