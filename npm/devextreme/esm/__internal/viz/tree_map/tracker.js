/**
* DevExtreme (esm/__internal/viz/tree_map/tracker.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '../../viz/tree_map/api';
import '../../viz/tree_map/hover';
import '../../viz/tree_map/tooltip';
import { Tracker } from '../../viz/components/tracker';
import { expand } from '../../viz/core/helpers';
import { parseScalar as _parseScalar } from '../../viz/core/utils';
import TreeMapBase from '../../viz/tree_map/tree_map.base';
const DATA_KEY_BASE = '__treemap_data_';
let dataKeyModifier = 0;
const proto = TreeMapBase.prototype;
proto._eventsMap.onClick = {
  name: 'click'
};
const getDataKey = function () {
  const dataKey = DATA_KEY_BASE + dataKeyModifier++;
  return dataKey;
};
expand(proto, '_initCore', function () {
  const that = this;
  const dataKey = getDataKey();
  const getProxy = function (index) {
    return that._nodes[index].proxy;
  };
  that._tracker = new Tracker({
    widget: that,
    root: that._renderer.root,
    getNode(id) {
      const proxy = getProxy(id);
      const interactWithGroup = _parseScalar(that._getOption('interactWithGroup', true));
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
expand(proto, '_disposeCore', function () {
  this._tracker.dispose();
});
