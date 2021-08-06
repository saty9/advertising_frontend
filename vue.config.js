const {GenerateSW} = require('workbox-webpack-plugin');

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
      new GenerateSW({
        cacheId: 'my-vue-app',
        exclude: [/.*/],
        //staticFileGlobs: ['dist/**/*.{js,html,css}'],
        //stripPrefix: 'dist/',
        runtimeCaching: [
          {
            urlPattern: /\/media\/.*/,
            handler: 'CacheFirst'
          }
          ]
      })
    ]
  }
}
