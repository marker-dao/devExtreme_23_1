/**
* DevExtreme (cjs/__internal/scheduler/utils/resource_manager/group_utils.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupResources = exports.getResourcesByGroupIndex = exports.getLeafGroupValues = exports.getGroupTexts = exports.getAllGroupValues = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const groupResources = (resourceById, groups) => {
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
exports.groupResources = groupResources;
const getAllGroupValues = groupsLeafs => groupsLeafs.map(group => group.grouped);
exports.getAllGroupValues = getAllGroupValues;
const getLeafGroupValues = (groupsLeafs, groupIndex) => {
  var _groupsLeafs$find;
  return ((_groupsLeafs$find = groupsLeafs.find(group => group.groupIndex === groupIndex)) === null || _groupsLeafs$find === void 0 ? void 0 : _groupsLeafs$find.grouped) ?? {};
};
exports.getLeafGroupValues = getLeafGroupValues;
const getGroupTexts = (groups, groupsLeafs, resourceById, groupIndex) => {
  const leafGroups = getLeafGroupValues(groupsLeafs, groupIndex);
  const textPath = groups.map(resourceIndex => {
    var _resource$items$find;
    const resourceId = leafGroups[resourceIndex];
    const resource = resourceById[resourceIndex];
    return resource === null || resource === void 0 || (_resource$items$find = resource.items.find(item => item.id === resourceId)) === null || _resource$items$find === void 0 ? void 0 : _resource$items$find.text;
  }).filter(Boolean);
  return textPath;
};
exports.getGroupTexts = getGroupTexts;
const getResourcesByGroupIndex = (groupsLeafs, resourceById, groupIndex) => {
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
exports.getResourcesByGroupIndex = getResourcesByGroupIndex;
