# babel-preset-ct

Babel preset to configure a setup that allows us to work with React alongside
Flow or Typescript.

## Installation

Create a file named `.babelrc` with following contents in the root folder of
your project:

```json
{
  "presets": ["ct"]
}
```

### Extra plugins

* `babel-plugin-lodash` - Ensures lodash is optimized when imported
* `babel-plugin-macros` - Enable support for macros
* `react-hot-loader` - Support hot reloading of react

### CSS-in-JS

If you need to use a CSS-in-JS framework, you should add the presets/plugins to
the babel configuration according to the documentation.

#### [styled-components](https://www.styled-components.com/docs/tooling#babel-plugin)

```json
{
  "plugins": ["babel-plugin-styled-components"]
}
```

#### [emotion](https://emotion.sh/docs/@emotion/babel-preset-css-prop)

```json
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```
