"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitByParts = void 0;
var _get_next_interval_start_date = require("./get_next_interval_start_date");
var _get_prev_interval_end_date = require("./get_prev_interval_end_date");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getSingleReduced = (isStartOnPrevInterval, isEndOnNextInterval) => {
  switch (true) {
    case isStartOnPrevInterval && isEndOnNextInterval:
      return 'body';
    case isStartOnPrevInterval:
      return 'tail';
    case isEndOnNextInterval:
      return 'head';
    default:
      return undefined;
  }
};
const getReduced = (isFirstItem, isLastItem, isStartOnPrevInterval, isEndOnNextInterval) => {
  switch (true) {
    case isFirstItem && !isStartOnPrevInterval:
      return 'head';
    case isLastItem && !isEndOnNextInterval:
      return 'tail';
    default:
      return 'body';
  }
};
const cropEntityByInterval = (entity, interval) => {
  const startDate = entity.startDateUTC < interval.min ? interval.min : entity.startDateUTC;
  const endDate = entity.endDateUTC > interval.max ? interval.max : entity.endDateUTC;
  return _extends({}, entity, {
    startDateUTC: startDate,
    endDateUTC: endDate,
    duration: endDate - startDate
  });
};
const getEndIndex = (intervals, endDateMs) => {
  const lastIdx = intervals.length - 1;
  for (let idx = 0; idx < lastIdx; idx += 1) {
    const nextInterval = intervals[idx + 1];
    if (nextInterval.min >= endDateMs) {
      return idx;
    }
  }
  return lastIdx;
};
const splitByParts = (entities, intervals) => {
  const prevIntervalEndDate = (0, _get_prev_interval_end_date.getPrevIntervalEndDate)(intervals);
  const nextIntervalStartDate = (0, _get_next_interval_start_date.getNextIntervalStartDate)(intervals);
  return entities.reduce((result, entity) => {
    const startIndex = intervals.findIndex(_ref => {
      let {
        max
      } = _ref;
      return entity.startDateUTC < max;
    });
    if (startIndex === -1) {
      return result;
    }
    const endIndex = getEndIndex(intervals, entity.endDateUTC);
    const partCount = endIndex - startIndex + 1;
    const isStartOnPrevView = entity.startDateUTC < prevIntervalEndDate;
    const isEndOnNextView = entity.endDateUTC > nextIntervalStartDate;
    if (partCount <= 1) {
      result.push(_extends({}, cropEntityByInterval(entity, intervals[startIndex]), {
        partIndex: 0,
        partCount: 0,
        reduced: getSingleReduced(isStartOnPrevView, isEndOnNextView)
      }));
    } else {
      const parts = Array.from({
        length: partCount
      }).map((_, partIndex) => {
        const isFirstIdx = partIndex === 0;
        const isLastIdx = partIndex === partCount - 1;
        return _extends({}, cropEntityByInterval(entity, intervals[startIndex + partIndex]), {
          partIndex,
          partCount,
          reduced: getReduced(isFirstIdx, isLastIdx, isStartOnPrevView, isEndOnNextView)
        });
      });
      result.push(...parts);
    }
    return result;
  }, []);
};
exports.splitByParts = splitByParts;