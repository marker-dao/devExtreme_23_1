"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowDraggingModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/../core/renderer"));
var _extend = require("../../../../core/../core/utils/extend");
var _common = require("../../../../core/utils/common");
var _size = require("../../../../core/utils/size");
var _sortable = _interopRequireDefault(require("../../../../ui/sortable"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");
var _dom = require("./dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RowDraggingExtender = {
  init() {
    this.callBase.apply(this, arguments);
    this._updateHandleColumn();
  },
  _allowReordering() {
    const rowDragging = this.option('rowDragging');
    return !!(rowDragging && (rowDragging.allowReordering || rowDragging.allowDropInsideItem || rowDragging.group));
  },
  _updateHandleColumn() {
    const rowDragging = this.option('rowDragging');
    const allowReordering = this._allowReordering();
    const columnsController = this._columnsController;
    const isHandleColumnVisible = allowReordering && rowDragging.showDragIcons;
    columnsController === null || columnsController === void 0 ? void 0 : columnsController.addCommandColumn({
      type: 'drag',
      command: 'drag',
      visibleIndex: -2,
      alignment: 'center',
      elementAttr: [{
        name: _const.ATTRIBUTES.dragCell,
        value: ''
      }],
      cssClass: _const.CLASSES.commandDrag,
      width: 'auto',
      cellTemplate: this._getHandleTemplate(),
      visible: isHandleColumnVisible
    });
    columnsController === null || columnsController === void 0 ? void 0 : columnsController.columnOption('type:drag', 'visible', isHandleColumnVisible);
  },
  _renderContent() {
    const rowDragging = this.option('rowDragging');
    const allowReordering = this._allowReordering();
    const $content = this.callBase.apply(this, arguments);
    const isFixedTableRendering = this._isFixedTableRendering;
    const sortableName = '_sortable';
    const sortableFixedName = '_sortableFixed';
    const currentSortableName = isFixedTableRendering ? sortableFixedName : sortableName;
    const anotherSortableName = isFixedTableRendering ? sortableName : sortableFixedName;
    const togglePointerEventsStyle = toggle => {
      var _a;
      // T929503
      (_a = this[sortableFixedName]) === null || _a === void 0 ? void 0 : _a.$element().css('pointerEvents', toggle ? 'auto' : '');
    };
    const rowSelector = '.dx-row:not(.dx-freespace-row):not(.dx-virtual-row):not(.dx-header-row):not(.dx-footer-row)';
    const filter = this.option('dataRowTemplate') ? "> table > tbody".concat(rowSelector) : "> table > tbody > ".concat(rowSelector);
    if ((allowReordering || this[currentSortableName]) && $content.length) {
      this[currentSortableName] = this._createComponent($content, _sortable.default, (0, _extend.extend)({
        component: this.component,
        contentTemplate: null,
        filter,
        cursorOffset: options => {
          const {
            event
          } = options;
          const rowsViewOffset = (0, _renderer.default)(this.element()).offset();
          return {
            // @ts-expect-error
            x: event.pageX - rowsViewOffset.left
          };
        },
        onDraggableElementShown: e => {
          if (rowDragging.dragTemplate) {
            return;
          }
          const $dragElement = (0, _renderer.default)(e.dragElement);
          const gridInstance = $dragElement.children('.dx-widget').data(this.component.NAME);
          this._synchronizeScrollLeftPosition(gridInstance);
        },
        dragTemplate: this._getDraggableRowTemplate(),
        handle: rowDragging.showDragIcons && ".".concat(_const.CLASSES.commandDrag),
        dropFeedbackMode: 'indicate'
      }, rowDragging, {
        onDragStart: e => {
          var _a, _b;
          (_a = this.getController('keyboardNavigation')) === null || _a === void 0 ? void 0 : _a._resetFocusedCell();
          const row = e.component.getVisibleRows()[e.fromIndex];
          e.itemData = row && row.data;
          const isDataRow = row && row.rowType === 'data';
          e.cancel = !allowReordering || !isDataRow;
          (_b = rowDragging.onDragStart) === null || _b === void 0 ? void 0 : _b.call(rowDragging, e);
        },
        onDragEnter: () => {
          togglePointerEventsStyle(true);
        },
        onDragLeave: () => {
          togglePointerEventsStyle(false);
        },
        onDragEnd: e => {
          var _a;
          togglePointerEventsStyle(false);
          (_a = rowDragging.onDragEnd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
        },
        onAdd: e => {
          var _a;
          togglePointerEventsStyle(false);
          (_a = rowDragging.onAdd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
        },
        dropFeedbackMode: rowDragging.dropFeedbackMode,
        onOptionChanged: e => {
          const hasFixedSortable = this[sortableFixedName];
          if (hasFixedSortable) {
            if (e.name === 'fromIndex' || e.name === 'toIndex') {
              this[anotherSortableName].option(e.name, e.value);
            }
          }
        }
      }));
      $content.toggleClass('dx-scrollable-container', isFixedTableRendering);
      $content.toggleClass(_const.CLASSES.sortableWithoutHandle, allowReordering && !rowDragging.showDragIcons);
    }
    return $content;
  },
  _renderCore(e) {
    this.callBase.apply(this, arguments);
    if (e && e.changeType === 'update' && e.repaintChangesOnly && _m_utils.default.isVirtualRowRendering(this)) {
      (0, _common.deferUpdate)(() => {
        this._updateSortable();
      });
    }
  },
  _updateSortable() {
    const offset = this._dataController.getRowIndexOffset();
    [this._sortable, this._sortableFixed].forEach(sortable => {
      sortable === null || sortable === void 0 ? void 0 : sortable.option('offset', offset);
      sortable === null || sortable === void 0 ? void 0 : sortable.update();
    });
  },
  _resizeCore() {
    this.callBase.apply(this, arguments);
    this._updateSortable();
  },
  _getDraggableGridOptions(options) {
    const gridOptions = this.option();
    const columns = this.getColumns();
    const $rowElement = (0, _renderer.default)(this.getRowElement(options.rowIndex));
    return {
      dataSource: [{
        id: 1,
        parentId: 0
      }],
      showBorders: true,
      showColumnHeaders: false,
      scrolling: {
        useNative: false,
        showScrollbar: 'never'
      },
      pager: {
        visible: false
      },
      loadingTimeout: null,
      columnFixing: gridOptions.columnFixing,
      columnAutoWidth: gridOptions.columnAutoWidth,
      showColumnLines: gridOptions.showColumnLines,
      columns: columns.map(column => ({
        width: column.width || column.visibleWidth,
        fixed: column.fixed,
        fixedPosition: column.fixedPosition
      })),
      onRowPrepared: e => {
        const rowsView = e.component.getView('rowsView');
        (0, _renderer.default)(e.rowElement).replaceWith($rowElement.eq(rowsView._isFixedTableRendering ? 1 : 0).clone());
      }
    };
  },
  _synchronizeScrollLeftPosition(gridInstance) {
    const scrollable = gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.getScrollable();
    scrollable === null || scrollable === void 0 ? void 0 : scrollable.scrollTo({
      x: this._scrollLeft
    });
  },
  _getDraggableRowTemplate() {
    return options => {
      const $rootElement = this.component.$element();
      const $dataGridContainer = (0, _renderer.default)('<div>');
      (0, _size.setWidth)($dataGridContainer, (0, _size.getWidth)($rootElement));
      const items = this._dataController.items();
      const row = items && items[options.fromIndex];
      const gridOptions = this._getDraggableGridOptions(row);
      this._createComponent($dataGridContainer, this.component.NAME, gridOptions);
      $dataGridContainer.find('.dx-gridbase-container').children(":not(.".concat(this.addWidgetPrefix(_const.CLASSES.rowsView), ")")).hide();
      $dataGridContainer.addClass(this.addWidgetPrefix(_const.CLASSES.dragView));
      return $dataGridContainer;
    };
  },
  _getHandleTemplate() {
    return _dom.GridCoreRowDraggingDom.createHandleTemplateFunc(string => this.addWidgetPrefix(string));
  },
  optionChanged(args) {
    if (args.name === 'rowDragging') {
      this._updateHandleColumn();
      this._invalidate(true, true);
      args.handled = true;
    }
    this.callBase.apply(this, arguments);
  }
};
const rowDraggingModule = {
  defaultOptions() {
    return {
      rowDragging: {
        showDragIcons: true,
        dropFeedbackMode: 'indicate',
        allowReordering: false,
        allowDropInsideItem: false
      }
    };
  },
  extenders: {
    views: {
      rowsView: RowDraggingExtender
    }
  }
};
exports.rowDraggingModule = rowDraggingModule;