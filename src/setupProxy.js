//const { createProxyMiddleware } = require('http-proxy-middleware');
//module.exports = function(app) {
//   app.use('/users/**',
//    createProxyMiddleware({
//        target: 'http://localhost:9000',
//        changeOrigin: true
//    }));
////   app.use(createProxyMiddleware('/otherApi/**', { target: 'http://localhost:5000' }));
// };