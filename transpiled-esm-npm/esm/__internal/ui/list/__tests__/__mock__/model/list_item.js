const CLASSES = {
  stateDisabled: 'dx-state-disabled'
};
export class ListItemModel {
  constructor(root) {
    this.root = root;
    this.isDisabled = (root === null || root === void 0 ? void 0 : root.classList.contains(CLASSES.stateDisabled)) ?? false;
  }
  getElement() {
    return this.root;
  }
}