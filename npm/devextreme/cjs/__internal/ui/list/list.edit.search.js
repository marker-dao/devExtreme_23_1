/**
* DevExtreme (cjs/__internal/ui/list/list.edit.search.js)
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
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _search_box_controller = _interopRequireWildcard(require("../../ui/collection/search_box_controller"));
var _list = _interopRequireDefault(require("../../ui/list/list.edit"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// STYLE list
const LIST_CLASS_PREFIX = 'dx-list';
class ListSearch extends _list.default {
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  _getCombinedFilter() {
    const dataController = this._dataController;
    // @ts-expect-error ts-error
    const storeLoadOptions = {
      filter: dataController.filter()
    };
    dataController.addSearchFilter(storeLoadOptions);
    const {
      filter
    } = storeLoadOptions;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return filter;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      // @ts-expect-error ts-error
      searchMode: '',
      // @ts-expect-error ts-error
      searchExpr: null,
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
  _initDataSource() {
    const {
      searchValue,
      searchExpr,
      searchMode
    } = this.option();
    super._initDataSource();
    const dataController = this._dataController;
    if (searchValue !== null && searchValue !== void 0 && searchValue.length) {
      dataController.searchValue(searchValue);
    }
    if (searchMode !== null && searchMode !== void 0 && searchMode.length) {
      dataController.searchOperation((0, _search_box_controller.getOperationBySearchMode)(searchMode));
    }
    if (searchExpr) {
      dataController.searchExpr(searchExpr);
    }
  }
  _init() {
    this._searchBoxController = new _search_box_controller.default();
    super._init();
  }
  _initMarkup() {
    this._searchBoxController.render(LIST_CLASS_PREFIX, this.$element(), this._getSearchBoxControllerOptions(), this._createComponent.bind(this));
    super._initMarkup();
  }
  _getAriaTarget() {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      return this._itemContainer();
    }
    return super._getAriaTarget();
  }
  focus() {
    const {
      focusedElement,
      searchEnabled
    } = this.option();
    if (!focusedElement && searchEnabled) {
      var _this$_searchBoxContr;
      (_this$_searchBoxContr = this._searchBoxController) === null || _this$_searchBoxContr === void 0 || _this$_searchBoxContr.focus();
      return;
    }
    super.focus();
  }
  _focusTarget() {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      return this._itemContainer();
    }
    return super._focusTarget();
  }
  _updateFocusState(e, isFocused) {
    const {
      searchEnabled
    } = this.option();
    if (searchEnabled) {
      this._toggleFocusClass(isFocused, this.$element());
    }
    super._updateFocusState(e, isFocused);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'searchEnabled':
      case 'searchEditorOptions':
        this._invalidate();
        break;
      case 'searchExpr':
      case 'searchMode':
      case 'searchValue':
        if (!this._dataSource) {
          _ui.default.log('W1009');
          return;
        }
        if (name === 'searchMode') {
          this._dataSource.searchOperation((0, _search_box_controller.getOperationBySearchMode)(value));
        } else {
          this._dataSource[name](value);
        }
        this._dataSource.load();
        break;
      case 'searchTimeout':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _refresh() {
    var _this$_searchBoxContr2;
    (_this$_searchBoxContr2 = this._searchBoxController) === null || _this$_searchBoxContr2 === void 0 || _this$_searchBoxContr2.resolveValueChange();
    super._refresh();
  }
  _cleanAria() {
    const $element = this.$element();
    this.setAria({
      role: null,
      activedescendant: null
    }, $element);
    $element.attr('tabIndex', null);
  }
  _clean() {
    this._cleanAria();
    super._clean();
  }
  _dispose() {
    var _this$_searchBoxContr3;
    (_this$_searchBoxContr3 = this._searchBoxController) === null || _this$_searchBoxContr3 === void 0 || _this$_searchBoxContr3.dispose();
    super._dispose();
  }
}
(0, _component_registrator.default)('dxList', ListSearch);
var _default = exports.default = ListSearch;
