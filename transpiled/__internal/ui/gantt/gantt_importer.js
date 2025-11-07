"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGanttViewCore = getGanttViewCore;
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _devexpressGantt = _interopRequireDefault(require("devexpress-gantt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
function getGanttViewCore() {
  if (!_devexpressGantt.default) {
    throw _ui.default.Error('E1041', 'devexpress-gantt');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return _devexpressGantt.default;
}