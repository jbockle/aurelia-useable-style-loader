# aurelia-useable-style-loader

Automatically load/unload styles using webpack style-loader/useable.  The imported style's use/unused are called automatically from aurelia's view engine hook lifecycle methods for beforeBind/beforeUnbind.  This ensures that the style is only loaded into view if an component/element is currently requiring it.

webpack `style-loader injectType 'lazyStyleTag'` https://github.com/webpack-contrib/style-loader#lazystyletag

![alt text](./example.gif "example")


## installation

1. `npm install aurelia-useable-style-loader`

2. then use the plugin in your main.ts
    ```javascript
    export function configure(aurelia) {
      // add below line!
      aurelia.use.plugin(PLATFORM.moduleName('aurelia-useable-style-loader'));
    }
    ```

3. configure/replace webpack loader rules to use style-loader with injectType `lazyStyleTag`  
    `webpack.config.js`
    ```javascript
    {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader', options: { injectType: 'lazyStyleTag' } }, 'css-loader']
          },
          {
            test: /\.scss$/,
            use: [{ loader: 'style-loader', options: { injectType: 'lazyStyleTag' } }, 'css-loader', 'sass-loader']
          }
        ]
      }
    }
    ```

4. require your style from html like you normally would
   ```html
   <require from="./style.css">
   ```
