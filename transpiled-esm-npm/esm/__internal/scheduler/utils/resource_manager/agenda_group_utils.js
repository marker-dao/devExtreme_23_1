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