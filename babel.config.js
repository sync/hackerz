module.exports = api => {
  api.cache(true);

  return {
    env: {
      test: {
        presets: [['@babel/preset-env'], ['@babel/preset-react']],
      },
    },
  };
};
