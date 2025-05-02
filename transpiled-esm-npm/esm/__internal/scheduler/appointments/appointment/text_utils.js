import dateLocalization from '../../../../common/core/localization/date';
import messageLocalization from '../../../../common/core/localization/message';
import { isDefined } from '../../../../core/utils/type';
import { PathTimeZoneConversion } from '../../../scheduler/r1/timezone_calculator/const';
import { getPathToLeaf } from '../../resources/m_utils';
const localizeDate = date => `${dateLocalization.format(date, 'monthAndDay')}, ${dateLocalization.format(date, 'year')}`;
const localizeTime = date => `${dateLocalization.format(date, 'shorttime')}`;
const getDate = (options, propName) => {
  var _options$timeZoneCalc;
  const result = options.dataAccessors.get(propName, options.data);
  if (!result) {
    return result;
  }
  const date = new Date(result);
  const gridDate = (_options$timeZoneCalc = options.timeZoneCalculator) === null || _options$timeZoneCalc === void 0 ? void 0 : _options$timeZoneCalc.createDate(date, {
    path: PathTimeZoneConversion.fromSourceToGrid
  });
  return gridDate ?? date;
};
const getDateText = options => {
  const startDate = getDate(options, 'startDate');
  const endDate = getDate(options, 'endDate');
  const startDateText = localizeDate(startDate);
  const endDateText = localizeDate(endDate);
  const startTimeText = localizeTime(startDate);
  const endTimeText = localizeTime(endDate);
  const isAllDay = Boolean(options.dataAccessors.get('allDay', options.data));
  const allDayText = messageLocalization.format('dxScheduler-allDay');
  if (startDateText === endDateText) {
    return isAllDay ? `${startDateText}, ${allDayText}` : `${startDateText}, ${startTimeText} - ${endTimeText}`;
  }
  return isAllDay ? `${startDateText} - ${endDateText}, ${allDayText}` : `${startDateText}, ${startTimeText} - ${endDateText}, ${endTimeText}`;
};
const getPartsText = _ref => {
  let {
    partIndex,
    partTotalCount
  } = _ref;
  return isDefined(partIndex) ? ` (${partIndex + 1}/${partTotalCount})` : '';
};
export const getAriaLabel = options => {
  const name = options.dataAccessors.get('text', options.data) ?? '';
  const dates = getDateText(options);
  const parts = getPartsText(options);
  return `${name}: ${dates}${parts}`;
};
export const getReducedIconTooltip = options => {
  const tooltipLabel = messageLocalization.format('dxScheduler-editorLabelEndDate');
  const endDateText = localizeDate(getDate(options, 'endDate'));
  return `${tooltipLabel}: ${endDateText}`;
};
export const getGroupTexts = (groupIndex, loadedResources) => {
  if (!(loadedResources !== null && loadedResources !== void 0 && loadedResources.length)) {
    return [];
  }
  const idPath = getPathToLeaf(groupIndex, loadedResources);
  const textPath = idPath.map((id, index) => {
    var _loadedResources$inde;
    return (_loadedResources$inde = loadedResources[index].items.find(item => item.id === id)) === null || _loadedResources$inde === void 0 ? void 0 : _loadedResources$inde.text;
  }).filter(Boolean);
  return textPath;
};
const getGroupText = options => {
  if (!options.groupTexts.length) {
    return '';
  }
  const groupText = options.groupTexts.join(', ');
  // @ts-ignore @ts-expect-error
  return messageLocalization.format('dxScheduler-appointmentAriaLabel-group', groupText);
};
const getResourceText = async options => {
  const resourceProcessor = options.getResourceProcessor();
  const list = await resourceProcessor.getAppointmentResourcesValues(options.data);
  return list.map(item => `${item.label}: ${item.values.join(', ')}`);
};
export const getAriaDescription = async options => {
  const resources = await getResourceText(options);
  const texts = [getGroupText(options), ...resources].filter(Boolean);
  return texts.join('; ');
};