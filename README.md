# Protractor Toolbox

Utilities for Protractor tests. Tested with Protractor 3.0.0.
[API docs are here](https://contentsquare.github.io/protractor-toolbox/docs/index.html)

## Installation

```sh
    npm install protractor-toolbox --save-dev
```

## Usage

```js
    const toolbox = require('protractor-toolbox');

    const actions = toolbox.actions;
    const helpers = toolbox.helpers;
    const selectors = toolbox.selectors;
    const storages = toolbox.storages;
    const waiters = toolbox.waiters;

    waiters.waitToDisappear($('#loader'));
```

## Contributing

If you want to contribute, do not forget to run the linter (`npm run lint`) and fix the errors.

Thank you! :sparkles:

## Licence

MIT
