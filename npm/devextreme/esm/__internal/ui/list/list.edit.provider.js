/**
* DevExtreme (esm/__internal/ui/list/list.edit.provider.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { each } from '../../../core/utils/iterator';
import errors from '../../../ui/widget/ui.errors';
import { isFunction } from '../../core/utils/m_type';
import { registry } from '../../ui/list/list.edit.decorator_registry';
const editOptionsRegistry = [];
const registerOption = _ref => {
  let {
    enabled,
    decoratorType,
    decoratorSubType
  } = _ref;
  editOptionsRegistry.push({
    enabled,
    decoratorType,
    decoratorSubType
  });
};
// NOTE: option registration order does matter
registerOption({
  enabled() {
    const {
      menuItems
    } = this.option();
    return Boolean(menuItems.length);
  },
  decoratorType: () => 'menu',
  decoratorSubType() {
    const {
      menuMode
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return menuMode;
  }
});
registerOption({
  enabled() {
    const {
      menuItems,
      allowItemDeleting
    } = this.option();
    return Boolean(!menuItems.length && allowItemDeleting);
  },
  decoratorType() {
    const {
      itemDeleteMode
    } = this.option();
    return ['toggle', 'slideButton', 'swipe', 'static'].includes(itemDeleteMode) ? 'delete' : 'menu';
  },
  decoratorSubType() {
    let {
      itemDeleteMode
    } = this.option();
    if (itemDeleteMode === 'slideItem') {
      itemDeleteMode = 'slide';
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return itemDeleteMode;
  }
});
registerOption({
  enabled() {
    const {
      selectionMode,
      showSelectionControls
    } = this.option();
    return Boolean(selectionMode !== 'none' && showSelectionControls);
  },
  decoratorType: () => 'selection',
  decoratorSubType: () => 'default'
});
registerOption({
  enabled() {
    const {
      itemDragging
    } = this.option();
    return Boolean(itemDragging.allowReordering || itemDragging.allowDropInsideItem || itemDragging.group);
  },
  decoratorType: () => 'reorder',
  decoratorSubType: () => 'default'
});
const LIST_ITEM_BEFORE_BAG_CLASS = 'dx-list-item-before-bag';
const LIST_ITEM_AFTER_BAG_CLASS = 'dx-list-item-after-bag';
const DECORATOR_BEFORE_BAG_CREATE_METHOD = 'beforeBag';
const DECORATOR_AFTER_BAG_CREATE_METHOD = 'afterBag';
const DECORATOR_MODIFY_ELEMENT_METHOD = 'modifyElement';
const DECORATOR_AFTER_RENDER_METHOD = 'afterRender';
const DECORATOR_GET_EXCLUDED_SELECTORS_METHOD = 'getExcludedSelectors';
class EditProvider {
  constructor(list) {
    this._list = list;
    this._decorators = [];
    this._fetchRequiredDecorators();
  }
  dispose() {
    var _this$_decorators;
    if ((_this$_decorators = this._decorators) !== null && _this$_decorators !== void 0 && _this$_decorators.length) {
      each(this._decorators, (_index, decorator) => {
        decorator.dispose();
      });
    }
  }
  _fetchRequiredDecorators() {
    each(editOptionsRegistry, (_index, option) => {
      const optionEnabled = option.enabled.call(this._list);
      if (optionEnabled) {
        const decoratorType = option.decoratorType.call(this._list);
        const decoratorSubType = option.decoratorSubType.call(this._list);
        const decorator = this._createDecorator(decoratorType, decoratorSubType);
        this._decorators.push(decorator);
      }
    });
  }
  _createDecorator(type, subType) {
    const CreatedDecoratorClass = this._findDecorator(type, subType);
    return new CreatedDecoratorClass(this._list);
  }
  _findDecorator(type, subType) {
    var _registry$type;
    const foundDecorator = (_registry$type = registry[type]) === null || _registry$type === void 0 ? void 0 : _registry$type[subType];
    if (!foundDecorator) {
      throw errors.Error('E1012', type, subType);
    }
    return foundDecorator;
  }
  modifyItemElement(args) {
    const $itemElement = $(args.itemElement);
    const config = {
      $itemElement,
      $container: $()
    };
    this._prependBeforeBags($itemElement, config);
    this._appendAfterBags($itemElement, config);
    this._applyDecorators(DECORATOR_MODIFY_ELEMENT_METHOD, config);
  }
  afterItemsRendered() {
    this._applyDecorators(DECORATOR_AFTER_RENDER_METHOD);
  }
  _prependBeforeBags($itemElement, config) {
    const $beforeBags = this._collectDecoratorsMarkup(DECORATOR_BEFORE_BAG_CREATE_METHOD, config, LIST_ITEM_BEFORE_BAG_CLASS);
    $itemElement.prepend($beforeBags);
  }
  _appendAfterBags($itemElement, config) {
    const $afterBags = this._collectDecoratorsMarkup(DECORATOR_AFTER_BAG_CREATE_METHOD, config, LIST_ITEM_AFTER_BAG_CLASS);
    $itemElement.append($afterBags);
  }
  _collectDecoratorsMarkup(method, config, containerClass) {
    var _this$_decorators2;
    const $collector = $('<div>');
    (_this$_decorators2 = this._decorators) === null || _this$_decorators2 === void 0 || _this$_decorators2.forEach(decorator => {
      if (isFunction(decorator[method])) {
        const $container = $('<div>').addClass(containerClass);
        decorator[method](Object.assign({}, config, {
          $container
        }));
        if ($container.children().length) {
          $collector.append($container);
        }
      }
    });
    return $collector.children();
  }
  _applyDecorators(method, config) {
    var _this$_decorators3;
    (_this$_decorators3 = this._decorators) === null || _this$_decorators3 === void 0 || _this$_decorators3.forEach(decorator => {
      decorator[method](config);
    });
  }
  _handlerExists(name) {
    if (!this._decorators) {
      return false;
    }
    const decorators = this._decorators;
    const {
      length
    } = decorators;
    for (let i = 0; i < length; i += 1) {
      if (decorators[i][name] !== noop) {
        return true;
      }
    }
    return false;
  }
  _eventHandler(name) {
    if (!this._decorators) {
      return false;
    }
    let response = false;
    const decorators = this._decorators;
    const {
      length
    } = decorators;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    for (let i = 0; i < length; i += 1) {
      response = decorators[i][name](...args);
      if (response) {
        break;
      }
    }
    return response;
  }
  handleClick($itemElement, e) {
    return this._eventHandler('handleClick', $itemElement, e);
  }
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
    return this._eventHandler('handleKeyboardEvents', currentFocusedIndex, moveFocusUp);
  }
  handleEnterPressing(e) {
    return this._eventHandler('handleEnterPressing', e);
  }
  contextMenuHandlerExists() {
    return this._handlerExists('handleContextMenu');
  }
  handleContextMenu($itemElement, e) {
    return this._eventHandler('handleContextMenu', $itemElement, e);
  }
  getExcludedItemSelectors() {
    const excludedSelectors = [];
    this._applyDecorators(DECORATOR_GET_EXCLUDED_SELECTORS_METHOD, excludedSelectors);
    return excludedSelectors.join(',');
  }
}
export default EditProvider;
