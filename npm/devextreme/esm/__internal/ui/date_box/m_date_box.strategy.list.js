/**
* DevExtreme (esm/__internal/ui/date_box/m_date_box.strategy.list.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../../ui/list/modules/m_selection';
import dateLocalization from '../../../common/core/localization/date';
import { ensureDefined, noop } from '../../../core/utils/common';
import dateSerialization from '../../../core/utils/date_serialization';
import { getHeight, getOuterHeight } from '../../../core/utils/size';
import { isDate } from '../../../core/utils/type';
import { getWindow } from '../../../core/utils/window';
import { getSizeValue } from '../../ui/drop_down_editor/m_utils';
import List from '../../ui/list/m_list.edit.search';
import DateBoxStrategy from './m_date_box.strategy';
import dateUtils from './m_date_utils';
const window = getWindow();
const DATE_FORMAT = 'date';
const BOUNDARY_VALUES = {
  min: new Date(0, 0, 0, 0, 0),
  max: new Date(0, 0, 0, 23, 59)
};
class ListStrategy extends DateBoxStrategy {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = 'List';
  }
  supportedKeys() {
    return {
      space: noop,
      home: noop,
      end: noop
    };
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      applyValueMode: 'instantly'
    });
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || 'shorttime';
  }
  popupConfig(popupConfig) {
    return popupConfig;
  }
  getValue() {
    const selectedIndex = this._widget.option('selectedIndex');
    if (selectedIndex === -1) {
      return this.dateBox.option('value');
    }
    const itemData = this._widgetItems[selectedIndex];
    return this._getDateByItemData(itemData);
  }
  useCurrentDateByDefault() {
    return true;
  }
  getDefaultDate() {
    // @ts-expect-error ts-error
    return new Date(null);
  }
  popupShowingHandler() {
    this.dateBox._dimensionChanged();
  }
  _renderWidget() {
    super._renderWidget();
    this._refreshItems();
  }
  _getWidgetName() {
    return List;
  }
  _getWidgetOptions() {
    return {
      itemTemplate: this._timeListItemTemplate.bind(this),
      onItemClick: this._listItemClickHandler.bind(this),
      tabIndex: -1,
      onFocusedItemChanged: this._refreshActiveDescendant.bind(this),
      selectionMode: 'single'
    };
  }
  _refreshActiveDescendant(e) {
    this.dateBox.setAria('activedescendant', '');
    this.dateBox.setAria('activedescendant', e.actionValue);
  }
  _refreshItems() {
    this._widgetItems = this._getTimeListItems();
    this._widget.option('items', this._widgetItems);
  }
  renderOpenedState() {
    if (!this._widget) {
      return;
    }
    this._widget.option('focusedElement', null);
    this._setSelectedItemsByValue();
    if (this._widget.option('templatesRenderAsynchronously')) {
      this._asyncScrollTimeout = setTimeout(this._scrollToSelectedItem.bind(this));
    } else {
      this._scrollToSelectedItem();
    }
  }
  dispose() {
    super.dispose();
    clearTimeout(this._asyncScrollTimeout);
  }
  _updateValue() {
    if (!this._widget) {
      return;
    }
    this._refreshItems();
    this._setSelectedItemsByValue();
    this._scrollToSelectedItem();
  }
  _setSelectedItemsByValue() {
    const value = this.dateBoxValue();
    const dateIndex = this._getDateIndex(value);
    if (dateIndex === -1) {
      this._widget.option('selectedItems', []);
    } else {
      this._widget.option('selectedIndex', dateIndex);
    }
  }
  _scrollToSelectedItem() {
    this._widget.scrollToItem(this._widget.option('selectedIndex'));
  }
  _getDateIndex(date) {
    let result = -1;
    for (let i = 0, n = this._widgetItems.length; i < n; i++) {
      if (this._areDatesEqual(date, this._widgetItems[i])) {
        result = i;
        break;
      }
    }
    return result;
  }
  _areDatesEqual(first, second) {
    return isDate(first) && isDate(second) && first.getHours() === second.getHours() && first.getMinutes() === second.getMinutes();
  }
  _getTimeListItems() {
    let min = this.dateBox.dateOption('min') || this._getBoundaryDate('min');
    const max = this.dateBox.dateOption('max') || this._getBoundaryDate('max');
    const value = this.dateBox.dateOption('value') || null;
    let delta = max - min;
    const minutes = min.getMinutes() % this.dateBox.option('interval');
    if (delta < 0) {
      return [];
    }
    if (delta > dateUtils.ONE_DAY) {
      delta = dateUtils.ONE_DAY;
    }
    if (value - min < dateUtils.ONE_DAY) {
      return this._getRangeItems(min, new Date(min), delta);
    }
    min = this._getBoundaryDate('min');
    min.setMinutes(minutes);
    if (value && Math.abs(value - max) < dateUtils.ONE_DAY) {
      delta = (max.getHours() * 60 + Math.abs(max.getMinutes() - minutes)) * dateUtils.ONE_MINUTE;
    }
    return this._getRangeItems(min, new Date(min), delta);
  }
  _getRangeItems(startValue, currentValue, rangeDuration) {
    const rangeItems = [];
    const interval = this.dateBox.option('interval');
    while (currentValue - startValue <= rangeDuration) {
      // @ts-expect-error
      rangeItems.push(new Date(currentValue));
      currentValue.setMinutes(currentValue.getMinutes() + interval);
    }
    return rangeItems;
  }
  _getBoundaryDate(boundary) {
    const boundaryValue = BOUNDARY_VALUES[boundary];
    const currentValue = new Date(ensureDefined(this.dateBox.dateOption('value'), 0));
    return new Date(currentValue.getFullYear(), currentValue.getMonth(), currentValue.getDate(), boundaryValue.getHours(), boundaryValue.getMinutes());
  }
  _timeListItemTemplate(itemData) {
    const displayFormat = this.dateBox.option('displayFormat');
    return dateLocalization.format(itemData, this.getDisplayFormat(displayFormat));
  }
  _listItemClickHandler(e) {
    if (this.dateBox.option('applyValueMode') === 'useButtons') {
      return;
    }
    const date = this._getDateByItemData(e.itemData);
    this.dateBox.option('opened', false);
    this.dateBoxValue(date, e.event);
  }
  _getDateByItemData(itemData) {
    let date = this.dateBox.option('value');
    const hours = itemData.getHours();
    const minutes = itemData.getMinutes();
    const seconds = itemData.getSeconds();
    const year = itemData.getFullYear();
    const month = itemData.getMonth();
    const day = itemData.getDate();
    if (date) {
      if (this.dateBox.option('dateSerializationFormat')) {
        date = dateSerialization.deserializeDate(date);
      } else {
        date = new Date(date);
      }
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      date.setFullYear(year);
      date.setMonth(month);
      date.setDate(day);
    } else {
      date = new Date(year, month, day, hours, minutes, 0, 0);
    }
    return date;
  }
  getKeyboardListener() {
    return this._widget;
  }
  _updatePopupHeight() {
    var _this$dateBox$_timeLi;
    const dropDownOptionsHeight = getSizeValue(this.dateBox.option('dropDownOptions.height'));
    if (dropDownOptionsHeight === undefined || dropDownOptionsHeight === 'auto') {
      this.dateBox._setPopupOption('height', 'auto');
      const popupHeight = getOuterHeight(this._widget.$element());
      const maxHeight = getHeight(window) * 0.45;
      this.dateBox._setPopupOption('height', Math.min(popupHeight, maxHeight));
    }
    (_this$dateBox$_timeLi = this.dateBox._timeList) === null || _this$dateBox$_timeLi === void 0 || _this$dateBox$_timeLi.updateDimensions();
  }
  getParsedText(text, format) {
    let value = super.getParsedText(text, format);
    if (value) {
      // @ts-expect-error ts-error
      value = dateUtils.mergeDates(value, new Date(null), DATE_FORMAT);
    }
    return value;
  }
}
export default ListStrategy;
