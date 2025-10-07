/**
* DevExtreme (esm/__internal/viz/funnel/tracker.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
import { isDefined } from '../../../core/utils/type';
import { Tracker } from '../../viz/components/tracker';
import Funnel from '../../viz/funnel/funnel';
const DATA_KEY_BASE = '__funnel_data_';
let dataKeyModifier = 0;
const proto = Funnel.prototype;
proto._eventsMap.onItemClick = {
  name: 'itemClick'
};
proto._eventsMap.onLegendClick = {
  name: 'legendClick'
};
const getDataKey = function () {
  return DATA_KEY_BASE + dataKeyModifier++;
};
export const plugin = {
  name: 'tracker',
  init() {
    const that = this;
    const dataKey = getDataKey();
    const getProxyData = function (e) {
      const rootOffset = that._renderer.getRootOffset();
      const x = Math.floor(e.pageX - rootOffset.left);
      const y = Math.floor(e.pageY - rootOffset.top);
      return that._hitTestTargets(x, y);
    };
    that._tracker = new Tracker({
      widget: that,
      root: that._renderer.root,
      getData(e, tooltipData) {
        const target = e.target;
        const data = target[dataKey];
        if (isDefined(data)) {
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
