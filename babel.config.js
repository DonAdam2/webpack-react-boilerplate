const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['ie >= 11', 'last 2 versions'],
          },
          useBuiltIns: 'entry',
          corejs: '3',
        },
      ],
      ['@babel/preset-react', { runtime: hasJsxRuntime ? 'automatic' : 'classic' }],
    ],
    plugins = [
      '@babel/plugin-transform-runtime',
      'babel-plugin-macros',
      // Applies the react-refresh Babel plugin on non-production modes only
      ...(api.env() === 'development' ? ['react-refresh/babel'] : []),
    ];

  return {
    presets,
    plugins,
  };
};
