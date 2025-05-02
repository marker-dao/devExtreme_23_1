"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.STEP_VALID_ICON = exports.STEP_INVALID_ICON = exports.STEP_INVALID_CLASS = exports.STEP_COMPLETED_CLASS = void 0;
var _item = _interopRequireDefault(require("../../ui/collection/item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const STEP_COMPLETED_CLASS = exports.STEP_COMPLETED_CLASS = 'dx-step-completed';
const STEP_INVALID_CLASS = exports.STEP_INVALID_CLASS = 'dx-step-invalid';
const STEP_VALID_ICON = exports.STEP_VALID_ICON = 'check';
const STEP_INVALID_ICON = exports.STEP_INVALID_ICON = 'errorcircle';
class StepperItem extends _item.default {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher('hint', value => {
      this._renderHint(value);
    });
  }
  _renderHint(hint) {
    this._$element.attr('title', hint ?? null);
  }
  updateInvalidClass(isValid) {
    this._$element.toggleClass(STEP_INVALID_CLASS, isValid !== undefined && !isValid);
  }
  changeCompleted(isCompleted) {
    this._$element.toggleClass(STEP_COMPLETED_CLASS, isCompleted);
  }
}
var _default = exports.default = StepperItem;