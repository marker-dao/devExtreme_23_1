"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countVisibleAppointments = void 0;
var _m_type = require("../../../core/utils/m_type");
const countVisibleRepeats = settings => {
  let isPreviousPart = false;
  return settings.reduce((total, settingsItem) => {
    const result = isPreviousPart ? total : total + 1;
    const {
      partIndex,
      partTotalCount
    } = settingsItem;
    isPreviousPart = (0, _m_type.isDefined)(partTotalCount) && partIndex !== partTotalCount - 1;
    return result;
  }, 0);
};
const countVisibleAppointments = items => items.filter(_ref => {
  let {
    needRemove
  } = _ref;
  return !needRemove;
}).reduce((total, item) => total + countVisibleRepeats(item.settings), 0);
exports.countVisibleAppointments = countVisibleAppointments;