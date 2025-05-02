"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTodayButtonOptions = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _m_extend = require("../../core/utils/m_extend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getTodayButtonOptions = (header, item) => (0, _m_extend.extend)(true, {}, {
  location: 'before',
  locateInMenu: 'auto',
  widget: 'dxButton',
  cssClass: 'dx-scheduler-today',
  options: {
    text: _message.default.format('dxScheduler-navigationToday'),
    icon: 'today',
    stylingMode: 'outlined',
    type: 'normal',
    onClick() {
      header._updateCurrentDate(header.option('indicatorTime') ?? new Date());
    }
  }
}, item);
exports.getTodayButtonOptions = getTodayButtonOptions;