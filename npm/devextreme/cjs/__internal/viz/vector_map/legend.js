/**
* DevExtreme (cjs/__internal/viz/vector_map/legend.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegendsControl = LegendsControl;
var _extend2 = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _object = require("../../../core/utils/object");
var _legend = require("../../viz/components/legend");
/* eslint-disable import/no-import-module-exports */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

const _extend = _extend2.extend;
const _each = _iterator.each;
const unknownSource = {
  category: 'UNKNOWN',
  name: 'UNKNOWN'
};
function buildData(partition, values, field) {
  let i;
  const ii = values.length;
  const list = [];
  let item;
  for (i = 0; i < ii; ++i) {
    // @ts-expect-error
    list[i] = item = {
      start: partition[i],
      end: partition[i + 1],
      index: i
    };
    item[field] = values[i];
    item.states = {
      normal: {
        fill: item.color
      }
    };
    item.visible = true;
  }
  return list;
}
// 'var' because JSHint throws W021 error
let Legend = function (parameters) {
  const that = this;
  that._params = parameters;
  that._root = parameters.renderer.g().attr({
    class: 'dxm-legend'
  }).linkOn(parameters.container, {
    name: 'legend',
    after: 'legend-base'
  }).enableLinks().linkAppend();
  parameters.layoutControl.addItem(that);
  _legend.Legend.call(that, {
    renderer: parameters.renderer,
    widget: parameters.widget,
    group: that._root,
    backgroundClass: null,
    itemsGroupClass: null,
    textField: 'text',
    getFormatObject(data) {
      return data;
    }
  });
  that._onDataChanged = function (data) {
    that._updateData(data);
  };
};
Legend.prototype = _extend((0, _object.clone)(_legend.Legend.prototype), {
  constructor: Legend,
  dispose() {
    const that = this;
    that._params.layoutControl.removeItem(that);
    that._unbindData();
    that._root.linkRemove().linkOff();
    that._params = that._root = that._onDataChanged = null;
    return _legend.Legend.prototype.dispose.apply(that, arguments);
  },
  // This method is called only by the layout
  resize(size) {
    this._params.notifyDirty();
    if (size === null) {
      this.erase();
    } else {
      this.draw(size.width, size.height);
    }
    this._params.notifyReady();
  },
  locate: _legend.Legend.prototype.shift,
  _updateData(data) {
    this._options.defaultColor = data && data.defaultColor;
    this.update(data ? buildData(data.partition, data.values, this._dataName) : [], this._options, this._params.themeManager.theme('legend').title);
    this.updateLayout();
  },
  _unbindData() {
    if (this._dataCategory) {
      this._params.dataExchanger.unbind(this._dataCategory, this._dataName, this._onDataChanged);
    }
  },
  _bindData(arg) {
    this._params.dataExchanger.bind(this._dataCategory = arg.category, this._dataName = arg.name, this._onDataChanged);
  },
  // The `_root` should be appended or removed here but there is no way to check if core.Legend is actually enabled or not
  setOptions(options) {
    const that = this;
    that.update(that._data, options, this._params.themeManager.theme('legend').title);
    that._unbindData();
    const source = options.source;
    that._bindData(source ? {
      category: source.layer,
      name: source.grouping
    } : unknownSource);
    that.updateLayout();
    return that;
  }
});
function LegendsControl(parameters) {
  this._params = parameters;
  this._items = [];
  parameters.container.virtualLink('legend-base');
}
LegendsControl.prototype = {
  constructor: LegendsControl,
  dispose() {
    _each(this._items, (_, item) => {
      item.dispose();
    });
    this._params = this._items = null;
  },
  setOptions(options) {
    const optionList = options && options.length ? options : [];
    const items = this._items;
    let i;
    const ii = optionList.length;
    const params = this._params;
    const theme = params.themeManager.theme('legend');
    for (i = items.length; i < ii; ++i) {
      items[i] = new Legend(params);
    }
    for (i = items.length - 1; i >= ii; --i) {
      items[i].dispose();
      items.splice(i, 1);
    }
    params.layoutControl.suspend();
    for (i = 0; i < ii; ++i) {
      items[i].setOptions(_extend(true, {}, theme, optionList[i]));
    }
    params.layoutControl.resume();
  }
};
