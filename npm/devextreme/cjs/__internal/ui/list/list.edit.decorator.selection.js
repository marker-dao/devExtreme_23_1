/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.selection.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _utils = require("../../../common/core/events/utils");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _check_box = _interopRequireDefault(require("../../../ui/check_box"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _listEdit = _interopRequireDefault(require("../../ui/list/list.edit.decorator"));
var _listEdit2 = require("../../ui/list/list.edit.decorator_registry");
var _m_radio_button = _interopRequireDefault(require("../../ui/radio_group/m_radio_button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SELECT_DECORATOR_ENABLED_CLASS = 'dx-list-select-decorator-enabled';
const SELECT_DECORATOR_SELECT_ALL_CLASS = 'dx-list-select-all';
const SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS = 'dx-list-select-all-checkbox';
const SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS = 'dx-list-select-all-label';
const SELECT_CHECKBOX_CONTAINER_CLASS = 'dx-list-select-checkbox-container';
const SELECT_CHECKBOX_CLASS = 'dx-list-select-checkbox';
const SELECT_RADIO_BUTTON_CONTAINER_CLASS = 'dx-list-select-radiobutton-container';
const SELECT_RADIO_BUTTON_CLASS = 'dx-list-select-radiobutton';
const FOCUSED_STATE_CLASS = 'dx-state-focused';
const CLICK_EVENT_NAME = (0, _utils.addNamespace)(_click.name, 'dxListEditDecorator');
class EditDecoratorSelection extends _listEdit.default {
  _init() {
    super._init();
    const {
      selectionMode
    } = this._list.option();
    this._singleStrategy = selectionMode === 'single';
    this._containerClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CONTAINER_CLASS : SELECT_CHECKBOX_CONTAINER_CLASS;
    this._controlClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CLASS : SELECT_CHECKBOX_CLASS;
    this._controlWidget = this._singleStrategy ? _m_radio_button.default : _check_box.default;
    this._list.$element().addClass(SELECT_DECORATOR_ENABLED_CLASS);
  }
  beforeBag(config) {
    const {
      $itemElement
    } = config;
    const $container = config.$container.addClass(this._containerClass);
    const $control = (0, _renderer.default)('<div>').addClass(this._controlClass).appendTo($container);
    // eslint-disable-next-line no-new
    new this._controlWidget($control.get(0), _extends({}, this._commonOptions(), {
      value: this._isSelected($itemElement.get(0)),
      elementAttr: {
        'aria-label': _message.default.format('CheckState')
      },
      focusStateEnabled: false,
      hoverStateEnabled: false,
      onValueChanged: e => {
        const {
          value,
          component,
          event
        } = e;
        const isUiClick = !!event;
        if (isUiClick) {
          component._valueChangeEventInstance = undefined;
          component.option('value', !value);
        }
      }
    }));
  }
  modifyElement(config) {
    super.modifyElement(config);
    const {
      $itemElement
    } = config;
    const control = this._controlWidget.getInstance($itemElement.find(`.${this._controlClass}`).get(0));
    _events_engine.default.on($itemElement, 'stateChanged', (_e, state) => {
      control.option('value', state);
    });
  }
  _updateSelectAllState() {
    var _this$_selectAllCheck;
    if (!this._$selectAll) {
      return;
    }
    (_this$_selectAllCheck = this._selectAllCheckBox) === null || _this$_selectAllCheck === void 0 || _this$_selectAllCheck.option('value', this._list.isSelectAll());
  }
  afterRender() {
    const {
      selectionMode
    } = this._list.option();
    if (selectionMode !== 'all') {
      return;
    }
    if (!this._$selectAll) {
      this._renderSelectAll();
    } else {
      this._updateSelectAllState();
    }
  }
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
    const moveFocusDown = !moveFocusUp;
    const list = this._list;
    const $selectAll = this._$selectAll;
    const lastItemIndex = list._getLastItemIndex();
    const isFocusOutOfList = moveFocusUp && currentFocusedIndex === 0
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    || moveFocusDown && currentFocusedIndex === lastItemIndex;
    const hasSelectAllItem = !!$selectAll;
    if (hasSelectAllItem && isFocusOutOfList) {
      list.option('focusedElement', (0, _element.getPublicElement)($selectAll));
      const {
        focusedElement
      } = list.option();
      if (focusedElement) {
        list.scrollToItem(focusedElement);
      }
      return true;
    }
    return false;
  }
  handleEnterPressing(e) {
    var _this$_$selectAll;
    if ((_this$_$selectAll = this._$selectAll) !== null && _this$_$selectAll !== void 0 && _this$_$selectAll.hasClass(FOCUSED_STATE_CLASS)) {
      e.target = this._$selectAll.get(0);
      this._selectAllHandler(e);
      return true;
    }
    return false;
  }
  _renderSelectAll() {
    this._$selectAll = (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CLASS);
    const downArrowHandler = this._list._supportedKeys().downArrow.bind(this._list);
    const selectAllCheckBoxElement = (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS).appendTo(this._$selectAll);
    this._selectAllCheckBox = this._list._createComponent(selectAllCheckBoxElement, _check_box.default, {
      elementAttr: {
        'aria-label': _message.default.format('dxList-selectAll')
      },
      focusStateEnabled: false,
      hoverStateEnabled: false
    });
    this._selectAllCheckBox.registerKeyHandler('downArrow', downArrowHandler);
    const {
      selectAllText = ''
    } = this._list.option();
    (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS).text(selectAllText).appendTo(this._$selectAll);
    this._list.itemsContainer().prepend(this._$selectAll);
    this._updateSelectAllState();
    this._updateSelectAllAriaLabel();
    this._attachSelectAllHandler();
  }
  _attachSelectAllHandler() {
    var _this$_selectAllCheck2;
    (_this$_selectAllCheck2 = this._selectAllCheckBox) === null || _this$_selectAllCheck2 === void 0 || _this$_selectAllCheck2.option('onValueChanged', e => {
      const {
        value,
        component,
        event
      } = e;
      const isUiClick = !!event;
      if (isUiClick) {
        // @ts-expect-error ts-error
        component._setOptionWithoutOptionChange('value', !value);
        return;
      }
      this._updateSelectAllAriaLabel();
      this._list._createActionByOption('onSelectAllValueChanged')({
        value
      });
    });
    _events_engine.default.off(this._$selectAll, CLICK_EVENT_NAME);
    _events_engine.default.on(this._$selectAll, CLICK_EVENT_NAME, e => {
      this._selectAllHandler(e);
    });
  }
  _updateSelectAllAriaLabel() {
    var _this$_selectAllCheck3;
    if (!this._$selectAll) {
      return;
    }
    const {
      value
    } = ((_this$_selectAllCheck3 = this._selectAllCheckBox) === null || _this$_selectAllCheck3 === void 0 ? void 0 : _this$_selectAllCheck3.option()) ?? {};
    const indeterminate = value === undefined;
    const checkedState = value ? 'checked' : 'notChecked';
    const stateVariableName = indeterminate ? 'indeterminate' : checkedState;
    const label = `${_message.default.format('dxList-selectAll')}, ${_message.default.format(`dxList-selectAll-${stateVariableName}`)}`;
    // @ts-expect-error ts-error
    this._$selectAll.attr({
      'aria-label': label
    });
  }
  _selectAllHandler(event) {
    var _this$_selectAllCheck4;
    event.stopPropagation();
    this._list._saveSelectionChangeEvent(event);
    const {
      value
    } = ((_this$_selectAllCheck4 = this._selectAllCheckBox) === null || _this$_selectAllCheck4 === void 0 ? void 0 : _this$_selectAllCheck4.option()) ?? {};
    const selectionDeferred = value ? this._unselectAllItems() : this._selectAllItems();
    this._list.option('focusedElement', (0, _element.getPublicElement)((0, _renderer.default)(this._$selectAll)));
    return selectionDeferred;
  }
  _checkSelectAllCapability() {
    const list = this._list;
    const dataController = list._dataController;
    const {
      selectAllMode,
      grouped
    } = list.option();
    if (selectAllMode === 'allPages' && grouped && !dataController.group()) {
      _ui.default.log('W1010');
      return false;
    }
    return true;
  }
  _selectAllItems() {
    if (!this._checkSelectAllCapability()) return (0, _deferred.Deferred)().resolve();
    const {
      selectAllMode
    } = this._list.option();
    return this._list._selection.selectAll(selectAllMode === 'page');
  }
  _unselectAllItems() {
    if (!this._checkSelectAllCapability()) return (0, _deferred.Deferred)().resolve();
    const {
      selectAllMode
    } = this._list.option();
    return this._list._selection.deselectAll(selectAllMode === 'page');
  }
  _isSelected(itemElement) {
    return this._list.isItemSelected(itemElement);
  }
  dispose() {
    this._disposeSelectAll();
    this._list.$element().removeClass(SELECT_DECORATOR_ENABLED_CLASS);
    super.dispose();
  }
  _disposeSelectAll() {
    if (this._$selectAll) {
      this._$selectAll.remove();
      this._$selectAll = null;
    }
  }
}
(0, _listEdit2.register)('selection', 'default', EditDecoratorSelection);
