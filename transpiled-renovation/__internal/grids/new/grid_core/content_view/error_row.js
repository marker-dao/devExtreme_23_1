"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorRow = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _toast = require("../../../../grids/new/grid_core/inferno_wrappers/toast");
var _utils = require("../inferno_wrappers/utils");
const CLASSES = exports.CLASSES = {
  errorRow: 'dx-gridcore-error-row'
};
class ErrorRow extends _index.BaseInfernoComponent {
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
      "type": 'error',
      "position": {
        my: 'bottom',
        at: 'bottom',
        // @ts-expect-error
        of: (0, _utils.wrapRef)(this.ref)
      }
    }, lastError.id), 0, null, null, this.ref);
  }
}
exports.ErrorRow = ErrorRow;