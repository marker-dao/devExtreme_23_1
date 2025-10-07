/**
* DevExtreme (esm/__internal/grids/grid_core/column_chooser/m_column_chooser.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { deferUpdate } from '../../../../core/utils/common';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { getOuterHeight, getOuterWidth } from '../../../../core/utils/size';
import { isDefined } from '../../../../core/utils/type';
import Button from '../../../../ui/button';
import Popup from '../../../../ui/popup/ui.popup';
import TreeView from '../../../../ui/tree_view';
import modules from '../m_modules';
import { ColumnsView } from '../views/m_columns_view';
import { defaultOptions } from './const';
const COLUMN_CHOOSER_CLASS = 'column-chooser';
const COLUMN_CHOOSER_BUTTON_CLASS = 'column-chooser-button';
const COLUMN_CHOOSER_LIST_CLASS = 'column-chooser-list';
const COLUMN_CHOOSER_PLAIN_CLASS = 'column-chooser-plain';
const COLUMN_CHOOSER_DRAG_CLASS = 'column-chooser-mode-drag';
const COLUMN_CHOOSER_SELECT_CLASS = 'column-chooser-mode-select';
const COLUMN_CHOOSER_ICON_NAME = 'column-chooser';
const COLUMN_CHOOSER_ITEM_CLASS = 'dx-column-chooser-item';
const COLUMN_OPTIONS_USED_IN_ITEMS = ['showInColumnChooser', 'caption', 'allowHiding', 'visible', 'cssClass', 'ownerBand'];
const processItems = function (that, chooserColumns) {
  const items = [];
  const isSelectMode = that.isSelectMode();
  const isRecursive = that.option('columnChooser.selection.recursive');
  if (chooserColumns.length) {
    each(chooserColumns, (index, column) => {
      const item = {
        text: column.caption,
        cssClass: column.cssClass,
        allowHiding: column.allowHiding,
        expanded: true,
        id: column.index,
        disabled: column.allowHiding === false,
        parentId: isDefined(column.ownerBand) ? column.ownerBand : null
      };
      const isRecursiveWithColumns = isRecursive && column.hasColumns;
      if (isSelectMode && !isRecursiveWithColumns) {
        item.selected = column.visible;
      }
      items.push(item);
    });
  }
  return items;
};
export class ColumnChooserController extends modules.ViewController {
  init() {
    super.init();
    this._rowsView = this.getView('rowsView');
  }
  renderShowColumnChooserButton($element) {
    const that = this;
    const columnChooserButtonClass = that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS);
    const columnChooserEnabled = that.option('columnChooser.enabled');
    const $showColumnChooserButton = $element.find(`.${columnChooserButtonClass}`);
    let $columnChooserButton;
    if (columnChooserEnabled) {
      if (!$showColumnChooserButton.length) {
        $columnChooserButton = $('<div>').addClass(columnChooserButtonClass).appendTo($element);
        that._createComponent($columnChooserButton, Button, {
          icon: COLUMN_CHOOSER_ICON_NAME,
          onClick() {
            // TODO getView
            that.getView('columnChooserView').showColumnChooser();
          },
          hint: that.option('columnChooser.title'),
          // @ts-expect-error
          integrationOptions: {}
        });
      } else {
        $showColumnChooserButton.show();
      }
    } else {
      $showColumnChooserButton.hide();
    }
  }
  getPosition() {
    var _this$_rowsView;
    const position = this.option('columnChooser.position');
    return isDefined(position) ? position : {
      my: 'right bottom',
      at: 'right bottom',
      of: (_this$_rowsView = this._rowsView) === null || _this$_rowsView === void 0 ? void 0 : _this$_rowsView.element(),
      collision: 'fit',
      offset: '-2 -2',
      boundaryOffset: '2 2'
    };
  }
}
export class ColumnChooserView extends ColumnsView {
  optionChanged(args) {
    switch (args.name) {
      case 'columnChooser':
        this._initializePopupContainer();
        this.render(null, 'full');
        break;
      default:
        super.optionChanged(args);
    }
  }
  publicMethods() {
    return ['showColumnChooser', 'hideColumnChooser'];
  }
  _resizeCore() {}
  _initializePopupContainer() {
    const that = this;
    const columnChooserClass = that.addWidgetPrefix(COLUMN_CHOOSER_CLASS);
    const $element = that.element().addClass(columnChooserClass);
    const columnChooserOptions = that.option('columnChooser');
    const popupPosition = this._columnChooserController.getPosition();
    const dxPopupOptions = {
      visible: false,
      shading: false,
      showCloseButton: true,
      dragEnabled: true,
      resizeEnabled: true,
      wrapperAttr: {
        class: columnChooserClass
      },
      toolbarItems: [{
        text: columnChooserOptions.title,
        toolbar: 'top',
        location: 'before'
      }],
      position: popupPosition,
      width: columnChooserOptions.width,
      height: columnChooserOptions.height,
      rtlEnabled: that.option('rtlEnabled'),
      container: columnChooserOptions.container,
      _loopFocus: true
    };
    if (!isDefined(this._popupContainer)) {
      that._popupContainer = that._createComponent($element, Popup, dxPopupOptions);
      that._popupContainer.on('optionChanged', args => {
        if (args.name === 'visible') {
          that.renderCompleted.fire();
        }
      });
    } else {
      this._popupContainer.option(dxPopupOptions);
    }
    this.setPopupAttributes();
  }
  setPopupAttributes() {
    const isSelectMode = this.isSelectMode();
    const isBandColumnsUsed = this._columnsController.isBandColumnsUsed();
    this._popupContainer.setAria({
      role: 'dialog',
      label: messageLocalization.format('dxDataGrid-columnChooserTitle')
    });
    this._popupContainer.$wrapper().toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_DRAG_CLASS), !isSelectMode).toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_SELECT_CLASS), isSelectMode);
    this._popupContainer.$content().addClass(this.addWidgetPrefix(COLUMN_CHOOSER_LIST_CLASS));
    if (isSelectMode && !isBandColumnsUsed) {
      this._popupContainer.$content().addClass(this.addWidgetPrefix(COLUMN_CHOOSER_PLAIN_CLASS));
    }
  }
  _renderCore(change) {
    if (this._popupContainer) {
      const isDragMode = !this.isSelectMode();
      if (!this._columnChooserList || change === 'full') {
        this._renderTreeView();
      } else if (isDragMode) {
        this._updateItems();
      }
    }
  }
  _renderTreeView() {
    var _columnChooser$search, _columnChooser$search2, _columnChooser$search3;
    const that = this;
    const $container = this._popupContainer.$content();
    const columnChooser = this.option('columnChooser');
    const isSelectMode = this.isSelectMode();
    const searchEnabled = isDefined(columnChooser.allowSearch) ? columnChooser.allowSearch : (_columnChooser$search = columnChooser.search) === null || _columnChooser$search === void 0 ? void 0 : _columnChooser$search.enabled;
    const searchTimeout = isDefined(columnChooser.searchTimeout) ? columnChooser.searchTimeout : (_columnChooser$search2 = columnChooser.search) === null || _columnChooser$search2 === void 0 ? void 0 : _columnChooser$search2.timeout;
    const treeViewConfig = {
      dataStructure: 'plain',
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      itemTemplate: 'item',
      showCheckBoxesMode: 'none',
      rootValue: null,
      searchEnabled,
      searchTimeout,
      searchEditorOptions: (_columnChooser$search3 = columnChooser.search) === null || _columnChooser$search3 === void 0 ? void 0 : _columnChooser$search3.editorOptions
    };
    extend(treeViewConfig, isSelectMode ? this._prepareSelectModeConfig() : this._prepareDragModeConfig());
    if (this._columnChooserList) {
      if (!treeViewConfig.searchEnabled) {
        treeViewConfig.searchValue = '';
      }
      this._columnChooserList.option(treeViewConfig);
      // we need to set items after setting selectNodesRecursive, so they will be processed correctly inside TreeView
      this._updateItems();
    } else {
      this._columnChooserList = this._createComponent($container, TreeView, treeViewConfig);
      // we need to set items after setting selectNodesRecursive, so they will be processed correctly inside TreeView
      this._updateItems();
      let scrollTop = 0;
      this._columnChooserList.on('optionChanged', e => {
        const scrollable = e.component.getScrollable();
        scrollTop = scrollable.scrollTop();
      });
      this._columnChooserList.on('contentReady', e => {
        deferUpdate(() => {
          const scrollable = e.component.getScrollable();
          scrollable.scrollTo({
            y: scrollTop
          });
          that.renderCompleted.fire();
        });
      });
    }
  }
  _prepareDragModeConfig() {
    const columnChooserOptions = this.option('columnChooser');
    return {
      noDataText: columnChooserOptions.emptyPanelText,
      activeStateEnabled: false,
      hoverStateEnabled: false,
      itemTemplate(data, index, item) {
        $(item).text(data.text).parent().addClass(data.cssClass).addClass(COLUMN_CHOOSER_ITEM_CLASS);
      }
    };
  }
  _prepareSelectModeConfig() {
    const that = this;
    const selectionOptions = this.option('columnChooser.selection') ?? {};
    const getFlatNodes = nodes => {
      const addNodesToArray = (nodes, flatNodesArray) => nodes.reduce((result, node) => {
        result.push(node);
        if (node.children.length) {
          addNodesToArray(node.children, result);
        }
        return result;
      }, flatNodesArray);
      return addNodesToArray(nodes, []);
    };
    const updateSelection = (e, nodes) => {
      nodes.filter(node => node.itemData.allowHiding === false).forEach(node => e.component.selectItem(node.key));
    };
    const updateColumnVisibility = nodes => {
      nodes.forEach(node => {
        const columnIndex = node.itemData.id;
        const isVisible = node.selected !== false;
        that._columnsController.columnOption(columnIndex, 'visible', isVisible);
      });
    };
    let isUpdatingSelection = false;
    const selectionChangedHandler = e => {
      if (isUpdatingSelection) {
        return;
      }
      const nodes = getFlatNodes(e.component.getNodes());
      e.component.beginUpdate();
      isUpdatingSelection = true;
      updateSelection(e, nodes);
      e.component.endUpdate();
      isUpdatingSelection = false;
      that.component.beginUpdate();
      this._isUpdatingColumnVisibility = true;
      updateColumnVisibility(nodes);
      that.component.endUpdate();
      this._isUpdatingColumnVisibility = false;
    };
    return {
      selectByClick: selectionOptions.selectByClick,
      selectNodesRecursive: selectionOptions.recursive,
      showCheckBoxesMode: selectionOptions.allowSelectAll ? 'selectAll' : 'normal',
      onSelectionChanged: selectionChangedHandler
    };
  }
  _updateItems() {
    const isSelectMode = this.isSelectMode();
    const chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    const items = processItems(this, chooserColumns);
    this._columnChooserList.option('items', items);
  }
  _updateItemsSelection(columnIndices) {
    const changedColumns = columnIndices === null || columnIndices === void 0 ? void 0 : columnIndices.map(columnIndex => this._columnsController.columnOption(columnIndex));
    this._columnChooserList.beginUpdate();
    changedColumns === null || changedColumns === void 0 || changedColumns.forEach(_ref => {
      let {
        visible,
        index
      } = _ref;
      if (visible) {
        this._columnChooserList.selectItem(index);
      } else {
        this._columnChooserList.unselectItem(index);
      }
    });
    this._columnChooserList.endUpdate();
  }
  _columnOptionChanged(changes) {
    super._columnOptionChanged(changes);
    const {
      optionNames
    } = changes;
    const isSelectMode = this.isSelectMode();
    const onlyVisibleChanged = this.isColumnVisibilityOnlyUpdated(optionNames);
    const isOnlyColumnVisibilityUpdated = this._isUpdatingColumnVisibility && onlyVisibleChanged;
    if (!isSelectMode || !this._columnChooserList || isOnlyColumnVisibilityUpdated) {
      return;
    }
    const columnIndices = isDefined(changes.columnIndex) ? [changes.columnIndex] : changes.columnIndices;
    const hasItemsOptionNames = COLUMN_OPTIONS_USED_IN_ITEMS.some(optionName => optionNames[optionName]);
    const needUpdate = hasItemsOptionNames || changes.changeTypes.columns && optionNames.all;
    if (!needUpdate) {
      return;
    }
    this._updateItemsSelection(columnIndices);
    if (!onlyVisibleChanged) {
      this._updateItems();
    }
  }
  isColumnVisibilityOnlyUpdated(optionNames) {
    const optionKeys = Object.keys(optionNames ?? {}).filter(key => key !== 'length');
    return optionKeys.length === 1 && optionKeys[0] === 'visible';
  }
  getColumnElements() {
    var _this$_popupContainer;
    const result = [];
    const isSelectMode = this.isSelectMode();
    const chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    const $content = (_this$_popupContainer = this._popupContainer) === null || _this$_popupContainer === void 0 ? void 0 : _this$_popupContainer.$content();
    const $nodes = $content === null || $content === void 0 ? void 0 : $content.find('.dx-treeview-node');
    if ($nodes) {
      chooserColumns.forEach(column => {
        const $node = $nodes.filter(`[data-item-id = '${column.index}']`);
        const item = $node.length ? $node.children(`.${COLUMN_CHOOSER_ITEM_CLASS}`).get(0) : null;
        result.push(item);
      });
    }
    return $(result);
  }
  getName() {
    return 'columnChooser';
  }
  getColumns() {
    return this._columnsController.getChooserColumns();
  }
  allowDragging(column) {
    const isParentColumnVisible = this._columnsController.isParentColumnVisible(column.index);
    const isColumnHidden = !column.visible && column.allowHiding;
    return this.isColumnChooserVisible() && isParentColumnVisible && isColumnHidden;
  }
  allowColumnHeaderDragging(column) {
    const isDragMode = !this.isSelectMode();
    return isDragMode && this.isColumnChooserVisible() && column.allowHiding;
  }
  getBoundingRect() {
    var _that$_popupContainer;
    const that = this;
    const container = (_that$_popupContainer = that._popupContainer) === null || _that$_popupContainer === void 0 ? void 0 : _that$_popupContainer.$overlayContent();
    if (container !== null && container !== void 0 && container.is(':visible')) {
      const offset = container.offset();
      return {
        left: offset.left,
        top: offset.top,
        right: offset.left + getOuterWidth(container),
        bottom: offset.top + getOuterHeight(container)
      };
    }
    return null;
  }
  showColumnChooser() {
    if (!this._popupContainer) {
      this._initializePopupContainer();
      this.render();
    }
    this._popupContainer.show();
  }
  hideColumnChooser() {
    if (this._popupContainer) {
      this._popupContainer.hide();
    }
  }
  isColumnChooserVisible() {
    const popupContainer = this._popupContainer;
    return popupContainer === null || popupContainer === void 0 ? void 0 : popupContainer.option('visible');
  }
  isSelectMode() {
    return this.option('columnChooser.mode') === 'select';
  }
  hasHiddenColumns() {
    const isEnabled = this.option('columnChooser.enabled');
    const hiddenColumns = this.getColumns().filter(column => !column.visible);
    return isEnabled && hiddenColumns.length;
  }
}
const headerPanel = Base => class ColumnChooserHeaderPanelExtender extends Base {
  _getToolbarItems() {
    const items = super._getToolbarItems();
    return this._appendColumnChooserItem(items);
  }
  _appendColumnChooserItem(items) {
    const that = this;
    const columnChooserEnabled = that.option('columnChooser.enabled');
    if (columnChooserEnabled) {
      const onClickHandler = function () {
        // TODO getView
        that.component.getView('columnChooserView').showColumnChooser();
      };
      const onInitialized = function (e) {
        $(e.element).addClass(that._getToolbarButtonClass(that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS)));
      };
      const hintText = that.option('columnChooser.title');
      const toolbarItem = {
        widget: 'dxButton',
        options: {
          icon: COLUMN_CHOOSER_ICON_NAME,
          onClick: onClickHandler,
          hint: hintText,
          text: hintText,
          onInitialized,
          elementAttr: {
            'aria-haspopup': 'dialog'
          }
        },
        showText: 'inMenu',
        location: 'after',
        name: 'columnChooserButton',
        locateInMenu: 'auto',
        sortIndex: 40
      };
      items.push(toolbarItem);
    }
    return items;
  }
  optionChanged(args) {
    switch (args.name) {
      case 'columnChooser':
        this._invalidate();
        args.handled = true;
        break;
      default:
        super.optionChanged(args);
    }
  }
};
const columns = Base => class ColumnsChooserColumnsControllerExtender extends Base {
  allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
    const isSelectMode = this.option('columnChooser.mode') === 'select';
    const isMoveColumnDisallowed = isSelectMode && targetLocation === 'columnChooser';
    return isMoveColumnDisallowed ? false : super.allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation);
  }
};
const columnHeadersView = Base => class ColumnChooserColumnHeadersExtender extends Base {
  allowDragging(column) {
    const isDragMode = !this._columnChooserView.isSelectMode();
    const isColumnChooserVisible = this._columnChooserView.isColumnChooserVisible();
    return isDragMode && isColumnChooserVisible && column.allowHiding || super.allowDragging(column);
  }
};
export const columnChooserModule = {
  defaultOptions() {
    return defaultOptions;
  },
  controllers: {
    columnChooser: ColumnChooserController
  },
  views: {
    columnChooserView: ColumnChooserView
  },
  extenders: {
    views: {
      headerPanel,
      columnHeadersView
    },
    controllers: {
      columns
    }
  }
};
