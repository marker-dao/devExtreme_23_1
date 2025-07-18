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