'use strict'

module.exports = function(api, opts) {
  // This is similar to how `env` works in Babel:
  // https://babeljs.io/docs/usage/babelrc/#env-option
  // We are not using `env` because it’s ignored in versions > babel-core@6.10.4:
  // https://github.com/babel/babel/issues/4539
  // https://github.com/facebook/create-react-app/issues/720
  // It’s also nice that we can enforce `NODE_ENV` being specified.
  const env = process.env.BABEL_ENV || process.env.NODE_ENV
  const isEnvDevelopment = env === 'development'
  const isEnvProduction = env === 'production'
  const isEnvTest = env === 'test'
  const isServer = env === 'server'

  if (!isEnvDevelopment && !isEnvProduction && !isEnvTest && !isServer) {
    throw new Error(
      'Using `babel-preset-ct` requires that you specify `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", "server" and "production". Instead, received: ' +
        JSON.stringify(env) +
        '.',
    )
  }

  return {
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require('@babel/preset-env').default,
        {
          targets: {
            node: 'current',
          },
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        require('@babel/preset-env').default,
        {
          // `entry` transforms `@babel/polyfill` into individual requires for
          // the targeted browsers. This is safer than `usage` which performs
          // static code analysis to determine what's required.
          // This is probably a fine default to help trim down bundles when
          // end-users inevitably import '@babel/polyfill'.
          useBuiltIns: 'entry',
          corejs: 3,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
      [require('@babel/preset-flow').default],
      [require('@babel/preset-typescript').default],
    ].filter(Boolean),
    plugins: [
      // Experimental macros support. Will be documented after it's had some time
      // in the wild.
      require('babel-plugin-macros'),
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      require('@babel/plugin-transform-destructuring').default,
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true,
        },
      ],
      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true,
        },
      ],
      // Polyfills the runtime needed for async/await and generators
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: false,
          helpers: false,
          regenerator: true,
          useESModules: true,
        },
      ],
      isEnvProduction && [
        // Remove PropTypes from production build
        require('babel-plugin-transform-react-remove-prop-types').default,
        {
          removeImport: true,
        },
      ],
      // Adds syntax support for import()
      require('@babel/plugin-syntax-dynamic-import').default,
      require('@babel/plugin-proposal-optional-chaining').default,
      require('@babel/plugin-proposal-nullish-coalescing-operator').default,
      [require('babel-plugin-lodash')],
      [require('react-hot-loader/babel')],
    ].filter(Boolean),
  }
}
