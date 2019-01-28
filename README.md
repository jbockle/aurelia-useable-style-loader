# aurelia-useable-style-loader

Automatically load/unload styles using webpack style-loader/useable.  The imported style's use/unused are called automatically from aurelia's lifecycle methods for attached and detached.

webpack `style-loader/useable`: https://github.com/webpack-contrib/style-loader#useable

## installation

`npm install aurelia-useable-style-loader`

add a custom typings file for your imported scss/css files

```typescript
interface IUseableStyleLoader {
  use: () => void;
  unuse: () => void;
}

declare module '*.scss' {
  const style: IUseableStyleLoader;
  export default style;
}

declare module '*.css' {
  const style: IUseableStyleLoader;
  export default style;
}
```

## usage

configure webpack to use style-loader/useable when imported from ts

`webpack.config.js`
```javascript
{
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader/useable', 'css-loader', 'sass-loader'],
        issuer: /\.[tj]s$/i
      }
    ]
  }
}
```

import css/sass in your ts and add decorator to your element

`my-element.ts`
```typescript
import styles from './my-element.scss'

@StyleLoader.use(styles)
export class MyElement {}
```
