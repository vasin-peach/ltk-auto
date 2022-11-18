const nodeExternals = require('webpack-node-externals');

module.exports = (config) => {
  config.externals = [
    nodeExternals({
      allowlist: [/^@libs/],
    }),
  ];

  return config;
};
