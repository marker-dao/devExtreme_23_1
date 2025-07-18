"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSortable = void 0;
var _inferno = require("inferno");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _combine_classes = require("../../../../core/utils/combine_classes");
var _icon = require("../../grid_core/icon");
var _sortable = require("../../grid_core/inferno_wrappers/sortable");
const _excluded = ["source", "getColumnByIndex", "allowDragging", "onColumnMove", "columnDragTemplate", "dropFeedbackMode"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ALLOWED_DRAGGING_DISTANCE = 20;
const CLASS = {
  widget: 'dx-widget',
  columnSortable: 'dx-cardview-column-sortable',
  dropzone: 'dx-cardview-dropzone',
  dropzoneVisible: 'dx-cardview-dropzone-visible'
};
class ColumnSortable extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.onDragStart = e => {
      var _this$props$isColumnD, _this$props, _this$props$onDragSta, _this$props2;
      const column = this.props.getColumnByIndex(e.fromIndex);
      const isDraggable = ((_this$props$isColumnD = (_this$props = this.props).isColumnDraggable) === null || _this$props$isColumnD === void 0 ? void 0 : _this$props$isColumnD.call(_this$props, column)) ?? true;
      if (!isDraggable) {
        e.cancel = true;
        return;
      }
      const {
        source
      } = this.props;
      e.itemData = {
        column,
        status: 'moving',
        source,
        destination: source
      };
      e.itemData = _extends({}, e.itemData, this.getNeighborColumns(e));
      (_this$props$onDragSta = (_this$props2 = this.props).onDragStart) === null || _this$props$onDragSta === void 0 || _this$props$onDragSta.call(_this$props2, e);
    };
    this.onDraggableElementShown = e => {
      // add dx-widget for correct font
      (0, _renderer.default)(e.dragElement).addClass(CLASS.widget);
      (0, _renderer.default)(e.dragElement).addClass(CLASS.columnSortable);
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
      var _this$props$onColumnM, _this$props3;
      if (e.itemData.status === 'forbid') {
        return;
      }
      (_this$props$onColumnM = (_this$props3 = this.props).onColumnMove) === null || _this$props$onColumnM === void 0 || _this$props$onColumnM.call(_this$props3, e.itemData.column, e.toIndex, e.itemData);
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
    const _this$props4 = this.props,
      {
        source,
        allowDragging,
        columnDragTemplate,
        dropFeedbackMode
      } = _this$props4,
      restProps = _objectWithoutPropertiesLoose(_this$props4, _excluded);
    const needSortable = allowDragging ?? true;
    if (!needSortable) {
      return this.props.children;
    }
    const dragTemplate = columnDragTemplate ? (e, container) => {
      this.dragItemContainer = (0, _renderer.default)(container).get(0);
      this.renderDragTemplate(e.itemData);
    } : undefined;
    const dropzoneClasses = (0, _combine_classes.combineClasses)({
      [CLASS.dropzone]: true,
      [CLASS.dropzoneVisible]: !!this.props.showDropzone
    });
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _sortable.Sortable, _extends({
      "boundary": 'body'
    }, restProps, {
      "dropFeedbackMode": dropFeedbackMode ?? 'indicate',
      "onDragStart": this.onDragStart,
      "group": 'dx-cardview-columns',
      "onAdd": this.onColumnMove,
      "onReorder": this.onColumnMove,
      "onDragMove": this.onDragMove,
      "dragTemplate": dragTemplate,
      "_source": source,
      "onPlaceholderPrepared": this.props.onPlaceholderPrepared,
      "onDraggableElementShown": this.onDraggableElementShown,
      children: [this.props.children, (0, _inferno.createVNode)(1, "div", dropzoneClasses, [(0, _inferno.createComponentVNode)(2, _icon.Icon, {
        "name": 'dropzone'
      }), (0, _inferno.createVNode)(1, "span", null, _message.default.format('dxCardView-headerItemDropZoneText'), 0)], 4)]
    })));
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