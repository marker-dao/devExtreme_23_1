/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/appointments/appointments.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { AppointmentViewModelGenerator } from '../../../../../ui/scheduler/appointments/viewModelGenerator';
export var getAppointmentsViewModel = (model, filteredItems) => {
  var appointmentViewModel = new AppointmentViewModelGenerator();
  return appointmentViewModel.generate(filteredItems, _extends({}, model, {
    isRenovatedAppointments: true
  }));
};
