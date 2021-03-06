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

const helpers = require('./helpers');
const DEFAULT_TIMEOUT = 10000;

/**
 * Wait a provided amount of time for an element to be present on the page.
 * Note that the element doesn't have to be visible on the page, it just has to be on the DOM.
 * @param {Element} element - The Protractor-wrapped element we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitElement(element, timeout = DEFAULT_TIMEOUT) {
    const EC = protractor.ExpectedConditions;
    const isPresent = EC.presenceOf(element);
    browser.wait(isPresent, timeout);
}

/**
 * Wait a provided amount of time for an element to disappear.
 * Note that the element must have disappeared from the DOM.
 * @param {Element} element - The Protractor-wrapped element we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitToDisappear(element, timeout = DEFAULT_TIMEOUT) {
    const EC = protractor.ExpectedConditions;
    const hasDisappeared = EC.stalenessOf(element);
    browser.wait(hasDisappeared, timeout);
}

/**
 * Wait a provided amount of time for an element be visible on the page.
 * Note that the element must be attached to the DOM AND visible.
 * @param {Element} element - The Protractor-wrapped element we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitToBeDisplayed(element, timeout = DEFAULT_TIMEOUT) {
    const EC = protractor.ExpectedConditions;
    const isDisplayed = EC.visibilityOf(element);
    browser.wait(isDisplayed, timeout);
}

/**
 * Wait a provided amount of time for an element to hidden.
 * Note that the element can be on the DOM, it just has to be hidden.
 * @param {Element} element - The Protractor-wrapped element we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitToBeHidden(element, timeout = DEFAULT_TIMEOUT) {
    const EC = protractor.ExpectedConditions;
    const isHidden = EC.invisibilityOf(element);
    browser.wait(isHidden, timeout);
}

/**
 * Wait a provided amount of time for a promise to be resolved.
 * @param {Promise.<*>} promiseCall - The promise we want to wait for.
 * @param {Element} resolver - The condition that will permit the fulfilling of the promise.
 * @param {number} timeout - How much time we will wait the promise before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitToResolve(promiseCall, resolver, timeout = DEFAULT_TIMEOUT) {
    let result = false;
    browser.wait(() => {
        promiseCall().then(value => (result = resolver(value)));
        return result;
    }, timeout);
}

/**
 * Wait a provided amount of time for an element to be clickable.
 * @param {Element} element - The Protractor-wrapped element we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitToBeClickable(element, timeout = DEFAULT_TIMEOUT) {
    const EC = protractor.ExpectedConditions;
    const isClickable = EC.elementToBeClickable(element);
    browser.wait(isClickable, timeout);
}

/**
 * Wait for a provided element to have a text.
 * @param {Element} element - The element we want to test.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitToHaveText(element, timeout = DEFAULT_TIMEOUT) {
    waitToResolve(() => element.getText(), text => text.length > 0, timeout);
}

/**
 * Wait for a provided element to have certain class.
 * @param {Element} element - The element we want to test.
 * @param {string} cls - The class we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function waitToHaveClass(element, cls, timeout = DEFAULT_TIMEOUT) {
    waitToResolve(() => helpers.hasClass(element, cls), result => result, timeout);
}

/**
 * Open a new page and wait for an element to be present in the next page.
 * Note that the element doesn't have to be visible on the page, it just has to be on the DOM.
 * @param {string} url - The URL to reach.
 * @param {Element} element - The Protractor-wrapped element we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function getAndWait(url, element, timeout = DEFAULT_TIMEOUT) {
    browser.driver.get(url);
    waitElement(element, timeout);
}

/**
 * Click on an element and wait for another element to be present.
 * Note that the element doesn't have to be visible on the page, it just has to be on the DOM.
 * @param {Element} clickedElement - The element to click.
 * @param {Element} waitedElement - The Protractor-wrapped element we are waiting for.
 * @param {number} timeout - How much time we will wait the element before throwing an error.
 *                           By default, it is 10 seconds.
 */
function clickAndWait(clickedElement, waitedElement, timeout = DEFAULT_TIMEOUT) {
    clickedElement.click();
    waitElement(waitedElement, timeout);
}
