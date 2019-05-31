const {
  addLessLoader,
  fixBabelImports,
  override
} = require('customize-cra');
module.exports = {
  webpack: override(
    addLessLoader({
      javascriptEnabled: true,
      modifyvars: {
        '@primary-color': '#1DA57A'
      }
    }),
    fixBabelImports('babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
      css: true,
    })
  )
}
