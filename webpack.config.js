var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const projectRoot = path.resolve(__dirname, './')

var baseConfig = {
  entry: {
    app: './src/main.js',
    vendor: ['jquery', 'vue']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name]__[hash].js?'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: path.join(__dirname, './node_modules'),
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'assets': path.resolve(projectRoot, 'src/assets'),
      '~vuex': path.resolve(projectRoot, 'src/vuex')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?.*$|$)$/,
        loader: 'url-loader',
        options: {
          name: '[name]__[hash].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery"
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  // PRODUCTION
  module.exports = webpackMerge(baseConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  })
} else {
  // DEVELOPMENT
  module.exports = webpackMerge(baseConfig, {
    devtool: '#eval-source-map',
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      hot: true,
      clientLogLevel: 'warning',
      contentBase: path.resolve(projectRoot, 'dist'),
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true
      })
    ]
  })
}
