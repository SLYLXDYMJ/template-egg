module.exports = function (options, app) {
  return async function (ctx, next) {
    return next()
  }
}

