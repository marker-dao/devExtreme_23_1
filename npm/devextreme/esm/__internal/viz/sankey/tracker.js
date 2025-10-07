/**
* DevExtreme (esm/__internal/viz/sankey/tracker.js)
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
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-else-return */
import { Tracker } from '../../viz/components/tracker';
import Sankey from './sankey';
const proto = Sankey.prototype;
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
export const plugin = {
  name: 'tracker',
  init() {
    const that = this;
    const dataKey = getDataKey();
    that._tracker = new Tracker({
      widget: that,
      root: that._renderer.root,
      getData(e) {
        const target = e.target;
        return target[dataKey];
      },
      getNode(index) {
        if (index < that._nodes.length) {
          return that._nodes[index];
        } else {
          return that._links[index - that._nodes.length];
        }
      },
      click(e) {
        const eventName = this.getData(e.event) < that._nodes.length ? 'nodeClick' : 'linkClick';
        that._eventTrigger(eventName, {
          target: e.node,
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
    _change_LINKS_DRAW() {
      const dataKey = this._dataKey;
      this._nodes.concat(this._links).forEach((item, index) => {
        item.element.data(dataKey, index);
      });
    }
  }
};
