/**
* DevExtreme (esm/__internal/scheduler/appointments/data_provider/m_appointment_filter_virtual.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from '../../../../core/utils/date';
import { dateUtilsTs } from '../../../core/utils/date';
import { isAppointmentTakesAllDay, isDateAndTimeView } from '../../r1/utils/index';
import { getResourcesByGroupIndex } from '../../utils/resource_manager/group_utils';
import { AppointmentFilterBaseStrategy } from './m_appointment_filter';
import { isAppointmentMatchedResources } from './utils/get_appointment_filter/is_appointment_matched_resources';
import { filterArray, getRawAppointments } from './utils/index';
// TODO Vinogradov refactoring: this module should be refactored :)
const toMs = dateUtils.dateToMilliseconds;
export class AppointmentFilterVirtualStrategy extends AppointmentFilterBaseStrategy {
  getBasePanelFilterOptions() {
    const viewOffset = this._resolveOption('viewOffset');
    const hourMs = toMs('hour');
    const isCalculateStartAndEndDayHour = isDateAndTimeView(this.viewType);
    const endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    const shiftedEndViewDate = dateUtilsTs.addOffsets(endViewDate, [viewOffset]);
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
      const resources = getResourcesByGroupIndex(resourceManager.groupsLeafs, resourceManager.resourceById, groupIndex);
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
        return isAppointmentMatchedResources(rawAppointment, resources);
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
    const filteredItems = filterArray(itemsToFilter, combinedFilters);
    return getRawAppointments(filteredItems);
  }
  hasAllDayAppointments(_, preparedItems) {
    return this.filterAllDayAppointments(preparedItems).length > 0;
  }
  filterAllDayAppointments(preparedItems) {
    const combinedFilter = this.createAllDayAppointmentFilter();
    const filteredItems = filterArray(preparedItems, combinedFilter);
    return getRawAppointments(filteredItems);
  }
  createAllDayAppointmentFilter() {
    return [[appointment => isAppointmentTakesAllDay(appointment, this.allDayPanelMode)]];
  }
}
AppointmentFilterVirtualStrategy.strategyName = 'virtual';
