/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/appointments/appointments.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { AppointmentViewModelGenerator } from '../../../../../__internal/scheduler/appointments/m_view_model_generator';
export var getAppointmentsViewModel = (model, filteredItems) => {
  var appointmentViewModel = new AppointmentViewModelGenerator();
  return appointmentViewModel.generate(filteredItems, _extends({}, model, {
    isRenovatedAppointments: true
  }));
};
