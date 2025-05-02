"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContext = getContext;
var _di = require("../../../core/di");
var _controller = require("./context_menu/controller");
var _controller2 = require("./context_menu/controller.mock");
var _di2 = require("./di");
var _options_controller = require("./options_controller/options_controller");
var _options_controller2 = require("./options_controller/options_controller.mock");
/* eslint-disable spellcheck/spell-checker */

function getContext(config) {
  const diContext = new _di.DIContext();
  (0, _di2.register)(diContext);
  const options = new _options_controller2.OptionsControllerMock(config);
  diContext.registerInstance(_options_controller.OptionsController, options);
  diContext.registerInstance(_options_controller2.OptionsControllerMock, options);
  diContext.register(_controller.BaseContextMenuController, _controller2.ContextMenuControllerMock);
  return diContext;
}