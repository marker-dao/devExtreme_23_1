"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagerView = void 0;
var _signalsCore = require("@preact/signals-core");
var _view = require("../core/view");
var _index = require("../data_controller/index");
var _options_controller = require("../options_controller/options_controller");
var _pager = require("./pager");
var _utils = require("./utils");
class PagerView extends _view.View {
  constructor(dataController, options) {
    super();
    this.dataController = dataController;
    this.options = options;
    this.component = _pager.PagerView;
    this.pageSizesConfig = this.options.oneWay('pager.allowedPageSizes');
    this.allowedPageSizes = (0, _signalsCore.signal)(undefined);
    this.visibleConfig = this.options.oneWay('pager.visible');
    this.visible = (0, _signalsCore.computed)(() => (0, _utils.isVisible)(this.visibleConfig.value, this.dataController.pageCount.value));
    (0, _signalsCore.effect)(() => {
      this.allowedPageSizes.value = (0, _utils.calculatePageSizes)(this.allowedPageSizes.peek(), this.pageSizesConfig.value, this.dataController.pageSize.value);
    });
  }
  getProps() {
    return (0, _signalsCore.computed)(() => ({
      itemCount: this.dataController.totalCount.value,
      allowedPageSizes: this.allowedPageSizes.value,
      visible: this.visible.value,
      pageIndex: this.dataController.pageIndex.value + 1,
      pageIndexChanged: value => {
        this.dataController.pageIndex.value = value - 1;
      },
      pageSize: this.dataController.pageSize.value,
      pageSizeChanged: value => {
        this.dataController.pageSize.value = value;
      },
      isGridCompatibility: false,
      pageCount: this.dataController.pageCount.value,
      showPageSizeSelector: this.options.oneWay('pager.showPageSizeSelector').value,
      _skipValidation: true,
      tabIndex: 0,
      showInfo: this.options.oneWay('pager.showInfo').value,
      showNavigationButtons: this.options.oneWay('pager.showNavigationButtons').value
    }));
  }
}
exports.PagerView = PagerView;
PagerView.dependencies = [_index.DataController, _options_controller.OptionsController];