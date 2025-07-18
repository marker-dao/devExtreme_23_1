/**
* DevExtreme (cjs/__internal/grids/data_grid/grouping/m_grouping.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupingHeaderPanelExtender = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _deferred = require("../../../../core/utils/deferred");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _accessibility = require("../../../../ui/shared/accessibility");
var _m_column_context_menu_mixin = require("../../../grids/grid_core/context_menu/m_column_context_menu_mixin");
var _m_accessibility = require("../../../grids/grid_core/m_accessibility");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_data_source_adapter = _interopRequireDefault(require("../m_data_source_adapter"));
var _const = require("./const");
var _m_grouping_collapsed = require("./m_grouping_collapsed");
var _m_grouping_expanded = require("./m_grouping_expanded");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/method-signature-style */

const DATAGRID_EXPAND_CLASS = 'dx-datagrid-expand';
const DATAGRID_GROUP_ROW_CLASS = 'dx-group-row';
const HEADER_FILTER_CLASS_SELECTOR = '.dx-header-filter';
const dataSourceAdapterExtender = Base => class GroupingDataSourceAdapterExtender extends Base {
  init() {
    super.init.apply(this, arguments);
    this._initGroupingHelper();
  }
  _initGroupingHelper(options) {
    const grouping = this._grouping;
    const isAutoExpandAll = this.option('grouping.autoExpandAll');
    const isFocusedRowEnabled = this.option('focusedRowEnabled');
    const remoteOperations = options ? options.remoteOperations : this.remoteOperations();
    const isODataRemoteOperations = remoteOperations.filtering && remoteOperations.sorting && remoteOperations.paging;
    if (isODataRemoteOperations && !remoteOperations.grouping && (isAutoExpandAll || !isFocusedRowEnabled)) {
      if (!grouping || grouping instanceof _m_grouping_collapsed.GroupingHelper) {
        this._grouping = new _m_grouping_expanded.GroupingHelper(this);
      }
    } else if (!grouping || grouping instanceof _m_grouping_expanded.GroupingHelper) {
      this._grouping = new _m_grouping_collapsed.GroupingHelper(this);
    }
  }
  totalItemsCount() {
    const totalCount = super.totalItemsCount();
    return totalCount > 0 && this._dataSource.group() && this._dataSource.requireTotalCount() ? totalCount + this._grouping.totalCountCorrection() : totalCount;
  }
  itemsCount() {
    return this._dataSource.group() ? this._grouping.itemsCount() || 0 : super.itemsCount.apply(this, arguments);
  }
  allowCollapseAll() {
    return this._grouping.allowCollapseAll();
  }
  isGroupItemCountable(item) {
    return this._grouping.isGroupItemCountable(item);
  }
  isRowExpanded(key) {
    const groupInfo = this._grouping.findGroupInfo(key);
    return groupInfo ? groupInfo.isExpanded : !this._grouping.allowCollapseAll();
  }
  collapseAll(groupIndex) {
    return this._collapseExpandAll(groupIndex, false);
  }
  expandAll(groupIndex) {
    return this._collapseExpandAll(groupIndex, true);
  }
  _collapseExpandAll(groupIndex, isExpand) {
    const that = this;
    const dataSource = that._dataSource;
    const group = dataSource.group();
    const groups = _m_core.default.normalizeSortingInfo(group || []);
    if (groups.length) {
      for (let i = 0; i < groups.length; i++) {
        if (groupIndex === undefined || groupIndex === i) {
          groups[i].isExpanded = isExpand;
        } else if (group !== null && group !== void 0 && group[i]) {
          groups[i].isExpanded = group[i].isExpanded;
        }
      }
      dataSource.group(groups);
      that._grouping.foreachGroups((groupInfo, parents) => {
        if (groupIndex === undefined || groupIndex === parents.length - 1) {
          groupInfo.isExpanded = isExpand;
        }
      }, false, true);
      that.resetPagesCache();
    }
    return true;
  }
  refresh() {
    super.refresh.apply(this, arguments);
    return this._grouping.refresh.apply(this._grouping, arguments);
  }
  changeRowExpand(path) {
    const that = this;
    const dataSource = that._dataSource;
    if (dataSource.group()) {
      dataSource.beginLoading();
      if (that._lastLoadOptions) {
        that._lastLoadOptions.groupExpand = true;
      }
      return that._changeRowExpandCore(path).always(() => {
        dataSource.endLoading();
      });
    }
  }
  _changeRowExpandCore(path) {
    return this._grouping.changeRowExpand(path);
  }

  // @ts-expect-error
  _hasGroupLevelsExpandState(group, isExpanded) {
    if (group && Array.isArray(group)) {
      for (let i = 0; i < group.length; i++) {
        if (group[i].isExpanded === isExpanded) {
          return true;
        }
      }
    }
  }
  _customizeRemoteOperations(options, operationTypes) {
    const {
      remoteOperations
    } = options;
    if (options.storeLoadOptions.group) {
      if (remoteOperations.grouping && !options.isCustomLoading) {
        if (!remoteOperations.groupPaging || this._hasGroupLevelsExpandState(options.storeLoadOptions.group, true)) {
          remoteOperations.paging = false;
        }
      }
      if (!remoteOperations.grouping && (!remoteOperations.sorting || !remoteOperations.filtering || options.isCustomLoading || this._hasGroupLevelsExpandState(options.storeLoadOptions.group, false))) {
        remoteOperations.paging = false;
      }
    } else if (!options.isCustomLoading && remoteOperations.paging && operationTypes.grouping) {
      this.resetCache();
    }
    super._customizeRemoteOperations.apply(this, arguments);
  }
  _handleDataLoading(options) {
    super._handleDataLoading(options);
    this._initGroupingHelper(options);
    return this._grouping.handleDataLoading(options);
  }
  _handleDataLoaded(options) {
    return this._grouping.handleDataLoaded(options, super._handleDataLoaded.bind(this));
  }
  _handleDataLoadedCore(options) {
    return this._grouping.handleDataLoadedCore(options, super._handleDataLoadedCore.bind(this));
  }
};
_m_data_source_adapter.default.extend(dataSourceAdapterExtender);
const GroupingDataControllerExtender = Base => class GroupingDataControllerExtender extends Base {
  init() {
    const that = this;
    super.init();
    that.createAction('onRowExpanding');
    that.createAction('onRowExpanded');
    that.createAction('onRowCollapsing');
    that.createAction('onRowCollapsed');
  }
  _beforeProcessItems(items) {
    const groupColumns = this._columnsController.getGroupColumns();
    items = super._beforeProcessItems(items);
    if (items.length && groupColumns.length) {
      items = this._processGroupItems(items, groupColumns.length);
    }
    return items;
  }
  _processItem(item, options) {
    if ((0, _type.isDefined)(item.groupIndex) && (0, _type.isString)(item.rowType) && item.rowType.indexOf('group') === 0) {
      item = this._processGroupItem(item, options);
      options.dataIndex = 0;
    } else {
      // @ts-expect-error
      item = super._processItem.apply(this, arguments);
    }
    return item;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _processGroupItem(item, options) {
    return item;
  }
  _processGroupItems(items, groupsCount, options) {
    const that = this;
    const groupedColumns = that._columnsController.getGroupColumns();
    const column = groupedColumns[groupedColumns.length - groupsCount];
    if (!options) {
      const scrollingMode = that.option('scrolling.mode');
      options = {
        collectContinuationItems: scrollingMode !== 'virtual' && scrollingMode !== 'infinite',
        resultItems: [],
        path: [],
        values: []
      };
    }
    const {
      resultItems
    } = options;
    if (options.data) {
      if (options.collectContinuationItems || !options.data.isContinuation) {
        resultItems.push({
          rowType: 'group',
          data: options.data,
          groupIndex: options.path.length - 1,
          isExpanded: !!options.data.items,
          key: options.path.slice(0),
          values: options.values.slice(0)
        });
      }
    }
    if (items) {
      if (groupsCount === 0) {
        resultItems.push.apply(resultItems, items);
      } else {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item && 'items' in item) {
            options.data = item;
            options.path.push(item.key);
            options.values.push(column && column.deserializeValue && !column.calculateDisplayValue ? column.deserializeValue(item.key) : item.key);
            that._processGroupItems(item.items, groupsCount - 1, options);
            options.data = undefined;
            options.path.pop();
            options.values.pop();
          } else {
            resultItems.push(item);
          }
        }
      }
    }
    return resultItems;
  }
  publicMethods() {
    return super.publicMethods().concat(['collapseAll', 'expandAll', 'isRowExpanded', 'expandRow', 'collapseRow']);
  }
  collapseAll(groupIndex) {
    const dataSource = this._dataSource;
    if (dataSource && dataSource.collapseAll(groupIndex)) {
      dataSource.pageIndex(0);
      dataSource.reload();
    }
  }
  expandAll(groupIndex) {
    const dataSource = this._dataSource;
    if (dataSource && dataSource.expandAll(groupIndex)) {
      dataSource.pageIndex(0);
      dataSource.reload();
    }
  }
  changeRowExpand(key) {
    const that = this;
    const expanded = that.isRowExpanded(key);
    const args = {
      key,
      expanded
    };
    that.executeAction(expanded ? 'onRowCollapsing' : 'onRowExpanding', args);
    if (!args.cancel) {
      return (0, _deferred.when)(that._changeRowExpandCore(key)).done(() => {
        args.expanded = !expanded;
        that.executeAction(expanded ? 'onRowCollapsed' : 'onRowExpanded', args);
      });
    }
    // @ts-expect-error
    return new _deferred.Deferred().resolve();
  }
  _changeRowExpandCore(key) {
    const that = this;
    const dataSource = this._dataSource;
    // @ts-expect-error
    const d = new _deferred.Deferred();
    if (!dataSource) {
      d.resolve();
    } else {
      (0, _deferred.when)(dataSource.changeRowExpand(key)).done(() => {
        that.load().done(d.resolve).fail(d.reject);
      }).fail(d.reject);
    }
    return d;
  }
  isRowExpanded(key) {
    const dataSource = this._dataSource;
    return dataSource && dataSource.isRowExpanded(key);
  }
  expandRow(key) {
    if (!this.isRowExpanded(key)) {
      return this.changeRowExpand(key);
    }
    // @ts-expect-error
    return new _deferred.Deferred().resolve();
  }
  collapseRow(key) {
    if (this.isRowExpanded(key)) {
      return this.changeRowExpand(key);
    }
    // @ts-expect-error
    return new _deferred.Deferred().resolve();
  }
  optionChanged(args) {
    if (args.name === 'grouping' /* autoExpandAll */) {
      args.name = 'dataSource';
    }
    super.optionChanged(args);
  }
};
const onGroupingMenuItemClick = function (column, rowIndex, params) {
  var _this$getKeyboardNavi, _keyboardNavigationCo2;
  const keyboardNavigationController = (_this$getKeyboardNavi = this.getKeyboardNavigationController) === null || _this$getKeyboardNavi === void 0 ? void 0 : _this$getKeyboardNavi.call(this);
  // eslint-disable-next-line default-case
  switch (params.itemData.value) {
    case 'group':
      {
        var _keyboardNavigationCo;
        this.isNeedToFocusColumn = true;
        keyboardNavigationController === null || keyboardNavigationController === void 0 || (_keyboardNavigationCo = keyboardNavigationController.groupColumn) === null || _keyboardNavigationCo === void 0 || _keyboardNavigationCo.call(keyboardNavigationController, column, rowIndex);
        break;
      }
    case 'ungroup':
      this.isNeedToFocusColumn = true;
      keyboardNavigationController === null || keyboardNavigationController === void 0 || (_keyboardNavigationCo2 = keyboardNavigationController.ungroupColumn) === null || _keyboardNavigationCo2 === void 0 || _keyboardNavigationCo2.call(keyboardNavigationController, column, rowIndex);
      break;
    case 'ungroupAll':
      this.isNeedToFocusColumn = true;
      keyboardNavigationController === null || keyboardNavigationController === void 0 || keyboardNavigationController.ungroupAllColumns();
      break;
  }
};
const isGroupPanelVisible = groupPanelOptions => {
  const visible = groupPanelOptions === null || groupPanelOptions === void 0 ? void 0 : groupPanelOptions.visible;
  return visible === 'auto' ? _devices.default.current().deviceType === 'desktop' : !!visible;
};
const allowDragging = (groupPanelOptions, column) => {
  const isVisible = isGroupPanelVisible(groupPanelOptions);
  const canDrag = (groupPanelOptions === null || groupPanelOptions === void 0 ? void 0 : groupPanelOptions.allowColumnDragging) && (column === null || column === void 0 ? void 0 : column.allowGrouping);
  return isVisible && !!canDrag;
};
const GroupingHeaderPanelExtender = Base => class GroupingHeaderPanelExtender extends (0, _m_column_context_menu_mixin.ColumnContextMenuMixin)(Base) {
  _getToolbarItems() {
    const items = super._getToolbarItems();
    return this._appendGroupingItem(items);
  }
  _appendGroupingItem(items) {
    if (this._isGroupPanelVisible()) {
      let isRendered = false;
      const toolbarItem = {
        template: () => {
          const $groupPanel = (0, _renderer.default)('<div>').addClass(_const.CLASSES.groupPanel);
          this._updateGroupPanelContent($groupPanel);
          (0, _m_accessibility.registerKeyboardAction)('groupPanel', this, $groupPanel, undefined, this._handleActionKeyDown.bind(this));
          return $groupPanel;
        },
        name: 'groupPanel',
        onItemRendered: () => {
          isRendered && this.renderCompleted.fire();
          isRendered = true;
        },
        location: 'before',
        locateInMenu: 'never',
        sortIndex: 1
      };
      items.push(toolbarItem);
      this.updateToolbarDimensions();
    }
    return items;
  }
  _handleActionKeyDown(args) {
    const {
      event
    } = args;
    const $target = (0, _renderer.default)(event.target);
    const groupColumnIndex = $target.closest(`.${_const.CLASSES.groupPanelItem}`).index();
    const column = this._columnsController.getGroupColumns()[groupColumnIndex];
    const columnIndex = column && column.index;
    if ($target.is(HEADER_FILTER_CLASS_SELECTOR)) {
      this._headerFilterController.showHeaderFilterMenu(columnIndex, true);
    } else {
      // @ts-expect-error
      this._processGroupItemAction(columnIndex);
    }
    event.preventDefault();
  }
  _isGroupPanelVisible() {
    return isGroupPanelVisible(this.option('groupPanel'));
  }
  _renderGroupPanelItems($groupPanel, groupColumns) {
    const that = this;
    $groupPanel.empty();
    (0, _iterator.each)(groupColumns, (index, groupColumn) => {
      that._createGroupPanelItem($groupPanel, groupColumn);
    });
    (0, _accessibility.restoreFocus)(this);
  }
  _createGroupPanelItem($rootElement, groupColumn) {
    const $groupPanelItem = (0, _renderer.default)('<div>').addClass(groupColumn.cssClass).addClass(_const.CLASSES.groupPanelItem).data('columnData', groupColumn).appendTo($rootElement).text(groupColumn.caption);
    (0, _accessibility.setTabIndex)(this, $groupPanelItem);
    return $groupPanelItem;
  }
  getGroupAndUngroupItems(options) {
    const {
      column
    } = options;
    const contextMenuEnabled = this.option('grouping.contextMenuEnabled');
    if (contextMenuEnabled && column) {
      const isGroupingAllowed = (0, _type.isDefined)(column.allowGrouping) ? column.allowGrouping : true;
      if (isGroupingAllowed) {
        const isColumnGrouped = (0, _type.isDefined)(column.groupIndex) && column.groupIndex > -1;
        const groupingTexts = this.option('grouping.texts');
        const onItemClick = onGroupingMenuItemClick.bind(this, column, 0);
        return [{
          text: groupingTexts.ungroup,
          value: 'ungroup',
          disabled: !isColumnGrouped,
          onItemClick,
          icon: _const.CONTEXT_MENU_UNGROUP_COLUMN_ICON_NAME
        }, {
          text: groupingTexts.ungroupAll,
          value: 'ungroupAll',
          onItemClick,
          icon: _const.CONTEXT_MENU_UNGROUP_ALL_COLUMNS_ICON_NAME
        }];
      }
    }
    return [];
  }
  _columnOptionChanged(e) {
    if (!this._requireReady && !_m_core.default.checkChanges(e.optionNames, ['width', 'visibleWidth'])) {
      const $toolbarElement = this.element();
      const $groupPanel = $toolbarElement === null || $toolbarElement === void 0 ? void 0 : $toolbarElement.find(`.${_const.CLASSES.groupPanel}`);
      if ($groupPanel && $groupPanel.length) {
        this._updateGroupPanelContent($groupPanel);
        this.updateToolbarDimensions();
        this.renderCompleted.fire();
      }
    }
    super._columnOptionChanged();
  }
  _updateGroupPanelContent($groupPanel) {
    const groupColumns = this.getColumns();
    const groupPanelOptions = this.option('groupPanel');
    this._renderGroupPanelItems($groupPanel, groupColumns);
    if (groupPanelOptions.allowColumnDragging && !groupColumns.length) {
      (0, _renderer.default)('<div>').addClass(_const.CLASSES.groupPanelMessage).text(groupPanelOptions.emptyPanelText).appendTo($groupPanel);
      $groupPanel.closest(`.${_const.CLASSES.groupPanelContainer}`).addClass(_const.CLASSES.groupPanelLabel);
      $groupPanel.closest(`.${_const.CLASSES.groupPanelLabel}`).css('maxWidth', 'none');
    }
  }
  allowDragging(column) {
    const groupPanelOptions = this.option('groupPanel');
    return allowDragging(groupPanelOptions, column);
  }
  getColumnElements() {
    const $element = this.element();
    return $element === null || $element === void 0 ? void 0 : $element.find(`.${_const.CLASSES.groupPanelItem}`);
  }
  getColumns() {
    return this._columnsController.getGroupColumns();
  }
  getBoundingRect() {
    const that = this;
    const $element = that.element();
    if ($element !== null && $element !== void 0 && $element.find(`.${_const.CLASSES.groupPanel}`).length) {
      const offset = $element.offset();
      return {
        top: offset.top,
        bottom: offset.top + (0, _size.getHeight)($element)
      };
    }
    return null;
  }
  getName() {
    return 'group';
  }
  hasGroupedColumns() {
    return this._isGroupPanelVisible() && !!this.getColumns().length;
  }
  optionChanged(args) {
    if (args.name === 'groupPanel') {
      this._invalidate();
      args.handled = true;
    } else {
      super.optionChanged(args);
    }
  }
  getKeyboardNavigationController() {
    return this.getController('groupPanelKeyboardNavigation');
  }
  isColumnReorderingEnabled(column) {
    return this.allowDragging(column);
  }
  getContextMenuItems(options) {
    let items = super.getContextMenuItems(options);
    const $groupedColumnElement = (0, _renderer.default)(options.targetElement).closest(`.${_const.CLASSES.groupPanelItem}`);
    if (!$groupedColumnElement.length) {
      return;
    }
    options.column = this._columnsController.columnOption(`groupIndex:${$groupedColumnElement.index()}`);
    const groupAndUngroupItems = this.getGroupAndUngroupItems(options);
    if (groupAndUngroupItems !== null && groupAndUngroupItems !== void 0 && groupAndUngroupItems.length) {
      items = items ?? [];
      items.push(...groupAndUngroupItems);
    }
    const moveColumnItems = this.getMoveColumnContextMenuItems(options);
    if (moveColumnItems !== null && moveColumnItems !== void 0 && moveColumnItems.length) {
      items = items ?? [];
      items.push(...moveColumnItems);
    }
    return items;
  }
};
exports.GroupingHeaderPanelExtender = GroupingHeaderPanelExtender;
const GroupingRowsViewExtender = Base => class GroupingRowsViewExtender extends Base {
  getContextMenuItems(options) {
    const that = this;
    const contextMenuEnabled = that.option('grouping.contextMenuEnabled');
    let items;
    if (contextMenuEnabled && options.row && options.row.rowType === 'group') {
      const columnsController = that._columnsController;
      const column = columnsController.columnOption(`groupIndex:${options.row.groupIndex}`);
      if (column && column.allowGrouping) {
        const groupingTexts = that.option('grouping.texts');
        const onItemClick = e => {
          var _e$itemData, _e$itemData2;
          if (((_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.value) === 'ungroup') {
            columnsController.columnOption(column.dataField, 'groupIndex', -1);
          } else if (((_e$itemData2 = e.itemData) === null || _e$itemData2 === void 0 ? void 0 : _e$itemData2.value) === 'ungroupAll') {
            columnsController.clearGrouping();
          }
        };
        items = [];
        items.push({
          text: groupingTexts.ungroup,
          value: 'ungroup',
          onItemClick,
          icon: _const.CONTEXT_MENU_UNGROUP_COLUMN_ICON_NAME
        }, {
          text: groupingTexts.ungroupAll,
          value: 'ungroupAll',
          onItemClick,
          icon: _const.CONTEXT_MENU_UNGROUP_ALL_COLUMNS_ICON_NAME
        });
      }
    }
    return items;
  }
  _rowClick(e) {
    const that = this;
    const expandMode = that.option('grouping.expandMode');
    const scrollingMode = that.option('scrolling.mode');
    const isGroupRowStateChanged = scrollingMode !== 'infinite' && expandMode === 'rowClick' && (0, _renderer.default)(e.event.target).closest(`.${DATAGRID_GROUP_ROW_CLASS}`).length;
    const isExpandButtonClicked = (0, _renderer.default)(e.event.target).closest(`.${DATAGRID_EXPAND_CLASS}`).length;
    if (isGroupRowStateChanged || isExpandButtonClicked) {
      that._changeGroupRowState(e);
    }
    super._rowClick(e);
  }
  _changeGroupRowState(e) {
    const row = this._dataController.items()[e.rowIndex];
    // @ts-expect-error
    const allowCollapsing = this._columnsController.columnOption(`groupIndex:${row.groupIndex}`, 'allowCollapsing');
    if (row.rowType === 'data' || row.rowType === 'group' && allowCollapsing !== false) {
      // @ts-expect-error
      this._dataController.changeRowExpand(row.key, true);
      e.event.preventDefault();
      e.handled = true;
    }
  }
};
const columnHeadersViewExtender = Base => class GroupingHeadersViewExtender extends Base {
  getContextMenuItems(options) {
    const that = this;
    const groupItems = [];
    const contextMenuEnabled = that.option('grouping.contextMenuEnabled');
    let items = super.getContextMenuItems(options);
    if (contextMenuEnabled && options.row && (options.row.rowType === 'header' || options.row.rowType === 'detailAdaptive')) {
      const {
        column,
        rowIndex
      } = options;
      if (!column.command && (!(0, _type.isDefined)(column.allowGrouping) || column.allowGrouping)) {
        const groupingTexts = that.option('grouping.texts');
        const isColumnGrouped = (0, _type.isDefined)(column.groupIndex) && column.groupIndex > -1;
        const onItemClick = onGroupingMenuItemClick.bind(that, column, rowIndex);
        groupItems.push({
          text: groupingTexts.groupByThisColumn,
          value: 'group',
          beginGroup: true,
          disabled: isColumnGrouped,
          onItemClick,
          icon: _const.CONTEXT_MENU_GROUP_BY_COLUMN_ICON_NAME
        });
        if (column.showWhenGrouped) {
          groupItems.push({
            text: groupingTexts.ungroup,
            value: 'ungroup',
            disabled: !isColumnGrouped,
            onItemClick,
            icon: _const.CONTEXT_MENU_UNGROUP_COLUMN_ICON_NAME
          });
        }
        groupItems.push({
          text: groupingTexts.ungroupAll,
          value: 'ungroupAll',
          onItemClick,
          icon: _const.CONTEXT_MENU_UNGROUP_ALL_COLUMNS_ICON_NAME
        });
      }
    }
    if (groupItems.length) {
      items = items ?? [];
      const clearSortingItemIndex = items.findIndex(item => item.name === 'clearSorting') + 1;
      items.splice(clearSortingItemIndex, 0, ...groupItems);
    }
    return items;
  }
  allowDragging(column) {
    const groupPanelOptions = this.option('groupPanel');
    return allowDragging(groupPanelOptions, column) || super.allowDragging(column);
  }
};
_m_core.default.registerModule('grouping', {
  defaultOptions() {
    return {
      grouping: {
        autoExpandAll: true,
        allowCollapsing: true,
        contextMenuEnabled: true,
        expandMode: 'buttonClick',
        texts: {
          groupContinuesMessage: _message.default.format('dxDataGrid-groupContinuesMessage'),
          groupContinuedMessage: _message.default.format('dxDataGrid-groupContinuedMessage'),
          groupByThisColumn: _message.default.format('dxDataGrid-groupHeaderText'),
          ungroup: _message.default.format('dxDataGrid-ungroupHeaderText'),
          ungroupAll: _message.default.format('dxDataGrid-ungroupAllText')
        }
      },
      groupPanel: {
        visible: false,
        emptyPanelText: _message.default.format('dxDataGrid-groupPanelEmptyText'),
        allowColumnDragging: true
      }
    };
  },
  extenders: {
    controllers: {
      data: GroupingDataControllerExtender,
      columns: Base => class GroupingColumnsExtender extends Base {
        _getExpandColumnOptions() {
          // @ts-expect-error
          const options = super._getExpandColumnOptions.apply(this, arguments);
          // @ts-expect-error
          options.cellTemplate = _m_core.default.getExpandCellTemplate();
          return options;
        }
      },
      editing: Base => class GroupingEditingExtender extends Base {
        _isProcessedItem(item) {
          return (0, _type.isDefined)(item.groupIndex) && (0, _type.isString)(item.rowType) && item.rowType.indexOf('group') === 0;
        }
      }
    },
    views: {
      headerPanel: GroupingHeaderPanelExtender,
      rowsView: GroupingRowsViewExtender,
      columnHeadersView: columnHeadersViewExtender
    }
  }
});
