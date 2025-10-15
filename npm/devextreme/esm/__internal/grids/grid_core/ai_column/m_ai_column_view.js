/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/m_ai_column_view.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { View } from '../m_modules';
import { getAiCommandColumnOptions } from './m_ai_column_controller_utils';
export class AiColumnView extends View {
  addAiCommandColumn() {
    this.columnsController.addCommandColumn(getAiCommandColumnOptions());
  }
  init() {
    this.columnsController = this.getController('columns');
    this.aiColumnController = this.getController('aiColumn');
    this.addAiCommandColumn();
  }
}
