/**
* DevExtreme (esm/__internal/ui/collection/m_search_box_mixin.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { stubComponent } from '../../../core/utils/stubs';
import errors from '../../../ui/widget/ui.errors';
let EditorClass = stubComponent('TextBox');
export default {
  _getDefaultOptions() {
    return extend(this.callBase(), {
      searchMode: '',
      searchExpr: null,
      searchValue: '',
      searchEnabled: false,
      searchEditorOptions: {}
    });
  },
  _initMarkup() {
    this._renderSearch();
    this.callBase();
  },
  _renderSearch() {
    const $element = this.$element();
    const searchEnabled = this.option('searchEnabled');
    const searchBoxClassName = this._addWidgetPrefix('search');
    const rootElementClassName = this._addWidgetPrefix('with-search');
    if (!searchEnabled) {
      $element.removeClass(rootElementClassName);
      this._removeSearchBox();
      return;
    }
    const editorOptions = this._getSearchEditorOptions();
    if (this._searchEditor) {
      this._searchEditor.option(editorOptions);
    } else {
      $element.addClass(rootElementClassName);
      this._$searchEditorElement = $('<div>').addClass(searchBoxClassName).prependTo($element);
      this._searchEditor = this._createComponent(this._$searchEditorElement, EditorClass, editorOptions);
    }
  },
  _removeSearchBox() {
    this._$searchEditorElement && this._$searchEditorElement.remove();
    delete this._$searchEditorElement;
    delete this._searchEditor;
  },
  _getSearchEditorOptions() {
    const that = this;
    const userEditorOptions = that.option('searchEditorOptions');
    const searchText = messageLocalization.format('Search');
    return extend({
      mode: 'search',
      placeholder: searchText,
      tabIndex: that.option('tabIndex'),
      value: that.option('searchValue'),
      valueChangeEvent: 'input',
      inputAttr: {
        'aria-label': searchText
      },
      onValueChanged(e) {
        const searchTimeout = that.option('searchTimeout');
        that._valueChangeDeferred = Deferred();
        clearTimeout(that._valueChangeTimeout);
        that._valueChangeDeferred.done(function () {
          this.option('searchValue', e.value);
        }.bind(that));
        if (e.event && e.event.type === 'input' && searchTimeout) {
          that._valueChangeTimeout = setTimeout(() => {
            that._valueChangeDeferred.resolve();
          }, searchTimeout);
        } else {
          that._valueChangeDeferred.resolve();
        }
      }
    }, userEditorOptions);
  },
  _getAriaTarget() {
    if (this.option('searchEnabled')) {
      return this._itemContainer(true);
    }
    return this.callBase();
  },
  _focusTarget() {
    if (this.option('searchEnabled')) {
      return this._itemContainer(true);
    }
    return this.callBase();
  },
  _updateFocusState(e, isFocused) {
    if (this.option('searchEnabled')) {
      this._toggleFocusClass(isFocused, this.$element());
    }
    this.callBase(e, isFocused);
  },
  getOperationBySearchMode(searchMode) {
    return searchMode === 'equals' ? '=' : searchMode;
  },
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
          this._dataSource.searchOperation(this.getOperationBySearchMode(args.value));
        } else {
          this._dataSource[args.name](args.value);
        }
        this._dataSource.load();
        break;
      case 'searchTimeout':
        break;
      default:
        this.callBase(args);
    }
  },
  focus() {
    if (!this.option('focusedElement') && this.option('searchEnabled')) {
      this._searchEditor && this._searchEditor.focus();
      return;
    }
    this.callBase();
  },
  _cleanAria() {
    const $element = this.$element();
    this.setAria({
      role: null,
      activedescendant: null
    }, $element);
    $element.attr('tabIndex', null);
  },
  _clean() {
    this.callBase();
    this._cleanAria();
  },
  _refresh() {
    if (this._valueChangeDeferred) {
      this._valueChangeDeferred.resolve();
    }
    this.callBase();
  },
  setEditorClass(value) {
    EditorClass = value;
  }
};
