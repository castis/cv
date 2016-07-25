var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/js/entry",
    output: {
        path: "./public/assets",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./public/",
        hot: true,
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                // test: "./src/scss/entry.scss",
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./public/assets/[name].css")
    ]
};
