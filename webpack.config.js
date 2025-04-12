module.exports = {
  // ...existing code...
  module: {
    rules: [
      // ...existing rules...
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Add this rule for CSS files
      },
    ],
  },
  // ...existing code...
};