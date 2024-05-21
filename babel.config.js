module.exports = function (api) {
  api.cache(true);

  const presets = ["react-app"];

  const plugins = [
    "@babel/plugin-proposal-private-property-in-object",
    // Add any other Babel plugins you need here
  ];

  return {
    presets,
    plugins,
  };
};
