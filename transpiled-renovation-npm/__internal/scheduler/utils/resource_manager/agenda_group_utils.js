"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceResourcesTree = exports.convertToOldTree = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const reduceResourcesTree = (resourceById, groupsTree, appointments) => groupsTree.map(node => filterGroupTree(resourceById, appointments, node)).filter(Boolean);
// TODO(9): Get rid of it as soon as you can
exports.reduceResourcesTree = reduceResourcesTree;
const convertToOldTree = (resourceById, tree) => {
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
exports.convertToOldTree = convertToOldTree;