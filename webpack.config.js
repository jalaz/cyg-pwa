const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    console.log(env);
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: {
            vendor: [
                'react',
                'react-dom'
            ],
            app: './src/index.tsx'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            ]
        },
        resolve: {
            modules: [
                path.resolve('./src'),
                path.resolve('./node_modules')
            ]
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'public'),
            globalObject: `(typeof self !== 'undefined' ? self : this)`
        },
        plugins: [
            new CleanWebpackPlugin('public'),
            new CopyWebpackPlugin([
                {from: './src/assets/icons/*', to: path.resolve(__dirname, 'public'), flatten: true },
                {from: './src/manifest.json', to: path.resolve(__dirname, 'public') },
                {from: './src/sw.js', to: path.resolve(__dirname, 'public') },
            ]),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src/index.html"),
                filename: "./index.html"
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'initial'
                    }
                }
            }
        }
    };
};