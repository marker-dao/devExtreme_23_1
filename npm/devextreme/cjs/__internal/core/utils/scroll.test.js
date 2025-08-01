/**
* DevExtreme (cjs/__internal/core/utils/scroll.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _scroll = require("./scroll");
(0, _globals.describe)('Scroll memoize scrollTo', () => {
  let scrollableMock = {
    scrollTo: _globals.jest.fn()
  };
  (0, _globals.beforeEach)(() => {
    scrollableMock = {
      scrollTo: _globals.jest.fn()
    };
  });
  (0, _globals.it)('should call origin scrollTo first time', () => {
    const scrollParams = {
      top: 10
    };
    const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)(() => scrollableMock);
    cachedScrollTo(scrollParams);
    (0, _globals.expect)(scrollableMock.scrollTo).toHaveBeenCalledWith(scrollParams);
  });
  (0, _globals.it)('should call origin scrollTo with scrollable context', () => {
    let done = () => {};
    const donePromise = new Promise(resolve => {
      done = resolve;
    });
    scrollableMock.scrollTo = _globals.jest.fn().mockImplementation(function () {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      (0, _globals.expect)(this).toEqual(scrollableMock);
      done();
    });
    const scrollParams = {
      top: 10
    };
    const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)(() => scrollableMock);
    cachedScrollTo(scrollParams);
    return donePromise;
  });
  (0, _globals.it)('should call origin scrollTo if params changed', () => {
    const scrollParams = [{
      top: 10
    }, {
      top: 10,
      left: 10
    }];
    const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)(() => scrollableMock);
    cachedScrollTo(scrollParams[0]);
    cachedScrollTo(scrollParams[1]);
    (0, _globals.expect)(scrollableMock.scrollTo).toBeCalledTimes(2);
    (0, _globals.expect)(scrollableMock.scrollTo).toHaveBeenCalledWith(scrollParams[1]);
  });
  (0, _globals.it)('shouldn\'t call origin scrollTo if params wasn\'t change', () => {
    const scrollParams = [{
      left: 10
    }, {
      left: 10
    }];
    const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)(() => scrollableMock);
    cachedScrollTo(scrollParams[0]);
    cachedScrollTo(scrollParams[1]);
    (0, _globals.expect)(scrollableMock.scrollTo).toBeCalledTimes(1);
  });
  (0, _globals.it)('shouldn\'t call origin scrollTo if the integer part of params wasn\'t change', () => {
    const scrollParams = [{
      left: 10.2
    }, {
      left: 10.3
    }, {
      left: 10.4
    }];
    const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)(() => scrollableMock);
    cachedScrollTo(scrollParams[0]);
    cachedScrollTo(scrollParams[1]);
    cachedScrollTo(scrollParams[2]);
    (0, _globals.expect)(scrollableMock.scrollTo).toBeCalledTimes(1);
  });
  (0, _globals.it)('should call origin scroll to if params wasn\'t change and force flag is true', () => {
    const scrollParams = {
      left: 10
    };
    const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)(() => scrollableMock);
    cachedScrollTo(scrollParams, true);
    cachedScrollTo(scrollParams, true);
    cachedScrollTo(scrollParams, true);
    (0, _globals.expect)(scrollableMock.scrollTo).toBeCalledTimes(3);
  });
});
