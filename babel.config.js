module.exports = function (api) {
  // Ensure NODE_ENV is set
  if (!process.env.NODE_ENV) {
    throw new Error(
      'NODE_ENV is not set. Please set it to "development", "test", or "production".'
    );
  }

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
