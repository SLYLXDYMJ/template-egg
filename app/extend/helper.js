const _ = require('lodash')
const { Op } = require('sequelize')

/**
 *  统一的成功的响应消息
 **/
exports.success = function (data, msg = '√') {
  let { ctx } = this
  
  ctx.body = {
    status: 200,
    msg, data
  }
}

/**
 *  格式化查询对象
 **/
exports.queryToOpQuery = function (query) {
  let result = {}
  let innerResult = {}
  let supportQuery = _.pick(query, [
    'eq', 'ne',
    'in', 'notIn',
    'lt', 'lte', 'gt', 'gte',
    'like', 'notLike'
  ])
  
  /**
   *  构建 innerResult
   **/
  _.each(supportQuery, (qsStr, opStr) => {
    _.chain(qsStr)
      .split(',')
      .tap(result => {
        /**
         *  before:
         *    id:1,id:2,type:web
         *    ------------
         *    name:jason
         *  after:
         *    [ 'id:1', 'id:2', 'type:web' ]
         *    ------------
         *    [ 'name:jason' ]
         **/
        // console.log(result)
      })
      .map(qsItemStr => {
        return _.split(qsItemStr, ':')
      })
      .tap(result => {
        /**
         *  before:
         *    [ 'id:1', 'id:2', 'type:web' ]
         *    ------------
         *    [ 'name:jason' ]
         *  after:
         *    [ [ id, 1 ], [ id, 2 ], [ type, web ] ]
         *    ------------
         *    [ [ name, jason ] ]
         **/
        // console.log(result)
      })
      .each(qsItem => {
        /**
         *  [ id, 1 ]
         **/
        let [ key, value ] = qsItem
        
        /**
         *  value 若可以转为 number 则转换
         *  防止数据库查询时类型带来的问题
         **/
        value = Number(value) || value
        
        /**
         *  in，like 操作符
         *  value 转换
         **/
        switch (opStr) {
          case 'in':
          case 'notIn' : {
            value = [ value ]
            break
          }
          case 'like':
          case 'notLike' : {
            value = `%${ value }%`
            break
          }
        }
        
        /**
         *  初始化对应 key 值的查询对象
         *  ex:
         *    innerResult = { id: {} }
         **/
        innerResult[ key ] = innerResult[ key ] || {}
        
        /**
         *  整合操作符查询条件
         *    ex:
         *      innerResult.id.in = [ 1, 2 ]
         *      innerResult.type.eq = 'php'
         **/
        innerResult[ key ][ opStr ] = innerResult[ key ][ opStr ] ?
          _.concat([], innerResult[ key ][ opStr ], value) :
          value
      })
      .tap(() => {
        /**
         *  innerResult = {
         *    id: { in: [ 1, 2 ] },
         *    type: { eq: 'web', in: [ 'web' ] }
         *  }
         **/
      })
      .value()
  })
  
  /**
   *  根据 innerResult 构建 result
   **/
  _.each(innerResult, (innerResultItemQuery, key) => {
    let root = result[ Op.and ] = result[ Op.and ] || []
    let transformItemQuery = {
      [ key ]: { [ Op.and ]: {} }
    }
    
    _.each(innerResultItemQuery, (val, opStr) => {
      transformItemQuery[ key ][ Op.and ][ Op[ opStr ] ] = val
    })
    
    root.push(transformItemQuery)
  })
  
  return result
}