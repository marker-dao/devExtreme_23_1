/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/popup/component.js)
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
exports.EditPopup = void 0;
var _inferno = require("inferno");
var _const = require("../../const");
var _form = require("../../inferno_wrappers/form");
var _popup = require("../../inferno_wrappers/popup");
var _buttons = require("./buttons");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class EditPopup extends _inferno.Component {
  render() {
    if (!this.props.visible) {
      // TODO: research whether it is good approach
      // @ts-expect-error
      this.props.formRef.current = null;
      return (0, _inferno.createFragment)();
    }
    const toolbarItems = [(0, _buttons.getSaveButtonConfig)({
      onSave: this.props.onSave,
      text: this.props.texts.saveCard
    }), (0, _buttons.getCancelButtonConfig)({
      onCancel: this.props.onCancel,
      text: this.props.texts.cancel
    })];
    return (0, _inferno.createVNode)(1, "div", _const.CLASSES.excludeFlexBox, (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _popup.Popup, _extends({
      "visible": true,
      "toolbarItems": toolbarItems,
      "onHidden": this.props.onHide,
      "showTitle": false
    }, this.props.popupProps, {
      children: (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _form.Form, _extends({
        "componentRef": this.props.formRef,
        "colCount": 2,
        "labelLocation": 'top',
        "customizeItem": this.props.customizeItem,
        "items": this.props.items
      }, this.props.formProps)))
    }))), 2);
  }
}
exports.EditPopup = EditPopup;
