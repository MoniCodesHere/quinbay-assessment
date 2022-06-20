const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
     app.use(
        '/backend/search/products?searchTerm=null',
        createProxyMiddleware( {
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
     )
}