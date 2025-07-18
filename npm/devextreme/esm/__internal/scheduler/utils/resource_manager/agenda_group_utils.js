/**
* DevExtreme (esm/__internal/scheduler/utils/resource_manager/agenda_group_utils.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
const hasGroupAppointments = (resourceById, appointments, node) => {
  const resource = resourceById[node.resourceIndex];
  const value = node.grouped[node.resourceIndex];
  return appointments.some(appointment => resource.idsGetter(appointment).includes(value));
};
const filterGroupTree = (resourceById, appointments, node) => {
  if (!hasGroupAppointments(resourceById, appointments, node)) return undefined;
  return _extends({}, node, {
    children: node.children.length ? node.children.map(childrenNode => filterGroupTree(resourceById, appointments, childrenNode)).filter(Boolean) : []
  });
};
export const reduceResourcesTree = (resourceById, groupsTree, appointments) => groupsTree.map(node => filterGroupTree(resourceById, appointments, node)).filter(Boolean);
// TODO(9): Get rid of it as soon as you can
export const convertToOldTree = (resourceById, tree) => {
  const convert = item => {
    const value = item.grouped[item.resourceIndex];
    const resource = resourceById[item.resourceIndex];
    const resourceData = resource === null || resource === void 0 ? void 0 : resource.data.find(rItem => resource.dataAccessor.get('id', rItem) === value);
    const resourceItem = resource === null || resource === void 0 ? void 0 : resource.items.find(rItem => rItem.id === value);
    return {
      data: resourceData,
      name: item.resourceIndex,
      title: item.resourceText,
      value,
      color: resourceItem === null || resourceItem === void 0 ? void 0 : resourceItem.color,
      children: item.children.length ? item.children.map(convert) : []
    };
  };
  return tree.map(convert);
};
