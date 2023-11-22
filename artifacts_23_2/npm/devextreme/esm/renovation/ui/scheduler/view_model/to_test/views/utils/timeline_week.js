/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/to_test/views/utils/timeline_week.js)
* Version: 23.2.2
* Build date: Wed Nov 22 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
