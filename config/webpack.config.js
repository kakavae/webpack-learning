const { merge } = require('webpack-merge')

const common = require('./webpack.config.common')
const prod = require('./webpack.config.prod')
const dev = require('./webpack.config.dev')

module.exports = (env) => {
  console.log(env)
  switch (true) {
    case env.production:
      return merge(common, prod)
    case env.development:
      return merge(common, dev)
    default:
      throw new Error('no mathching')
  }
}