/**
* DevExtreme (esm/__internal/grids/new/grid_core/selection/controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import messageLocalization from '../../../../../localization/message';
import { computed, effect, signal } from '@preact/signals-core';
import { DataController } from '../../../../grids/new/grid_core/data_controller/index';
import { OptionsValidationController } from '../../../../grids/new/grid_core/options_validation/index';
import { ShowCheckBoxesMode } from '../../../../grids/new/grid_core/selection/const';
import Selection from '../../../../ui/selection/m_selection';
import { ItemsController } from '../items_controller/items_controller';
import { OptionsController } from '../options_controller/options_controller';
import { ToolbarController } from '../toolbar/controller';
import { SelectionMode } from './const';
export class SelectionController {
  constructor(options, dataController, itemsController, toolbarController, optionsValidationController) {
    this.options = options;
    this.dataController = dataController;
    this.itemsController = itemsController;
    this.toolbarController = toolbarController;
    this.optionsValidationController = optionsValidationController;
    this.selectedCardKeys = this.options.twoWay('selectedCardKeys');
    // Note: moved option validation logic to computed to make it execute before other effects
    this.normalizedSelectedCardKeys = computed(() => {
      const selectedCardKeys = this.selectedCardKeys.value;
      const isSelectionEnabled = this.selectionOption.value.mode !== SelectionMode.None;
      if (isSelectionEnabled && Array.isArray(selectedCardKeys) && selectedCardKeys.length) {
        this.optionsValidationController.validateKeyExpr();
      }
      return this.selectedCardKeys.value;
    });
    this.selectionOption = this.options.oneWay('selection');
    this._isCheckBoxesRendered = signal(false);
    this.onSelectionChanging = this.options.action('onSelectionChanging');
    this.onSelectionChanged = this.options.action('onSelectionChanged');
    this.isCheckBoxesRendered = computed(() => {
      const selectionMode = this.options.oneWay('selection.mode').value;
      const showCheckBoxesMode = this.options.oneWay('selection.showCheckBoxesMode').value;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _isCheckBoxesRendered = this._isCheckBoxesRendered.value;
      if (selectionMode === SelectionMode.Multiple) {
        switch (showCheckBoxesMode) {
          case ShowCheckBoxesMode.Always:
          case ShowCheckBoxesMode.OnClick:
            return true;
          case ShowCheckBoxesMode.OnLongTap:
            return _isCheckBoxesRendered;
          default:
            return false;
        }
      }
      return false;
    });
    this._isCheckBoxesVisible = signal(false);
    this.isCheckBoxesVisible = computed(() => {
      const {
        mode,
        showCheckBoxesMode
      } = this.selectionOption.value;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _isCheckBoxesVisible = this._isCheckBoxesVisible.value;
      if (mode === SelectionMode.Multiple) {
        return showCheckBoxesMode !== ShowCheckBoxesMode.OnClick || _isCheckBoxesVisible;
      }
      return false;
    });
    this.needToHiddenCheckBoxes = computed(() => {
      const {
        mode,
        showCheckBoxesMode
      } = this.selectionOption.value;
      const isCheckBoxesVisible = this.isCheckBoxesVisible.value;
      if (mode === SelectionMode.Multiple && showCheckBoxesMode === ShowCheckBoxesMode.OnClick) {
        return !isCheckBoxesVisible;
      }
      return false;
    });
    this.allowSelectOnClick = computed(() => {
      const {
        mode,
        showCheckBoxesMode
      } = this.selectionOption.value;
      return mode !== SelectionMode.Multiple || showCheckBoxesMode !== ShowCheckBoxesMode.Always;
    });
    this.needToAddSelectionButtons = computed(() => {
      const selectionMode = this.options.oneWay('selection.mode').value;
      const allowSelectAll = this.options.oneWay('selection.allowSelectAll').value;
      return selectionMode === SelectionMode.Multiple && allowSelectAll;
    });
    this.selectionHelper = computed(() => {
      const dataSource = this.dataController.dataSource.value;
      const selectionOption = this.selectionOption.value;
      if (selectionOption.mode === SelectionMode.None) {
        return undefined;
      }
      const selectionConfig = this.getSelectionConfig(dataSource, selectionOption);
      return new Selection(selectionConfig);
    });
    effect(() => {
      const selectedCardKeys = this.normalizedSelectedCardKeys.value;
      const selectionOption = this.selectionOption.value;
      if (selectionOption.mode !== SelectionMode.None) {
        this.itemsController.setSelectionState(selectedCardKeys);
        if (selectedCardKeys.length > 1) {
          this._isCheckBoxesVisible.value = true;
        } else if (selectedCardKeys.length === 0) {
          this._isCheckBoxesVisible.value = false;
        }
      }
    });
    effect(() => {
      const isLoaded = this.dataController.isLoaded.value;
      if (isLoaded) {
        const selectedCardKeys = this.selectedCardKeys.peek();
        this.selectCards(selectedCardKeys);
      }
    });
    effect(() => {
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
    this.toolbarController.addDefaultItem(signal({
      name: 'selectAllButton',
      widget: 'dxButton',
      options: {
        icon: 'selectall',
        onClick: () => {
          this.selectAll();
        },
        disabled: !!isSelectAll,
        text: messageLocalization.format('dxCardView-selectAll')
      },
      location: 'before',
      locateInMenu: 'auto'
    }), this.needToAddSelectionButtons);
    this.toolbarController.addDefaultItem(signal({
      name: 'clearSelectionButton',
      widget: 'dxButton',
      options: {
        icon: 'close',
        onClick: () => {
          this.deselectAll();
        },
        disabled: isOnePageSelectAll ? isSelectAll === false : selectedCardKeys.length === 0,
        text: messageLocalization.format('dxCardView-clearSelection')
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
    if (mode !== SelectionMode.Multiple) {
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
    const selectedCardKey = this.getSelectedCardKeys();
    return selectedCardKey.map(key => this.itemsController.getCardByKey(key)).filter(item => !!item).map(item => item.data);
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
    if (mode !== SelectionMode.None) {
      if (showCheckBoxesMode === ShowCheckBoxesMode.OnLongTap) {
        this.toggleSelectionCheckBoxes();
      } else {
        if (showCheckBoxesMode === ShowCheckBoxesMode.OnClick) {
          this._isCheckBoxesVisible.value = true;
        }
        if (showCheckBoxesMode !== ShowCheckBoxesMode.Always) {
          this.changeCardSelection(card.index, {
            control: true
          });
        }
      }
    }
  }
}
SelectionController.dependencies = [OptionsController, DataController, ItemsController, ToolbarController, OptionsValidationController];
