/**
* DevExtreme (cjs/__internal/ui/form/m_form.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../ui/validation_summary");
require("../../../ui/validation_group");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _visibility_change = require("../../../common/core/events/visibility_change");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _config = _interopRequireDefault(require("../../../core/config"));
var _element = require("../../../core/element");
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _resize_observer = _interopRequireDefault(require("../../../core/resize_observer"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _themes = require("../../../ui/themes");
var _widget = _interopRequireWildcard(require("../../core/widget/widget"));
var _m_drop_down_editor = require("../../ui/drop_down_editor/m_drop_down_editor");
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _m_label = require("../../ui/form/components/m_label");
var _constants = require("../../ui/form/constants");
var _m_form = _interopRequireDefault(require("../../ui/form/m_form.item_options_actions"));
var _m_form2 = _interopRequireDefault(require("../../ui/form/m_form.items_runtime_info"));
var _m_form3 = _interopRequireDefault(require("../../ui/form/m_form.layout_manager"));
var _m_form4 = require("../../ui/form/m_form.utils");
var _m_validation_engine = _interopRequireDefault(require("../../ui/m_validation_engine"));
var _m_validation_summary = _interopRequireDefault(require("../../ui/m_validation_summary"));
var _scrollable = _interopRequireDefault(require("../../ui/scroll_view/scrollable"));
var _tab_panel = _interopRequireDefault(require("../../ui/tab_panel/tab_panel"));
var _m_text_editor = require("../../ui/text_box/m_text_editor.base");
var _constants2 = require("../../ui/toolbar/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
const ITEM_OPTIONS_FOR_VALIDATION_UPDATING = ['items', 'isRequired', 'validationRules', 'visible'];
class Form extends _widget.default {
  _init() {
    super._init();
    this._dirtyFields = new Set();
    this._cachedColCountOptions = [];
    this._itemsRunTimeInfo = new _m_form2.default();
    this._groupsColCount = [];
    this._attachSyncSubscriptions();
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      formID: `dx-${new _guid.default()}`,
      formData: {},
      colCount: 1,
      screenByWidth: _window.defaultScreenFactorFunc,
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
      optionalMark: _message.default.format('dxForm-optionalMark'),
      // @ts-expect-error ts-error
      requiredMessage: _message.default.getFormatter('dxForm-requiredMessage'),
      showValidationSummary: false,
      scrollingEnabled: false,
      stylingMode: (0, _config.default)().editorStylingMode,
      labelMode: 'outside',
      isDirty: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return (0, _themes.isMaterialBased)((0, _themes.current)());
      },
      options: {
        labelLocation: 'top'
      }
    }, {
      device() {
        return (0, _themes.isMaterial)((0, _themes.current)());
      },
      options: {
        showColonAfterLabel: false
      }
    }]);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    (0, _extend.extend)(this._optionsByReference, {
      formData: true,
      validationGroup: true
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _getGroupColCount($element) {
    return parseInt($element.attr(_constants.GROUP_COL_COUNT_ATTR) ?? '1', 10);
  }
  // eslint-disable-next-line class-methods-use-this
  _applyLabelsWidthByCol($container, index) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const fieldItemClass = options !== null && options !== void 0 && options.inOneColumn ? _constants.FIELD_ITEM_CLASS : _constants.FORM_FIELD_ITEM_COL_CLASS + index;
    const cssExcludeTabbedSelector = options !== null && options !== void 0 && options.excludeTabbed ? `:not(.${_constants.FIELD_ITEM_TAB_CLASS})` : '';
    (0, _m_label.setLabelWidthByMaxLabelWidth)($container, `.${fieldItemClass}${cssExcludeTabbedSelector}`);
  }
  _applyLabelsWidth($container, excludeTabbed, inOneColumn, colCount) {
    const applyLabelsOptions = {
      excludeTabbed,
      inOneColumn
    };
    const columnsCount = inOneColumn ? 1 : colCount ?? this._getGroupColCount($container);
    for (let i = 0; i < columnsCount; i += 1) {
      this._applyLabelsWidthByCol($container, i, applyLabelsOptions);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _getGroupElementsInColumn($container, columnIndex, colCount) {
    const cssColCountSelector = (0, _type.isDefined)(colCount) ? `.${_constants.GROUP_COL_COUNT_CLASS}${colCount}` : '';
    const groupSelector = `.${_constants.FORM_FIELD_ITEM_COL_CLASS}${columnIndex} > .${_constants.FIELD_ITEM_CONTENT_CLASS} > .${_constants.FORM_GROUP_CLASS}${cssColCountSelector}`;
    return $container.find(groupSelector);
  }
  _applyLabelsWidthWithGroups($container, colCount, excludeTabbed) {
    const {
      alignRootItemLabels
    } = this.option();
    if (alignRootItemLabels === true) {
      // TODO: private option
      const $rootSimpleItems = $container.find(`.${_constants.ROOT_SIMPLE_ITEM_CLASS}`);
      for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
        // TODO: root items are aligned with root items only
        // this code doesn't align root items with grouped items in the same column
        // (see T942517)
        this._applyLabelsWidthByCol($rootSimpleItems, colIndex);
      }
    }
    const alignItemLabelsInAllGroups = this.option('alignItemLabelsInAllGroups');
    if (alignItemLabelsInAllGroups) {
      this._applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed);
    } else {
      const $groups = this.$element().find(`.${_constants.FORM_GROUP_CLASS}`);
      for (let i = 0; i < $groups.length; i += 1) {
        this._applyLabelsWidth($groups.eq(i), excludeTabbed, false, undefined);
      }
    }
  }
  _applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed) {
    const applyLabelsOptions = {
      excludeTabbed
    };
    for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
      const $baseGroups = this._getGroupElementsInColumn($container, colIndex);
      this._applyLabelsWidthByCol($baseGroups, 0, applyLabelsOptions);
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let groupsColIndex = 0; groupsColIndex < this._groupsColCount.length; groupsColIndex += 1) {
        const $groupsByCol = this._getGroupElementsInColumn($container, colIndex, this._groupsColCount[groupsColIndex]);
        const groupColCount = this._getGroupColCount($groupsByCol);
        for (let groupColIndex = 1; groupColIndex < groupColCount; groupColIndex += 1) {
          this._applyLabelsWidthByCol($groupsByCol, groupColIndex, applyLabelsOptions);
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
  _alignLabelsInColumn(options) {
    const {
      layoutManager,
      inOneColumn,
      $container,
      excludeTabbed,
      items
    } = options;
    if (!(0, _window.hasWindow)() || this._labelLocation() === 'top') {
      // TODO: label location can be changed to 'left/right' for some labels
      // but this condition disables alignment for such items
      return;
    }
    if (inOneColumn) {
      this._applyLabelsWidth($container, excludeTabbed, true, undefined);
    } else if (this._checkGrouping(items)) {
      this._applyLabelsWidthWithGroups($container, layoutManager._getColCount(), excludeTabbed);
    } else {
      this._applyLabelsWidth($container, excludeTabbed, false, layoutManager._getColCount());
    }
  }
  _prepareFormData() {
    if (!(0, _type.isDefined)(this.option('formData'))) {
      this.option('formData', {});
    }
  }
  _setStylingModeClass() {
    const {
      stylingMode
    } = this.option();
    if (stylingMode === 'underlined') {
      this.$element().addClass(_constants.FORM_UNDERLINED_CLASS);
    }
  }
  _initMarkup() {
    _m_validation_engine.default.addGroup(this._getValidationGroup(), false);
    this._clearCachedInstances();
    this._prepareFormData();
    this.$element().addClass(_constants.FORM_CLASS);
    this._setStylingModeClass();
    super._initMarkup();
    this.setAria('role', 'form', this.$element());
    const {
      scrollingEnabled
    } = this.option();
    if (scrollingEnabled) {
      this._renderScrollable();
    }
    this._renderLayout();
    this._renderValidationSummary();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._lastMarkupScreenFactor = this._targetScreenFactor || this._getCurrentScreenFactor();
    this._attachResizeObserverSubscription();
  }
  _attachResizeObserverSubscription() {
    if ((0, _window.hasWindow)()) {
      const formRootElement = this.$element().get(0);
      _resize_observer.default.unobserve(formRootElement);
      _resize_observer.default.observe(formRootElement, () => {
        this._resizeHandler();
      });
    }
  }
  _resizeHandler() {
    if (this._cachedLayoutManagers.length) {
      (0, _iterator.each)(this._cachedLayoutManagers, (_, layoutManager) => {
        const {
          onLayoutChanged
        } = layoutManager.option();
        onLayoutChanged === null || onLayoutChanged === void 0 || onLayoutChanged(layoutManager.isSingleColumnMode());
      });
    }
  }
  _getCurrentScreenFactor() {
    const {
      screenByWidth
    } = this.option();
    if ((0, _window.hasWindow)()) {
      const currentScreenFactor = (0, _window.getCurrentScreenFactor)(screenByWidth);
      return currentScreenFactor;
    }
    return 'lg';
  }
  _clearCachedInstances() {
    this._itemsRunTimeInfo.clear();
    this._cachedLayoutManagers = [];
  }
  _alignLabels(layoutManager, inOneColumn) {
    const {
      items
    } = this.option();
    this._alignLabelsInColumn({
      $container: this.$element(),
      layoutManager,
      excludeTabbed: true,
      items,
      inOneColumn
    });
    (0, _visibility_change.triggerResizeEvent)(this.$element().find(`.${_constants2.TOOLBAR_CLASS}`));
  }
  _clean() {
    this._clearValidationSummary();
    super._clean();
    this._groupsColCount = [];
    this._cachedColCountOptions = [];
    // @ts-expect-error ts-error
    this._lastMarkupScreenFactor = undefined;
    _resize_observer.default.unobserve(this.$element().get(0));
  }
  _renderScrollable() {
    const useNativeScrolling = this.option('useNativeScrolling');
    // @ts-expect-error ts-error
    this._scrollable = new _scrollable.default(this.$element(), {
      useNative: !!useNativeScrolling,
      useSimulatedScrollbar: !useNativeScrolling,
      useKeyboard: false,
      direction: 'both',
      bounceEnabled: false
    });
  }
  _getContent() {
    var _this$_scrollable;
    const {
      scrollingEnabled
    } = this.option();
    return scrollingEnabled ? (0, _renderer.default)((_this$_scrollable = this._scrollable) === null || _this$_scrollable === void 0 ? void 0 : _this$_scrollable.content()) : this.$element();
  }
  _clearValidationSummary() {
    var _this$_$validationSum;
    (_this$_$validationSum = this._$validationSummary) === null || _this$_$validationSum === void 0 || _this$_$validationSum.remove();
    this._$validationSummary = undefined;
    this._validationSummary = undefined;
  }
  _renderValidationSummary() {
    this._clearValidationSummary();
    const {
      showValidationSummary
    } = this.option();
    if (showValidationSummary) {
      this._$validationSummary = (0, _renderer.default)('<div>').addClass(_constants.FORM_VALIDATION_SUMMARY).appendTo(this._getContent());
      this._validationSummary = super._createComponent(this._$validationSummary, _m_validation_summary.default, {
        validationGroup: this._getValidationGroup()
      });
    }
  }
  _prepareItems(items, parentIsTabbedItem, currentPath, isTabs) {
    if (items) {
      const result = [];
      for (let i = 0; i < items.length; i += 1) {
        let item = items[i];
        const path = (0, _m_form4.concatPaths)(currentPath, (0, _m_form4.createItemPathByIndex)(i, isTabs));
        const itemRunTimeInfo = {
          item,
          itemIndex: i,
          path
        };
        const guid = this._itemsRunTimeInfo.add(itemRunTimeInfo);
        if ((0, _type.isString)(item)) {
          item = {
            dataField: item
          };
        }
        if ((0, _type.isObject)(item)) {
          const preparedItem = _extends({}, item);
          itemRunTimeInfo.preparedItem = preparedItem;
          preparedItem.guid = guid;
          this._tryPrepareGroupItemCaption(preparedItem);
          this._tryPrepareGroupItem(preparedItem);
          this._tryPrepareTabbedItem(preparedItem, path);
          this._tryPrepareItemTemplate(preparedItem);
          if (parentIsTabbedItem) {
            preparedItem.cssItemClass = _constants.FIELD_ITEM_TAB_CLASS;
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
    return items;
  }
  // eslint-disable-next-line class-methods-use-this
  _isGroupItem(item) {
    return item.itemType === 'group';
  }
  _tryPrepareGroupItemCaption(item) {
    if (this._isGroupItem(item)) {
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
    if (this._isGroupItem(item)) {
      item.alignItemLabels = (0, _common.ensureDefined)(item.alignItemLabels, true);
      item._prepareGroupItemTemplate = itemTemplate => {
        if (item.template) {
          item.groupContentTemplate = this._getTemplate(itemTemplate);
        }
        item.template = this._itemGroupTemplate.bind(this, item);
      };
      item._prepareGroupItemTemplate(item.template);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _isTabbedItem(item) {
    return item.itemType === 'tabbed';
  }
  _tryPrepareTabbedItem(item, path) {
    if (this._isTabbedItem(item)) {
      item.template = this._itemTabbedTemplate.bind(this, item);
      item.tabs = this._prepareItems(item.tabs, true, path, true);
    }
  }
  _tryPrepareItemTemplate(item) {
    if (item.template) {
      item.template = this._getTemplate(item.template);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _checkGrouping(items) {
    if (items) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (item.itemType === 'group') {
          return true;
        }
      }
    }
    return false;
  }
  _renderLayout() {
    const {
      items
    } = this.option();
    const $content = this._getContent();
    // TODO: Introduce this.preparedItems and use it for partial rerender???
    // Compare new preparedItems with old preparedItems to detect what should be rerendered?
    const preparedItems = this._prepareItems(items);
    const {
      colCount,
      alignItemLabels,
      screenByWidth,
      colCountByScreen
    } = this.option();
    this._rootLayoutManager = this._renderLayoutManager($content, this._createLayoutManagerOptions(preparedItems, {
      isRoot: true,
      colCount,
      alignItemLabels,
      screenByWidth,
      colCountByScreen,
      onLayoutChanged: inOneColumn => {
        this._alignLabels.bind(this)(this._rootLayoutManager, inOneColumn);
      },
      onContentReady: e => {
        this._alignLabels(e.component, e.component.isSingleColumnMode());
      }
    }));
  }
  // eslint-disable-next-line class-methods-use-this
  _tryGetItemsForTemplate(item) {
    return item.items ?? [];
  }
  _itemTabbedTemplate(tabbedItem, data, $itemContainer) {
    const $tabPanel = (0, _renderer.default)('<div>').appendTo($itemContainer);
    const tabPanelOptions = _extends({}, tabbedItem.tabPanelOptions, {
      dataSource: tabbedItem.tabs,
      onItemRendered: args => {
        var _tabbedItem$tabPanelO, _tabbedItem$tabPanelO2;
        (_tabbedItem$tabPanelO = tabbedItem.tabPanelOptions) === null || _tabbedItem$tabPanelO === void 0 || (_tabbedItem$tabPanelO2 = _tabbedItem$tabPanelO.onItemRendered) === null || _tabbedItem$tabPanelO2 === void 0 || _tabbedItem$tabPanelO2.call(_tabbedItem$tabPanelO, args);
        (0, _visibility_change.triggerShownEvent)(args.itemElement);
      },
      itemTemplate: (itemData, e, container) => {
        const {
          screenByWidth
        } = this.option();
        const $container = (0, _renderer.default)(container);
        const alignItemLabels = (0, _common.ensureDefined)(itemData.alignItemLabels, true);
        const layoutManager = this._renderLayoutManager($container, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(itemData), {
          colCount: itemData.colCount,
          alignItemLabels,
          screenByWidth,
          colCountByScreen: itemData.colCountByScreen,
          cssItemClass: itemData.cssItemClass,
          onLayoutChanged: inOneColumn => {
            this._alignLabelsInColumn({
              $container: (0, _renderer.default)(container),
              layoutManager,
              items: itemData.items,
              inOneColumn,
              excludeTabbed: false
            });
          }
        }));
        if (this._itemsRunTimeInfo) {
          this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(itemData.guid ?? '', {
            layoutManager
          });
        }
        if (alignItemLabels) {
          this._alignLabelsInColumn({
            $container,
            layoutManager,
            items: itemData.items,
            inOneColumn: layoutManager.isSingleColumnMode(),
            excludeTabbed: false
          });
        }
      }
    });
    const tryUpdateTabPanelInstance = (items, instance) => {
      if (Array.isArray(items)) {
        items.forEach(item => this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid ?? '', {
          widgetInstance: instance
        }));
      }
    };
    const tabPanel = this._createComponent($tabPanel, _tab_panel.default, tabPanelOptions);
    (0, _renderer.default)($itemContainer).parent().addClass(_constants.FIELD_ITEM_CONTENT_HAS_TABS_CLASS);
    tabPanel.on('optionChanged', eventArgs => {
      const {
        fullName,
        value,
        component
      } = eventArgs;
      if (fullName === 'dataSource') {
        tryUpdateTabPanelInstance(value, component);
      }
    });
    tryUpdateTabPanelInstance([{
      guid: tabbedItem.guid
    }, ...(tabbedItem.tabs ?? [])], tabPanel);
  }
  _itemGroupCaptionTemplate(item, $group, id) {
    if (item.groupCaptionTemplate) {
      const $captionTemplate = (0, _renderer.default)('<div>').addClass(_constants.FORM_GROUP_CUSTOM_CAPTION_CLASS).attr('id', id).appendTo($group);
      item._renderGroupCaptionTemplate = () => {
        var _item$groupCaptionTem;
        const data = {
          component: this,
          caption: item.caption,
          name: item.name
        };
        (_item$groupCaptionTem = item.groupCaptionTemplate) === null || _item$groupCaptionTem === void 0 || _item$groupCaptionTem.render({
          model: data,
          container: (0, _element.getPublicElement)($captionTemplate)
        });
      };
      item._renderGroupCaptionTemplate();
      return;
    }
    if (item.caption) {
      (0, _renderer.default)('<span>').addClass(_constants.FORM_GROUP_CAPTION_CLASS).text(item.caption).attr('id', id).appendTo($group);
    }
  }
  _itemGroupContentTemplate(item, $group) {
    const $groupContent = (0, _renderer.default)('<div>').addClass(_constants.FORM_GROUP_CONTENT_CLASS).appendTo($group);
    if (item.groupContentTemplate) {
      item._renderGroupContentTemplate = () => {
        var _item$groupContentTem;
        $groupContent.empty();
        const data = {
          formData: this.option('formData'),
          component: this
        };
        (_item$groupContentTem = item.groupContentTemplate) === null || _item$groupContentTem === void 0 || _item$groupContentTem.render({
          model: data,
          container: (0, _element.getPublicElement)($groupContent)
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
      (_this$_itemsRunTimeIn = this._itemsRunTimeInfo) === null || _this$_itemsRunTimeIn === void 0 || _this$_itemsRunTimeIn.extendRunTimeItemInfoByKey(item.guid ?? '', {
        layoutManager
      });
      const colCount = layoutManager._getColCount();
      if (!this._groupsColCount.includes(colCount)) {
        this._groupsColCount.push(colCount);
      }
      $group.addClass(_constants.GROUP_COL_COUNT_CLASS + colCount);
      $group.attr(_constants.GROUP_COL_COUNT_ATTR, colCount);
    }
  }
  _itemGroupTemplate(item, options, $container) {
    var _item$caption;
    const {
      id
    } = options.editorOptions.inputAttr;
    const $group = (0, _renderer.default)('<div>').toggleClass(_constants.FORM_GROUP_WITH_CAPTION_CLASS, !!((_item$caption = item.caption) !== null && _item$caption !== void 0 && _item$caption.length)).addClass(_constants.FORM_GROUP_CLASS).appendTo($container);
    const groupAria = {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      labelledby: id
    };
    this.setAria(groupAria, $group);
    (0, _renderer.default)($container).parent().addClass(_constants.FIELD_ITEM_CONTENT_HAS_GROUP_CLASS);
    this._itemGroupCaptionTemplate(item, $group, id);
    this._itemGroupContentTemplate(item, $group);
  }
  _createLayoutManagerOptions(items, extendedLayoutManagerOptions) {
    return (0, _m_form4.convertToLayoutManagerOptions)({
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
      onDisposing: e => {
        const {
          component
        } = e;
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
      colCountByScreen: (0, _extend.extend)(baseColCountByScreen, layoutManagerOptions.colCountByScreen)
    });
    const $element = (0, _renderer.default)('<div>');
    $element.appendTo($parent);
    const instance = this._createComponent($element, _m_form3.default, layoutManagerOptions);
    instance.on('autoColCountChanged', () => {
      this._clearAutoColCountChangedTimeout();
      // eslint-disable-next-line no-restricted-globals
      this.autoColCountChangedTimeoutId = setTimeout(() => !this._disposed && this._refresh(), 0);
    });
    this._cachedLayoutManagers.push(instance);
    return instance;
  }
  _getValidationGroup() {
    const {
      validationGroup
    } = this.option();
    // @ts-expect-error ts-error
    return validationGroup ?? this;
  }
  _createComponent(element, component,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentConfiguration) {
    const {
      readOnly
    } = this.option();
    this._extendConfig(componentConfiguration, {
      readOnly
    });
    return super._createComponent(element, component, componentConfiguration);
  }
  _attachSyncSubscriptions() {
    this.on('optionChanged', args => {
      const {
        fullName,
        name
      } = args;
      if (fullName === 'formData') {
        if (!(0, _type.isDefined)(args.value)) {
          this._options.silent('formData', args.value = {});
        }
        this._triggerOnFieldDataChangedByDataSet(args.value);
      }
      if (this._cachedLayoutManagers.length) {
        (0, _iterator.each)(this._cachedLayoutManagers, (_index, layoutManager) => {
          if (fullName === 'formData') {
            this._isDataUpdating = true;
            layoutManager.option('layoutData', args.value);
            this._isDataUpdating = false;
          }
          if (name === 'readOnly' || name === 'disabled') {
            layoutManager.option(fullName, args.value);
          }
        });
      }
    });
  }
  _optionChanged(args) {
    const {
      fullName
    } = args;
    const splitFullName = fullName.split('.');
    // search() is used because the string can be
    // ['items', ' items ', ' items .', 'items[0]', 'items[ 10 ] .', ...]
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
        } else if ((0, _type.isEmptyObject)(args.value)) {
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
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        _m_validation_engine.default.removeGroup(args.previousValue || this);
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _itemsOptionChangedHandler(args) {
    const {
      value,
      fullName
    } = args;
    const nameParts = fullName.split('.');
    const itemPath = this._getItemPath(nameParts);
    const item = this.option(itemPath);
    const optionNameWithoutPath = fullName.replace(`${itemPath}.`, '');
    const simpleOptionName = optionNameWithoutPath.split('.')[0].replace(/\[\d+]/, '');
    const itemAction = this._tryCreateItemOptionAction(simpleOptionName, item, item[simpleOptionName], args.previousValue, itemPath);
    let result = this._tryExecuteItemOptionAction(itemAction) ?? this._tryChangeLayoutManagerItemOption(fullName, value);
    if (!result && item) {
      this._changeItemOption(item, optionNameWithoutPath, value);
      const {
        items
      } = this.option();
      const generatedItems = this._generateItemsFromData(items);
      this.option('items', generatedItems);
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
    let currentValue = value;
    if (optionName === 'tabs') {
      this._itemsRunTimeInfo.removeItemsByPathStartWith(`${itemPath}.tabs`);
      // preprocess user value as in _tryPrepareTabbedItem
      currentValue = this._prepareItems(currentValue, true, itemPath, true);
    }
    return (0, _m_form.default)(optionName, {
      item,
      value: currentValue,
      previousValue,
      itemsRunTimeInfo: this._itemsRunTimeInfo
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _tryExecuteItemOptionAction(action) {
    return action === null || action === void 0 ? void 0 : action.tryExecute();
  }
  _updateValidationGroupAndSummaryIfNeeded(fullName) {
    const optionName = (0, _m_form4.getOptionNameFromFullName)(fullName);
    if (ITEM_OPTIONS_FOR_VALIDATION_UPDATING.includes(optionName)) {
      _m_validation_engine.default.addGroup(this._getValidationGroup(), false);
      if (this.option('showValidationSummary')) {
        var _this$_validationSumm2;
        (_this$_validationSumm2 = this._validationSummary) === null || _this$_validationSumm2 === void 0 || _this$_validationSumm2.refreshValidationGroup();
      }
    }
  }
  _setLayoutManagerItemOption(layoutManager, optionName, value, path) {
    if (this._updateLockCount > 0) {
      if (!layoutManager._updateLockCount) {
        layoutManager.beginUpdate();
      }
      const key = this._itemsRunTimeInfo.findKeyByPath(path);
      // @ts-expect-error ts-error
      this.postponedOperations.add(key, () => {
        if (!layoutManager._disposed) {
          layoutManager.endUpdate();
        }
        return (0, _deferred.Deferred)().resolve();
      });
    }
    const contentReadyHandler = e => {
      e.component.off('contentReady', contentReadyHandler);
      if ((0, _m_form4.isFullPathContainsTabs)(path)) {
        const tabPath = (0, _m_form4.tryGetTabPath)(path);
        const tabLayoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(tabPath);
        if (tabLayoutManager) {
          const {
            items
          } = tabLayoutManager.option();
          this._alignLabelsInColumn({
            items,
            layoutManager: tabLayoutManager,
            $container: tabLayoutManager.$element(),
            inOneColumn: tabLayoutManager.isSingleColumnMode(),
            excludeTabbed: false
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
    const optionName = (0, _m_form4.getOptionNameFromFullName)(fullName);
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
        const fullOptionName = (0, _m_form4.getFullOptionName)(nameParts[endPartIndex], optionName);
        if (optionName === 'editorType') {
          // T903774
          if (layoutManager.option(fullOptionName) !== value) {
            return false;
          }
        }
        if (optionName === 'visible') {
          // T874843
          const formItems = this.option((0, _m_form4.getFullOptionName)(itemPath, 'items'));
          if (formItems !== null && formItems !== void 0 && formItems.length) {
            const {
              items: layoutManagerItems
            } = layoutManager.option();
            formItems.forEach((item, index) => {
              // @ts-expect-error ts-error
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
    let result = false;
    this.beginUpdate();
    (0, _iterator.each)(options, (optionName, optionValue) => {
      result = this._tryChangeLayoutManagerItemOption((0, _m_form4.getFullOptionName)(itemPath, optionName), optionValue);
      if (!result) {
        return false;
      }
      return true;
    });
    this.endUpdate();
    return result;
  }
  // eslint-disable-next-line class-methods-use-this
  _getItemPath(nameParts) {
    let itemPath = nameParts[0];
    for (let i = 1; i < nameParts.length; i += 1) {
      if (nameParts[i].search(/items\[\d+]|tabs\[\d+]/) !== -1) {
        itemPath += `.${nameParts[i]}`;
      } else {
        break;
      }
    }
    return itemPath;
  }
  _triggerOnFieldDataChanged(args) {
    this._updateIsDirty(args.dataField ?? '');
    this._createActionByOption('onFieldDataChanged')(args);
  }
  _triggerOnFieldDataChangedByDataSet(data) {
    if (data && (0, _type.isObject)(data)) {
      Object.keys(data).forEach(key => {
        this._triggerOnFieldDataChanged({
          dataField: key,
          value: data[key]
        });
      });
    }
  }
  _updateFieldValue(dataField, value) {
    const {
      formData
    } = this.option();
    if ((0, _type.isDefined)(formData)) {
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
    const {
      formData
    } = this.option();
    const result = [];
    if (!items && (0, _type.isDefined)(formData)) {
      (0, _iterator.each)(formData, dataField => {
        result.push({
          dataField
        });
      });
    }
    if (items) {
      (0, _iterator.each)(items, (_index, item) => {
        if ((0, _type.isObject)(item)) {
          result.push(item);
        } else {
          result.push({
            dataField: item
          });
        }
      });
    }
    return result;
  }
  _getItemByField(field, items) {
    const fieldParts = (0, _type.isObject)(field) ? field : this._getFieldParts(field);
    const {
      fieldName
    } = fieldParts;
    const {
      fieldPath
    } = fieldParts;
    let resultItem = false;
    if (items.length) {
      (0, _iterator.each)(items, (_index, item) => {
        const {
          itemType
        } = item;
        if (fieldPath.length) {
          const path = fieldPath.slice();
          // @ts-expect-error ts-error
          // eslint-disable-next-line no-param-reassign
          item = this._getItemByFieldPath(path, fieldName, item);
        } else if (this._isGroupItem(item) && !(item.caption || item.name) || itemType === 'tabbed' && !item.name) {
          const subItemsField = this._getSubItemField(itemType);
          item.items = this._generateItemsFromData(item.items);
          // @ts-expect-error ts-error
          // eslint-disable-next-line no-param-reassign
          item = this._getItemByField({
            fieldName,
            fieldPath
          }, item[subItemsField]);
        }
        if ((0, _m_form4.isEqualToDataFieldOrNameOrTitleOrCaption)(item, fieldName)) {
          resultItem = item;
          return false;
        }
        return true;
      });
    }
    return resultItem;
  }
  // eslint-disable-next-line class-methods-use-this
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
    const {
      itemType
    } = item;
    const subItemsField = this._getSubItemField(itemType);
    const isItemWithSubItems = itemType === 'group' || itemType === 'tabbed' || item.title;
    let result = false;
    do {
      if (isItemWithSubItems) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const name = item.name || item.caption || item.title;
        const isGroupWithName = (0, _type.isDefined)(name);
        const nameWithoutSpaces = (0, _m_form4.getTextWithoutSpaces)(name);
        let pathNode = '';
        item[subItemsField] = this._generateItemsFromData(item[subItemsField]);
        if (isGroupWithName) {
          pathNode = path.pop();
        }
        if (!path.length) {
          result = this._getItemByField(fieldName, item[subItemsField]);
          if (result) {
            break;
          }
        }
        if (!isGroupWithName || isGroupWithName && nameWithoutSpaces === pathNode) {
          if (path.length) {
            result = this._searchItemInEverySubItem(path, fieldName, item[subItemsField]);
          }
        }
      } else {
        break;
      }
    } while (path.length && !(0, _type.isDefined)(result));
    return result;
  }
  // eslint-disable-next-line class-methods-use-this
  _getSubItemField(itemType) {
    return itemType === 'tabbed' ? 'tabs' : 'items';
  }
  _searchItemInEverySubItem(path, fieldName, items) {
    let result = false;
    (0, _iterator.each)(items, (_index, groupItem) => {
      result = this._getItemByFieldPath(path.slice(), fieldName, groupItem);
      if (result) {
        return false;
      }
      return true;
    });
    if (!result) {
      return false;
    }
    return result;
  }
  // eslint-disable-next-line class-methods-use-this
  _changeItemOption(item, option, value) {
    if ((0, _type.isObject)(item)) {
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
    (0, _iterator.each)(this._cachedColCountOptions, (_index, item) => {
      if (item.colCountByScreen[oldScreenSize] !== item.colCountByScreen[newScreenSize]) {
        isChanged = true;
        return false;
      }
      return true;
    });
    return isChanged;
  }
  _refresh() {
    const editorSelector = `.${_m_text_editor.TEXTEDITOR_CLASS}.${_widget.FOCUSED_STATE_CLASS}:not(.${_m_drop_down_editor.DROP_DOWN_EDITOR_CLASS}) .${_m_text_editor.TEXTEDITOR_INPUT_CLASS}`;
    // @ts-expect-error ts-error
    _events_engine.default.trigger(this.$element().find(editorSelector), 'change');
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
      if ((0, _type.isDefined)(widgetInstance) && _editor.default.isEditor(widgetInstance)) {
        editorAction(widgetInstance);
      }
    });
  }
  _clear() {
    this.updateRunTimeInfoForEachEditor(editor => {
      editor.clear();
      editor.option('isValid', true);
    });
    _m_validation_engine.default.resetGroup(this._getValidationGroup());
  }
  _updateData(data, value, isComplexData) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _data = isComplexData ? value : data;
    if ((0, _type.isObject)(_data)) {
      (0, _iterator.each)(_data, (dataField, fieldValue) => {
        this._updateData(isComplexData ? `${data}.${dataField}` : dataField, fieldValue, (0, _type.isObject)(fieldValue));
      });
    } else if ((0, _type.isString)(data)) {
      this._updateFieldValue(data, value);
    }
  }
  registerKeyHandler(key, handler) {
    super.registerKeyHandler(key, handler);
    this._itemsRunTimeInfo.each((_, itemRunTimeInfo) => {
      if ((0, _type.isDefined)(itemRunTimeInfo.widgetInstance)) {
        itemRunTimeInfo.widgetInstance.registerKeyHandler(key, handler);
      }
    });
  }
  _focusTarget() {
    return this.$element().find(`.${_constants.FIELD_ITEM_CONTENT_CLASS} [tabindex]`).first();
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
    _m_validation_engine.default.removeGroup(this._getValidationGroup());
    super._dispose();
  }
  clear() {
    this._clear();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reset(editorsData) {
    this.updateRunTimeInfoForEachEditor(editor => {
      const {
        name = ''
      } = editor.option();
      if (editorsData && name in editorsData) {
        editor.reset(editorsData[name]);
        this._updateIsDirty(name);
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
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(dataField) ?? this._itemsRunTimeInfo.findWidgetInstanceByName(dataField);
  }
  getButton(name) {
    return this._itemsRunTimeInfo.findWidgetInstanceByName(name);
  }
  updateDimensions() {
    const deferred = (0, _deferred.Deferred)();
    if (this._scrollable) {
      this._scrollable.update().done(() => {
        // @ts-expect-error ts-error
        deferred.resolveWith(this);
      });
    } else {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    }
    return deferred.promise();
  }
  itemOption(id, option, value) {
    const {
      items
    } = this.option();
    const generatedItems = this._generateItemsFromData(items);
    const item = this._getItemByField(id, generatedItems);
    const path = (0, _m_form4.getItemPath)(generatedItems, item);
    if (!item) {
      return undefined;
    }
    if (arguments.length === 1) {
      return item;
    }
    switch (arguments.length) {
      case 3:
        {
          const itemAction = this._tryCreateItemOptionAction(option, item, value, item[option ?? ''], path);
          this._changeItemOption(item, option ?? '', value);
          const fullName = (0, _m_form4.getFullOptionName)(path, option);
          if (!this._tryExecuteItemOptionAction(itemAction) && !this._tryChangeLayoutManagerItemOption(fullName, value)) {
            this.option('items', generatedItems);
          }
          break;
        }
      default:
        {
          if ((0, _type.isObject)(option)) {
            if (!this._tryChangeLayoutManagerItemOptions(path, option)) {
              let allowUpdateItems = false;
              (0, _iterator.each)(option, (optionName, optionValue) => {
                const itemAction = this._tryCreateItemOptionAction(optionName, item, optionValue, item[optionName], path);
                this._changeItemOption(item, optionName, optionValue);
                if (!allowUpdateItems && !this._tryExecuteItemOptionAction(itemAction)) {
                  allowUpdateItems = true;
                }
              });
              if (allowUpdateItems) {
                this.option('items', generatedItems);
              }
            }
          }
          break;
        }
    }
    return undefined;
  }
  validate() {
    return _m_validation_engine.default.validateGroup(this._getValidationGroup());
  }
  getItemID(name) {
    const {
      formID
    } = this.option();
    return `dx_${formID}_${name || new _guid.default()}`;
  }
  getTargetScreenFactor() {
    return this._targetScreenFactor;
  }
}
(0, _component_registrator.default)('dxForm', Form);
var _default = exports.default = Form;
