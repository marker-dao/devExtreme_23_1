/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/options.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../../localization/message';
export const defaultOptions = {
  editing: {
    changes: [],
    allowAdding: false,
    allowDeleting: false,
    allowUpdating: false,
    confirmDelete: true,
    form: {},
    popup: {},
    texts: {
      confirmDeleteMessage: messageLocalization.format('dxDataGrid-editingConfirmDeleteMessage'),
      confirmDeleteTitle: '',
      deleteCard: messageLocalization.format('dxDataGrid-editingDeleteRow'),
      editCard: messageLocalization.format('dxDataGrid-editingEditRow'),
      saveCard: messageLocalization.format('dxDataGrid-editingSaveRowChanges'),
      addCard: messageLocalization.format('dxDataGrid-editingAddRow'),
      cancel: messageLocalization.format('dxDataGrid-editingCancelRowChanges')
    }
  }
};
