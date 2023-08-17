"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiGridCoreFocusUtils = void 0;
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _type = require("../../../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// TODO Vinogradov: Move it to ts and cover with unit tests.
var getSortFilterValue = function getSortFilterValue(sortInfo, rowData, _ref) {
  var isRemoteFiltering = _ref.isRemoteFiltering,
    dateSerializationFormat = _ref.dateSerializationFormat,
    getSelector = _ref.getSelector;
  var selector = sortInfo.selector;
  var getter = (0, _type.isFunction)(selector) ? selector : getSelector(selector);
  var rawValue = getter ? getter(rowData) : rowData[selector];
  var safeValue = isRemoteFiltering && (0, _type.isDate)(rawValue) ? _date_serialization.default.serializeDate(rawValue, dateSerializationFormat) : rawValue;
  return {
    getter,
    rawValue,
    safeValue
  };
};
var UiGridCoreFocusUtils = {
  getSortFilterValue
};
exports.UiGridCoreFocusUtils = UiGridCoreFocusUtils;