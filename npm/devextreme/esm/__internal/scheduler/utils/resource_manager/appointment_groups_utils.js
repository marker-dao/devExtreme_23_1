/**
* DevExtreme (esm/__internal/scheduler/utils/resource_manager/appointment_groups_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { wrapToArray } from '../../../core/utils/m_array';
import { equalByValue } from '../../../core/utils/m_common';
export const getResourceItemById = (resource, resourceId) => resource.items.find(item => equalByValue(item.id, resourceId));
export const getAppointmentGroupValues = (rawAppointment, resources) => resources.reduce((result, resource) => {
  const ids = resource.idsGetter(rawAppointment);
  if (ids.length) {
    result[resource.resourceIndex] = ids;
  }
  return result;
}, {});
export const getRawAppointmentGroupValues = (rawAppointment, resources) => resources.reduce((result, resource) => {
  const ids = resource.idsGetter(rawAppointment);
  if (ids.length) {
    result[resource.resourceIndex] = resource.allowMultiple ? ids : ids[0];
  }
  return result;
}, {});
export const getSafeGroupValues = groupValues => Object.entries(groupValues).reduce((result, _ref) => {
  let [key, value] = _ref;
  result[key] = wrapToArray(value);
  return result;
}, {});
export const getAppointmentResources = (appointmentGroupValues, resourceById) => Object.entries(appointmentGroupValues).reduce((result, _ref2) => {
  let [resourceIndex, resourceIds] = _ref2;
  const resource = resourceById[resourceIndex];
  const values = resourceIds.map(id => {
    var _getResourceItemById;
    return (_getResourceItemById = getResourceItemById(resource, id)) === null || _getResourceItemById === void 0 ? void 0 : _getResourceItemById.text;
  }).filter(Boolean);
  if (values.length) {
    result.push({
      label: resource.resourceName,
      values
    });
  }
  return result;
}, []);
export const setAppointmentGroupValues = function (item, resourceById) {
  let groups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.entries(groups).forEach(_ref3 => {
    let [resourceIndex, resourceId] = _ref3;
    const resource = resourceById[resourceIndex];
    const value = resource.allowMultiple ? [resourceId] : resourceId;
    resource.idsSetter(item, value);
  });
};
export const getAppointmentGroupIndex = (appointmentGroupValues, groupLeafs) => groupLeafs.filter(leaf => Object.entries(leaf.grouped).every(_ref4 => {
  var _appointmentGroupValu;
  let [resourceIndex, resourceId] = _ref4;
  return (_appointmentGroupValu = appointmentGroupValues[resourceIndex]) === null || _appointmentGroupValu === void 0 ? void 0 : _appointmentGroupValu.includes(resourceId);
})).map(leaf => leaf.groupIndex);
export const groupAppointmentsByGroupLeafs = (resourceById, groupLeafs, appointments) => {
  if (!groupLeafs.length) {
    return [appointments];
  }
  return groupLeafs.map(leaf => appointments.filter(item => {
    const appointmentGroupValues = getAppointmentGroupValues(item, Object.values(resourceById));
    return Object.entries(leaf.grouped).every(_ref5 => {
      var _appointmentGroupValu2;
      let [resourceIndex, resourceId] = _ref5;
      return (_appointmentGroupValu2 = appointmentGroupValues[resourceIndex]) === null || _appointmentGroupValu2 === void 0 ? void 0 : _appointmentGroupValu2.includes(resourceId);
    });
  }));
};
