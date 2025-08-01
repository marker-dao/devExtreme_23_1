/**
* DevExtreme (esm/viz/tree_map/node.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend as _extend } from '../../core/utils/extend';
function Node() {}
const updateTile = [updateLeaf, updateGroup];
_extend(Node.prototype, {
  value: 0,
  isNode: function () {
    return !!(this.nodes && this.level < this.ctx.maxLevel);
  },
  isActive: function () {
    const ctx = this.ctx;
    return this.level >= ctx.minLevel && this.level <= ctx.maxLevel;
  },
  updateStyles: function () {
    const that = this;
    const isNode = Number(that.isNode());
    that.state = that._buildState(that.ctx.settings[isNode].state, !isNode && that.color && {
      fill: that.color
    });
  },
  _buildState: function (state, extra) {
    const base = _extend({}, state);
    return extra ? _extend(base, extra) : base;
  },
  updateLabelStyle: function () {
    const settings = this.ctx.settings[Number(this.isNode())];
    this.labelState = settings.labelState;
    this.labelParams = settings.labelParams;
  },
  _getState: function () {
    return this.state;
  },
  applyState: function () {
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
export default Node;
