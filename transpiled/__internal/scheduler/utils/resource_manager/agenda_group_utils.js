"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceResourcesTree = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const reduceResourcesTree = (resourceById, groupsTree, appointments) => groupsTree.map(node => filterGroupTree(resourceById, appointments, node)).filter(Boolean);
exports.reduceResourcesTree = reduceResourcesTree;