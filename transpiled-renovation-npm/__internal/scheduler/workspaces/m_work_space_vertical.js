"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../scheduler/r1/utils/index");
var _m_work_space_indicator = _interopRequireDefault(require("./m_work_space_indicator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SchedulerWorkspaceVertical extends _m_work_space_indicator.default {
  _getFormat() {
    return _index.formatWeekdayAndDay;
  }
  generateRenderOptions() {
    const options = super.generateRenderOptions();
    return Object.assign({}, options, {
      isGenerateTimePanelData: true
    });
  }
  _isRenderHeaderPanelEmptyCell() {
    return true;
  }
}
var _default = exports.default = SchedulerWorkspaceVertical;