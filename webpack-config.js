const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i, // File types to handle
        use: [
          {
            loader: "file-loader", // Use file-loader
            options: {
              name: "[name].[ext]", // Name of the output file
              outputPath: "images", // Output directory
            },
          },
        ],
      },
    ],
  },
};
