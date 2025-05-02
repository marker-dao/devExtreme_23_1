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