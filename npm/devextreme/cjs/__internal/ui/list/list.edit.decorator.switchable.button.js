/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.switchable.button.js)
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
exports.default = void 0;
var _animation = require("../../../common/core/animation");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _themes = require("../../../ui/themes");
var _listEditDecorator = _interopRequireDefault(require("../../ui/list/list.edit.decorator.switchable"));
var _listEdit = require("../../ui/list/list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

const SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS = 'dx-list-switchable-delete-button-container';
const SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS = 'dx-list-switchable-delete-button-wrapper';
const SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS = 'dx-list-switchable-delete-button-inner-wrapper';
const SWITCHABLE_DELETE_BUTTON_CLASS = 'dx-list-switchable-delete-button';
const SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION = 200;
class SwitchableButtonEditDecorator extends _listEditDecorator.default {
  _init() {
    super._init();
    const $buttonContainer = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS);
    const $buttonWrapper = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS);
    const $buttonInnerWrapper = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS);
    const $button = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, _button.default, {
      text: _message.default.format('dxListEditDecorator-delete'),
      type: 'danger',
      stylingMode: (0, _themes.isMaterialBased)((0, _themes.current)()) ? 'text' : 'contained',
      onClick: e => {
        this._deleteItem();
        const {
          event
        } = e;
        event === null || event === void 0 || event.stopPropagation();
      },
      // @ts-expect-error
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $buttonContainer.append($buttonWrapper);
    $buttonWrapper.append($buttonInnerWrapper);
    $buttonInnerWrapper.append($button);
    this._$buttonContainer = $buttonContainer;
  }
  _enablePositioning($itemElement) {
    super._enablePositioning($itemElement);
    _animation.fx.stop(this._$buttonContainer.get(0), true);
    this._$buttonContainer.appendTo($itemElement);
  }
  _disablePositioning($itemElement) {
    if ($itemElement) {
      super._disablePositioning($itemElement);
    }
    this._$buttonContainer.detach();
  }
  _animatePrepareDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = (0, _size.getWidth)(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth : -buttonWidth;
    const toValue = rtl ? listWidth - buttonWidth : 0;
    return _animation.fx.animate(this._$buttonContainer.get(0), {
      // @ts-expect-error ts-error
      type: 'custom',
      duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
      // @ts-expect-error ts-error
      from: {
        right: fromValue
      },
      // @ts-expect-error ts-error
      to: {
        right: toValue
      }
    });
  }
  _animateForgetDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = (0, _size.getWidth)(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth - buttonWidth : 0;
    const toValue = rtl ? listWidth : -buttonWidth;
    return _animation.fx.animate(this._$buttonContainer.get(0), {
      // @ts-expect-error ts-error
      type: 'custom',
      duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
      // @ts-expect-error ts-error
      from: {
        right: fromValue
      },
      // @ts-expect-error ts-error
      to: {
        right: toValue
      }
    });
  }
  _buttonWidth() {
    if (!this._buttonContainerWidth) {
      this._buttonContainerWidth = (0, _size.getOuterWidth)(this._$buttonContainer);
    }
    return this._buttonContainerWidth;
  }
  dispose() {
    if (this._$buttonContainer) {
      this._$buttonContainer.remove();
    }
    super.dispose();
  }
}
const TOGGLE_DELETE_SWITCH_CONTAINER_CLASS = 'dx-list-toggle-delete-switch-container';
const TOGGLE_DELETE_SWITCH_CLASS = 'dx-list-toggle-delete-switch';
class SwitchableButtonToggleEditDecorator extends SwitchableButtonEditDecorator {
  beforeBag(config) {
    const {
      $itemElement,
      $container
    } = config;
    const $toggle = (0, _renderer.default)('<div>').addClass(TOGGLE_DELETE_SWITCH_CLASS);
    this._list._createComponent($toggle, _button.default, {
      icon: 'toggle-delete',
      onClick: e => {
        var _e$event;
        _animation.fx.stop(this._$buttonContainer.get(0), false);
        this._toggleDeleteReady($itemElement);
        (_e$event = e.event) === null || _e$event === void 0 || _e$event.stopPropagation();
      },
      // @ts-expect-error
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $container.addClass(TOGGLE_DELETE_SWITCH_CONTAINER_CLASS);
    $container.append($toggle);
  }
}
(0, _listEdit.register)('delete', 'toggle', SwitchableButtonToggleEditDecorator);
class SwitchableButtonSlideEditDecorator extends SwitchableButtonEditDecorator {
  _shouldHandleSwipe() {
    return true;
  }
  _swipeEndHandler($itemElement, args) {
    if (args.targetOffset !== 0) {
      _animation.fx.stop(this._$buttonContainer.get(0), false);
      this._toggleDeleteReady($itemElement);
    }
  }
}
(0, _listEdit.register)('delete', 'slideButton', SwitchableButtonSlideEditDecorator);
var _default = exports.default = SwitchableButtonEditDecorator;
