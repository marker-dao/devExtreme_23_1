/**
* DevExtreme (esm/__internal/grids/tree_list/m_validating.js)
* Version: 23.2.0
* Build date: Wed Oct 18 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
import { validatingModule } from '../../grids/grid_core/validating/m_validating';
import treeListCore from './m_core';
var EditingControllerExtender = extend({}, validatingModule.extenders.controllers.editing);
delete EditingControllerExtender.processItems;
delete EditingControllerExtender.processDataItem;
treeListCore.registerModule('validating', {
  defaultOptions: validatingModule.defaultOptions,
  controllers: validatingModule.controllers,
  extenders: {
    controllers: {
      editing: EditingControllerExtender,
      editorFactory: validatingModule.extenders.controllers.editorFactory
    },
    views: validatingModule.extenders.views
  }
});
