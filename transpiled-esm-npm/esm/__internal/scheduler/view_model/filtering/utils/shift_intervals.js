import { dateUtilsTs } from '../../../../core/utils/date';
export const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => ({
  min: dateUtilsTs.addOffsets(interval.min, viewOffset),
  max: dateUtilsTs.addOffsets(interval.max, viewOffset)
}));