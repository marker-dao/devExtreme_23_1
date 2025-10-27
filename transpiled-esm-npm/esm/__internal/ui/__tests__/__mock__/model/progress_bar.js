const CLASSES = {
  stateInvisible: 'dx-state-invisible'
};
export class ProgressBarModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  isVisible() {
    return !this.root.classList.contains(CLASSES.stateInvisible);
  }
}