/**
* DevExtreme (cjs/__internal/grids/new/grid_core/content_view/error_row.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorRow = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _toast = require("../../../../grids/new/grid_core/inferno_wrappers/toast");
const CLASSES = exports.CLASSES = {
  errorRow: 'dx-gridcore-error-row'
};
class ErrorRow extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.ref = (0, _inferno.createRef)();
    this.toastRef = (0, _inferno.createRef)();
  }
  render() {
    const lastError = this.props.errors.at(-1);
    return (0, _inferno.createVNode)(1, "div", CLASSES.errorRow, this.props.enabled && lastError && (0, _inferno.createComponentVNode)(2, _toast.Toast, {
      "componentRef": this.toastRef,
      "visible": true,
      "message": lastError.text,
      "type": 'error'
    }, lastError.id), 0, null, null, this.ref);
  }
  componentDidUpdate() {
    var _this$toastRef$curren;
    (_this$toastRef$curren = this.toastRef.current) === null || _this$toastRef$curren === void 0 || _this$toastRef$curren.option('position', {
      my: 'bottom',
      at: 'bottom',
      of: this.ref.current
    });
  }
}
exports.ErrorRow = ErrorRow;
