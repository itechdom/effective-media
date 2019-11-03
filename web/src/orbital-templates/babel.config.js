let config = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    ["@babel/plugin-transform-async-to-generator"],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "prismjs",
      {
        languages: ["sql"],
        plugins: ["line-numbers", "show-language"],
        theme: "okaidia",
        css: true
      }
    ]
  ]
};
module.exports = function(api) {
  api.cache(true);
  const presets = config.presets;
  const plugins = config.plugins;
  return {
    presets,
    plugins
  };
};
