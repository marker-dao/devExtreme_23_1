export class DataCellModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getText() {
    var _this$root;
    return ((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.textContent) ?? '';
  }
}