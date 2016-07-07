'use strict';

module.exports = {
    angularPage,
    hasClass,
    hasOption,
    isAngularPage,
    notAngularPage,
};

function hasClass(element, className) {
    return element.getAttribute('class').then(classes => _.includes(classes.split(' '), className));
}

function hasOption(select, optionText) {
    return select.element(by.cssContainingText('option', optionText)).isPresent();
}

function angularPage() {
    browser.ignoreSynchronization = false;
}

function notAngularPage() {
    browser.ignoreSynchronization = true;
}

// In some cases, we have to execute code in Angular context
// As we can't detect the presence of Angular, we need this method to simulate its detection
function isAngularPage() {
    return !browser.ignoreSynchronization;
}
