/**
* DevExtreme (esm/__internal/ui/form/m_form.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/validation_summary';
import '../../../ui/validation_group';
import '../../ui/form/m_form.layout_manager';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { triggerResizeEvent, triggerShownEvent } from '../../../common/core/events/visibility_change';
import messageLocalization from '../../../common/core/localization/message';
import registerComponent from '../../../core/component_registrator';
import config from '../../../core/config';
import { getPublicElement } from '../../../core/element';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import resizeObserverSingleton from '../../../core/resize_observer';
import { ensureDefined } from '../../../core/utils/common';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { isDefined, isEmptyObject, isObject, isString } from '../../../core/utils/type';
// @ts-expect-error ts-error
import { defaultScreenFactorFunc, getCurrentScreenFactor, hasWindow } from '../../../core/utils/window';
import Editor from '../../../ui/editor/editor';
import TabPanel from '../../../ui/tab_panel';
import { isMaterial, isMaterialBased } from '../../../ui/themes';
import ValidationEngine from '../../../ui/validation_engine';
import Widget, { FOCUSED_STATE_CLASS } from '../../core/widget/widget';
import { DROP_DOWN_EDITOR_CLASS } from '../../ui/drop_down_editor/m_drop_down_editor';
import { setLabelWidthByMaxLabelWidth } from '../../ui/form/components/m_label';
import { FIELD_ITEM_CLASS, FIELD_ITEM_CONTENT_CLASS, FIELD_ITEM_CONTENT_HAS_GROUP_CLASS, FIELD_ITEM_CONTENT_HAS_TABS_CLASS, FIELD_ITEM_TAB_CLASS, FORM_CLASS, FORM_FIELD_ITEM_COL_CLASS, FORM_GROUP_CAPTION_CLASS, FORM_GROUP_CLASS, FORM_GROUP_CONTENT_CLASS, FORM_GROUP_CUSTOM_CAPTION_CLASS, FORM_GROUP_WITH_CAPTION_CLASS, FORM_UNDERLINED_CLASS, FORM_VALIDATION_SUMMARY, GROUP_COL_COUNT_ATTR, GROUP_COL_COUNT_CLASS, ROOT_SIMPLE_ITEM_CLASS } from '../../ui/form/constants';
import tryCreateItemOptionAction from '../../ui/form/m_form.item_options_actions';
// eslint-disable-next-line import/no-named-default
import { default as FormItemsRunTimeInfo } from '../../ui/form/m_form.items_runtime_info';
import { convertToLabelMarkOptions } from '../../ui/form/m_form.layout_manager.utils'; // TODO: remove reference to 'ui.form.layout_manager.utils.js'
import { concatPaths, convertToLayoutManagerOptions, createItemPathByIndex, getFullOptionName, getItemPath, getOptionNameFromFullName, getTextWithoutSpaces, isEqualToDataFieldOrNameOrTitleOrCaption, isFullPathContainsTabs, tryGetTabPath } from '../../ui/form/m_form.utils';
import Scrollable from '../../ui/scroll_view/scrollable';
import { TEXTEDITOR_CLASS, TEXTEDITOR_INPUT_CLASS } from '../../ui/text_box/m_text_editor.base';
import { TOOLBAR_CLASS } from '../../ui/toolbar/constants';
const ITEM_OPTIONS_FOR_VALIDATION_UPDATING = ['items', 'isRequired', 'validationRules', 'visible'];
class Form extends Widget {
  _init() {
    super._init();
    this._dirtyFields = new Set();
    this._cachedColCountOptions = [];
    this._itemsRunTimeInfo = new FormItemsRunTimeInfo();
    this._groupsColCount = [];
    this._attachSyncSubscriptions();
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      formID: `dx-${new Guid()}`,
      formData: {},
      colCount: 1,
      screenByWidth: defaultScreenFactorFunc,
      labelLocation: 'left',
      readOnly: false,
      // @ts-expect-error ts-error
      onFieldDataChanged: null,
      // @ts-expect-error ts-error
      customizeItem: null,
      // @ts-expect-error ts-error
      onEditorEnterKey: null,
      minColWidth: 200,
      alignItemLabels: true,
      alignItemLabelsInAllGroups: true,
      alignRootItemLabels: true,
      showColonAfterLabel: true,
      showRequiredMark: true,
      showOptionalMark: false,
      requiredMark: '*',
      optionalMark: messageLocalization.format('dxForm-optionalMark'),
      // @ts-expect-error ts-error
      requiredMessage: messageLocalization.getFormatter('dxForm-requiredMessage'),
      showValidationSummary: false,
      scrollingEnabled: false,
      stylingMode: config().editorStylingMode,
      labelMode: 'outside',
      isDirty: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        // @ts-expect-error ts-error
        return isMaterialBased();
      },
      options: {
        labelLocation: 'top'
      }
    }, {
      device() {
        // @ts-expect-error ts-error
        return isMaterial();
      },
      options: {
        showColonAfterLabel: false
      }
    }]);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      formData: true,
      validationGroup: true
    });
  }
  _getGroupColCount($element) {
    // eslint-disable-next-line radix
    return parseInt($element.attr(GROUP_COL_COUNT_ATTR));
  }
  // eslint-disable-next-line @typescript-eslint/default-param-last
  _applyLabelsWidthByCol($container, index) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let labelMarkOptions = arguments.length > 3 ? arguments[3] : undefined;
    // @ts-expect-error
    const fieldItemClass = options.inOneColumn ? FIELD_ITEM_CLASS : FORM_FIELD_ITEM_COL_CLASS + index;
    // @ts-expect-error
    const cssExcludeTabbedSelector = options.excludeTabbed ? `:not(.${FIELD_ITEM_TAB_CLASS})` : '';
    setLabelWidthByMaxLabelWidth($container, `.${fieldItemClass}${cssExcludeTabbedSelector}`, labelMarkOptions);
  }
  _applyLabelsWidth($container, excludeTabbed, inOneColumn, colCount, labelMarkOptions) {
    colCount = inOneColumn ? 1 : colCount || this._getGroupColCount($container);
    const applyLabelsOptions = {
      excludeTabbed,
      inOneColumn
    };
    let i;
    for (i = 0; i < colCount; i++) {
      this._applyLabelsWidthByCol($container, i, applyLabelsOptions, labelMarkOptions);
    }
  }
  _getGroupElementsInColumn($container, columnIndex, colCount) {
    const cssColCountSelector = isDefined(colCount) ? `.${GROUP_COL_COUNT_CLASS}${colCount}` : '';
    const groupSelector = `.${FORM_FIELD_ITEM_COL_CLASS}${columnIndex} > .${FIELD_ITEM_CONTENT_CLASS} > .${FORM_GROUP_CLASS}${cssColCountSelector}`;
    return $container.find(groupSelector);
  }
  _applyLabelsWidthWithGroups($container, colCount, excludeTabbed, labelMarkOptions) {
    const {
      alignRootItemLabels
    } = this.option();
    if (alignRootItemLabels === true) {
      // TODO: private option
      const $rootSimpleItems = $container.find(`.${ROOT_SIMPLE_ITEM_CLASS}`);
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        // TODO: root items are aligned with root items only
        // this code doesn't align root items with grouped items in the same column
        // (see T942517)
        this._applyLabelsWidthByCol($rootSimpleItems, colIndex, excludeTabbed, labelMarkOptions);
      }
    }
    const alignItemLabelsInAllGroups = this.option('alignItemLabelsInAllGroups');
    if (alignItemLabelsInAllGroups) {
      this._applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed, labelMarkOptions);
    } else {
      const $groups = this.$element().find(`.${FORM_GROUP_CLASS}`);
      let i;
      for (i = 0; i < $groups.length; i++) {
        this._applyLabelsWidth($groups.eq(i), excludeTabbed, undefined, undefined, labelMarkOptions);
      }
    }
  }
  _applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed, labelMarkOptions) {
    const applyLabelsOptions = {
      excludeTabbed
    };
    let colIndex;
    let groupsColIndex;
    let groupColIndex;
    let $groupsByCol;
    for (colIndex = 0; colIndex < colCount; colIndex++) {
      $groupsByCol = this._getGroupElementsInColumn($container, colIndex);
      this._applyLabelsWidthByCol($groupsByCol, 0, applyLabelsOptions, labelMarkOptions);
      for (groupsColIndex = 0; groupsColIndex < this._groupsColCount.length; groupsColIndex++) {
        $groupsByCol = this._getGroupElementsInColumn($container, colIndex, this._groupsColCount[groupsColIndex]);
        const groupColCount = this._getGroupColCount($groupsByCol);
        for (groupColIndex = 1; groupColIndex < groupColCount; groupColIndex++) {
          this._applyLabelsWidthByCol($groupsByCol, groupColIndex, applyLabelsOptions, labelMarkOptions);
        }
      }
    }
  }
  _labelLocation() {
    const {
      labelLocation
    } = this.option();
    return labelLocation;
  }
  _alignLabelsInColumn(_ref) {
    let {
      layoutManager,
      inOneColumn,
      $container,
      excludeTabbed,
      items
    } = _ref;
    if (!hasWindow() || this._labelLocation() === 'top') {
      // TODO: label location can be changed to 'left/right' for some labels
      // but this condition disables alignment for such items
      return;
    }
    const labelMarkOptions = convertToLabelMarkOptions(layoutManager._getMarkOptions());
    if (inOneColumn) {
      this._applyLabelsWidth($container, excludeTabbed, true, undefined, labelMarkOptions);
    } else if (this._checkGrouping(items)) {
      this._applyLabelsWidthWithGroups($container, layoutManager._getColCount(), excludeTabbed, labelMarkOptions);
    } else {
      this._applyLabelsWidth($container, excludeTabbed, false, layoutManager._getColCount(), labelMarkOptions);
    }
  }
  _prepareFormData() {
    if (!isDefined(this.option('formData'))) {
      this.option('formData', {});
    }
  }
  _setStylingModeClass() {
    const {
      stylingMode
    } = this.option();
    if (stylingMode === 'underlined') {
      this.$element().addClass(FORM_UNDERLINED_CLASS);
    }
  }
  _initMarkup() {
    // @ts-expect-error ts-error
    ValidationEngine.addGroup(this._getValidationGroup(), false);
    this._clearCachedInstances();
    this._prepareFormData();
    this.$element().addClass(FORM_CLASS);
    this._setStylingModeClass();
    super._initMarkup();
    this.setAria('role', 'form', this.$element());
    if (this.option('scrollingEnabled')) {
      this._renderScrollable();
    }
    this._renderLayout();
    this._renderValidationSummary();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._lastMarkupScreenFactor = this._targetScreenFactor || this._getCurrentScreenFactor();
    this._attachResizeObserverSubscription();
  }
  _attachResizeObserverSubscription() {
    if (hasWindow()) {
      const formRootElement = this.$element().get(0);
      resizeObserverSingleton.unobserve(formRootElement);
      resizeObserverSingleton.observe(formRootElement, () => {
        this._resizeHandler();
      });
    }
  }
  _resizeHandler() {
    if (this._cachedLayoutManagers.length) {
      each(this._cachedLayoutManagers, (_, layoutManager) => {
        var _layoutManager$option;
        (_layoutManager$option = layoutManager.option('onLayoutChanged')) === null || _layoutManager$option === void 0 || _layoutManager$option(layoutManager.isSingleColumnMode());
      });
    }
  }
  _getCurrentScreenFactor() {
    return hasWindow() ? getCurrentScreenFactor(this.option('screenByWidth')) : 'lg';
  }
  _clearCachedInstances() {
    this._itemsRunTimeInfo.clear();
    this._cachedLayoutManagers = [];
  }
  _alignLabels(layoutManager, inOneColumn) {
    this._alignLabelsInColumn({
      $container: this.$element(),
      layoutManager,
      excludeTabbed: true,
      items: this.option('items'),
      inOneColumn
    });
    triggerResizeEvent(this.$element().find(`.${TOOLBAR_CLASS}`));
  }
  _clean() {
    this._clearValidationSummary();
    super._clean();
    this._groupsColCount = [];
    this._cachedColCountOptions = [];
    this._lastMarkupScreenFactor = undefined;
    resizeObserverSingleton.unobserve(this.$element().get(0));
  }
  _renderScrollable() {
    const useNativeScrolling = this.option('useNativeScrolling');
    // @ts-expect-error ts-error
    this._scrollable = new Scrollable(this.$element(), {
      useNative: !!useNativeScrolling,
      useSimulatedScrollbar: !useNativeScrolling,
      useKeyboard: false,
      direction: 'both',
      bounceEnabled: false
    });
  }
  _getContent() {
    var _this$_scrollable;
    return this.option('scrollingEnabled') ? $((_this$_scrollable = this._scrollable) === null || _this$_scrollable === void 0 ? void 0 : _this$_scrollable.content()) : this.$element();
  }
  _clearValidationSummary() {
    var _this$_$validationSum;
    (_this$_$validationSum = this._$validationSummary) === null || _this$_$validationSum === void 0 || _this$_$validationSum.remove();
    this._$validationSummary = undefined;
    this._validationSummary = undefined;
  }
  _renderValidationSummary() {
    this._clearValidationSummary();
    if (this.option('showValidationSummary')) {
      this._$validationSummary = $('<div>').addClass(FORM_VALIDATION_SUMMARY).appendTo(this._getContent());
      // @ts-expect-error ts-error
      this._validationSummary = this._$validationSummary.dxValidationSummary({
        validationGroup: this._getValidationGroup()
      }).dxValidationSummary('instance');
    }
  }
  _prepareItems(items, parentIsTabbedItem, currentPath, isTabs) {
    if (items) {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        const path = concatPaths(currentPath, createItemPathByIndex(i, isTabs));
        const itemRunTimeInfo = {
          item,
          itemIndex: i,
          path
        };
        const guid = this._itemsRunTimeInfo.add(itemRunTimeInfo);
        if (isString(item)) {
          item = {
            dataField: item
          };
        }
        if (isObject(item)) {
          const preparedItem = _extends({}, item);
          // @ts-expect-error ts-error
          itemRunTimeInfo.preparedItem = preparedItem;
          preparedItem.guid = guid;
          this._tryPrepareGroupItemCaption(preparedItem);
          this._tryPrepareGroupItem(preparedItem);
          this._tryPrepareTabbedItem(preparedItem, path);
          this._tryPrepareItemTemplate(preparedItem);
          if (parentIsTabbedItem) {
            preparedItem.cssItemClass = FIELD_ITEM_TAB_CLASS;
          }
          if (preparedItem.items) {
            preparedItem.items = this._prepareItems(preparedItem.items, parentIsTabbedItem, path);
          }
          result.push(preparedItem);
        } else {
          result.push(item);
        }
      }
      return result;
    }
  }
  _tryPrepareGroupItemCaption(item) {
    if (item.itemType === 'group') {
      item._prepareGroupCaptionTemplate = captionTemplate => {
        if (item.captionTemplate) {
          item.groupCaptionTemplate = this._getTemplate(captionTemplate);
        }
        item.captionTemplate = this._itemGroupTemplate.bind(this, item);
      };
      item._prepareGroupCaptionTemplate(item.captionTemplate);
    }
  }
  _tryPrepareGroupItem(item) {
    if (item.itemType === 'group') {
      item.alignItemLabels = ensureDefined(item.alignItemLabels, true);
      item._prepareGroupItemTemplate = itemTemplate => {
        if (item.template) {
          item.groupContentTemplate = this._getTemplate(itemTemplate);
        }
        item.template = this._itemGroupTemplate.bind(this, item);
      };
      item._prepareGroupItemTemplate(item.template);
    }
  }
  _tryPrepareTabbedItem(item, path) {
    if (item.itemType === 'tabbed') {
      item.template = this._itemTabbedTemplate.bind(this, item);
      item.tabs = this._prepareItems(item.tabs, true, path, true);
    }
  }
  _tryPrepareItemTemplate(item) {
    if (item.template) {
      item.template = this._getTemplate(item.template);
    }
  }
  // @ts-expect-error
  _checkGrouping(items) {
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.itemType === 'group') {
          return true;
        }
      }
    }
  }
  _renderLayout() {
    const that = this;
    let items = that.option('items');
    const $content = that._getContent();
    // TODO: Introduce this.preparedItems and use it for partial rerender???
    // Compare new preparedItems with old preparedItems to detect what should be rerendered?
    items = that._prepareItems(items);
    that._rootLayoutManager = that._renderLayoutManager($content, this._createLayoutManagerOptions(items, {
      isRoot: true,
      colCount: that.option('colCount'),
      alignItemLabels: that.option('alignItemLabels'),
      screenByWidth: this.option('screenByWidth'),
      colCountByScreen: this.option('colCountByScreen'),
      onLayoutChanged(inOneColumn) {
        that._alignLabels.bind(that)(that._rootLayoutManager, inOneColumn);
      },
      onContentReady(e) {
        that._alignLabels(e.component, e.component.isSingleColumnMode());
      }
    }));
  }
  _tryGetItemsForTemplate(item) {
    return item.items || [];
  }
  _itemTabbedTemplate(item, e, $container) {
    const $tabPanel = $('<div>').appendTo($container);
    const tabPanelOptions = extend({}, item.tabPanelOptions, {
      dataSource: item.tabs,
      onItemRendered: args => {
        var _item$tabPanelOptions, _item$tabPanelOptions2;
        (_item$tabPanelOptions = item.tabPanelOptions) === null || _item$tabPanelOptions === void 0 || (_item$tabPanelOptions2 = _item$tabPanelOptions.onItemRendered) === null || _item$tabPanelOptions2 === void 0 || _item$tabPanelOptions2.call(_item$tabPanelOptions, args);
        triggerShownEvent(args.itemElement);
      },
      itemTemplate: (itemData, e, container) => {
        const $container = $(container);
        const alignItemLabels = ensureDefined(itemData.alignItemLabels, true);
        const layoutManager = this._renderLayoutManager($container, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(itemData), {
          colCount: itemData.colCount,
          alignItemLabels,
          screenByWidth: this.option('screenByWidth'),
          colCountByScreen: itemData.colCountByScreen,
          cssItemClass: itemData.cssItemClass,
          onLayoutChanged: inOneColumn => {
            // @ts-expect-error ts-error
            this._alignLabelsInColumn({
              $container,
              layoutManager,
              items: itemData.items,
              inOneColumn
            });
          }
        }));
        if (this._itemsRunTimeInfo) {
          this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(itemData.guid, {
            layoutManager
          });
        }
        if (alignItemLabels) {
          // @ts-expect-error ts-error
          this._alignLabelsInColumn({
            $container,
            layoutManager,
            items: itemData.items,
            inOneColumn: layoutManager.isSingleColumnMode()
          });
        }
      }
    });
    const tryUpdateTabPanelInstance = (items, instance) => {
      if (Array.isArray(items)) {
        items.forEach(item => this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid, {
          widgetInstance: instance
        }));
      }
    };
    const tabPanel = this._createComponent($tabPanel, TabPanel, tabPanelOptions);
    $($container).parent().addClass(FIELD_ITEM_CONTENT_HAS_TABS_CLASS);
    // @ts-expect-error ts-error
    tabPanel.on('optionChanged', e => {
      if (e.fullName === 'dataSource') {
        tryUpdateTabPanelInstance(e.value, e.component);
      }
    });
    tryUpdateTabPanelInstance([{
      guid: item.guid
    }, ...(item.tabs ?? [])], tabPanel);
  }
  _itemGroupCaptionTemplate(item, $group, id) {
    if (item.groupCaptionTemplate) {
      const $captionTemplate = $('<div>').addClass(FORM_GROUP_CUSTOM_CAPTION_CLASS).attr('id', id).appendTo($group);
      item._renderGroupCaptionTemplate = () => {
        const data = {
          component: this,
          caption: item.caption,
          name: item.name
        };
        item.groupCaptionTemplate.render({
          model: data,
          container: getPublicElement($captionTemplate)
        });
      };
      item._renderGroupCaptionTemplate();
      return;
    }
    if (item.caption) {
      $('<span>').addClass(FORM_GROUP_CAPTION_CLASS).text(item.caption).attr('id', id).appendTo($group);
    }
  }
  _itemGroupContentTemplate(item, $group) {
    const $groupContent = $('<div>').addClass(FORM_GROUP_CONTENT_CLASS).appendTo($group);
    if (item.groupContentTemplate) {
      item._renderGroupContentTemplate = () => {
        $groupContent.empty();
        const data = {
          formData: this.option('formData'),
          component: this
        };
        item.groupContentTemplate.render({
          model: data,
          container: getPublicElement($groupContent)
        });
      };
      item._renderGroupContentTemplate();
    } else {
      var _this$_itemsRunTimeIn;
      const layoutManager = this._renderLayoutManager($groupContent, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(item), {
        colCount: item.colCount,
        colCountByScreen: item.colCountByScreen,
        alignItemLabels: item.alignItemLabels,
        cssItemClass: item.cssItemClass
      }));
      (_this$_itemsRunTimeIn = this._itemsRunTimeInfo) === null || _this$_itemsRunTimeIn === void 0 || _this$_itemsRunTimeIn.extendRunTimeItemInfoByKey(item.guid, {
        layoutManager
      });
      const colCount = layoutManager._getColCount();
      if (!this._groupsColCount.includes(colCount)) {
        this._groupsColCount.push(colCount);
      }
      $group.addClass(GROUP_COL_COUNT_CLASS + colCount);
      $group.attr(GROUP_COL_COUNT_ATTR, colCount);
    }
  }
  _itemGroupTemplate(item, options, $container) {
    const {
      id
    } = options.editorOptions.inputAttr;
    const $group = $('<div>').toggleClass(FORM_GROUP_WITH_CAPTION_CLASS, isDefined(item.caption) && item.caption.length).addClass(FORM_GROUP_CLASS).appendTo($container);
    const groupAria = {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      labelledby: id
    };
    this.setAria(groupAria, $group);
    $($container).parent().addClass(FIELD_ITEM_CONTENT_HAS_GROUP_CLASS);
    this._itemGroupCaptionTemplate(item, $group, id);
    this._itemGroupContentTemplate(item, $group);
  }
  _createLayoutManagerOptions(items, extendedLayoutManagerOptions) {
    return convertToLayoutManagerOptions({
      form: this,
      formOptions: this.option(),
      $formElement: this.$element(),
      items,
      validationGroup: this._getValidationGroup(),
      extendedLayoutManagerOptions,
      onFieldDataChanged: args => {
        if (!this._isDataUpdating) {
          this._triggerOnFieldDataChanged(args);
        }
      },
      onContentReady: args => {
        var _extendedLayoutManage;
        this._itemsRunTimeInfo.addItemsOrExtendFrom(args.component._itemsRunTimeInfo);
        (_extendedLayoutManage = extendedLayoutManagerOptions.onContentReady) === null || _extendedLayoutManage === void 0 || _extendedLayoutManage.call(extendedLayoutManagerOptions, args);
      },
      onDisposing: _ref2 => {
        let {
          component
        } = _ref2;
        const nestedItemsRunTimeInfo = component.getItemsRunTimeInfo();
        this._itemsRunTimeInfo.removeItemsByItems(nestedItemsRunTimeInfo);
      },
      onFieldItemRendered: () => {
        var _this$_validationSumm;
        (_this$_validationSumm = this._validationSummary) === null || _this$_validationSumm === void 0 || _this$_validationSumm.refreshValidationGroup();
      }
    });
  }
  _renderLayoutManager($parent, layoutManagerOptions) {
    const baseColCountByScreen = {
      lg: layoutManagerOptions.colCount,
      md: layoutManagerOptions.colCount,
      sm: layoutManagerOptions.colCount,
      xs: 1
    };
    this._cachedColCountOptions.push({
      colCountByScreen: extend(baseColCountByScreen, layoutManagerOptions.colCountByScreen)
    });
    const $element = $('<div>');
    $element.appendTo($parent);
    const instance = this._createComponent($element, 'dxLayoutManager', layoutManagerOptions);
    // @ts-expect-error ts-error
    instance.on('autoColCountChanged', () => {
      this._clearAutoColCountChangedTimeout();
      this.autoColCountChangedTimeoutId = setTimeout(() => !this._disposed && this._refresh(), 0);
    });
    // @ts-expect-error ts-error
    this._cachedLayoutManagers.push(instance);
    // @ts-expect-error ts-error
    return instance;
  }
  _getValidationGroup() {
    return this.option('validationGroup') || this;
  }
  // @ts-expect-error ts-error
  _createComponent($element, type, config) {
    const that = this;
    config = config || {};
    that._extendConfig(config, {
      readOnly: that.option('readOnly')
    });
    return super._createComponent($element, type, config);
  }
  _attachSyncSubscriptions() {
    const that = this;
    that.on('optionChanged', args => {
      const optionFullName = args.fullName;
      if (optionFullName === 'formData') {
        if (!isDefined(args.value)) {
          that._options.silent('formData', args.value = {});
        }
        that._triggerOnFieldDataChangedByDataSet(args.value);
      }
      if (that._cachedLayoutManagers.length) {
        each(that._cachedLayoutManagers, (index, layoutManager) => {
          if (optionFullName === 'formData') {
            that._isDataUpdating = true;
            layoutManager.option('layoutData', args.value);
            that._isDataUpdating = false;
          }
          if (args.name === 'readOnly' || args.name === 'disabled') {
            layoutManager.option(optionFullName, args.value);
          }
        });
      }
    });
  }
  _optionChanged(args) {
    const splitFullName = args.fullName.split('.');
    // search() is used because the string can be ['items', ' items ', ' items .', 'items[0]', 'items[ 10 ] .', ...]
    if (splitFullName.length > 1 && splitFullName[0].search('items') !== -1 && this._itemsOptionChangedHandler(args)) {
      return;
    }
    if (splitFullName.length > 1 && splitFullName[0].search('formData') !== -1 && this._formDataOptionChangedHandler(args)) {
      return;
    }
    this._defaultOptionChangedHandler(args);
  }
  _defaultOptionChangedHandler(args) {
    switch (args.name) {
      case 'formData':
        if (!this.option('items')) {
          this._invalidate();
        } else if (isEmptyObject(args.value)) {
          this._clear();
        }
        break;
      case 'onFieldDataChanged':
        break;
      case 'items':
      case 'colCount':
      case 'onEditorEnterKey':
      case 'labelLocation':
      case 'labelMode':
      case 'alignItemLabels':
      case 'showColonAfterLabel':
      case 'customizeItem':
      case 'alignItemLabelsInAllGroups':
      case 'showRequiredMark':
      case 'showOptionalMark':
      case 'requiredMark':
      case 'optionalMark':
      case 'requiredMessage':
      case 'scrollingEnabled':
      case 'formID':
      case 'colCountByScreen':
      case 'screenByWidth':
      case 'stylingMode':
        this._invalidate();
        break;
      case 'showValidationSummary':
        this._renderValidationSummary();
        break;
      case 'minColWidth':
        {
          const {
            colCount
          } = this.option();
          if (colCount === 'auto') {
            this._invalidate();
          }
          break;
        }
      case 'alignRootItemLabels':
      case 'readOnly':
      case 'isDirty':
        break;
      case 'width':
        super._optionChanged(args);
        this._rootLayoutManager.option(args.name, args.value);
        this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
        break;
      case 'validationGroup':
        // @ts-expect-error ts-error
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ValidationEngine.removeGroup(args.previousValue || this);
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _itemsOptionChangedHandler(args) {
    const nameParts = args.fullName.split('.');
    const {
      value
    } = args;
    const itemPath = this._getItemPath(nameParts);
    const item = this.option(itemPath);
    const optionNameWithoutPath = args.fullName.replace(`${itemPath}.`, '');
    const simpleOptionName = optionNameWithoutPath.split('.')[0].replace(/\[\d+]/, '');
    const itemAction = this._tryCreateItemOptionAction(simpleOptionName, item, item[simpleOptionName], args.previousValue, itemPath);
    let result = this._tryExecuteItemOptionAction(itemAction) || this._tryChangeLayoutManagerItemOption(args.fullName, value);
    if (!result && item) {
      this._changeItemOption(item, optionNameWithoutPath, value);
      const items = this._generateItemsFromData(this.option('items'));
      this.option('items', items);
      result = true;
    }
    return result;
  }
  _formDataOptionChangedHandler(args) {
    const nameParts = args.fullName.split('.');
    const {
      value
    } = args;
    const dataField = nameParts.slice(1).join('.');
    const editor = this.getEditor(dataField);
    if (editor) {
      editor.option('value', value);
    } else {
      this._triggerOnFieldDataChanged({
        dataField,
        value
      });
    }
    return true;
  }
  _tryCreateItemOptionAction(optionName, item, value, previousValue, itemPath) {
    if (optionName === 'tabs') {
      this._itemsRunTimeInfo.removeItemsByPathStartWith(`${itemPath}.tabs`);
      value = this._prepareItems(value, true, itemPath, true); // preprocess user value as in _tryPrepareTabbedItem
    }
    return tryCreateItemOptionAction(optionName, {
      item,
      value,
      previousValue,
      itemsRunTimeInfo: this._itemsRunTimeInfo
    });
  }
  _tryExecuteItemOptionAction(action) {
    return action === null || action === void 0 ? void 0 : action.tryExecute();
  }
  _updateValidationGroupAndSummaryIfNeeded(fullName) {
    const optionName = getOptionNameFromFullName(fullName);
    if (ITEM_OPTIONS_FOR_VALIDATION_UPDATING.includes(optionName)) {
      // @ts-expect-error
      ValidationEngine.addGroup(this._getValidationGroup(), false);
      if (this.option('showValidationSummary')) {
        var _this$_validationSumm2;
        (_this$_validationSumm2 = this._validationSummary) === null || _this$_validationSumm2 === void 0 || _this$_validationSumm2.refreshValidationGroup();
      }
    }
  }
  _setLayoutManagerItemOption(layoutManager, optionName, value, path) {
    if (this._updateLockCount > 0) {
      !layoutManager._updateLockCount && layoutManager.beginUpdate();
      const key = this._itemsRunTimeInfo.findKeyByPath(path);
      // @ts-expect-error ts-error
      this.postponedOperations.add(key, () => {
        !layoutManager._disposed && layoutManager.endUpdate();
        return Deferred().resolve();
      });
    }
    const contentReadyHandler = e => {
      e.component.off('contentReady', contentReadyHandler);
      if (isFullPathContainsTabs(path)) {
        const tabPath = tryGetTabPath(path);
        const tabLayoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(tabPath);
        if (tabLayoutManager) {
          // @ts-expect-error ts-error
          this._alignLabelsInColumn({
            items: tabLayoutManager.option('items'),
            layoutManager: tabLayoutManager,
            $container: tabLayoutManager.$element(),
            inOneColumn: tabLayoutManager.isSingleColumnMode()
          });
        }
      } else {
        this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
      }
    };
    layoutManager.on('contentReady', contentReadyHandler);
    layoutManager.option(optionName, value);
    this._updateValidationGroupAndSummaryIfNeeded(optionName);
  }
  _tryChangeLayoutManagerItemOption(fullName, value) {
    const nameParts = fullName.split('.');
    const optionName = getOptionNameFromFullName(fullName);
    if (optionName === 'items' && nameParts.length > 1) {
      const itemPath = this._getItemPath(nameParts);
      const layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(itemPath);
      if (layoutManager) {
        this._itemsRunTimeInfo.removeItemsByItems(layoutManager.getItemsRunTimeInfo());
        const items = this._prepareItems(value, false, itemPath);
        this._setLayoutManagerItemOption(layoutManager, optionName, items, itemPath);
        return true;
      }
    } else if (nameParts.length > 2) {
      const endPartIndex = nameParts.length - 2;
      const itemPath = this._getItemPath(nameParts.slice(0, endPartIndex));
      const layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(itemPath);
      if (layoutManager) {
        const fullOptionName = getFullOptionName(nameParts[endPartIndex], optionName);
        if (optionName === 'editorType') {
          // T903774
          if (layoutManager.option(fullOptionName) !== value) {
            return false;
          }
        }
        if (optionName === 'visible') {
          // T874843
          const formItems = this.option(getFullOptionName(itemPath, 'items'));
          // @ts-expect-error ts-error
          if (formItems !== null && formItems !== void 0 && formItems.length) {
            const layoutManagerItems = layoutManager.option('items');
            // @ts-expect-error ts-error
            formItems.forEach((item, index) => {
              const layoutItem = layoutManagerItems[index];
              layoutItem.visibleIndex = item.visibleIndex;
            });
          }
        }
        this._setLayoutManagerItemOption(layoutManager, fullOptionName, value, itemPath);
        return true;
      }
    }
    return false;
  }
  _tryChangeLayoutManagerItemOptions(itemPath, options) {
    let result;
    this.beginUpdate();
    // @ts-expect-error
    each(options, (optionName, optionValue) => {
      result = this._tryChangeLayoutManagerItemOption(getFullOptionName(itemPath, optionName), optionValue);
      if (!result) {
        return false;
      }
    });
    this.endUpdate();
    return result;
  }
  _getItemPath(nameParts) {
    let itemPath = nameParts[0];
    let i;
    for (i = 1; i < nameParts.length; i++) {
      if (nameParts[i].search(/items\[\d+]|tabs\[\d+]/) !== -1) {
        itemPath += `.${nameParts[i]}`;
      } else {
        break;
      }
    }
    return itemPath;
  }
  _triggerOnFieldDataChanged(args) {
    this._updateIsDirty(args.dataField);
    this._createActionByOption('onFieldDataChanged')(args);
  }
  _triggerOnFieldDataChangedByDataSet(data) {
    if (data && isObject(data)) {
      Object.keys(data).forEach(key => {
        this._triggerOnFieldDataChanged({
          dataField: key,
          value: data[key]
        });
      });
    }
  }
  _updateFieldValue(dataField, value) {
    if (isDefined(this.option('formData'))) {
      const editor = this.getEditor(dataField);
      this.option(`formData.${dataField}`, value);
      if (editor) {
        const editorValue = editor.option('value');
        if (editorValue !== value) {
          editor.option('value', value);
        }
      }
    }
  }
  _generateItemsFromData(items) {
    const formData = this.option('formData');
    const result = [];
    if (!items && isDefined(formData)) {
      each(formData, dataField => {
        // @ts-expect-error
        result.push({
          dataField
        });
      });
    }
    if (items) {
      each(items, (index, item) => {
        if (isObject(item)) {
          // @ts-expect-error
          result.push(item);
        } else {
          // @ts-expect-error
          result.push({
            dataField: item
          });
        }
      });
    }
    return result;
  }
  _getItemByField(field, items) {
    const that = this;
    const fieldParts = isObject(field) ? field : that._getFieldParts(field);
    const {
      fieldName
    } = fieldParts;
    const {
      fieldPath
    } = fieldParts;
    let resultItem;
    if (items.length) {
      // @ts-expect-error ts-error
      each(items, (index, item) => {
        const {
          itemType
        } = item;
        if (fieldPath.length) {
          const path = fieldPath.slice();
          item = that._getItemByFieldPath(path, fieldName, item);
        } else if (itemType === 'group' && !(item.caption || item.name) || itemType === 'tabbed' && !item.name) {
          const subItemsField = that._getSubItemField(itemType);
          item.items = that._generateItemsFromData(item.items);
          item = that._getItemByField({
            fieldName,
            fieldPath
          }, item[subItemsField]);
        }
        if (isEqualToDataFieldOrNameOrTitleOrCaption(item, fieldName)) {
          resultItem = item;
          return false;
        }
      });
    }
    return resultItem;
  }
  _getFieldParts(field) {
    const fieldSeparator = '.';
    let fieldName = field;
    let separatorIndex = fieldName.indexOf(fieldSeparator);
    const resultPath = [];
    while (separatorIndex !== -1) {
      // @ts-expect-error ts-error
      resultPath.push(fieldName.substr(0, separatorIndex));
      fieldName = fieldName.substr(separatorIndex + 1);
      separatorIndex = fieldName.indexOf(fieldSeparator);
    }
    return {
      fieldName,
      fieldPath: resultPath.reverse()
    };
  }
  _getItemByFieldPath(path, fieldName, item) {
    const that = this;
    const {
      itemType
    } = item;
    const subItemsField = that._getSubItemField(itemType);
    const isItemWithSubItems = itemType === 'group' || itemType === 'tabbed' || item.title;
    let result;
    do {
      if (isItemWithSubItems) {
        const name = item.name || item.caption || item.title;
        const isGroupWithName = isDefined(name);
        const nameWithoutSpaces = getTextWithoutSpaces(name);
        let pathNode;
        item[subItemsField] = that._generateItemsFromData(item[subItemsField]);
        if (isGroupWithName) {
          pathNode = path.pop();
        }
        if (!path.length) {
          result = that._getItemByField(fieldName, item[subItemsField]);
          if (result) {
            break;
          }
        }
        if (!isGroupWithName || isGroupWithName && nameWithoutSpaces === pathNode) {
          if (path.length) {
            result = that._searchItemInEverySubItem(path, fieldName, item[subItemsField]);
          }
        }
      } else {
        break;
      }
    } while (path.length && !isDefined(result));
    return result;
  }
  _getSubItemField(itemType) {
    return itemType === 'tabbed' ? 'tabs' : 'items';
  }
  _searchItemInEverySubItem(path, fieldName, items) {
    const that = this;
    let result;
    // @ts-expect-error
    each(items, (index, groupItem) => {
      result = that._getItemByFieldPath(path.slice(), fieldName, groupItem);
      if (result) {
        return false;
      }
    });
    if (!result) {
      result = false;
    }
    return result;
  }
  _changeItemOption(item, option, value) {
    if (isObject(item)) {
      item[option] = value;
    }
  }
  _dimensionChanged() {
    const currentScreenFactor = this._getCurrentScreenFactor();
    if (this._lastMarkupScreenFactor !== currentScreenFactor) {
      if (this._isColCountChanged(this._lastMarkupScreenFactor, currentScreenFactor)) {
        this._targetScreenFactor = currentScreenFactor;
        this._refresh();
        this._targetScreenFactor = undefined;
      }
      this._lastMarkupScreenFactor = currentScreenFactor;
    }
  }
  _isColCountChanged(oldScreenSize, newScreenSize) {
    let isChanged = false;
    // @ts-expect-error
    each(this._cachedColCountOptions, (index, item) => {
      if (item.colCountByScreen[oldScreenSize] !== item.colCountByScreen[newScreenSize]) {
        isChanged = true;
        return false;
      }
    });
    return isChanged;
  }
  _refresh() {
    const editorSelector = `.${TEXTEDITOR_CLASS}.${FOCUSED_STATE_CLASS}:not(.${DROP_DOWN_EDITOR_CLASS}) .${TEXTEDITOR_INPUT_CLASS}`;
    // @ts-expect-error
    eventsEngine.trigger(this.$element().find(editorSelector), 'change');
    super._refresh();
  }
  _updateIsDirty(dataField) {
    const editor = this.getEditor(dataField);
    if (!editor) return;
    if (editor.option('isDirty')) {
      this._dirtyFields.add(dataField);
    } else {
      this._dirtyFields.delete(dataField);
    }
    this.option('isDirty', !!this._dirtyFields.size);
  }
  updateRunTimeInfoForEachEditor(editorAction) {
    this._itemsRunTimeInfo.each((_, itemRunTimeInfo) => {
      const {
        widgetInstance
      } = itemRunTimeInfo;
      // @ts-expect-error
      if (isDefined(widgetInstance) && Editor.isEditor(widgetInstance)) {
        editorAction(widgetInstance);
      }
    });
  }
  _clear() {
    this.updateRunTimeInfoForEachEditor(editor => {
      editor.clear();
      editor.option('isValid', true);
    });
    ValidationEngine.resetGroup(this._getValidationGroup());
  }
  _updateData(data, value, isComplexData) {
    const that = this;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _data = isComplexData ? value : data;
    if (isObject(_data)) {
      each(_data, (dataField, fieldValue) => {
        that._updateData(isComplexData ? `${data}.${dataField}` : dataField, fieldValue, isObject(fieldValue));
      });
    } else if (isString(data)) {
      that._updateFieldValue(data, value);
    }
  }
  registerKeyHandler(key, handler) {
    super.registerKeyHandler(key, handler);
    this._itemsRunTimeInfo.each((_, itemRunTimeInfo) => {
      if (isDefined(itemRunTimeInfo.widgetInstance)) {
        itemRunTimeInfo.widgetInstance.registerKeyHandler(key, handler);
      }
    });
  }
  _focusTarget() {
    return this.$element().find(`.${FIELD_ITEM_CONTENT_CLASS} [tabindex]`).first();
  }
  _visibilityChanged() {
    this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
  }
  _clearAutoColCountChangedTimeout() {
    if (this.autoColCountChangedTimeoutId) {
      clearTimeout(this.autoColCountChangedTimeoutId);
      this.autoColCountChangedTimeoutId = undefined;
    }
  }
  _dispose() {
    this._clearAutoColCountChangedTimeout();
    // @ts-expect-error
    ValidationEngine.removeGroup(this._getValidationGroup());
    super._dispose();
  }
  clear() {
    this._clear();
  }
  reset(editorsData) {
    this.updateRunTimeInfoForEachEditor(editor => {
      const editorName = editor.option('name');
      if (editorsData && editorName in editorsData) {
        editor.reset(editorsData[editorName]);
        this._updateIsDirty(editorName);
      } else {
        editor.reset();
      }
    });
    this._renderValidationSummary();
  }
  updateData(data, value) {
    this._updateData(data, value);
  }
  getEditor(dataField) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(dataField) || this._itemsRunTimeInfo.findWidgetInstanceByName(dataField);
  }
  getButton(name) {
    return this._itemsRunTimeInfo.findWidgetInstanceByName(name);
  }
  updateDimensions() {
    const that = this;
    const deferred = Deferred();
    if (that._scrollable) {
      // @ts-expect-error ts-error
      that._scrollable.update().done(() => {
        // @ts-expect-error ts-error
        deferred.resolveWith(that);
      });
    } else {
      // @ts-expect-error ts-error
      deferred.resolveWith(that);
    }
    return deferred.promise();
  }
  itemOption(id, option, value) {
    const items = this._generateItemsFromData(this.option('items'));
    const item = this._getItemByField(id, items);
    const path = getItemPath(items, item);
    if (!item) {
      return;
    }
    switch (arguments.length) {
      case 1:
        return item;
      case 3:
        {
          const itemAction = this._tryCreateItemOptionAction(option, item, value, item[option], path);
          this._changeItemOption(item, option, value);
          const fullName = getFullOptionName(path, option);
          if (!this._tryExecuteItemOptionAction(itemAction) && !this._tryChangeLayoutManagerItemOption(fullName, value)) {
            this.option('items', items);
          }
          break;
        }
      default:
        {
          if (isObject(option)) {
            if (!this._tryChangeLayoutManagerItemOptions(path, option)) {
              let allowUpdateItems;
              each(option, (optionName, optionValue) => {
                const itemAction = this._tryCreateItemOptionAction(optionName, item, optionValue, item[optionName], path);
                this._changeItemOption(item, optionName, optionValue);
                if (!allowUpdateItems && !this._tryExecuteItemOptionAction(itemAction)) {
                  allowUpdateItems = true;
                }
              });
              allowUpdateItems && this.option('items', items);
            }
          }
          break;
        }
    }
  }
  validate() {
    return ValidationEngine.validateGroup(this._getValidationGroup());
  }
  getItemID(name) {
    const {
      formID
    } = this.option();
    return `dx_${formID}_${name || new Guid()}`;
  }
  getTargetScreenFactor() {
    return this._targetScreenFactor;
  }
}
registerComponent('dxForm', Form);
export default Form;
