/**
* DevExtreme (cjs/__internal/ui/m_tooltip.js)
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
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _ui = _interopRequireDefault(require("../../ui/popover/ui.popover"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// STYLE tooltip
const TOOLTIP_CLASS = 'dx-tooltip';
const TOOLTIP_WRAPPER_CLASS = 'dx-tooltip-wrapper';
class Tooltip extends _ui.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      toolbarItems: [],
      showCloseButton: false,
      enableBodyScroll: true,
      showTitle: false,
      title: null,
      titleTemplate: null,
      onTitleRendered: null,
      bottomTemplate: null,
      preventScrollEvents: false,
      propagateOutsideClick: true
    });
  }
  _render() {
    this.$element().addClass(TOOLTIP_CLASS);
    this.$wrapper().addClass(TOOLTIP_WRAPPER_CLASS);
    super._render();
  }
  _renderContent() {
    super._renderContent();
    this._toggleAriaAttributes();
  }
  _toggleAriaDescription(showing) {
    const {
      target
    } = this.option();
    const $target = (0, _renderer.default)(target);
    const label = showing ? this._contentId : undefined;
    if (!(0, _type.isWindow)($target.get(0))) {
      this.setAria('describedby', label, $target);
    }
  }
  _toggleAriaAttributes() {
    this._contentId = `dx-${new _guid.default()}`;
    // @ts-expect-error ts-error
    this.$overlayContent().attr({
      id: this._contentId
    });
    this._toggleAriaDescription(true);
  }
}
(0, _component_registrator.default)('dxTooltip', Tooltip);
var _default = exports.default = Tooltip;
