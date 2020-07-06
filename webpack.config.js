const path = require(`path`);
const publicFolder = path.join(__dirname, `public`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: publicFolder
  },
  devServer: {
    contentBase: publicFolder,
    open: true,
    inline: true,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: `babel-loader`
      }
    },
    ],
  },
  devtool: `source-map`
};
