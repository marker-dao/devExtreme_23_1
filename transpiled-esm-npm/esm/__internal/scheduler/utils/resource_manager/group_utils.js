import _extends from "@babel/runtime/helpers/esm/extends";
export const groupResources = (resourceById, groups) => {
  if (!groups.length || Object.keys(resourceById).length === 0) {
    return {
      groupTree: [],
      groupLeafs: []
    };
  }
  const head = [{}];
  let leafs = head;
  groups.filter(group => resourceById[group]).forEach(group => {
    const resource = resourceById[group];
    const nodes = resource.items.map(item => ({
      resourceText: item.text,
      resourceIndex: resource.resourceIndex,
      grouped: {
        [resource.resourceIndex]: item.id
      },
      children: []
    }));
    const nextLeafs = [];
    leafs.forEach(leaf => {
      leaf.children = nodes.map(node => _extends({}, node, {
        grouped: _extends({}, node.grouped, leaf.grouped)
      }));
      nextLeafs.push(...leaf.children);
    });
    leafs = nextLeafs;
  });
  const groupLeafs = leafs.map((leaf, index) => _extends({}, leaf, {
    groupIndex: index
  }));
  return {
    groupTree: head[0].children,
    groupLeafs
  };
};
export const getAllGroupValues = groupsLeafs => groupsLeafs.map(group => group.grouped);
export const getLeafGroupValues = (groupsLeafs, groupIndex) => {
  var _groupsLeafs$find;
  return ((_groupsLeafs$find = groupsLeafs.find(group => group.groupIndex === groupIndex)) === null || _groupsLeafs$find === void 0 ? void 0 : _groupsLeafs$find.grouped) ?? {};
};
export const getGroupTexts = (groups, groupsLeafs, resourceById, groupIndex) => {
  const leafGroups = getLeafGroupValues(groupsLeafs, groupIndex);
  const textPath = groups.map(resourceIndex => {
    var _resource$items$find;
    const resourceId = leafGroups[resourceIndex];
    const resource = resourceById[resourceIndex];
    return resource === null || resource === void 0 || (_resource$items$find = resource.items.find(item => item.id === resourceId)) === null || _resource$items$find === void 0 ? void 0 : _resource$items$find.text;
  }).filter(Boolean);
  return textPath;
};
export const getResourcesByGroupIndex = (groupsLeafs, resourceById, groupIndex) => {
  const leafGroups = getLeafGroupValues(groupsLeafs, groupIndex);
  return Object.entries(resourceById).filter(_ref => {
    let [resourceIndex] = _ref;
    return leafGroups[resourceIndex] !== undefined;
  }).map(_ref2 => {
    let [resourceIndex, resource] = _ref2;
    return _extends({}, resource, {
      items: resource.items.filter(item => item.id === leafGroups[resourceIndex])
    });
  });
};