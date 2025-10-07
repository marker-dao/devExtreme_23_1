/**
* DevExtreme (esm/__internal/ui/accordion.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { fx } from '../../common/core/animation';
import { name as clickEventName } from '../../common/core/events/click';
import eventsEngine from '../../common/core/events/core/events_engine';
import { addNamespace } from '../../common/core/events/utils';
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import domAdapter from '../../core/dom_adapter';
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
import { BindableTemplate } from '../../core/templates/bindable_template';
import { deferRender } from '../../core/utils/common';
import { Deferred, when } from '../../core/utils/deferred';
import { getImageContainer } from '../../core/utils/icon';
import * as iteratorUtils from '../../core/utils/iterator';
import { getHeight, getOuterHeight, setHeight } from '../../core/utils/size';
import { isDefined, isPlainObject } from '../../core/utils/type';
import { current, isMaterialBased } from '../../ui/themes';
import CollectionWidgetLiveUpdate from '../ui/collection/collection_widget.live_update';
const ACCORDION_CLASS = 'dx-accordion';
const ACCORDION_WRAPPER_CLASS = 'dx-accordion-wrapper';
const ACCORDION_ITEM_CLASS = 'dx-accordion-item';
const ACCORDION_ITEM_OPENED_CLASS = 'dx-accordion-item-opened';
const ACCORDION_ITEM_CLOSED_CLASS = 'dx-accordion-item-closed';
const ACCORDION_ITEM_TITLE_CLASS = 'dx-accordion-item-title';
const ACCORDION_ITEM_BODY_CLASS = 'dx-accordion-item-body';
const ACCORDION_ITEM_TITLE_CAPTION_CLASS = 'dx-accordion-item-title-caption';
const ACCORDION_ITEM_DATA_KEY = 'dxAccordionItemData';
class Accordion extends CollectionWidgetLiveUpdate {
  _activeStateUnit() {
    return `.${ACCORDION_ITEM_CLASS}`;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      itemTitleTemplate: 'title',
      // @ts-expect-error ts-error
      onItemTitleClick: null,
      selectedIndex: 0,
      collapsible: false,
      multiple: false,
      animationDuration: 300,
      deferRendering: true,
      selectByClick: true,
      activeStateEnabled: true,
      _itemAttributes: {
        role: 'tab'
      },
      _animationEasing: 'ease'
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return isMaterialBased(current());
      },
      options: {
        animationDuration: 200,
        _animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }]);
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  _init() {
    super._init();
    const {
      collapsible,
      multiple
    } = this.option();
    this.option('selectionRequired', !collapsible);
    this.option('selectionMode', multiple ? 'multiple' : 'single');
    const $element = this.$element();
    $element.addClass(ACCORDION_CLASS);
    this._$container = $('<div>').addClass(ACCORDION_WRAPPER_CLASS);
    $element.append(this._$container);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new BindableTemplate(($container, data) => {
        if (isPlainObject(data)) {
          const $iconElement = getImageContainer(data.icon);
          if ($iconElement) {
            $container.append($iconElement);
          }
          if (isDefined(data.title) && !isPlainObject(data.title)) {
            $container.append(domAdapter.createTextNode(data.title));
          }
        } else if (isDefined(data)) {
          $container.text(String(data));
        }
        $container.wrapInner($('<div>').addClass(ACCORDION_ITEM_TITLE_CAPTION_CLASS));
      }, ['title', 'icon'], this.option('integrationOptions.watchMethod'))
    });
  }
  _initMarkup() {
    this._deferredItems = [];
    super._initMarkup();
    const {
      multiple
    } = this.option();
    this.setAria({
      role: 'tablist',
      // eslint-disable-next-line spellcheck/spell-checker
      multiselectable: multiple
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    deferRender(() => {
      const selectedItemIndices = this._getSelectedItemIndices();
      this._renderSelection(selectedItemIndices, []);
    });
  }
  _postProcessRenderItems() {
    this._updateItemHeights(true);
  }
  _itemDataKey() {
    return ACCORDION_ITEM_DATA_KEY;
  }
  _itemClass() {
    return ACCORDION_ITEM_CLASS;
  }
  _itemContainer() {
    return this._$container;
  }
  _itemTitles() {
    return this._itemElements().find(`.${ACCORDION_ITEM_TITLE_CLASS}`);
  }
  _itemContents() {
    return this._itemElements().find(`.${ACCORDION_ITEM_BODY_CLASS}`);
  }
  _getItemData(target) {
    // @ts-expect-error ts-error
    const itemData = $(target).parent().data(this._itemDataKey());
    return itemData ?? super._getItemData(target);
  }
  _itemSelectHandler(e) {
    if ($(e.target).closest(this._itemContents()).length) {
      return;
    }
    super._itemSelectHandler(e);
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
    super._afterItemElementDeleted($item, deletedActionArgs);
  }
  _renderItemContent(args) {
    const {
      itemTitleTemplate
    } = this.option();
    const itemTitleDeferred = super._renderItemContent(_extends({}, args, {
      contentClass: ACCORDION_ITEM_TITLE_CLASS,
      templateProperty: 'titleTemplate',
      defaultTemplateName: itemTitleTemplate
    }));
    const callBase = super._renderItemContent.bind(this);
    return itemTitleDeferred.done(itemTitle => {
      this._attachItemTitleClickAction(itemTitle);
      const deferred = Deferred();
      if (isDefined(this._deferredItems[args.index])) {
        this._deferredItems[args.index] = deferred;
      } else {
        this._deferredItems.push(deferred);
      }
      const {
        deferRendering
      } = this.option();
      if (!deferRendering || this._getSelectedItemIndices().includes(args.index)) {
        deferred.resolve();
      }
      deferred.done(() => {
        callBase(_extends({}, args, {
          contentClass: ACCORDION_ITEM_BODY_CLASS,
          container: getPublicElement($('<div>').appendTo($(itemTitle).parent()))
        }));
      });
    });
  }
  _attachItemTitleClickAction($itemTitle) {
    // @ts-expect-error ts-error
    const eventName = addNamespace(clickEventName, this.NAME);
    eventsEngine.off($itemTitle, eventName);
    eventsEngine.on($itemTitle, eventName, this._itemTitleClickHandler.bind(this));
  }
  _itemTitleClickHandler(e) {
    this._itemDXEventHandler(e, 'onItemTitleClick');
  }
  _renderSelection(addedSelection, removedSelection) {
    this._itemElements().addClass(ACCORDION_ITEM_CLOSED_CLASS);
    this.setAria('hidden', true, this._itemContents());
    this._updateItems(addedSelection, removedSelection);
  }
  _updateSelection(addedSelection, removedSelection) {
    this._updateItems(addedSelection, removedSelection);
    this._updateItemHeightsWrapper(false);
  }
  _updateItems(addedSelection, removedSelection) {
    const $items = this._itemElements();
    iteratorUtils.each(addedSelection, (_i, addedIndex) => {
      var _this$_deferredItems$;
      (_this$_deferredItems$ = this._deferredItems[addedIndex]) === null || _this$_deferredItems$ === void 0 || _this$_deferredItems$.resolve();
      const $item = $items.eq(addedIndex).addClass(ACCORDION_ITEM_OPENED_CLASS).removeClass(ACCORDION_ITEM_CLOSED_CLASS);
      this.setAria('hidden', false, $item.find(`.${ACCORDION_ITEM_BODY_CLASS}`));
    });
    iteratorUtils.each(removedSelection, (_i, removedIndex) => {
      const $item = $items.eq(removedIndex).removeClass(ACCORDION_ITEM_OPENED_CLASS);
      this.setAria('hidden', true, $item.find(`.${ACCORDION_ITEM_BODY_CLASS}`));
    });
  }
  _updateItemHeightsWrapper(skipAnimation) {
    const {
      templatesRenderAsynchronously
    } = this.option();
    // Note: require for proper animation in angularjs (T520346)
    if (templatesRenderAsynchronously) {
      // eslint-disable-next-line no-restricted-globals
      this._animationTimer = setTimeout(() => {
        this._updateItemHeights(skipAnimation);
      });
    } else {
      this._updateItemHeights(skipAnimation);
    }
  }
  _updateItemHeights(skipAnimation) {
    const deferredAnimate = this._deferredAnimate;
    const itemHeight = this._splitFreeSpace(this._calculateFreeSpace());
    clearTimeout(this._animationTimer);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return when.apply($, [...this._itemElements().toArray()].map(item => that._updateItemHeight($(item), itemHeight, skipAnimation))).done(() => {
      if (deferredAnimate) {
        // @ts-expect-error ts-error
        deferredAnimate.resolveWith(that);
      }
    });
  }
  _updateItemHeight($item, itemHeight, skipAnimation) {
    const $title = $item.children(`.${ACCORDION_ITEM_TITLE_CLASS}`);
    if (fx.isAnimating($item.get(0))) {
      fx.stop($item.get(0), false);
    }
    const startItemHeight = getOuterHeight($item);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let finalItemHeight;
    if ($item.hasClass(ACCORDION_ITEM_OPENED_CLASS)) {
      finalItemHeight = itemHeight + getOuterHeight($title);
      if (!finalItemHeight) {
        setHeight($item, 'auto');
        finalItemHeight = getOuterHeight($item);
      }
    } else {
      finalItemHeight = getOuterHeight($title);
    }
    return this._animateItem($item, startItemHeight, finalItemHeight, skipAnimation, !!itemHeight);
  }
  _animateItem($element, startHeight, endHeight, skipAnimation, fixedHeight) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let deferred;
    if (skipAnimation || startHeight === endHeight) {
      $element.css('height', endHeight);
      deferred = Deferred().resolve();
    } else {
      const {
        animationDuration,
        _animationEasing: easing
      } = this.option();
      deferred = fx.animate($element.get(0), {
        // @ts-expect-error ts-error
        type: 'custom',
        // @ts-expect-error ts-error
        from: {
          height: startHeight
        },
        // @ts-expect-error ts-error,
        to: {
          height: endHeight
        },
        duration: animationDuration,
        easing
      });
    }
    // @ts-expect-error ts-error
    return deferred.done(() => {
      if ($element.hasClass(ACCORDION_ITEM_OPENED_CLASS) && !fixedHeight) {
        $element.css('height', '');
      }
      $element.not(`.${ACCORDION_ITEM_OPENED_CLASS}`).addClass(ACCORDION_ITEM_CLOSED_CLASS);
    });
  }
  _splitFreeSpace(freeSpace) {
    const {
      selectedItems
    } = this.option();
    if (!freeSpace || !(selectedItems !== null && selectedItems !== void 0 && selectedItems.length)) {
      return freeSpace;
    }
    return freeSpace / selectedItems.length;
  }
  _calculateFreeSpace() {
    const {
      height
    } = this.option();
    if (height === undefined || height === 'auto') {
      return undefined;
    }
    const $titles = this._itemTitles();
    let itemsHeight = 0;
    iteratorUtils.each($titles, (_index, title) => {
      itemsHeight += getOuterHeight(title);
    });
    const elementHeight = getHeight(this.$element());
    return elementHeight - itemsHeight;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _dimensionChanged() {
    this._updateItemHeights(true);
  }
  _clean() {
    clearTimeout(this._animationTimer);
    super._clean();
  }
  _tryParseItemPropertyName(fullName) {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const matches = fullName.match(/.*\.(.*)/);
    if (isDefined(matches) && matches.length >= 1) {
      return matches[1];
    }
    return null;
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'items':
        {
          super._optionChanged(args);
          if (this._tryParseItemPropertyName(args.fullName) === 'title') {
            this._renderSelection(this._getSelectedItemIndices(), []);
          }
          if (this._tryParseItemPropertyName(args.fullName) === 'visible') {
            this._updateItemHeightsWrapper(true);
          }
          const {
            repaintChangesOnly
          } = this.option();
          if (repaintChangesOnly === true && args.fullName === 'items') {
            this._renderSelection(this._getSelectedItemIndices(), []);
            this._updateItemHeightsWrapper(true);
          }
          break;
        }
      case 'animationDuration':
      case 'onItemTitleClick':
      case '_animationEasing':
        break;
      case 'collapsible':
        this.option('selectionRequired', !this.option('collapsible'));
        break;
      case 'itemTitleTemplate':
      case 'height':
      case 'deferRendering':
        this._invalidate();
        break;
      case 'multiple':
        this.option('selectionMode', args.value ? 'multiple' : 'single');
        break;
      default:
        super._optionChanged(args);
    }
  }
  expandItem(index) {
    this._deferredAnimate = Deferred();
    this.selectItem(index);
    return this._deferredAnimate.promise();
  }
  collapseItem(index) {
    this._deferredAnimate = Deferred();
    this.unselectItem(index);
    return this._deferredAnimate.promise();
  }
  updateDimensions() {
    return this._updateItemHeights(false);
  }
}
registerComponent('dxAccordion', Accordion);
export default Accordion;
