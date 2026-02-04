module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Add your configuration here
  api: {
    version: 'v1',
    prefix: '/api'
  }
};
