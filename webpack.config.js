const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style!less!css!'
      }
    ]
  },
  externals: {
    'vue2-transitions': 'vue2-transitions'
  }
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-faq-accordion.min.js',
      libraryTarget: 'window',
      library: 'VueFaqAccordion',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/Accordion.vue'),
    output: {
      filename: 'vue-faq-accordion.js',
      libraryTarget: 'umd',
      library: 'vue-faq-accordion',
      umdNamedDefine: true
    }
  })
];