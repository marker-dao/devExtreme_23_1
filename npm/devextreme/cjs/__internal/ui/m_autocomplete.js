/**
* DevExtreme (cjs/__internal/ui/m_autocomplete.js)
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
exports.default = void 0;
var _index = require("../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _m_drop_down_list = _interopRequireDefault(require("../ui/drop_down_editor/m_drop_down_list"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AUTOCOMPLETE_CLASS = 'dx-autocomplete';
const AUTOCOMPLETE_POPUP_WRAPPER_CLASS = 'dx-autocomplete-popup-wrapper';
class Autocomplete extends _m_drop_down_list.default {
  _supportedKeys() {
    let item = this._list ? this._list.option('focusedElement') : null;
    const parent = super._supportedKeys();
    // @ts-expect-error ts-error
    item = item && (0, _renderer.default)(item);
    return _extends({}, parent, {
      upArrow(e) {
        // @ts-expect-error ts-error
        if (parent.upArrow.apply(this, arguments) && !(0, _index.isCommandKeyPressed)(e)) {
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
        if (parent.downArrow.apply(this, arguments) && !(0, _index.isCommandKeyPressed)(e)) {
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
    return !(0, _renderer.default)(target).closest(this.$element()).length;
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
    return (0, _extend.extend)(super._listConfig(), {
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
    return (0, _deferred.Deferred)().resolve(selectedItem).promise();
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
(0, _component_registrator.default)('dxAutocomplete', Autocomplete);
var _default = exports.default = Autocomplete;
