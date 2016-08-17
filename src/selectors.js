'use strict';

module.exports = {
    $csstext,
    $$csstext,
    $lt,
    $model,
    $$model,
    $options,
    getFocusedElement,
    getSelectedOption,
};

/**
 * Returns the currently focused element.
 * @returns {Element} - The currently focused element.
 */
function getFocusedElement() {
    return browser
        .driver
        .switchTo()
        .activeElement();
}

/**
 * Get a link element by its text.
 * Equivalent to Protractor's `element(by.linkText(text))`
 * @param {string} text - The text of the link
 * @returns {Element} - The link element wrapped by Protractor
 */
function $lt(text) {
    return element(by.linkText(text));
}

/**
 * Get an element containing a class by its text.
 * Equivalent to Protractor's `element(by.cssContainingText(text))`
 * @param {string} selectorString - The class to search
 * @param {string} text - The text of the element
 * @returns {Element} - The element wrapped by Protractor
 */
function $csstext(selectorString, text) {
    return element(by.cssContainingText(selectorString, text));
}

/**
 * Get all element containing a class by their text.
 * Equivalent to Protractor's `element.all(by.cssContainingText(text))`
 * @param {string} selectorString - The class to search
 * @param {string} text - The text of the element
 * @returns {Element[]} - The elements wrapped by Protractor
 */
function $$csstext(selectorString, text) {
    return element.all(by.cssContainingText(selectorString, text));
}

/**
 * Get all options of a select.
 * Equivalent to Protractor's `element.all(by.options(text))`
 * @param {string} descriptor - The select to search
 * @returns {Element[]} - The elements wrapped by Protractor
 */
function $options(descriptor) {
    return element.all(by.options(descriptor));
}

/**
 * Get the currently selected option of a select.
 * It has to be wrapped by Protractor.
 * @param {Element} select - The Protractor-wrapped select
 * @returns {Element} - The option wrapped by Protractor
 */
function getSelectedOption(select) {
    return select.$('option:checked');
}

/**
 * Get an element by its model.
 * Equivalent to Protractor's `element(by.model(model))`
 * @param {string} model - The model to search
 * @returns {Element} - The element wrapped by Protractor
 */
function $model(model) {
    return element(by.model(model));
}

/**
 * Get all elements by their model.
 * Equivalent to Protractor's `element.all(by.model(model))`
 * @param {string} model - The model to search
 * @returns {Element[]} - The elements wrapped by Protractor
 */
function $$model(model) {
    return element.all(by.model(model));
}
