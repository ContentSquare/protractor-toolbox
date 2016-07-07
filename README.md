# Protractor Toolbox

Utilities for Protractor tests. Tested with Protractor 3.0.0.

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

Please ensure your pull request adheres to the following guidelines:

  - Run the linter (`npm run lint`) and fix the errors.
  - Commit the `dist` folder with your changes (`npm run build`).

Thank you for your contributions! :sparkles:

## Licence

MIT
