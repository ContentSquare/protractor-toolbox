'use strict';

module.exports = {
    clearLocalStorage,
    deleteAllCookies,
    getLocalStorageValue,
};

/**
 * Retrieve a local storage value from its key.
 * @param {string} key - The key used for storing the object.
 */
function getLocalStorageValue(key) {
    return browser.executeScript(`return JSON.parse(window.localStorage.getItem('${ key }'))`);
}

/**
 * Remove all local storage keys and values.
 */
function clearLocalStorage() {
    browser.executeScript(() => window.localStorage.clear());
}

/**
 * Delete all cookies.
 */
function deleteAllCookies() {
    browser.driver.manage().deleteAllCookies();
}
