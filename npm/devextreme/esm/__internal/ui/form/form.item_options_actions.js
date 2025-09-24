/**
* DevExtreme (esm/__internal/ui/form/form.item_options_actions.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { data } from '../../../core/element_data';
import ItemOptionAction from '../../ui/form/form.item_option_action';
import { getFullOptionName } from '../../ui/form/form.utils';
class WidgetOptionItemOptionAction extends ItemOptionAction {
  tryExecute() {
    const {
      value
    } = this._options;
    const instance = this.findInstance();
    if (instance) {
      instance.option(value);
      return true;
    }
    return false;
  }
}
class TabOptionItemOptionAction extends ItemOptionAction {
  tryExecute() {
    const tabPanel = this.findInstance();
    if (tabPanel) {
      const {
        optionName,
        item,
        value
      } = this._options;
      const itemIndex = this._itemsRunTimeInfo.findItemIndexByItem(item) ?? -1;
      if (itemIndex >= 0) {
        tabPanel.option(getFullOptionName(`items[${itemIndex}]`, optionName), value);
        return true;
      }
    }
    return false;
  }
}
class SimpleItemTemplateChangedAction extends ItemOptionAction {
  tryExecute() {
    return false;
  }
}
class GroupItemTemplateChangedAction extends ItemOptionAction {
  tryExecute() {
    const preparedItem = this.findPreparedItem();
    if (preparedItem !== null && preparedItem !== void 0 && preparedItem._prepareGroupItemTemplate && preparedItem._renderGroupContentTemplate) {
      preparedItem._prepareGroupItemTemplate(this._options.item.template);
      preparedItem._renderGroupContentTemplate();
      return true;
    }
    return false;
  }
}
class TabsOptionItemOptionAction extends ItemOptionAction {
  tryExecute() {
    const tabPanel = this.findInstance();
    if (tabPanel) {
      const {
        value
      } = this._options;
      tabPanel.option('dataSource', value);
      return true;
    }
    return false;
  }
}
class ValidationRulesItemOptionAction extends ItemOptionAction {
  tryExecute() {
    const {
      item
    } = this._options;
    const instance = this.findInstance();
    const validator = instance && data(instance.$element()[0], 'dxValidator');
    if (validator && item) {
      const filterRequired = validationRule => validationRule.type === 'required';
      const oldContainsRequired = (validator.option('validationRules') || []).some(filterRequired);
      const newContainsRequired = (item.validationRules ?? []).some(filterRequired);
      if (oldContainsRequired === newContainsRequired) {
        validator.option('validationRules', item.validationRules);
        return true;
      }
    }
    return false;
  }
}
class CssClassItemOptionAction extends ItemOptionAction {
  tryExecute() {
    const $itemContainer = this.findItemContainer();
    if ($itemContainer.length) {
      const {
        previousValue = '',
        value = ''
      } = this._options;
      $itemContainer.removeClass(previousValue).addClass(value);
      return true;
    }
    return false;
  }
}
const tryCreateItemOptionAction = (optionName, itemActionOptions) => {
  switch (optionName) {
    case 'editorOptions': // SimpleItem/#editorOptions
    case 'buttonOptions':
      // ButtonItem/#buttonOptions
      return new WidgetOptionItemOptionAction(itemActionOptions);
    case 'validationRules':
      // SimpleItem/#validationRules
      return new ValidationRulesItemOptionAction(itemActionOptions);
    case 'cssClass':
      // ButtonItem/#cssClass or EmptyItem/#cssClass or GroupItem/#cssClass or SimpleItem/#cssClass or TabbedItem/#cssClass
      return new CssClassItemOptionAction(itemActionOptions);
    case 'badge': // TabbedItem/tabs/#badge
    case 'disabled': // TabbedItem/tabs/#disabled
    case 'icon': // TabbedItem/tabs/#icon
    case 'tabTemplate': // TabbedItem/tabs/#tabTemplate
    case 'title':
      {
        // TabbedItem/tabs/#title
        itemActionOptions.optionName = optionName;
        return new TabOptionItemOptionAction(itemActionOptions);
      }
    case 'tabs':
      // TabbedItem/tabs
      return new TabsOptionItemOptionAction(itemActionOptions);
    case 'template':
      {
        var _itemActionOptions$it, _itemActionOptions$it2;
        // TabbedItem/tabs/#template or SimpleItem/#template or GroupItem/#template
        const itemType = (itemActionOptions === null || itemActionOptions === void 0 || (_itemActionOptions$it = itemActionOptions.item) === null || _itemActionOptions$it === void 0 ? void 0 : _itemActionOptions$it.itemType) ?? ((_itemActionOptions$it2 = itemActionOptions.itemsRunTimeInfo.findPreparedItemByItem(itemActionOptions === null || itemActionOptions === void 0 ? void 0 : itemActionOptions.item)) === null || _itemActionOptions$it2 === void 0 ? void 0 : _itemActionOptions$it2.itemType);
        if (itemType === 'simple') {
          return new SimpleItemTemplateChangedAction(itemActionOptions);
        }
        if (itemType === 'group') {
          return new GroupItemTemplateChangedAction(itemActionOptions);
        }
        itemActionOptions.optionName = optionName;
        return new TabOptionItemOptionAction(itemActionOptions);
      }
    default:
      return null;
  }
};
export default tryCreateItemOptionAction;
