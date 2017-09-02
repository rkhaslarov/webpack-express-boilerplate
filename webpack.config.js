const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
        "webpack-hot-middleware/client?reload=true",
        path.join(__dirname, 'client/src/app.js')
    ],
	output: {
		path: path.join(__dirname, 'client/build'),
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	watch: true,
	module: {
		loaders: [
            { test: /\.html$/,  loader: "html-loader" },
			{ test: /\.css$/, loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})) },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
			{ test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=50000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
			{ test: /\.(png|jpg)$/, loader: "url-loader" },
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', "stage-0"]}},
			{ test: /\.less$/, loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']}))},
		]
	},
	plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'client/src/index.tpl.html'),
          inject: 'body',
          filename: path.join(__dirname, 'client/index.html')
        }),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
	]
};
