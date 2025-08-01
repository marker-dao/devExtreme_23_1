/**
* DevExtreme (cjs/viz/funnel/tracker.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.plugin = void 0;
var _funnel = _interopRequireDefault(require("./funnel"));
var _tracker = require("../components/tracker");
var _type = require("../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DATA_KEY_BASE = '__funnel_data_';
let dataKeyModifier = 0;
const proto = _funnel.default.prototype;
proto._eventsMap.onItemClick = {
  name: 'itemClick'
};
proto._eventsMap.onLegendClick = {
  name: 'legendClick'
};
const getDataKey = function () {
  return DATA_KEY_BASE + dataKeyModifier++;
};
const plugin = exports.plugin = {
  name: 'tracker',
  init: function () {
    const that = this;
    const dataKey = getDataKey();
    const getProxyData = function (e) {
      const rootOffset = that._renderer.getRootOffset();
      const x = Math.floor(e.pageX - rootOffset.left);
      const y = Math.floor(e.pageY - rootOffset.top);
      return that._hitTestTargets(x, y);
    };
    that._tracker = new _tracker.Tracker({
      widget: that,
      root: that._renderer.root,
      getData: function (e, tooltipData) {
        const target = e.target;
        const data = target[dataKey];
        if ((0, _type.isDefined)(data)) {
          return data;
        }
        const proxyData = getProxyData(e);
        if (tooltipData && proxyData && proxyData.type !== 'inside-label') {
          return;
        }
        return proxyData && proxyData.id;
      },
      getNode: function (index) {
        return that._items[index];
      },
      click: function (e) {
        const proxyData = getProxyData(e.event);
        const dataType = proxyData && proxyData.type;
        const event = dataType === 'legend' ? 'legendClick' : 'itemClick';
        that._eventTrigger(event, {
          item: e.node,
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
    _change_TILING: function () {
      const dataKey = this._dataKey;
      this._items.forEach(function (item, index) {
        item.element.data(dataKey, index);
      });
    }
  }
};
