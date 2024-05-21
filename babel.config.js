module.exports = function (api) {
  api.cache(true);

  const presets = ["react-app"];

  const plugins = [
    "@babel/plugin-proposal-private-property-in-object",
    "@babel/plugin-proposal-private-methods",
  ];

  return {
    presets,
    plugins,
  };
};
