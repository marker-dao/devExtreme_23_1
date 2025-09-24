/**
* DevExtreme (cjs/__internal/viz/tree_map/tracker.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

require("../../viz/tree_map/api");
require("../../viz/tree_map/hover");
require("../../viz/tree_map/tooltip");
var _tracker = require("../../viz/components/tracker");
var _helpers = require("../../viz/core/helpers");
var _utils = require("../../viz/core/utils");
var _tree_map = _interopRequireDefault(require("../../viz/tree_map/tree_map.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const DATA_KEY_BASE = '__treemap_data_';
let dataKeyModifier = 0;
const proto = _tree_map.default.prototype;
proto._eventsMap.onClick = {
  name: 'click'
};
const getDataKey = function () {
  const dataKey = DATA_KEY_BASE + dataKeyModifier++;
  return dataKey;
};
(0, _helpers.expand)(proto, '_initCore', function () {
  const that = this;
  const dataKey = getDataKey();
  const getProxy = function (index) {
    return that._nodes[index].proxy;
  };
  that._tracker = new _tracker.Tracker({
    widget: that,
    root: that._renderer.root,
    getNode(id) {
      const proxy = getProxy(id);
      const interactWithGroup = (0, _utils.parseScalar)(that._getOption('interactWithGroup', true));
      return interactWithGroup && proxy.isLeaf() && proxy.getParent().isActive() ? proxy.getParent() : proxy;
    },
    getData(e) {
      const {
        target
      } = e;
      return (target.tagName === 'tspan' ? target.parentNode : target)[dataKey];
    },
    getProxy,
    click(e) {
      that._eventTrigger('click', e);
    }
  });
  that._handlers.setTrackerData = function (node, element) {
    element.data(dataKey, node._id);
  };
});
(0, _helpers.expand)(proto, '_disposeCore', function () {
  this._tracker.dispose();
});
