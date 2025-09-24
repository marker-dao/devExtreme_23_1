/**
* DevExtreme (esm/__internal/scheduler/appointments/resizing/get_delta_time.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import { VERTICAL_VIEW_TYPES } from '../../constants';
const toMs = dateUtils.dateToMilliseconds;
const MIN_RESIZABLE_STEP = 2;
const getAllDayDeltaWidth = (args, initialSize, resizableStep) => {
  const intervalWidth = resizableStep || MIN_RESIZABLE_STEP;
  const initialWidth = initialSize.width;
  return Math.round((args.width - initialWidth) / intervalWidth);
};
const getHorizontalDeltaTime = (args, initialSize, _ref) => {
  let {
    cellSize,
    cellDurationInMinutes
  } = _ref;
  const deltaWidth = args.width - initialSize.width;
  const deltaTime = toMs('minute') * Math.round(deltaWidth * cellDurationInMinutes / cellSize.width);
  return deltaTime;
};
const getVerticalDeltaTime = (args, initialSize, _ref2) => {
  let {
    cellSize,
    cellDurationInMinutes
  } = _ref2;
  const deltaHeight = args.height - initialSize.height;
  const deltaTime = toMs('minute') * Math.round(deltaHeight * cellDurationInMinutes / cellSize.height);
  return deltaTime;
};
export const getDeltaTime = (args, initialSize, options) => {
  const {
    viewType,
    resizableStep,
    isAllDay
  } = options;
  switch (true) {
    case ['timelineMonth', 'month'].includes(viewType) || Boolean(isAllDay):
      return getAllDayDeltaWidth(args, initialSize, resizableStep) * toMs('day');
    case viewType === 'agenda':
      return 0;
    case VERTICAL_VIEW_TYPES.includes(viewType) && !isAllDay:
      return getVerticalDeltaTime(args, initialSize, options);
    default:
      return getHorizontalDeltaTime(args, initialSize, options);
  }
};
