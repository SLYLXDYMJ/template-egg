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
exports.formatOperatorQuery = function (query) {
  let itemResult = {}
  let supportQuery = _.pick(query, [
    'eq', 'ne',
    'in', 'notIn',
    'lt', 'lte', 'gt', 'gte',
    'like', 'notLike'
  ])
  
  _.each(supportQuery, (val, operator) => {
    let tmpResult = {}
    
    // [['id:1'], ['id:2'], ['type:web']]
    _.each(val.split(','), itemArr => {
      // [['id', 1], ['id', 2], ['type', 'web']]
      let [ key, value ] = itemArr.split(':')
      
      // value 若为 number 类型则转化
      value = Number(value) || value
      
      // in 和 like 操作符值特殊处理
      switch (operator) {
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
      
      // 默认为对象
      tmpResult[ key ] = tmpResult[ key ] || {
        operator,
        value: null
      }
      
      // 整合值
      tmpResult[ key ].value = tmpResult[ key ].value ?
        [
          ..._.flatten([ tmpResult[ key ].value ]),
          ..._.flatten([ value ])
        ] :
        value
    })
    
    // { id: { operator: 'in', value: [ 1, 2 ] }, type: { operator: 'in', value: 'web' } }
    _.each(tmpResult, (data, key) => {
      let { operator, value } = data
      
      itemResult[ key ] = itemResult[ key ] || {
        [ Op.and ]: []
      }
      
      itemResult[ key ][ Op.and ].push({
        [ Op[ operator ] ]: value
      })
    })
  })
  
  return {
    [ Op.and ]: _.map(itemResult, (item, key) => {
      return {
        [ key ]: item
      }
    })
  }
}