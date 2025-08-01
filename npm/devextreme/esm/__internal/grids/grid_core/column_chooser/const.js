/**
* DevExtreme (esm/__internal/grids/grid_core/column_chooser/const.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../common/core/localization/message';
export const defaultOptions = {
  columnChooser: {
    enabled: false,
    search: {
      enabled: false,
      timeout: 500,
      editorOptions: {}
    },
    selection: {
      allowSelectAll: false,
      selectByClick: false,
      recursive: false
    },
    position: undefined,
    sortOrder: undefined,
    mode: 'dragAndDrop',
    width: 250,
    height: 260,
    title: messageLocalization.format('dxDataGrid-columnChooserTitle'),
    emptyPanelText: messageLocalization.format('dxDataGrid-columnChooserEmptyText'),
    container: undefined
  }
};
