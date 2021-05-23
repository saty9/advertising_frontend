var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  devServer: {
    allowedHosts: [".ngrok.io", "127.0.0.1", "localhost", "192.168.1.211"],
    proxy: {
      "^/api": {
        target: "http://localhost:8000"
      },
      "^/admin": {
        target: "http://localhost:8000"
      },
      "^/media/": {
        target: "http://localhost:8000"
      },
      "^/static/": {
        target: "http://localhost:8000"
      }
    }
  },
  configureWebpack: {
    plugins: [
      new SWPrecacheWebpackPlugin({
        cacheId: 'my-vue-app',
        filename: 'service-worker.js',
        //staticFileGlobs: ['dist/**/*.{js,html,css}'],
        minify: true,
        //stripPrefix: 'dist/',
        runtimeCaching: [
          {
            urlPattern: /\/media\/.*/,
            handler: 'cacheFirst'
          }
          ]
      })
    ]
  }
}
