/**
* DevExtreme (cjs/__internal/grids/tree_list/m_virtual_scrolling.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _extend = require("../../../core/utils/extend");
var _m_virtual_scrolling = require("../../grids/grid_core/virtual_scrolling/m_virtual_scrolling");
var _m_data_source_adapter = _interopRequireDefault(require("./data_source_adapter/m_data_source_adapter"));
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const oldDefaultOptions = _m_virtual_scrolling.virtualScrollingModule.defaultOptions;
const originalDataControllerExtender = _m_virtual_scrolling.virtualScrollingModule.extenders.controllers.data;
const originalDataSourceAdapterExtender = _m_virtual_scrolling.virtualScrollingModule.extenders.dataSourceAdapter;
_m_virtual_scrolling.virtualScrollingModule.extenders.controllers.data = (0, _extend.extend)({}, originalDataControllerExtender, {
  _loadOnOptionChange() {
    const virtualScrollController = this._dataSource && this._dataSource._virtualScrollController;
    virtualScrollController && virtualScrollController.reset();
    this.callBase();
  }
});
_m_virtual_scrolling.virtualScrollingModule.extenders.dataSourceAdapter = (0, _extend.extend)({}, originalDataSourceAdapterExtender, {
  changeRowExpand() {
    return this.callBase.apply(this, arguments).done(() => {
      const viewportItemIndex = this.getViewportItemIndex();
      viewportItemIndex >= 0 && this.setViewportItemIndex(viewportItemIndex);
    });
  }
});
_m_core.default.registerModule('virtualScrolling', (0, _extend.extend)({}, _m_virtual_scrolling.virtualScrollingModule, {
  defaultOptions() {
    return (0, _extend.extend)(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
_m_data_source_adapter.default.extend(_m_virtual_scrolling.virtualScrollingModule.extenders.dataSourceAdapter);
