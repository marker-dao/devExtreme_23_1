import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../../core/component_registrator';
import errors from '../../../ui/widget/ui.errors';
import SearchBoxController, { getOperationBySearchMode } from '../../ui/collection/m_search_box_mixin';
import ListEdit from './m_list.edit';
const LIST_CLASS_PREFIX = 'dx-list';
class ListSearch extends ListEdit {
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
      searchMode: '',
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
      dataController.searchOperation(getOperationBySearchMode(searchMode));
    }
    if (searchExpr) {
      dataController.searchExpr(searchExpr);
    }
  }
  _init() {
    this._searchBoxController = new SearchBoxController();
    super._init();
  }
  _initMarkup() {
    this._searchBoxController.render(LIST_CLASS_PREFIX, this.$element(), this._getSearchBoxControllerOptions(), this._createComponent.bind(this));
    super._initMarkup();
  }
  _getAriaTarget() {
    if (this.option('searchEnabled')) {
      return this._itemContainer();
    }
    return super._getAriaTarget();
  }
  focus() {
    if (!this.option('focusedElement') && this.option('searchEnabled')) {
      var _this$_searchBoxContr;
      (_this$_searchBoxContr = this._searchBoxController) === null || _this$_searchBoxContr === void 0 || _this$_searchBoxContr.focus();
      return;
    }
    super.focus();
  }
  _focusTarget() {
    if (this.option('searchEnabled')) {
      return this._itemContainer();
    }
    return super._focusTarget();
  }
  _updateFocusState(e, isFocused) {
    if (this.option('searchEnabled')) {
      this._toggleFocusClass(isFocused, this.$element());
    }
    super._updateFocusState(e, isFocused);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'searchEnabled':
      case 'searchEditorOptions':
        this._invalidate();
        break;
      case 'searchExpr':
      case 'searchMode':
      case 'searchValue':
        if (!this._dataSource) {
          errors.log('W1009');
          return;
        }
        if (args.name === 'searchMode') {
          this._dataSource.searchOperation(getOperationBySearchMode(args.value));
        } else {
          this._dataSource[args.name](args.value);
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
registerComponent('dxList', ListSearch);
export default ListSearch;