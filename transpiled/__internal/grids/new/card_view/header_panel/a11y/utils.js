"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortingA11yLabel = exports.getSortIndexA11yLabel = exports.getHeaderItemA11yLabel = exports.getHeaderFilterA11yLabel = exports.getCommonA11yLabel = void 0;
var _message = _interopRequireDefault(require("../../../../../../common/core/localization/message"));
var _type = require("../../../../../../core/utils/type");
var _const = require("./const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getCommonA11yLabel = columnName => _message.default.format(_const.I18N_KEYS.common, columnName);
exports.getCommonA11yLabel = getCommonA11yLabel;
const getHeaderFilterA11yLabel = hasHeaderFilterValue => hasHeaderFilterValue ? _message.default.format(_const.I18N_KEYS.headerFilter) : null;
exports.getHeaderFilterA11yLabel = getHeaderFilterA11yLabel;
const getSortingA11yLabel = sortOrder => {
  switch (sortOrder) {
    case 'asc':
      return _message.default.format(_const.I18N_KEYS.sortingAsc);
    case 'desc':
      return _message.default.format(_const.I18N_KEYS.sortingDesc);
    default:
      return null;
  }
};
exports.getSortingA11yLabel = getSortingA11yLabel;
const getSortIndexA11yLabel = (sortOrder, sortIndex) => sortOrder && (0, _type.isDefined)(sortIndex)
// @ts-expect-error bad i18n types
? _message.default.format(_const.I18N_KEYS.sortIndex, sortIndex + 1) : null;
exports.getSortIndexA11yLabel = getSortIndexA11yLabel;
const getHeaderItemA11yLabel = (columnName, _ref) => {
  let {
    sortOrder,
    sortIndex,
    hasHeaderFilterValue
  } = _ref;
  return [getCommonA11yLabel(columnName), getHeaderFilterA11yLabel(hasHeaderFilterValue), getSortingA11yLabel(sortOrder), getSortIndexA11yLabel(sortOrder, sortIndex)].filter(msg => !!msg).join(_const.I18N_MESSAGE_SEPARATOR);
};
exports.getHeaderItemA11yLabel = getHeaderItemA11yLabel;