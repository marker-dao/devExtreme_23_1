import _extends from "@babel/runtime/helpers/esm/extends";
import { isCommandKeyPressed } from '../../common/core/events/utils/index';
import registerComponent from '../../core/component_registrator';
import $ from '../../core/renderer';
import { Deferred } from '../../core/utils/deferred';
import { extend } from '../../core/utils/extend';
import DropDownList from '../ui/drop_down_editor/m_drop_down_list';
const AUTOCOMPLETE_CLASS = 'dx-autocomplete';
const AUTOCOMPLETE_POPUP_WRAPPER_CLASS = 'dx-autocomplete-popup-wrapper';
class Autocomplete extends DropDownList {
  _supportedKeys() {
    let item = this._list ? this._list.option('focusedElement') : null;
    const parent = super._supportedKeys();
    // @ts-expect-error ts-error
    item = item && $(item);
    return _extends({}, parent, {
      upArrow(e) {
        // @ts-expect-error ts-error
        if (parent.upArrow.apply(this, arguments) && !isCommandKeyPressed(e)) {
          e.preventDefault();
          e.stopPropagation();
          if (item && !this._calcNextItem(-1)) {
            this._clearFocusedItem();
            return false;
          }
        }
        return true;
      },
      downArrow(e) {
        // @ts-expect-error ts-error
        if (parent.downArrow.apply(this, arguments) && !isCommandKeyPressed(e)) {
          e.preventDefault();
          e.stopPropagation();
          if (item && !this._calcNextItem(1)) {
            this._clearFocusedItem();
            return false;
          }
        }
        return true;
      },
      enter(e) {
        if (!item) {
          this.close();
        }
        const {
          opened
        } = this.option();
        if (opened) {
          e.preventDefault();
        }
        return opened;
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      minSearchLength: 1,
      maxItemCount: 10,
      noDataText: '',
      showDropDownButton: false,
      searchEnabled: true
    });
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(AUTOCOMPLETE_CLASS);
  }
  _getAriaAutocomplete() {
    const {
      disabled,
      readOnly
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const isInputEditable = !(readOnly || disabled);
    return isInputEditable ? 'list' : 'none';
  }
  _displayGetterExpr() {
    return this.option('valueExpr');
  }
  _closeOutsideDropDownHandler(_ref) {
    let {
      target
    } = _ref;
    return !$(target).closest(this.$element()).length;
  }
  _renderDimensions() {
    super._renderDimensions();
    this._updatePopupWidth();
    this._updateListDimensions();
  }
  _popupWrapperClass() {
    return `${super._popupWrapperClass()} ${AUTOCOMPLETE_POPUP_WRAPPER_CLASS}`;
  }
  _listConfig() {
    return extend(super._listConfig(), {
      pageLoadMode: 'none',
      onSelectionChanged: e => {
        this._setSelectedItem(e.addedItems[0]);
      }
    });
  }
  _listItemClickHandler(e) {
    this._saveValueChangeEvent(e.event);
    // @ts-expect-error ts-error
    const value = this._displayGetter(e.itemData);
    this.option('value', value);
    this.close();
  }
  _setListDataSource() {
    if (!this._list) {
      return;
    }
    this._list.option('selectedItems', []);
    super._setListDataSource();
  }
  _refreshSelected() {}
  _searchCanceled() {
    super._searchCanceled();
    this.close();
  }
  _loadItem(value, cache) {
    const selectedItem = this._getItemFromPlain(value, cache);
    return Deferred().resolve(selectedItem).promise();
  }
  _dataSourceOptions() {
    return {
      paginate: true,
      pageSize: this.option('maxItemCount')
    };
  }
  _searchDataSource(searchValue) {
    this._dataSource.pageSize(this.option('maxItemCount'));
    super._searchDataSource(searchValue);
    this._clearFocusedItem();
  }
  _clearFocusedItem() {
    if (this._list) {
      this._list.option('focusedElement', null);
      this._list.option('selectedIndex', -1);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _renderValueEventName() {
    return 'input keyup';
  }
  _valueChangeEventHandler(e) {
    const value = this._input().val() || null;
    return super._valueChangeEventHandler(e, value);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'readOnly':
      case 'disabled':
        super._optionChanged(args);
        this._setDefaultAria();
        break;
      case 'maxItemCount':
        // @ts-expect-error ts-error
        this._searchDataSource();
        break;
      case 'valueExpr':
        // @ts-expect-error ts-error
        this._compileDisplayGetter();
        this._setListOption('displayExpr', this._displayGetterExpr());
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  clear() {
    super.clear();
    this.close();
  }
  reset() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (arguments.length) {
      super.reset(value);
    } else {
      super.reset();
    }
    this.close();
  }
}
registerComponent('dxAutocomplete', Autocomplete);
export default Autocomplete;