"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = exports._TESTS_dataKey = void 0;
var _type = require("../../../core/utils/type");
var _tracker = require("../../viz/components/tracker");
var _funnel = _interopRequireDefault(require("../../viz/funnel/funnel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

const DATA_KEY_BASE = '__funnel_data_';
let dataKeyModifier = 0;
const proto = _funnel.default.prototype;
/// #DEBUG
let _TESTS_dataKey = exports._TESTS_dataKey = void 0;
/// #ENDDEBUG
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
  init() {
    const that = this;
    const dataKey = getDataKey();
    /// #DEBUG
    exports._TESTS_dataKey = _TESTS_dataKey = dataKey;
    /// #ENDDEBUG
    const getProxyData = function (e) {
      const rootOffset = that._renderer.getRootOffset();
      const x = Math.floor(e.pageX - rootOffset.left);
      const y = Math.floor(e.pageY - rootOffset.top);
      return that._hitTestTargets(x, y);
    };
    that._tracker = new _tracker.Tracker({
      widget: that,
      root: that._renderer.root,
      getData(e, tooltipData) {
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
      getNode(index) {
        return that._items[index];
      },
      click(e) {
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
  dispose() {
    this._tracker.dispose();
  },
  extenders: {
    _change_TILING() {
      const dataKey = this._dataKey;
      this._items.forEach((item, index) => {
        item.element.data(dataKey, index);
      });
    }
  }
};
/// #DEBUG

/// #ENDDEBUG