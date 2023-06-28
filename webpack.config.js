const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const jsxRegex = /\.(js|jsx)$/; // js, jsx regex
const tsxRegex = /\.(ts|tsx)$/; // ts, tsx regex
const sassRegex = /(\.module|.*)\.(scss|sass)$/; // sass, scss, module regex

const isDevPlugin = [
    '@babel/plugin-proposal-class-properties',
    'react-refresh/babel',
]; // for dev mode babel loader plugin
const isProdPlugin = [
    '@babel/plugin-proposal-class-properties',
    'transform-remove-console'
]; // for production mode babel loader

module.exports = (mode, options) => {
  const isDevelopment = options.mode === 'development';
  const plugin = isDevelopment ? isDevPlugin : isProdPlugin;
  return {
    entry: {
      main: ['./src/Main.tsx'],
    },
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
      //modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        '@scss': path.resolve(__dirname, './src/scss'),
        '@pages': path.resolve(__dirname, './src/components/pages'),
        //'@layout': path.resolve(__dirname, './src/components/pages/layout'),
        '@common': path.resolve(__dirname, './src/common'),
        '@network': path.resolve(__dirname, './src/network'),
        //'@hooks': path.resolve(__dirname, './src/components/hooks'),
        '@store': path.resolve(__dirname, './src/store'),
        '@interfaces': path.resolve(__dirname, './src/interfaces'),
        '@helper': path.resolve(__dirname, './src/components/helper'),
        '@lib': path.resolve(__dirname, './src/lib'),
      }
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: tsxRegex,
          //exclude: /node_modules/,
          exclude: /(node_modules|bower_components)/,
          include: path.resolve(__dirname, './src'),
          use: [
            //{
            //    loader: "ts-loader",
            //},
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env', '@babel/react', '@babel/typescript'],
                plugins: [
                  ["@babel/transform-runtime", {
                      regenerator: true
                  }], ...plugin
                ],
              },
            },
          ]
        },
        {
          test: jsxRegex,
          include: path.resolve(__dirname, './src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env', '@babel/react', '@babel/typescript'],
                plugins: [
                  ["@babel/transform-runtime", {
                      regenerator: true
                  }], ...plugin
                ],
              },
            },
            { loader: 'eslint-loader' },
          ],
        },
        {
          test: sassRegex,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
          exclude: /node_modules/,
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
          }]
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: './public/index.html', // 생성한 템플릿 파일
      }),
      new ReactRefreshWebpackPlugin(), // hot loader plugin
    ],
    devServer: {
      //contentBase: './public',
      static: './public',
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
