import nodeExternals from 'webpack-node-externals'

export default (config) => {
  config.externals = [
    nodeExternals({
      allowlist: [/^@libs/],
    }),
  ]

  return config
}
