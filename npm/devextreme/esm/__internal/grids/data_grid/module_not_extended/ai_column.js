/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/ai_column.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { AIColumnController } from '../../../grids/grid_core/ai_column/m_ai_column_controller';
import { columnHeadersViewExtender } from '../../../grids/grid_core/ai_column/m_ai_column_view';
import { AIPromptEditorView } from '../../../grids/grid_core/ai_column/m_ai_prompt_editor_view';
import { AIPromptEditorViewController } from '../../../grids/grid_core/ai_column/m_ai_prompt_editor_view_controller';
import gridCore from '../m_core';
gridCore.registerModule('aiColumn', {
  controllers: {
    aiColumn: AIColumnController,
    aiPromptEditor: AIPromptEditorViewController
  },
  views: {
    aiPromptEditorView: AIPromptEditorView
  },
  extenders: {
    views: {
      columnHeadersView: columnHeadersViewExtender
    }
  }
});
