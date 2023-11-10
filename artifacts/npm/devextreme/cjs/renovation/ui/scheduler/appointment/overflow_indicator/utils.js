/**
* DevExtreme (cjs/renovation/ui/scheduler/appointment/overflow_indicator/utils.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getOverflowIndicatorStyles = exports.getOverflowIndicatorColor = exports.getIndicatorColor = void 0;
var _utils = require("../../workspaces/utils");
var _utils2 = require("../../resources/utils");
const getOverflowIndicatorStyles = viewModel => {
  const {
    geometry: {
      height,
      left,
      top,
      width
    }
  } = viewModel;
  const result = (0, _utils.addToStyles)([{
    attr: 'left',
    value: "".concat(left, "px")
  }, {
    attr: 'top',
    value: "".concat(top, "px")
  }, {
    attr: 'width',
    value: "".concat(width, "px")
  }, {
    attr: 'height',
    value: "".concat(height, "px")
  }, {
    attr: 'boxShadow',
    value: "inset ".concat(width, "px 0 0 0 rgba(0, 0, 0, 0.3)")
  }]);
  return result;
};
exports.getOverflowIndicatorStyles = getOverflowIndicatorStyles;
const getOverflowIndicatorColor = (color, colors) => !colors.length || colors.filter(item => item !== color).length === 0 ? color : undefined;
exports.getOverflowIndicatorColor = getOverflowIndicatorColor;
const getIndicatorColor = (appointmentContext, viewModel, groups) => {
  var _viewModel$groupIndex;
  const groupIndex = (_viewModel$groupIndex = viewModel.groupIndex) !== null && _viewModel$groupIndex !== void 0 ? _viewModel$groupIndex : 0;
  const {
    appointment
  } = viewModel.items.settings[0];
  return (0, _utils2.getAppointmentColor)({
    resources: appointmentContext.resources,
    resourceLoaderMap: appointmentContext.resourceLoaderMap,
    resourcesDataAccessors: appointmentContext.dataAccessors.resources,
    loadedResources: appointmentContext.loadedResources
  }, {
    itemData: appointment,
    groupIndex,
    groups
  });
};
exports.getIndicatorColor = getIndicatorColor;
