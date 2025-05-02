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
      confirmDeleteMessage: messageLocalization.format('dxDataGrid-editingConfirmDeleteMessage')
    }
  }
};