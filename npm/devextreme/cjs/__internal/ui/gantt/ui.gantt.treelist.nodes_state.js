/**
* DevExtreme (cjs/__internal/ui/gantt/ui.gantt.treelist.nodes_state.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GanttTreeListNodesState = exports.GanttTreeListNodeState = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line max-classes-per-file
class GanttTreeListNodeState {
  constructor(treeListNode) {
    var _treeListNode$parent;
    this.collapsed = false;
    this.key = treeListNode.key;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this.children = treeListNode.children.map(node => node.key);
    this.parentKey = (_treeListNode$parent = treeListNode.parent) === null || _treeListNode$parent === void 0 ? void 0 : _treeListNode$parent.key;
  }
  hasChildren() {
    return this.children.length > 0;
  }
  removeChild(state) {
    const index = this.children.indexOf(state.key);
    if (index > -1) {
      this.children = this.children.splice(index, 1);
    }
  }
  equal(state) {
    if (!state || state.key !== this.key || state.parentKey !== this.parentKey) {
      return false;
    }
    if (this.children.length !== state.children.length || this.children.some((value, index) => value !== state.children[index])) {
      return false;
    }
    return true;
  }
}
exports.GanttTreeListNodeState = GanttTreeListNodeState;
class GanttTreeListNodesState {
  constructor() {
    this._resetHash();
  }
  clear() {
    this._resetHash();
  }
  applyNodes(nodes, rootValue) {
    if (this._rootValue !== rootValue) {
      this._resetHash();
      this._rootValue = rootValue;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this._removeNonExistentNodes(nodes.map(node => node.key));
    nodes.forEach(node => this._applyNode(node));
    this._validateHash();
  }
  saveExpandedState(expandedKeys) {
    this._hasCollapsed = false;
    this._forEachState(state => {
      if (state.hasChildren() && !expandedKeys.includes(state.key)) {
        state.collapsed = true;
        this._hasCollapsed = true;
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getExpandedKeys() {
    if (this._hasCollapsed) {
      const keys = [];
      this._forEachState(state => {
        if (state.hasChildren() && !state.collapsed) {
          // @ts-expect-error ts-error
          keys.push(state.key);
        }
      });
      return keys;
    }
    return null;
  }
  _resetHash() {
    this._nodeHash = {};
    this._hasCollapsed = false;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getNodeState(key) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._nodeHash[key];
  }
  _removeNonExistentNodes(existingKeys) {
    if (existingKeys) {
      this._forEachState(state => {
        if (!existingKeys.includes(state.key)) {
          this._removeStateWithChildren(state);
        }
      });
    }
  }
  _removeStateWithChildren(key) {
    const state = this._getNodeState(key);
    if (state) {
      var _this$_nodeHash;
      state.children.forEach(child => this._removeStateWithChildren(child));
      const parent = this._getNodeState(state.parentKey);
      if (parent) {
        parent.removeChild(state);
      }
      (_this$_nodeHash = this._nodeHash) === null || _this$_nodeHash === void 0 || delete _this$_nodeHash[key];
    }
  }
  _applyNode(node) {
    const nodeState = new GanttTreeListNodeState(node);
    const oldState = this._getNodeState(node.key);
    if (!(oldState !== null && oldState !== void 0 && oldState.equal(nodeState))) {
      this._nodeHash[node.key] = nodeState;
      this._expandTreelineToNode(node.key);
    }
  }
  _expandTreelineToNode(key) {
    const state = this._getNodeState(key);
    let parent = this._getNodeState(state === null || state === void 0 ? void 0 : state.parentKey);
    while (parent) {
      parent.collapsed = false;
      parent = this._getNodeState(parent.parentKey);
    }
  }
  _validateHash() {
    Object.keys(this._nodeHash).forEach(key => {
      const state = this._getNodeState(key);
      const parentKey = state === null || state === void 0 ? void 0 : state.parentKey;
      if (parentKey !== this._rootValue && !this._getNodeState(parentKey)) {
        this._removeStateWithChildren(key);
      }
    });
  }
  _forEachState(callback) {
    Object.keys(this._nodeHash).forEach(key => {
      var _this$_nodeHash2;
      const state = (_this$_nodeHash2 = this._nodeHash) === null || _this$_nodeHash2 === void 0 ? void 0 : _this$_nodeHash2[key];
      if (state) {
        callback(state);
      }
    });
  }
}
exports.GanttTreeListNodesState = GanttTreeListNodesState;
