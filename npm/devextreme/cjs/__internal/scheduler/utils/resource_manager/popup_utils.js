/**
* DevExtreme (cjs/__internal/scheduler/utils/resource_manager/popup_utils.js)
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
exports.createResourceEditorModel = void 0;
var _themes = require("../../../../ui/themes");
const createResourceEditorModel = resourceById => Object.values(resourceById).map(resourceLoader => {
  const dataField = resourceLoader.resourceIndex;
  return {
    editorOptions: {
      dataSource: resourceLoader.dataSource,
      displayExpr: resourceLoader.dataAccessor.textExpr,
      valueExpr: resourceLoader.dataAccessor.idExpr,
      stylingMode: (0, _themes.isFluent)((0, _themes.current)()) ? 'filled' : 'outlined'
    },
    dataField,
    editorType: resourceLoader.allowMultiple ? 'dxTagBox' : 'dxSelectBox',
    label: {
      text: resourceLoader.resourceName ?? dataField
    }
  };
});
exports.createResourceEditorModel = createResourceEditorModel;
