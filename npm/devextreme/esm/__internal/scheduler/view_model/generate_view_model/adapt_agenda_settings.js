/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/adapt_agenda_settings.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
