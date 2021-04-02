const path = require('path');
const { dev } = require('./config');
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  devServer: {
    proxy: dev.proxyList,
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
        },
      },
    };
  },
  runtimeCompiler: true,
  productionSourceMap: false,
};
