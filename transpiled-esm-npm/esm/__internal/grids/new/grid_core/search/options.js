import messageLocalization from '../../../../../localization/message';
export const defaultOptions = {
  searchPanel: {
    highlightCaseSensitive: false,
    highlightSearchText: true,
    placeholder: messageLocalization.format('dxDataGrid-searchPanelPlaceholder'),
    searchVisibleColumnsOnly: false,
    text: '',
    visible: false,
    width: 160
  }
};