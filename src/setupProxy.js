const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/users/**',
    createProxyMiddleware({
      // target: 'https://handicraft-002.herokuapp.com/',
      target: 'http://localhost:9000/',
      changeOrigin: true
    })
  )
  //   app.use(createProxyMiddleware('/otherApi/**', { target: 'http://localhost:5000' }));
}
