const _ = require('lodash')

module.exports = function (roleName, app) {
  return async function (ctx, next) {
    // 先过 jwt 验证
    await app.passport.authenticate('jwt', { successRedirect: null })(
      ctx,
      // 再根据 roleName 验证用户身份
      () => {
        try {
          let roleArr = _.map(ctx.user.roles, 'name')
          
          /**
           *  普通用户角色只需要 jwt 验证通过就可以了
           *  其他的角色才要继续验证
           **/
          if (
            roleName !== 'user' &&
            _.includes(roleArr, roleName) === false
          ) {
            throw new Error()
          }
          
          return next()
        }
        catch (err) {
          return ctx.throw(403, '您无权限调用该接口')
        }
      }
    )
  }
}
