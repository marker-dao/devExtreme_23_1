import messageLocalization from '../../../../../localization/message';
export const defaultOptions = {
  sorting: {
    ascendingText: messageLocalization.format('dxDataGrid-sortingAscendingText'),
    descendingText: messageLocalization.format('dxDataGrid-sortingDescendingText'),
    clearText: messageLocalization.format('dxDataGrid-sortingClearText'),
    mode: 'single',
    showSortIndexes: true
  }
};