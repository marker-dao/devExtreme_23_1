/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/split_by_parts/split_by_parts.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getNextIntervalStartDate } from './get_next_interval_start_date';
import { getPrevIntervalEndDate } from './get_prev_interval_end_date';
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
export const splitByParts = (entities, intervals) => {
  const prevIntervalEndDate = getPrevIntervalEndDate(intervals);
  const nextIntervalStartDate = getNextIntervalStartDate(intervals);
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
