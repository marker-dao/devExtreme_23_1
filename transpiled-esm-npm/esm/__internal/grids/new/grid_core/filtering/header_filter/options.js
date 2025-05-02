import messageLocalization from '../../../../../../common/core/localization/message';
export const defaultOptions = {
  headerFilter: {
    visible: false,
    width: 252,
    height: 325,
    allowSelectAll: true,
    search: {
      enabled: false,
      timeout: 500,
      mode: 'contains',
      editorOptions: {}
    },
    texts: {
      emptyValue: messageLocalization.format('dxDataGrid-headerFilterEmptyValue'),
      ok: messageLocalization.format('dxDataGrid-headerFilterOK'),
      cancel: messageLocalization.format('dxDataGrid-headerFilterCancel')
    }
  }
};