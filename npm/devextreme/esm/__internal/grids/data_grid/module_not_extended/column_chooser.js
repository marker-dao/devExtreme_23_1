/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/column_chooser.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { columnChooserModule } from '../../../grids/grid_core/column_chooser/m_column_chooser';
import gridCore from '../m_core';
export const ColumnChooserController = columnChooserModule.controllers.columnChooser;
export const ColumnChooserView = columnChooserModule.views.columnChooserView;
gridCore.registerModule('columnChooser', columnChooserModule);
