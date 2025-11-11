/**
* DevExtreme (esm/__internal/scheduler/utils/resource_manager/agenda_group_utils.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
const hasGroupAppointments = (resourceById, appointments, node) => {
  const resource = resourceById[node.resourceIndex];
  const value = node.grouped[node.resourceIndex];
  return appointments.some(appointment => resource.idsGetter(appointment.itemData).includes(value));
};
const filterGroupTree = (resourceById, appointments, node) => {
  if (!hasGroupAppointments(resourceById, appointments, node)) return undefined;
  return _extends({}, node, {
    children: node.children.length ? node.children.map(childrenNode => filterGroupTree(resourceById, appointments, childrenNode)).filter(Boolean) : []
  });
};
export const reduceResourcesTree = (resourceById, groupsTree, appointments) => groupsTree.map(node => filterGroupTree(resourceById, appointments, node)).filter(Boolean);
