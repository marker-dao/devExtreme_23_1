/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/ai_column.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { AiColumnController } from '../../../grids/grid_core/ai_column/m_ai_column_controller';
import { AiColumnView } from '../../../grids/grid_core/ai_column/m_ai_column_view';
import gridCore from '../m_core';
gridCore.registerModule('aiColumn', {
  controllers: {
    aiColumn: AiColumnController
  },
  views: {
    aiColumnView: AiColumnView
  }
});
