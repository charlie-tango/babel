# babel-preset-ct
<!-- Build Status -->
<!-- <a href="https://travis-ci.org/InSilicoCPH/babel-preset-insilico-react-app">
  <img src="https://travis-ci.org/InSilicoCPH/babel-preset-insilico-react-app.svg" alt="Build Status" />
</a> -->

Babel preset for React Apps created at Charlie Tango

Create a file named `.babelrc` with following contents in the root folder of your project:

```js
{
  "presets": ["ct"]
}
```

You can send options along, that will be passed directly to `babel-preset-env`: https://github.com/babel/babel-preset-env.

```js
{
   "presets": [
        [
          "ct",
          {
            "modules": "commonjs"
          }
        ]
      ]
}
```

By default modules (import/export) will not be transformed. If you need to that, you can either pass the relevant option or set the `MODULES` environment variable.

Valid vaules: `"amd"` | `"umd"` | `"systemjs"` | `"commonjs"` | `false`.