/**
* DevExtreme (cjs/__internal/grids/new/grid_core/options_controller/options_controller_base.mock.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsControllerMock = void 0;
var _component = require("./component.mock");
var _options_controller_base = require("./options_controller_base");
class OptionsControllerMock extends _options_controller_base.OptionsController {
  constructor(options, defaultOptions) {
    const componentMock = (0, _component.createComponentMock)(options, defaultOptions);
    super(componentMock);
    this.defaults = defaultOptions;
    this.componentMock = componentMock;
  }
  // TODO: add typing
  option(key, value) {
    // @ts-expect-error
    return this.componentMock.option(key, value);
  }
}
exports.OptionsControllerMock = OptionsControllerMock;
