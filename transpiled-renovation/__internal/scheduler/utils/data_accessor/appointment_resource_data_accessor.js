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