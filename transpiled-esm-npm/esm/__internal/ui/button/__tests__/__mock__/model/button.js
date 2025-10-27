const CLASSES = {
  stateDisabled: 'dx-state-disabled'
};
export class ButtonModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  isDisabled() {
    return this.root.classList.contains(CLASSES.stateDisabled);
  }
}