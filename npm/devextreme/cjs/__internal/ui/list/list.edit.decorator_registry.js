/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator_registry.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.registry = void 0;
const registry = exports.registry = {};
function register(option, type, decoratorClass) {
  if (!registry[option]) {
    registry[option] = {};
  }
  registry[option][type] = decoratorClass;
}
