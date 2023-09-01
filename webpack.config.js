const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const GlobEntries = require('webpack-glob-entries');

module.exports = {
  mode: 'production',
  entry: GlobEntries('./src/**/*.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.d.ts', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  externals: /^(\@datakit-dev\/types|https?\:\/\/)(\/.*)?/,
  // Generate map files for compiled scripts
  // devtool: "source-map",
  stats: {
    colors: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    // Don't minimize, as it's not used in the browser
    minimize: false,
  },
};
