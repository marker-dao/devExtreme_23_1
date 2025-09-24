"use strict";

var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _hold = _interopRequireDefault(require("../../../common/core/events/hold"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _utils = require("../../../common/core/events/utils");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _m_type = require("../../core/utils/m_type");
var _m_sortable = _interopRequireDefault(require("../../m_sortable"));
var _listEdit = _interopRequireDefault(require("../../ui/list/list.edit.decorator"));
var _listEdit2 = require("../../ui/list/list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const REORDER_HANDLE_CONTAINER_CLASS = 'dx-list-reorder-handle-container';
const REORDER_HANDLE_CLASS = 'dx-list-reorder-handle';
const REORDERING_ITEM_GHOST_CLASS = 'dx-list-item-ghost-reordering';
const STATE_HOVER_CLASS = 'dx-state-hover';
class EditDecoratorReorder extends _listEdit.default {
  _init() {
    const list = this._list;
    const {
      grouped,
      itemDragging
    } = this._list.option();
    this._groupedEnabled = grouped;
    this._lockedDrag = false;
    const filter = this._groupedEnabled ? '> .dx-list-items > .dx-list-group > .dx-list-group-body > .dx-list-item' : '> .dx-list-items > .dx-list-item';
    this._sortable = list._createComponent(list._scrollView.content(), _m_sortable.default, _extends({
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
    const result = (0, _renderer.default)(e.itemElement).clone().addClass(REORDERING_ITEM_GHOST_CLASS).addClass(STATE_HOVER_CLASS);
    (0, _size.setWidth)(result, (0, _size.getWidth)(e.itemElement));
    return result;
  }
  _dragStartHandler(e) {
    if (this._lockedDrag) {
      e.cancel = true;
    }
  }
  _dragChangeHandler(e) {
    if (this._groupedEnabled && (0, _m_type.isDefined)(e.fromIndex) && (0, _m_type.isDefined)(e.toIndex) && !this._sameParent(e.fromIndex, e.toIndex)) {
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
    this._list.reorderItem((0, _renderer.default)(e.itemElement), $targetElement);
  }
  afterBag(config) {
    const $handle = (0, _renderer.default)('<div>').addClass(REORDER_HANDLE_CLASS);
    _events_engine.default.on($handle, _pointer.default.down, e => {
      this._lockedDrag = !(0, _utils.isMouseEvent)(e);
    });
    _events_engine.default.on($handle, _hold.default.name, {
      timeout: 30
    }, e => {
      e.cancel = true;
      this._lockedDrag = false;
    });
    config.$container.addClass(REORDER_HANDLE_CONTAINER_CLASS).append($handle);
  }
}
(0, _listEdit2.register)('reorder', 'default', EditDecoratorReorder);