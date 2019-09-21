const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 mode : 'development',
 entry : {
   app : path.resolve(__dirname,'src/index.js')
 },
 output : {
   path : path.resolve(__dirname,'dist'),
   filename : 'js/[name].js',
   publicPath : '/',
 },
 devServer : {
   port : 8000,
   open : true,
   hot : true,
   historyApiFallback : true,
   contentBase : path.resolve(__dirname,'dist'),
   stats : { colors : true }
 },
 module : {
   rules : [
     {
       test : /\.js$/,
       exclude : /node_modules/,
       use : {
         loader : 'babel-loader'
       }
     },
     {
       test : /\.css|scss$/,
       use : ['style-loader','css-loader','sass-loader']
     },
     {
       test : /\.(png|jpg|gif|webp)$/,
       use : {
         loader : 'file-loader',
         options : {
           outputPath : './dist',
           name : 'assets/[name].[ext]'
         }

         }
     },
     {
       test : /\.svg$/,
       use : {
         loader : 'svg-url-loader'
       }
     }
   ]
 },
 plugins : [
   new webpack.HotModuleReplacementPlugin(),
   new HtmlWebpackPlugin({
     template : path.resolve(__dirname,'public/index.html'),
     filename : './index.html'
   })
 ]
}