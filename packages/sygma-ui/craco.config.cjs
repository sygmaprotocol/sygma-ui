const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  babel: {
    plugins: ["macros"],
  },
  webpack: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
    plugins: [new NodePolyfillPlugin()],
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      return {
        ...webpackConfig,
        optimization: {
          ...webpackConfig.optimization,
          minimizer: [
            (compiler) => {
              const TerserPlugin = require("terser-webpack-plugin");
              new TerserPlugin({
                terserOptions: {
                  parse: {
                    ecma: 8,
                  },
                  compress: {
                    ecma: 5,
                    warnings: false,
                    comparisons: false,
                    inline: 2,
                    drop_console: false,
                  },
                  mangle: {
                    safari10: true,
                  },
                  output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                  },
                },
                parallel: 2,
                extractComments: false,
              }).apply(compiler);
            },
          ],
        },
        module: {
          rules: [
            ...webpackConfig.module.rules,
            {
              test: /\.m?js/,
              type: "javascript/auto",
            },
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
        devtool: "source-map",
        ignoreWarnings: [/Failed to parse source map/],
      };
    },
  },
};
