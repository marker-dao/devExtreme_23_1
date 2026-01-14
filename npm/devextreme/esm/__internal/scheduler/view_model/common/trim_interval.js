/**
* DevExtreme (esm/__internal/scheduler/view_model/common/trim_interval.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const trimInterval = _ref => {
  let {
    min,
    max
  } = _ref;
  const maxMinusDay = new Date(max - 1).setUTCHours(0, 0, 0, 0);
  const maxMinusDayDate = new Date(maxMinusDay);
  return {
    min: new Date(min).setUTCHours(0, 0, 0, 0),
    max: maxMinusDayDate.setDate(maxMinusDayDate.getDate() + 1)
  };
};
