/* eslint-disable max-classes-per-file */
import '../../../ui/list/modules/m_search';
import '../../../ui/list/modules/m_selection';
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { isDefined, isFunction } from '../../../../core/utils/type';
import Popup from '../../../../ui/popup/ui.popup';
import Modules from '../../../grids/grid_core/m_modules';
import List from '../../../ui/list/m_list.edit.search';
import TreeView from '../../../ui/tree_view/m_tree_view.search';
import gridCoreUtils from '../m_utils';
const HEADER_FILTER_CLASS = 'dx-header-filter';
const HEADER_FILTER_MENU_CLASS = 'dx-header-filter-menu';
const DEFAULT_SEARCH_EXPRESSION = 'text';
const HANDLER_DECORATED_KEY = Symbol('HANDLER_DECORATED_KEY');
function resetChildrenItemSelection(items) {
  items = items || [];
  for (let i = 0; i < items.length; i++) {
    items[i].selected = false;
    resetChildrenItemSelection(items[i].items);
  }
}
function getSelectAllCheckBox(listComponent) {
  const selector = listComponent.NAME === 'dxTreeView' ? '.dx-treeview-select-all-item' : '.dx-list-select-all-checkbox';
  return listComponent.$element().find(selector).dxCheckBox('instance');
}
function getListSelectAllValueChangedHandler(selectAllCheckBox, listComponent) {
  const originalHandler = selectAllCheckBox.option('onValueChanged');
  if (originalHandler !== null && originalHandler !== void 0 && originalHandler[HANDLER_DECORATED_KEY]) {
    return originalHandler;
  }
  const handler = originalEvent => {
    const {
      event,
      value
    } = originalEvent;
    const isEventFromUI = !!event;
    event === null || event === void 0 || event.stopPropagation();
    switch (true) {
      case isEventFromUI && value === true:
        listComponent.selectAll();
        return;
      case isEventFromUI && value === false:
        listComponent.unselectAll();
        return;
      default:
        originalHandler === null || originalHandler === void 0 || originalHandler(originalEvent);
    }
  };
  handler[HANDLER_DECORATED_KEY] = true;
  return handler;
}
// NOTE: T1284200 fix + after T1293295 regression fix
// We take control of list's select all checkbox on our side
// It's temporary solution, in future we should implement this functionality in list
// or change our HeaderFilter UX behavior
function decorateListSelectAllValueChanged(listComponent) {
  const selectAllCheckBox = getSelectAllCheckBox(listComponent);
  if (!selectAllCheckBox) {
    return;
  }
  const handler = getListSelectAllValueChangedHandler(selectAllCheckBox, listComponent);
  selectAllCheckBox.option('onValueChanged', handler);
}
function updateListSelectAllState(listComponent, filterValues) {
  if (listComponent.option('searchValue')) {
    return;
  }
  const selectAllCheckBox = getSelectAllCheckBox(listComponent);
  if (selectAllCheckBox && filterValues !== null && filterValues !== void 0 && filterValues.length) {
    selectAllCheckBox.option('value', undefined);
  }
}
export function updateHeaderFilterItemSelectionState(item, filterValuesMatch, isExcludeFilter) {
  if (filterValuesMatch ^ isExcludeFilter) {
    item.selected = true;
    if (isExcludeFilter && item.items) {
      for (let j = 0; j < item.items.length; j++) {
        if (!item.items[j].selected) {
          item.selected = undefined;
          break;
        }
      }
    }
  } else if (isExcludeFilter || item.selected) {
    item.selected = false;
    resetChildrenItemSelection(item.items);
  }
}
export class HeaderFilterView extends Modules.View {
  getPopupContainer() {
    return this._popupContainer;
  }
  getListComponent() {
    return this._listComponent;
  }
  applyHeaderFilter(options) {
    const that = this;
    const list = that.getListComponent();
    const searchValue = list.option('searchValue');
    const selectAllCheckBox = getSelectAllCheckBox(list);
    const isAllSelected = !searchValue && !options.isFilterBuilder && (selectAllCheckBox === null || selectAllCheckBox === void 0 ? void 0 : selectAllCheckBox.option('value'));
    const filterValues = [];
    const fillSelectedItemKeys = function (filterValues, items, isExclude) {
      each(items, (_, item) => {
        if (item.selected !== undefined && !!item.selected ^ isExclude) {
          const node = list._getNode(item);
          const hasChildren = list._hasChildren(node);
          const hasChildrenWithSelection = hasChildren && item.items && item.items.some(item => item.selected);
          if (!searchValue || !hasChildrenWithSelection) {
            filterValues.push(item.value);
            return;
          }
        }
        if (item.items && item.items.length) {
          fillSelectedItemKeys(filterValues, item.items, isExclude);
        }
      });
    };
    if (!isAllSelected) {
      if (options.type === 'tree') {
        if (options.filterType) {
          options.filterType = 'include';
        }
        fillSelectedItemKeys(filterValues, list.option('items'), false);
        options.filterValues = filterValues;
      }
    } else {
      if (options.type === 'tree') {
        options.filterType = 'exclude';
      }
      if (Array.isArray(options.filterValues)) {
        options.filterValues = [];
      }
    }
    if (options.filterValues && !options.filterValues.length) {
      options.filterValues = null; // T500956
    }
    options.apply();
    that.hideHeaderFilterMenu();
  }
  showHeaderFilterMenu($columnElement, options) {
    const that = this;
    if (options) {
      that._initializePopupContainer(options);
      const popupContainer = that.getPopupContainer();
      that.hideHeaderFilterMenu();
      that.updatePopup($columnElement, options);
      popupContainer.show();
    }
  }
  hideHeaderFilterMenu() {
    const headerFilterMenu = this.getPopupContainer();
    headerFilterMenu && headerFilterMenu.hide();
  }
  updatePopup($element, options) {
    const that = this;
    const showColumnLines = this.option('showColumnLines');
    const alignment = options.alignment === 'right' ^ !showColumnLines ? 'left' : 'right';
    that._popupContainer.setAria({
      role: 'dialog',
      label: messageLocalization.format('dxDataGrid-headerFilterLabel')
    });
    if (that._popupContainer) {
      that._cleanPopupContent();
      that._popupContainer.option('position', {
        my: `${alignment} top`,
        at: `${alignment} bottom`,
        of: $element,
        collision: 'fit fit' // T1156848
      });
    }
  }
  _getSearchExpr(options, headerFilterOptions) {
    const {
      lookup
    } = options;
    const {
      useDefaultSearchExpr
    } = options;
    const headerFilterDataSource = headerFilterOptions.dataSource;
    const filterSearchExpr = headerFilterOptions.search.searchExpr;
    if (filterSearchExpr) {
      return filterSearchExpr;
    }
    if (useDefaultSearchExpr || isDefined(headerFilterDataSource) && !isFunction(headerFilterDataSource)) {
      return DEFAULT_SEARCH_EXPRESSION;
    }
    if (lookup) {
      return lookup.displayExpr || 'this';
    }
    if (options.dataSource) {
      const {
        group
      } = options.dataSource;
      if (Array.isArray(group) && group.length > 0) {
        return group[0].selector;
      }
      if (isFunction(group) && !options.remoteFiltering) {
        return group;
      }
    }
    return options.dataField || options.selector;
  }
  _cleanPopupContent() {
    this._popupContainer && this._popupContainer.$content().empty();
  }
  _initializePopupContainer(options) {
    const that = this;
    const $element = that.element();
    const headerFilterOptions = this._normalizeHeaderFilterOptions(options);
    const {
      hidePopupCallback
    } = options;
    const {
      height,
      width
    } = headerFilterOptions;
    const dxPopupOptions = {
      width,
      height,
      visible: false,
      shading: false,
      showTitle: false,
      showCloseButton: false,
      hideOnParentScroll: false,
      dragEnabled: false,
      hideOnOutsideClick: true,
      wrapperAttr: {
        class: HEADER_FILTER_MENU_CLASS
      },
      focusStateEnabled: false,
      toolbarItems: [{
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          text: headerFilterOptions.texts.ok,
          onClick() {
            that.applyHeaderFilter(options);
          }
        }
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          text: headerFilterOptions.texts.cancel,
          onClick() {
            that.hideHeaderFilterMenu();
            hidePopupCallback === null || hidePopupCallback === void 0 || hidePopupCallback();
          }
        }
      }],
      resizeEnabled: true,
      onShowing(e) {
        e.component.$content().parent().addClass('dx-dropdowneditor-overlay');
        that._initializeListContainer(options, headerFilterOptions);
        options.onShowing && options.onShowing(e);
      },
      onShown() {
        that.getListComponent().focus();
      },
      onHidden: options.onHidden,
      onInitialized(e) {
        const {
          component
        } = e;
        // T321243
        component.option('animation', component._getDefaultOptions().animation);
      },
      _loopFocus: true
    };
    if (!isDefined(that._popupContainer)) {
      that._popupContainer = that._createComponent($element, Popup, dxPopupOptions);
    } else {
      that._popupContainer.option(dxPopupOptions);
    }
  }
  _initializeListContainer(options, headerFilterOptions) {
    const that = this;
    const $content = that._popupContainer.$content();
    const needShowSelectAllCheckbox = !options.isFilterBuilder && headerFilterOptions.allowSelectAll;
    const widgetOptions = {
      searchEnabled: headerFilterOptions.search.enabled,
      searchTimeout: headerFilterOptions.search.timeout,
      searchEditorOptions: headerFilterOptions.search.editorOptions,
      searchMode: headerFilterOptions.search.mode || '',
      dataSource: options.dataSource,
      onContentReady() {
        that.renderCompleted.fire();
      },
      itemTemplate(data, _, element) {
        const $element = $(element);
        if (options.encodeHtml) {
          return $element.text(data.text);
        }
        return $element.html(data.text);
      }
    };
    const shouldChangeSelectAllCheckBoxVisibility = () => needShowSelectAllCheckbox && that.option('headerFilter.hideSelectAllOnSearch') !== false;
    const onTreeViewOptionChanged = event => {
      switch (true) {
        case event.fullName === 'searchValue' && shouldChangeSelectAllCheckBoxVisibility():
          event.component.option('showCheckBoxesMode', event.value ? 'normal' : 'selectAll');
          break;
        // TODO TreeView: remove this WA after Navigation squad re-render fix
        // NOTE: WA for TreeView re-render after changing the "showCheckBoxesMode" option
        // After this option change the whole TreeView re-render and search input loose the focus
        case event.fullName === 'showCheckBoxesMode':
          // NOTE: the TreeView render is async
          // So we should focus the searchEditor only after render will be completed
          Promise.resolve().then(() => {
            event.component.getSearchBoxController().focus();
          }).catch(() => {});
          break;
        default:
          break;
      }
    };
    const onListOptionChanged = event => {
      if (event.fullName === 'searchValue' && shouldChangeSelectAllCheckBoxVisibility()) {
        event.component.option('selectionMode', event.value ? 'multiple' : 'all');
      }
    };
    if (options.type === 'tree') {
      that._listComponent = that._createComponent($('<div>').appendTo($content), TreeView, extend(widgetOptions, {
        showCheckBoxesMode: needShowSelectAllCheckbox ? 'selectAll' : 'normal',
        onOptionChanged: onTreeViewOptionChanged,
        keyExpr: 'id'
      }));
    } else {
      that._listComponent = that._createComponent($('<div>').appendTo($content), List, extend(widgetOptions, {
        searchExpr: that._getSearchExpr(options, headerFilterOptions),
        pageLoadMode: 'scrollBottom',
        showSelectionControls: true,
        selectionMode: needShowSelectAllCheckbox ? 'all' : 'multiple',
        onOptionChanged: onListOptionChanged,
        onSelectionChanged(event) {
          const {
            component: listComponent
          } = event;
          const items = listComponent.option('items');
          const selectedItems = listComponent.option('selectedItems');
          if (!listComponent._selectedItemsUpdating && !listComponent.option('searchValue') && !options.isFilterBuilder) {
            const filterValues = options.filterValues || [];
            const isExclude = options.filterType === 'exclude';
            if (selectedItems.length === 0 && items.length && (filterValues.length <= 1 || isExclude && filterValues.length === items.length - 1)) {
              options.filterType = 'include';
              options.filterValues = [];
            } else if (selectedItems.length === items.length) {
              options.filterType = 'exclude';
              options.filterValues = [];
            }
          }
          each(items, (index, item) => {
            const selected = gridCoreUtils.getIndexByKey(item, selectedItems, null) >= 0;
            const oldSelected = !!item.selected;
            if (oldSelected !== selected) {
              item.selected = selected;
              options.filterValues = options.filterValues || [];
              const filterValueIndex = gridCoreUtils.getIndexByKey(item.value, options.filterValues, null);
              if (filterValueIndex >= 0) {
                options.filterValues.splice(filterValueIndex, 1);
              }
              const isExcludeFilterType = options.filterType === 'exclude';
              if (selected ^ isExcludeFilterType) {
                options.filterValues.push(item.value);
              }
            }
          });
          updateListSelectAllState(listComponent, options.filterValues);
        },
        onContentReady(e) {
          const {
            component: listComponent
          } = e;
          const items = listComponent.option('items');
          const selectedItems = [];
          each(items, function () {
            if (this.selected) {
              selectedItems.push(this);
            }
          });
          listComponent._selectedItemsUpdating = true;
          listComponent.option('selectedItems', selectedItems);
          listComponent._selectedItemsUpdating = false;
          decorateListSelectAllValueChanged(listComponent);
          updateListSelectAllState(listComponent, options.filterValues);
        }
      }));
    }
  }
  _normalizeHeaderFilterOptions(options) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const generalHeaderFilter = this.option('headerFilter') || {};
    const specificHeaderFilter = options.headerFilter || {};
    const generalDeprecated = {
      search: {
        enabled: generalHeaderFilter.allowSearch,
        timeout: generalHeaderFilter.searchTimeout
      }
    };
    const specificDeprecated = {
      search: {
        enabled: specificHeaderFilter.allowSearch,
        mode: specificHeaderFilter.searchMode,
        timeout: specificHeaderFilter.searchTimeout
      }
    };
    return extend(true, {}, generalHeaderFilter, generalDeprecated, specificHeaderFilter, specificDeprecated);
  }
  _renderCore() {
    this.element().addClass(HEADER_FILTER_MENU_CLASS);
  }
}
export const allowHeaderFiltering = function (column) {
  return isDefined(column.allowHeaderFiltering) ? column.allowHeaderFiltering : column.allowFiltering;
};
// TODO Fix types of this mixin
export const headerFilterMixin = Base => class HeaderFilterMixin extends Base {
  optionChanged(args) {
    if (args.name === 'headerFilter') {
      const requireReady = this.name === 'columnHeadersView';
      this._invalidate(requireReady, requireReady);
      args.handled = true;
    } else {
      super.optionChanged(args);
    }
  }
  _applyColumnState(options) {
    let $headerFilterIndicator;
    const {
      rootElement
    } = options;
    const {
      column
    } = options;
    if (options.name === 'headerFilter') {
      rootElement.find(`.${HEADER_FILTER_CLASS}`).remove();
      if (allowHeaderFiltering(column)) {
        $headerFilterIndicator = super._applyColumnState(options).toggleClass('dx-header-filter-empty', this._isHeaderFilterEmpty(column));
        if (!this.option('useLegacyKeyboardNavigation')) {
          $headerFilterIndicator.attr('tabindex', this.option('tabindex') || 0);
        }
        const indicatorLabel = messageLocalization.format('dxDataGrid-headerFilterIndicatorLabel', column.caption);
        $headerFilterIndicator.attr('aria-label', indicatorLabel);
        $headerFilterIndicator.attr('aria-haspopup', 'dialog');
        $headerFilterIndicator.attr('role', 'button');
      }
      return $headerFilterIndicator;
    }
    return super._applyColumnState(options);
  }
  _isHeaderFilterEmpty(column) {
    return !column.filterValues || !column.filterValues.length;
  }
  _getIndicatorClassName(name) {
    if (name === 'headerFilter') {
      return HEADER_FILTER_CLASS;
    }
    return super._getIndicatorClassName(name);
  }
  _renderIndicator(options) {
    const $container = options.container;
    const $indicator = options.indicator;
    if (options.name === 'headerFilter') {
      const rtlEnabled = this.option('rtlEnabled');
      if ($container.children().length && (!rtlEnabled && options.columnAlignment === 'right' || rtlEnabled && options.columnAlignment === 'left')) {
        $container.prepend($indicator);
        return;
      }
    }
    super._renderIndicator(options);
  }
};