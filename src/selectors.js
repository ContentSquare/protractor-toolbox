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

function getFocusedElement() {
    return browser.driver.switchTo().activeElement();
}

function $lt(text) {
    return element(by.linkText(text));
}

function $csstext(selectorString, text) {
    return element(by.cssContainingText(selectorString, text));
}

function $$csstext(selectorString, text) {
    return element.all(by.cssContainingText(selectorString, text));
}

function $options(descriptor) {
    return element.all(by.options(descriptor));
}

function getSelectedOption(select) {
    return select.$('option:checked');
}

function $model(model) {
    return element(by.model(model));
}

function $$model(model) {
    return element.all(by.model(model));
}
