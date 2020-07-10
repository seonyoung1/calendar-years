const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	devtool: 'source-map',
	mode: 'development',
	resolve: {
		extensions: ['.js'],
	},
	entry: {
		// app: ['@babel/polyfill', './src/js/app.js'],
		'../build/style': ['./src/scss/style.scss']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	plugins: [
	    new MiniCssExtractPlugin({ filename: 'css/style.css' })
    ],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: 'expanded', //nested, expanded, compact, compressed
							},
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					publicPath: '../',
					name: 'images/[name].[ext]',
					limit: 1000,
				}
			},
			{
				test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					publicPath: '../',
					name: 'fonts/[name].[ext]',
					limit: 1000,
				}
			}
		],
	},
};
