"use strict";

exports.isViewDataProviderConfigValid = exports.createDataAccessors = void 0;
var _m_utils = require("../../../__internal/scheduler/m_utils");
var _m_utils2 = require("../../../__internal/scheduler/resources/m_utils");
const createDataAccessors = function (dataAccessorsProps) {
  let forceIsoDateParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const dataAccessors = _m_utils.utils.dataAccessors.create({
    startDate: dataAccessorsProps.startDateExpr,
    endDate: dataAccessorsProps.endDateExpr,
    startDateTimeZone: dataAccessorsProps.startDateTimeZoneExpr,
    endDateTimeZone: dataAccessorsProps.endDateTimeZoneExpr,
    allDay: dataAccessorsProps.allDayExpr,
    text: dataAccessorsProps.textExpr,
    description: dataAccessorsProps.descriptionExpr,
    recurrenceRule: dataAccessorsProps.recurrenceRuleExpr,
    recurrenceException: dataAccessorsProps.recurrenceExceptionExpr
  }, null, forceIsoDateParsing, dataAccessorsProps.dateSerializationFormat);
  dataAccessors.resources = (0, _m_utils2.createExpressions)(dataAccessorsProps.resources);
  return dataAccessors;
};
exports.createDataAccessors = createDataAccessors;
const isViewDataProviderConfigValid = (viewDataProviderConfig, currentViewOptions) => {
  if (!viewDataProviderConfig) {
    return false;
  }
  let result = true;
  Object.entries(viewDataProviderConfig).forEach(_ref => {
    let [key, value] = _ref;
    if (value !== currentViewOptions[key]) {
      result = false;
    }
  });
  return result;
};
exports.isViewDataProviderConfigValid = isViewDataProviderConfigValid;