/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/controller.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { getPublicElement } from '../../../../../core/element';
import $ from '../../../../../core/renderer';
import { OptionsController } from '../../../../grids/new/grid_core/options_controller/options_controller';
export class KeyboardNavigationController {
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
      element: getPublicElement($(event.target))
    });
  }
  onFocusedCardChanged(card, cardIdx, element) {
    const action = this.options.action('onFocusedCardChanged').peek();
    action({
      cardIndex: cardIdx,
      card,
      cardElement: getPublicElement($(element))
    });
  }
}
KeyboardNavigationController.dependencies = [OptionsController];
