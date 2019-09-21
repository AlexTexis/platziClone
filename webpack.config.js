const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
 mode : 'production',
 entry : {
   app : path.resolve(__dirname,'src/index.js')
 },
 output : {
   path : path.resolve(__dirname,'dist'),
   filename : 'js/[name].[hash].js',
   publicPath : '/',
 },
 optimization :{
  minimizer : [
    new TerserPlugin(),
    new OptimizeCssAssetsPlugin()
  ],
  splitChunks : {
    name : true,
    chunks : 'async',
    cacheGroups : {
      vendors : {
        name : 'vendors',
        chunks : 'all',
        reuseExistingChunk : true,
        enforce : true,
        priority : 1,
        filename : 'js/vendor.[hash].js',
        test(module,chunks) {
         const name = module.nameForCondition && module.nameForCondition()
         return chunks.some( chunk => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name))
        }
      }
    }
  }
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
       use : [
          {
            loader : MiniCssExtractPlugin.loader
          },
         'css-loader',
         'postcss-loader',
         'sass-loader']
     },
    //  {
    //    test : /\.(png|jpg|gif|webp)$/,
    //    use : {
    //      loader : 'file-loader',
    //      options : {
    //        outputPath : './dist',
    //        name : 'assets/[name].[ext]'
    //      }

    //      }
    //  },
    //  {
    //    test : /\.svg$/,
    //    use : {
    //      loader : 'svg-url-loader'
    //    }
    //  }
   ]
 },
 plugins : [
   new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns : ['**/app.*','**/vendor.*']
   }),
   new webpack.LoaderOptionsPlugin({
     options : {
       postcss : [
         autoprefixer()
       ]
     }
   }),
   new MiniCssExtractPlugin({
     filename : 'css/[name].[hash].css'
   })
   ,
   new HtmlWebpackPlugin({
     template : path.resolve(__dirname,'public/index.html'),
     filename : './index.html'
   })
 ]
}