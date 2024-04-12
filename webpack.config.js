const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async (env, options) => {
    const dev = options.mode === "development";
    return {
        entry: {
            index: './src/index.js',
        },
        devtool: dev ? 'inline-source-map' : 'source-map',
        devServer: {
            static: './dist',
            compress: true,
            hot: true,
            port: 9000,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Caching',
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
    };
};
