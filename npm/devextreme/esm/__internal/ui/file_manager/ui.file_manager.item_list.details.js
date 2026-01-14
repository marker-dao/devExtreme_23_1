/**
* DevExtreme (esm/__internal/ui/file_manager/ui.file_manager.item_list.details.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { isDefined, isFunction, isString } from '../../../core/utils/type';
// NOTE: Using the "public" export here for the theme-builder deps check
import DataGrid from '../../../ui/data_grid';
import { OPERATIONS } from '../../ui/file_manager/file_items_controller';
import { extendAttributes, getDisplayFileSize } from '../../ui/file_manager/ui.file_manager.common';
import FileManagerFileActionsButton from '../../ui/file_manager/ui.file_manager.file_actions_button';
import FileManagerItemListBase from '../../ui/file_manager/ui.file_manager.item_list';
const FILE_MANAGER_DETAILS_ITEM_LIST_CLASS = 'dx-filemanager-details';
const FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS = 'dx-filemanager-details-item-thumbnail';
const FILE_MANAGER_DETAILS_ITEM_NAME_CLASS = 'dx-filemanager-details-item-name';
const FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS = 'dx-filemanager-details-item-name-wrapper';
const FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS = 'dx-filemanager-details-item-is-directory';
const FILE_MANAGER_PARENT_DIRECTORY_ITEM = 'dx-filemanager-parent-directory-item';
const DATA_GRID_DATA_ROW_CLASS = 'dx-data-row';
const DEFAULT_COLUMN_CONFIGS = {
  thumbnail: {
    caption: '',
    calculateSortValue: 'isDirectory',
    width: 36,
    alignment: 'center',
    cssClass: FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS
  },
  name: {
    caption: messageLocalization.format('dxFileManager-listDetailsColumnCaptionName')
  },
  dateModified: {
    caption: messageLocalization.format('dxFileManager-listDetailsColumnCaptionDateModified'),
    width: 110,
    hidingPriority: 1
  },
  size: {
    caption: messageLocalization.format('dxFileManager-listDetailsColumnCaptionFileSize'),
    width: 90,
    alignment: 'right',
    hidingPriority: 0
  },
  isParentFolder: {
    caption: 'isParentFolder',
    visible: false,
    sortIndex: 0,
    sortOrder: 'asc'
  }
};
class FileManagerDetailsItemList extends FileManagerItemListBase {
  _initMarkup() {
    this._itemCount = 0;
    this._focusedItem = null;
    this._hasParentDirectoryItem = false;
    this._parentDirectoryItemKey = null;
    this._selectAllCheckBox = null;
    this._selectAllCheckBoxUpdating = false;
    this.$element().addClass(FILE_MANAGER_DETAILS_ITEM_LIST_CLASS);
    this._createFilesView();
    this._contextMenu.option('onContextMenuHidden', () => this._onContextMenuHidden());
    super._initMarkup();
  }
  _createFilesView() {
    const $filesView = $('<div>').appendTo(this.$element());
    const selectionMode = this._isMultipleSelectionMode() ? 'multiple' : 'none';
    this._filesView = this._createComponent($filesView, DataGrid, {
      dataSource: this._createDataSource(),
      hoverStateEnabled: true,
      selection: {
        mode: selectionMode,
        showCheckBoxesMode: this._isDesktop() ? 'onClick' : 'none'
      },
      selectedRowKeys: this.option('selectedItemKeys'),
      focusedRowKey: this.option('focusedItemKey'),
      focusedRowEnabled: true,
      allowColumnResizing: true,
      scrolling: {
        mode: 'virtual'
      },
      sorting: {
        mode: 'single',
        showSortIndexes: false
      },
      loadPanel: {
        shading: true
      },
      height: '100%',
      showColumnLines: false,
      showRowLines: false,
      columnHidingEnabled: false,
      columns: this._createColumns(),
      onEditorPreparing: this._onEditorPreparing.bind(this),
      onRowPrepared: this._onRowPrepared.bind(this),
      onContextMenuPreparing: this._onContextMenuPreparing.bind(this),
      onSelectionChanged: this._onFilesViewSelectionChanged.bind(this),
      onFocusedRowChanged: this._onFilesViewFocusedRowChanged.bind(this),
      onOptionChanged: this._onFilesViewOptionChanged.bind(this),
      onContentReady: this._onContentReady.bind(this)
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createColumns() {
    // @ts-expect-error ts-error
    let {
      detailColumns: columns
    } = this.option();
    columns = columns.slice(0);
    columns = columns.map(column => {
      let extendedItem = column;
      if (isString(column)) {
        extendedItem = {
          dataField: column
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._getPreparedColumn(extendedItem);
    });
    const customizeDetailColumns = this.option('customizeDetailColumns');
    if (isFunction(customizeDetailColumns)) {
      columns = customizeDetailColumns(columns);
    }
    columns.push(this._getPreparedColumn({
      dataField: 'isParentFolder'
    }));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    columns.forEach(column => this._updateColumnDataField(column));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return columns;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPreparedColumn(columnOptions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {};
    let resultCssClass = '';
    if (this._isDefaultColumn(columnOptions.dataField)) {
      const defaultConfig = extend(true, {}, DEFAULT_COLUMN_CONFIGS[columnOptions.dataField]);
      resultCssClass = defaultConfig.cssClass || '';
      switch (columnOptions.dataField) {
        case 'thumbnail':
          defaultConfig.cellTemplate = this._createThumbnailColumnCell.bind(this);
          defaultConfig.calculateSortValue = `fileItem.${defaultConfig.calculateSortValue}`;
          break;
        case 'name':
          defaultConfig.cellTemplate = this._createNameColumnCell.bind(this);
          defaultConfig.caption = messageLocalization.format('dxFileManager-listDetailsColumnCaptionName');
          break;
        case 'size':
          defaultConfig.calculateCellValue = this._calculateSizeColumnCellValue.bind(this);
          defaultConfig.caption = messageLocalization.format('dxFileManager-listDetailsColumnCaptionFileSize');
          defaultConfig.calculateSortValue = rowData => rowData.fileItem.isDirectory ? -1 : rowData.fileItem.size;
          break;
        case 'dateModified':
          defaultConfig.caption = messageLocalization.format('dxFileManager-listDetailsColumnCaptionDateModified');
          break;
        default:
          break;
      }
      extend(true, result, defaultConfig);
    }
    extendAttributes(result, columnOptions, ['alignment', 'caption', 'dataField', 'dataType', 'hidingPriority', 'sortIndex', 'sortOrder', 'visible', 'visibleIndex', 'width']);
    if (columnOptions.cssClass) {
      resultCssClass = `${resultCssClass} ${columnOptions.cssClass}`;
    }
    if (resultCssClass) {
      result.cssClass = resultCssClass;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _updateColumnDataField(column) {
    const dataItemSuffix = this._isDefaultColumn(column.dataField) ? '' : 'dataItem.';
    column.dataField = `fileItem.${dataItemSuffix}${column.dataField}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return column;
  }
  _isDefaultColumn(columnDataField) {
    return !!DEFAULT_COLUMN_CONFIGS[columnDataField];
  }
  _onFileItemActionButtonClick(e) {
    var _this$_activeFileActi;
    const {
      component,
      element,
      event
    } = e;
    event === null || event === void 0 || event.stopPropagation();
    const $row = component.$element().closest(this._getItemSelector());
    const fileItemInfo = $row.data('item');
    this._selectItem(fileItemInfo);
    const target = {
      itemData: fileItemInfo,
      itemElement: $row,
      isActionButton: true
    };
    const items = this._getFileItemsForContextMenu(fileItemInfo);
    this._showContextMenu(items, element, event, target);
    // @ts-expect-error ts-error
    this._activeFileActionsButton = component;
    (_this$_activeFileActi = this._activeFileActionsButton) === null || _this$_activeFileActi === void 0 || _this$_activeFileActi.setActive(true);
  }
  _onContextMenuHidden() {
    if (this._activeFileActionsButton) {
      this._activeFileActionsButton.setActive(false);
    }
  }
  _getItemThumbnailCssClass() {
    return FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS;
  }
  _getItemSelector() {
    return `.${DATA_GRID_DATA_ROW_CLASS}`;
  }
  _onItemDblClick(e) {
    const $row = $(e.currentTarget);
    const fileItemInfo = $row.data('item');
    this._raiseSelectedItemOpened(fileItemInfo);
  }
  _isAllItemsSelected() {
    var _this$_filesView;
    const selectableItemsCount = this._hasParentDirectoryItem ? this._itemCount - 1 : this._itemCount;
    const {
      selectedRowKeys
    } = ((_this$_filesView = this._filesView) === null || _this$_filesView === void 0 ? void 0 : _this$_filesView.option()) ?? {};
    if (!(selectedRowKeys !== null && selectedRowKeys !== void 0 && selectedRowKeys.length)) {
      return false;
    }
    return selectedRowKeys.length >= selectableItemsCount ? true : undefined;
  }
  _onEditorPreparing(_ref) {
    let {
      component,
      command,
      row,
      parentType,
      editorOptions
    } = _ref;
    if (!this._filesView) {
      this._filesView = component;
    }
    if (command === 'select' && row) {
      if (this._isParentDirectoryItem(row.data)) {
        editorOptions.disabled = true;
      }
    } else if (parentType === 'headerRow') {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      editorOptions.onInitialized = _ref2 => {
        let {
          component
        } = _ref2;
        this._selectAllCheckBox = component;
      };
      editorOptions.value = this._isAllItemsSelected();
      editorOptions.onValueChanged = args => this._onSelectAllCheckBoxValueChanged(args);
    }
  }
  _onSelectAllCheckBoxValueChanged(_ref3) {
    let {
      event,
      previousValue,
      value
    } = _ref3;
    if (!event) {
      if (previousValue && !this._selectAllCheckBoxUpdating && this._selectAllCheckBox) {
        this._selectAllCheckBox.option('value', previousValue);
      }
      return;
    }
    if (this._isAllItemsSelected() === value) {
      return;
    }
    if (value) {
      var _this$_filesView2;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_filesView2 = this._filesView) === null || _this$_filesView2 === void 0 || _this$_filesView2.selectAll();
    } else {
      var _this$_filesView3;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_filesView3 = this._filesView) === null || _this$_filesView3 === void 0 || _this$_filesView3.deselectAll();
    }
    event.preventDefault();
  }
  _onRowPrepared(_ref4) {
    let {
      rowType,
      rowElement,
      data
    } = _ref4;
    if (rowType === 'data') {
      const $row = $(rowElement);
      $row.data('item', data);
      if (this._isParentDirectoryItem(data)) {
        $row.addClass(FILE_MANAGER_PARENT_DIRECTORY_ITEM);
      }
    }
  }
  _onContextMenuPreparing(e) {
    var _this$_filesView4;
    if (!this._isDesktop()) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fileItems = null;
    let item = {};
    if (e.row && e.row.rowType === 'data') {
      item = e.row.data;
      this._selectItem(item);
      fileItems = this._getFileItemsForContextMenu(item);
    }
    const eventArgs = extend({}, {
      targetElement: e.target === 'content' && isDefined(e.row) ? (_this$_filesView4 = this._filesView) === null || _this$_filesView4 === void 0 ? void 0 : _this$_filesView4.getRowElement(e.rowIndex) : undefined,
      itemData: item,
      options: this._contextMenu.option(),
      event: e.event,
      isActionButton: false,
      cancel: false
    });
    this._raiseContextMenuShowing(eventArgs);
    e.items = eventArgs.cancel ? [] : this._contextMenu.createContextMenuItems(fileItems, null, item);
  }
  _onFilesViewSelectionChanged(_ref5) {
    let {
      component,
      selectedRowsData,
      selectedRowKeys,
      currentSelectedRowKeys,
      currentDeselectedRowKeys
    } = _ref5;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._filesView = this._filesView || component;
    if (this._selectAllCheckBox) {
      this._selectAllCheckBoxUpdating = true;
      this._selectAllCheckBox.option('value', this._isAllItemsSelected());
      this._selectAllCheckBoxUpdating = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const selectedItems = selectedRowsData.map(itemInfo => itemInfo.fileItem);
    this._tryRaiseSelectionChanged({
      selectedItemInfos: selectedRowsData,
      selectedItems,
      selectedItemKeys: selectedRowKeys,
      currentSelectedItemKeys: currentSelectedRowKeys,
      currentDeselectedItemKeys: currentDeselectedRowKeys
    });
  }
  _onFilesViewFocusedRowChanged(e) {
    var _e$row2;
    if (!this._isMultipleSelectionMode()) {
      var _e$row;
      this._selectItemSingleSelection((_e$row = e.row) === null || _e$row === void 0 ? void 0 : _e$row.data);
    }
    const fileSystemItem = ((_e$row2 = e.row) === null || _e$row2 === void 0 ? void 0 : _e$row2.data.fileItem) || null;
    this._onFocusedItemChanged({
      item: fileSystemItem,
      itemKey: fileSystemItem === null || fileSystemItem === void 0 ? void 0 : fileSystemItem.key,
      itemElement: e.rowElement
    });
  }
  _onFilesViewOptionChanged(_ref6) {
    let {
      fullName
    } = _ref6;
    if (fullName.indexOf('sortOrder') > -1) {
      var _this$_filesView5;
      (_this$_filesView5 = this._filesView) === null || _this$_filesView5 === void 0 || _this$_filesView5.columnOption('isParentFolder', {
        sortOrder: 'asc',
        sortIndex: 0
      });
    }
  }
  _resetFocus() {
    this._setFocusedItemKey(undefined);
  }
  _createThumbnailColumnCell(container, cellInfo) {
    var _this$_getItemThumbna;
    (_this$_getItemThumbna = this._getItemThumbnailContainer(cellInfo.data)) === null || _this$_getItemThumbna === void 0 || _this$_getItemThumbna.appendTo(container);
  }
  _createNameColumnCell(container, cellInfo) {
    const $button = $('<div>');
    const $name = $('<span>').text(cellInfo.data.fileItem.name).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_CLASS);
    const $wrapper = $('<div>')
    // @ts-expect-error ts-error
    .append($name, $button).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS);
    $(container).append($wrapper);
    this._createComponent($button, FileManagerFileActionsButton, {
      onClick: e => this._onFileItemActionButtonClick(e)
    });
  }
  _calculateSizeColumnCellValue(rowData) {
    return rowData.fileItem.isDirectory ? '' : getDisplayFileSize(rowData.fileItem.size);
  }
  _selectItem(fileItemInfo) {
    const selectItemFunc = this._isMultipleSelectionMode() ? this._selectItemMultipleSelection : this._selectItemSingleSelection;
    selectItemFunc.call(this, fileItemInfo);
  }
  _deselectItem(item) {
    var _this$_filesView6;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_filesView6 = this._filesView) === null || _this$_filesView6 === void 0 || _this$_filesView6.deselectRows([item.fileItem.key]);
  }
  _selectItemSingleSelection(fileItemInfo) {
    if (!this._focusedItem || !fileItemInfo || this._focusedItem.fileItem.key !== fileItemInfo.fileItem.key) {
      const oldFocusedItem = this._focusedItem;
      this._focusedItem = fileItemInfo;
      const deselectedKeys = [];
      if (oldFocusedItem) {
        // @ts-expect-error ts-error
        deselectedKeys.push(oldFocusedItem.fileItem.key);
      }
      const selectedItems = [];
      const selectedKeys = [];
      if (fileItemInfo && !this._isParentDirectoryItem(fileItemInfo)) {
        // @ts-expect-error ts-error
        selectedItems.push(fileItemInfo.fileItem);
        // @ts-expect-error ts-error
        selectedKeys.push(fileItemInfo.fileItem.key);
      }
      this._raiseSelectionChanged({
        selectedItems,
        selectedItemKeys: selectedKeys,
        currentSelectedItemKeys: [...selectedKeys],
        currentDeselectedItemKeys: deselectedKeys
      });
    }
  }
  _selectItemMultipleSelection(_ref7) {
    var _this$_filesView7;
    let {
      fileItem
    } = _ref7;
    if (!((_this$_filesView7 = this._filesView) !== null && _this$_filesView7 !== void 0 && _this$_filesView7.isRowSelected(fileItem.key))) {
      var _this$_filesView8, _this$_filesView9;
      // @ts-expect-error ts-error
      const selectionController = (_this$_filesView8 = this._filesView) === null || _this$_filesView8 === void 0 ? void 0 : _this$_filesView8.getController('selection');
      const preserve = selectionController.isSelectionWithCheckboxes();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_filesView9 = this._filesView) === null || _this$_filesView9 === void 0 || _this$_filesView9.selectRows([fileItem.key], preserve);
    }
  }
  _setSelectedItemKeys(itemKeys) {
    var _this$_filesView0;
    (_this$_filesView0 = this._filesView) === null || _this$_filesView0 === void 0 || _this$_filesView0.option('selectedRowKeys', itemKeys);
  }
  _setFocusedItemKey(itemKey) {
    var _this$_filesView1;
    (_this$_filesView1 = this._filesView) === null || _this$_filesView1 === void 0 || _this$_filesView1.option('focusedRowKey', itemKey);
  }
  clearSelection() {
    if (this._isMultipleSelectionMode()) {
      var _this$_filesView10;
      (_this$_filesView10 = this._filesView) === null || _this$_filesView10 === void 0 || _this$_filesView10.clearSelection();
    } else {
      var _this$_filesView11;
      (_this$_filesView11 = this._filesView) === null || _this$_filesView11 === void 0 || _this$_filesView11.option('focusedRowIndex', -1);
    }
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-misused-promises
  refresh(options, operation) {
    var _this$_filesView12, _this$_refreshDeferre;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actualOptions = {
      dataSource: this._createDataSource()
    };
    if (options && Object.prototype.hasOwnProperty.call(options, 'focusedItemKey')) {
      if (isDefined(options.focusedItemKey)) {
        actualOptions.focusedRowKey = options.focusedItemKey;
      } else {
        actualOptions.focusedRowIndex = -1;
      }
    }
    const hasNoScrollTarget = !isDefined(actualOptions.focusedRowKey) && actualOptions.focusedRowIndex === -1;
    if (hasNoScrollTarget && operation === OPERATIONS.NAVIGATION) {
      actualOptions.paging = {
        pageIndex: 0
      };
      this._needResetScrollPosition = true;
    }
    (_this$_filesView12 = this._filesView) === null || _this$_filesView12 === void 0 || _this$_filesView12.option(actualOptions);
    // @ts-expect-error ts-error
    this._refreshDeferred = new Deferred();
    return (_this$_refreshDeferre = this._refreshDeferred) === null || _this$_refreshDeferre === void 0 ? void 0 : _this$_refreshDeferre.promise();
  }
  _getScrollable() {
    var _this$_filesView13;
    return (_this$_filesView13 = this._filesView) === null || _this$_filesView13 === void 0 ? void 0 : _this$_filesView13.getScrollable();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSelectedItems() {
    if (this._isMultipleSelectionMode()) {
      var _this$_filesView14;
      return (_this$_filesView14 = this._filesView) === null || _this$_filesView14 === void 0 ? void 0 : _this$_filesView14.getSelectedRowsData();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._focusedItem && !this._isParentDirectoryItem(this._focusedItem) ? [this._focusedItem] : [];
  }
}
export default FileManagerDetailsItemList;
