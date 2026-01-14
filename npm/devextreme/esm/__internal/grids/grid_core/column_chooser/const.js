/**
* DevExtreme (esm/__internal/grids/grid_core/column_chooser/const.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
    get title() {
      return messageLocalization.format('dxDataGrid-columnChooserTitle');
    },
    get emptyPanelText() {
      return messageLocalization.format('dxDataGrid-columnChooserEmptyText');
    },
    container: undefined
  }
};
