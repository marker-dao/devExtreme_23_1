import _extends from "@babel/runtime/helpers/esm/extends";
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import $ from '../../../core/renderer';
import { toMilliseconds } from '../../utils/toMilliseconds';
import fx from '../../../common/core/animation/fx';
import { createScheduler } from '../__tests__/__mock__/create_scheduler';
import { setupSchedulerTestEnvironment } from '../__tests__/__mock__/m_mock_scheduler';
const CLASSES = {
  icon: 'dx-scheduler-form-icon',
  hidden: 'dx-hidden',
  mainGroupHidden: 'dx-scheduler-form-main-group-hidden',
  recurrenceGroupHidden: 'dx-scheduler-form-recurrence-group-hidden'
};
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
describe('Appointment Popup Form', () => {
  beforeEach(() => {
    fx.off = true;
    setupSchedulerTestEnvironment();
  });
  afterEach(() => {
    fx.off = false;
    document.body.innerHTML = '';
    jest.useRealTimers();
  });
  describe('Appointment changes saving/canceling', () => {
    it.each(['startDate', 'startTime', 'endDate', 'endTime'])('should not close popup on save button click when %s is empty', async field => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
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
      const dateBox = $(fieldEditorElement).dxDateBox('instance');
      dateBox.option('value', null);
      POM.popup.getSaveButton().click();
      expect(POM.popup.component.option('visible')).toBe(true);
    });
    it('should save data to appointment after save button was clicked', async () => {
      var _scheduler$option;
      setupSchedulerTestEnvironment({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      POM.popup.getSaveButton().click();
      const dataItem = (_scheduler$option = scheduler.option('dataSource')) === null || _scheduler$option === void 0 ? void 0 : _scheduler$option[1];
      expect(dataItem).toMatchObject(_extends({}, commonAppointment, {
        text: 'New Subject'
      }));
    });
    it('should not update appointment if popup was closed by cancel button', async () => {
      var _scheduler$option2;
      setupSchedulerTestEnvironment({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      POM.popup.getCancelButton().click();
      const dataItem = (_scheduler$option2 = scheduler.option('dataSource')) === null || _scheduler$option2 === void 0 ? void 0 : _scheduler$option2[1];
      expect(dataItem).toMatchObject(_extends({}, commonAppointment));
    });
  });
  describe('Toolbar', () => {
    const toolbarWithSaveButton = [{
      toolbar: 'top',
      location: 'before',
      cssClass: 'dx-toolbar-label'
    }, {
      toolbar: 'top',
      location: 'after',
      options: {
        onClick: expect.any(Function),
        stylingMode: 'contained',
        type: 'default',
        text: 'Save'
      },
      shortcut: 'done'
    }, {
      toolbar: 'top',
      location: 'after',
      shortcut: 'cancel',
      options: {
        stylingMode: 'outlined'
      }
    }];
    const toolbarWithCancelButton = [{
      toolbar: 'top',
      location: 'before',
      cssClass: 'dx-toolbar-label'
    }, {
      toolbar: 'top',
      location: 'after',
      shortcut: 'cancel',
      options: {
        stylingMode: 'outlined'
      }
    }];
    describe('Popup Title', () => {
      it('should display "New Appointment" when creating new appointment', async () => {
        const {
          scheduler,
          POM
        } = await createScheduler(_extends({}, getDefaultConfig(), {
          editing: {
            allowAdding: true
          }
        }));
        scheduler.showAppointmentPopup();
        const toolbarItems = POM.popup.component.option('toolbarItems');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const titleItem = toolbarItems === null || toolbarItems === void 0 ? void 0 : toolbarItems.find(item => item.cssClass === 'dx-toolbar-label');
        expect(titleItem === null || titleItem === void 0 ? void 0 : titleItem.text).toBe('New Appointment');
      });
      it('should display "Edit Appointment" when editing existing appointment', async () => {
        const {
          scheduler,
          POM
        } = await createScheduler(_extends({}, getDefaultConfig(), {
          editing: {
            allowUpdating: true
          }
        }));
        scheduler.showAppointmentPopup(commonAppointment);
        const toolbarItems = POM.popup.component.option('toolbarItems');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const titleItem = toolbarItems === null || toolbarItems === void 0 ? void 0 : toolbarItems.find(item => item.cssClass === 'dx-toolbar-label');
        expect(titleItem === null || titleItem === void 0 ? void 0 : titleItem.text).toBe('Edit Appointment');
      });
    });
    it.each([{
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
      setupSchedulerTestEnvironment({
        height: 200
      });
      const shouldHaveSaveButton = allowUpdating && !disabled;
      const {
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowUpdating
        }
      }));
      POM.openPopupByDblClick(disabled ? 'disabled-app' : 'common-app');
      if (shouldHaveSaveButton) {
        expect(POM.popup.component.option('toolbarItems')).toMatchObject(toolbarWithSaveButton);
      } else {
        expect(POM.popup.component.option('toolbarItems')).toMatchObject(toolbarWithCancelButton);
      }
      await POM.popup.component.hide();
    });
    it('Buttons visibility after editing option changed', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
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
      expect(POM.popup.component.option('toolbarItems')).toMatchObject(toolbarWithSaveButton);
      scheduler.option('editing', {
        allowUpdating: false,
        allowAdding: true
      });
      scheduler.showAppointmentPopup(newAppointment);
      expect(POM.popup.component.option('toolbarItems')).toMatchObject(toolbarWithCancelButton);
      await POM.popup.component.hide();
      scheduler.showAppointmentPopup();
      expect(POM.popup.component.option('toolbarItems')).toMatchObject(toolbarWithSaveButton);
    });
  });
  describe('allDay switch', () => {
    it('should be turned on when opening allDay appointment', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup(allDayAppointment);
      expect(POM.popup.getSwitchByName('allDay').value).toBe('true');
    });
    it('should be turned off when opening non-allDay appointment', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.getSwitchByName('allDay').value).toBe('false');
    });
    it('should hide time editors when switched on', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.startDate).toBeDefined();
      expect(POM.popup.startTime).toBeDefined();
      expect(POM.popup.endDate).toBeDefined();
      expect(POM.popup.endTime).toBeDefined();
      POM.popup.getSwitchByName('allDay').click();
      expect(POM.popup.startDate).toBeDefined();
      expect(POM.popup.startTime).toBeNull();
      expect(POM.popup.endDate).toBeDefined();
      expect(POM.popup.endTime).toBeNull();
    });
    it('should show time editors when switched off', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup(allDayAppointment);
      expect(POM.popup.startDate).toBeDefined();
      expect(POM.popup.startTime).toBeNull();
      expect(POM.popup.endDate).toBeDefined();
      expect(POM.popup.endTime).toBeNull();
      POM.popup.getSwitchByName('allDay').click();
      expect(POM.popup.startDate).toBeDefined();
      expect(POM.popup.startTime).toBeDefined();
      expect(POM.popup.endDate).toBeDefined();
      expect(POM.popup.endTime).toBeDefined();
    });
    it.each(['day', 'week', 'month'])('should set correct dates when switching on then off in %p view', async view => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
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
        const cellDuration = scheduler.option('cellDuration') * toMilliseconds('minute');
        expectedEndDate = new Date(expectedStartDate.getTime() + cellDuration);
      }
      expect(POM.popup.form.option('formData')).toMatchObject({
        startDate: expectedStartDate,
        endDate: expectedEndDate
      });
    });
    it('should show correct dates after switching on allDay and canceling changes (T832711)', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(undefined);
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
      expect(startDateValue).toBe('5/1/2017');
      expect(endDateValue).toBe('5/1/2017');
    });
  });
  describe('Timezones', () => {
    it('should have correct values on popup open', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(_extends({}, commonAppointment, {
        startDateTimeZone: 'America/Los_Angeles',
        endDateTimeZone: 'America/New_York'
      }));
      // @ts-expect-error
      const startTimeZoneSelectBox = $(POM.popup.startTimeZone).dxSelectBox('instance');
      // @ts-expect-error
      const endTimeZoneSelectBox = $(POM.popup.endTimeZone).dxSelectBox('instance');
      expect(startTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
      expect(endTimeZoneSelectBox.option('value')).toBe('America/New_York');
    });
    it('should be shown when editing.allowTimeZoneEditing is true', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.startTimeZone).toBeDefined();
      expect(POM.popup.endTimeZone).toBeDefined();
    });
    it('should be hidden when editing.allowTimeZoneEditing is false', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: false
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.startTimeZone).toBeNull();
      expect(POM.popup.endTimeZone).toBeNull();
    });
    it('change of startTimeZone value should trigger endTimeZone value change', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      // @ts-expect-error
      const startTimeZoneSelectBox = $(POM.popup.startTimeZone).dxSelectBox('instance');
      // @ts-expect-error
      const endTimeZoneSelectBox = $(POM.popup.endTimeZone).dxSelectBox('instance');
      startTimeZoneSelectBox.option('value', 'America/Los_Angeles');
      expect(startTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
      expect(endTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
    });
    it('change of endTimeZone value should not trigger startTimeZone value change', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowTimeZoneEditing: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      // @ts-expect-error
      const startTimeZoneSelectBox = $(POM.popup.startTimeZone).dxSelectBox('instance');
      // @ts-expect-error
      const endTimeZoneSelectBox = $(POM.popup.endTimeZone).dxSelectBox('instance');
      startTimeZoneSelectBox.option('value', 'America/Los_Angeles');
      endTimeZoneSelectBox.option('value', 'America/New_York');
      expect(startTimeZoneSelectBox.option('value')).toBe('America/Los_Angeles');
      expect(endTimeZoneSelectBox.option('value')).toBe('America/New_York');
    });
  });
  describe('Recurrence', () => {
    it('changes visibility of groups when opening recurrence form', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup();
      const mainGroup = $(POM.popup.mainGroup);
      const recurrenceGroup = $(POM.popup.recurrenceGroup);
      expect(mainGroup.hasClass(CLASSES.mainGroupHidden)).toBe(false);
      expect(recurrenceGroup.hasClass(CLASSES.recurrenceGroupHidden)).toBe(true);
      POM.popup.selectRepeatValue('weekly');
      await new Promise(process.nextTick);
      const popupHeight = POM.popup.component.option('height');
      expect(popupHeight).toBeDefined();
      expect(typeof popupHeight).toBe('number');
      expect(mainGroup.hasClass(CLASSES.mainGroupHidden)).toBe(true);
      expect(recurrenceGroup.hasClass(CLASSES.recurrenceGroupHidden)).toBe(false);
      POM.popup.getBackButton().click();
      expect(POM.popup.component.option('height')).toBe('auto');
      expect(mainGroup.hasClass(CLASSES.mainGroupHidden)).toBe(false);
      expect(recurrenceGroup.hasClass(CLASSES.recurrenceGroupHidden)).toBe(true);
    });
    it('Check that after opening recurrence appointment current form is main form', async () => {
      const appointment = {
        text: 'Recurrent Appointment',
        startDate: new Date(2017, 4, 1, 9, 30),
        endDate: new Date(2017, 4, 1, 11),
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10'
      };
      const {
        POM,
        scheduler
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup(appointment);
      POM.popup.getEditSeriesButton().click();
      const recurrenceGroup = $(POM.popup.recurrenceGroup);
      expect(recurrenceGroup.hasClass(CLASSES.recurrenceGroupHidden)).toBe(true);
    });
    it('Should discard recurrence changes when clicking \'cancel\' button in recurrence form', async () => {
      var _scheduler$option3;
      const data = [{
        text: 'meet',
        startDate: new Date(2017, 4, 22, 9, 30),
        endDate: new Date(2017, 4, 22, 11, 30),
        recurrenceRule: 'FREQ=DAILY;'
      }];
      const {
        POM,
        scheduler
      } = await createScheduler({
        dataSource: data,
        currentDate: new Date(2017, 4, 22)
      });
      scheduler.showAppointmentPopup(data[0]);
      POM.popup.selectRepeatValue('weekly');
      // TODO: this method works weirdly
      scheduler.hideAppointmentPopup(true);
      expect((_scheduler$option3 = scheduler.option('dataSource')) === null || _scheduler$option3 === void 0 ? void 0 : _scheduler$option3[0]).toEqual(data[0]);
    });
    describe('Recurrence frequency types', () => {
      it('Should show day selection buttons when frequency is weekly', async () => {
        const appointment = {
          text: 'Test Appointment',
          startDate: new Date(2017, 4, 1, 9, 30),
          endDate: new Date(2017, 4, 1, 11)
        };
        const {
          POM,
          scheduler
        } = await createScheduler(getDefaultConfig());
        scheduler.showAppointmentPopup(appointment);
        POM.popup.selectRepeatValue('weekly');
        const dayButtons = $(POM.popup.recurrenceWeekDayButtons);
        expect(dayButtons.length).toBeGreaterThan(0);
        const buttons7Days = dayButtons.find('.dx-button');
        expect(buttons7Days.length).toBe(7);
      });
      it('Check that firstDayOfWeek is applied to week day buttons', async () => {
        const appointment = {
          text: 'Test Appointment',
          startDate: new Date(2017, 4, 1, 9, 30),
          endDate: new Date(2017, 4, 1, 11)
        };
        const {
          POM: POM1,
          scheduler: scheduler1
        } = await createScheduler(_extends({}, getDefaultConfig(), {
          firstDayOfWeek: 1
        }));
        scheduler1.showAppointmentPopup(appointment);
        POM1.popup.selectRepeatValue('weekly');
        const dayButtonsMonday = $(POM1.popup.recurrenceWeekDayButtons).find('.dx-button');
        expect(dayButtonsMonday.length).toBe(7);
        expect(dayButtonsMonday.eq(0).text()).toBe('M');
        expect(dayButtonsMonday.eq(6).text()).toBe('S');
        scheduler1.hideAppointmentPopup();
        const {
          POM: POM2,
          scheduler: scheduler2
        } = await createScheduler(_extends({}, getDefaultConfig(), {
          firstDayOfWeek: 0
        }));
        scheduler2.showAppointmentPopup(appointment);
        POM2.popup.selectRepeatValue('weekly');
        const dayButtonsSunday = $(POM2.popup.recurrenceWeekDayButtons).find('.dx-button');
        expect(dayButtonsSunday.length).toBe(7);
        expect(dayButtonsSunday.eq(0).text()).toBe('S');
        expect(dayButtonsSunday.eq(1).text()).toBe('M');
        expect(dayButtonsSunday.eq(6).text()).toBe('S');
      });
      it('Check that firstDayOfWeek is applied to recurrence form startDate', async () => {
        const appointment = {
          text: 'Test Appointment',
          startDate: new Date(2017, 4, 1, 9, 30),
          endDate: new Date(2017, 4, 1, 11)
        };
        const {
          POM,
          scheduler
        } = await createScheduler(_extends({}, getDefaultConfig(), {
          firstDayOfWeek: 1
        }));
        scheduler.showAppointmentPopup(appointment);
        POM.popup.selectRepeatValue('weekly');
        const recurrenceStartDateEditor = POM.popup.form.getEditor('recurrenceStartDateEditor');
        expect(recurrenceStartDateEditor).toBeDefined();
        expect(recurrenceStartDateEditor === null || recurrenceStartDateEditor === void 0 ? void 0 : recurrenceStartDateEditor.option('calendarOptions.firstDayOfWeek')).toBe(1);
        scheduler.option('firstDayOfWeek', 0);
        scheduler.showAppointmentPopup(appointment);
        POM.popup.selectRepeatValue('weekly');
        const recurrenceStartDateEditorAfter = POM.popup.form.getEditor('recurrenceStartDateEditor');
        expect(recurrenceStartDateEditorAfter).toBeDefined();
        expect(recurrenceStartDateEditorAfter === null || recurrenceStartDateEditorAfter === void 0 ? void 0 : recurrenceStartDateEditorAfter.option('calendarOptions.firstDayOfWeek')).toBe(0);
      });
      it('Should show month day input when frequency is monthly', async () => {
        const appointment = {
          text: 'Test Appointment',
          startDate: new Date(2017, 4, 15, 9, 30),
          endDate: new Date(2017, 4, 15, 11)
        };
        const {
          POM,
          scheduler
        } = await createScheduler(getDefaultConfig());
        scheduler.showAppointmentPopup(appointment);
        POM.popup.selectRepeatValue('monthly');
        const monthlyGroup = POM.popup.recurrenceMonthlyGroup;
        expect(monthlyGroup).toBeTruthy();
        // @ts-expect-error
        const frequencyEditor = $(POM.popup.frequencyEditor).dxSelectBox('instance');
        expect(frequencyEditor.option('value')).toBe('monthly');
        const dayButtons = POM.popup.recurrenceWeekDayButtons;
        expect(dayButtons).toBeNull();
      });
      it('Should show month and day inputs when frequency is yearly', async () => {
        const appointment = {
          text: 'Test Appointment',
          startDate: new Date(2017, 11, 25, 9, 30),
          endDate: new Date(2017, 11, 25, 11)
        };
        const {
          POM,
          scheduler
        } = await createScheduler(getDefaultConfig());
        scheduler.showAppointmentPopup(appointment);
        POM.popup.selectRepeatValue('yearly');
        // @ts-expect-error
        const frequencyEditor = $(POM.popup.frequencyEditor).dxSelectBox('instance');
        expect(frequencyEditor.option('value')).toBe('yearly');
        const {
          recurrenceYearlyGroup
        } = POM.popup;
        expect(recurrenceYearlyGroup).toBeTruthy();
        const {
          byMonthEditor
        } = POM.popup;
        expect(byMonthEditor).toBeTruthy();
        const {
          dayOfMonthEditor
        } = POM.popup;
        expect(dayOfMonthEditor).toBeTruthy();
      });
      it('Should hide all repeat-on options for daily frequency', async () => {
        const appointment = {
          text: 'Test Appointment',
          startDate: new Date(2017, 4, 1, 9, 30),
          endDate: new Date(2017, 4, 1, 11)
        };
        const {
          POM,
          scheduler
        } = await createScheduler(getDefaultConfig());
        scheduler.showAppointmentPopup(appointment);
        POM.popup.selectRepeatValue('daily');
        // @ts-expect-error
        const frequencyEditor = $(POM.popup.frequencyEditor).dxSelectBox('instance');
        expect(frequencyEditor.option('value')).toBe('daily');
        const dayButtons = POM.popup.recurrenceWeekDayButtons;
        expect(dayButtons).toBeNull();
        const monthlyGroup = POM.popup.recurrenceMonthlyGroup;
        expect(monthlyGroup).toBeNull();
        const yearlyGroup = POM.popup.recurrenceYearlyGroup;
        expect(yearlyGroup).toBeNull();
      });
      it('Should hide all repeat-on options for hourly frequency', async () => {
        const appointment = {
          text: 'Test Appointment',
          startDate: new Date(2017, 4, 1, 9, 30),
          endDate: new Date(2017, 4, 1, 11)
        };
        const {
          POM,
          scheduler
        } = await createScheduler(getDefaultConfig());
        scheduler.showAppointmentPopup(appointment);
        POM.popup.selectRepeatValue('hourly');
        // @ts-expect-error
        const frequencyEditor = $(POM.popup.frequencyEditor).dxSelectBox('instance');
        expect(frequencyEditor.option('value')).toBe('hourly');
        const dayButtons = POM.popup.recurrenceWeekDayButtons;
        expect(dayButtons).toBeNull();
        const monthlyGroup = POM.popup.recurrenceMonthlyGroup;
        expect(monthlyGroup).toBeNull();
        const yearlyGroup = POM.popup.recurrenceYearlyGroup;
        expect(yearlyGroup).toBeNull();
      });
    });
    describe('Editing and saving recurrence', () => {
      it('Should populate form with existing weekly recurrence rule', async () => {
        setupSchedulerTestEnvironment({
          height: 200
        });
        const {
          POM
        } = await createScheduler({
          dataSource: [{
            text: 'Weekly Meeting',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11),
            recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10',
            repeatEnd: 'count'
          }],
          views: ['month'],
          currentView: 'month',
          currentDate: new Date(2017, 4, 25),
          firstDayOfWeek: 1,
          startDayHour: 9
        });
        POM.openPopupByDblClick('Weekly Meeting');
        POM.popup.getEditSeriesButton().click();
        // @ts-expect-error
        const repeatEditorRecurrent = $(POM.popup.repeatEditor).dxSelectBox('instance');
        expect(repeatEditorRecurrent.option('value')).toBe('weekly');
        POM.popup.openRecurrenceSettings();
        // @ts-expect-error
        const frequencyEditor = $(POM.popup.frequencyEditor).dxSelectBox('instance');
        expect(frequencyEditor.option('value')).toBe('weekly');
        const dayButtons = $(POM.popup.recurrenceWeekDayButtons).find('.dx-button');
        const selectedButtons = dayButtons.filter('.dx-button-mode-contained');
        expect(selectedButtons.length).toBe(3);
        // @ts-expect-error
        const repeatEndEditor = $(POM.popup.repeatEndEditors).dxRadioGroup('instance');
        expect(repeatEndEditor.option('value')).toBe('count');
        // @ts-expect-error
        const countEditor = $(POM.popup.countEditor).dxNumberBox('instance');
        expect(countEditor.option('value')).toBe(10);
      });
      it('Should save changes when saving from recurrence form', async () => {
        var _scheduler$option4;
        const data = [{
          text: 'Meeting',
          startDate: new Date(2017, 4, 22, 9, 30),
          endDate: new Date(2017, 4, 22, 11, 30)
        }];
        const {
          POM,
          scheduler
        } = await createScheduler({
          dataSource: data,
          currentDate: new Date(2017, 4, 22)
        });
        POM.openPopupByDblClick('Meeting');
        POM.popup.selectRepeatValue('daily');
        // @ts-expect-error
        const frequencyEditor = $(POM.popup.frequencyEditor).dxSelectBox('instance');
        frequencyEditor.option('value', 'weekly');
        POM.popup.getBackButton().click();
        POM.popup.getSaveButton().click();
        expect((_scheduler$option4 = scheduler.option('dataSource')) === null || _scheduler$option4 === void 0 ? void 0 : _scheduler$option4[0]).toEqual({
          allDay: false,
          text: 'Meeting',
          startDate: new Date(2017, 4, 22, 9, 30),
          endDate: new Date(2017, 4, 22, 11, 30),
          recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO'
        });
      });
      it('Check that appointment is saved after editing data in recurrence form', async () => {
        var _scheduler$option5;
        const data = [{
          text: 'Team Meeting',
          startDate: new Date(2017, 4, 15, 10, 0),
          endDate: new Date(2017, 4, 15, 11, 0),
          recurrenceRule: 'FREQ=DAILY'
        }];
        const {
          POM,
          scheduler
        } = await createScheduler({
          dataSource: data,
          currentDate: new Date(2017, 4, 15),
          firstDayOfWeek: 1
        });
        POM.openPopupByDblClick('Team Meeting');
        POM.popup.getEditSeriesButton().click();
        POM.popup.selectRepeatValue('weekly');
        POM.popup.openRecurrenceSettings();
        POM.popup.selectRecurrenceWeekDays([0, 4]);
        POM.popup.getBackButton().click();
        POM.popup.getSaveButton().click();
        const savedAppointment = (_scheduler$option5 = scheduler.option('dataSource')) === null || _scheduler$option5 === void 0 ? void 0 : _scheduler$option5[0];
        expect(savedAppointment).toMatchObject({
          text: 'Team Meeting',
          startDate: new Date(2017, 4, 15, 10, 0),
          endDate: new Date(2017, 4, 15, 11, 0),
          recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,FR'
        });
      });
    });
  });
  describe('Icons', () => {
    describe('Subject icon', () => {
      it('has default color when appointment has no resources', async () => {
        const {
          scheduler,
          POM
        } = await createScheduler(getDefaultConfig());
        scheduler.showAppointmentPopup(commonAppointment);
        const $icon = $(POM.popup.subjectIcon);
        expect($icon.css('color')).toBe('');
      });
      it('has default color when showAppointmentPopup is called without data', async () => {
        const {
          scheduler,
          POM
        } = await createScheduler(getDefaultConfig());
        scheduler.showAppointmentPopup();
        const $icon = $(POM.popup.subjectIcon);
        expect($icon.css('color')).toBe('');
      });
      it('has resource color when appointment has resource', async () => {
        var _POM$popup$form$getEd;
        const resourceColor1 = 'rgb(255, 0, 0)';
        const resourceColor2 = 'rgb(0, 0, 255)';
        const {
          scheduler,
          POM
        } = await createScheduler(_extends({}, getDefaultConfig(), {
          resources: [{
            fieldExpr: 'roomId',
            dataSource: [{
              id: 1,
              text: 'Room 1',
              color: resourceColor1
            }, {
              id: 2,
              text: 'Room 2',
              color: resourceColor2
            }]
          }]
        }));
        scheduler.showAppointmentPopup(_extends({}, commonAppointment, {
          roomId: 1
        }));
        await new Promise(process.nextTick);
        const $icon = $(POM.popup.subjectIcon);
        expect($icon.css('color')).toBe(resourceColor1);
        (_POM$popup$form$getEd = POM.popup.form.getEditor('roomId')) === null || _POM$popup$form$getEd === void 0 || _POM$popup$form$getEd.option('value', 2);
        await new Promise(process.nextTick);
        expect($icon.css('color')).toBe(resourceColor2);
      });
    });
    describe('Resource icons', () => {
      it.each([{
        iconsShowMode: 'both',
        visibleMain: true,
        visibleRecurrence: true
      }, {
        iconsShowMode: 'main',
        visibleMain: true,
        visibleRecurrence: false
      }, {
        iconsShowMode: 'recurrence',
        visibleMain: false,
        visibleRecurrence: true
      }, {
        iconsShowMode: 'none',
        visibleMain: false,
        visibleRecurrence: false
      }])('should shown icons correctly when iconsShowMode is \'$iconsShowMode\'', async _ref2 => {
        var _POM$popup$mainGroup, _POM$popup$recurrence;
        let {
          iconsShowMode,
          visibleMain,
          visibleRecurrence
        } = _ref2;
        const {
          scheduler,
          POM
        } = await createScheduler(_extends({}, getDefaultConfig(), {
          editing: {
            form: {
              iconsShowMode
            }
          }
        }));
        scheduler.showAppointmentPopup(commonAppointment);
        const mainFormIcons = ((_POM$popup$mainGroup = POM.popup.mainGroup) === null || _POM$popup$mainGroup === void 0 ? void 0 : _POM$popup$mainGroup.querySelectorAll(`.${CLASSES.icon}`)) ?? [];
        const recurrenceFormIcons = ((_POM$popup$recurrence = POM.popup.recurrenceGroup) === null || _POM$popup$recurrence === void 0 ? void 0 : _POM$popup$recurrence.querySelectorAll(`.${CLASSES.icon}`)) ?? [];
        expect(mainFormIcons.length).toBe(4);
        expect(recurrenceFormIcons.length).toBe(3);
        const mainIconsCorrect = Array.from(mainFormIcons).every(icon => {
          const isVisible = !icon.classList.contains(CLASSES.hidden);
          return isVisible === visibleMain;
        });
        const recurrenceIconsCorrect = Array.from(recurrenceFormIcons).every(icon => {
          const isVisible = !icon.classList.contains(CLASSES.hidden);
          return isVisible === visibleRecurrence;
        });
        expect(mainIconsCorrect).toBe(true);
        expect(recurrenceIconsCorrect).toBe(true);
      });
    });
  });
  describe('Callbacks', () => {
    describe('OnAppointmentFormOpening', () => {
      it('should pass e.popup argument', async () => {
        var _POM$popup$getTitle;
        const data = [{
          text: 'Website Re-Design Plan',
          startDate: new Date(2017, 4, 22, 9, 30),
          endDate: new Date(2017, 4, 22, 11, 30)
        }];
        const onAppointmentFormOpening = jest.fn(e => {
          e.popup.option('showTitle', true);
          e.popup.option('title', 'Information');
        });
        const {
          POM
        } = await createScheduler({
          dataSource: data,
          onAppointmentFormOpening,
          currentDate: new Date(2017, 4, 22)
        });
        POM.openPopupByDblClick('Website Re-Design Plan');
        expect((_POM$popup$getTitle = POM.popup.getTitle()) === null || _POM$popup$getTitle === void 0 ? void 0 : _POM$popup$getTitle.textContent).toBe('Information');
      });
      it('should handle e.cancel value: default settings', async () => {
        const data = [{
          text: 'Website Re-Design Plan',
          startDate: new Date(2017, 4, 22, 9, 30),
          endDate: new Date(2017, 4, 22, 11, 30)
        }];
        const {
          POM,
          scheduler
        } = await createScheduler({
          dataSource: data,
          currentDate: new Date(2017, 4, 22)
        });
        POM.openPopupByDblClick('Website Re-Design Plan');
        const popup = POM.getPopups();
        expect(popup.length).toBe(1);
        POM.popup.getCancelButton().click();
        scheduler.showAppointmentPopup(data[0]);
        expect(POM.getPopups().length).toBe(1);
      });
      it('should handle e.cancel value: true', async () => {
        const data = [{
          text: 'Website Re-Design Plan',
          startDate: new Date(2017, 4, 22, 9, 30),
          endDate: new Date(2017, 4, 22, 11, 30)
        }];
        const onAppointmentFormOpening = jest.fn(e => {
          e.cancel = true;
        });
        const {
          POM,
          scheduler
        } = await createScheduler({
          dataSource: data,
          onAppointmentFormOpening,
          currentDate: new Date(2017, 4, 22)
        });
        POM.openPopupByDblClick('Website Re-Design Plan');
        expect(POM.getPopups().length).toBe(0);
        scheduler.showAppointmentPopup(data[0]);
        expect(POM.getPopups().length).toBe(0);
      });
      it('should handle e.cancel value: false', async () => {
        const data = [{
          text: 'Website Re-Design Plan',
          startDate: new Date(2017, 4, 22, 9, 30),
          endDate: new Date(2017, 4, 22, 11, 30)
        }];
        const onAppointmentFormOpening = jest.fn(e => {
          e.cancel = false;
        });
        const {
          POM,
          scheduler
        } = await createScheduler({
          dataSource: data,
          onAppointmentFormOpening,
          currentDate: new Date(2017, 4, 22)
        });
        POM.openPopupByDblClick('Website Re-Design Plan');
        expect(POM.getPopups().length).toBe(1);
        POM.popup.getCancelButton().click();
        scheduler.showAppointmentPopup(data[0]);
        expect(POM.getPopups().length).toBe(1);
      });
    });
    describe('onAppointmentAdding', () => {
      it('should handle e.cancel value: true', async () => {
        const {
          scheduler,
          POM
        } = await createScheduler({
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
        expect(loadPanel).toBeFalsy();
        await new Promise(process.nextTick);
        const appointments = POM.getAppointments();
        expect(appointments.length).toBe(0);
      });
      it('should handle e.cancel value: false', async () => {
        setupSchedulerTestEnvironment({
          height: 200
        });
        const {
          scheduler,
          POM
        } = await createScheduler({
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
        expect(loadPanel).toBeFalsy();
        await new Promise(process.nextTick);
        expect(POM.getAppointment('New Subject').getText()).toEqual('New Subject');
      });
    });
    describe('onAppointmentUpdating', () => {
      it('onAppointmentUpdating and e.cancel=true (T907281)', async () => {
        const data = [{
          startDate: new Date(2015, 4, 24, 9),
          endDate: new Date(2015, 4, 24, 11),
          text: 'Subject'
        }];
        const {
          scheduler,
          POM
        } = await createScheduler({
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
        expect(loadPanel).toBeFalsy();
        await new Promise(process.nextTick);
        const appointment = POM.getAppointment('Subject');
        expect(appointment.getText()).toEqual('Subject');
      });
      it('onAppointmentUpdating and e.cancel=false (T907281)', async () => {
        const data = [{
          startDate: new Date(2015, 4, 24, 9),
          endDate: new Date(2015, 4, 24, 11),
          text: 'Subject'
        }];
        const {
          scheduler,
          POM
        } = await createScheduler({
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
        expect(loadPanel).toBeFalsy();
        await new Promise(process.nextTick);
        const appointment = POM.getAppointment('New Subject');
        expect(appointment.getText()).toEqual('New Subject');
      });
    });
    describe('onAppointmentDeleting', () => {
      it('onAppointmentDeleting and e.cancel=true', async () => {
        const data = [{
          text: 'Some Text',
          startDate: new Date(2015, 4, 24, 9),
          endDate: new Date(2015, 4, 24, 11)
        }];
        const {
          scheduler,
          POM
        } = await createScheduler({
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
        expect(loadPanel).toBeFalsy();
        const appointment = POM.getAppointment();
        expect(appointment.getText()).toEqual('Some Text');
      });
      it('onAppointmentDeleting and e.cancel=false', async () => {
        const data = [{
          text: 'Some Text',
          startDate: new Date(2015, 4, 24, 9),
          endDate: new Date(2015, 4, 24, 11)
        }];
        const {
          scheduler,
          POM
        } = await createScheduler({
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
        expect(loadPanel).toBeFalsy();
        const appointment = POM.getAppointment();
        expect(appointment.getText()).toEqual('');
      });
    });
  });
  describe('showAppointmentPopup', () => {
    it('should open appointment popup without data', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup();
      const expectedStartDate = new Date(scheduler.option('currentDate'));
      const expectedEndDate = new Date(expectedStartDate.getTime() + scheduler.option('cellDuration') * toMilliseconds('minute'));
      expect(POM.popup.component.option('visible')).toBe(true);
      expect(POM.popup.form.option('formData')).toEqual({
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
    it('should open appointment popup with correct data', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.component.option('visible')).toBe(true);
      expect(POM.popup.form.option('formData')).toMatchObject(_extends({}, commonAppointment));
    });
  });
  describe('hideAppointmentPopup', () => {
    it('should hide appointment popup without saving changes', async () => {
      var _scheduler$option6;
      setupSchedulerTestEnvironment({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      scheduler.hideAppointmentPopup();
      const dataItem = (_scheduler$option6 = scheduler.option('dataSource')) === null || _scheduler$option6 === void 0 ? void 0 : _scheduler$option6[1];
      expect(dataItem).toMatchObject(_extends({}, commonAppointment));
    });
    it('should hide appointment popup with saving changes', async () => {
      var _scheduler$option7;
      setupSchedulerTestEnvironment({
        height: 200
      });
      const {
        scheduler,
        POM
      } = await createScheduler(getDefaultConfig());
      POM.openPopupByDblClick('common-app');
      POM.popup.setInputValueByLabel('Subject', 'New Subject');
      scheduler.hideAppointmentPopup(true);
      const dataItem = (_scheduler$option7 = scheduler.option('dataSource')) === null || _scheduler$option7 === void 0 ? void 0 : _scheduler$option7[1];
      expect(dataItem).toMatchObject(_extends({}, commonAppointment, {
        text: 'New Subject'
      }));
    });
  });
  describe('CustomStore', () => {
    it('Update appointment if CustomStore', async () => {
      const data = [{
        startDate: new Date(2015, 4, 24, 9),
        endDate: new Date(2015, 4, 24, 11)
      }];
      const {
        scheduler,
        POM
      } = await createScheduler({
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
      expect(loadPanel).toBeTruthy();
      await new Promise(process.nextTick);
      const loadPanelAfter = POM.getLoadPanel();
      expect(loadPanelAfter).toBeFalsy();
    });
    it('Insert appointment if CustomStore', async () => {
      const fn = jest.fn();
      const data = [];
      const {
        scheduler,
        POM
      } = await createScheduler({
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
      expect(loadPanel).toBeTruthy();
      await new Promise(process.nextTick);
      const loadPanelAfter = POM.getLoadPanel();
      expect(loadPanelAfter).toBeFalsy();
      expect(fn).toBeCalled();
    });
  });
  it('should update form data after another appointment was open', async () => {
    const {
      scheduler,
      POM
    } = await createScheduler(getDefaultConfig());
    scheduler.showAppointmentPopup(commonAppointment);
    expect(POM.popup.form.option('formData')).toMatchObject(_extends({}, commonAppointment));
    POM.popup.getCancelButton().click();
    scheduler.showAppointmentPopup(allDayAppointment);
    expect(POM.popup.form.option('formData')).toMatchObject(_extends({}, allDayAppointment));
  });
  it('should open appointment on tooltip click', async () => {
    var _POM$getAppointment$e, _POM$getTooltipAppoin;
    setupSchedulerTestEnvironment({
      height: 200
    });
    const {
      POM
    } = await createScheduler(getDefaultConfig());
    expect(POM.getPopups().length).toBe(0);
    jest.useFakeTimers();
    (_POM$getAppointment$e = POM.getAppointment('common-app').element) === null || _POM$getAppointment$e === void 0 || _POM$getAppointment$e.click();
    jest.runAllTimers();
    (_POM$getTooltipAppoin = POM.getTooltipAppointment()) === null || _POM$getTooltipAppoin === void 0 || _POM$getTooltipAppoin.click();
    expect(POM.getPopups().length).toBe(1);
    expect(POM.popup.form.option('formData')).toMatchObject(_extends({}, commonAppointment));
  });
  it('should update correct field if textExpr is defined', async () => {
    var _newAppointment, _newAppointment2;
    const data = [];
    const textExpValue = 'Subject';
    let newAppointment = null;
    const {
      scheduler,
      POM
    } = await createScheduler({
      dataSource: data,
      views: ['week'],
      currentView: 'week',
      currentDate: new Date(2021, 4, 27),
      textExpr: textExpValue,
      onAppointmentAdded: _ref3 => {
        let {
          appointmentData
        } = _ref3;
        newAppointment = appointmentData;
      },
      height: 600
    });
    scheduler.showAppointmentPopup();
    POM.popup.setInputValueByLabel('Subject', 'qwerty');
    POM.popup.getSaveButton().click();
    expect((_newAppointment = newAppointment) === null || _newAppointment === void 0 ? void 0 : _newAppointment[textExpValue]).toBe('qwerty');
    expect((_newAppointment2 = newAppointment) === null || _newAppointment2 === void 0 ? void 0 : _newAppointment2.text).toBeUndefined();
    expect(data[0].Subject).toBe('qwerty');
    expect(data[0].text).toBeUndefined();
  });
  describe('Popup options', () => {
    it('should pass custom popup options from editing.popup to appointment popup', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          popup: {
            showTitle: true,
            title: 'Custom Appointment Form',
            maxHeight: '80%',
            dragEnabled: true
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.component.option('showTitle')).toBe(true);
      expect(POM.popup.component.option('title')).toBe('Custom Appointment Form');
      expect(POM.popup.component.option('maxHeight')).toBe('80%');
      expect(POM.popup.component.option('dragEnabled')).toBe(true);
    });
    it('should use default popup options when editing.popup is not specified', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.component.option('showTitle')).toBe(false);
      expect(POM.popup.component.option('height')).toBe('auto');
      expect(POM.popup.component.option('maxHeight')).toBe('90%');
    });
    it('should merge custom popup options with default options', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          popup: {
            showTitle: true,
            title: 'My Form'
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.component.option('showTitle')).toBe(true);
      expect(POM.popup.component.option('title')).toBe('My Form');
      expect(POM.popup.component.option('showCloseButton')).toBe(false);
      expect(POM.popup.component.option('enableBodyScroll')).toBe(false);
      expect(POM.popup.component.option('preventScrollEvents')).toBe(false);
    });
    it('should allow overriding default popup options', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          popup: {
            showCloseButton: true,
            enableBodyScroll: true
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      expect(POM.popup.component.option('showCloseButton')).toBe(true);
      expect(POM.popup.component.option('enableBodyScroll')).toBe(true);
    });
    it('should apply wrapperAttr configuration to popup', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          popup: {
            wrapperAttr: {
              id: 'test'
            }
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const wrapperAttr = POM.popup.component.option('wrapperAttr');
      expect(wrapperAttr.id).toBe('test');
      expect(wrapperAttr.class).toBeDefined();
    });
    it('should call onShowing callback when popup is shown', async () => {
      const onShowing = jest.fn();
      const onAppointmentFormOpening = jest.fn();
      const {
        scheduler
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          popup: {
            onShowing
          }
        },
        onAppointmentFormOpening
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      expect(onShowing).toHaveBeenCalled();
      expect(onShowing).toHaveBeenCalledTimes(1);
      expect(onAppointmentFormOpening).toHaveBeenCalled();
      expect(onAppointmentFormOpening).toHaveBeenCalledTimes(1);
    });
    it('should call onHiding callback when popup is hidden', async () => {
      const onHiding = jest.fn();
      const {
        scheduler
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          popup: {
            onHiding
          }
        }
      }));
      const focusSpy = jest.spyOn(scheduler, 'focus');
      scheduler.showAppointmentPopup(commonAppointment);
      expect(onHiding).not.toHaveBeenCalled();
      expect(focusSpy).not.toHaveBeenCalled();
      scheduler.hideAppointmentPopup();
      expect(onHiding).toHaveBeenCalled();
      expect(onHiding).toHaveBeenCalledTimes(1);
      expect(focusSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalledTimes(1);
      focusSpy.mockRestore();
    });
    it('should preserve custom toolbarItems when popup opens', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          popup: {
            toolbarItems: [{
              toolbar: 'top',
              location: 'before',
              text: 'Custom Title',
              cssClass: 'custom-title'
            }, {
              toolbar: 'top',
              location: 'after',
              widget: 'dxButton',
              options: {
                text: 'Custom Save'
              }
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const toolbarItems = POM.popup.component.option('toolbarItems');
      expect(toolbarItems).toBeDefined();
      expect(toolbarItems).toHaveLength(2);
      expect(toolbarItems).toContainEqual(expect.objectContaining({
        cssClass: 'custom-title',
        location: 'before',
        text: 'Custom Title',
        toolbar: 'top'
      }));
      expect(toolbarItems).toContainEqual(expect.objectContaining({
        toolbar: 'top',
        location: 'after',
        widget: 'dxButton',
        options: expect.objectContaining({
          text: 'Custom Save'
        })
      }));
    });
    it('should preserve custom toolbarItems when popup is reopened', async () => {
      var _toolbarItems$;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          popup: {
            toolbarItems: [{
              toolbar: 'top',
              location: 'before',
              text: 'Custom Toolbar'
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      scheduler.hideAppointmentPopup();
      scheduler.showAppointmentPopup(allDayAppointment);
      const toolbarItems = POM.popup.component.option('toolbarItems');
      expect(toolbarItems).toBeDefined();
      expect(toolbarItems).toHaveLength(1);
      expect(toolbarItems === null || toolbarItems === void 0 || (_toolbarItems$ = toolbarItems[0]) === null || _toolbarItems$ === void 0 ? void 0 : _toolbarItems$.text).toBe('Custom Toolbar');
    });
  });
});
describe('Appointment Popup Content', () => {
  it.todo('appointmentPopup should not prevent mouse/touch events by default (T968188)');
  it.todo('showAppointmentPopup method with passed a recurrence appointment should render popup(T698732)');
  it.todo('showAppointmentPopup should render a popup only once');
  it.todo('showAppointmentPopup should work correctly after scheduler repainting');
  it.todo('changing editing should work correctly after showing popup');
  it.todo('showAppointmentPopup should render a popup form only once');
  it.todo('popup should have right height');
  it.todo('showAppointmentPopup should render a popup content only once');
  it.todo('Popup should contain editors and components with right dx-rtl classes and rtlEnabled option value');
  it.todo('Popup should contains start datebox with right value');
  it.todo('Calendar of the start datebox should have right firstDayOfWeek value');
  it.todo('Popup should contains end datebox with right value');
  it.todo('Calendar of the end datebox should have right firstDayOfWeek value');
  it.todo('Changing startDateBox value should change endDateBox value if needed');
  it.todo('Changing startDateBox value should change endDateBox value if needed(when startDate and endDate are strings)');
  it.todo('startDateBox value should be valid');
  it.todo('Changing endDateBox value should change startDateBox value if needed');
  it.todo('Changing endDateBox value should change startDateBox value if needed(when startDate and endDate are strings)');
  it.todo('endDateBox value should be valid');
  it.todo('Popup should contains caption textbox with right value');
  it.todo('Confirm dialog should be shown when showAppointmentPopup for recurrence appointment was called');
  it.todo('Recurrence Editor should have right freq editor value if recurrence rule was set on init');
  it.todo('Popup should contain recurrence editor with right config');
  it.todo('Recurrence editor should change value if freq editor value changed');
  it.todo('Recurrence editor should has right startDate after form items change');
  it.todo('Popup should contains description editor');
  it.todo('Popup should contains allDay editor');
  it.todo('allDay changing should switch date & type in editors');
  it.todo('allDay changing should switch only type in editors, if startDate is undefined');
  it.todo('There are no exceptions when select date on the appointment popup, startDate > endDate');
  it.todo('There are no exceptions when select date on the appointment popup,startDate < endDate');
  it.todo('There are no exceptions when select date on the appointment popup,if dates are undefined');
  it.todo('Validate works always before done click');
  it.todo('Load panel should not be shown if validation is fail');
  it.todo('Done button default configuration should be correct');
  it.todo('Done button custom configuration should be correct');
  it.todo('Load panel should be hidden if event validation fail');
  it.todo('Load panel should be hidden at the second appointment form opening');
  it.todo('Appointment popup should contain resources and recurrence editor');
});
describe('Appointment Popup', () => {
  it.todo('focus is called on popup hiding');
  it.todo('Multiple showing appointment popup for recurrence appointments should work correctly');
  it.todo('Appointment popup will render even if no appointmentData is provided (T734413)');
  it.todo('Appointment popup will render with currentDate on showAppointmentPopup with no arguments');
  it.todo('Appointment form will have right dates on multiple openings (T727713)');
  it.todo('The vertical scroll bar is shown when an appointment popup fill to a small window\'s height');
  it.todo('The resize event of appointment popup is triggered the the window is resize');
});
describe('Timezone Editors', () => {
  it.todo('timeZone editors should have correct options');
  it.todo('timeZone editor should have correct display value for timezones with different offsets');
  it.todo('dataSource of timezoneEditor should be filtered');
});
describe('Customize form items', () => {
  beforeEach(() => {
    fx.off = true;
    setupSchedulerTestEnvironment();
  });
  afterEach(() => {
    fx.off = false;
    document.body.innerHTML = '';
    jest.useRealTimers();
  });
  describe('Basic form customization', () => {
    it('should use default form when editing.items is not set', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems).toBeDefined();
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBeGreaterThan(0);
    });
    it('should show empty form when editing.items is empty array', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: []
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect((formItems === null || formItems === void 0 ? void 0 : formItems.length) ?? 0).toBe(0);
    });
    it('should show mainGroup when specified in string array', async () => {
      var _formItems$;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: ['mainGroup']
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(1);
      expect(formItems === null || formItems === void 0 || (_formItems$ = formItems[0]) === null || _formItems$ === void 0 ? void 0 : _formItems$.name).toBe('mainGroup');
    });
    it('should hide group when visible is false', async () => {
      var _formItems$2;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: [{
              name: 'mainGroup',
              visible: false
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(1);
      expect(formItems === null || formItems === void 0 || (_formItems$2 = formItems[0]) === null || _formItems$2 === void 0 ? void 0 : _formItems$2.visible).toBe(false);
    });
    it('should show group when visible is true', async () => {
      var _formItems$3;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: [{
              name: 'mainGroup',
              visible: true
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(1);
      expect(formItems === null || formItems === void 0 || (_formItems$3 = formItems[0]) === null || _formItems$3 === void 0 ? void 0 : _formItems$3.visible).toBe(true);
    });
    it('should filter children when items array is specified', async () => {
      var _mainGroup$items, _mainGroup$items2;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: [{
              name: 'mainGroup',
              visible: true,
              items: ['subjectGroup']
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      const mainGroup = formItems === null || formItems === void 0 ? void 0 : formItems[0];
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(1);
      expect(mainGroup === null || mainGroup === void 0 || (_mainGroup$items = mainGroup.items) === null || _mainGroup$items === void 0 ? void 0 : _mainGroup$items.length).toBe(1);
      expect(mainGroup === null || mainGroup === void 0 || (_mainGroup$items2 = mainGroup.items) === null || _mainGroup$items2 === void 0 || (_mainGroup$items2 = _mainGroup$items2[0]) === null || _mainGroup$items2 === void 0 ? void 0 : _mainGroup$items2.name).toBe('subjectGroup');
    });
    it('should handle non-existent groups gracefully', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: ['nonExistentGroup']
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect((formItems === null || formItems === void 0 ? void 0 : formItems.length) ?? 0).toBe(1);
    });
  });
  describe('Form customization with editing.items', () => {
    it('should handle empty items array', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: []
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(0);
    });
    it('should handle string array configuration', async () => {
      var _formItems$4;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: ['mainGroup']
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(1);
      expect(formItems === null || formItems === void 0 || (_formItems$4 = formItems[0]) === null || _formItems$4 === void 0 ? void 0 : _formItems$4.name).toBe('mainGroup');
    });
    it('should handle object configuration with visible false', async () => {
      var _formItems$5;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: [{
              name: 'mainGroup',
              visible: false
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(1);
      expect(formItems === null || formItems === void 0 || (_formItems$5 = formItems[0]) === null || _formItems$5 === void 0 ? void 0 : _formItems$5.visible).toBe(false);
    });
    it('should handle object configuration with custom items', async () => {
      var _mainGroup$items3, _mainGroup$items4, _mainGroup$items5;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: [{
              name: 'mainGroup',
              items: ['subjectGroup', 'dateGroup']
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      const mainGroup = formItems === null || formItems === void 0 ? void 0 : formItems[0];
      expect(mainGroup === null || mainGroup === void 0 || (_mainGroup$items3 = mainGroup.items) === null || _mainGroup$items3 === void 0 ? void 0 : _mainGroup$items3.length).toBe(2);
      expect(mainGroup === null || mainGroup === void 0 || (_mainGroup$items4 = mainGroup.items) === null || _mainGroup$items4 === void 0 || (_mainGroup$items4 = _mainGroup$items4[0]) === null || _mainGroup$items4 === void 0 ? void 0 : _mainGroup$items4.name).toBe('subjectGroup');
      expect(mainGroup === null || mainGroup === void 0 || (_mainGroup$items5 = mainGroup.items) === null || _mainGroup$items5 === void 0 || (_mainGroup$items5 = _mainGroup$items5[1]) === null || _mainGroup$items5 === void 0 ? void 0 : _mainGroup$items5.name).toBe('dateGroup');
    });
    it('should handle non-existent group names', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: ['nonExistentGroup']
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(1);
    });
    it('should handle undefined items', async () => {
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: undefined
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBeGreaterThan(0);
    });
    it('should handle mixed configurations', async () => {
      var _formItems$6, _formItems$7, _formItems$8;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: ['mainGroup', {
              name: 'mainGroup',
              visible: false
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      expect(formItems === null || formItems === void 0 ? void 0 : formItems.length).toBe(2);
      expect(formItems === null || formItems === void 0 || (_formItems$6 = formItems[0]) === null || _formItems$6 === void 0 ? void 0 : _formItems$6.name).toBe('mainGroup');
      expect(formItems === null || formItems === void 0 || (_formItems$7 = formItems[1]) === null || _formItems$7 === void 0 ? void 0 : _formItems$7.name).toBe('mainGroup');
      expect(formItems === null || formItems === void 0 || (_formItems$8 = formItems[1]) === null || _formItems$8 === void 0 ? void 0 : _formItems$8.visible).toBe(false);
    });
    it('should handle empty items array in object config', async () => {
      var _mainGroup$items6;
      const {
        scheduler,
        POM
      } = await createScheduler(_extends({}, getDefaultConfig(), {
        editing: {
          allowAdding: true,
          allowUpdating: true,
          form: {
            items: [{
              name: 'mainGroup',
              items: []
            }]
          }
        }
      }));
      scheduler.showAppointmentPopup(commonAppointment);
      const {
        form
      } = POM.popup;
      const formItems = form.option('items');
      const mainGroup = formItems === null || formItems === void 0 ? void 0 : formItems[0];
      expect(mainGroup === null || mainGroup === void 0 || (_mainGroup$items6 = mainGroup.items) === null || _mainGroup$items6 === void 0 ? void 0 : _mainGroup$items6.length).toBe(0);
    });
  });
});