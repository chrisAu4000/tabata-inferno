const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: './src/index.js',
	output: {
		path: '.',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/'
	},
	devtool: 'source-map',
	module: {
		loaders: [
      {
			  test: /\.js$/,
			  loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loaders: ['raw-loader']
      },
      {
        test: /\.(jpg|png)$/,
        loaders: ['file-loader'],
        options: {
          name: '[path][name].[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: false,
		hot: true,
		inline: true,
		proxy: {
			'/': {
				bypass: function (req, res, proxyOptions) {
					return '/public/index.html';
				}
			}
		}
	},
	plugins: [
    new htmlWebpackPlugin({ template: './public/index.html', inject: false }),
    new webpack.HotModuleReplacementPlugin()
	]
};
