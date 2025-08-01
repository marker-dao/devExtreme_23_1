/**
* DevExtreme (cjs/__internal/scheduler/utils/data_accessor/appointment_resource_data_accessor.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResourceIndex = exports.getAppointmentResourceAccessor = void 0;
var _data = require("../../../../core/utils/data");
var _m_array = require("../../../core/utils/m_array");
const getResourceIndex = config => config.fieldExpr ?? config.field ?? '';
exports.getResourceIndex = getResourceIndex;
const getAppointmentResourceAccessor = config => {
  const indexExpr = getResourceIndex(config);
  const getter = (0, _data.compileGetter)(indexExpr);
  const setter = (0, _data.compileSetter)(indexExpr);
  return {
    idsGetter: item => (0, _m_array.wrapToArray)(getter(item) ?? []),
    idsSetter: (item, ids) => setter(item, ids)
  };
};
exports.getAppointmentResourceAccessor = getAppointmentResourceAccessor;
