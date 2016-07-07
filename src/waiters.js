'use strict';

module.exports = {
    clickAndWait,
    getAndWait,
    waitElement,
    waitToBeClickable,
    waitToBeDisplayed,
    waitToBeHidden,
    waitToDisappear,
    waitToHaveClass,
    waitToHaveText,
    waitToResolve,
};

function waitElement(waitedElement, timeout) {
    const EC = protractor.ExpectedConditions;
    const isPresent = EC.presenceOf(waitedElement);
    browser.wait(isPresent, timeout || 10000);
}

function waitToResolve(promiseCall, resolver, timeout) {
    let result = false;
    browser.wait(() => {
        promiseCall().then(value => (result = resolver(value)));
        return result;
    }, timeout || 10000);
}

function waitToDisappear(element, timeout) {
    const EC = protractor.ExpectedConditions;
    const hasDisappear = EC.stalenessOf(element);
    browser.wait(hasDisappear, timeout || 10000);
}

function waitToBeDisplayed(element, timeout) {
    const EC = protractor.ExpectedConditions;
    const isDisplayed = EC.visibilityOf(element);
    browser.wait(isDisplayed, timeout || 10000);
}

function waitToBeHidden(element, timeout) {
    const EC = protractor.ExpectedConditions;
    const isHidden = EC.invisibilityOf(element);
    browser.wait(isHidden, timeout || 10000);
}

function waitToBeClickable(element, timeout) {
    const EC = protractor.ExpectedConditions;
    const isClickable = EC.elementToBeClickable(element);
    browser.wait(isClickable, timeout || 10000);
}

function waitToHaveText(element, timeout) {
    waitToResolve(() => element.getText(), text => text.length > 0, timeout);
}

function getAndWait(url, waitedElement, timeout) {
    browser.driver.get(url);
    waitElement(waitedElement, timeout);
}

function clickAndWait(clickedElement, waitedElement, timeout) {
    clickedElement.click();
    waitElement(waitedElement, timeout);
}

function waitToHaveClass(element, cls, timeout) {
    waitToResolve(() => require('./helpers').hasClass(element, cls), result => result, timeout);
}
