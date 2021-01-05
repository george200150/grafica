const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(glsl|txt|obj|ply|stl|fbx|3ds|x3d)$/i,
        use: 'raw-loader',
      },{
        test: /\.(png|jpg|gif)$/i,
        use: 'url-loader',
           
      }
    ],
  },
};
