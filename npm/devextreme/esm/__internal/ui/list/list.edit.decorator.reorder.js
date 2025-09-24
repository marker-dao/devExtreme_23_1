/**
* DevExtreme (esm/__internal/ui/list/list.edit.decorator.reorder.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../../common/core/events/core/events_engine';
import holdEvent from '../../../common/core/events/hold';
import pointerEvents from '../../../common/core/events/pointer';
import { isMouseEvent } from '../../../common/core/events/utils';
import $ from '../../../core/renderer';
import { getWidth, setWidth } from '../../../core/utils/size';
import { isDefined } from '../../core/utils/m_type';
import Sortable from '../../m_sortable';
import EditDecorator from '../../ui/list/list.edit.decorator';
import { register as registerDecorator } from '../../ui/list/list.edit.decorator_registry';
const REORDER_HANDLE_CONTAINER_CLASS = 'dx-list-reorder-handle-container';
const REORDER_HANDLE_CLASS = 'dx-list-reorder-handle';
const REORDERING_ITEM_GHOST_CLASS = 'dx-list-item-ghost-reordering';
const STATE_HOVER_CLASS = 'dx-state-hover';
class EditDecoratorReorder extends EditDecorator {
  _init() {
    const list = this._list;
    const {
      grouped,
      itemDragging
    } = this._list.option();
    this._groupedEnabled = grouped;
    this._lockedDrag = false;
    const filter = this._groupedEnabled ? '> .dx-list-items > .dx-list-group > .dx-list-group-body > .dx-list-item' : '> .dx-list-items > .dx-list-item';
    this._sortable = list._createComponent(list._scrollView.content(), Sortable, _extends({
      component: list,
      contentTemplate: null,
      allowReordering: false,
      filter,
      container: list.$element().get(0),
      dragDirection: itemDragging !== null && itemDragging !== void 0 && itemDragging.group ? 'both' : 'vertical',
      handle: `.${REORDER_HANDLE_CLASS}`,
      dragTemplate: this._dragTemplate,
      // @ts-expect-error ts-error
      onDragStart: e => {
        this._dragStartHandler(e);
      },
      onDragChange: e => {
        this._dragChangeHandler(e);
      },
      onReorder: e => {
        this._reorderHandler(e);
      }
    }, itemDragging));
  }
  afterRender() {
    this._sortable.update();
  }
  _dragTemplate(e) {
    const result = $(e.itemElement).clone().addClass(REORDERING_ITEM_GHOST_CLASS).addClass(STATE_HOVER_CLASS);
    setWidth(result, getWidth(e.itemElement));
    return result;
  }
  _dragStartHandler(e) {
    if (this._lockedDrag) {
      e.cancel = true;
    }
  }
  _dragChangeHandler(e) {
    if (this._groupedEnabled && isDefined(e.fromIndex) && isDefined(e.toIndex) && !this._sameParent(e.fromIndex, e.toIndex)) {
      e.cancel = true;
    }
  }
  _sameParent(fromIndex, toIndex) {
    const $dragging = this._list.getItemElementByFlatIndex(fromIndex);
    const $over = this._list.getItemElementByFlatIndex(toIndex);
    return $over.parent().get(0) === $dragging.parent().get(0);
  }
  _reorderHandler(e) {
    const $targetElement = this._list.getItemElementByFlatIndex(e.toIndex);
    this._list.reorderItem($(e.itemElement), $targetElement);
  }
  afterBag(config) {
    const $handle = $('<div>').addClass(REORDER_HANDLE_CLASS);
    eventsEngine.on($handle, pointerEvents.down, e => {
      this._lockedDrag = !isMouseEvent(e);
    });
    eventsEngine.on($handle, holdEvent.name, {
      timeout: 30
    }, e => {
      e.cancel = true;
      this._lockedDrag = false;
    });
    config.$container.addClass(REORDER_HANDLE_CONTAINER_CLASS).append($handle);
  }
}
registerDecorator('reorder', 'default', EditDecoratorReorder);
