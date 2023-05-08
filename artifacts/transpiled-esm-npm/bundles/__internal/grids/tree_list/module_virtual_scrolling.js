"use strict";

var _extend = require("../../../core/utils/extend");
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.virtual_scrolling");
var _module_core = _interopRequireDefault(require("./module_core"));
var _module = _interopRequireDefault(require("./data_source_adapter/module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var oldDefaultOptions = _uiGrid_core.virtualScrollingModule.defaultOptions;
var originalDataControllerExtender = _uiGrid_core.virtualScrollingModule.extenders.controllers.data;
var originalDataSourceAdapterExtender = _uiGrid_core.virtualScrollingModule.extenders.dataSourceAdapter;
_uiGrid_core.virtualScrollingModule.extenders.controllers.data = (0, _extend.extend)({}, originalDataControllerExtender, {
  _loadOnOptionChange: function _loadOnOptionChange() {
    var virtualScrollController = this._dataSource && this._dataSource._virtualScrollController;
    virtualScrollController && virtualScrollController.reset();
    this.callBase();
  }
});
_uiGrid_core.virtualScrollingModule.extenders.dataSourceAdapter = (0, _extend.extend)({}, originalDataSourceAdapterExtender, {
  changeRowExpand: function changeRowExpand() {
    var _this = this;
    return this.callBase.apply(this, arguments).done(function () {
      var viewportItemIndex = _this.getViewportItemIndex();
      viewportItemIndex >= 0 && _this.setViewportItemIndex(viewportItemIndex);
    });
  }
});
_module_core.default.registerModule('virtualScrolling', (0, _extend.extend)({}, _uiGrid_core.virtualScrollingModule, {
  defaultOptions: function defaultOptions() {
    return (0, _extend.extend)(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
_module.default.extend(_uiGrid_core.virtualScrollingModule.extenders.dataSourceAdapter);