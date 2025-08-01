/**
* DevExtreme (cjs/__internal/grids/new/card_view/di.test_utils.js)
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
exports.getContext = getContext;
var _di = require("../../../core/di");
var _options_controller = require("../../../grids/new/grid_core/options_controller/options_controller");
var _di2 = require("./di");
var _options_controller2 = require("./options_controller");
var _options_controller3 = require("./options_controller.mock");
/* eslint-disable spellcheck/spell-checker */

function getContext(config) {
  const diContext = new _di.DIContext();
  (0, _di2.register)(diContext);
  const options = new _options_controller3.OptionsControllerMock(config);
  diContext.registerInstance(_options_controller2.OptionsController, options);
  diContext.registerInstance(_options_controller3.OptionsControllerMock, options);
  diContext.registerInstance(_options_controller.OptionsController, options);
  return diContext;
}
