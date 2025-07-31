"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentFilterVirtualStrategy = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _date2 = require("../../../core/utils/date");
var _index = require("../../r1/utils/index");
var _group_utils = require("../../utils/resource_manager/group_utils");
var _m_appointment_filter = require("./m_appointment_filter");
var _is_appointment_matched_resources = require("./utils/get_appointment_filter/is_appointment_matched_resources");
var _index2 = require("./utils/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// TODO Vinogradov refactoring: this module should be refactored :)
const toMs = _date.default.dateToMilliseconds;
class AppointmentFilterVirtualStrategy extends _m_appointment_filter.AppointmentFilterBaseStrategy {
  getBasePanelFilterOptions() {
    const viewOffset = this._resolveOption('viewOffset');
    const hourMs = toMs('hour');
    const isCalculateStartAndEndDayHour = (0, _index.isDateAndTimeView)(this.viewType);
    const endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    const shiftedEndViewDate = _date2.dateUtilsTs.addOffsets(endViewDate, [viewOffset]);
    const filterOptions = [];
    const groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(item => {
      const {
        groupIndex
      } = item;
      const groupStartDate = item.startDate;
      const groupEndDate = new Date(Math.min(item.endDate.getTime(), shiftedEndViewDate.getTime()));
      const startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : this.viewStartDayHour;
      const endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate.getTime() - groupStartDate.getTime()) / hourMs : this.viewEndDayHour;
      const resourceManager = this.options.getResourceManager();
      const resources = (0, _group_utils.getResourcesByGroupIndex)(resourceManager.groupsLeafs, resourceManager.resourceById, groupIndex);
      const compareOptions = {
        startDayHour,
        endDayHour,
        min: groupStartDate,
        max: groupEndDate
      };
      filterOptions.push(_extends({}, compareOptions, this.getIntervals(compareOptions), {
        resources,
        firstDayOfWeek: this.firstDayOfWeek,
        allDayPanelFilter: false,
        allDayPanelMode: this.allDayPanelMode,
        supportAllDayRow: this.supportAllDayRow,
        viewOffset: this._resolveOption('viewOffset')
      }));
    });
    return filterOptions;
  }
  filterByResources(preparedItems, filterOptions) {
    if (!this.groupCount) {
      return preparedItems;
    }
    return preparedItems.filter(_ref => {
      let {
        rawAppointment
      } = _ref;
      return filterOptions.some(_ref2 => {
        let {
          resources
        } = _ref2;
        return (0, _is_appointment_matched_resources.isAppointmentMatchedResources)(rawAppointment, resources);
      });
    });
  }
  getCombinedFilterOptions(basePanelFilterOptions) {
    const combinedFilters = [];
    basePanelFilterOptions.forEach(option => {
      if (combinedFilters.length) {
        combinedFilters.push('or');
      }
      const filter = this.createCombinedFilter(option);
      combinedFilters.push(filter);
    });
    const filterOptions = this.getFilterOptions();
    if (filterOptions.allDayPanelFilter === undefined) {
      combinedFilters.push('or');
      combinedFilters.push(this.createCombinedFilter(_extends({}, filterOptions, {
        allDayPanelFilter: true
      })));
    }
    return combinedFilters;
  }
  filter(preparedItems) {
    const basePanelFilterOptions = this.getBasePanelFilterOptions();
    const itemsToFilter = this.filterByResources(preparedItems, basePanelFilterOptions);
    const combinedFilters = this.getCombinedFilterOptions(basePanelFilterOptions);
    const filteredItems = (0, _index2.filterArray)(itemsToFilter, combinedFilters);
    return (0, _index2.getRawAppointments)(filteredItems);
  }
  hasAllDayAppointments(_, preparedItems) {
    return this.filterAllDayAppointments(preparedItems).length > 0;
  }
  filterAllDayAppointments(preparedItems) {
    const combinedFilter = this.createAllDayAppointmentFilter();
    const filteredItems = (0, _index2.filterArray)(preparedItems, combinedFilter);
    return (0, _index2.getRawAppointments)(filteredItems);
  }
  createAllDayAppointmentFilter() {
    return [[appointment => (0, _index.isAppointmentTakesAllDay)(appointment, this.allDayPanelMode)]];
  }
}
exports.AppointmentFilterVirtualStrategy = AppointmentFilterVirtualStrategy;
AppointmentFilterVirtualStrategy.strategyName = 'virtual';