/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/column_sortable.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["source", "getColumnByIndex", "allowDragging", "onColumnMove", "columnDragTemplate", "dropFeedbackMode"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import $ from '../../../../../core/renderer';
import messageLocalization from '../../../../../localization/message';
import { combineClasses } from '../../../../core/utils/combine_classes';
import { Component, render } from 'inferno';
import { Icon } from '../../grid_core/icon';
import { Sortable } from '../../grid_core/inferno_wrappers/sortable';
const ALLOWED_DRAGGING_DISTANCE = 20;
const CLASS = {
  widget: 'dx-widget',
  columnSortable: 'dx-cardview-column-sortable',
  dropzone: 'dx-cardview-dropzone',
  dropzoneVisible: 'dx-cardview-dropzone-visible'
};
export class ColumnSortable extends Component {
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
      $(e.dragElement).addClass(CLASS.widget);
      $(e.dragElement).addClass(CLASS.columnSortable);
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
      render(createComponentVNode(2, DragTemplate, {
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
      this.dragItemContainer = $(container).get(0);
      this.renderDragTemplate(e.itemData);
    } : undefined;
    const dropzoneClasses = combineClasses({
      [CLASS.dropzone]: true,
      [CLASS.dropzoneVisible]: !!this.props.showDropzone
    });
    return normalizeProps(createComponentVNode(2, Sortable, _extends({
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
      children: [this.props.children, createVNode(1, "div", dropzoneClasses, [createComponentVNode(2, Icon, {
        "name": 'dropzone'
      }), createVNode(1, "span", null, messageLocalization.format('dxCardView-headerItemDropZoneText'), 0)], 4)]
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
    const containerRect = $(e.element).get(0).getBoundingClientRect();
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
