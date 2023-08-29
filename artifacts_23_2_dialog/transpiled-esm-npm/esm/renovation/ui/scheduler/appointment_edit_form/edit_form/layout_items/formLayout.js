import { getDescriptionLayoutItemConfig } from './description';
import { ItemLabels } from './const';
import { getDateBoxGroupConfig } from './groups/dateBoxGroup';
import { getSwitchGroupConfig } from './groups/switchGroup';
var LayoutGroupNames = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};
var createMainItems = (dataExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate) => [{
  dataField: dataExpr.textExpr,
  editorType: 'dxTextBox',
  colSpan: 2,
  label: {
    text: ItemLabels.subject
  }
}, getDateBoxGroupConfig(dataExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate), getSwitchGroupConfig(allDayEditorTemplate, repeatEditorTemplate, dataExpr.allDayExpr), {
  itemType: 'empty',
  colSpan: 2
}, getDescriptionLayoutItemConfig(descriptionEditorTemplate, dataExpr.descriptionExpr, ItemLabels.description), {
  itemType: 'empty',
  colSpan: 2
}];
var getMainLayout = (colSpan, dateExpr, recurrenceEditorVisibility, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate) => [{
  itemType: 'group',
  name: LayoutGroupNames.Main,
  colCountByScreen: {
    lg: 2,
    xs: 1
  },
  colSpan,
  items: createMainItems(dateExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate)
}, {
  itemType: 'group',
  name: LayoutGroupNames.Recurrence,
  visible: recurrenceEditorVisibility,
  colSpan,
  items: []
}];
export var getFormLayoutConfig = (fieldExpr, formData, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate) => {
  var recurrenceEditorVisibility = !!formData[fieldExpr.recurrenceRuleExpr];
  var colSpan = recurrenceEditorVisibility ? 1 : 2;
  return getMainLayout(colSpan, fieldExpr, recurrenceEditorVisibility, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate);
};