/**
* DevExtreme (esm/__internal/grids/tree_list/m_widget_base.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import './module_not_extended/column_headers';
import './m_columns_controller';
import './data_controller/m_data_controller';
import './module_not_extended/sorting';
import './rows/m_rows';
import './module_not_extended/context_menu';
import './module_not_extended/error_handling';
import './m_grid_view';
import './module_not_extended/header_panel';
import registerComponent from '../../../core/component_registrator';
import { isDefined } from '../../../core/utils/type';
import { isMaterialBased } from '../../../ui/themes';
import gridCoreUtils from '../../grids/grid_core/m_utils';
import GridCoreWidget from '../../grids/grid_core/m_widget_base';
import treeListCore from './m_core';
const TREELIST_CLASS = 'dx-treelist';
treeListCore.registerModulesOrder(['stateStoring', 'columns', 'selection', 'editorFactory', 'columnChooser', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'editing', 'grouping', 'masterDetail', 'validating', 'adaptivity', 'data', 'virtualScrolling', 'columnHeaders', 'filterRow', 'headerPanel', 'headerFilter', 'sorting', 'search', 'rows', 'pager', 'columnsResizingReordering', 'contextMenu', 'keyboardNavigation', 'headersKeyboardNavigation', 'errorHandling', 'summary', 'columnFixing', 'export', 'gridView']);
class TreeList extends GridCoreWidget {
  _initMarkup() {
    // @ts-expect-error
    super._initMarkup.apply(this, arguments);
    this.$element().addClass(TREELIST_CLASS);
    this.getView('gridView').render(this.$element());
  }
  static registerModule() {
    treeListCore.registerModule.apply(treeListCore, arguments);
  }
  _defaultOptionsRules() {
    // @ts-expect-error
    return super._defaultOptionsRules().concat([{
      device() {
        // @ts-expect-error
        return isMaterialBased();
      },
      options: {
        showRowLines: true,
        showColumnLines: false,
        headerFilter: {
          height: 315
        },
        editing: {
          useIcons: true
        }
      }
    }]);
  }
  _init() {
    const that = this;
    super._init();
    if (!this.option('_disableDeprecationWarnings')) {
      gridCoreUtils.logHeaderFilterDeprecatedWarningIfNeed(this);
    }
    treeListCore.processModules(that, treeListCore);
    treeListCore.callModuleItemsMethod(this, 'init');
  }
  getGridCoreHelper() {
    return treeListCore;
  }
  focus(element) {
    super.focus();
    if (isDefined(element)) {
      this.getController('keyboardNavigation').focus(element);
    }
  }
}
// @ts-expect-error
registerComponent('dxTreeList', TreeList);
export default TreeList;
