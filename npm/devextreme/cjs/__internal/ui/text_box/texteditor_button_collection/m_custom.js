/**
* DevExtreme (cjs/__internal/ui/text_box/texteditor_button_collection/m_custom.js)
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
exports.default = void 0;
var _click = require("../../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _hover = require("../../../../common/core/events/hover");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _m_button = _interopRequireWildcard(require("./m_button"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CUSTOM_BUTTON_HOVERED_CLASS = 'dx-custom-button-hovered';
class CustomButton extends _m_button.default {
  _attachEvents(instance, $element) {
    _events_engine.default.on($element, _hover.start, () => {
      var _this$editor;
      (_this$editor = this.editor) === null || _this$editor === void 0 || _this$editor.$element().addClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    _events_engine.default.on($element, _hover.end, () => {
      var _this$editor2;
      (_this$editor2 = this.editor) === null || _this$editor2 === void 0 || _this$editor2.$element().removeClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    _events_engine.default.on($element, _click.name, e => {
      e.stopPropagation();
    });
  }
  _create() {
    const {
      editor
    } = this;
    if (!editor) {
      return undefined;
    }
    const $element = (0, _renderer.default)('<div>');
    this._addToContainer($element);
    const instance = editor._createComponent($element, _button.default, Object.assign({}, this.options, {
      // @ts-expect-error ignoreParentReadOnly is private
      ignoreParentReadOnly: true,
      disabled: this._isDisabled(),
      integrationOptions: this._prepareIntegrationOptions(editor)
    }));
    return {
      instance,
      $element
    };
  }
  // eslint-disable-next-line class-methods-use-this
  _prepareIntegrationOptions(editor) {
    return Object.assign({}, editor.option('integrationOptions'), {
      skipTemplates: ['content']
    });
  }
  update() {
    const isUpdated = super.update();
    if ((0, _m_button.isButtonInstance)(this.instance)) {
      this.instance.option('disabled', this._isDisabled());
    }
    return isUpdated;
  }
  _isVisible() {
    var _this$editor3;
    const {
      visible
    } = ((_this$editor3 = this.editor) === null || _this$editor3 === void 0 ? void 0 : _this$editor3.option()) ?? {};
    return !!visible;
  }
  _isDisabled() {
    var _this$editor4;
    const isDefinedByUser = this.options.disabled !== undefined;
    if (isDefinedByUser) {
      if ((0, _m_button.isButtonInstance)(this.instance)) {
        return this.instance.option('disabled');
      }
      return this.options.disabled;
    }
    const {
      readOnly
    } = ((_this$editor4 = this.editor) === null || _this$editor4 === void 0 ? void 0 : _this$editor4.option()) ?? {};
    return readOnly;
  }
}
exports.default = CustomButton;
