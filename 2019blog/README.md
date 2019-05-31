### 按需加载
默认配置进行自定义，react-app-rewired(一个对create-react-app进行自定义配置的社区解决方案)
- 安装react-app-rewired
> cnpm i react-app-rewired -S

使用react-app-rewired来启动脚本,这样会除原本的webpack配置之外再覆盖添加自己的配置
  ``` json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app-rewired eject"
  },
  ```
  创建一个config-overrides.js进行修改默认配置
  ``` javascript
  module.exports = function override(config, env) {
    return config;
  }
  ```
  [create-react-app v2实现按需加载antd的文章](https://github.com/ant-design/ant-design-mobile/issues/3094)
  ### babel-plugin-import
  babel-plugin-import是一个用于按需加载组件代码和样式的babel插件
  > cnpm i babel-plugin-import -D

