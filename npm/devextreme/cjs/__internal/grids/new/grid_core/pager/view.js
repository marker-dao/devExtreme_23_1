/**
* DevExtreme (cjs/__internal/grids/new/grid_core/pager/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagerView = void 0;
var _signalsCore = require("@preact/signals-core");
var _m_pager = require("../../../../grids/grid_core/pager/m_pager");
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
      pageCount: this.dataController.pageCount.value,
      showPageSizeSelector: this.options.oneWay('pager.showPageSizeSelector').value,
      _skipValidation: true,
      tabIndex: 0,
      showInfo: this.options.oneWay('pager.showInfo').value,
      showNavigationButtons: this.options.oneWay('pager.showNavigationButtons').value,
      label: this.options.oneWay('pager.label').value,
      pagesNavigatorVisible: this.options.oneWay('pager.visible').value,
      displayMode: this.options.oneWay('pager.displayMode').value,
      maxPagesCount: _m_pager.MAX_PAGES_COUNT
    }));
  }
}
exports.PagerView = PagerView;
PagerView.dependencies = [_index.DataController, _options_controller.OptionsController];
