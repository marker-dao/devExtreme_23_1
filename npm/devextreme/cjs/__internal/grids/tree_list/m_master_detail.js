/**
* DevExtreme (cjs/__internal/grids/tree_list/m_master_detail.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _extend = require("../../../core/utils/extend");
var _m_master_detail = require("../../grids/grid_core/master_detail/m_master_detail");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const data = Base => class DataMasterDetailTreeListExtender extends (0, _m_master_detail.dataMasterDetailExtenderMixin)(Base) {
  isRowExpanded() {
    // @ts-expect-error
    return this.isRowExpandedHack.apply(this, arguments);
  }
  _processItems() {
    // @ts-expect-error
    return this._processItemsHack.apply(this, arguments);
  }
  _processDataItem() {
    // @ts-expect-error
    return this._processDataItemHack.apply(this, arguments);
  }
};
_m_core.default.registerModule('masterDetail', (0, _extend.extend)(true, {}, _m_master_detail.masterDetailModule, {
  extenders: {
    controllers: {
      data
    }
  }
}));
