//webpack.config.js

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: __dirname,
    filename: "output.user.js",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        loader: "ts-loader",
      },
    ],
  },
};
