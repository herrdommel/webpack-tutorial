const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async (env, options) => {
    const dev = options.mode === "development";
    return {
        entry: {
            index: './src/index.js',
        },
        devtool: dev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: {
            static: './dist',
            compress: true,
            hot: true,
            port: 9000,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Build Performance',
            }),
        ],
        output: {
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
