"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsControllerMock = void 0;
var _options = require("../options");
var _options_controller_base = require("./options_controller_base.mock");
class OptionsControllerMock extends _options_controller_base.OptionsControllerMock {
  constructor(options) {
    super(options, _options.defaultOptions);
  }
}
exports.OptionsControllerMock = OptionsControllerMock;