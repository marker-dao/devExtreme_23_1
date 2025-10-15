import timeZoneUtils from '../../../m_utils_time_zone';
import { isAppointmentMatchedIntervals } from '../../common/is_appointment_matched_intervals';
export const filterByVirtualScreen = (entities, viewDataProvider, isVirtualScrolling) => {
  if (!isVirtualScrolling) {
    return entities;
  }
  const groupsInfo = viewDataProvider.getCompletedGroupsInfo();
  const groupIntervalsMap = new Map();
  groupsInfo.forEach(group => {
    groupIntervalsMap.set(group.groupIndex, {
      min: timeZoneUtils.createUTCDateWithLocalOffset(group.startDate).getTime(),
      max: timeZoneUtils.createUTCDateWithLocalOffset(group.endDate).getTime()
    });
  });
  return entities.filter(appointment => {
    const groupInterval = groupIntervalsMap.get(appointment.groupIndex);
    if (!groupInterval) {
      return false;
    }
    if (appointment.isAllDayPanelOccupied) {
      return true;
    }
    return isAppointmentMatchedIntervals({
      startDate: appointment.startDateUTC,
      endDate: appointment.endDateUTC
    }, [groupInterval]);
  });
};