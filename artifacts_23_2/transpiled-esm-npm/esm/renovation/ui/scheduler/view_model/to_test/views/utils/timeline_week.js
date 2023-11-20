import { getValidCellDateForLocalTimeFormat } from './base';
export var getDateForHeaderText = (index, date, _ref) => {
  var {
    cellCountInDay,
    interval,
    startDayHour,
    startViewDate,
    viewOffset
  } = _ref;
  return getValidCellDateForLocalTimeFormat(date, {
    startViewDate,
    startDayHour,
    cellIndexShift: index % cellCountInDay * interval,
    viewOffset
  });
};