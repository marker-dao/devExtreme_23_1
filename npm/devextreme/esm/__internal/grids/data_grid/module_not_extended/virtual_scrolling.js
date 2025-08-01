/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/virtual_scrolling.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { dataSourceAdapterExtender, virtualScrollingModule } from '../../../grids/grid_core/virtual_scrolling/m_virtual_scrolling';
import gridCore from '../m_core';
import dataSourceAdapterProvider from '../m_data_source_adapter';
gridCore.registerModule('virtualScrolling', virtualScrollingModule);
dataSourceAdapterProvider.extend(dataSourceAdapterExtender);
