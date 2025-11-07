const CLASSES = {
  stateInvisible: 'dx-state-invisible'
};
export class LoadPanelModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  isVisible() {
    var _this$root;
    return !((_this$root = this.root) !== null && _this$root !== void 0 && _this$root.classList.contains(CLASSES.stateInvisible));
  }
}