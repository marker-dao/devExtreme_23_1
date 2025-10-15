/**
* DevExtreme (cjs/__internal/scheduler/appointment_popup/appointment_popup.test.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _toMilliseconds = require("../../utils/toMilliseconds");
var _fx = _interopRequireDefault(require("../../../common/core/animation/fx"));
var _create_scheduler = require("../__tests__/__mock__/create_scheduler");
var _m_mock_scheduler = require("../__tests__/__mock__/m_mock_scheduler");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getDefaultData = () => [{
  text: 'recurrent-app',
  startDate: new Date(2017, 4, 1, 9, 30),
  endDate: new Date(2017, 4, 1, 11),
  recurrenceRule: 'FREQ=DAILY;COUNT=5'
}, {
  text: 'common-app',
  startDate: new Date(2017, 4, 9, 9, 30),
  endDate: new Date(2017, 4, 9, 11)
}, {
  text: 'disabled-app',
  startDate: new Date(2017, 4, 22, 9, 30),
  endDate: new Date(2017, 4, 22, 11, 30),
  disabled: true
}, {
  text: 'all-day-app',
  startDate: new Date(2017, 4, 1),
  endDate: new Date(2017, 4, 1),
  allDay: true
}];
const commonAppointment = getDefaultData()[1];
const allDayAppointment = getDefaultData()[3];
const getDefaultConfig = () => ({
  dataSource: getDefaultData(),
  views: ['month'],
  currentView: 'month',
  currentDate: new Date(2017, 4, 25),
  firstDayOfWeek: 1,
  startDayHour: 9,
  height: 600,
  width: 600
});
(0, _globals.describe)('Appointment Popup Form', () => {
  (0, _globals.beforeEach)(() => {
    _fx.default.off = true;
    (0, _m_mock_scheduler.setupSchedulerTestEnvironment)();
  });
  (0, _globals.afterEach)(() => {
    _fx.default.off = false;
    document.body.innerHTML = '';
    _globals.jest.useRealTimers();
  });
  (0, _globals.describe)('Appointment changes saving/canceling', () => {
    _globals.it.each(['startDate', 'startTime', 'endDate', 'endTime'])('should not close popup on save button click when %s is empty', async field => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup(commonAppointment);
      let fieldEditorElement = null;
      if (field === 'startDate') {
        fieldEditorElement = POM.popup.startDate;
      }
      if (field === 'startTime') {
        fieldEditorElement = POM.popup.startTime;
      }
      if (field === 'endDate') {
        fieldEditorElement = POM.popup.endDate;
      }
      if (field === 'endTime') {
        fieldEditorElement = POM.popup.endTime;
      }
      // @ts-expect-error
      const dateBox = (0, _renderer.default)(fieldEditorElement).dxDateBox('instance');
      dateBox.option('value', null);
      POM.popup.getSaveButton().click();
      (0, _globals.expect)(POM.popup.component.option('visible')).toBe(true);
    });
    (0, _globals.it)('should save data to appointment after save button was clicked', async () => {
      var _scheduler$option;
      (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      POM.popup.getSaveButton().click();
      const dataItem = (_scheduler$option = scheduler.option('dataSource')) === null || _scheduler$option === void 0 ? void 0 : _scheduler$option[1];
      (0, _globals.expect)(dataItem).toMatchObject(_extends({}, commonAppointment, {
        text: 'New Subject'
      }));
    });
    (0, _globals.it)('should not update appointment if popup was closed by cancel button', async () => {
      var _scheduler$option2;
      (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      POM.popup.getCancelButton().click();
      const dataItem = (_scheduler$option2 = scheduler.option('dataSource')) === null || _scheduler$option2 === void 0 ? void 0 : _scheduler$option2[1];
      (0, _globals.expect)(dataItem).toMatchObject(_extends({}, commonAppointment));
    });
  });
  (0, _globals.describe)('Toolbar', () => {
    _globals.it.each([{
      allowUpdating: false,
      disabled: false
    }, {
      allowUpdating: false,
      disabled: true
    }, {
      allowUpdating: true,
      disabled: false
    }, {
      allowUpdating: true,
      disabled: true
    }])('Buttons visibility when %p', async _ref => {
      let {
        allowUpdating,
        disabled
      } = _ref;
      (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
        height: 200
      });
      const shouldHaveSaveButton = allowUpdating;
      const {
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        editing: {
          allowUpdating
        }
      }));
      POM.openPopupByDblClick(disabled ? 'disabled-app' : 'common-app');
      if (shouldHaveSaveButton) {
        (0, _globals.expect)(POM.popup.component.option('toolbarItems')).toMatchObject([{
          shortcut: 'done'
        }, {
          shortcut: 'cancel'
        }]);
      } else {
        (0, _globals.expect)(POM.popup.component.option('toolbarItems')).toMatchObject([{
          shortcut: 'cancel'
        }]);
      }
    });
    (0, _globals.it)('Buttons visibility after editing option changed', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        editing: {
          allowUpdating: true,
          allowAdding: true
        }
      }));
      const newAppointment = {
        text: 'a',
        startDate: new Date(2015, 5, 15, 10),
        endDate: new Date(2015, 5, 15, 11)
      };
      scheduler.showAppointmentPopup(newAppointment);
      (0, _globals.expect)(POM.popup.component.option('toolbarItems')).toMatchObject([{
        shortcut: 'done'
      }, {
        shortcut: 'cancel'
      }]);
      scheduler.option('editing', {
        allowUpdating: false
      });
      scheduler.showAppointmentPopup(newAppointment);
      (0, _globals.expect)(POM.popup.component.option('toolbarItems')).toMatchObject([{
        shortcut: 'cancel'
      }]);
      scheduler.showAppointmentPopup();
      (0, _globals.expect)(POM.popup.component.option('toolbarItems')).toMatchObject([{
        shortcut: 'done'
      }, {
        shortcut: 'cancel'
      }]);
    });
  });
  (0, _globals.describe)('allDay switch', () => {
    (0, _globals.it)('should be turned on when opening allDay appointment', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup(allDayAppointment);
      (0, _globals.expect)(POM.popup.getSwitchByName('allDay').value).toBe('true');
    });
    (0, _globals.it)('should be turned off when opening non-allDay appointment', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup(commonAppointment);
      (0, _globals.expect)(POM.popup.getSwitchByName('allDay').value).toBe('false');
    });
    (0, _globals.it)('should hide time editors when switched on', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup(commonAppointment);
      (0, _globals.expect)(POM.popup.startDate).toBeDefined();
      (0, _globals.expect)(POM.popup.startTime).toBeDefined();
      (0, _globals.expect)(POM.popup.endDate).toBeDefined();
      (0, _globals.expect)(POM.popup.endTime).toBeDefined();
      POM.popup.getSwitchByName('allDay').click();
      (0, _globals.expect)(POM.popup.startDate).toBeDefined();
      (0, _globals.expect)(POM.popup.startTime).toBeNull();
      (0, _globals.expect)(POM.popup.endDate).toBeDefined();
      (0, _globals.expect)(POM.popup.endTime).toBeNull();
    });
    (0, _globals.it)('should show time editors when switched off', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup(allDayAppointment);
      (0, _globals.expect)(POM.popup.startDate).toBeDefined();
      (0, _globals.expect)(POM.popup.startTime).toBeNull();
      (0, _globals.expect)(POM.popup.endDate).toBeDefined();
      (0, _globals.expect)(POM.popup.endTime).toBeNull();
      POM.popup.getSwitchByName('allDay').click();
      (0, _globals.expect)(POM.popup.startDate).toBeDefined();
      (0, _globals.expect)(POM.popup.startTime).toBeDefined();
      (0, _globals.expect)(POM.popup.endDate).toBeDefined();
      (0, _globals.expect)(POM.popup.endTime).toBeDefined();
    });
    _globals.it.each(['day', 'week', 'month'])('should set correct dates when switching on then off in %p view', async view => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        currentView: view
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      POM.popup.getSwitchByName('allDay').click();
      POM.popup.getSwitchByName('allDay').click();
      const expectedStartDate = new Date(commonAppointment.startDate);
      expectedStartDate.setHours(scheduler.option('startDayHour'), 0, 0, 0);
      let expectedEndDate = null;
      if (view === 'month') {
        expectedEndDate = new Date(expectedStartDate);
        expectedEndDate.setHours(scheduler.option('endDayHour'), 0, 0, 0);
      }
      if (view === 'week' || view === 'day') {
        const cellDuration = scheduler.option('cellDuration') * (0, _toMilliseconds.toMilliseconds)('minute');
        expectedEndDate = new Date(expectedStartDate.getTime() + cellDuration);
      }
      (0, _globals.expect)(POM.popup.form.option('formData')).toMatchObject({
        startDate: expectedStartDate,
        endDate: expectedEndDate
      });
    });
    (0, _globals.it)('should show correct dates after switching on allDay and canceling changes (T832711)', async () => {
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
  });
  (0, _globals.describe)('Timezones', () => {
    (0, _globals.it)('should have correct values on popup open', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(_extends({}, commonAppointment, {
        startDateTimeZone: 'America/Los_Angeles',
        endDateTimeZone: 'America/New_York'
      }));
      // @ts-expect-error
      const startTimeZoneSelectBox = (0, _renderer.default)(POM.popup.startTimeZone).dxSelectBox('instance');
      // @ts-expect-error
      const endTimeZoneSelectBox = (0, _renderer.default)(POM.popup.endTimeZone).dxSelectBox('instance');
      (0, _globals.expect)(startTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
      (0, _globals.expect)(endTimeZoneSelectBox.option('value')).toBe('America/New_York');
    });
    (0, _globals.it)('should be shown when editing.allowTimeZoneEditing is true', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      (0, _globals.expect)(POM.popup.startTimeZone).toBeDefined();
      (0, _globals.expect)(POM.popup.endTimeZone).toBeDefined();
    });
    (0, _globals.it)('should be hidden when editing.allowTimeZoneEditing is false', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: false
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      (0, _globals.expect)(POM.popup.startTimeZone).toBeNull();
      (0, _globals.expect)(POM.popup.endTimeZone).toBeNull();
    });
    (0, _globals.it)('change of startTimeZone value should trigger endTimeZone value change', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      // @ts-expect-error
      const startTimeZoneSelectBox = (0, _renderer.default)(POM.popup.startTimeZone).dxSelectBox('instance');
      // @ts-expect-error
      const endTimeZoneSelectBox = (0, _renderer.default)(POM.popup.endTimeZone).dxSelectBox('instance');
      startTimeZoneSelectBox.option('value', 'America/Los_Angeles');
      (0, _globals.expect)(startTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
      (0, _globals.expect)(endTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
    });
    (0, _globals.it)('change of endTimeZone value should not trigger startTimeZone value change', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      // @ts-expect-error
      const startTimeZoneSelectBox = (0, _renderer.default)(POM.popup.startTimeZone).dxSelectBox('instance');
      // @ts-expect-error
      const endTimeZoneSelectBox = (0, _renderer.default)(POM.popup.endTimeZone).dxSelectBox('instance');
      startTimeZoneSelectBox.option('value', 'America/Los_Angeles');
      endTimeZoneSelectBox.option('value', 'America/New_York');
      (0, _globals.expect)(startTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
      (0, _globals.expect)(endTimeZoneSelectBox.option('value')).toBe('America/New_York');
    });
  });
  (0, _globals.describe)('Recurrence', () => {
    _globals.it.skip('Recurrence form should work properly if recurrenceRule property mapped recurrenceRuleExpr', async () => {
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
    _globals.it.skip('Appointment popup shouldn\'t render recurrence editor, if previous was with recurrence', async () => {
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
    _globals.it.skip('Recurrence repeat-end editor should have default \'never\' value after reopening appointment popup', async () => {
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
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup(firstAppointment);
      POM.popup.getSwitchByName('repeat').click();
      POM.popup.selectRadio('After');
      POM.popup.getSaveButton().click();
      scheduler.showAppointmentPopup(secondAppointment);
      POM.popup.getSwitchByName('repeat').click();
      const radioValue = POM.popup.getSelectedRadioValue();
      (0, _globals.expect)(radioValue).toBe('Never');
    });
    (0, _globals.describe)('Recurrence Editor visibility', () => {
      _globals.it.todo('Recurrence editor container should be visible if recurrence rule was set');
      _globals.it.todo('Recurrence editor container should be visible after changing its visibility value');
      _globals.it.todo('Popup should show or not show reccurence editor after many opening with different data');
      _globals.it.todo('Popup should show or not to show reccurence editor after many opening with and change visibility');
      _globals.it.todo('Popup should not contain recurrence editor, if recurrenceRuleExpr is null');
      _globals.it.todo('Popup should not contain recurrence editor, if recurrenceRuleExpr is \'\'');
      _globals.it.todo('Multiple showing appointment popup for recurrence appointments and after update options should work correct');
    });
  });
  (0, _globals.describe)('Callbacks', () => {
    (0, _globals.describe)('OnAppointmentFormOpening', () => {
      (0, _globals.it)('should pass e.popup argument', async () => {
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
      (0, _globals.it)('should handle e.cancel value: default settings', async () => {
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
      (0, _globals.it)('should handle e.cancel value: true', async () => {
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
      (0, _globals.it)('should handle e.cancel value: false', async () => {
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
    });
    (0, _globals.describe)('onAppointmentAdding', () => {
      (0, _globals.it)('should handle e.cancel value: true', async () => {
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
        POM.popup.form.option('formData', {
          startDate: new Date(2015, 4, 24, 9, 0),
          endDate: new Date(2015, 4, 24, 11, 0),
          text: 'New Subject'
        });
        POM.popup.getSaveButton().click();
        const loadPanel = POM.getLoadPanel();
        (0, _globals.expect)(loadPanel).toBeFalsy();
        await new Promise(process.nextTick);
        const appointments = POM.getAppointments();
        (0, _globals.expect)(appointments.length).toBe(0);
      });
      (0, _globals.it)('should handle e.cancel value: false', async () => {
        (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
          height: 200
        });
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
        POM.popup.form.option('formData', {
          startDate: new Date(2015, 4, 24, 9, 0),
          endDate: new Date(2015, 4, 24, 11, 0),
          text: 'New Subject'
        });
        POM.popup.getSaveButton().click();
        const loadPanel = POM.getLoadPanel();
        (0, _globals.expect)(loadPanel).toBeFalsy();
        await new Promise(process.nextTick);
        (0, _globals.expect)(POM.getAppointment('New Subject').getText()).toEqual('New Subject');
      });
    });
    (0, _globals.describe)('onAppointmentUpdating', () => {
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
        POM.popup.getSaveButton().click();
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
        POM.popup.getSaveButton().click();
        const loadPanel = POM.getLoadPanel();
        (0, _globals.expect)(loadPanel).toBeFalsy();
        await new Promise(process.nextTick);
        const appointment = POM.getAppointment('New Subject');
        (0, _globals.expect)(appointment.getText()).toEqual('New Subject');
      });
    });
    (0, _globals.describe)('onAppointmentDeleting', () => {
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
    });
  });
  (0, _globals.describe)('showAppointmentPopup', () => {
    (0, _globals.it)('should open appointment popup without data', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup();
      const expectedStartDate = new Date(scheduler.option('currentDate'));
      const expectedEndDate = new Date(expectedStartDate.getTime() + scheduler.option('cellDuration') * (0, _toMilliseconds.toMilliseconds)('minute'));
      (0, _globals.expect)(POM.popup.component.option('visible')).toBe(true);
      (0, _globals.expect)(POM.popup.form.option('formData')).toEqual({
        text: undefined,
        allDay: false,
        startDate: expectedStartDate,
        endDate: expectedEndDate,
        description: undefined,
        recurrenceRule: undefined,
        startDateTimeZone: undefined,
        endDateTimeZone: undefined
      });
    });
    (0, _globals.it)('should open appointment popup with correct data', async () => {
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      scheduler.showAppointmentPopup(commonAppointment);
      (0, _globals.expect)(POM.popup.component.option('visible')).toBe(true);
      (0, _globals.expect)(POM.popup.form.option('formData')).toMatchObject(_extends({}, commonAppointment));
    });
  });
  (0, _globals.describe)('hideAppointmentPopup', () => {
    (0, _globals.it)('should hide appointment popup without saving changes', async () => {
      var _scheduler$option3;
      (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      scheduler.hideAppointmentPopup();
      const dataItem = (_scheduler$option3 = scheduler.option('dataSource')) === null || _scheduler$option3 === void 0 ? void 0 : _scheduler$option3[1];
      (0, _globals.expect)(dataItem).toMatchObject(_extends({}, commonAppointment));
    });
    (0, _globals.it)('should hide appointment popup with saving changes', async () => {
      var _scheduler$option4;
      (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      scheduler.hideAppointmentPopup(true);
      const dataItem = (_scheduler$option4 = scheduler.option('dataSource')) === null || _scheduler$option4 === void 0 ? void 0 : _scheduler$option4[1];
      (0, _globals.expect)(dataItem).toMatchObject(_extends({}, commonAppointment, {
        text: 'New Subject'
      }));
    });
  });
  (0, _globals.describe)('CustomStore', () => {
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
      POM.popup.getSaveButton().click();
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
      POM.popup.getSaveButton().click();
      const loadPanel = POM.getLoadPanel();
      (0, _globals.expect)(loadPanel).toBeTruthy();
      await new Promise(process.nextTick);
      const loadPanelAfter = POM.getLoadPanel();
      (0, _globals.expect)(loadPanelAfter).toBeFalsy();
      (0, _globals.expect)(fn).toBeCalled();
    });
  });
  (0, _globals.it)('should update form data after another appointment was open', async () => {
    const {
      scheduler,
      POM
    } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
    scheduler.showAppointmentPopup(commonAppointment);
    (0, _globals.expect)(POM.popup.form.option('formData')).toMatchObject(_extends({}, commonAppointment));
    POM.popup.getCancelButton().click();
    scheduler.showAppointmentPopup(allDayAppointment);
    (0, _globals.expect)(POM.popup.form.option('formData')).toMatchObject(_extends({}, allDayAppointment));
  });
  (0, _globals.it)('should open appointment on tooltip click', async () => {
    var _POM$getAppointment$e, _POM$getTooltipAppoin;
    (0, _m_mock_scheduler.setupSchedulerTestEnvironment)({
      height: 200
    });
    const {
      POM
    } = await (0, _create_scheduler.createScheduler)(getDefaultConfig());
    (0, _globals.expect)(POM.getPopups().length).toBe(0);
    _globals.jest.useFakeTimers();
    (_POM$getAppointment$e = POM.getAppointment('common-app').element) === null || _POM$getAppointment$e === void 0 || _POM$getAppointment$e.click();
    _globals.jest.runAllTimers();
    (_POM$getTooltipAppoin = POM.getTooltipAppointment()) === null || _POM$getTooltipAppoin === void 0 || _POM$getTooltipAppoin.click();
    (0, _globals.expect)(POM.getPopups().length).toBe(1);
    (0, _globals.expect)(POM.popup.form.option('formData')).toMatchObject(_extends({}, commonAppointment));
  });
  (0, _globals.it)('should update correct field if textExpr is defined', async () => {
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
      onAppointmentAdded: _ref2 => {
        let {
          appointmentData
        } = _ref2;
        newAppointment = appointmentData;
      },
      height: 600
    });
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Subject', 'qwerty');
    POM.popup.getSaveButton().click();
    (0, _globals.expect)((_newAppointment = newAppointment) === null || _newAppointment === void 0 ? void 0 : _newAppointment[textExpValue]).toBe('qwerty');
    (0, _globals.expect)((_newAppointment2 = newAppointment) === null || _newAppointment2 === void 0 ? void 0 : _newAppointment2.text).toBeUndefined();
    (0, _globals.expect)(data[0].Subject).toBe('qwerty');
    (0, _globals.expect)(data[0].text).toBeUndefined();
  });
});
(0, _globals.describe)('Appointment Popup Content', () => {
  _globals.it.todo('appointmentPopup should not prevent mouse/touch events by default (T968188)');
  _globals.it.todo('showAppointmentPopup method with passed a recurrence appointment should render popup(T698732)');
  _globals.it.todo('showAppointmentPopup should render a popup only once');
  _globals.it.todo('showAppointmentPopup should work correctly after scheduler repainting');
  _globals.it.todo('changing editing should work correctly after showing popup');
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
});
(0, _globals.describe)('Timezone Editors', () => {
  _globals.it.todo('timeZone editors should have correct options');
  _globals.it.todo('timeZone editor should have correct display value for timezones with different offsets');
  _globals.it.todo('dataSource of timezoneEditor should be filtered');
});
