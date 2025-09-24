import _extends from "@babel/runtime/helpers/esm/extends";
import { AppointmentAdapter } from '../../utils/appointment_adapter/appointment_adapter';
import { plainViewModel } from './plain_view_model';
export const adaptAgendaSettings = (viewModel, dataAccessor, timeZoneCalculator) => {
  const settings = plainViewModel(viewModel);
  return settings.map(item => {
    const {
      agendaSettings
    } = item;
    const adapter = new AppointmentAdapter(agendaSettings ?? item.itemData, dataAccessor);
    return {
      isAgendaModel: true,
      itemData: item.itemData,
      allDay: Boolean(item.allDay),
      groupIndex: item.groupIndex,
      sortedIndex: item.sortedIndex,
      direction: item.direction,
      height: item.height,
      width: item.width,
      info: {
        sourceAppointment: {
          allDay: item.allDay,
          startDate: adapter.startDate,
          endDate: adapter.endDate
        },
        appointment: _extends({
          allDay: item.allDay
        }, adapter.getCalculatedDates(timeZoneCalculator, 'toGrid'))
      }
    };
  });
};