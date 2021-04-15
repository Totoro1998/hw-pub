const path = require('path');
const { dev } = require('./config');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const aliyunTheme = require('@ant-design/aliyun-theme');
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devServer: {
    proxy: dev.proxyList,
  },
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': resolve('src'),
    };
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip', // 使用gzip压缩
          test: /\.js$|\.html$|\.css$/, // 匹配文件名
          filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
          minRatio: 1, // 压缩率小于1才会压缩
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件
        })
      );
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ]);
    config.plugins.delete('prefetch');
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
    config.when(isProd, (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          'ant-design-vue': {
            name: 'chunk-ant-design-vue', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single');
      config.optimization.minimizer('terser').tap((args) => [
        ...args,
        {
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
            output: {
              comments: false,
            },
          },
        },
      ]);
    });
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: aliyunTheme,
        },
      },
    },
  },
};
