/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/virtual_scrolling.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_virtual_scrolling = require("../../../grids/grid_core/virtual_scrolling/m_virtual_scrolling");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_data_source_adapter = _interopRequireDefault(require("../m_data_source_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_m_core.default.registerModule('virtualScrolling', _m_virtual_scrolling.virtualScrollingModule);
_m_data_source_adapter.default.extend(_m_virtual_scrolling.dataSourceAdapterExtender);
