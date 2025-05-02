import query from '../../../../common/data/query';
import dateUtils from '../../../../core/utils/date';
import { dateUtilsTs } from '../../../core/utils/date';
import { isDateAndTimeView, isTimelineView } from '../../../scheduler/r1/utils/index';
import { getResourcesDataByGroups } from '../../resources/m_utils';
import { AppointmentFilterBaseStrategy } from './m_appointment_filter';
// TODO Vinogradov refactoring: this module should be refactored :)
const toMs = dateUtils.dateToMilliseconds;
export class AppointmentFilterVirtualStrategy extends AppointmentFilterBaseStrategy {
  get resources() {
    return this.options.resources;
  }
  filter(preparedItems) {
    const {
      viewOffset
    } = this.options;
    const hourMs = toMs('hour');
    const isCalculateStartAndEndDayHour = isDateAndTimeView(this.viewType);
    const checkIntersectViewport = isCalculateStartAndEndDayHour && this.viewDirection === 'horizontal';
    const isAllDayWorkspace = !this.supportAllDayRow;
    const showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
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
      const resources = this._getPrerenderFilterResources(groupIndex);
      const hasAllDayPanel = this.viewDataProvider.hasGroupAllDayPanel(groupIndex);
      const supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && hasAllDayPanel;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour,
        endDayHour,
        viewOffset,
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour,
        min: dateUtilsTs.addOffsets(groupStartDate, [-viewOffset]),
        max: dateUtilsTs.addOffsets(groupEndDate, [-viewOffset]),
        supportMultiDayAppointments: isTimelineView(this.viewType),
        allDay: supportAllDayAppointment,
        resources,
        firstDayOfWeek: this.firstDayOfWeek,
        checkIntersectViewport
      });
    });
    return this.filterLoadedAppointments({
      filterOptions,
      groupCount: this.groupCount
    }, preparedItems);
  }
  filterPreparedItems(_ref, preparedItems) {
    let {
      filterOptions,
      groupCount
    } = _ref;
    const combinedFilters = [];
    let itemsToFilter = preparedItems;
    const needPreFilter = groupCount > 0;
    if (needPreFilter) {
      // @ts-expect-error
      itemsToFilter = itemsToFilter.filter(_ref2 => {
        let {
          rawAppointment
        } = _ref2;
        for (let i = 0; i < filterOptions.length; ++i) {
          const {
            resources
          } = filterOptions[i];
          if (this._filterAppointmentByResources(rawAppointment, resources)) {
            return true;
          }
        }
      });
    }
    filterOptions.forEach(option => {
      combinedFilters.length && combinedFilters.push('or');
      const filter = this._createCombinedFilter(option);
      combinedFilters.push(filter);
    });
    // @ts-expect-error
    return query(itemsToFilter)
    // @ts-expect-error
    .filter(combinedFilters).toArray();
  }
  hasAllDayAppointments(filteredItems, preparedItems) {
    return this.filterAllDayAppointments(preparedItems).length > 0;
  }
  _getPrerenderFilterResources(groupIndex) {
    const cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return getResourcesDataByGroups(this.loadedResources, this.resources, [cellGroup]);
  }
}
AppointmentFilterVirtualStrategy.strategyName = 'virtual';