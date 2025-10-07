/**
* DevExtreme (cjs/__internal/scheduler/appointments/resizing/get_delta_time.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeltaTime = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _constants = require("../../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const toMs = _date.default.dateToMilliseconds;
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
const getDeltaTime = (args, initialSize, options) => {
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
    case _constants.VERTICAL_VIEW_TYPES.includes(viewType) && !isAllDay:
      return getVerticalDeltaTime(args, initialSize, options);
    default:
      return getHorizontalDeltaTime(args, initialSize, options);
  }
};
exports.getDeltaTime = getDeltaTime;
