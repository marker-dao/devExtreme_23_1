/**
* DevExtreme (cjs/ui/slider/ui.slider_tooltip.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _extend = require("../../core/utils/extend");
var _slider_tooltip_position_controller = require("./slider_tooltip_position_controller");
var _number = _interopRequireDefault(require("../../localization/number"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// NOTE: Visibility is contolled by the 'visible' option and 'dx-slider-tooltip-visible-on-hover' class.
const SLIDER_TOOLTIP_VISIBILITY_CLASS = 'dx-slider-tooltip-visible-on-hover';
const SliderTooltip = _tooltip.default.inherit({
  _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      visible: false,
      position: 'top',
      hideOnOutsideClick: false,
      hideTopOverlayHandler: null,
      hideOnParentScroll: false,
      animation: null,
      arrowPosition: null,
      templatesRenderAsynchronously: false,
      _fixWrapperPosition: false,
      useResizeObserver: false,
      showMode: 'onHover',
      format: value => value,
      value: 0
    });
  },
  _initMarkup() {
    this.callBase();
    this._attachToMarkup(this.option('visible'));
    this._toggleShowModeClass();
  },
  _renderContent() {
    this.callBase();
    this._renderContentText();
  },
  _toggleAriaAttributes() {},
  _renderContentText() {
    const {
      value,
      format
    } = this.option();
    const formattedText = _number.default.format(value !== null && value !== void 0 ? value : 0, format);
    this.$content().text(formattedText);
    this._renderPosition();
  },
  _toggleShowModeClass() {
    const isHoverMode = this.option('showMode') === 'onHover';
    const $sliderHandle = this.option('target');
    $sliderHandle.toggleClass(SLIDER_TOOLTIP_VISIBILITY_CLASS, isHoverMode);
  },
  _initPositionController() {
    this._positionController = new _slider_tooltip_position_controller.SliderTooltipPositionController(this._getPositionControllerConfig());
  },
  _attachToMarkup(enabled) {
    const $sliderHandle = this.option('target');
    enabled ? this.$element().appendTo($sliderHandle) : this.$element().detach();
  },
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'visible':
        this._attachToMarkup(value);
        this.callBase(args);
        break;
      case 'showMode':
        this._toggleShowModeClass();
        break;
      case 'format':
      case 'value':
        this._renderContentText();
        break;
      default:
        this.callBase(args);
        break;
    }
  },
  updatePosition() {
    this._renderPosition();
  }
});
var _default = SliderTooltip;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;