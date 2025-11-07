/**
* DevExtreme (cjs/__internal/viz/tree_map/api.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _node = _interopRequireDefault(require("../../viz/tree_map/node"));
var _tree_map = _interopRequireDefault(require("../../viz/tree_map/tree_map.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const proto = _tree_map.default.prototype;
const nodeProto = _node.default.prototype;
proto._eventsMap.onNodesInitialized = {
  name: 'nodesInitialized'
};
proto._eventsMap.onNodesRendering = {
  name: 'nodesRendering'
};
proto._createProxyType = function () {
  const that = this;
  let nodes;
  Proxy.prototype = {
    constructor: Proxy,
    getParent() {
      return nodes[this._id].parent.proxy || null;
    },
    getChild(index) {
      const _nodes = nodes[this._id].nodes;
      return _nodes ? _nodes[index].proxy : null;
    },
    getChildrenCount() {
      const _nodes = nodes[this._id].nodes;
      return _nodes ? _nodes.length : 0;
    },
    getAllChildren() {
      const _nodes = nodes[this._id].nodes;
      let i;
      const ii = _nodes === null || _nodes === void 0 ? void 0 : _nodes.length;
      const list = [];
      for (i = 0; i < ii; ++i) {
        // @ts-expect-error
        list.push(_nodes[i].proxy);
      }
      return list;
    },
    getAllNodes() {
      const list = [];
      collectNodes(nodes[this._id], list);
      return list;
    },
    isLeaf() {
      return !nodes[this._id].isNode();
    },
    isActive() {
      return nodes[this._id].isActive();
    },
    value(arg) {
      const node = nodes[this._id];
      let result;
      if (arg !== undefined) {
        updateValue(node, arg > 0 ? Number(arg) : 0);
        change(node, ['TILING']);
        result = this;
      } else {
        result = node.value;
      }
      return result;
    },
    label(arg) {
      const node = nodes[this._id];
      let result;
      if (arg !== undefined) {
        node.customLabel = arg ? String(arg) : null;
        change(node, ['LABELS']);
        result = this;
      } else {
        result = node.customLabel || node.label;
      }
      return result;
    },
    customize(settings) {
      const node = nodes[this._id];
      if (settings) {
        node._custom = node._custom || {};
        (0, _extend2.extend)(true, node._custom, settings);
        node._partialState = node._partialLabelState = null;
      }
      change(node, ['TILES', 'LABELS']);
      return this;
    },
    resetCustomization() {
      const node = nodes[this._id];
      node._custom = node._partialState = node._partialLabelState = null;
      change(node, ['TILES', 'LABELS']);
      return this;
    }
  };
  that._extendProxyType(Proxy.prototype);
  function Proxy(node) {
    const that = this;
    node.proxy = that;
    that._id = node._id;
    that.level = node.level;
    that.index = node.index;
    that.data = node.data;
  }
  // TODO: Find a way to make the following methods exist one per module rather then one per instance
  that._handlers.beginBuildNodes = function () {
    nodes = that._nodes;
    new Proxy(that._root);
  };
  that._handlers.buildNode = function (node) {
    new Proxy(node);
  };
  that._handlers.endBuildNodes = function () {
    that._eventTrigger('nodesInitialized', {
      root: that._root.proxy
    });
  };
};
function change(node, codes) {
  const {
    ctx
  } = node;
  ctx.suspend();
  ctx.change(codes);
  ctx.resume();
}
function collectNodes(node, list) {
  const {
    nodes
  } = node;
  let i;
  const ii = nodes === null || nodes === void 0 ? void 0 : nodes.length;
  for (i = 0; i < ii; ++i) {
    list.push(nodes[i].proxy);
    collectNodes(nodes[i], list);
  }
}
function updateValue(node, value) {
  const delta = value - node.value;
  while (node) {
    node.value += delta;
    node = node.parent;
  }
}
proto._extendProxyType = _common.noop;
const {
  _resetNodes
} = proto;
proto._resetNodes = function () {
  _resetNodes.call(this);
  this._eventTrigger('nodesRendering', {
    node: this._topNode.proxy
  });
};
const _updateStyles = nodeProto.updateStyles;
nodeProto.updateStyles = function () {
  const that = this;
  _updateStyles.call(that);
  if (that._custom) {
    that._partialState = !that.ctx.forceReset && that._partialState || that.ctx.calculateState(that._custom);
    (0, _extend2.extend)(true, that.state, that._partialState);
  }
};
const _updateLabelStyle = nodeProto.updateLabelStyle;
nodeProto.updateLabelStyle = function () {
  const that = this;
  const custom = that._custom;
  _updateLabelStyle.call(that);
  if (custom !== null && custom !== void 0 && custom.label) {
    that._partialLabelState = !that.ctx.forceReset && that._partialLabelState || calculatePartialLabelState(that, custom.label);
    that.labelState = (0, _extend2.extend)(true, {}, that.labelState, that._partialLabelState);
  }
};
function calculatePartialLabelState(node, settings) {
  const state = node.ctx.calculateLabelState(settings);
  if ('visible' in settings) {
    state.visible = !!settings.visible;
  }
  return state;
}
proto.getRootNode = function () {
  return this._root.proxy;
};
proto.resetNodes = function () {
  const context = this._context;
  context.suspend();
  context.change(['NODES_CREATE']);
  context.resume();
  return this;
};
