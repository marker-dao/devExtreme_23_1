import _extends from "@babel/runtime/helpers/esm/extends";
import { extend } from '../../../../../core/utils/m_extend';
import { isPlainObject } from '../../../../../core/utils/m_type';
export const shallowCopyTree = tree => {
  if (isPlainObject(tree)) {
    return _extends({}, tree);
  }
  if (Array.isArray(tree)) {
    return [...tree];
  }
  return tree;
};
// NOTE: Maybe we can use "structuredClone" build-in function here
// instead of this custom function
export const deepCopyTreeNode = treeNode => {
  switch (true) {
    case isPlainObject(treeNode):
      return extend(true, {}, treeNode);
    case Array.isArray(treeNode):
      return extend(true, [], treeNode);
    default:
      return treeNode;
  }
};
export const deepMergeTrees = (firstTree, secondTree) => {
  if (isPlainObject(secondTree) && isPlainObject(firstTree)) {
    return extend(true, {}, firstTree, secondTree);
  }
  if (secondTree !== undefined) {
    return deepCopyTreeNode(secondTree);
  }
  return deepCopyTreeNode(firstTree);
};
export const getTreeNodeParentByPath = (tree, path) => {
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
export const getTreeNodeByPath = (tree, path) => {
  const [lastNodePath] = path.slice(-1);
  const subtree = getTreeNodeParentByPath(tree, path);
  return subtree === null || subtree === void 0 ? void 0 : subtree[lastNodePath];
};
export const shallowCopySubtreePath = (tree, path) => {
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
export const mergeOptionTrees = (internalTree, publicTree, defaultTree, pathToMerge) => {
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