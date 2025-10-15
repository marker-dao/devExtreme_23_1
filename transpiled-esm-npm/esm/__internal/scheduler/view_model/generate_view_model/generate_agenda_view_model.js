import _extends from "@babel/runtime/helpers/esm/extends";
import { getCompareOptions } from '../common/get_compare_options';
import { splitIntervalByDay } from '../common/split_interval_by_days';
import { addLastInGroup } from './steps/add_last_in_group';
import { addSortedIndex } from './steps/add_sorted_index';
import { sortByGroupIndex, sortByStartDate } from './steps/sorting';
import { splitByParts } from './steps/split_by_parts/split_by_parts';
const saveDatesAfterSplit = entities => entities.map(entity => _extends({}, entity, {
  datesAfterSplit: {
    startDateUTC: entity.startDateUTC,
    endDateUTC: entity.endDateUTC
  }
}));
const addAgendaGeometry = (entities, height) => entities.map(entity => _extends({}, entity, {
  height,
  width: '100%'
}));
export const generateAgendaViewModel = (schedulerStore, items) => {
  const height = schedulerStore.fire('getAgendaVerticalStepHeight');
  const compareOptions = getCompareOptions(schedulerStore);
  const intervals = splitIntervalByDay(_extends({}, compareOptions, {
    startDayHour: 0,
    endDayHour: 24
  }));
  let entities = splitByParts(items, intervals);
  entities = saveDatesAfterSplit(entities);
  entities = addAgendaGeometry(entities, height);
  entities = sortByStartDate(entities);
  entities = sortByGroupIndex(entities);
  entities = addLastInGroup(entities);
  return addSortedIndex(entities);
};