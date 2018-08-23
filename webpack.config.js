const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/assets/dist',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },

  devtool: 'source-map',

  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      { 
        test: /\.json$/,
        loader: 'json-loader'
      },
      { 
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
       }
    ]
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: [new ErrorOverlayPlugin()]
};