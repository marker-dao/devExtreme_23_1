import { describe, expect, it } from '@jest/globals';
import { countVisibleAppointments } from './count_visible_appointments';
const createAppointment = date => ({
  startDate: new Date(date),
  endDate: new Date(date + 1)
});
describe('countVisibleAppointments', () => {
  it('should return correct number of agenda appointments', () => {
    expect(countVisibleAppointments([{
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
  it('should return correct number of appointments with collectors', () => {
    expect(countVisibleAppointments([{
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
  it('should return correct number of appointments with parts', () => {
    expect(countVisibleAppointments([{
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
  it('should return correct number of appointments with parts and collectors', () => {
    expect(countVisibleAppointments([{
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