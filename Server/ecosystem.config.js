module.exports = {
  apps: [{
    name: 'app',
    script: './dist/src/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
    },
  }],
};