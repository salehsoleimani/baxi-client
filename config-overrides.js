const { override, addWebpackPlugin } = require('customize-cra');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = override(addWebpackPlugin(new WorkboxWebpackPlugin.GenerateSW()));
