/**
* DevExtreme (cjs/__internal/ui/form/form.load_panel.js)
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
exports.FormLoadPanel = exports.FORM_LOAD_INDICATOR_SIZE = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _constants = require("../../ui/form/constants");
var _load_indicator = _interopRequireWildcard(require("../../ui/load_indicator"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FORM_LOAD_INDICATOR_SIZE = exports.FORM_LOAD_INDICATOR_SIZE = 120;
class FormLoadPanel {
  constructor(dependencies) {
    this._dependencies = dependencies;
  }
  show() {
    var _this$_loadPanel;
    this._ensureLoadPanel();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_loadPanel = this._loadPanel) === null || _this$_loadPanel === void 0 || _this$_loadPanel.show();
  }
  hide() {
    var _this$_loadPanel2;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_loadPanel2 = this._loadPanel) === null || _this$_loadPanel2 === void 0 || _this$_loadPanel2.hide();
  }
  dispose() {
    if (!this._loadPanel) {
      return;
    }
    this._loadPanel.dispose();
    this._loadPanel.$element().remove();
    this._loadPanel = undefined;
  }
  get instance() {
    return this._loadPanel;
  }
  option(name) {
    var _this$_loadPanel3;
    return (_this$_loadPanel3 = this._loadPanel) === null || _this$_loadPanel3 === void 0 ? void 0 : _this$_loadPanel3.option(name);
  }
  _ensureLoadPanel() {
    if (this._loadPanel) {
      return;
    }
    const $loadPanel = (0, _renderer.default)('<div>').addClass(_constants.FORM_LOAD_PANEL_CLASS).appendTo(this._dependencies.$container);
    this._loadPanel = this._dependencies.onLoadPanelCreate($loadPanel, {
      width: FORM_LOAD_INDICATOR_SIZE,
      height: FORM_LOAD_INDICATOR_SIZE,
      maxHeight: undefined,
      maxWidth: undefined,
      position: {
        of: this._dependencies.$container.get(0)
      },
      visible: false,
      showIndicator: true,
      showPane: false,
      shading: false,
      hideOnOutsideClick: false,
      hideOnParentScroll: false,
      deferRendering: false,
      disabled: false,
      message: '',
      wrapperAttr: {
        class: _constants.FORM_LOAD_PANEL_WRAPPER_CLASS
      }
    });
    this._configureLoadIndicator();
  }
  _configureLoadIndicator() {
    var _this$_loadPanel4;
    const $loadIndicator = (_this$_loadPanel4 = this._loadPanel) === null || _this$_loadPanel4 === void 0 ? void 0 : _this$_loadPanel4._$indicator;
    if ($loadIndicator !== null && $loadIndicator !== void 0 && $loadIndicator.length) {
      const loadIndicator = _load_indicator.default.getInstance($loadIndicator.get(0));
      loadIndicator.option({
        animationType: _load_indicator.AnimationType.Sparkle,
        width: FORM_LOAD_INDICATOR_SIZE,
        height: FORM_LOAD_INDICATOR_SIZE
      });
    }
  }
}
exports.FormLoadPanel = FormLoadPanel;
