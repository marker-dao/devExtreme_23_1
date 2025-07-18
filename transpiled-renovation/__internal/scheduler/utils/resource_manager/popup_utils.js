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