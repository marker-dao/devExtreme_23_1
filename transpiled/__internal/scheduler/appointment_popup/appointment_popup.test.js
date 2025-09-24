"use strict";

var _globals = require("@jest/globals");
var _fx = _interopRequireDefault(require("../../../common/core/animation/fx"));
var _create_scheduler = require("../__tests__/__mock__/create_scheduler");
var _m_mock_scheduler = require("../__tests__/__mock__/m_mock_scheduler");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultData = [{
  text: 'recurrent-app',
  startDate: new Date(2017, 4, 1, 9, 30),
  endDate: new Date(2017, 4, 1, 11),
  recurrenceRule: 'FREQ=DAILY;COUNT=5'
}, {
  text: 'common-app',
  startDate: new Date(2017, 4, 9, 9, 30),
  endDate: new Date(2017, 4, 9, 11)
}];
const defaultOption = {
  dataSource: defaultData,
  views: ['month'],
  currentView: 'month',
  currentDate: new Date(2017, 4, 25),
  firstDayOfWeek: 1,
  startDayHour: 9,
  height: 600,
  width: 600
};
(0, _globals.describe)('Appointment popup form', () => {
  (0, _globals.beforeEach)(() => {
    _fx.default.off = true;
    (0, _m_mock_scheduler.setupSchedulerTestEnvironment)();
  });
  (0, _globals.afterEach)(() => {
    _fx.default.off = false;
    document.body.innerHTML = '';
    _globals.jest.useRealTimers();
  });
  (0, _globals.it)('Original appointment\'s fields shouldn\'t fill if used fieldExpr', async () => {
    var _newAppointment, _newAppointment2;
    const data = [];
    const textExpValue = 'Subject';
    let newAppointment = null;
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      dataSource: data,
      views: ['week'],
      currentView: 'week',
      currentDate: new Date(2021, 4, 27),
      textExpr: textExpValue,
      onAppointmentAdded: _ref => {
        let {
          appointmentData
        } = _ref;
        newAppointment = appointmentData;
      },
      height: 600
    });
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Subject', 'qwerty');
    POM.popup.getDoneButton().click();
    (0, _globals.expect)((_newAppointment = newAppointment) === null || _newAppointment === void 0 ? void 0 : _newAppointment[textExpValue]).toBe('qwerty');
    (0, _globals.expect)((_newAppointment2 = newAppointment) === null || _newAppointment2 === void 0 ? void 0 : _newAppointment2.text).toBeUndefined();
    (0, _globals.expect)(data[0].Subject).toBe('qwerty');
    (0, _globals.expect)(data[0].text).toBeUndefined();
  });
  (0, _globals.it)('Recurrence form should work properly if recurrenceRule property mapped recurrenceRuleExpr', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      dataSource: [{
        text: 'Watercolor Landscape',
        startDate: new Date(2017, 4, 1, 9, 30),
        endDate: new Date(2017, 4, 1, 11),
        customRecurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10'
      }],
      views: ['month'],
      currentView: 'month',
      currentDate: new Date(2017, 4, 25),
      recurrenceRuleExpr: 'customRecurrenceRule',
      height: 600
    });
    POM.openPopupByDblClick();
    POM.popup.getEditSeriesButton().click();
    const {
      value: repeatInputRecurrence
    } = POM.popup.getSwitchByName('repeat');
    scheduler.hideAppointmentPopup();
    scheduler.showAppointmentPopup();
    const {
      value: repeatInput
    } = POM.popup.getSwitchByName('repeat');
    (0, _globals.expect)(repeatInputRecurrence).toBe('true');
    (0, _globals.expect)(repeatInput).toBe('false');
  });
  (0, _globals.it)('showAppointmentPopup method should be work properly with no argument: baseOptions', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      currentDate: new Date(2017, 4, 1),
      views: ['month'],
      currentView: 'month'
    });
    scheduler.option('dataSource', []);
    await new Promise(process.nextTick);
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Subject', 'app');
    POM.popup.setInputValueByLabel('Start Date', '05/01/2017, 01:30 PM');
    POM.popup.setInputValueByLabel('End Date', '05/01/2017, 03:00 PM');
    POM.popup.getDoneButton().click();
    const app = POM.getAppointment('app');
    (0, _globals.expect)(app.getText()).toBe('app');
    (0, _globals.expect)(app.getDisplayDate()).toBe('1:30 PM - 3:00 PM');
  });
  (0, _globals.it)('showAppointmentPopup method should be work properly with no argument: cancelButton', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)(undefined);
    scheduler.option('dataSource', []);
    await new Promise(process.nextTick);
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Subject', 'app');
    POM.popup.setInputValueByLabel('Start Date', '05/01/2017, 01:30 PM');
    POM.popup.setInputValueByLabel('End Date', '05/01/2017, 03:00 PM');
    POM.popup.getCancelButton().click();
    const appointments = POM.getAppointments();
    (0, _globals.expect)(appointments.length).toBe(0);
  });
  (0, _globals.it)('showAppointmentPopup method should be work properly with no argument: all day appointments', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['month'],
      currentView: 'month'
    });
    scheduler.option('dataSource', []);
    await new Promise(process.nextTick);
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Subject', 'app');
    POM.popup.setInputValueByLabel('Start Date', '05/01/2017, 01:30 PM');
    POM.popup.setInputValueByLabel('End Date', '05/01/2017, 03:00 PM');
    POM.popup.getSwitchByName('repeat').click();
    await new Promise(process.nextTick);
    POM.popup.getDoneButton().click();
    const appointments = POM.getAppointments();
    (0, _globals.expect)(appointments.length).toBe(2);
  });
  _globals.it.todo('Appointment popup form should have two named groups');
  (0, _globals.it)('Appointment popup should be with correct dates after chage allDay switch and w/o saving (T832711)', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)(undefined);
    const data = {
      text: 'all day apo',
      startDate: new Date(2017, 4, 1, 9, 30),
      endDate: new Date(2017, 4, 1, 11),
      allDay: true
    };
    scheduler.showAppointmentPopup(data);
    POM.popup.getSwitchByName('allDay').click();
    POM.popup.getCancelButton().click();
    scheduler.showAppointmentPopup(data);
    const {
      value: startDateValue
    } = POM.popup.getInputByLabel('Start Date');
    const {
      value: endDateValue
    } = POM.popup.getInputByLabel('End Date');
    (0, _globals.expect)(startDateValue).toBe('5/1/2017');
    (0, _globals.expect)(endDateValue).toBe('5/1/2017');
  });
  (0, _globals.it)('onAppointmentFormOpening event should pass e.popup argument', async () => {
    var _POM$popup$getTitle;
    const data = [{
      text: 'Website Re-Design Plan',
      startDate: new Date(2017, 4, 22, 9, 30),
      endDate: new Date(2017, 4, 22, 11, 30)
    }];
    const onAppointmentFormOpening = _globals.jest.fn(e => {
      e.popup.option('showTitle', true);
      e.popup.option('title', 'Information');
    });
    const {
      POM
    } = await (0, _create_scheduler.createScheduler)({
      dataSource: data,
      onAppointmentFormOpening,
      currentDate: new Date(2017, 4, 22)
    });
    POM.openPopupByDblClick('Website Re-Design Plan');
    (0, _globals.expect)((_POM$popup$getTitle = POM.popup.getTitle()) === null || _POM$popup$getTitle === void 0 ? void 0 : _POM$popup$getTitle.textContent).toBe('Information');
  });
  (0, _globals.it)('onAppointmentFormOpening event should handle e.cancel value: default settings', async () => {
    const data = [{
      text: 'Website Re-Design Plan',
      startDate: new Date(2017, 4, 22, 9, 30),
      endDate: new Date(2017, 4, 22, 11, 30)
    }];
    const {
      POM,
      scheduler
    } = await (0, _create_scheduler.createScheduler)({
      dataSource: data,
      currentDate: new Date(2017, 4, 22)
    });
    POM.openPopupByDblClick('Website Re-Design Plan');
    const popup = POM.getPopups();
    (0, _globals.expect)(popup.length).toBe(1);
    POM.popup.getCancelButton().click();
    scheduler.showAppointmentPopup(data[0]);
    (0, _globals.expect)(POM.getPopups().length).toBe(1);
  });
  (0, _globals.it)('onAppointmentFormOpening event should handle e.cancel value: true', async () => {
    const data = [{
      text: 'Website Re-Design Plan',
      startDate: new Date(2017, 4, 22, 9, 30),
      endDate: new Date(2017, 4, 22, 11, 30)
    }];
    const onAppointmentFormOpening = _globals.jest.fn(e => {
      e.cancel = true;
    });
    const {
      POM,
      scheduler
    } = await (0, _create_scheduler.createScheduler)({
      dataSource: data,
      onAppointmentFormOpening,
      currentDate: new Date(2017, 4, 22)
    });
    POM.openPopupByDblClick('Website Re-Design Plan');
    (0, _globals.expect)(POM.getPopups().length).toBe(0);
    scheduler.showAppointmentPopup(data[0]);
    (0, _globals.expect)(POM.getPopups().length).toBe(0);
  });
  (0, _globals.it)('onAppointmentFormOpening event should handle e.cancel value: false', async () => {
    const data = [{
      text: 'Website Re-Design Plan',
      startDate: new Date(2017, 4, 22, 9, 30),
      endDate: new Date(2017, 4, 22, 11, 30)
    }];
    const onAppointmentFormOpening = _globals.jest.fn(e => {
      e.cancel = false;
    });
    const {
      POM,
      scheduler
    } = await (0, _create_scheduler.createScheduler)({
      dataSource: data,
      onAppointmentFormOpening,
      currentDate: new Date(2017, 4, 22)
    });
    POM.openPopupByDblClick('Website Re-Design Plan');
    (0, _globals.expect)(POM.getPopups().length).toBe(1);
    POM.popup.getCancelButton().click();
    scheduler.showAppointmentPopup(data[0]);
    (0, _globals.expect)(POM.getPopups().length).toBe(1);
  });
  (0, _globals.it)('Appointment popup shouldn\'t render recurrence editor, if previous was with recurrence', async () => {
    (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
      height: 200
    });
    const {
      POM
    } = await (0, _create_scheduler.createScheduler)({
      dataSource: [{
        text: 'recurrent-app',
        startDate: new Date(2017, 4, 1, 9, 30),
        endDate: new Date(2017, 4, 1, 11),
        recurrenceRule: 'FREQ=DAILY;COUNT=5'
      }, {
        text: 'common-app',
        startDate: new Date(2017, 4, 9, 9, 30),
        endDate: new Date(2017, 4, 9, 11)
      }],
      views: ['month'],
      currentView: 'month',
      currentDate: new Date(2017, 4, 25),
      firstDayOfWeek: 1,
      startDayHour: 9
    });
    POM.openPopupByDblClick('recurrent-app');
    POM.popup.getEditSeriesButton().click();
    (0, _globals.expect)(POM.popup.getSwitchByName('repeat').value).toBe('true');
    (0, _globals.expect)(POM.popup.getInputByLabel('Subject').value).toBe('recurrent-app');
    _globals.jest.useFakeTimers();
    POM.popup.getCancelButton().click();
    _globals.jest.runAllTimers();
    POM.openPopupByDblClick('common-app');
    (0, _globals.expect)(POM.popup.getSwitchByName('repeat').value).toBe('false');
    (0, _globals.expect)(POM.popup.getInputByLabel('Subject').value).toBe('common-app');
  });
  (0, _globals.it)('Appointment popup should work properly', async () => {
    var _POM$getTooltipAppoin, _POM$getTooltipAppoin2;
    const NEW_EXPECTED_SUBJECT = 'NEW SUBJECT';
    (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
      height: 200
    });
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)(defaultOption);
    (0, _globals.expect)(POM.getPopups().length).toBe(0);
    _globals.jest.useFakeTimers();
    const appointment = POM.getAppointment('common-app');
    if (appointment !== null && appointment !== void 0 && appointment.element) {
      appointment.element.click();
    } else {
      throw new Error('Appointment "common-app" not found or has no element');
    }
    _globals.jest.runAllTimers();
    (_POM$getTooltipAppoin = POM.getTooltipAppointment()) === null || _POM$getTooltipAppoin === void 0 || _POM$getTooltipAppoin.click();
    POM.popup.setInputValueByLabel('Subject', NEW_EXPECTED_SUBJECT);
    (0, _globals.expect)(POM.popup.getInputByLabel('Subject').value).toBe(NEW_EXPECTED_SUBJECT);
    (0, _globals.expect)(POM.getPopups().length).toBe(1);
    POM.popup.getDoneButton().click();
    const dataSource = scheduler.option('dataSource');
    const dataItem = dataSource ? dataSource[1] : null;
    (0, _globals.expect)(Object.keys(dataItem).length).toBe(3);
    (0, _globals.expect)(dataItem.text).toBe(NEW_EXPECTED_SUBJECT);
    const appointmentR = POM.getAppointment('recurrent-app');
    if (appointmentR !== null && appointmentR !== void 0 && appointmentR.element) {
      appointmentR.element.click();
    } else {
      throw new Error('Appointment "recurrent-app" not found or has no element');
    }
    _globals.jest.runAllTimers();
    (_POM$getTooltipAppoin2 = POM.getTooltipAppointment()) === null || _POM$getTooltipAppoin2 === void 0 || _POM$getTooltipAppoin2.click();
    POM.popup.getEditSeriesButton().click();
    (0, _globals.expect)(POM.popup.getSwitchByName('repeat').value).toBe('true');
    (0, _globals.expect)(POM.popup.getInputByLabel('Subject').value).toBe('recurrent-app');
  });
  (0, _globals.it)('Recurrence repeat-end editor should have default \'never\' value after reopening appointment popup', async () => {
    const firstAppointment = {
      startDate: new Date(2015, 1, 9),
      endDate: new Date(2015, 1, 9, 1),
      text: 'caption 1'
    };
    const secondAppointment = {
      startDate: new Date(2015, 1, 9),
      endDate: new Date(2015, 1, 9, 1),
      text: 'caption 2'
    };
    const {
      POM,
      scheduler
    } = await (0, _create_scheduler.createScheduler)(defaultOption);
    scheduler.showAppointmentPopup(firstAppointment);
    POM.popup.getSwitchByName('repeat').click();
    POM.popup.selectRadio('After');
    POM.popup.getDoneButton().click();
    scheduler.showAppointmentPopup(secondAppointment);
    POM.popup.getSwitchByName('repeat').click();
    const radioValue = POM.popup.getSelectedRadioValue();
    (0, _globals.expect)(radioValue).toBe('Never');
  });
  (0, _globals.it)('Update appointment if CustomStore', async () => {
    const data = [{
      startDate: new Date(2015, 4, 24, 9),
      endDate: new Date(2015, 4, 24, 11)
    }];
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: {
        key: 'id',
        load: () => data,
        update: (key, values) => Promise.resolve().then(() => {
          const appointmentData = data.filter(item => item.id === key)[0];
          Object.assign(appointmentData, values);
          scheduler.repaint();
        })
      },
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18
    });
    scheduler.showAppointmentPopup({
      startDate: new Date(2015, 4, 24, 9),
      endDate: new Date(2015, 4, 24, 11),
      text: 'Subject'
    });
    POM.popup.setInputValueByLabel('Subject', 'New Subject');
    POM.popup.getDoneButton().click();
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeTruthy();
    await new Promise(process.nextTick);
    const loadPanelAfter = POM.getLoadPanel();
    (0, _globals.expect)(loadPanelAfter).toBeFalsy();
  });
  (0, _globals.it)('Insert appointment if CustomStore', async () => {
    const fn = _globals.jest.fn();
    const data = [];
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: {
        key: 'id',
        load: () => data,
        insert: appointmentData => Promise.resolve().then(() => {
          appointmentData.id = data.length;
          data.push(appointmentData);
          fn();
        })
      },
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18
    });
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Subject', 'New Subject');
    POM.popup.setInputValueByLabel('Start Date', '05/24/2015, 9:00 AM');
    POM.popup.setInputValueByLabel('End Date', '05/24/2015, 11:00 AM');
    POM.popup.getDoneButton().click();
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeTruthy();
    await new Promise(process.nextTick);
    const loadPanelAfter = POM.getLoadPanel();
    (0, _globals.expect)(loadPanelAfter).toBeFalsy();
    (0, _globals.expect)(fn).toBeCalled();
  });
  (0, _globals.it)('onAppointmentUpdating and e.cancel=true (T907281)', async () => {
    const data = [{
      startDate: new Date(2015, 4, 24, 9),
      endDate: new Date(2015, 4, 24, 11),
      text: 'Subject'
    }];
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: data,
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18,
      onAppointmentUpdating: e => {
        e.cancel = true;
      }
    });
    scheduler.showAppointmentPopup(data[0]);
    POM.popup.setInputValueByLabel('Subject', 'New Subject');
    POM.popup.getDoneButton().click();
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeFalsy();
    await new Promise(process.nextTick);
    const appointment = POM.getAppointment('Subject');
    (0, _globals.expect)(appointment.getText()).toEqual('Subject');
  });
  (0, _globals.it)('onAppointmentUpdating and e.cancel=false (T907281)', async () => {
    const data = [{
      startDate: new Date(2015, 4, 24, 9),
      endDate: new Date(2015, 4, 24, 11),
      text: 'Subject'
    }];
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: data,
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18,
      onAppointmentUpdating: e => {
        e.cancel = false;
      }
    });
    scheduler.showAppointmentPopup(data[0]);
    POM.popup.setInputValueByLabel('Subject', 'New Subject');
    POM.popup.getDoneButton().click();
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeFalsy();
    await new Promise(process.nextTick);
    const appointment = POM.getAppointment('New Subject');
    (0, _globals.expect)(appointment.getText()).toEqual('New Subject');
  });
  (0, _globals.it)('onAppointmentAdding and e.cancel=true', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: [],
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18,
      onAppointmentAdding: e => {
        e.cancel = true;
      }
    });
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Start Date', '05/24/2015, 9:00 AM');
    POM.popup.setInputValueByLabel('End Date', '05/24/2015, 11:00 AM');
    POM.popup.setInputValueByLabel('Subject', 'New Subject');
    POM.popup.getDoneButton().click();
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeFalsy();
    await new Promise(process.nextTick);
    const appointments = POM.getAppointments();
    (0, _globals.expect)(appointments.length).toBe(0);
  });
  (0, _globals.it)('onAppointmentAdding and e.cancel=false', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: [],
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18,
      onAppointmentAdding: e => {
        e.cancel = false;
      }
    });
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Start Date', '05/24/2015, 9:00 AM');
    POM.popup.setInputValueByLabel('End Date', '05/24/2015, 11:00 AM');
    POM.popup.setInputValueByLabel('Subject', 'New Subject');
    POM.popup.getDoneButton().click();
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeFalsy();
    await new Promise(process.nextTick);
    const appointment = POM.getAppointment();
    (0, _globals.expect)(appointment.getText()).toEqual('New Subject');
  });
  (0, _globals.it)('onAppointmentDeleting and e.cancel=true', async () => {
    const data = [{
      text: 'Some Text',
      startDate: new Date(2015, 4, 24, 9),
      endDate: new Date(2015, 4, 24, 11)
    }];
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: data,
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18,
      onAppointmentDeleting: e => {
        e.cancel = true;
      }
    });
    scheduler.deleteAppointment(data[0]);
    await new Promise(process.nextTick);
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeFalsy();
    const appointment = POM.getAppointment();
    (0, _globals.expect)(appointment.getText()).toEqual('Some Text');
  });
  (0, _globals.it)('onAppointmentDeleting and e.cancel=false', async () => {
    const data = [{
      text: 'Some Text',
      startDate: new Date(2015, 4, 24, 9),
      endDate: new Date(2015, 4, 24, 11)
    }];
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)({
      views: ['day'],
      dataSource: data,
      currentDate: new Date(2015, 4, 24),
      startDayHour: 8,
      endDayHour: 18,
      onAppointmentDeleting: e => {
        e.cancel = false;
      }
    });
    scheduler.deleteAppointment(data[0]);
    await new Promise(process.nextTick);
    const loadPanel = POM.getLoadPanel();
    (0, _globals.expect)(loadPanel).toBeFalsy();
    const appointment = POM.getAppointment();
    (0, _globals.expect)(appointment.getText()).toEqual('');
  });
  (0, _globals.describe)('toolbar', () => {
    const data = [{
      text: 'Website Re-Design Plan',
      startDate: new Date(2017, 4, 22, 9, 30),
      endDate: new Date(2017, 4, 22, 11, 30),
      disabled: true
    }, {
      text: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2017, 4, 22, 12, 0),
      endDate: new Date(2017, 4, 22, 13, 0)
    }];
    (0, _globals.it)('done button visibility in case allowUpdatingValue = true', async () => {
      const {
        POM
      } = await (0, _create_scheduler.createScheduler)({
        dataSource: data,
        views: ['week'],
        currentView: 'week',
        currentDate: new Date(2017, 4, 25),
        editing: {
          allowUpdating: true
        }
      });
      POM.openPopupByDblClick('Website Re-Design Plan');
      const doneButton = POM.popup.getDoneButton();
      (0, _globals.expect)(doneButton.getAttribute('aria-label')).toBe('Done');
      await new Promise(process.nextTick);
      POM.popup.getCancelButton().click();
    });
    (0, _globals.it)('done button visibility in case allowUpdatingValue = false', async () => {
      const {
        POM
      } = await (0, _create_scheduler.createScheduler)({
        dataSource: data,
        views: ['week'],
        currentView: 'week',
        currentDate: new Date(2017, 4, 25),
        editing: {
          allowUpdating: false
        }
      });
      POM.openPopupByDblClick('Website Re-Design Plan');
      (0, _globals.expect)(() => POM.popup.getDoneButton()).toThrow('Done button not found');
      POM.popup.getCancelButton().click();
    });
    (0, _globals.it)('toolbar should be re-rendered after change editing option', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)({
        dataSource: [],
        views: ['week'],
        currentView: 'week',
        currentDate: new Date(2017, 4, 25),
        editing: {
          allowUpdating: true
        }
      });
      const dataObj = {
        text: 'a',
        startDate: new Date(2015, 5, 15, 10),
        endDate: new Date(2015, 5, 15, 11)
      };
      scheduler.showAppointmentPopup(dataObj);
      let doneButton = POM.popup.getDoneButton();
      (0, _globals.expect)(doneButton.getAttribute('aria-label')).toBe('Done');
      scheduler.option('editing', {
        allowUpdating: false
      });
      scheduler.showAppointmentPopup(dataObj);
      (0, _globals.expect)(() => POM.popup.getDoneButton()).toThrow('Done button not found');
      scheduler.showAppointmentPopup();
      doneButton = POM.popup.getDoneButton();
      (0, _globals.expect)(doneButton.getAttribute('aria-label')).toBe('Done');
    });
  });
  (0, _globals.describe)('Appointment Popup and Recurrence Editor visibility', () => {
    _globals.it.todo('Recurrence editor container should be visible if recurrence rule was set');
    _globals.it.todo('Recurrence editor container should be visible after changing its visibility value');
    _globals.it.todo('Popup should show or not show reccurence editor after many opening with different data');
    _globals.it.todo('Popup should show or not to show reccurence editor after many opening with and change visibility');
    _globals.it.todo('Popup should not contain recurrence editor, if recurrenceRuleExpr is null');
    _globals.it.todo('Popup should not contain recurrence editor, if recurrenceRuleExpr is \'\'');
    _globals.it.todo('Multiple showing appointment popup for recurrence appointments and after update options should work correct');
  });
});
(0, _globals.describe)('Appointment Popup Content', () => {
  _globals.it.todo('appointmentPopup should not prevent mouse/touch events by default (T968188)');
  _globals.it.todo('showAppointmentPopup method with passed a recurrence appointment should render popup(T698732)');
  _globals.it.todo('showAppointmentPopup should render a popup only once');
  _globals.it.todo('showAppointmentPopup should work correctly after scheduler repainting');
  _globals.it.todo('changing editing should work correctly after showing popup');
  _globals.it.todo('hideAppointmentPopup should hide a popup');
  _globals.it.todo('hideAppointmentPopup should hide a popup and save changes');
  _globals.it.todo('showAppointmentPopup should render a popup form only once');
  _globals.it.todo('popup should have right height');
  _globals.it.todo('showAppointmentPopup should render a popup content only once');
  _globals.it.todo('Popup should contain editors and components with right dx-rtl classes and rtlEnabled option value');
  _globals.it.todo('Popup should contains start datebox with right value');
  _globals.it.todo('Calendar of the start datebox should have right firstDayOfWeek value');
  _globals.it.todo('Popup should contains end datebox with right value');
  _globals.it.todo('Calendar of the end datebox should have right firstDayOfWeek value');
  _globals.it.todo('Changing startDateBox value should change endDateBox value if needed');
  _globals.it.todo('Changing startDateBox value should change endDateBox value if needed(when startDate and endDate are strings)');
  _globals.it.todo('startDateBox value should be valid');
  _globals.it.todo('Changing endDateBox value should change startDateBox value if needed');
  _globals.it.todo('Changing endDateBox value should change startDateBox value if needed(when startDate and endDate are strings)');
  _globals.it.todo('endDateBox value should be valid');
  _globals.it.todo('Popup should contains caption textbox with right value');
  _globals.it.todo('Confirm dialog should be shown when showAppointmentPopup for recurrence appointment was called');
  _globals.it.todo('Recurrence Editor should have right freq editor value if recurrence rule was set on init');
  _globals.it.todo('Popup should contain recurrence editor with right config');
  _globals.it.todo('Recurrence editor should change value if freq editor value changed');
  _globals.it.todo('Recurrence editor should has right startDate after form items change');
  _globals.it.todo('Popup should contains description editor');
  _globals.it.todo('Popup should contains allDay editor');
  _globals.it.todo('allDay changing should switch date & type in editors');
  _globals.it.todo('allDay changing should switch only type in editors, if startDate is undefined');
  _globals.it.todo('There are no exceptions when select date on the appointment popup, startDate > endDate');
  _globals.it.todo('There are no exceptions when select date on the appointment popup,startDate < endDate');
  _globals.it.todo('There are no exceptions when select date on the appointment popup,if dates are undefined');
  _globals.it.todo('Validate works always before done click');
  _globals.it.todo('Load panel should not be shown if validation is fail');
  _globals.it.todo('Done button default configuration should be correct');
  _globals.it.todo('Done button custom configuration should be correct');
  _globals.it.todo('Load panel should be hidden if event validation fail');
  _globals.it.todo('Load panel should be hidden at the second appointment form opening');
  _globals.it.todo('startDateBox & endDateBox should have required validation rules');
  _globals.it.todo('Changes shouldn\'t be saved if form is invalid');
  _globals.it.todo('Appointment popup should contain resources and recurrence editor');
});
(0, _globals.describe)('Appointment Popup', () => {
  _globals.it.todo('focus is called on popup hiding');
  _globals.it.todo('Multiple showing appointment popup for recurrence appointments should work correctly');
  _globals.it.todo('Appointment popup will render even if no appointmentData is provided (T734413)');
  _globals.it.todo('Appointment popup will render with currentDate on showAppointmentPopup with no arguments');
  _globals.it.todo('Appointment form will have right dates on multiple openings (T727713)');
  _globals.it.todo('The vertical scroll bar is shown when an appointment popup fill to a small window\'s height');
  _globals.it.todo('The resize event of appointment popup is triggered the the window is resize');
  _globals.it.todo('Popup should not be closed until the valid value is typed');
});
(0, _globals.describe)('Timezone Editors', () => {
  _globals.it.todo('Popup should not contain startDateTimeZone editor by default');
  _globals.it.todo('Popup should not contain endDateTimeZone editor by default');
  _globals.it.todo('It should be possible to render startDateTimeZone editor on appt form');
  _globals.it.todo('It should be possible to render endDateTimeZone editor on appt form');
  _globals.it.todo('timeZone editors should have correct options');
  _globals.it.todo('timeZone editors should have correct value & display value on init');
  _globals.it.todo('timeZone editor should have correct display value for timezones with different offsets');
  _globals.it.todo('dataSource of timezoneEditor should be filtered');
  _globals.it.todo('startDateTimeZone and endDateTimeZone editor should be rendered with allowTimeZoneEditing option');
  _globals.it.todo('Change value in startDateTimeZone editor should trigger change value in endDateTimeZone editor if allowTimeZoneEditing: true');
  _globals.it.todo('Change value in endDateTimeZone editor shouldn\'t trigger change value in startDateTimeZone editor if allowTimeZoneEditing: true');
});