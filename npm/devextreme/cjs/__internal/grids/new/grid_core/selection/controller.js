/**
* DevExtreme (cjs/__internal/grids/new/grid_core/selection/controller.js)
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
exports.SelectionController = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _index = require("../../../../core/state_manager/index");
var _index2 = require("../../../../grids/new/grid_core/data_controller/index");
var _index3 = require("../../../../grids/new/grid_core/options_validation/index");
var _const = require("../../../../grids/new/grid_core/selection/const");
var _selection = _interopRequireDefault(require("../../../../ui/selection/selection"));
var _items_controller = require("../items_controller/items_controller");
var _options_controller = require("../options_controller/options_controller");
var _controller = require("../toolbar/controller");
var _const2 = require("./const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/explicit-function-return-type */
class SelectionController {
  constructor(options, dataController, itemsController, toolbarController, optionsValidationController) {
    this.options = options;
    this.dataController = dataController;
    this.itemsController = itemsController;
    this.toolbarController = toolbarController;
    this.optionsValidationController = optionsValidationController;
    this.selectedCardKeys = this.options.twoWay('selectedCardKeys');
    // Note: moved option validation logic to computed to make it execute before other effects
    this.normalizedSelectedCardKeys = (0, _index.computed)(() => {
      const selectedCardKeys = this.selectedCardKeys.value;
      const isSelectionEnabled = this.selectionOption.value.mode !== _const2.SelectionMode.None;
      if (isSelectionEnabled && Array.isArray(selectedCardKeys) && selectedCardKeys.length) {
        this.optionsValidationController.validateKeyExpr();
      }
      return this.selectedCardKeys.value;
    });
    this.selectionOption = this.options.oneWay('selection');
    this._isCheckBoxesRendered = (0, _index.signal)(false);
    this.onSelectionChanging = this.options.action('onSelectionChanging');
    this.onSelectionChanged = this.options.action('onSelectionChanged');
    this.isCheckBoxesRendered = (0, _index.computed)(() => {
      const selectionMode = this.options.oneWay('selection.mode').value;
      const showCheckBoxesMode = this.options.oneWay('selection.showCheckBoxesMode').value;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _isCheckBoxesRendered = this._isCheckBoxesRendered.value;
      if (selectionMode === _const2.SelectionMode.Multiple) {
        switch (showCheckBoxesMode) {
          case _const.ShowCheckBoxesMode.Always:
          case _const.ShowCheckBoxesMode.OnClick:
            return true;
          case _const.ShowCheckBoxesMode.OnLongTap:
            return _isCheckBoxesRendered;
          default:
            return false;
        }
      }
      return false;
    });
    this._isCheckBoxesVisible = (0, _index.signal)(false);
    this.isCheckBoxesVisible = (0, _index.computed)(() => {
      const {
        mode,
        showCheckBoxesMode
      } = this.selectionOption.value;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _isCheckBoxesVisible = this._isCheckBoxesVisible.value;
      if (mode === _const2.SelectionMode.Multiple) {
        return showCheckBoxesMode !== _const.ShowCheckBoxesMode.OnClick || _isCheckBoxesVisible;
      }
      return false;
    });
    this.needToHiddenCheckBoxes = (0, _index.computed)(() => {
      const {
        mode,
        showCheckBoxesMode
      } = this.selectionOption.value;
      const isCheckBoxesVisible = this.isCheckBoxesVisible.value;
      if (mode === _const2.SelectionMode.Multiple && showCheckBoxesMode === _const.ShowCheckBoxesMode.OnClick) {
        return !isCheckBoxesVisible;
      }
      return false;
    });
    this.allowSelectOnClick = (0, _index.computed)(() => {
      const {
        mode,
        showCheckBoxesMode
      } = this.selectionOption.value;
      return mode !== _const2.SelectionMode.Multiple || showCheckBoxesMode !== _const.ShowCheckBoxesMode.Always;
    });
    this.needToAddSelectionButtons = (0, _index.computed)(() => {
      const selectionMode = this.options.oneWay('selection.mode').value;
      const allowSelectAll = this.options.oneWay('selection.allowSelectAll').value;
      return selectionMode === _const2.SelectionMode.Multiple && allowSelectAll;
    });
    this.selectionHelper = (0, _index.computed)(() => {
      const dataSource = this.dataController.dataSource.value;
      const selectionOption = this.selectionOption.value;
      if (selectionOption.mode === _const2.SelectionMode.None) {
        return undefined;
      }
      const selectionConfig = this.getSelectionConfig(dataSource, selectionOption);
      return new _selection.default(selectionConfig);
    });
    (0, _index.effect)(() => {
      const selectedCardKeys = this.normalizedSelectedCardKeys.value;
      const selectionOption = this.selectionOption.value;
      if (selectionOption.mode !== _const2.SelectionMode.None) {
        this.itemsController.setSelectionState(selectedCardKeys);
        if (selectedCardKeys.length > 1) {
          this._isCheckBoxesVisible.value = true;
        } else if (selectedCardKeys.length === 0) {
          this._isCheckBoxesVisible.value = false;
        }
      }
    });
    (0, _index.effect)(() => {
      const isLoaded = this.dataController.isLoaded.value;
      if (isLoaded) {
        const selectedCardKeys = this.selectedCardKeys.peek();
        this.selectCards(selectedCardKeys);
      }
    });
    (0, _index.effect)(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.dataController.items.value;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.dataController.isLoaded.value;
      this.updateSelectionToolbarButtons(this.normalizedSelectedCardKeys.value);
    });
  }
  getSelectionConfig(dataSource, selectionOption) {
    const selectedCardKeys = this.selectedCardKeys.peek();
    const {
      dataController
    } = this;
    return {
      selectedKeys: selectedCardKeys,
      mode: selectionOption.mode,
      maxFilterLengthInRequest: selectionOption.maxFilterLengthInRequest,
      ignoreDisabledItems: true,
      key() {
        return dataSource.key();
      },
      keyOf(item) {
        return dataSource.store().keyOf(item);
      },
      dataFields() {
        return dataSource.select();
      },
      load(options) {
        return dataSource.store().load(options);
      },
      plainItems() {
        return dataSource.items();
      },
      filter() {
        return dataController.getCombinedFilter();
      },
      totalCount: () => dataSource.totalCount(),
      onSelectionChanging: this.selectionChanging.bind(this),
      onSelectionChanged: this.selectionChanged.bind(this)
    };
  }
  getSelectionEventArgs(e) {
    return {
      currentSelectedCardKeys: [...e.addedItemKeys],
      currentDeselectedCardKeys: [...e.removedItemKeys],
      selectedCardKeys: [...e.selectedItemKeys],
      selectedCardsData: [...e.selectedItems],
      isSelectAll: false,
      isDeselectAll: false
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectionChanging(e) {
    if (e.addedItemKeys.length || e.removedItemKeys.length) {
      const onSelectionChanging = this.onSelectionChanging.peek();
      const eventArgs = _extends({}, this.getSelectionEventArgs(e), {
        cancel: false
      });
      // @ts-expect-error
      onSelectionChanging === null || onSelectionChanging === void 0 || onSelectionChanging(eventArgs);
      e.cancel = eventArgs.cancel;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectionChanged(e) {
    if (e.addedItemKeys.length || e.removedItemKeys.length) {
      this.optionsValidationController.validateKeyExpr();
      const onSelectionChanged = this.onSelectionChanged.peek();
      const eventArgs = this.getSelectionEventArgs(e);
      this.selectedCardKeys.value = [...e.selectedItemKeys];
      // @ts-expect-error
      onSelectionChanged === null || onSelectionChanged === void 0 || onSelectionChanged(eventArgs);
    }
  }
  isOnePageSelectAll() {
    const selectionOption = this.selectionOption.peek();
    return (selectionOption === null || selectionOption === void 0 ? void 0 : selectionOption.selectAllMode) === 'page';
  }
  isSelectAll() {
    const selectionHelper = this.selectionHelper.peek();
    return selectionHelper === null || selectionHelper === void 0 ? void 0 : selectionHelper.getSelectAllState(this.isOnePageSelectAll());
  }
  updateSelectionToolbarButtons(selectedCardKeys) {
    const isSelectAll = this.isSelectAll();
    const isOnePageSelectAll = this.isOnePageSelectAll();
    this.toolbarController.addDefaultItem((0, _index.signal)({
      name: 'selectAllButton',
      widget: 'dxButton',
      options: {
        icon: 'selectall',
        onClick: () => {
          this.selectAll();
        },
        disabled: !!isSelectAll,
        text: _message.default.format('dxCardView-selectAll')
      },
      location: 'before',
      locateInMenu: 'auto'
    }), this.needToAddSelectionButtons);
    this.toolbarController.addDefaultItem((0, _index.signal)({
      name: 'clearSelectionButton',
      widget: 'dxButton',
      options: {
        icon: 'close',
        onClick: () => {
          this.deselectAll();
        },
        disabled: isOnePageSelectAll ? isSelectAll === false : selectedCardKeys.length === 0,
        text: _message.default.format('dxCardView-clearSelection')
      },
      location: 'before',
      locateInMenu: 'auto'
    }), this.needToAddSelectionButtons);
  }
  getItemKeysByIndexes(indexes) {
    const items = this.itemsController.items.peek();
    return indexes.map(index => {
      var _items$index;
      return (_items$index = items[index]) === null || _items$index === void 0 ? void 0 : _items$index.key;
    }).filter(key => key !== undefined);
  }
  changeCardSelection(cardIndex, options) {
    var _this$selectionHelper;
    const selectionHelper = (_this$selectionHelper = this.selectionHelper) === null || _this$selectionHelper === void 0 ? void 0 : _this$selectionHelper.peek();
    const isCheckBoxesVisible = this.isCheckBoxesVisible.peek();
    const keys = options ?? {};
    if (isCheckBoxesVisible) {
      keys.control = isCheckBoxesVisible;
    }
    selectionHelper === null || selectionHelper === void 0 || selectionHelper.changeItemSelection(cardIndex, keys, false);
  }
  selectCards(keys) {
    var _this$selectionHelper2;
    let preserve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const selectionHelper = (_this$selectionHelper2 = this.selectionHelper) === null || _this$selectionHelper2 === void 0 ? void 0 : _this$selectionHelper2.peek();
    return selectionHelper === null || selectionHelper === void 0 ? void 0 : selectionHelper.selectedItemKeys(keys, preserve);
  }
  selectCardsByIndexes(indexes) {
    const keys = this.getItemKeysByIndexes(indexes);
    return this.selectCards(keys);
  }
  deselectCards(keys) {
    var _this$selectionHelper3;
    const selectionHelper = (_this$selectionHelper3 = this.selectionHelper) === null || _this$selectionHelper3 === void 0 ? void 0 : _this$selectionHelper3.peek();
    return selectionHelper === null || selectionHelper === void 0 ? void 0 : selectionHelper.selectedItemKeys(keys, true, true);
  }
  deselectCardsByIndexes(indexes) {
    const keys = this.getItemKeysByIndexes(indexes);
    return this.deselectCards(keys);
  }
  isCardSelected(key) {
    const selectedCardKeys = this.normalizedSelectedCardKeys.peek();
    return selectedCardKeys.includes(key);
  }
  selectAll() {
    const {
      mode
    } = this.selectionOption.peek();
    if (mode !== _const2.SelectionMode.Multiple) {
      return undefined;
    }
    const selectionHelper = this.selectionHelper.peek();
    return selectionHelper === null || selectionHelper === void 0 ? void 0 : selectionHelper.selectAll(this.isOnePageSelectAll());
  }
  deselectAll() {
    const selectionHelper = this.selectionHelper.peek();
    return selectionHelper === null || selectionHelper === void 0 ? void 0 : selectionHelper.deselectAll(this.isOnePageSelectAll());
  }
  clearSelection() {
    const selectionHelper = this.selectionHelper.peek();
    return selectionHelper === null || selectionHelper === void 0 ? void 0 : selectionHelper.clearSelection();
  }
  getSelectedCardsData() {
    var _this$selectionHelper4;
    // @ts-expect-error undefined is not assignable to DataObject[]
    return (_this$selectionHelper4 = this.selectionHelper) === null || _this$selectionHelper4 === void 0 || (_this$selectionHelper4 = _this$selectionHelper4.peek()) === null || _this$selectionHelper4 === void 0 ? void 0 : _this$selectionHelper4.getSelectedItems();
  }
  getSelectedCardKeys() {
    return this.normalizedSelectedCardKeys.peek();
  }
  toggleSelectionCheckBoxes() {
    const isCheckBoxesRendered = this._isCheckBoxesRendered.peek();
    this._isCheckBoxesRendered.value = !isCheckBoxesRendered;
  }
  updateSelectionCheckBoxesVisible(value) {
    this._isCheckBoxesVisible.value = value;
  }
  processLongTap(card) {
    const {
      mode,
      showCheckBoxesMode
    } = this.selectionOption.peek();
    if (mode !== _const2.SelectionMode.None) {
      if (showCheckBoxesMode === _const.ShowCheckBoxesMode.OnLongTap) {
        this.toggleSelectionCheckBoxes();
      } else {
        if (showCheckBoxesMode === _const.ShowCheckBoxesMode.OnClick) {
          this._isCheckBoxesVisible.value = true;
        }
        if (showCheckBoxesMode !== _const.ShowCheckBoxesMode.Always) {
          this.changeCardSelection(card.index, {
            control: true
          });
        }
      }
    }
  }
}
exports.SelectionController = SelectionController;
SelectionController.dependencies = [_options_controller.OptionsController, _index2.DataController, _items_controller.ItemsController, _controller.ToolbarController, _index3.OptionsValidationController];
