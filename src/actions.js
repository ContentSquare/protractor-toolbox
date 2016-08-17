'use strict';

module.exports = {
    clearInput,
    closeLastOpenedTab,
    dragAndDrop,
    executeInAlertAndDismiss,
    executeInAngular,
    executeInIframe,
    executeInProtractor,
    mouseMoveTo,
    performClicks,
    performScrolls,
    pressGlobalKey,
    selectOption,
    setWindowSize,
};

/**
 * Set browser's window size
 * @param {number} width - The desired width for the browser
 * @param {number} height - The desired height for the browser
 */
function setWindowSize(width, height) {
    browser
        .driver
        .manage()
        .window()
        .setSize(width, height);
}

/**
 * Execute a script in the context of a chosen iframe.
 * @param {string} iframeName - The name of the iframe (id)
 * @param {Function} fn - The function to execute
 */
function executeInIframe(iframeName, fn) {
    browser.switchTo().frame(iframeName);
    fn();
    browser.switchTo().defaultContent();
    browser.waitForAngular();
}

/**
 * Execute a script in an alert.
 * @param {Function} fn - The function to execute
 */
function executeInAlertAndDismiss(fn) {
    browser.wait(() => browser.switchTo().alert().then(() => true, () => false));
    browser.switchTo().alert().then(alert => {
        fn(alert);
        alert.dismiss();
    });
}

/**
 * Execute a function with an injected Angular service.
 * @param {string} serviceName - Name of the service to retrieve
 * @param {Function} fn - The function to execute
 * @example
 * <caption>Destroy Angular cache</caption>
 * toolbox.actions.executeInAngular('$cacheFactory', function ($cacheFactory) {
 *     $cacheFactory.destroy();
 * });
 */
function executeInAngular(serviceName, fn) {
    browser.executeScript((serviceName, fn) => {
        const service = angular.element('[ng-app]').injector().get(serviceName);
        let func;

        // See the doc: functions in arguments are resolved in their string representation
        eval(`var func = ${ fn }`); // eslint-disable-line no-eval
        func(service);

        angular.element('[ng-app]').injector().get('$rootScope').$apply();
    }, serviceName, fn);
}

/**
 * Close the last opened tab.
 */
function closeLastOpenedTab() {
    browser.getAllWindowHandles().then(handles => {
        browser.switchTo().window(handles[handles.length - 1]); // switch driver execution to the last tab
        browser.close();
        browser.switchTo().window(handles[0]); // switch driver execution to the first tab
    });
}

/**
 * Select a particular option of a select by its value.
 * @param {Element} select - A Protractor-wrapped element
 * @param {*} value - The value you want to select
 * @returns {Element} - The option wrapped by Protractor
 */
function selectOption(select, value) {
    return select.element(by.cssContainingText('option', value)).click();
}

/**
 * Perform a drag and drop by providing two Protractor elements
 * @param {Element} from - The Protractor-wrapped element to be moved
 * @param {Element} to - The Protractor-wrapped element receiving `from`
 */
function dragAndDrop(from, to) {
    browser
        .actions()
        .mouseDown(from)
        .mouseMove(to)
        .mouseUp()
        .perform();
}

/**
 * Move the mouse to hover the specified target.
 * @param {Element} target - The Protractor-wrapped element to hover
 */
function mouseMoveTo(target) {
    browser
        .actions()
        .mouseMove(target)
        .perform();
}

/**
 * Performs a provided number of clicks on an element.
 * @param {string} selector - A CSS selector
 * @param {number} nbClicks - The number of clicks
 */
function performClicks(selector, nbClicks) {
    browser.executeScript((selector, nbClicks) => {
        let i = 0;
        while (i < nbClicks) {
            $(selector).click();
            i++;
        }
    }, selector, nbClicks);
}

/**
 * Performs a provided number of scrolls on the page.
 * @param {number} nbScrolls - The number of scrolls to perform
 * @param {number} pxToScroll - The number of pixel to scroll
 */
function performScrolls(nbScrolls, pxToScroll) {
    nbScrolls.forEach(() => {
        if (!pxToScroll) {
            browser.executeScript('$("html, body").scrollTop(Math.random() * 10000)');
        } else {
            browser.executeScript(`$("html, body").scrollTop(${ nbScrolls % 2 === 0 ? 0 : pxToScroll })`);
        }
    });
}

/**
 * Circumvent Protractor/Selenium's bug when clearing an input doesn't update the model.
 * It seems to be linked to this issue: https://github.com/angular/protractor/issues/301
 * @param {Element} input - The Protractor-wrapped input to clear.
 */
function clearInput(input) {
    input.clear().then(() => {
        input.sendKeys(' ');
        input.sendKeys(protractor.Key.BACK_SPACE);
    });
}

/**
 * Press a key without focusing an input/textarea
 * @param {number} key - Keycode of the key you want to press.
 */
function pressGlobalKey(key) {
    protractor
        .getInstance()
        .actions()
        .sendKeys(key)
        .perform();
}

/**
 * Execute a command in the WebDriver control flow.
 * The command must call `fulfill` or `reject` to allow protractor to continue test execution.
 * It is useful when you have external modules based on promises:
 * Protractor will wait the fulfilling/rejecting of the promise before continuing test execution.
 * @param {function} command - The function to execute. It must call either fulfill or reject.
 * @return {Promise.<*>}
 * @example
 * <caption>Make an external request to some API</caption> *
 * toolbox.actions.executeInProtractor(function (fulfill, reject) {
 *     let req = new XMLHttpRequest();
 *     req.open('GET', 'http://contentsquare.github.io');
 *     req.send();
 *
 *     req.onreadystatechange = (res) => {
 *         if (req.readyState === 4 && req.status >= 200 && req.status < 300) {
 *             fulfill();
 *         } else {
 *             reject();
 *         }
 *     };
 * });
 */
function executeInProtractor(command) {
    return protractor.promise.controlFlow().execute(() => {
        let defer = protractor.promise.defer();
        command(defer.fulfill, defer.reject);
        return defer.promise;
    });
}
