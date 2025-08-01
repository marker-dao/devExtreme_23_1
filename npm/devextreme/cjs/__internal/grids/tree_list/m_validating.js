/**
* DevExtreme (cjs/__internal/grids/tree_list/m_validating.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_validating = require("../../grids/grid_core/validating/m_validating");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-unused-vars */

const editingControllerExtender = Base => class TreeListEditingControllerExtender extends _m_validating.validatingModule.extenders.controllers.editing(Base) {
  processDataItem(item) {
    super.processDataItemTreeListHack.apply(this, arguments);
  }
  processItems(items, e) {
    return super.processItemsTreeListHack.apply(this, arguments);
  }
};
_m_core.default.registerModule('validating', {
  defaultOptions: _m_validating.validatingModule.defaultOptions,
  controllers: _m_validating.validatingModule.controllers,
  extenders: {
    controllers: {
      editing: editingControllerExtender,
      editorFactory: _m_validating.validatingModule.extenders.controllers.editorFactory
    },
    views: _m_validating.validatingModule.extenders.views
  }
});
