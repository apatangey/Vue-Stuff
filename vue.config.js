const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://maps.geoapify.com',  // Replace with the actual API URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // Remove the /api prefix when forwarding the request
        }
      }
      // You can add more proxy configurations if needed
    }
  }
})
