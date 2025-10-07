/**
* DevExtreme (esm/__internal/scheduler/utils/resource_manager/popup_utils.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { current, isFluent } from '../../../../ui/themes';
export const createResourceEditorModel = resourceById => Object.values(resourceById).map(resourceLoader => {
  const dataField = resourceLoader.resourceIndex;
  return {
    editorOptions: {
      dataSource: resourceLoader.dataSource,
      displayExpr: resourceLoader.dataAccessor.textExpr,
      valueExpr: resourceLoader.dataAccessor.idExpr,
      stylingMode: isFluent(current()) ? 'filled' : 'outlined'
    },
    dataField,
    editorType: resourceLoader.allowMultiple ? 'dxTagBox' : 'dxSelectBox',
    label: {
      text: resourceLoader.resourceName ?? dataField
    }
  };
});
