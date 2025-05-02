"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsControllerMock = void 0;
var _options_controller_base = require("../../../grids/new/grid_core/options_controller/options_controller_base.mock");
var _options = require("./options");
class OptionsControllerMock extends _options_controller_base.OptionsControllerMock {
  constructor(options) {
    super(options, _options.defaultOptions);
  }
}
exports.OptionsControllerMock = OptionsControllerMock;