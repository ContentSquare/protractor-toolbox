'use strict';

module.exports = {
    clearLocalStorage,
    deleteAllCookies,
    getLocalStorageValue,
};

function getLocalStorageValue(key) {
    return browser.executeScript(`return JSON.parse(window.localStorage.getItem('${ key }'))`);
}

function clearLocalStorage() {
    browser.executeScript(() => window.localStorage.clear());
}

function deleteAllCookies() {
    browser.driver.manage().deleteAllCookies();
}
