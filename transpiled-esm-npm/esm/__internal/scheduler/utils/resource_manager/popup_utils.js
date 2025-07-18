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