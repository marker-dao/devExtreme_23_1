/**
* DevExtreme (cjs/__internal/grids/new/grid_core/keyboard_navigation/controller.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardNavigationController = void 0;
var _element = require("../../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _options_controller = require("../../../../grids/new/grid_core/options_controller/options_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

class KeyboardNavigationController {
  constructor(options) {
    this.options = options;
    this.enabled = this.options.oneWay('keyboardNavigation.enabled');
  }
  setReturnFocusTo(element) {
    this.returnFocusTo = element;
  }
  setFirstCardElement(element) {
    this.firstCardElement = element;
  }
  returnFocus() {
    if (!this.returnFocusTo) {
      return;
    }
    if (this.returnFocusTo.isConnected) {
      this.returnFocusTo.focus();
    } else {
      var _this$firstCardElemen;
      (_this$firstCardElemen = this.firstCardElement) === null || _this$firstCardElemen === void 0 || _this$firstCardElemen.focus();
    }
    this.returnFocusTo = undefined;
  }
  onKeyDown(event) {
    const action = this.options.action('onKeyDown').peek();
    action({
      handled: event.dxHandled ?? false,
      event,
      element: (0, _element.getPublicElement)((0, _renderer.default)(event.target))
    });
  }
  onFocusedCardChanged(card, cardIdx, element) {
    const action = this.options.action('onFocusedCardChanged').peek();
    action({
      cardIndex: cardIdx,
      card,
      cardElement: (0, _element.getPublicElement)((0, _renderer.default)(element))
    });
  }
}
exports.KeyboardNavigationController = KeyboardNavigationController;
KeyboardNavigationController.dependencies = [_options_controller.OptionsController];
