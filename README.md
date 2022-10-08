# Bookmarkify
Bookmarkify is a webpack plugin that generates bookmarklets.
## Installing
```bash
npm install bookmarkify-webpack
```
## Example
```js
const { Bookmarkify } = require('bookmarkify-webpack');

module.exports = {
  // …
  plugins: [
    new Bookmarkify({
      output: 'bookmark.js',
    }),
  ],
};
```
