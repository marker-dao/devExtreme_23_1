const SELECTORS = {
  editCell: 'dx-editor-cell',
  invalidCell: 'invalid'
};
export class DataCellModel {
  constructor(root, addWidgetPrefix) {
    var _this$root, _this$root2;
    this.root = root;
    this.addWidgetPrefix = addWidgetPrefix;
    this.isEditCell = !!((_this$root = this.root) !== null && _this$root !== void 0 && _this$root.classList.contains(SELECTORS.editCell));
    this.isValidCell = !((_this$root2 = this.root) !== null && _this$root2 !== void 0 && _this$root2.classList.contains(addWidgetPrefix(SELECTORS.invalidCell)));
  }
  getElement() {
    return this.root;
  }
  getText() {
    var _this$root3;
    return ((_this$root3 = this.root) === null || _this$root3 === void 0 ? void 0 : _this$root3.textContent) ?? '';
  }
  getHTML() {
    var _this$root4;
    return ((_this$root4 = this.root) === null || _this$root4 === void 0 ? void 0 : _this$root4.innerHTML) ?? '';
  }
}