"use strict";

exports.mergeStylesWithColor = exports.getReducedIconTooltipText = exports.getAppointmentStyles = exports.getAppointmentKey = void 0;
var _utils = require("../workspaces/utils");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _date = _interopRequireDefault(require("../../../../localization/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EditorLabelLocalizationConst = 'dxScheduler-editorLabelEndDate';
const getAppointmentStyles = viewModel => {
  const defaultSize = 50;
  const {
    geometry: {
      height,
      left,
      top,
      width
    }
  } = viewModel;
  return (0, _utils.addToStyles)([{
    attr: 'height',
    value: "".concat(height || defaultSize, "px")
  }, {
    attr: 'width',
    value: "".concat(width || defaultSize, "px")
  }, {
    attr: 'top',
    value: "".concat(top, "px")
  }, {
    attr: 'left',
    value: "".concat(left, "px")
  }]);
};
exports.getAppointmentStyles = getAppointmentStyles;
const getAppointmentKey = geometry => {
  const {
    height,
    left,
    top,
    width
  } = geometry;
  return "".concat(left, "-").concat(top, "-").concat(width, "-").concat(height);
};
exports.getAppointmentKey = getAppointmentKey;
const getReducedIconTooltipText = endDate => {
  const tooltipLabel = _message.default.format(EditorLabelLocalizationConst);
  if (!endDate) {
    return tooltipLabel;
  }
  const date = new Date(endDate);
  const monthAndDay = _date.default.format(date, 'monthAndDay');
  const year = _date.default.format(date, 'year');
  return "".concat(tooltipLabel, ": ").concat(monthAndDay, ", ").concat(year);
};
exports.getReducedIconTooltipText = getReducedIconTooltipText;
const mergeStylesWithColor = (color, styles) => !color ? styles : (0, _utils.addToStyles)([{
  attr: 'backgroundColor',
  value: color
}], styles);
exports.mergeStylesWithColor = mergeStylesWithColor;