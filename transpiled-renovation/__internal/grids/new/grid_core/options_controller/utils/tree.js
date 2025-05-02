"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowCopyTree = exports.shallowCopySubtreePath = exports.mergeOptionTrees = exports.getTreeNodeParentByPath = exports.getTreeNodeByPath = exports.deepMergeTrees = exports.deepCopyTreeNode = void 0;
var _m_extend = require("../../../../../core/utils/m_extend");
var _m_type = require("../../../../../core/utils/m_type");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const shallowCopyTree = tree => {
  if ((0, _m_type.isPlainObject)(tree)) {
    return _extends({}, tree);
  }
  if (Array.isArray(tree)) {
    return [...tree];
  }
  return tree;
};
// NOTE: Maybe we can use "structuredClone" build-in function here
// instead of this custom function
exports.shallowCopyTree = shallowCopyTree;
const deepCopyTreeNode = treeNode => {
  switch (true) {
    case (0, _m_type.isPlainObject)(treeNode):
      return (0, _m_extend.extend)(true, {}, treeNode);
    case Array.isArray(treeNode):
      return (0, _m_extend.extend)(true, [], treeNode);
    default:
      return treeNode;
  }
};
exports.deepCopyTreeNode = deepCopyTreeNode;
const deepMergeTrees = (firstTree, secondTree) => {
  if ((0, _m_type.isPlainObject)(secondTree) && (0, _m_type.isPlainObject)(firstTree)) {
    return (0, _m_extend.extend)(true, {}, firstTree, secondTree);
  }
  if (secondTree !== undefined) {
    return deepCopyTreeNode(secondTree);
  }
  return deepCopyTreeNode(firstTree);
};
exports.deepMergeTrees = deepMergeTrees;
const getTreeNodeParentByPath = (tree, path) => {
  let currentNode = tree;
  for (let idx = 0; idx < path.length - 1; idx += 1) {
    const nextNodePath = path[idx];
    currentNode = currentNode[nextNodePath];
    if (currentNode === undefined) {
      return undefined;
    }
  }
  return currentNode;
};
exports.getTreeNodeParentByPath = getTreeNodeParentByPath;
const getTreeNodeByPath = (tree, path) => {
  const [lastNodePath] = path.slice(-1);
  const subtree = getTreeNodeParentByPath(tree, path);
  return subtree === null || subtree === void 0 ? void 0 : subtree[lastNodePath];
};
exports.getTreeNodeByPath = getTreeNodeByPath;
const shallowCopySubtreePath = (tree, path) => {
  const shallowCopiedTree = shallowCopyTree(tree);
  let currentNode = shallowCopiedTree;
  for (let idx = 0; idx < path.length - 1; idx += 1) {
    var _currentNode;
    const nextNodePath = path[idx];
    const nextNode = (_currentNode = currentNode) === null || _currentNode === void 0 ? void 0 : _currentNode[nextNodePath];
    if (nextNode === undefined) {
      break;
    }
    currentNode[nextNodePath] = shallowCopyTree(nextNode);
    currentNode = nextNode;
  }
  return shallowCopiedTree;
};
exports.shallowCopySubtreePath = shallowCopySubtreePath;
const mergeOptionTrees = (internalTree, publicTree, defaultTree, pathToMerge) => {
  const [lastNodePath] = pathToMerge.slice(-1);
  const result = shallowCopySubtreePath(internalTree, pathToMerge);
  const targetNodeParent = getTreeNodeParentByPath(result, pathToMerge);
  // NOTE: If we don't find parent of the tree node to update -> do nothing
  if (!targetNodeParent) {
    return result;
  }
  const newNodeValue = getTreeNodeByPath(publicTree, pathToMerge);
  const defaultNodeValue = getTreeNodeByPath(defaultTree, pathToMerge);
  targetNodeParent[lastNodePath] = deepMergeTrees(defaultNodeValue, newNodeValue);
  return result;
};
exports.mergeOptionTrees = mergeOptionTrees;