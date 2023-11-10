/**
* DevExtreme (renovation/ui/scheduler/appointment_tooltip/utils/get_current_appointment.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _default = appointmentItem => {
  var _ref, _settings$targetedApp;
  const {
    currentData,
    data,
    settings
  } = appointmentItem;
  return (_ref = (_settings$targetedApp = settings === null || settings === void 0 ? void 0 : settings.targetedAppointmentData) !== null && _settings$targetedApp !== void 0 ? _settings$targetedApp : currentData) !== null && _ref !== void 0 ? _ref : data;
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
