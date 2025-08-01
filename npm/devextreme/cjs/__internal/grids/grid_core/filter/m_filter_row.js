/**
* DevExtreme (cjs/__internal/grids/grid_core/filter/m_filter_row.js)
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
exports.filterRowModule = exports.ApplyFilterViewController = void 0;
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _index = require("../../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _editor = _interopRequireDefault(require("../../../../ui/editor/editor"));
var _menu = _interopRequireDefault(require("../../../../ui/menu"));
var _ui = _interopRequireDefault(require("../../../../ui/overlay/ui.overlay"));
var _accessibility = require("../../../../ui/shared/accessibility");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable max-classes-per-file */
const OPERATION_ICONS = {
  '=': 'filter-operation-equals',
  '<>': 'filter-operation-not-equals',
  '<': 'filter-operation-less',
  '<=': 'filter-operation-less-equal',
  '>': 'filter-operation-greater',
  '>=': 'filter-operation-greater-equal',
  default: 'filter-operation-default',
  // eslint-disable-next-line spellcheck/spell-checker
  notcontains: 'filter-operation-not-contains',
  contains: 'filter-operation-contains',
  startswith: 'filter-operation-starts-with',
  endswith: 'filter-operation-ends-with',
  between: 'filter-operation-between'
};
const OPERATION_DESCRIPTORS = {
  '=': 'equal',
  '<>': 'notEqual',
  '<': 'lessThan',
  '<=': 'lessThanOrEqual',
  '>': 'greaterThan',
  '>=': 'greaterThanOrEqual',
  startswith: 'startsWith',
  contains: 'contains',
  // eslint-disable-next-line spellcheck/spell-checker
  notcontains: 'notContains',
  endswith: 'endsWith',
  between: 'between'
};
const FILTERING_TIMEOUT = 700;
const CORRECT_FILTER_RANGE_OVERLAY_WIDTH = 1;
const FILTER_ROW_CLASS = 'filter-row';
const FILTER_RANGE_OVERLAY_CLASS = 'filter-range-overlay';
const FILTER_RANGE_START_CLASS = 'filter-range-start';
const FILTER_RANGE_END_CLASS = 'filter-range-end';
const MENU_CLASS = 'dx-menu';
const EDITOR_WITH_MENU_CLASS = 'dx-editor-with-menu';
const EDITOR_CONTAINER_CLASS = 'dx-editor-container';
const EDITOR_CELL_CLASS = 'dx-editor-cell';
const FILTER_MENU = 'dx-filter-menu';
const APPLY_BUTTON_CLASS = 'dx-apply-button';
const HIGHLIGHT_OUTLINE_CLASS = 'dx-highlight-outline';
const FOCUSED_CLASS = 'dx-focused';
const CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
const FILTER_RANGE_CONTENT_CLASS = 'dx-filter-range-content';
const FILTER_MODIFIED_CLASS = 'dx-filter-modified';
const EDITORS_INPUT_SELECTOR = 'input:not([type=\'hidden\'])';
const BETWEEN_OPERATION_DATA_TYPES = ['date', 'datetime', 'number'];
function isOnClickApplyFilterMode(that) {
  return that.option('filterRow.applyFilter') === 'onClick';
}
const getEditorInstance = function ($editorContainer) {
  const $editor = $editorContainer === null || $editorContainer === void 0 ? void 0 : $editorContainer.children();
  const componentNames = $editor === null || $editor === void 0 ? void 0 : $editor.data('dxComponents');
  const editor = (componentNames === null || componentNames === void 0 ? void 0 : componentNames.length) && $editor.data(componentNames[0]);
  if (editor instanceof _editor.default) {
    return editor;
  }
  return null;
};
const getRangeTextByFilterValue = function (that, column) {
  let result = '';
  let rangeEnd = '';
  const filterValue = getColumnFilterValue(that, column);
  const formatOptions = _m_utils.default.getFormatOptionsByColumn(column, 'filterRow');
  if (Array.isArray(filterValue)) {
    result = _m_utils.default.formatValue(filterValue[0], formatOptions);
    rangeEnd = _m_utils.default.formatValue(filterValue[1], formatOptions);
    if (rangeEnd !== '') {
      result += ` - ${rangeEnd}`;
    }
  } else if ((0, _type.isDefined)(filterValue)) {
    result = _m_utils.default.formatValue(filterValue, formatOptions);
  }
  return result;
};
function getColumnFilterValue(that, column) {
  if (column) {
    return isOnClickApplyFilterMode(that) && column.bufferedFilterValue !== undefined ? column.bufferedFilterValue : column.filterValue;
  }
}
const getColumnSelectedFilterOperation = function (that, column) {
  if (column) {
    return isOnClickApplyFilterMode(that) && column.bufferedSelectedFilterOperation !== undefined ? column.bufferedSelectedFilterOperation : column.selectedFilterOperation;
  }
};
const isValidFilterValue = function (filterValue, column) {
  if (column && BETWEEN_OPERATION_DATA_TYPES.includes(column.dataType) && Array.isArray(filterValue)) {
    return false;
  }
  return filterValue !== undefined;
};
const getFilterValue = function (that, columnIndex, $editorContainer) {
  const column = that._columnsController.columnOption(columnIndex);
  const filterValue = getColumnFilterValue(that, column);
  const isFilterRange = $editorContainer.closest(`.${that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS)}`).length;
  const isRangeStart = $editorContainer.hasClass(that.addWidgetPrefix(FILTER_RANGE_START_CLASS));
  if (filterValue && Array.isArray(filterValue) && getColumnSelectedFilterOperation(that, column) === 'between') {
    if (isRangeStart) {
      return filterValue[0];
    }
    return filterValue[1];
  }
  return !isFilterRange && isValidFilterValue(filterValue, column) ? filterValue : null;
};
const normalizeFilterValue = function (that, filterValue, column, $editorContainer) {
  if (getColumnSelectedFilterOperation(that, column) === 'between') {
    const columnFilterValue = getColumnFilterValue(that, column);
    if ($editorContainer.hasClass(that.addWidgetPrefix(FILTER_RANGE_START_CLASS))) {
      return [filterValue, Array.isArray(columnFilterValue) ? columnFilterValue[1] : undefined];
    }
    return [Array.isArray(columnFilterValue) ? columnFilterValue[0] : columnFilterValue, filterValue];
  }
  return filterValue;
};
const updateFilterValue = function (that, options) {
  const value = options.value === '' ? null : options.value;
  const $editorContainer = options.container;
  const column = that._columnsController.columnOption(options.column.index);
  const filterValue = getFilterValue(that, column.index, $editorContainer);
  if (!(0, _type.isDefined)(filterValue) && !(0, _type.isDefined)(value)) return;
  that._applyFilterViewController.setHighLight($editorContainer, filterValue !== value);
  const columnOptionName = isOnClickApplyFilterMode(that) ? 'bufferedFilterValue' : 'filterValue';
  const normalizedValue = normalizeFilterValue(that, value, column, $editorContainer);
  const isBetween = getColumnSelectedFilterOperation(that, column) === 'between';
  const notFireEvent = options.notFireEvent || isBetween && Array.isArray(normalizedValue) && normalizedValue.includes(undefined);
  that._columnsController.columnOption(column.index, columnOptionName, normalizedValue, notFireEvent);
};
const columnHeadersView = Base => class ColumnHeadersViewFilterRowExtender extends Base {
  init() {
    super.init();
    this._applyFilterViewController = this.getController('applyFilter');
  }
  optionChanged(args) {
    switch (args.name) {
      case 'filterRow':
      case 'showColumnLines':
        this._invalidate(true, true);
        args.handled = true;
        break;
      case 'syncLookupFilterValues':
        if (args.value) {
          this.updateLookupDataSource();
        } else {
          this.render();
        }
        args.handled = true;
        break;
      default:
        super.optionChanged(args);
        break;
    }
  }
  _updateEditorValue(column, $editorContainer) {
    const that = this;
    const editor = getEditorInstance($editorContainer);
    editor && editor.option('value', getFilterValue(that, column.index, $editorContainer));
  }
  _columnOptionChanged(e) {
    const that = this;
    const {
      optionNames
    } = e;
    let $cell;
    let $editorContainer;
    let $editorRangeElements;
    let $menu;
    if (_m_utils.default.checkChanges(optionNames, ['filterValue', 'bufferedFilterValue', 'selectedFilterOperation', 'bufferedSelectedFilterOperation', 'filterValues', 'filterType']) && e.columnIndex !== undefined) {
      const visibleIndex = that._columnsController.getVisibleIndex(e.columnIndex);
      const column = that._columnsController.columnOption(e.columnIndex);
      $cell = that._getCellElement(that.element().find(`.${that.addWidgetPrefix(FILTER_ROW_CLASS)}`).index(), visibleIndex) ?? (0, _renderer.default)();
      $editorContainer = $cell.find(`.${EDITOR_CONTAINER_CLASS}`).first();
      if (optionNames.filterValue || optionNames.bufferedFilterValue) {
        that._updateEditorValue(column, $editorContainer);
        const overlayInstance = $cell.find(`.${that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS)}`).data('dxOverlay');
        if (overlayInstance) {
          $editorRangeElements = overlayInstance.$content().find(`.${EDITOR_CONTAINER_CLASS}`);
          that._updateEditorValue(column, $editorRangeElements.first());
          that._updateEditorValue(column, $editorRangeElements.last());
        }
        if (!(overlayInstance !== null && overlayInstance !== void 0 && overlayInstance.option('visible'))) {
          that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column));
        }
      }
      if (optionNames.selectedFilterOperation || optionNames.bufferedSelectedFilterOperation) {
        if (visibleIndex >= 0 && column) {
          $menu = $cell.find(`.${MENU_CLASS}`);
          if ($menu.length) {
            that._updateFilterOperationChooser($menu, column, $editorContainer);
            if (getColumnSelectedFilterOperation(that, column) === 'between') {
              that._renderFilterRangeContent($cell, column);
            } else if ($editorContainer.find(`.${FILTER_RANGE_CONTENT_CLASS}`).length) {
              that._renderEditor($editorContainer, that._getEditorOptions($editorContainer, column));
              that._hideFilterRange();
            }
          }
        }
      }
      return;
    }
    super._columnOptionChanged(e);
  }
  _renderCore() {
    this._filterRangeOverlayInstance = null;
    // @ts-expect-error
    return super._renderCore.apply(this, arguments);
  }
  _resizeCore() {
    var _this$_filterRangeOve;
    // @ts-expect-error
    super._resizeCore.apply(this, arguments);
    (_this$_filterRangeOve = this._filterRangeOverlayInstance) === null || _this$_filterRangeOve === void 0 || _this$_filterRangeOve.repaint();
  }
  isFilterRowVisible() {
    return this._isElementVisible(this.option('filterRow'));
  }
  isVisible() {
    return super.isVisible() || this.isFilterRowVisible();
  }
  _initFilterRangeOverlay($cell, column) {
    const that = this;
    const sharedData = {};
    const $editorContainer = $cell.find('.dx-editor-container');
    const filterRangeOverlayClass = that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS);
    const $overlay = (0, _renderer.default)('<div>').addClass(filterRangeOverlayClass).appendTo($cell);
    return that._createComponent($overlay, _ui.default, {
      height: 'auto',
      shading: false,
      showTitle: false,
      focusStateEnabled: false,
      hideOnOutsideClick: true,
      hideOnParentScroll: true,
      _hideOnParentScrollTarget: $overlay,
      wrapperAttr: {
        class: filterRangeOverlayClass
      },
      animation: false,
      position: {
        my: 'top',
        at: 'top',
        of: $editorContainer.length && $editorContainer || $cell,
        offset: '0 -1'
      },
      contentTemplate(contentElement) {
        let editorOptions;
        let $editor = (0, _renderer.default)('<div>').addClass(`${EDITOR_CONTAINER_CLASS} ${that.addWidgetPrefix(FILTER_RANGE_START_CLASS)}`).appendTo(contentElement);
        column = that._columnsController.columnOption(column.index);
        editorOptions = that._getEditorOptions($editor, column);
        editorOptions.sharedData = sharedData;
        that._renderEditor($editor, editorOptions);
        _events_engine.default.on($editor.find(EDITORS_INPUT_SELECTOR), 'keydown', e => {
          let $prevElement = $cell.find('[tabindex]').not(e.target).first();
          if ((0, _index.normalizeKeyName)(e) === 'tab' && e.shiftKey) {
            e.preventDefault();
            that._hideFilterRange();
            if (!$prevElement.length) {
              $prevElement = $cell.prev().find('[tabindex]').last();
            }
            // @ts-expect-error
            _events_engine.default.trigger($prevElement, 'focus');
          }
        });
        $editor = (0, _renderer.default)('<div>').addClass(`${EDITOR_CONTAINER_CLASS} ${that.addWidgetPrefix(FILTER_RANGE_END_CLASS)}`).appendTo(contentElement);
        editorOptions = that._getEditorOptions($editor, column);
        editorOptions.sharedData = sharedData;
        that._renderEditor($editor, editorOptions);
        _events_engine.default.on($editor.find(EDITORS_INPUT_SELECTOR), 'keydown', e => {
          if ((0, _index.normalizeKeyName)(e) === 'tab' && !e.shiftKey) {
            e.preventDefault();
            that._hideFilterRange();
            // @ts-expect-error
            _events_engine.default.trigger($cell.next().find('[tabindex]').first(), 'focus');
          }
        });
        return (0, _renderer.default)(contentElement).addClass(that.getWidgetContainerClass());
      },
      onShown(e) {
        const $editor = e.component.$content().find(`.${EDITOR_CONTAINER_CLASS}`).first();
        // @ts-expect-error
        _events_engine.default.trigger($editor.find(EDITORS_INPUT_SELECTOR), 'focus');
      },
      onHidden() {
        column = that._columnsController.columnOption(column.index);
        $cell.find(`.${MENU_CLASS}`).parent().addClass(EDITOR_WITH_MENU_CLASS);
        if (getColumnSelectedFilterOperation(that, column) === 'between') {
          that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column));
          that.component.updateDimensions();
        }
      }
    });
  }
  _updateFilterRangeOverlay(options) {
    const overlayInstance = this._filterRangeOverlayInstance;
    overlayInstance === null || overlayInstance === void 0 || overlayInstance.option(options);
  }
  _showFilterRange($cell, column) {
    const that = this;
    const $overlay = $cell.children(`.${that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS)}`);
    let overlayInstance = $overlay.length && $overlay.data('dxOverlay');
    if (!overlayInstance && column) {
      overlayInstance = that._initFilterRangeOverlay($cell, column);
    }
    if (!overlayInstance.option('visible')) {
      var _that$_filterRangeOve, _that$_filterRangeOve2;
      (_that$_filterRangeOve = that._filterRangeOverlayInstance) === null || _that$_filterRangeOve === void 0 || _that$_filterRangeOve.hide();
      that._filterRangeOverlayInstance = overlayInstance;
      that._updateFilterRangeOverlay({
        width: (0, _size.getOuterWidth)($cell, true) + CORRECT_FILTER_RANGE_OVERLAY_WIDTH
      });
      (_that$_filterRangeOve2 = that._filterRangeOverlayInstance) === null || _that$_filterRangeOve2 === void 0 || _that$_filterRangeOve2.show();
    }
  }
  _hideFilterRange() {
    const overlayInstance = this._filterRangeOverlayInstance;
    overlayInstance === null || overlayInstance === void 0 || overlayInstance.hide();
  }
  getFilterRangeOverlayInstance() {
    return this._filterRangeOverlayInstance;
  }
  _createRow(row) {
    const $row = super._createRow(row);
    if (row.rowType === 'filter') {
      $row.addClass(this.addWidgetPrefix(FILTER_ROW_CLASS));
      if (!this.option('useLegacyKeyboardNavigation')) {
        _events_engine.default.on($row, 'keydown', event => (0, _accessibility.selectView)('filterRow', this, event));
      }
    }
    return $row;
  }
  _getRows() {
    const result = super._getRows();
    if (this.isFilterRowVisible()) {
      result.push({
        rowType: 'filter'
      });
    }
    return result;
  }
  _renderFilterCell(cell, options) {
    var _column$filterOperati;
    const that = this;
    const {
      column
    } = options;
    const $cell = (0, _renderer.default)(cell);
    if (that.component.option('showColumnHeaders')) {
      that.setAria('describedby', column.headerId, $cell);
    }
    that.setAria('label', _message.default.format('dxDataGrid-ariaFilterCell'), $cell);
    $cell.addClass(EDITOR_CELL_CLASS);
    const $container = (0, _renderer.default)('<div>').appendTo($cell);
    const $editorContainer = (0, _renderer.default)('<div>').addClass(EDITOR_CONTAINER_CLASS).appendTo($container);
    if (getColumnSelectedFilterOperation(that, column) === 'between') {
      that._renderFilterRangeContent($cell, column);
    } else {
      const editorOptions = that._getEditorOptions($editorContainer, column);
      that._renderEditor($editorContainer, editorOptions);
    }
    const {
      alignment
    } = column;
    if (alignment && alignment !== 'center') {
      $cell.find(EDITORS_INPUT_SELECTOR).first().css('textAlign', column.alignment);
    }
    if ((_column$filterOperati = column.filterOperations) !== null && _column$filterOperati !== void 0 && _column$filterOperati.length) {
      that._renderFilterOperationChooser($container, column, $editorContainer);
    }
  }
  _renderCellContent($cell, options) {
    const that = this;
    const {
      column
    } = options;
    if (options.rowType === 'filter') {
      if (column.command) {
        $cell.html('&nbsp;');
      } else if (column.allowFiltering) {
        that.renderTemplate($cell, that._renderFilterCell.bind(that), options).done(() => {
          that._updateCell($cell, options);
        });
        return;
      }
    }
    // @ts-expect-error
    super._renderCellContent.apply(this, arguments);
  }
  _getEditorOptions($editorContainer, column) {
    const that = this;
    const accessibilityOptions = {
      editorOptions: {
        inputAttr: that._getFilterInputAccessibilityAttributes(column)
      }
    };
    const result = (0, _extend.extend)(accessibilityOptions, column, {
      value: getFilterValue(that, column.index, $editorContainer),
      parentType: 'filterRow',
      showAllText: that.option('filterRow.showAllText'),
      updateValueTimeout: that.option('filterRow.applyFilter') === 'onClick' ? 0 : FILTERING_TIMEOUT,
      width: null,
      setValue(value, notFireEvent) {
        updateFilterValue(that, {
          column,
          value,
          container: $editorContainer,
          notFireEvent
        });
      }
    });
    if (getColumnSelectedFilterOperation(that, column) === 'between') {
      if ($editorContainer.hasClass(that.addWidgetPrefix(FILTER_RANGE_START_CLASS))) {
        result.placeholder = that.option('filterRow.betweenStartText');
      } else {
        result.placeholder = that.option('filterRow.betweenEndText');
      }
    }
    return result;
  }
  _getFilterInputAccessibilityAttributes(column) {
    const columnAriaLabel = _message.default.format('dxDataGrid-ariaFilterCell');
    if (this.component.option('showColumnHeaders')) {
      return {
        'aria-label': columnAriaLabel,
        'aria-describedby': column.headerId
      };
    }
    return {
      'aria-label': columnAriaLabel
    };
  }
  _renderEditor($editorContainer, options) {
    $editorContainer.empty();
    const $element = (0, _renderer.default)('<div>').appendTo($editorContainer);
    const dataSource = this._dataController.dataSource();
    if (options.lookup && this.option('syncLookupFilterValues')) {
      this._applyFilterViewController.setCurrentColumnForFiltering(options);
      const filter = this._dataController.getCombinedFilter();
      this._applyFilterViewController.setCurrentColumnForFiltering(null);
      const lookupDataSource = _m_utils.default.getWrappedLookupDataSource(options, dataSource, filter);
      const lookupOptions = _extends({}, options, {
        lookup: _extends({}, options.lookup, {
          dataSource: lookupDataSource
        })
      });
      return this._editorFactoryController.createEditor($element, lookupOptions);
    }
    return this._editorFactoryController.createEditor($element, options);
  }
  _renderFilterRangeContent($cell, column) {
    const that = this;
    const $editorContainer = $cell.find(`.${EDITOR_CONTAINER_CLASS}`).first();
    $editorContainer.empty();
    const $filterRangeContent = (0, _renderer.default)('<div>').addClass(FILTER_RANGE_CONTENT_CLASS).attr('tabindex', this.option('tabIndex'));
    _events_engine.default.on($filterRangeContent, 'focusin', () => {
      that._showFilterRange($cell, column);
    });
    $filterRangeContent.appendTo($editorContainer);
    that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column));
  }
  _updateFilterRangeContent($cell, value) {
    const $filterRangeContent = $cell.find(`.${FILTER_RANGE_CONTENT_CLASS}`);
    if ($filterRangeContent.length) {
      if (value === '') {
        $filterRangeContent.html('&nbsp;');
      } else {
        $filterRangeContent.text(value);
      }
    }
  }
  _updateFilterOperationChooser($menu, column, $editorContainer) {
    var _column$filterOperati2;
    const that = this;
    let isCellWasFocused;
    const restoreFocus = function () {
      const menu = _menu.default.getInstance($menu);
      menu && menu.option('focusedElement', null);
      isCellWasFocused && that._focusEditor($editorContainer);
    };
    const editorFactoryController = this._editorFactoryController;
    const ariaSearchBox = _message.default.format('dxDataGrid-ariaSearchBox');
    that._createComponent($menu, _menu.default, {
      // @ts-expect-error
      integrationOptions: {},
      activeStateEnabled: false,
      selectionMode: 'single',
      cssClass: `${that.getWidgetContainerClass()} ${CELL_FOCUS_DISABLED_CLASS} ${FILTER_MENU}`,
      showFirstSubmenuMode: 'onHover',
      hideSubmenuOnMouseLeave: true,
      items: [{
        name: getColumnSelectedFilterOperation(that, column) || ariaSearchBox,
        disabled: !((_column$filterOperati2 = column.filterOperations) !== null && _column$filterOperati2 !== void 0 && _column$filterOperati2.length),
        icon: OPERATION_ICONS[getColumnSelectedFilterOperation(that, column) || 'default'],
        selectable: false,
        items: that._getFilterOperationMenuItems(column)
      }],
      onItemRendered: _ref => {
        let {
          itemElement,
          itemData
        } = _ref;
        if (itemData !== null && itemData !== void 0 && itemData.items && itemData !== null && itemData !== void 0 && itemData.name) {
          const labelText = that._getOperationDescriptionFromDescriptor(itemData.name) || ariaSearchBox;
          this.setAria('label', labelText, (0, _renderer.default)(itemElement));
        }
      },
      onItemClick(properties) {
        var _properties$itemData;
        // @ts-expect-error
        const selectedFilterOperation = properties.itemData.name;
        const columnSelectedFilterOperation = getColumnSelectedFilterOperation(that, column);
        let notFocusEditor = false;
        const isOnClickMode = isOnClickApplyFilterMode(that);
        const options = {};
        // @ts-expect-error
        if (properties.itemData.items || selectedFilterOperation && selectedFilterOperation === columnSelectedFilterOperation) {
          return;
        }
        if (selectedFilterOperation) {
          options[isOnClickMode ? 'bufferedSelectedFilterOperation' : 'selectedFilterOperation'] = selectedFilterOperation;
          if (selectedFilterOperation === 'between' || columnSelectedFilterOperation === 'between') {
            notFocusEditor = selectedFilterOperation === 'between';
            options[isOnClickMode ? 'bufferedFilterValue' : 'filterValue'] = null;
          }
        } else {
          options[isOnClickMode ? 'bufferedFilterValue' : 'filterValue'] = null;
          options[isOnClickMode ? 'bufferedSelectedFilterOperation' : 'selectedFilterOperation'] = column.defaultSelectedFilterOperation || null;
        }
        const isResetFilterOperation = !((_properties$itemData = properties.itemData) !== null && _properties$itemData !== void 0 && _properties$itemData.name);
        const isNotFireEvent = isResetFilterOperation ? false : undefined;
        that._columnsController.columnOption(column.index, options, undefined, isNotFireEvent);
        that._applyFilterViewController.setHighLight($editorContainer, true);
        if (!selectedFilterOperation) {
          const editor = getEditorInstance($editorContainer);
          // @ts-expect-error
          if (editor && editor.NAME === 'dxDateBox' && !editor.option('isValid')) {
            editor.clear();
            editor.option('isValid', true);
          }
        }
        if (!notFocusEditor) {
          that._focusEditor($editorContainer);
        } else {
          that._showFilterRange($editorContainer.closest(`.${EDITOR_CELL_CLASS}`), column);
        }
      },
      onSubmenuShowing() {
        isCellWasFocused = that._isEditorFocused($editorContainer);
        editorFactoryController.loseFocus();
      },
      onSubmenuHiding() {
        // @ts-expect-error
        _events_engine.default.trigger($menu, 'blur');
        restoreFocus();
      },
      onContentReady(e) {
        _events_engine.default.on($menu, 'blur', () => {
          const menu = e.component;
          // @ts-expect-error
          menu._hideSubmenuAfterTimeout();
          restoreFocus();
        });
      },
      rtlEnabled: that.option('rtlEnabled')
    });
  }
  _isEditorFocused($container) {
    return $container.hasClass(FOCUSED_CLASS) || $container.parents(`.${FOCUSED_CLASS}`).length;
  }
  _focusEditor($container) {
    this._editorFactoryController.focus($container);
    // @ts-expect-error
    _events_engine.default.trigger($container.find(EDITORS_INPUT_SELECTOR), 'focus');
  }
  _renderFilterOperationChooser($container, column, $editorContainer) {
    const that = this;
    let $menu;
    if (that.option('filterRow.showOperationChooser')) {
      $container.addClass(EDITOR_WITH_MENU_CLASS);
      $menu = (0, _renderer.default)('<div>').prependTo($container);
      that._updateFilterOperationChooser($menu, column, $editorContainer);
    }
  }
  _getFilterOperationMenuItems(column) {
    var _column$filterOperati3;
    const that = this;
    let result = [{}];
    const filterRowOptions = that.option('filterRow');
    if ((_column$filterOperati3 = column.filterOperations) !== null && _column$filterOperati3 !== void 0 && _column$filterOperati3.length) {
      const availableFilterOperations = column.filterOperations.filter(value => (0, _type.isDefined)(OPERATION_DESCRIPTORS[value]));
      result = (0, _iterator.map)(availableFilterOperations, value => ({
        name: value,
        selected: (getColumnSelectedFilterOperation(that, column) || column.defaultFilterOperation) === value,
        text: that._getOperationDescriptionFromDescriptor(value),
        icon: OPERATION_ICONS[value]
      }));
      result.push({
        name: null,
        text: filterRowOptions === null || filterRowOptions === void 0 ? void 0 : filterRowOptions.resetOperationText,
        icon: OPERATION_ICONS.default
      });
    }
    return result;
  }
  _getOperationDescriptionFromDescriptor(value) {
    const filterRowOptions = this.option('filterRow');
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const operationDescriptions = (filterRowOptions === null || filterRowOptions === void 0 ? void 0 : filterRowOptions.operationDescriptions) || {};
    const descriptionName = OPERATION_DESCRIPTORS[value];
    return operationDescriptions[descriptionName];
  }
  _handleDataChanged(e) {
    var _this$_dataController, _this$_dataController2, _dataSource$lastLoadO, _e$operationTypes, _e$operationTypes2;
    const dataSource = (_this$_dataController = this._dataController) === null || _this$_dataController === void 0 || (_this$_dataController2 = _this$_dataController.dataSource) === null || _this$_dataController2 === void 0 ? void 0 : _this$_dataController2.call(_this$_dataController);
    const lastLoadOptions = dataSource === null || dataSource === void 0 || (_dataSource$lastLoadO = dataSource.lastLoadOptions) === null || _dataSource$lastLoadO === void 0 ? void 0 : _dataSource$lastLoadO.call(dataSource);
    // @ts-expect-error
    super._handleDataChanged.apply(this, arguments);
    if ((_e$operationTypes = e.operationTypes) !== null && _e$operationTypes !== void 0 && _e$operationTypes.filtering || (_e$operationTypes2 = e.operationTypes) !== null && _e$operationTypes2 !== void 0 && _e$operationTypes2.fullReload) {
      var _e$operationTypes3;
      this.updateLookupDataSource(((_e$operationTypes3 = e.operationTypes) === null || _e$operationTypes3 === void 0 ? void 0 : _e$operationTypes3.filtering) || (lastLoadOptions === null || lastLoadOptions === void 0 ? void 0 : lastLoadOptions.filter));
    }
  }
  updateLookupDataSource(filterChanged) {
    if (!this.option('syncLookupFilterValues')) {
      return;
    }
    if (!this.element()) {
      return;
    }
    const columns = this._columnsController.getVisibleColumns();
    const dataSource = this._dataController.dataSource();
    const applyFilterViewController = this._applyFilterViewController;
    const rowIndex = this.element().find(`.${this.addWidgetPrefix(FILTER_ROW_CLASS)}`).index();
    if (rowIndex === -1) {
      return;
    }
    columns.forEach((column, index) => {
      if (!column.lookup || column.calculateCellValue !== column.defaultCalculateCellValue) {
        return;
      }
      const $cell = this._getCellElement(rowIndex, index);
      const editor = getEditorInstance($cell === null || $cell === void 0 ? void 0 : $cell.find('.dx-editor-container'));
      if (editor) {
        applyFilterViewController.setCurrentColumnForFiltering(column);
        const filter = this._dataController.getCombinedFilter() || null;
        applyFilterViewController.setCurrentColumnForFiltering(null);
        const editorDataSource = editor.option('dataSource');
        const shouldUpdateFilter = !filterChanged || !(0, _common.equalByValue)(editorDataSource.__dataGridSourceFilter || null, filter);
        if (shouldUpdateFilter) {
          const lookupDataSource = _m_utils.default.getWrappedLookupDataSource(column, dataSource, filter);
          editor.option('dataSource', lookupDataSource);
        }
      }
    });
  }
  getColumnElements(index, bandColumnIndex) {
    var _rows$index;
    const rows = this._getRows();
    if ((rows === null || rows === void 0 || (_rows$index = rows[index]) === null || _rows$index === void 0 ? void 0 : _rows$index.rowType) === 'filter' && arguments.length < 2) {
      return this.getCellElements(index);
    }
    return super.getColumnElements(index, bandColumnIndex);
  }
  isFilterRowCell($cell) {
    return !!$cell.closest(`.${this.addWidgetPrefix(FILTER_ROW_CLASS)}`).length;
  }
};
const data = Base => class DataControllerFilterRowExtender extends Base {
  skipCalculateColumnFilters() {
    return false;
  }
  _calculateAdditionalFilter() {
    if (this.skipCalculateColumnFilters()) {
      return super._calculateAdditionalFilter();
    }
    const filters = [super._calculateAdditionalFilter()];
    const columns = this._columnsController.getVisibleColumns(null, true);
    const applyFilterController = this._applyFilterController;
    (0, _iterator.each)(columns, function () {
      var _applyFilterControlle;
      const shouldSkip = ((_applyFilterControlle = applyFilterController.getCurrentColumnForFiltering()) === null || _applyFilterControlle === void 0 ? void 0 : _applyFilterControlle.index) === this.index;
      if (this.allowFiltering && this.calculateFilterExpression && (0, _type.isDefined)(this.filterValue) && !shouldSkip) {
        const filter = this.createFilterExpression(this.filterValue, this.selectedFilterOperation || this.defaultFilterOperation, 'filterRow');
        filters.push(filter);
      }
    });
    return _m_utils.default.combineFilters(filters);
  }
};
class ApplyFilterViewController extends _m_modules.default.ViewController {
  init() {
    this._columnsController = this.getController('columns');
  }
  _getHeaderPanel() {
    if (!this._headerPanel) {
      // TODO getView
      this._headerPanel = this.getView('headerPanel');
    }
    return this._headerPanel;
  }
  setHighLight($element, value) {
    if (isOnClickApplyFilterMode(this)) {
      ($element === null || $element === void 0 ? void 0 : $element.toggleClass(HIGHLIGHT_OUTLINE_CLASS, value)) && $element.closest(`.${EDITOR_CELL_CLASS}`).toggleClass(FILTER_MODIFIED_CLASS, value);
      this._getHeaderPanel().enableApplyButton(value);
    }
  }
  applyFilter() {
    const columns = this._columnsController.getColumns();
    this._columnsController.beginUpdate();
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.bufferedFilterValue !== undefined) {
        this._columnsController.columnOption(i, 'filterValue', column.bufferedFilterValue);
        column.bufferedFilterValue = undefined;
      }
      if (column.bufferedSelectedFilterOperation !== undefined) {
        this._columnsController.columnOption(i, 'selectedFilterOperation', column.bufferedSelectedFilterOperation);
        column.bufferedSelectedFilterOperation = undefined;
      }
    }
    this._columnsController.endUpdate();
    this.removeHighLights();
  }
  removeHighLights() {
    if (isOnClickApplyFilterMode(this)) {
      // TODO getView
      const columnHeadersViewElement = this.getView('columnHeadersView').element();
      columnHeadersViewElement.find(`.${this.addWidgetPrefix(FILTER_ROW_CLASS)} .${HIGHLIGHT_OUTLINE_CLASS}`).removeClass(HIGHLIGHT_OUTLINE_CLASS);
      columnHeadersViewElement.find(`.${this.addWidgetPrefix(FILTER_ROW_CLASS)} .${FILTER_MODIFIED_CLASS}`).removeClass(FILTER_MODIFIED_CLASS);
      this._getHeaderPanel().enableApplyButton(false);
    }
  }
  setCurrentColumnForFiltering(column) {
    this._currentColumn = column;
  }
  getCurrentColumnForFiltering() {
    return this._currentColumn;
  }
}
exports.ApplyFilterViewController = ApplyFilterViewController;
const columnsResizer = Base => class FilterRowColumnsResizerExtender extends Base {
  _startResizing() {
    const that = this;
    // @ts-expect-error
    super._startResizing.apply(that, arguments);
    if (that.isResizing()) {
      // @ts-expect-error
      const overlayInstance = that._columnHeadersView.getFilterRangeOverlayInstance();
      if (overlayInstance) {
        const cellIndex = overlayInstance.$element().closest('td').index();
        if (cellIndex === that._targetPoint.columnIndex || cellIndex === that._targetPoint.columnIndex + 1) {
          overlayInstance.$content().hide();
        }
      }
    }
  }
  _endResizing() {
    const that = this;
    let $cell;
    if (that.isResizing()) {
      // @ts-expect-error
      const overlayInstance = that._columnHeadersView.getFilterRangeOverlayInstance();
      if (overlayInstance) {
        $cell = overlayInstance.$element().closest('td');
        // @ts-expect-error
        that._columnHeadersView._updateFilterRangeOverlay({
          width: (0, _size.getOuterWidth)($cell, true) + CORRECT_FILTER_RANGE_OVERLAY_WIDTH
        });
        overlayInstance.$content().show();
      }
    }
    // @ts-expect-error
    super._endResizing.apply(that, arguments);
  }
};
const editing = Base => class FilterRowEditingController extends Base {
  updateFieldValue(options) {
    if (options.column.lookup) {
      this._needUpdateLookupDataSource = true;
    }
    // @ts-expect-error
    return super.updateFieldValue.apply(this, arguments);
  }
  _afterSaveEditData(cancel) {
    if (this._needUpdateLookupDataSource && !cancel) {
      var _this$getView;
      // TODO getView
      // @ts-expect-error
      (_this$getView = this.getView('columnHeadersView')) === null || _this$getView === void 0 || _this$getView.updateLookupDataSource();
    }
    this._needUpdateLookupDataSource = false;
    // @ts-expect-error
    return super._afterSaveEditData.apply(this, arguments);
  }
  _afterCancelEditData() {
    this._needUpdateLookupDataSource = false;
    // @ts-expect-error
    return super._afterCancelEditData.apply(this, arguments);
  }
};
const headerPanel = Base => class FilterRowHeaderPanel extends Base {
  init() {
    super.init();
    this._dataController = this.getController('data');
    this._applyFilterViewController = this.getController('applyFilter');
  }
  optionChanged(args) {
    if (args.name === 'filterRow') {
      this._invalidate();
      args.handled = true;
    } else {
      super.optionChanged(args);
    }
  }
  _getToolbarItems() {
    const items = super._getToolbarItems();
    const filterItem = this._prepareFilterItem();
    return filterItem.concat(items);
  }
  _prepareFilterItem() {
    const that = this;
    const filterItem = [];
    if (that._isShowApplyFilterButton()) {
      const hintText = that.option('filterRow.applyFilterText');
      const columns = that._columnsController.getColumns();
      const disabled = !columns.filter(column => column.bufferedFilterValue !== undefined).length;
      const onInitialized = function (e) {
        (0, _renderer.default)(e.element).addClass(that._getToolbarButtonClass(APPLY_BUTTON_CLASS));
      };
      const onClickHandler = function () {
        that._applyFilterViewController.applyFilter();
      };
      const toolbarItem = {
        widget: 'dxButton',
        options: {
          icon: 'apply-filter',
          disabled,
          onClick: onClickHandler,
          hint: hintText,
          text: hintText,
          onInitialized
        },
        showText: 'inMenu',
        name: 'applyFilterButton',
        location: 'after',
        locateInMenu: 'auto',
        sortIndex: 10
      };
      filterItem.push(toolbarItem);
    }
    return filterItem;
  }
  _isShowApplyFilterButton() {
    const filterRowOptions = this.option('filterRow');
    return !!(filterRowOptions !== null && filterRowOptions !== void 0 && filterRowOptions.visible) && filterRowOptions.applyFilter === 'onClick';
  }
  enableApplyButton(value) {
    this.setToolbarItemDisabled('applyFilterButton', !value);
  }
};
const filterRowModule = exports.filterRowModule = {
  defaultOptions() {
    return {
      syncLookupFilterValues: true,
      filterRow: {
        visible: false,
        showOperationChooser: true,
        showAllText: _message.default.format('dxDataGrid-filterRowShowAllText'),
        resetOperationText: _message.default.format('dxDataGrid-filterRowResetOperationText'),
        applyFilter: 'auto',
        applyFilterText: _message.default.format('dxDataGrid-applyFilterText'),
        operationDescriptions: {
          equal: _message.default.format('dxDataGrid-filterRowOperationEquals'),
          notEqual: _message.default.format('dxDataGrid-filterRowOperationNotEquals'),
          lessThan: _message.default.format('dxDataGrid-filterRowOperationLess'),
          lessThanOrEqual: _message.default.format('dxDataGrid-filterRowOperationLessOrEquals'),
          greaterThan: _message.default.format('dxDataGrid-filterRowOperationGreater'),
          greaterThanOrEqual: _message.default.format('dxDataGrid-filterRowOperationGreaterOrEquals'),
          startsWith: _message.default.format('dxDataGrid-filterRowOperationStartsWith'),
          contains: _message.default.format('dxDataGrid-filterRowOperationContains'),
          notContains: _message.default.format('dxDataGrid-filterRowOperationNotContains'),
          endsWith: _message.default.format('dxDataGrid-filterRowOperationEndsWith'),
          between: _message.default.format('dxDataGrid-filterRowOperationBetween'),
          isBlank: _message.default.format('dxFilterBuilder-filterOperationIsBlank'),
          isNotBlank: _message.default.format('dxFilterBuilder-filterOperationIsNotBlank')
        },
        betweenStartText: _message.default.format('dxDataGrid-filterRowOperationBetweenStartText'),
        betweenEndText: _message.default.format('dxDataGrid-filterRowOperationBetweenEndText')
      }
    };
  },
  controllers: {
    applyFilter: ApplyFilterViewController
  },
  extenders: {
    controllers: {
      data,
      columnsResizer,
      editing
    },
    views: {
      columnHeadersView,
      headerPanel
    }
  }
};
