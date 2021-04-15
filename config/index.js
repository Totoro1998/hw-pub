const proxyList = {
  [`/dev-api/loonflow`]: {
    target: 'https://dev-gamepub.modooplay.com/', //接口服务器地址
    changeOrigin: true,
    url: '/dev-api/loonflow',
    secure: false,
    ws: false, // need close
    pathRewrite: {
      [`^/dev-api/loonflow`]: '/loonflow',
    },
  },
  [`/dev-api`]: {
    target: 'https://dev-gamepub.modooplay.com/', //接口服务器地址
    changeOrigin: true,
    url: process.env.VUE_APP_BASE_API,
    secure: false,
    ws: false, // need close
    pathRewrite: {
      [`^${process.env.VUE_APP_BASE_API}`]: '',
    },
  },
};
module.exports = {
  dev: {
    proxyList,
  },
  prod: {},
};
