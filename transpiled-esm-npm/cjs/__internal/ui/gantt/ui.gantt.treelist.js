"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GanttTreeList = void 0;
var _array_store = _interopRequireDefault(require("../../../common/data/array_store"));
var _data_source = _interopRequireDefault(require("../../../common/data/data_source"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _data = require("../../../core/utils/data");
var _position = require("../../../core/utils/position");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _tree_list = _interopRequireDefault(require("../../../ui/tree_list"));
var _uiGantt = require("../../ui/gantt/ui.gantt.helper");
var _uiGanttTreelist = require("../../ui/gantt/ui.gantt.treelist.nodes_state");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const GANTT_TASKS = 'tasks';
const GANTT_COLLAPSABLE_ROW = 'dx-gantt-collapsable-row';
const GANTT_DEFAULT_ROW_HEIGHT = 34;
const GANTT_SCROLL_ACTIVATION_LEVEL = 2;
class GanttTreeList {
  constructor(gantt) {
    this._gantt = gantt;
    this._$treeList = this._gantt._$treeList;
  }
  getTreeList() {
    // @ts-expect-error ts-error
    const {
      keyExpr,
      parentIdExpr
    } = this._gantt.option(GANTT_TASKS);
    this._treeList = this._gantt._createComponent(this._$treeList, _tree_list.default, {
      dataSource: this.createDataSource(this._gantt._tasksRaw, keyExpr),
      keyExpr,
      filterSyncEnabled: true,
      parentIdExpr,
      columns: this.getColumns(),
      columnResizingMode: 'nextColumn',
      height: this._getHeight(),
      width: this._gantt.option('taskListWidth'),
      selection: {
        mode: _uiGantt.GanttHelper.getSelectionMode(this._gantt.option('allowSelection'))
      },
      selectedRowKeys: _uiGantt.GanttHelper.getArrayFromOneElement(this._gantt.option('selectedRowKey')),
      sorting: this._gantt.option('sorting'),
      filterRow: this._gantt.option('filterRow'),
      headerFilter: this._gantt.option('headerFilter'),
      scrolling: {
        showScrollbar: 'onHover',
        mode: 'virtual'
      },
      allowColumnResizing: true,
      autoExpandAll: true,
      showRowLines: this._gantt.option('showRowLines'),
      rootValue: this._gantt.option('rootValue'),
      onContentReady: e => {
        this._onContentReady(e);
      },
      onSelectionChanged: e => {
        this._onSelectionChanged(e);
      },
      onRowCollapsed: e => {
        this._onRowCollapsed(e);
      },
      onRowExpanded: e => {
        this._onRowExpanded(e);
      },
      onRowPrepared: e => {
        this._onRowPrepared(e);
      },
      onContextMenuPreparing: e => {
        this._onContextMenuPreparing(e);
      },
      onRowClick: e => {
        this.onRowClick(e);
      },
      onRowDblClick: e => {
        this.onRowDblClick(e);
      },
      onNodesInitialized: () => {
        this._onNodesInitialized();
      },
      _disableDeprecationWarnings: true
    });
    return this._treeList;
  }
  onAfterTreeListCreate() {
    if (this._postponedGanttInitRequired) {
      this._initGanttOnContentReady({
        component: this._treeList
      });
      delete this._postponedGanttInitRequired;
    }
  }
  _onContentReady(e) {
    const hasTreeList = !!this._treeList;
    if (hasTreeList) {
      this._initGanttOnContentReady(e);
    } else {
      this._postponedGanttInitRequired = true;
    }
    this._gantt._onTreeListContentReady(e);
  }
  _initGanttOnContentReady(e) {
    var _this$_gantt$_sizeHel;
    if (e.component.getDataSource()) {
      this._gantt._initGanttView();
      this._initScrollSync(e.component);
    }
    this._gantt._sortAndFilter();
    (_this$_gantt$_sizeHel = this._gantt._sizeHelper) === null || _this$_gantt$_sizeHel === void 0 || _this$_gantt$_sizeHel.updateGanttRowHeights();
  }
  _onSelectionChanged(e) {
    var _this$_gantt$_actions;
    const selectedRowKey = e.currentSelectedRowKeys[0];
    this._gantt._setGanttViewOption('selectedRowKey', selectedRowKey);
    this._gantt._setOptionWithoutOptionChange('selectedRowKey', selectedRowKey);
    (_this$_gantt$_actions = this._gantt._actionsManager) === null || _this$_gantt$_actions === void 0 || _this$_gantt$_actions.raiseSelectionChangedAction(selectedRowKey);
  }
  _onRowCollapsed(e) {
    this._gantt._onTreeListRowExpandChanged(e, false);
  }
  _onRowExpanded(e) {
    this._gantt._onTreeListRowExpandChanged(e, true);
  }
  _onRowPrepared(e) {
    if (e.rowType === 'data' && e.node.children.length > 0) {
      (0, _renderer.default)(e.rowElement).addClass(GANTT_COLLAPSABLE_ROW);
    }
  }
  _onContextMenuPreparing(e) {
    var _e$row, _e$row2;
    if (e.target === 'header') {
      return;
    }
    if (((_e$row = e.row) === null || _e$row === void 0 ? void 0 : _e$row.rowType) === 'data') {
      this.setOption('selectedRowKeys', [
      // @ts-expect-error ts-error
      e.row.data[this._gantt.option('tasks.keyExpr')]]);
    }
    const info = {
      cancel: false,
      event: e.event,
      type: 'task',
      key: (_e$row2 = e.row) === null || _e$row2 === void 0 ? void 0 : _e$row2.key,
      position: {
        x: e.event.pageX,
        y: e.event.pageY
      }
    };
    this._gantt._showPopupMenu(info);
    e.event.preventDefault();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getHeight() {
    if ((0, _size.getHeight)(this._$treeList)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (0, _size.getHeight)(this._$treeList);
    }
    this._gantt._hasHeight = (0, _type.isDefined)(this._gantt.option('height'))
    // @ts-expect-error ts-error
    && this._gantt.option('height') !== '';
    return this._gantt._hasHeight ? '100%' : '';
  }
  _initScrollSync(treeList) {
    const treeListScrollable = treeList.getScrollable();
    if (treeListScrollable) {
      treeListScrollable.off('scroll');
      treeListScrollable.on('scroll', e => {
        this._onScroll(e);
      });
    }
  }
  _onScroll(treeListScrollView) {
    var _this$_gantt$_ganttVi;
    const ganttViewTaskAreaContainer = (_this$_gantt$_ganttVi = this._gantt._ganttView) === null || _this$_gantt$_ganttVi === void 0 ? void 0 : _this$_gantt$_ganttVi.getTaskAreaContainer();
    if (ganttViewTaskAreaContainer.scrollTop !== treeListScrollView.component.scrollTop()) {
      ganttViewTaskAreaContainer.scrollTop = treeListScrollView.component.scrollTop();
    }
  }
  _correctRowsViewRowHeight(height) {
    var _this$_treeList;
    // @ts-expect-error ts-error
    const view = (_this$_treeList = this._treeList) === null || _this$_treeList === void 0 || (_this$_treeList = _this$_treeList._views) === null || _this$_treeList === void 0 ? void 0 : _this$_treeList.rowsView;
    if ((view === null || view === void 0 ? void 0 : view._rowHeight) !== height) {
      view._rowHeight = height;
    }
  }
  _skipUpdateTreeListDataSource() {
    const {
      validation
    } = this._gantt.option();
    return validation === null || validation === void 0 ? void 0 : validation.autoUpdateParentTasks;
  }
  selectRows(keys) {
    this.setOption('selectedRowKeys', keys);
  }
  scrollBy(scrollTop) {
    var _this$_treeList2;
    const treeListScrollable = (_this$_treeList2 = this._treeList) === null || _this$_treeList2 === void 0 ? void 0 : _this$_treeList2.getScrollable();
    if (treeListScrollable) {
      const diff = scrollTop - treeListScrollable.scrollTop();
      if (Math.abs(diff) >= GANTT_SCROLL_ACTIVATION_LEVEL) {
        treeListScrollable.scrollBy({
          left: 0,
          top: diff
        });
      }
    }
  }
  updateDataSource(data) {
    let forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let forceCustomData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (!this._skipUpdateTreeListDataSource() || forceUpdate) {
      this.setDataSource(data);
    } else if (forceCustomData) {
      var _this$_treeList3;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const data = (_this$_treeList3 = this._treeList) === null || _this$_treeList3 === void 0 ? void 0 : _this$_treeList3.option('dataSource');
      this._gantt._onParentTasksRecalculated(data);
    }
  }
  setDataSource(data) {
    // @ts-expect-error ts-error
    this.setOption('dataSource', this.createDataSource(data));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  createDataSource(data, key) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data && new _data_source.default({
      store: new _array_store.default({
        data,
        key: key || this.getOption('keyExpr')
      })
    });
  }
  onRowClick(e) {
    var _this$_gantt$_actions2;
    (_this$_gantt$_actions2 = this._gantt._actionsManager) === null || _this$_gantt$_actions2 === void 0 || _this$_gantt$_actions2.raiseTaskClickAction(e.key, e.event);
  }
  onRowDblClick(e) {
    var _this$_gantt$_actions3;
    if ((_this$_gantt$_actions3 = this._gantt._actionsManager) !== null && _this$_gantt$_actions3 !== void 0 && _this$_gantt$_actions3.raiseTaskDblClickAction(e.key, e.event)) {
      var _this$_gantt$_ganttVi2;
      (_this$_gantt$_ganttVi2 = this._gantt._ganttView) === null || _this$_gantt$_ganttVi2 === void 0 || _this$_gantt$_ganttVi2._ganttViewCore.showTaskEditDialog();
    }
  }
  saveExpandedKeys() {
    const treeList = this._treeList;
    const visibleRowCount = treeList === null || treeList === void 0 ? void 0 : treeList.getVisibleRows().length;
    // @ts-expect-error ts-error
    if (visibleRowCount > 0) {
      const nodes = this.getAllNodes();
      const keys = this.getOption('expandedRowKeys');
      const hasExpandedRows = keys && nodes.length !== visibleRowCount;
      if (hasExpandedRows) {
        const state = this.getNodesState();
        state.applyNodes(nodes, this.getOption('rootValue'));
        state.saveExpandedState(keys);
      }
    }
  }
  _onNodesInitialized() {
    const state = this.getNodesState();
    const savedKeys = state.getExpandedKeys();
    const nodes = this.getAllNodes();
    state.applyNodes(nodes, this.getOption('rootValue'));
    const expandedKeys = state.getExpandedKeys();
    if (expandedKeys) {
      this.setOption('expandedRowKeys', expandedKeys);
    }
    if (this.isExpandedStateChanged(savedKeys, expandedKeys)) {
      var _this$_gantt$_ganttVi3;
      const expandedState = nodes.reduce((previous, node) => {
        previous[node.key] = expandedKeys
        // @ts-expect-error ts-error
        ? expandedKeys.includes(node.key) : true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return previous;
      }, {});
      (_this$_gantt$_ganttVi3 = this._gantt._ganttView) === null || _this$_gantt$_ganttVi3 === void 0 || _this$_gantt$_ganttVi3.applyTasksExpandedState(expandedState);
    }
    state.clear();
  }
  getNodesState() {
    if (!this._nodeState) {
      this._nodeState = new _uiGanttTreelist.GanttTreeListNodesState();
    }
    return this._nodeState;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getAllNodes() {
    var _this$_treeList4, _this$_treeList5;
    const store = (_this$_treeList4 = this._treeList) === null || _this$_treeList4 === void 0 || (_this$_treeList4 = _this$_treeList4.getDataSource()) === null || _this$_treeList4 === void 0 ? void 0 : _this$_treeList4.store();
    if (!store || !((_this$_treeList5 = this._treeList) !== null && _this$_treeList5 !== void 0 && _this$_treeList5.getNodeByKey)) {
      return [];
    }
    // @ts-expect-error ts-error
    const keyGetter = (0, _data.compileGetter)(store.key());
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return store._array
    // @ts-expect-error ts-error
    .map(item => {
      var _this$_treeList6;
      return (_this$_treeList6 = this._treeList) === null || _this$_treeList6 === void 0 ? void 0 : _this$_treeList6.getNodeByKey(keyGetter(item));
    }).filter(item => !!item);
  }
  isExpandedStateChanged(keys1, keys2) {
    if (keys1 === null && keys2 === null) {
      return false;
    }
    if ((keys1 === null || keys1 === void 0 ? void 0 : keys1.length) !== (keys2 === null || keys2 === void 0 ? void 0 : keys2.length)) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return keys1.some((key, index) => key !== keys2[index]);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getOffsetHeight() {
    var _this$_gantt$_treeLis;
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_gantt$_treeLis = this._gantt._treeList) === null || _this$_gantt$_treeLis === void 0 ? void 0 : _this$_gantt$_treeLis.$element().get(0).offsetHeight;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getRowHeight() {
    var _this$_treeList7;
    const $row = (_this$_treeList7 = this._treeList) === null || _this$_treeList7 === void 0 ? void 0 : _this$_treeList7.$element().find('.dx-data-row');
    let height = $row !== null && $row !== void 0 && $row.length ? (0, _position.getBoundingRect)($row === null || $row === void 0 ? void 0 : $row.last().get(0)).height : GANTT_DEFAULT_ROW_HEIGHT;
    if (!height) {
      height = GANTT_DEFAULT_ROW_HEIGHT;
    }
    this._correctRowsViewRowHeight(height);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return height;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getHeaderHeight() {
    var _this$_treeList8;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _position.getBoundingRect)((_this$_treeList8 = this._treeList) === null || _this$_treeList8 === void 0 ? void 0 : _this$_treeList8.$element().find('.dx-treelist-headers').get(0)).height;
  }
  getColumns() {
    const {
      columns
    } = this._gantt.option();
    if (columns) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < columns.length; i += 1) {
        const column = columns[i];
        // @ts-expect-error ts-error
        const isKeyColumn = column.dataField === this._gantt.option(`${GANTT_TASKS}.keyExpr`)
        // @ts-expect-error ts-error
        || column.dataField === this._gantt.option(`${GANTT_TASKS}.parentIdExpr`);
        // @ts-expect-error ts-error
        if (isKeyColumn && !column.dataType) {
          // @ts-expect-error ts-error
          column.dataType = 'object';
        }
      }
    }
    return columns;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSievedItems() {
    var _this$_treeList9;
    const rootNode = (_this$_treeList9 = this._treeList) === null || _this$_treeList9 === void 0 ? void 0 : _this$_treeList9.getRootNode();
    if (!rootNode) {
      return undefined;
    }
    const resultArray = [];
    _uiGantt.GanttHelper.convertTreeToList(rootNode, resultArray);
    const getters = _uiGantt.GanttHelper.compileGettersByOption(this._gantt.option(GANTT_TASKS));
    const validatedData = this._gantt._validateSourceData(GANTT_TASKS, resultArray);
    const mappedData = validatedData.map(_uiGantt.GanttHelper.prepareMapHandler(getters));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return mappedData;
  }
  setOption(optionName, value) {
    var _this$_treeList0;
    (_this$_treeList0 = this._treeList) === null || _this$_treeList0 === void 0 || _this$_treeList0.option(optionName, value);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getOption(optionName) {
    var _this$_treeList1;
    return (_this$_treeList1 = this._treeList) === null || _this$_treeList1 === void 0 ? void 0 : _this$_treeList1.option(optionName);
  }
  onTaskInserted(insertedId, parentId) {
    if ((0, _type.isDefined)(parentId)) {
      const expandedRowKeys = this.getOption('expandedRowKeys');
      // @ts-expect-error ts-error
      if (expandedRowKeys.indexOf(parentId) === -1) {
        // @ts-expect-error ts-error
        expandedRowKeys.push(parentId);
        this.setOption('expandedRowKeys', expandedRowKeys);
      }
    }
    this.selectRows(_uiGantt.GanttHelper.getArrayFromOneElement(insertedId));
    this.setOption('focusedRowKey', insertedId);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getDataSource() {
    var _this$_treeList10;
    return (_this$_treeList10 = this._treeList) === null || _this$_treeList10 === void 0 ? void 0 : _this$_treeList10.getDataSource();
  }
}
exports.GanttTreeList = GanttTreeList;