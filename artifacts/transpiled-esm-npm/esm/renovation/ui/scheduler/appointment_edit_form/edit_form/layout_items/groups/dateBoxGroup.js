import { ItemLabels } from '../const';
import { getDateBoxLayoutItemConfig } from '../dateBox';
import { getTimeZoneLayoutItemConfig } from '../timeZone';
var createDateBoxItems = options => {
  var colSpan = options.allowTimeZoneEditing ? 2 : 1;
  var startDateLayoutItem = getDateBoxLayoutItemConfig(options.startDateEditorTemplate, options.dataExpr.startDateExpr, colSpan, ItemLabels.startDate);
  var startDateTimeZoneLayoutItem = getTimeZoneLayoutItemConfig(options.startDatetimeZoneEditorTemplate, options.dataExpr.startDateTimeZoneExpr, colSpan, 1, !!options.allowTimeZoneEditing);
  var endDateLayoutItem = getDateBoxLayoutItemConfig(options.endDateEditorTemplate, options.dataExpr.endDateExpr, colSpan, ItemLabels.endDate);
  var endDateTimeZoneLayoutItem = getTimeZoneLayoutItemConfig(options.endDateTimeZoneEditorTemplate, options.dataExpr.endDateTimeZoneExpr, colSpan, 3, !!options.allowTimeZoneEditing);
  return [startDateLayoutItem, startDateTimeZoneLayoutItem, endDateLayoutItem, endDateTimeZoneLayoutItem];
};
export var getDateBoxGroupConfig = (dataExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate) => ({
  itemType: 'group',
  colSpan: 2,
  colCountByScreen: {
    lg: 2,
    xs: 1
  },
  items: createDateBoxItems({
    dataExpr,
    allowTimeZoneEditing,
    startDateEditorTemplate,
    endDateEditorTemplate,
    startDatetimeZoneEditorTemplate,
    endDateTimeZoneEditorTemplate
  })
});