/**
* DevExtreme (cjs/ui/autocomplete.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _common = require("../core/utils/common");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_list"));
var _deferred = require("../core/utils/deferred");
var _index = require("../events/utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// STYLE autocomplete

const AUTOCOMPLETE_CLASS = 'dx-autocomplete';
const AUTOCOMPLETE_POPUP_WRAPPER_CLASS = 'dx-autocomplete-popup-wrapper';
const Autocomplete = _ui.default.inherit({
  _supportedKeys: function () {
    let item = this._list ? this._list.option('focusedElement') : null;
    const parent = this.callBase();
    item = item && (0, _renderer.default)(item);
    return (0, _extend.extend)({}, parent, {
      upArrow: function (e) {
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
      downArrow: function (e) {
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
      enter: function (e) {
        if (!item) {
          this.close();
        }
        const opened = this.option('opened');
        if (opened) {
          e.preventDefault();
        }
        return opened;
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, _extend.extend)(this.callBase(), {
      minSearchLength: 1,
      maxItemCount: 10,
      /**
      * @name dxAutocompleteOptions.noDataText
      * @type string
      * @default ""
      * @hidden
      */
      noDataText: '',
      showDropDownButton: false,
      searchEnabled: true

      /**
      * @name dxAutocompleteOptions.displayExpr
      * @hidden
      */

      /**
      * @name dxAutocompleteOptions.acceptCustomValue
      * @hidden
      */

      /**
      * @name dxAutocompleteOptions.searchEnabled
      * @hidden
      */

      /**
      * @name dxAutocompleteOptions.showDataBeforeSearch
      * @hidden
      */
    });
  },

  /**
  * @name dxAutocomplete.open
  * @publicName open()
  * @hidden
  */
  /**
  * @name dxAutocomplete.close
  * @publicName close()
  * @hidden
  */

  _initMarkup: function () {
    this.callBase();
    this.$element().addClass(AUTOCOMPLETE_CLASS);
    this.setAria('autocomplete', 'inline');
  },
  _displayGetterExpr: function () {
    return this.option('valueExpr');
  },
  _closeOutsideDropDownHandler: function (_ref) {
    let {
      target
    } = _ref;
    return !(0, _renderer.default)(target).closest(this.$element()).length;
  },
  _renderDimensions: function () {
    this.callBase();
    this._updatePopupWidth();
    this._updateListDimensions();
  },
  _popupWrapperClass: function () {
    return this.callBase() + ' ' + AUTOCOMPLETE_POPUP_WRAPPER_CLASS;
  },
  _listConfig: function () {
    return (0, _extend.extend)(this.callBase(), {
      pageLoadMode: 'none',
      onSelectionChanged: e => {
        this._setSelectedItem(e.addedItems[0]);
      }
    });
  },
  _listItemClickHandler: function (e) {
    this._saveValueChangeEvent(e.event);
    const value = this._displayGetter(e.itemData);
    this.option('value', value);
    this.close();
  },
  _setListDataSource: function () {
    if (!this._list) {
      return;
    }
    this._list.option('selectedItems', []);
    this.callBase();
  },
  _refreshSelected: _common.noop,
  _searchCanceled: function () {
    this.callBase();
    this.close();
  },
  _loadItem: function (value, cache) {
    const selectedItem = this._getItemFromPlain(value, cache);
    return new _deferred.Deferred().resolve(selectedItem).promise();
  },
  _dataSourceOptions: function () {
    return {
      paginate: true,
      pageSize: this.option('maxItemCount')
    };
  },
  _searchDataSource: function (searchValue) {
    this._dataSource.pageSize(this.option('maxItemCount'));
    this.callBase(searchValue);
    this._clearFocusedItem();
  },
  _clearFocusedItem: function () {
    if (this._list) {
      this._list.option('focusedElement', null);
      this._list.option('selectedIndex', -1);
    }
  },
  _renderValueEventName: function () {
    return 'input keyup';
  },
  _valueChangeEventHandler: function (e) {
    const value = this._input().val() || null;
    return this.callBase(e, value);
  },
  _optionChanged: function (args) {
    switch (args.name) {
      case 'maxItemCount':
        this._searchDataSource();
        break;
      case 'valueExpr':
        this._compileDisplayGetter();
        this._setListOption('displayExpr', this._displayGetterExpr());
        this.callBase(args);
        break;
      default:
        this.callBase(args);
    }
  },
  clear: function () {
    this.callBase();
    this.close();
  },
  reset: function () {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (arguments.length) {
      this.callBase(value);
    } else {
      this.callBase();
    }
    this.close();
  }
});
(0, _component_registrator.default)('dxAutocomplete', Autocomplete);
var _default = Autocomplete;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;