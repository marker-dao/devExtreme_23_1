"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSortable = void 0;
var _inferno = require("inferno");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _sortable = require("../../grid_core/inferno_wrappers/sortable");
const _excluded = ["source", "getColumnByIndex", "allowDragging", "columnChooserDragModeOpened", "onColumnMove", "columnDragTemplate", "dropFeedbackMode"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ALLOWED_DRAGGING_DISTANCE = 20;
class ColumnSortable extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.onDragStart = e => {
      const column = this.props.getColumnByIndex(e.fromIndex);
      const {
        source
      } = this.props;
      const isDraggable = this.isColumnDraggable(column);
      if (!isDraggable) {
        e.cancel = true;
        return;
      }
      e.itemData = {
        column,
        status: 'moving',
        source,
        destination: source
      };
      e.itemData = _extends({}, e.itemData, this.getNeighborColumns(e));
    };
    this.onDragMove = e => {
      // @ts-expect-error
      const destination = e.toComponent.option('_source');
      const {
        columnBefore,
        columnAfter
      } = this.getNeighborColumns(e);
      e.itemData.columnBefore = columnBefore;
      e.itemData.columnAfter = columnAfter;
      e.itemData.destination = destination;
      e.itemData.status = this.getDraggingStatus(e);
      this.renderDragTemplate(e.itemData);
    };
    this.onColumnMove = e => {
      if (e.itemData.status === 'forbid') {
        return;
      }
      this.props.onColumnMove(e.itemData.column, e.toIndex, e.itemData);
    };
    // TODO: move all none-native approaches to sortable wrapper
    this.renderDragTemplate = itemData => {
      if (!itemData || !this.dragItemContainer) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const DragTemplate = this.props.columnDragTemplate;
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, DragTemplate, {
        "column": itemData.column,
        "status": itemData.status,
        "isDragging": true
      }), this.dragItemContainer);
    };
  }
  render() {
    const _this$props = this.props,
      {
        source,
        allowDragging,
        columnChooserDragModeOpened,
        columnDragTemplate,
        dropFeedbackMode
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    const needSortable = allowDragging || columnChooserDragModeOpened;
    if (!needSortable) {
      return this.props.children;
    }
    const dragTemplate = columnDragTemplate ? (e, container) => {
      this.dragItemContainer = (0, _renderer.default)(container).get(0);
      this.renderDragTemplate(e.itemData);
    } : undefined;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _sortable.Sortable, _extends({}, restProps, {
      "dropFeedbackMode": dropFeedbackMode ?? 'indicate',
      "onDragStart": this.onDragStart,
      "group": 'dx-cardview-columns',
      "onAdd": this.onColumnMove,
      "onReorder": this.onColumnMove,
      "onDragMove": this.onDragMove,
      "dragTemplate": dragTemplate,
      "_source": source,
      children: this.props.children
    })));
  }
  isColumnDraggable(column) {
    if (this.props.source === 'header-panel-main') {
      const canBeHidden = column.allowHiding && !!this.props.columnChooserDragModeOpened;
      return column.allowReordering || canBeHidden;
    }
    if (this.props.source === 'column-chooser') {
      return true;
    }
    return false;
  }
  getDraggingStatus(e) {
    const {
      column,
      source,
      destination,
      columnBefore,
      columnAfter
    } = e.itemData;
    const containerRect = (0, _renderer.default)(e.element).get(0).getBoundingClientRect();
    // @ts-expect-error
    const mouseX = e.event.clientX;
    // @ts-expect-error
    const mouseY = e.event.clientY;
    const yDistance = Math.min(Math.abs(mouseY - containerRect.y), Math.abs(mouseY - (containerRect.y + containerRect.height)));
    const isMouseOnSourceContainer = mouseX >= containerRect.x && mouseX <= containerRect.x + containerRect.width && mouseY >= containerRect.y && mouseY <= containerRect.y + containerRect.height;
    if (source === 'column-chooser' && destination === 'header-panel-main') {
      return 'moving';
    }
    if (source === 'header-panel-main' && destination === 'column-chooser') {
      return column.allowHiding ? 'moving' : 'forbid';
    }
    if (source === 'header-panel-main' && destination === 'header-panel-main') {
      const isDragCloseEnough = yDistance <= ALLOWED_DRAGGING_DISTANCE;
      const canReorder = column.allowReordering;
      const canInsert = !!(columnBefore !== null && columnBefore !== void 0 && columnBefore.allowReordering) || !!(columnAfter !== null && columnAfter !== void 0 && columnAfter.allowReordering);
      const isMoving = isDragCloseEnough && canInsert && canReorder;
      return isMoving ? 'moving' : 'forbid';
    }
    if (source === 'column-chooser' && destination === 'column-chooser') {
      const isMoving = isMouseOnSourceContainer;
      return isMoving ? 'moving' : 'forbid';
    }
    return 'forbid';
  }
  getNeighborColumns(e) {
    const {
      source,
      destination
    } = e.itemData;
    if (destination !== 'header-panel-main') {
      return {
        columnBefore: undefined,
        columnAfter: undefined
      };
    }
    const column = e.itemData.column;
    const toIndex = e.toIndex ?? column.headerPanelIndex;
    const {
      visibleColumns
    } = this.props;
    if (source === 'header-panel-main') {
      const isMovingLeft = toIndex < column.headerPanelIndex;
      return isMovingLeft ? {
        columnBefore: visibleColumns[toIndex - 1],
        columnAfter: visibleColumns[toIndex]
      } : {
        columnBefore: visibleColumns[toIndex],
        columnAfter: visibleColumns[toIndex + 1]
      };
    }
    if (source === 'column-chooser') {
      return {
        columnBefore: visibleColumns[toIndex - 1],
        columnAfter: visibleColumns[toIndex]
      };
    }
    return {
      columnBefore: undefined,
      columnAfter: undefined
    };
  }
}
exports.ColumnSortable = ColumnSortable;