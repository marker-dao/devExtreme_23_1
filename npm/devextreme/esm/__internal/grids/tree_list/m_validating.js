/**
* DevExtreme (esm/__internal/grids/tree_list/m_validating.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { validatingModule } from '../../grids/grid_core/validating/m_validating';
import treeListCore from './m_core';
const editingControllerExtender = Base => class TreeListEditingControllerExtender extends validatingModule.extenders.controllers.editing(Base) {
  processDataItem(item) {
    super.processDataItemTreeListHack.apply(this, arguments);
  }
  processItems(items, e) {
    return super.processItemsTreeListHack.apply(this, arguments);
  }
};
treeListCore.registerModule('validating', {
  defaultOptions: validatingModule.defaultOptions,
  controllers: validatingModule.controllers,
  extenders: {
    controllers: {
      editing: editingControllerExtender,
      editorFactory: validatingModule.extenders.controllers.editorFactory
    },
    views: validatingModule.extenders.views
  }
});
