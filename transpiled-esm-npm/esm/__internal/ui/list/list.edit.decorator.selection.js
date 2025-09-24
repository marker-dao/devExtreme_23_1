import _extends from "@babel/runtime/helpers/esm/extends";
import { name as clickEventName } from '../../../common/core/events/click';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../common/core/events/utils';
import messageLocalization from '../../../common/core/localization/message';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import CheckBox from '../../../ui/check_box';
import errors from '../../../ui/widget/ui.errors';
import EditDecorator from '../../ui/list/list.edit.decorator';
import { register as registerDecorator } from '../../ui/list/list.edit.decorator_registry';
import RadioButton from '../../ui/radio_group/m_radio_button';
const SELECT_DECORATOR_ENABLED_CLASS = 'dx-list-select-decorator-enabled';
const SELECT_DECORATOR_SELECT_ALL_CLASS = 'dx-list-select-all';
const SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS = 'dx-list-select-all-checkbox';
const SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS = 'dx-list-select-all-label';
const SELECT_CHECKBOX_CONTAINER_CLASS = 'dx-list-select-checkbox-container';
const SELECT_CHECKBOX_CLASS = 'dx-list-select-checkbox';
const SELECT_RADIO_BUTTON_CONTAINER_CLASS = 'dx-list-select-radiobutton-container';
const SELECT_RADIO_BUTTON_CLASS = 'dx-list-select-radiobutton';
const FOCUSED_STATE_CLASS = 'dx-state-focused';
const CLICK_EVENT_NAME = addNamespace(clickEventName, 'dxListEditDecorator');
class EditDecoratorSelection extends EditDecorator {
  _init() {
    super._init();
    const {
      selectionMode
    } = this._list.option();
    this._singleStrategy = selectionMode === 'single';
    this._containerClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CONTAINER_CLASS : SELECT_CHECKBOX_CONTAINER_CLASS;
    this._controlClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CLASS : SELECT_CHECKBOX_CLASS;
    this._controlWidget = this._singleStrategy ? RadioButton : CheckBox;
    this._list.$element().addClass(SELECT_DECORATOR_ENABLED_CLASS);
  }
  beforeBag(config) {
    const {
      $itemElement
    } = config;
    const $container = config.$container.addClass(this._containerClass);
    const $control = $('<div>').addClass(this._controlClass).appendTo($container);
    // eslint-disable-next-line no-new
    new this._controlWidget($control.get(0), _extends({}, this._commonOptions(), {
      value: this._isSelected($itemElement.get(0)),
      elementAttr: {
        'aria-label': messageLocalization.format('CheckState')
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
    eventsEngine.on($itemElement, 'stateChanged', (_e, state) => {
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
      list.option('focusedElement', getPublicElement($selectAll));
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
    this._$selectAll = $('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CLASS);
    const downArrowHandler = this._list._supportedKeys().downArrow.bind(this._list);
    const selectAllCheckBoxElement = $('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS).appendTo(this._$selectAll);
    this._selectAllCheckBox = this._list._createComponent(selectAllCheckBoxElement, CheckBox, {
      elementAttr: {
        'aria-label': messageLocalization.format('dxList-selectAll')
      },
      focusStateEnabled: false,
      hoverStateEnabled: false
    });
    this._selectAllCheckBox.registerKeyHandler('downArrow', downArrowHandler);
    const {
      selectAllText = ''
    } = this._list.option();
    $('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS).text(selectAllText).appendTo(this._$selectAll);
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
    eventsEngine.off(this._$selectAll, CLICK_EVENT_NAME);
    eventsEngine.on(this._$selectAll, CLICK_EVENT_NAME, e => {
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
    const label = `${messageLocalization.format('dxList-selectAll')}, ${messageLocalization.format(`dxList-selectAll-${stateVariableName}`)}`;
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
    this._list.option('focusedElement', getPublicElement($(this._$selectAll)));
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
      errors.log('W1010');
      return false;
    }
    return true;
  }
  _selectAllItems() {
    if (!this._checkSelectAllCapability()) return Deferred().resolve();
    const {
      selectAllMode
    } = this._list.option();
    return this._list._selection.selectAll(selectAllMode === 'page');
  }
  _unselectAllItems() {
    if (!this._checkSelectAllCapability()) return Deferred().resolve();
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
registerDecorator('selection', 'default', EditDecoratorSelection);