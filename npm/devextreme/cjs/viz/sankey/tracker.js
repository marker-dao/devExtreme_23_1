/**
* DevExtreme (cjs/viz/sankey/tracker.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.plugin = void 0;
var _sankey = _interopRequireDefault(require("./sankey"));
var _tracker = require("../components/tracker");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const proto = _sankey.default.prototype;
const DATA_KEY_BASE = '__sankey_data_';
let dataKeyModifier = 0;
proto._eventsMap.onNodeClick = {
  name: 'nodeClick'
};
proto._eventsMap.onLinkClick = {
  name: 'linkClick'
};
const getDataKey = function () {
  return DATA_KEY_BASE + dataKeyModifier++;
};
const plugin = exports.plugin = {
  name: 'tracker',
  init: function () {
    const that = this;
    const dataKey = getDataKey();
    that._tracker = new _tracker.Tracker({
      widget: that,
      root: that._renderer.root,
      getData: function (e) {
        const target = e.target;
        return target[dataKey];
      },
      getNode: function (index) {
        if (index < that._nodes.length) {
          return that._nodes[index];
        } else {
          return that._links[index - that._nodes.length];
        }
      },
      click: function (e) {
        const eventName = this.getData(e.event) < that._nodes.length ? 'nodeClick' : 'linkClick';
        that._eventTrigger(eventName, {
          target: e.node,
          event: e.event
        });
      }
    });
    this._dataKey = dataKey;
  },
  dispose: function () {
    this._tracker.dispose();
  },
  extenders: {
    _change_LINKS_DRAW: function () {
      const dataKey = this._dataKey;
      this._nodes.concat(this._links).forEach(function (item, index) {
        item.element.data(dataKey, index);
      });
    }
  }
};
