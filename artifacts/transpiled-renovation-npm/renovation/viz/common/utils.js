"use strict";

exports.getElementHeight = getElementHeight;
exports.getElementWidth = getElementWidth;
exports.getFormatValue = getFormatValue;
exports.isUpdatedFlatObject = isUpdatedFlatObject;
exports.sizeIsValid = exports.pointInCanvas = exports.pickPositiveValue = void 0;
var _format_helper = _interopRequireDefault(require("../../../format_helper"));
var _type = require("../../../core/utils/type");
var _get_computed_style = _interopRequireDefault(require("../../utils/get_computed_style"));
var _type_conversion = require("../../utils/type_conversion");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getElementWidth(element) {
  const style = (0, _get_computed_style.default)(element);
  return (0, _type_conversion.toNumber)(style === null || style === void 0 ? void 0 : style.width) - (0, _type_conversion.toNumber)(style === null || style === void 0 ? void 0 : style.paddingLeft) - (0, _type_conversion.toNumber)(style === null || style === void 0 ? void 0 : style.paddingRight);
}
function getElementHeight(element) {
  const style = (0, _get_computed_style.default)(element);
  return (0, _type_conversion.toNumber)(style === null || style === void 0 ? void 0 : style.height) - (0, _type_conversion.toNumber)(style === null || style === void 0 ? void 0 : style.paddingTop) - (0, _type_conversion.toNumber)(style === null || style === void 0 ? void 0 : style.paddingBottom);
}
const sizeIsValid = value => !!(value && value > 0);
exports.sizeIsValid = sizeIsValid;
const pickPositiveValue = values => values.reduce((result, value) => value && value > 0 && !result ? value : result, 0);
exports.pickPositiveValue = pickPositiveValue;
const pointInCanvas = (canvas, x, y) => x >= canvas.left && x <= canvas.right && y >= canvas.top && y <= canvas.bottom;
exports.pointInCanvas = pointInCanvas;
function getFormatValue(value, specialFormat, _ref) {
  let {
    argumentFormat,
    format
  } = _ref;
  let option = format;
  if (specialFormat) {
    option = specialFormat === 'argument' ? argumentFormat : {
      type: 'percent',
      precision: format === null || format === void 0 ? void 0 : format.percentPrecision
    };
  }
  return _format_helper.default.format(value, option);
}
function isUpdatedFlatObject(newState, oldState) {
  return ((0, _type.isDefined)(newState) || (0, _type.isDefined)(oldState)) && (!(0, _type.isDefined)(newState) || !(0, _type.isDefined)(oldState) || Object.keys(newState).some(key => newState[key] !== oldState[key]));
}