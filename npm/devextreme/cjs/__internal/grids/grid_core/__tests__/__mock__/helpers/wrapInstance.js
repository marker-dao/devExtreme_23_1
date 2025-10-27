/**
* DevExtreme (cjs/__internal/grids/grid_core/__tests__/__mock__/helpers/wrapInstance.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapInstance;
var _globals = require("@jest/globals");
function wrapInstance(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    const originalValue = instance[key];
    if (typeof originalValue === 'function' && key !== 'constructor') {
      const originalMethod = originalValue;
      instance[key] = _globals.jest.fn(originalMethod.bind(instance));
    }
  });
  return instance;
}
