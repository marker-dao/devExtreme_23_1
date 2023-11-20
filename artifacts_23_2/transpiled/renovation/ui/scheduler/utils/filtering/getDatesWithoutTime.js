"use strict";

exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getDatesWithoutTime = (min, max) => {
  const newMin = _date.default.trimTime(min);
  const newMax = _date.default.trimTime(max);
  newMax.setDate(newMax.getDate() + 1);
  return [newMin, newMax];
};
var _default = getDatesWithoutTime;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;