/**
* DevExtreme (cjs/__internal/ui/collection/collection_widget.edit.js)
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
exports.indexExists = exports.default = exports.NOT_EXISTING_INDEX = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _data_source = require("../../../common/data/data_source/data_source");
var _utils = require("../../../common/data/data_source/utils");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _data = require("../../../core/utils/data");
var _deferred = require("../../../core/utils/deferred");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _collection_widget = _interopRequireDefault(require("../../ui/collection/collection_widget.base"));
var _collection_widgetEditStrategy = _interopRequireDefault(require("../../ui/collection/collection_widget.edit.strategy.plain"));
var _selection = _interopRequireDefault(require("../../ui/selection/selection"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ITEM_DELETING_DATA_KEY = 'dxItemDeleting';
const SELECTED_ITEM_CLASS = 'dx-item-selected';
const NOT_EXISTING_INDEX = exports.NOT_EXISTING_INDEX = -1;
const indexExists = index => index !== NOT_EXISTING_INDEX;
exports.indexExists = indexExists;
class CollectionWidget extends _collection_widget.default {
  constructor(element, options) {
    CollectionWidget._userOptions = options ?? {};
    // @ts-expect-error
    super(element, options);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    // @ts-expect-error
    this._optionsByReference.selectedItem = true;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      selectionMode: 'none',
      selectionRequired: false,
      selectByClick: true,
      selectedItems: [],
      selectedItemKeys: [],
      maxFilterLengthInRequest: 1500,
      keyExpr: null,
      selectedIndex: NOT_EXISTING_INDEX,
      focusOnSelectedItem: true,
      selectedItem: null,
      onSelectionChanging: null,
      onSelectionChanged: null,
      onItemReordered: null,
      onItemDeleting: null,
      onItemDeleted: null
    });
  }
  _init() {
    this._initEditStrategy();
    super._init();
    this._initKeyGetter();
    this._initActions();
    this._initSelectionModule();
  }
  _initKeyGetter() {
    const {
      keyExpr
    } = this.option();
    // @ts-expect-error compileGetter
    this._keyGetter = (0, _data.compileGetter)(keyExpr);
  }
  _selectedItemClass() {
    return SELECTED_ITEM_CLASS;
  }
  _getActionsList() {
    return ['onSelectionChanging', 'onSelectionChanged'];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    actions.forEach(action => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ['disabled', 'readOnly']
      }) ?? _common.noop;
    });
  }
  _getKeysByItems(selectedItems) {
    return this._editStrategy.getKeysByItems(selectedItems);
  }
  _getItemsByKeys(selectedItemKeys, selectedItems) {
    return this._editStrategy.getItemsByKeys(selectedItemKeys, selectedItems);
  }
  _getKeyByIndex(index) {
    return this._editStrategy.getKeyByIndex(index);
  }
  _getIndexByKey(key) {
    return this._editStrategy.getIndexByKey(key);
  }
  _getIndexByItemData(itemData) {
    return this._editStrategy.getIndexByItemData(itemData);
  }
  _isKeySpecified() {
    return !!this._dataController.key();
  }
  _getCombinedFilter() {
    // @ts-expect-error arguments
    return this._dataController.filter();
  }
  key() {
    const {
      keyExpr
    } = this.option();
    if (keyExpr) {
      return keyExpr;
    }
    return this._dataController.key();
  }
  keyOf(item) {
    const {
      keyExpr
    } = this.option();
    if (keyExpr) {
      return this._keyGetter(item);
    }
    if (this._dataController.store()) {
      return this._dataController.keyOf(item);
    }
    return item;
  }
  _nullValueSelectionSupported() {
    return false;
  }
  _initSelectionModule() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const {
      itemsGetter
    } = this._editStrategy;
    const {
      selectionMode,
      maxFilterLengthInRequest
    } = this.option();
    // @ts-expect-error TItem
    this._selection = new _selection.default({
      allowNullValue: this._nullValueSelectionSupported(),
      mode: selectionMode,
      maxFilterLengthInRequest,
      equalByReference: !this._isKeySpecified(),
      onSelectionChanging: args => {
        var _this$_actions$onSele, _this$_actions;
        const isSelectionChanged = args.addedItemKeys.length || args.removedItemKeys.length;
        if (!this._rendered || !isSelectionChanged) {
          return;
        }
        const selectionChangingArgs = {
          removedItems: args.removedItems,
          addedItems: args.addedItems,
          cancel: false
        };
        (_this$_actions$onSele = (_this$_actions = this._actions).onSelectionChanging) === null || _this$_actions$onSele === void 0 || _this$_actions$onSele.call(_this$_actions, selectionChangingArgs);
        args.cancel = selectionChangingArgs.cancel;
      },
      onSelectionChanged: args => {
        if (args.addedItemKeys.length || args.removedItemKeys.length) {
          this.option('selectedItems', this._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
          this._updateSelectedItems(args);
        }
      },
      filter: this._getCombinedFilter.bind(this),
      totalCount: () => {
        const {
          items = []
        } = this.option();
        const totalCount = this._dataController.totalCount();
        return totalCount >= 0 ? totalCount : this._getItemsCount(items);
      },
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this),
      load(options) {
        var _dataController$loadO;
        const dataController = that._dataController;
        options.customQueryParams = (_dataController$loadO = dataController.loadOptions()) === null || _dataController$loadO === void 0 ? void 0 : _dataController$loadO.customQueryParams;
        options.userData = dataController.userData();
        if (dataController.store()) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return dataController.loadFromStore(options).done(loadResult => {
            if (that._disposed) {
              return;
            }
            // @ts-expect-error arguments
            const items = (0, _utils.normalizeLoadResult)(loadResult).data;
            dataController.applyMapFunction(items);
          });
        }
        return (0, _deferred.Deferred)().resolve(this.plainItems());
      },
      // eslint-disable-next-line @stylistic/max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/explicit-function-return-type
      dataFields: () => this._dataController.select(),
      plainItems: itemsGetter.bind(this._editStrategy)
    });
  }
  _getItemsCount(items) {
    return items.reduce((itemsCount, item) => {
      // @ts-expect-error subItems
      const subItemsCount = item.items ? this._getItemsCount(item.items) : 1;
      return itemsCount + subItemsCount;
    }, 0);
  }
  _initEditStrategy() {
    this._editStrategy = new _collection_widgetEditStrategy.default(this);
  }
  _getSelectedItemIndices(keys) {
    const indices = [];
    const selectedKeys = keys ?? this._selection.getSelectedItemKeys();
    this._editStrategy.beginCache();
    (0, _iterator.each)(selectedKeys, (_, key) => {
      const selectedIndex = this._getIndexByKey(key);
      if (indexExists(selectedIndex)) {
        indices.push(selectedIndex);
      }
    });
    this._editStrategy.endCache();
    return indices;
  }
  _initMarkup() {
    this._rendering = true;
    if (!this._dataController.isLoading()) {
      this._syncSelectionOptions().done(() => {
        this._normalizeSelectedItems();
      });
    }
    super._initMarkup();
  }
  _render() {
    super._render();
    this._rendering = false;
  }
  _fireContentReadyAction() {
    this._rendering = false;
    this._rendered = true;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    super._fireContentReadyAction();
  }
  _syncSelectionOptions(byOption) {
    const selectedByOption = byOption ?? this._chooseSelectOption();
    // eslint-disable-next-line default-case
    switch (selectedByOption) {
      case 'selectedIndex':
        {
          const {
            selectedIndex
          } = this.option();
          const selectedItem = this._editStrategy.getItemDataByIndex(selectedIndex ?? NOT_EXISTING_INDEX);
          if ((0, _type.isDefined)(selectedItem)) {
            this._setOptionWithoutOptionChange('selectedItems', [selectedItem]);
            this._setOptionWithoutOptionChange('selectedItem', selectedItem);
            this._setOptionWithoutOptionChange('selectedItemKeys', this._editStrategy.getKeysByItems([selectedItem]));
          } else {
            this._setOptionWithoutOptionChange('selectedItems', []);
            this._setOptionWithoutOptionChange('selectedItemKeys', []);
            this._setOptionWithoutOptionChange('selectedItem', null);
          }
          break;
        }
      case 'selectedItems':
        {
          const {
            selectedItems = [],
            selectionRequired
          } = this.option();
          const selectedIndex = selectedItems.length ? this._editStrategy.getIndexByItemData(selectedItems[0]) : NOT_EXISTING_INDEX;
          if (selectionRequired && !indexExists(selectedIndex)) {
            return this._syncSelectionOptions('selectedIndex');
          }
          this._setOptionWithoutOptionChange('selectedItem', selectedItems[0]);
          this._setOptionWithoutOptionChange('selectedIndex', selectedIndex);
          this._setOptionWithoutOptionChange('selectedItemKeys', this._editStrategy.getKeysByItems(selectedItems));
          break;
        }
      case 'selectedItem':
        {
          const {
            selectedItem,
            selectionRequired
          } = this.option();
          // @ts-expect-error
          const selectedIndex = this._editStrategy.getIndexByItemData(selectedItem);
          if (selectionRequired && !indexExists(selectedIndex)) {
            return this._syncSelectionOptions('selectedIndex');
          }
          if ((0, _type.isDefined)(selectedItem)) {
            this._setOptionWithoutOptionChange('selectedItems', [selectedItem]);
            this._setOptionWithoutOptionChange('selectedIndex', selectedIndex);
            this._setOptionWithoutOptionChange('selectedItemKeys', this._editStrategy.getKeysByItems([selectedItem]));
          } else {
            this._setOptionWithoutOptionChange('selectedItems', []);
            this._setOptionWithoutOptionChange('selectedItemKeys', []);
            this._setOptionWithoutOptionChange('selectedIndex', NOT_EXISTING_INDEX);
          }
          break;
        }
      case 'selectedItemKeys':
        {
          const {
            selectedItemKeys = [],
            selectionRequired
          } = this.option();
          if (selectionRequired) {
            const selectedItemIndex = this._getIndexByKey(selectedItemKeys[0]);
            if (!indexExists(selectedItemIndex)) {
              return this._syncSelectionOptions('selectedIndex');
            }
          }
          return this._selection.setSelection(selectedItemKeys);
        }
    }
    return (0, _deferred.Deferred)().resolve();
  }
  _chooseSelectOption() {
    let optionName = 'selectedIndex';
    const isOptionDefined = name => {
      const {
        [name]: optionValue
      } = this.option();
      const length = (0, _type.isDefined)(optionValue) && Array.isArray(optionValue) && optionValue.length;
      return !!length || name in CollectionWidget._userOptions;
    };
    if (isOptionDefined('selectedItems')) {
      optionName = 'selectedItems';
    } else if (isOptionDefined('selectedItem')) {
      optionName = 'selectedItem';
    } else if (isOptionDefined('selectedItemKeys')) {
      optionName = 'selectedItemKeys';
    }
    return optionName;
  }
  _compareKeys(oldKeys, newKeys) {
    if (oldKeys.length !== newKeys.length) {
      return false;
    }
    for (let i = 0; i < newKeys.length; i += 1) {
      if (oldKeys[i] !== newKeys[i]) {
        return false;
      }
    }
    return true;
  }
  _normalizeSelectedItems() {
    const {
      selectionMode,
      selectedItems = [],
      items
    } = this.option();
    if (selectionMode === 'none') {
      this._setOptionWithoutOptionChange('selectedItems', []);
      this._syncSelectionOptions('selectedItems');
    } else if (selectionMode === 'single') {
      const newSelection = selectedItems ?? [];
      const {
        selectionRequired
      } = this.option();
      if (newSelection.length > 1 || !newSelection.length && selectionRequired && items !== null && items !== void 0 && items.length) {
        const currentSelection = this._selection.getSelectedItems();
        let normalizedSelection = newSelection[0] ?? currentSelection[0];
        if (normalizedSelection === undefined) {
          // eslint-disable-next-line prefer-destructuring
          normalizedSelection = this._editStrategy.itemsGetter()[0];
        }
        const {
          grouped
        } = this.option();
        const hasSubItems = item => (0, _type.isObject)(item) && 'items' in item && Array.isArray(item.items);
        if (grouped && hasSubItems(normalizedSelection)) {
          normalizedSelection.items = [normalizedSelection.items[0]];
        }
        this._selection.setSelection(this._getKeysByItems([normalizedSelection]));
        this._setOptionWithoutOptionChange('selectedItems', [normalizedSelection]);
        return this._syncSelectionOptions('selectedItems');
      }
      this._selection.setSelection(this._getKeysByItems(newSelection));
    } else {
      const newKeys = this._getKeysByItems(selectedItems);
      const oldKeys = this._selection.getSelectedItemKeys();
      if (!this._compareKeys(oldKeys, newKeys)) {
        this._selection.setSelection(newKeys);
      }
    }
    return (0, _deferred.Deferred)().resolve();
  }
  _itemClickHandler(e, args, config) {
    let itemSelectPromise = (0, _deferred.Deferred)().resolve();
    this._createAction(event => {
      itemSelectPromise = this._itemSelectHandler(event.event) ?? itemSelectPromise;
    }, {
      validatingTargetName: 'itemElement'
    })({
      itemElement: (0, _renderer.default)(e.currentTarget),
      event: e
    });
    itemSelectPromise.always(() => {
      super._itemClickHandler(e, args, config);
    });
  }
  _itemSelectHandler(e, shouldIgnoreSelectByClick) {
    const {
      selectByClick
    } = this.option();
    if (!shouldIgnoreSelectByClick && !selectByClick) {
      return;
    }
    const $itemElement = e.currentTarget;
    if (this.isItemSelected($itemElement)) {
      this.unselectItem(e.currentTarget);
    } else {
      const itemSelectPromise = this.selectItem(e.currentTarget);
      // @ts-expect-error Promise DefferedObj
      // eslint-disable-next-line consistent-return
      return itemSelectPromise === null || itemSelectPromise === void 0 ? void 0 : itemSelectPromise.promise();
    }
  }
  _selectedItemElement(index) {
    return this._itemElements().eq(index);
  }
  _postprocessRenderItem(args) {
    const {
      selectionMode
    } = this.option();
    if (selectionMode !== 'none') {
      const $itemElement = (0, _renderer.default)(args.itemElement);
      const normalizedItemIndex = this._editStrategy.getNormalizedIndex($itemElement.get(0));
      const isItemSelected = this._isItemSelected(normalizedItemIndex);
      this._processSelectableItem($itemElement, isItemSelected);
    }
  }
  _processSelectableItem($itemElement, isSelected) {
    $itemElement.toggleClass(this._selectedItemClass(), isSelected);
    this._setAriaSelectionAttribute($itemElement, String(isSelected));
  }
  _updateSelectedItems(args) {
    const {
      addedItemKeys,
      removedItemKeys
    } = args;
    if (this._rendered && (addedItemKeys.length || removedItemKeys.length)) {
      if (!this._rendering) {
        const addedSelection = [];
        const removedSelection = [];
        this._editStrategy.beginCache();
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < addedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(addedItemKeys[i]);
          addedSelection.push(normalizedIndex);
          this._addSelection(normalizedIndex);
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < removedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(removedItemKeys[i]);
          removedSelection.push(normalizedIndex);
          this._removeSelection(normalizedIndex);
        }
        this._editStrategy.endCache();
        this._updateSelection(addedSelection, removedSelection);
      }
      this._actions.onSelectionChanged({
        addedItems: args.addedItems,
        removedItems: args.removedItems
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateSelection(addedSelection, removedSelection) {}
  _setAriaSelectionAttribute($target, value) {
    this.setAria('selected', value, $target);
  }
  _getFocusedElementIndex() {
    const {
      focusOnSelectedItem
    } = this.option();
    return focusOnSelectedItem ? this._getFlatIndex() : super._getFocusedElementIndex();
  }
  _getFlatIndex() {
    const {
      selectedIndex = NOT_EXISTING_INDEX
    } = this.option();
    return selectedIndex;
  }
  _removeSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, false);
      // @ts-expect-error arguments
      _events_engine.default.triggerHandler($itemElement, 'stateChanged', false);
    }
  }
  _addSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, true);
      // @ts-expect-error arguments
      _events_engine.default.triggerHandler($itemElement, 'stateChanged', true);
    }
  }
  _isItemSelected(index) {
    const key = this._getKeyByIndex(index);
    return this._selection.isItemSelected(key, {
      checkPending: true
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'selectionMode':
        this._invalidate();
        break;
      case 'dataSource':
        if (!args.value || Array.isArray(args.value) && !args.value.length) {
          this.option('selectedItemKeys', []);
        }
        super._optionChanged(args);
        break;
      case 'selectedIndex':
      case 'selectedItem':
      case 'selectedItems':
      case 'selectedItemKeys':
        this._syncSelectionOptions(args.name).done(() => {
          this._normalizeSelectedItems();
        });
        break;
      case 'keyExpr':
        this._initKeyGetter();
        break;
      case 'selectionRequired':
        this._normalizeSelectedItems();
        break;
      case 'onSelectionChanging':
      case 'onSelectionChanged':
        this._initActions();
        break;
      case 'selectByClick':
      case 'onItemDeleting':
      case 'onItemDeleted':
      case 'onItemReordered':
      case 'maxFilterLengthInRequest':
        break;
      case 'focusOnSelectedItem':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clearSelectedItems() {
    this._setOptionWithoutOptionChange('selectedItems', []);
    this._syncSelectionOptions('selectedItems');
  }
  _waitDeletingPrepare($itemElement) {
    if ($itemElement.data(ITEM_DELETING_DATA_KEY)) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    $itemElement.data(ITEM_DELETING_DATA_KEY, true);
    const deferred = (0, _deferred.Deferred)();
    const deletingActionArgs = {
      cancel: false
    };
    const deletePromise = this._itemEventHandler($itemElement, 'onItemDeleting', deletingActionArgs, {
      excludeValidators: ['disabled', 'readOnly']
    });
    // eslint-disable-next-line func-names
    (0, _deferred.when)(deletePromise).always(function (value) {
      // @ts-expect-error ts-error
      const deletePromiseExists = !deletePromise;
      // @ts-expect-error ts-error
      const deletePromiseResolved = !deletePromiseExists && deletePromise.state() === 'resolved';
      const argumentsSpecified = !!arguments.length;
      const shouldDeleteImmediately = deletePromiseExists;
      const shouldDeleteWhenNoArgs = deletePromiseResolved && !argumentsSpecified;
      const shouldDeleteWithValue = deletePromiseResolved && value;
      const shouldDelete = shouldDeleteImmediately || shouldDeleteWhenNoArgs || shouldDeleteWithValue;
      (0, _deferred.when)((0, _deferred.fromPromise)(deletingActionArgs.cancel)).always(() => {
        $itemElement.data(ITEM_DELETING_DATA_KEY, false);
      }).done(cancel => {
        if (shouldDelete && !cancel) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .fail(deferred.reject);
    });
    return deferred.promise();
  }
  _deleteItemFromDS($item) {
    const dataController = this._dataController;
    const deferred = (0, _deferred.Deferred)();
    const {
      disabled
    } = this.option();
    const dataStore = dataController.store();
    if (!dataStore) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    if (!dataStore.remove) {
      throw _ui.default.Error('E1011');
    }
    this.option('disabled', true);
    dataStore.remove(dataController.keyOf(this._getItemData($item))).done(key => {
      if (key !== undefined) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).fail(() => {
      deferred.reject();
    });
    deferred.always(() => {
      this.option('disabled', disabled);
    });
    return deferred;
  }
  _tryRefreshLastPage() {
    const deferred = (0, _deferred.Deferred)();
    const {
      grouped
    } = this.option();
    // @ts-expect-error mixin method
    if (this._isLastPage() || grouped) {
      deferred.resolve();
    } else {
      this._refreshLastPage().done(() => {
        deferred.resolve();
      });
    }
    return deferred.promise();
  }
  _refreshLastPage() {
    this._expectLastItemLoading();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._dataController.load();
  }
  _updateSelectionAfterDelete(index) {
    const key = this._getKeyByIndex(index);
    this._selection.deselect([key]);
  }
  _updateIndicesAfterIndex(index) {
    const itemElements = this._itemElements();
    for (let i = index + 1; i < itemElements.length; i += 1) {
      (0, _renderer.default)(itemElements[i]).data(this._itemIndexKey(), i - 1);
    }
  }
  _simulateOptionChange(optionName) {
    var _this$_optionChangedA;
    const optionValue = this.option(optionName);
    if (optionValue instanceof _data_source.DataSource) {
      return;
    }
    (_this$_optionChangedA = this._optionChangedAction) === null || _this$_optionChangedA === void 0 || _this$_optionChangedA.call(this, {
      name: optionName,
      fullName: optionName,
      value: optionValue
    });
  }
  isItemSelected(itemElement) {
    return this._isItemSelected(this._editStrategy.getNormalizedIndex(itemElement));
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  selectItem(itemElement) {
    const {
      selectionMode
    } = this.option();
    if (selectionMode === 'none') return (0, _deferred.Deferred)().resolve();
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return (0, _deferred.Deferred)().resolve();
    }
    const key = this._getKeyByIndex(itemIndex);
    if (this._selection.isItemSelected(key)) {
      return (0, _deferred.Deferred)().resolve();
    }
    if (selectionMode === 'single') {
      return this._selection.setSelection([key]);
    }
    const {
      selectedItemKeys
    } = this.option();
    return this._selection.setSelection([...(selectedItemKeys ?? []), key], [key]);
  }
  unselectItem(itemElement) {
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return;
    }
    const selectedItemKeys = this._selection.getSelectedItemKeys();
    const {
      selectionRequired
    } = this.option();
    if (selectionRequired && selectedItemKeys.length <= 1) {
      return;
    }
    const key = this._getKeyByIndex(itemIndex);
    if (!this._selection.isItemSelected(key, {
      checkPending: true
    })) {
      return;
    }
    this._selection.deselect([key]);
  }
  _deleteItemElementByIndex(index) {
    this._updateSelectionAfterDelete(index);
    this._updateIndicesAfterIndex(index);
    this._editStrategy.deleteItemAtIndex(index);
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    const changingOption = this._dataController.getDataSource() ? 'dataSource' : 'items';
    this._simulateOptionChange(changingOption);
    this._itemEventHandler($item, 'onItemDeleted', deletedActionArgs, {
      beforeExecute() {
        $item.remove();
      },
      excludeValidators: ['disabled', 'readOnly']
    });
    this._renderEmptyMessage();
  }
  deleteItem(itemElement) {
    const deferred = (0, _deferred.Deferred)();
    const $item = this._editStrategy.getItemElement(itemElement);
    const index = this._editStrategy.getNormalizedIndex(itemElement);
    const itemResponseWaitClass = this._itemResponseWaitClass();
    if (indexExists(index)) {
      // @ts-expect-error Promise DefferedObj
      this._waitDeletingPrepare($item).done(() => {
        $item.addClass(itemResponseWaitClass);
        const deletedActionArgs = this._extendActionArgs($item);
        // @ts-expect-error Promise DefferedObj
        this._deleteItemFromDS($item).done(() => {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($item, deletedActionArgs);
          // @ts-expect-error Promise DefferedObj
          this._tryRefreshLastPage().done(() => {
            // @ts-expect-error ts-error
            deferred.resolveWith(this);
          });
        }).fail(() => {
          $item.removeClass(itemResponseWaitClass);
          // @ts-expect-error ts-error
          deferred.rejectWith(this);
        });
      }).fail(() => {
        // @ts-expect-error ts-error
        deferred.rejectWith(this);
      });
    } else {
      // @ts-expect-error ts-error
      deferred.rejectWith(this);
    }
    return deferred.promise();
  }
  reorderItem(itemElement, toItemElement) {
    const deferred = (0, _deferred.Deferred)();
    const strategy = this._editStrategy;
    const $movingItem = strategy.getItemElement(itemElement);
    const $destinationItem = strategy.getItemElement(toItemElement);
    const movingIndex = strategy.getNormalizedIndex(itemElement);
    const destinationIndex = strategy.getNormalizedIndex(toItemElement);
    const changingOption = this._dataController.getDataSource() ? 'dataSource' : 'items';
    const canMoveItems = indexExists(movingIndex) && indexExists(destinationIndex) && movingIndex !== destinationIndex;
    if (canMoveItems) {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    } else {
      // @ts-expect-error ts-error
      deferred.rejectWith(this);
    }
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deferred.promise().done(() => {
      $destinationItem[strategy.itemPlacementFunc(movingIndex, destinationIndex)]($movingItem);
      strategy.moveItemAtIndexToIndex(movingIndex, destinationIndex);
      this._updateIndicesAfterIndex(movingIndex);
      this.option('selectedItems', this._getItemsByKeys(this._selection.getSelectedItemKeys(), this._selection.getSelectedItems()));
      if (changingOption === 'items') {
        this._simulateOptionChange(changingOption);
      }
      this._itemEventHandler($movingItem, 'onItemReordered', {
        fromIndex: strategy.getIndex(movingIndex),
        toIndex: strategy.getIndex(destinationIndex)
      }, {
        excludeValidators: ['disabled', 'readOnly']
      });
    });
  }
}
CollectionWidget._userOptions = {};
var _default = exports.default = CollectionWidget;
