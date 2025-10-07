/**
* DevExtreme (cjs/__internal/scheduler/appointments/utils/count_visible_appointments.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _count_visible_appointments = require("./count_visible_appointments");
const createAppointment = date => ({
  startDate: new Date(date),
  endDate: new Date(date + 1)
});
(0, _globals.describe)('countVisibleAppointments', () => {
  (0, _globals.it)('should return correct number of agenda appointments', () => {
    (0, _globals.expect)((0, _count_visible_appointments.countVisibleAppointments)([{
      itemData: 1,
      isAgendaModel: true
    }, {
      itemData: 2,
      isAgendaModel: true
    }, {
      itemData: 3,
      isAgendaModel: true
    }])).toBe(3);
  });
  (0, _globals.it)('should return correct number of appointments with collectors', () => {
    (0, _globals.expect)((0, _count_visible_appointments.countVisibleAppointments)([{
      itemData: 1,
      info: {
        appointment: createAppointment(1)
      }
    }, {
      itemData: 2,
      items: [{
        itemData: 3,
        info: {
          appointment: createAppointment(2)
        }
      }, {
        itemData: 4,
        info: {
          appointment: createAppointment(3)
        }
      }]
    }])).toBe(3);
  });
  (0, _globals.it)('should return correct number of appointments with parts', () => {
    (0, _globals.expect)((0, _count_visible_appointments.countVisibleAppointments)([{
      itemData: 1,
      info: {
        appointment: createAppointment(1)
      },
      partIndex: 0,
      partTotalCount: 2
    }, {
      itemData: 1,
      info: {
        appointment: createAppointment(1)
      },
      partIndex: 1,
      partTotalCount: 2
    }, {
      itemData: 2,
      info: {
        appointment: createAppointment(1)
      }
    }, {
      itemData: 3,
      info: {
        appointment: createAppointment(2)
      }
    }])).toBe(3);
  });
  (0, _globals.it)('should return correct number of appointments with parts and collectors', () => {
    (0, _globals.expect)((0, _count_visible_appointments.countVisibleAppointments)([{
      itemData: 3,
      items: [{
        itemData: 3,
        info: {
          appointment: createAppointment(2)
        },
        partIndex: 0,
        partTotalCount: 2
      }]
    }, {
      itemData: 1,
      info: {
        appointment: createAppointment(1)
      },
      partIndex: 0,
      partTotalCount: 3
    }, {
      itemData: 1,
      info: {
        appointment: createAppointment(1)
      },
      partIndex: 1,
      partTotalCount: 3
    }, {
      itemData: 2,
      info: {
        appointment: createAppointment(1)
      }
    }, {
      itemData: 3,
      info: {
        appointment: createAppointment(2)
      },
      partIndex: 1,
      partTotalCount: 2
    }, {
      itemData: 2,
      items: [{
        itemData: 4,
        info: {
          appointment: createAppointment(1)
        }
      }, {
        itemData: 5,
        info: {
          appointment: createAppointment(2)
        }
      }, {
        itemData: 1,
        info: {
          appointment: createAppointment(1)
        },
        partIndex: 2,
        partTotalCount: 3
      }, {
        itemData: 6,
        info: {
          appointment: createAppointment(3)
        }
      }]
    }])).toBe(6);
  });
});
