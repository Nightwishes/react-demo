/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554558266457_7289';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: false
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/blog',
      options: {}
    }
  }
  config.cors = {
    origin: 'http://localhost:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE',
    // 允许客户端携带cookie
    credentials: true
  }
  config.static = {
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true, // 如果当前访问的静态资源没有缓存。则缓存静态文件
    preload: false
  }
  config.multipart = {
    mode: 'stream'
  }
  config.view = {
    mapping: {'.html': '.ejs'}
  }
  // 配置mongoose mongoose是node里面操作mongodb数据库的一个模块 它可以以对象的形式操作数据库
  return {
    ...config,
    ...userConfig,
  };
};