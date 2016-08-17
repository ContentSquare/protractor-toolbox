'use strict';

module.exports = {
    hasClass,
    hasOption,
};

/**
 * Detect the presence of a class on a particular element.
 * @param {Element} element - A Protractor-wrapped element.
 * @param {string} className - The class we want to check.
 * @returns {Promise<Boolean>}
 */
function hasClass(element, className) {
    return element
        .getAttribute('class')
        .then(classes => _.includes(classes.split(' '), className));
}

/**
 * Detect the presence of an option on a particular element.
 * @param {Element} select - The Protractor-wrapped select
 * @param {string} optionText - The text of the option
 * @returns {Promise<Boolean>}
 */
function hasOption(select, optionText) {
    return select
        .element(by.cssContainingText('option', optionText))
        .isPresent();
}
