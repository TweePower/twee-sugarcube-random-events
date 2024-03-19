const path = require('path');

module.exports = {
  entry: './src/RandomEventApp.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'random-event-library.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: {
      name: 'RandomEventAppExport',
      type: 'var',
    },
  },
};
