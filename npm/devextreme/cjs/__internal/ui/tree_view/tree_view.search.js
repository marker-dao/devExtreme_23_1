/**
* DevExtreme (cjs/__internal/ui/tree_view/tree_view.search.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TREEVIEW_CLASS_PREFIX = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _search_box_controller = _interopRequireDefault(require("../../ui/collection/search_box_controller"));
var _m_text_box = _interopRequireDefault(require("../../ui/text_box/m_text_box"));
var _tree_view = _interopRequireDefault(require("../../ui/tree_view/tree_view.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TREEVIEW_CLASS_PREFIX = exports.TREEVIEW_CLASS_PREFIX = 'dx-treeview';
const TREEVIEW_NODE_CONTAINER_CLASS = 'dx-treeview-node-container';
_search_box_controller.default.setEditorClass(_m_text_box.default);
class TreeViewSearch extends _tree_view.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      searchValue: '',
      searchEnabled: false,
      searchEditorOptions: {}
    });
  }
  _getSearchBoxControllerOptions() {
    const {
      tabIndex,
      searchEnabled,
      searchValue,
      searchTimeout,
      searchEditorOptions
    } = this.option();
    return {
      tabIndex,
      searchEnabled,
      searchValue,
      searchTimeout,
      searchEditorOptions,
      onValueChanged: value => {
        this.option('searchValue', value);
      }
    };
  }
  _init() {
    this._searchBoxController = new _search_box_controller.default();
    super._init();
  }
  _initMarkup() {
    this._searchBoxController.render(TREEVIEW_CLASS_PREFIX, this.$element(), this._getSearchBoxControllerOptions(), this._createComponent.bind(this));
    super._initMarkup();
  }
  _getAriaTarget() {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      return this._itemContainer(true);
    }
    return super._getAriaTarget();
  }
  getSearchBoxController() {
    return this._searchBoxController;
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'searchEnabled':
      case 'searchEditorOptions':
        this._invalidate();
        break;
      case 'searchValue':
        {
          if (this._showCheckboxes() && this._isRecursiveSelection()) {
            this._removeSelection();
          }
          this._initDataAdapter();
          this._updateSearch();
          this._repaintContainer();
          this.option('focusedElement', null);
          break;
        }
      case 'searchExpr':
        {
          this._initDataAdapter();
          this.repaint();
          break;
        }
      case 'searchMode':
        {
          const {
            expandNodesRecursive
          } = this.option();
          if (expandNodesRecursive) {
            this._updateDataAdapter();
          } else {
            this._initDataAdapter();
          }
          this.repaint();
          break;
        }
      case 'searchTimeout':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _updateDataAdapter() {
    this._setOptionWithoutOptionChange('expandNodesRecursive', false);
    this._initDataAdapter();
    this._setOptionWithoutOptionChange('expandNodesRecursive', true);
  }
  _getDataAdapterOptions() {
    const {
      searchValue = '',
      searchMode = 'contains',
      searchExpr
    } = this.option();
    return _extends({}, super._getDataAdapterOptions(), {
      searchValue,
      searchMode,
      searchExpr
    });
  }
  _getNodeContainer() {
    return this.$element().find(`.${TREEVIEW_NODE_CONTAINER_CLASS}`).first();
  }
  _updateSearch() {
    var _this$_searchBoxContr;
    const searchBoxControllerOptions = this._getSearchBoxControllerOptions();
    (_this$_searchBoxContr = this._searchBoxController) === null || _this$_searchBoxContr === void 0 || _this$_searchBoxContr.updateEditorOptions(searchBoxControllerOptions);
  }
  _repaintContainer() {
    const $container = this._getNodeContainer();
    let rootNodes = [];
    if ($container.length) {
      $container.empty();
      rootNodes = this._dataAdapter.getRootNodes();
      this._renderEmptyMessage(rootNodes);
      this._renderNodes(rootNodes, $container);
      this._fireContentReadyAction();
    }
  }
  _updateFocusState(e, isFocused) {
    if (this.option('searchEnabled')) {
      this._toggleFocusClass(isFocused, this.$element());
    }
    super._updateFocusState(e, isFocused);
  }
  _focusTarget() {
    const {
      searchEnabled
    } = this.option();
    return this._itemContainer(searchEnabled);
  }
  focus() {
    if (!this.option('focusedElement') && this.option('searchEnabled')) {
      var _this$_searchBoxContr2;
      (_this$_searchBoxContr2 = this._searchBoxController) === null || _this$_searchBoxContr2 === void 0 || _this$_searchBoxContr2.focus();
      return;
    }
    super.focus();
  }
  _cleanItemContainer() {
    var _this$_searchBoxContr3;
    (_this$_searchBoxContr3 = this._searchBoxController) === null || _this$_searchBoxContr3 === void 0 || _this$_searchBoxContr3.remove();
    this.$element().empty();
  }
  _itemContainer(isSearchMode, selectAllEnabled) {
    const isSelectAllEnabled = selectAllEnabled ?? this._selectAllEnabled();
    const {
      items = []
    } = this.option();
    if (isSelectAllEnabled && items.length) {
      return this._getNodeContainer();
    }
    if (this._scrollable && isSearchMode) {
      return (0, _renderer.default)(this._scrollable.content());
    }
    return super._itemContainer();
  }
  _addWidgetClass() {
    this.$element().addClass(this._widgetClass());
  }
  _cleanAria() {
    const $element = this.$element();
    this.setAria({
      role: null,
      activedescendant: null
    }, $element);
    $element.attr('tabIndex', null);
  }
  _refresh() {
    var _this$_searchBoxContr4;
    (_this$_searchBoxContr4 = this._searchBoxController) === null || _this$_searchBoxContr4 === void 0 || _this$_searchBoxContr4.resolveValueChange();
    super._refresh();
  }
  _clean() {
    this._cleanAria();
    super._clean();
  }
  dispose() {
    var _this$_searchBoxContr5;
    (_this$_searchBoxContr5 = this._searchBoxController) === null || _this$_searchBoxContr5 === void 0 || _this$_searchBoxContr5.dispose();
    super.dispose();
  }
}
(0, _component_registrator.default)('dxTreeView', TreeViewSearch);
var _default = exports.default = TreeViewSearch;
