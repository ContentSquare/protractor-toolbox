'use strict';

module.exports = {
    clearInput,
    closeNewlyOpenedTab,
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

function setWindowSize(width, height) {
    browser.driver.manage().window().setSize(width, height);
}

function executeInIframe(iframeName, fn) {
    browser.switchTo().frame(iframeName);
    fn();
    browser.switchTo().defaultContent();
    browser.waitForAngular();
}

function executeInAlertAndDismiss(fn) {
    browser.wait(() => browser.switchTo().alert().then(() => true, () => false));
    browser.switchTo().alert().then(alert => {
        fn(alert);
        alert.dismiss();
    });
}

function executeInAngular(serviceName, fn) {
    browser.executeScript((serviceName, fn) => { // eslint-disable-line no-shadow
        const service = angular.element('[ng-app]').injector().get(serviceName);
        let func;

        // See the doc: functions in arguments are resolved in their string representation
        eval(`var func = ${ fn }`); // eslint-disable-line no-eval
        func(service);

        angular.element('[ng-app]').injector().get('$rootScope').$apply();
    }, serviceName, fn);
}

function closeNewlyOpenedTab() {
    browser.sleep(500); // wait for tab to be created
    browser.getAllWindowHandles().then(handles => {
        browser.switchTo().window(handles[1]); // switch driver execution to the new tab
        browser.close();
        browser.switchTo().window(handles[0]); // switch driver execution to the origin tab
    });
}

function selectOption(select, value) {
    return select.element(by.cssContainingText('option', value)).click();
}

function dragAndDrop(from, to) {
    browser.actions().mouseDown(from).mouseMove(to).mouseUp().perform();
}

/**
 * @param  {element} target (not a selector, directly the element)
 */
function mouseMoveTo(target) {
    browser.actions().mouseMove(target).perform();
}

function performClicks(selector, nbClicks) {
    browser.executeScript((selector, nbClicks) => { // eslint-disable-line no-shadow
        let i = 0;
        while (i < nbClicks) {
            $(selector).click();
            i++;
        }
    }, selector, nbClicks);
}

function performScrolls(nbScrolls, pxToScroll) {
    nbScrolls.forEach(() => {
        if (!pxToScroll) {
            browser.executeScript('$("html, body").scrollTop(Math.random() * 10000)');
        } else {
            browser.executeScript(`$("html, body").scrollTop(${ nbScrolls % 2 === 0 ? 0 : pxToScroll })`); // eslint-disable-line max-len
        }
    });
}

function clearInput(input) {
    // .clear() doesn't update the model, it seems to be a Protractor/Selenium bug
    input.clear().then(() => {
        input.sendKeys(' ');
        input.sendKeys(protractor.Key.BACK_SPACE);
    });
}

function pressGlobalKey(key) {
    protractor.getInstance().actions().sendKeys(key).perform();
}

/**
 * Execute a command in the webdriver control flow.
 * The command must call fulfill or reject to allow
 * protractor to continue test execution.
 */
function executeInProtractor(command) {
    return protractor.promise.controlFlow().execute(() => {
        const d = protractor.promise.defer();
        command(d.fulfill, d.reject);
        return d.promise;
    });
}
