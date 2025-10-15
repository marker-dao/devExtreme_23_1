"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAgendaViewModel = void 0;
var _get_compare_options = require("../common/get_compare_options");
var _split_interval_by_days = require("../common/split_interval_by_days");
var _add_last_in_group = require("./steps/add_last_in_group");
var _add_sorted_index = require("./steps/add_sorted_index");
var _sorting = require("./steps/sorting");
var _split_by_parts = require("./steps/split_by_parts/split_by_parts");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const generateAgendaViewModel = (schedulerStore, items) => {
  const height = schedulerStore.fire('getAgendaVerticalStepHeight');
  const compareOptions = (0, _get_compare_options.getCompareOptions)(schedulerStore);
  const intervals = (0, _split_interval_by_days.splitIntervalByDay)(_extends({}, compareOptions, {
    startDayHour: 0,
    endDayHour: 24
  }));
  let entities = (0, _split_by_parts.splitByParts)(items, intervals);
  entities = saveDatesAfterSplit(entities);
  entities = addAgendaGeometry(entities, height);
  entities = (0, _sorting.sortByStartDate)(entities);
  entities = (0, _sorting.sortByGroupIndex)(entities);
  entities = (0, _add_last_in_group.addLastInGroup)(entities);
  return (0, _add_sorted_index.addSortedIndex)(entities);
};
exports.generateAgendaViewModel = generateAgendaViewModel;