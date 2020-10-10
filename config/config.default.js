const dbConfig = require('../database/config')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601448273546_757'
  
  // add your middleware config here
  config.middleware = [
    'error'
  ]
  
  config.security = {
    csrf: false
  }
  
  config.sequelize = {
    ...dbConfig[ process.env.NODE_ENV ]
  }
  
  config.jwt = {
    secret: '需自行配置'
  }
  
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  
  return {
    ...config,
    ...userConfig
  }
}
