"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnChooserControllerMock = void 0;
var _tree_view = _interopRequireDefault(require("../../../../../ui/tree_view"));
var _signalsCore = require("@preact/signals-core");
var _controller = require("./controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColumnChooserControllerMock extends _controller.ColumnChooserController {
  constructor(columnsController, options) {
    super(columnsController, options);
    this.treeViewElement = document.createElement('div');
    // eslint-disable-next-line new-cap
    this.treeView = new _tree_view.default(this.treeViewElement, {
      showCheckBoxesMode: 'selectAll',
      onSelectionChanged: this.onSelectionChanged.bind(this)
    });
    (0, _signalsCore.effect)(() => {
      this.treeView.option('items', this.items.value);
    });
  }
}
exports.ColumnChooserControllerMock = ColumnChooserControllerMock;