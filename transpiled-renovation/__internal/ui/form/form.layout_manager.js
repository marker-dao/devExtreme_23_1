"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../ui/text_box");
require("../../../ui/number_box");
require("../../../ui/check_box");
require("../../../ui/date_box");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _remove = require("../../../common/core/events/remove");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _array = require("../../../core/utils/array");
var _data = require("../../../core/utils/data");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _variable_wrapper = _interopRequireDefault(require("../../../core/utils/variable_wrapper"));
var _window = require("../../../core/utils/window");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _wrapper = _interopRequireDefault(require("../../ui/button/wrapper"));
var _button_item = require("../../ui/form/components/button_item");
var _empty_item = require("../../ui/form/components/empty_item");
var _field_item = require("../../ui/form/components/field_item");
var _constants = require("../../ui/form/constants");
var _form = _interopRequireDefault(require("../../ui/form/form.items_runtime_info"));
var _formLayout_manager = require("../../ui/form/form.layout_manager.utils");
var _responsive_box = _interopRequireDefault(require("../../ui/responsive_box"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
const FORM_EDITOR_BY_DEFAULT = 'dxTextBox';
const LAYOUT_MANAGER_FIRST_ROW_CLASS = 'dx-first-row';
const LAYOUT_MANAGER_LAST_ROW_CLASS = 'dx-last-row';
const LAYOUT_MANAGER_FIRST_COL_CLASS = 'dx-first-col';
const LAYOUT_MANAGER_LAST_COL_CLASS = 'dx-last-col';
const MIN_COLUMN_WIDTH = 200;
class LayoutManager extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      layoutData: {},
      readOnly: false,
      colCount: 1,
      labelLocation: 'left',
      // @ts-expect-error ts-error
      onFieldDataChanged: null,
      // @ts-expect-error ts-error
      onEditorEnterKey: null,
      // @ts-expect-error ts-error
      customizeItem: null,
      alignItemLabels: true,
      minColWidth: MIN_COLUMN_WIDTH,
      showRequiredMark: true,
      // @ts-expect-error ts-error
      screenByWidth: null,
      showOptionalMark: false,
      requiredMark: '*',
      labelMode: 'outside',
      optionalMark: _message.default.format('dxForm-optionalMark'),
      // @ts-expect-error ts-error
      requiredMessage: _message.default.getFormatter('dxForm-requiredMessage')
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    (0, _extend.extend)(this._optionsByReference, {
      layoutData: true,
      validationGroup: true
    });
  }
  _init() {
    const {
      layoutData
    } = this.option();
    super._init();
    this._itemWatchers = [];
    this._itemsRunTimeInfo = new _form.default();
    this._updateReferencedOptions(layoutData);
    this._initDataAndItems(layoutData);
  }
  _dispose() {
    super._dispose();
    this._cleanItemWatchers();
  }
  _initDataAndItems(initialData) {
    this._syncDataWithItems();
    this._updateItems(initialData);
  }
  _syncDataWithItems() {
    const {
      layoutData,
      items
    } = this.option();
    if ((0, _type.isDefined)(items)) {
      items.forEach(item => {
        if (item.dataField && this._getDataByField(item.dataField) === undefined) {
          var _item$editorOptions;
          const value = (_item$editorOptions = item.editorOptions) === null || _item$editorOptions === void 0 ? void 0 : _item$editorOptions.value;
          if ((0, _type.isDefined)(value) || item.dataField in layoutData) {
            this._updateFieldValue(item.dataField, value);
          }
        }
      });
    }
  }
  _getDataByField(dataField) {
    return dataField ? this.option(`layoutData.${dataField}`) : null;
  }
  _isCheckboxUndefinedStateEnabled(allowIndeterminateState, editorType, dataField) {
    if (allowIndeterminateState && editorType === 'dxCheckBox') {
      const nameParts = ['layoutData', ...dataField.split('.')];
      const propertyName = nameParts.pop();
      const layoutData = this.option(nameParts.join('.'));
      if (!propertyName) return false;
      return layoutData && propertyName in layoutData;
    }
    return false;
  }
  _updateFieldValue(dataField, value) {
    const {
      layoutData
    } = this.option();
    let newValue = value;
    // @ts-expect-error ts-error
    if (!_variable_wrapper.default.isWrapped(layoutData[dataField]) && (0, _type.isDefined)(dataField)) {
      this.option(`layoutData.${dataField}`, newValue);
      // @ts-expect-error ts-error
    } else if (_variable_wrapper.default.isWritableWrapped(layoutData[dataField])) {
      newValue = (0, _type.isFunction)(newValue) ? newValue() : newValue;
      // @ts-expect-error ts-error
      layoutData[dataField](newValue);
    }
    this._triggerOnFieldDataChanged({
      dataField,
      value: newValue
    });
  }
  _triggerOnFieldDataChanged(args) {
    this._createActionByOption('onFieldDataChanged')(args);
  }
  _updateItems(layoutData) {
    const {
      items: userItems
    } = this.option();
    const isUserItemsExist = (0, _type.isDefined)(userItems);
    const {
      customizeItem
    } = this.option();
    const items = isUserItemsExist ? userItems : this._generateItemsByData(layoutData);
    if ((0, _type.isDefined)(items)) {
      const processedItems = [];
      (0, _iterator.each)(items, (_index, item) => {
        if (this._isAcceptableItem(item)) {
          // eslint-disable-next-line no-param-reassign
          item = this._processItem(item);
          customizeItem === null || customizeItem === void 0 || customizeItem(item);
          if ((0, _type.isObject)(item) && _variable_wrapper.default.unwrap(item.visible) !== false) {
            processedItems.push(item);
          }
        }
      });
      if (!this._itemWatchers.length || !isUserItemsExist) {
        this._updateItemWatchers(items);
      }
      this._setItems(processedItems);
      this._sortItems();
    }
  }
  _cleanItemWatchers() {
    this._itemWatchers.forEach(dispose => {
      // @ts-expect-error ts-error
      dispose();
    });
    this._itemWatchers = [];
  }
  _updateItemWatchers(items) {
    const watch = this._getWatch();
    items.forEach(item => {
      if ((0, _type.isObject)(item) && (0, _type.isDefined)(item.visible) && (0, _type.isFunction)(watch)) {
        this._itemWatchers.push(watch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        () => _variable_wrapper.default.unwrap(item.visible), () => {
          const {
            layoutData
          } = this.option();
          this._updateItems(layoutData);
          this.repaint();
        }, {
          skipImmediate: true
        }));
      }
    });
  }
  _generateItemsByData(layoutData) {
    const result = [];
    if ((0, _type.isDefined)(layoutData)) {
      (0, _iterator.each)(layoutData, dataField => {
        result.push({
          dataField
        });
      });
    }
    return result;
  }
  _isAcceptableItem(item) {
    const itemField = (0, _type.isString)(item) ? item : item.dataField;
    const itemData = this._getDataByField(itemField);
    return !((0, _type.isFunction)(itemData) && !_variable_wrapper.default.isWrapped(itemData));
  }
  _processItem(item) {
    if (typeof item === 'string') {
      // eslint-disable-next-line no-param-reassign
      item = {
        dataField: item
      };
    }
    if (typeof item === 'object' && !item.itemType) {
      item.itemType = _constants.SIMPLE_ITEM_TYPE;
    }
    if (!(0, _type.isDefined)(item.editorType) && (0, _type.isDefined)(item.dataField)) {
      const value = this._getDataByField(item.dataField);
      item.editorType = (0, _type.isDefined)(value) ? this._getEditorTypeByDataType((0, _type.type)(value)) : FORM_EDITOR_BY_DEFAULT;
    }
    if (item.editorType === 'dxCheckBox') {
      // @ts-expect-error ts-error
      item.allowIndeterminateState = item.allowIndeterminateState ?? true;
    }
    return item;
  }
  _getEditorTypeByDataType(dataType) {
    switch (dataType) {
      case 'number':
        return 'dxNumberBox';
      case 'date':
        return 'dxDateBox';
      case 'boolean':
        return 'dxCheckBox';
      default:
        return 'dxTextBox';
    }
  }
  _sortItems() {
    (0, _array.normalizeIndexes)(this._items, 'visibleIndex');
    this._sortIndexes();
  }
  _sortIndexes() {
    var _this$_items;
    (_this$_items = this._items) === null || _this$_items === void 0 || _this$_items.sort((itemA, itemB) => {
      const indexA = itemA.visibleIndex;
      const indexB = itemB.visibleIndex;
      // @ts-expect-error ts-error
      if (indexA > indexB) {
        return 1;
        // @ts-expect-error ts-error
      }
      if (indexA < indexB) {
        return -1;
      }
      return 0;
    });
  }
  _initMarkup() {
    this._itemsRunTimeInfo.clear();
    this.$element().addClass(_constants.FORM_LAYOUT_MANAGER_CLASS);
    super._initMarkup();
    this._renderResponsiveBox();
  }
  _renderResponsiveBox() {
    var _this$_items2;
    const templatesInfo = [];
    if ((_this$_items2 = this._items) !== null && _this$_items2 !== void 0 && _this$_items2.length) {
      const colCount = this._getColCount();
      const $container = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._prepareItemsWithMerging(colCount);
      const layoutItems = this._generateLayoutItems();
      this._responsiveBox = super._createComponent($container, _responsive_box.default, this._getResponsiveBoxConfig(layoutItems, colCount, templatesInfo));
      if (!(0, _window.hasWindow)()) {
        this._renderTemplates(templatesInfo);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _itemStateChangedHandler(args) {
    this._refresh();
  }
  _renderTemplates(templatesInfo) {
    let itemsWithLabelTemplateCount = 0;
    templatesInfo.forEach(_ref => {
      var _item$label;
      let {
        item
      } = _ref;
      if (item !== null && item !== void 0 && (_item$label = item.label) !== null && _item$label !== void 0 && _item$label.template) {
        itemsWithLabelTemplateCount += 1;
      }
    });
    (0, _iterator.each)(templatesInfo, (_index, info) => {
      switch (info.itemType) {
        case 'empty':
          (0, _empty_item.renderEmptyItem)(info);
          break;
        case 'button':
          this._renderButtonItem(info);
          break;
        default:
          {
            this._renderFieldItem(info, itemsWithLabelTemplateCount);
          }
      }
    });
  }
  _getResponsiveBoxConfig(layoutItems, colCount, templatesInfo) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const {
      colCountByScreen,
      screenByWidth
    } = this.option();
    const xsColCount = colCountByScreen === null || colCountByScreen === void 0 ? void 0 : colCountByScreen.xs;
    return {
      onItemStateChanged: this._itemStateChangedHandler.bind(this),
      onLayoutChanged: () => {
        const {
          onLayoutChanged
        } = this.option();
        const isSingleColumnMode = this.isSingleColumnMode();
        if (onLayoutChanged) {
          this.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, isSingleColumnMode);
          onLayoutChanged(isSingleColumnMode);
        }
      },
      onContentReady: e => {
        if ((0, _window.hasWindow)()) {
          this._renderTemplates(templatesInfo);
        }
        const {
          onLayoutChanged
        } = this.option();
        if (onLayoutChanged) {
          this.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, this.isSingleColumnMode(e.component));
        }
      },
      itemTemplate(itemData, _index, itemElement) {
        var _that$_items;
        const {
          location
        } = itemData;
        if (!location) {
          return;
        }
        const $itemElement = (0, _renderer.default)(itemElement);
        const itemRenderedCountInPreviousRows = location.row * colCount;
        const item = (_that$_items = that._items) === null || _that$_items === void 0 ? void 0 : _that$_items[location.col + itemRenderedCountInPreviousRows];
        if (!item) {
          return;
        }
        const itemCssClassList = [item.cssClass ?? ''];
        $itemElement.toggleClass(_constants.SINGLE_COLUMN_ITEM_CONTENT, that.isSingleColumnMode(this));
        if (location.row === 0) {
          itemCssClassList.push(LAYOUT_MANAGER_FIRST_ROW_CLASS);
        }
        if (location.col === 0) {
          itemCssClassList.push(LAYOUT_MANAGER_FIRST_COL_CLASS);
        }
        const {
          isRoot
        } = that.option();
        if (item.itemType === _constants.SIMPLE_ITEM_TYPE && isRoot) {
          $itemElement.addClass(_constants.ROOT_SIMPLE_ITEM_CLASS);
        }
        const isLastColumn = location.col === colCount - 1 || location.col + location.colspan === colCount;
        const rowsCount = that._getRowsCount();
        const isLastRow = location.row === rowsCount - 1;
        if (isLastColumn) {
          itemCssClassList.push(LAYOUT_MANAGER_LAST_COL_CLASS);
        }
        if (isLastRow) {
          itemCssClassList.push(LAYOUT_MANAGER_LAST_ROW_CLASS);
        }
        if (item.itemType !== 'empty') {
          itemCssClassList.push(_constants.FIELD_ITEM_CLASS);
          const {
            cssItemClass = ''
          } = that.option();
          itemCssClassList.push(cssItemClass);
          if ((0, _type.isDefined)(item.col)) {
            itemCssClassList.push(`dx-col-${item.col}`);
          }
        }
        templatesInfo.push({
          itemType: item.itemType,
          item,
          $parent: $itemElement,
          rootElementCssClassList: itemCssClassList
        });
      },
      cols: this._generateRatio(colCount),
      rows: this._generateRatio(this._getRowsCount(), true),
      dataSource: layoutItems,
      screenByWidth,
      // @ts-expect-error ts-error
      singleColumnScreen: xsColCount ? false : 'xs'
    };
  }
  _getColCount() {
    let {
      colCount
    } = this.option();
    const colCountByScreen = this.option('colCountByScreen');
    if (colCountByScreen) {
      const {
        form
      } = this.option();
      let screenFactor = form === null || form === void 0 ? void 0 : form.getTargetScreenFactor();
      if (!screenFactor) {
        screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)(this.option('screenByWidth')) : 'lg';
      }
      // @ts-expect-error ts-error
      colCount = colCountByScreen[screenFactor] || colCount;
    }
    if (colCount === 'auto') {
      if (this._cashedColCount) {
        return this._cashedColCount;
      }
      colCount = this._getMaxColCount();
      this._cashedColCount = colCount;
    }
    // @ts-expect-error ts-error
    return colCount < 1 ? 1 : colCount;
  }
  _getMaxColCount() {
    if (!(0, _window.hasWindow)()) {
      return 1;
    }
    const {
      minColWidth = MIN_COLUMN_WIDTH
    } = this.option();
    const width = (0, _size.getWidth)(this.$element());
    // @ts-expect-error ts-error
    const itemsCount = this._items.length;
    const maxColCount = Math.floor(width / minColWidth) || 1;
    return itemsCount < maxColCount ? itemsCount : maxColCount;
  }
  isCachedColCountObsolete() {
    return !!this._cashedColCount && this._getMaxColCount() !== this._cashedColCount;
  }
  _prepareItemsWithMerging(colCount) {
    const items = (this._items ?? []).slice(0);
    let result = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      result.push(item);
      const {
        alignItemLabels
      } = this.option();
      if (alignItemLabels || item.alignItemLabels || item.colSpan) {
        item.col = this._getColByIndex(result.length - 1, colCount);
      }
      if (item.colSpan > 1 && item.col + item.colSpan <= colCount) {
        const itemsMergedByCol = [];
        for (let j = 0; j < item.colSpan - 1; j += 1) {
          itemsMergedByCol.push({
            merged: true
          });
        }
        result = result.concat(itemsMergedByCol);
      } else {
        // @ts-expect-error ts-error
        delete item.colSpan;
      }
    }
    this._setItems(result);
  }
  _getColByIndex(index, colCount) {
    return index % colCount;
  }
  _setItems(items) {
    this._items = items;
    // @ts-expect-error ts-error
    this._cashedColCount = null; // T923489
  }
  _generateLayoutItems() {
    const items = this._items ?? [];
    const colCount = this._getColCount();
    const result = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (!item.merged) {
        const location = {
          row: parseInt(String(i / colCount), 10),
          col: this._getColByIndex(i, colCount)
        };
        if ((0, _type.isDefined)(item.colSpan)) {
          location.colspan = item.colSpan;
        }
        if ((0, _type.isDefined)(item.rowSpan)) {
          location.rowspan = item.rowSpan;
        }
        const generatedItem = {
          location
        };
        if ((0, _type.isDefined)(item.disabled)) {
          generatedItem.disabled = item.disabled;
        }
        if ((0, _type.isDefined)(item.visible)) {
          generatedItem.visible = item.visible;
        }
        result.push(generatedItem);
      }
    }
    return result;
  }
  _handleSmartPasteClick() {
    const form = this._getFormOrThis();
    // @ts-expect-error
    form === null || form === void 0 || form.smartPaste();
  }
  _handleResetClick() {
    const form = this._getFormOrThis();
    // @ts-expect-error
    form === null || form === void 0 || form.reset();
  }
  _configureDefaultButton(item) {
    if (!item.name) {
      return;
    }
    const buttonConfigs = {
      smartPaste: {
        icon: 'clipboardpastesparkle',
        text: _message.default.format('dxForm-smartPasteButtonText'),
        stylingMode: 'outlined',
        type: 'normal',
        onClick: () => {
          this._handleSmartPasteClick();
        }
      },
      reset: {
        text: _message.default.format('dxForm-resetButtonText'),
        stylingMode: 'outlined',
        type: 'normal',
        onClick: () => {
          this._handleResetClick();
        }
      },
      submit: {
        text: _message.default.format('dxForm-submitButtonText'),
        stylingMode: 'contained',
        type: 'default',
        useSubmitBehavior: true
      }
    };
    const config = buttonConfigs[item.name];
    if (config) {
      item.buttonOptions = _extends({}, config, item.buttonOptions ?? {});
    }
  }
  _renderButtonItem(info) {
    const {
      item,
      $parent,
      rootElementCssClassList
    } = info;
    const {
      validationGroup
    } = this.option();
    this._configureDefaultButton(item);
    const {
      $rootElement,
      buttonInstance
    } = (0, _button_item.renderButtonItem)({
      item,
      $parent,
      rootElementCssClassList,
      validationGroup,
      createComponentCallback: ($element, options) => super._createComponent($element, _wrapper.default, options)
    });
    // TODO: try to remove '_itemsRunTimeInfo' from 'render' function
    this._itemsRunTimeInfo.add({
      item,
      widgetInstance: buttonInstance,
      guid: item.guid,
      $itemContainer: $rootElement
    });
  }
  _renderFieldItem(info, itemsWithLabelTemplateCount) {
    var _item$label2;
    const {
      item,
      $parent,
      rootElementCssClassList
    } = info;
    const editorValue = this._getDataByField(item.dataField);
    let canAssignUndefinedValueToEditor = false;
    if (editorValue === undefined) {
      const {
        allowIndeterminateState,
        editorType,
        dataField
      } = item;
      canAssignUndefinedValueToEditor = this._isCheckboxUndefinedStateEnabled(allowIndeterminateState, editorType, dataField);
    }
    const name = item.dataField || item.name;
    const formOrLayoutManager = this._getFormOrThis();
    const onLabelTemplateRendered = () => {
      this._incTemplateRenderedCallCount();
      if (this._shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, itemsWithLabelTemplateCount)) {
        // @ts-expect-error ts-error
        formOrLayoutManager._alignLabels(this, this.isSingleColumnMode(formOrLayoutManager));
      }
    };
    const {
      form,
      labelLocation,
      requiredMessage,
      validationGroup,
      validationBoundary,
      showColonAfterLabel,
      labelMode
    } = this.option();
    const fieldItemOptions = (0, _formLayout_manager.convertToRenderFieldItemOptions)({
      $parent,
      rootElementCssClassList,
      item,
      name,
      editorValue,
      canAssignUndefinedValueToEditor,
      formOrLayoutManager: this._getFormOrThis(),
      createComponentCallback: this._createComponent.bind(this),
      formLabelLocation: labelLocation,
      // @ts-expect-error ts-error
      requiredMessageTemplate: requiredMessage,
      validationGroup,
      editorValidationBoundary: validationBoundary,
      // @ts-expect-error ts-error
      editorStylingMode: form === null || form === void 0 ? void 0 : form.option('stylingMode'),
      showColonAfterLabel: Boolean(showColonAfterLabel),
      managerLabelLocation: labelLocation,
      template: item.template ? this._getTemplate(item.template) : null,
      labelTemplate: (_item$label2 = item.label) !== null && _item$label2 !== void 0 && _item$label2.template ? this._getTemplate(item.label.template) : null,
      // @ts-expect-error ts-error
      itemId: form === null || form === void 0 ? void 0 : form.getItemID(name),
      managerMarkOptions: this._getMarkOptions(),
      labelMode,
      onLabelTemplateRendered
    });
    const {
      $fieldEditorContainer,
      widgetInstance,
      $rootElement
    } = (0, _field_item.renderFieldItem)(fieldItemOptions);
    const {
      onFieldItemRendered
    } = this.option();
    onFieldItemRendered === null || onFieldItemRendered === void 0 || onFieldItemRendered();
    if (widgetInstance && item.dataField) {
      // TODO: move to renderFieldItem ?
      this._bindDataField(widgetInstance, item.dataField, $fieldEditorContainer);
    }
    this._itemsRunTimeInfo.add({
      item,
      widgetInstance,
      guid: item.guid,
      $itemContainer: $rootElement
    });
  }
  _incTemplateRenderedCallCount() {
    this._labelTemplateRenderedCallCount = (this._labelTemplateRenderedCallCount ?? 0) + 1;
  }
  _shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, totalItemsWithLabelTemplate) {
    const {
      templatesRenderAsynchronously
    } = formOrLayoutManager.option();
    return !!templatesRenderAsynchronously && this._labelTemplateRenderedCallCount === totalItemsWithLabelTemplate;
  }
  _getMarkOptions() {
    const {
      showRequiredMark,
      requiredMark,
      showOptionalMark,
      optionalMark
    } = this.option();
    return {
      showRequiredMark,
      requiredMark,
      showOptionalMark,
      optionalMark
    };
  }
  _getFormOrThis() {
    const {
      form
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return form || this;
  }
  _bindDataField(editorInstance, dataField, $container) {
    const formOrThis = this._getFormOrThis();
    editorInstance.on('enterKey', args => {
      formOrThis._createActionByOption('onEditorEnterKey')((0, _extend.extend)(args, {
        dataField
      }));
    });
    this._createWatcher(editorInstance, $container, dataField);
    this.linkEditorToDataField(editorInstance, dataField);
  }
  _createWatcher(editorInstance, $container, dataField) {
    function compareArrays(array1, array2) {
      if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length) {
        return false;
      }
      for (let i = 0; i < array1.length; i += 1) {
        if (array1[i] !== array2[i]) {
          return false;
        }
      }
      return true;
    }
    const watch = this._getWatch();
    if (!(0, _type.isFunction)(watch)) {
      return;
    }
    const dispose = watch(() => this._getDataByField(dataField), () => {
      const fieldValue = this._getDataByField(dataField);
      if (editorInstance.NAME === 'dxTagBox') {
        const editorValue = editorInstance.option('value');
        if (fieldValue !== editorValue && compareArrays(fieldValue, editorValue)) {
          // handle array only, it can be wrapped into Proxy (T1020953)
          return;
        }
      }
      editorInstance.option('value', fieldValue);
    }, {
      deep: true,
      skipImmediate: true
    },
    /// #DEBUG
    {
      createWatcherDataField: dataField
    });
    _events_engine.default.on($container, _remove.removeEvent, dispose);
  }
  _getWatch() {
    if (!(0, _type.isDefined)(this._watch)) {
      const {
        form: formInstance
      } = this.option();
      this._watch = formInstance === null || formInstance === void 0 ? void 0 : formInstance.option('integrationOptions.watchMethod');
    }
    return this._watch;
  }
  // @ts-expect-error ts-error
  _createComponent($editor, component, editorOptions) {
    const {
      readOnly: readOnlyState
    } = this.option();
    // @ts-expect-error ts-error
    let hasEditorReadOnly = Object.hasOwn(editorOptions, 'readOnly');
    const instance = super._createComponent($editor, component, _extends({}, editorOptions, {
      readOnly: !hasEditorReadOnly ? readOnlyState : editorOptions.readOnly
    }));
    let isChangeByForm = false;
    instance.on('optionChanged', args => {
      if (args.name === 'readOnly' && !isChangeByForm) {
        hasEditorReadOnly = true;
      }
    });
    this.on('optionChanged', args => {
      if (args.name === 'readOnly' && !hasEditorReadOnly) {
        isChangeByForm = true;
        instance.option(args.name, args.value);
        isChangeByForm = false;
      }
    });
    return instance;
  }
  _generateRatio(count, isAutoSize) {
    const result = [];
    for (let i = 0; i < count; i += 1) {
      const ratio = {
        ratio: 1
      };
      if (isAutoSize) {
        ratio.baseSize = 'auto';
      }
      result.push(ratio);
    }
    return result;
  }
  _getRowsCount() {
    const items = this._items ?? [];
    return Math.ceil(items.length / this._getColCount());
  }
  _updateReferencedOptions(newLayoutData) {
    const layoutData = this.option('layoutData');
    if ((0, _type.isObject)(layoutData)) {
      Object.getOwnPropertyNames(layoutData)
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      .forEach(property => delete this._optionsByReference[`layoutData.${property}`]);
    }
    if ((0, _type.isObject)(newLayoutData)) {
      Object.getOwnPropertyNames(newLayoutData)
      // eslint-disable-next-line no-return-assign
      .forEach(property => this._optionsByReference[`layoutData.${property}`] = true);
    }
  }
  _clearWidget(instance) {
    this._disableEditorValueChangedHandler = true;
    instance.clear();
    this._disableEditorValueChangedHandler = false;
    instance.option('isValid', true);
  }
  _optionChanged(args) {
    if (args.fullName.search('layoutData.') === 0) {
      return;
    }
    switch (args.name) {
      case 'showRequiredMark':
      case 'showOptionalMark':
      case 'requiredMark':
      case 'optionalMark':
        this._invalidate();
        break;
      case 'layoutData':
        {
          this._updateReferencedOptions(args.value);
          const {
            items
          } = this.option();
          if (items) {
            if (!(0, _type.isEmptyObject)(args.value)) {
              this._itemsRunTimeInfo.each((_, itemRunTimeInfo) => {
                if ((0, _type.isDefined)(itemRunTimeInfo.item)) {
                  const {
                    dataField
                  } = itemRunTimeInfo.item;
                  if (dataField && (0, _type.isDefined)(itemRunTimeInfo.widgetInstance)) {
                    const valueGetter = (0, _data.compileGetter)(dataField);
                    // @ts-expect-error ts-error
                    const dataValue = valueGetter(args.value);
                    const {
                      allowIndeterminateState,
                      editorType
                    } = itemRunTimeInfo.item;
                    if (dataValue !== undefined || this._isCheckboxUndefinedStateEnabled(allowIndeterminateState, editorType, dataField)) {
                      itemRunTimeInfo.widgetInstance.option('value', dataValue);
                    } else {
                      this._clearWidget(itemRunTimeInfo.widgetInstance);
                    }
                  }
                }
              });
            }
          } else {
            this._initDataAndItems(args.value);
            this._invalidate();
          }
          break;
        }
      case 'items':
        this._cleanItemWatchers();
        this._initDataAndItems(args.value);
        this._invalidate();
        break;
      case 'alignItemLabels':
      case 'labelLocation':
      case 'labelMode':
      case 'requiredMessage':
        this._invalidate();
        break;
      case 'customizeItem':
        this._updateItems(this.option('layoutData'));
        this._invalidate();
        break;
      case 'colCount':
      case 'colCountByScreen':
        this._resetColCount();
        break;
      case 'minColWidth':
        {
          const {
            colCount
          } = this.option();
          if (colCount === 'auto') {
            this._resetColCount();
          }
          break;
        }
      case 'readOnly':
        break;
      case 'width':
        {
          super._optionChanged(args);
          const {
            colCount
          } = this.option();
          if (colCount === 'auto') {
            this._resetColCount();
          }
          break;
        }
      case 'onFieldDataChanged':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetColCount() {
    // @ts-expect-error ts-error
    this._cashedColCount = null;
    this._invalidate();
  }
  linkEditorToDataField(editorInstance, dataField) {
    this.on('optionChanged', args => {
      if (args.fullName === `layoutData.${dataField}`) {
        editorInstance._setOptionWithoutOptionChange('value', args.value);
      }
    });
    editorInstance.on('valueChanged', args => {
      // TODO: This need only for the KO integration
      const isValueReferenceType = (0, _type.isObject)(args.value) || Array.isArray(args.value);
      if (!this._disableEditorValueChangedHandler && !(isValueReferenceType && args.value === args.previousValue)) {
        this._updateFieldValue(dataField, args.value);
      }
    });
  }
  _dimensionChanged() {
    const {
      colCount
    } = this.option();
    if (colCount === 'auto' && this.isCachedColCountObsolete()) {
      this._eventsStrategy.fireEvent('autoColCountChanged');
    }
  }
  updateData(data, value) {
    if ((0, _type.isObject)(data)) {
      (0, _iterator.each)(data, (dataField, fieldValue) => {
        this._updateFieldValue(dataField, fieldValue);
      });
    } else if (typeof data === 'string') {
      this._updateFieldValue(data, value);
    }
  }
  getEditor(field) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(field) ?? this._itemsRunTimeInfo.findWidgetInstanceByName(field);
  }
  isSingleColumnMode(component) {
    const responsiveBox = this._responsiveBox || component;
    if (responsiveBox) {
      const {
        currentScreenFactor,
        singleColumnScreen
      } = responsiveBox.option();
      return currentScreenFactor === singleColumnScreen;
    }
    return false;
  }
  getItemsRunTimeInfo() {
    return this._itemsRunTimeInfo;
  }
}
(0, _component_registrator.default)('dxLayoutManager', LayoutManager);
var _default = exports.default = LayoutManager;