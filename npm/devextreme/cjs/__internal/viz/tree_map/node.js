/**
* DevExtreme (cjs/__internal/viz/tree_map/node.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extend2 = require("../../../core/utils/extend");
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function Node() {}
const updateTile = [updateLeaf, updateGroup];
(0, _extend2.extend)(Node.prototype, {
  value: 0,
  isNode() {
    return !!(this.nodes && this.level < this.ctx.maxLevel);
  },
  isActive() {
    const {
      ctx
    } = this;
    return this.level >= ctx.minLevel && this.level <= ctx.maxLevel;
  },
  updateStyles() {
    const that = this;
    const isNode = Number(that.isNode());
    that.state = that._buildState(that.ctx.settings[isNode].state, !isNode && that.color && {
      fill: that.color
    });
  },
  _buildState(state, extra) {
    const base = (0, _extend2.extend)({}, state);
    return extra ? (0, _extend2.extend)(base, extra) : base;
  },
  updateLabelStyle() {
    const settings = this.ctx.settings[Number(this.isNode())];
    this.labelState = settings.labelState;
    this.labelParams = settings.labelParams;
  },
  _getState() {
    return this.state;
  },
  applyState() {
    updateTile[Number(this.isNode())](this.tile, this._getState());
  }
});
function updateLeaf(content, attrs) {
  content.smartAttr(attrs);
}
function updateGroup(content, attrs) {
  content.outer.attr({
    stroke: attrs.stroke,
    'stroke-width': attrs['stroke-width'],
    'stroke-opacity': attrs['stroke-opacity']
  });
  content.inner.smartAttr({
    fill: attrs.fill,
    opacity: attrs.opacity,
    hatching: attrs.hatching
  });
}
var _default = exports.default = Node;
