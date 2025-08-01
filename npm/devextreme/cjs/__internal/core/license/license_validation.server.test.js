/**
* DevExtreme (cjs/__internal/core/license/license_validation.server.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _license_validation = require("./license_validation");
/**
 * @jest-environment node
 */

(0, _globals.describe)('license token', () => {
  (0, _globals.beforeEach)(() => {
    (0, _license_validation.setLicenseCheckSkipCondition)(false);
  });
  (0, _globals.afterEach)(() => {
    _globals.jest.restoreAllMocks();
  });
  (0, _globals.test)('API inside trial_panel should not be triggered on the server', () => {
    (0, _globals.expect)(() => (0, _license_validation.validateLicense)('', '1.0.4')).not.toThrow();
  });
  (0, _globals.test)('API inside trial_panel should not be triggered in Angular, where HTMLElement is mocked', () => {
    if (global.HTMLElement) {
      throw Error('Wrong environment for this test!');
    }
    try {
      // @ts-expect-error mocking HTMLElement with a symbol
      global.HTMLElement = Symbol('HTMLElement mock');
      (0, _globals.expect)(() => (0, _license_validation.validateLicense)('', '1.0.4')).not.toThrow();
    } finally {
      // @ts-expect-error removing the mock
      delete global.HTMLElement;
    }
  });
});
