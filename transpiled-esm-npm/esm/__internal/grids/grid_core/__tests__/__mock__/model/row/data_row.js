const SELECTORS = {
  editRow: 'dx-edit-row',
  deleteRowButton: 'dx-link-delete',
  undeleteRowButton: 'dx-link-undelete'
};
export class DataRowModel {
  constructor(root) {
    var _this$root;
    this.root = root;
    this.isEditRow = !!((_this$root = this.root) !== null && _this$root !== void 0 && _this$root.classList.contains(SELECTORS.editRow));
  }
  getElement() {
    return this.root;
  }
  getDeleteButton() {
    const row = this.getElement();
    return row.querySelector(`.${SELECTORS.deleteRowButton}`);
  }
  getRecoverButton() {
    const row = this.getElement();
    return row.querySelector(`.${SELECTORS.undeleteRowButton}`);
  }
}