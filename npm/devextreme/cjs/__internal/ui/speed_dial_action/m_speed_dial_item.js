/**
* DevExtreme (cjs/__internal/ui/speed_dial_action/m_speed_dial_item.js)
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
exports.default = void 0;
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _icon = require("../../../core/utils/icon");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/overlay/ui.overlay"));
var _themes = require("../../../ui/themes");
var _utils = require("../../../ui/widget/utils.ink_ripple");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FAB_CLASS = 'dx-fa-button';
const FAB_ICON_CLASS = 'dx-fa-button-icon';
const FAB_LABEL_CLASS = 'dx-fa-button-label';
const FAB_LABEL_WRAPPER_CLASS = 'dx-fa-button-label-wrapper';
const FAB_CONTENT_REVERSE_CLASS = 'dx-fa-button-content-reverse';
const OVERLAY_CONTENT_SELECTOR = '.dx-overlay-content';
class SpeedDialItem extends _ui.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      shading: false,
      useInkRipple: false,
      callOverlayRenderShading: false,
      width: 'auto',
      zIndex: 1500,
      _observeContentResize: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        // @ts-expect-error ts-error
        return (0, _themes.isMaterial)();
      },
      options: {
        useInkRipple: true
      }
    }]);
  }
  _moveToContainer() {
    this._$wrapper.appendTo(this.$element());
    this._$content.appendTo(this._$wrapper);
  }
  _render() {
    this.$element().addClass(FAB_CLASS);
    this._renderIcon();
    this._renderLabel();
    super._render();
    if (this.option('useInkRipple')) {
      this._renderInkRipple();
    }
    this._renderClick();
  }
  _renderLabel() {
    if (this._$label) {
      this._$label.remove();
    }
    const {
      label
    } = this.option();
    if (!label) {
      // @ts-expect-error ts-error
      this._$label = null;
      return;
    }
    const $element = (0, _renderer.default)('<div>').addClass(FAB_LABEL_CLASS);
    const $wrapper = (0, _renderer.default)('<div>').addClass(FAB_LABEL_WRAPPER_CLASS);
    this._$label = $wrapper.prependTo(this.$content()).append($element.text(label));
    this.$content().toggleClass(FAB_CONTENT_REVERSE_CLASS, this._isPositionLeft(this.option('parentPosition')));
  }
  _isPositionLeft(position) {
    let currentLocation = '';
    if (position) {
      if ((0, _type.isPlainObject)(position) && position.at) {
        if (position.at.x) {
          currentLocation = position.at.x;
        } else {
          currentLocation = position.at;
        }
      } else if (typeof position === 'string') {
        currentLocation = position;
      }
    }
    return currentLocation.split(' ')[0] === 'left';
  }
  _renderButtonIcon($element, icon, iconClass) {
    !!$element && $element.remove();
    $element = (0, _renderer.default)('<div>').addClass(iconClass);
    const $iconElement = (0, _icon.getImageContainer)(icon);
    $element.append($iconElement).appendTo(this.$content());
    return $element;
  }
  _renderIcon() {
    this._$icon = this._renderButtonIcon(this._$icon, this._options.silent('icon'), FAB_ICON_CLASS);
  }
  _renderWrapper() {
    if (this._options.silent('callOverlayRenderShading')) {
      super._renderWrapper();
    }
  }
  _getVisibleActions(actions) {
    const currentActions = actions || this.option('actions') || [];
    return currentActions.filter(action => action.option('visible'));
  }
  _getActionComponent() {
    // @ts-expect-error
    if (this._getVisibleActions().length === 1) {
      // @ts-expect-error
      return this._getVisibleActions()[0];
    }
    return this.option('actionComponent') || this.option('actions')[0];
  }
  _initContentReadyAction() {
    this._contentReadyAction = this._getActionComponent()._createActionByOption('onContentReady', {
      excludeValidators: ['disabled', 'readOnly']
    }, true);
  }
  _fireContentReadyAction() {
    this._contentReadyAction({
      actionElement: this.$element()
    });
  }
  _updateZIndexStackPosition() {
    const {
      zIndex
    } = this.option();
    this._$wrapper.css('zIndex', zIndex);
    this._$content.css('zIndex', zIndex);
  }
  _setClickAction() {
    const eventName = (0, _index.addNamespace)(_click.name, this.NAME);
    const overlayContent = this.$element().find(OVERLAY_CONTENT_SELECTOR);
    _events_engine.default.off(overlayContent, eventName);
    _events_engine.default.on(overlayContent, eventName, e => {
      const clickActionArgs = {
        event: e,
        actionElement: this.element(),
        element: this._getActionComponent().$element()
      };
      this._clickAction(clickActionArgs);
    });
  }
  _defaultActionArgs() {
    return {
      component: this._getActionComponent()
    };
  }
  _renderClick() {
    this._clickAction = this._getActionComponent()._createActionByOption('onClick');
    this._setClickAction();
  }
  _renderInkRipple() {
    this._inkRipple = (0, _utils.render)();
  }
  _getInkRippleContainer() {
    return this._$icon;
  }
  _toggleActiveState($element, value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event) {
    super._toggleActiveState($element, value, event);
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: this._getInkRippleContainer(),
      event
    };
    if (value) {
      this._inkRipple.showWave(config);
    } else {
      this._inkRipple.hideWave(config);
    }
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'icon':
        this._renderIcon();
        break;
      case 'onClick':
        this._renderClick();
        break;
      case 'label':
        this._renderLabel();
        break;
      case 'visible':
        this._currentVisible = previousValue;
        if (value) {
          this._show();
        } else {
          this._hide();
        }
        break;
      case 'useInkRipple':
        this._render();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = SpeedDialItem;
