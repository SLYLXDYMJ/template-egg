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
  config.keys = appInfo.name + '_1600249926236_6274'
  
  // add your middleware config here
  config.middleware = [
    'error'
  ]
  
  // 关闭 csrf
  config.security = {
    csrf: {
      enable: false
    }
  }
  
  
  
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      ...dbConfig[ process.env.NODE_ENV ]
    },
    jwt: {
      secret: '加密钥匙'
    }
  }
  
  return {
    ...config,
    ...userConfig
  }
}
