'use strict';module.exports={clearInput:clearInput,closeNewlyOpenedTab:closeNewlyOpenedTab,dragAndDrop:dragAndDrop,executeInAlertAndDismiss:executeInAlertAndDismiss,executeInAngular:executeInAngular,executeInIframe:executeInIframe,executeInProtractor:executeInProtractor,mouseMoveTo:mouseMoveTo,performClicks:performClicks,performScrolls:performScrolls,pressGlobalKey:pressGlobalKey,selectOption:selectOption,setWindowSize:setWindowSize};function setWindowSize(width,height){browser.driver.manage().window().setSize(width,height)}function executeInIframe(iframeName,fn){browser.switchTo().frame(iframeName);fn();browser.switchTo().defaultContent();browser.waitForAngular()}function executeInAlertAndDismiss(fn){browser.wait(function(){return browser.switchTo().alert().then(function(){return true},function(){return false})});browser.switchTo().alert().then(function(alert){fn(alert);alert.dismiss()})}function executeInAngular(serviceName,fn){browser.executeScript(function(serviceName,fn){var service=angular.element('[ng-app]').injector().get(serviceName);var func=void 0;eval('var func = '+fn);func(service);angular.element('[ng-app]').injector().get('$rootScope').$apply()},serviceName,fn)}function closeNewlyOpenedTab(){browser.sleep(500);browser.getAllWindowHandles().then(function(handles){browser.switchTo().window(handles[1]);browser.close();browser.switchTo().window(handles[0])})}function selectOption(select,value){return select.element(by.cssContainingText('option',value)).click()}function dragAndDrop(from,to){browser.actions().mouseDown(from).mouseMove(to).mouseUp().perform()}function mouseMoveTo(target){browser.actions().mouseMove(target).perform()}function performClicks(selector,nbClicks){browser.executeScript(function(selector,nbClicks){var i=0;while(i<nbClicks){$(selector).click();i++}},selector,nbClicks)}function performScrolls(nbScrolls,pxToScroll){nbScrolls.forEach(function(){if(!pxToScroll){browser.executeScript('$("html, body").scrollTop(Math.random() * 10000)')}else{browser.executeScript('$("html, body").scrollTop('+(nbScrolls%2===0?0:pxToScroll)+')')}})}function clearInput(input){input.clear().then(function(){input.sendKeys(' ');input.sendKeys(protractor.Key.BACK_SPACE)})}function pressGlobalKey(key){protractor.getInstance().actions().sendKeys(key).perform()}function executeInProtractor(command){return protractor.promise.controlFlow().execute(function(){var defer=protractor.promise.defer();command(defer.fulfill,defer.reject);return defer.promise})}