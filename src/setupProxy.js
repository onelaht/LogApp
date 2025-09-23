const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // Path to trigger the proxy
        createProxyMiddleware({
            target: 'http://localhost:5000', // Your backend server URL
            changeOrigin: true, // Important for virtual hosted sites
        })
    );
};