import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable i18n/no-russian-character */
/* eslint-disable spellcheck/spell-checker */
import { afterEach, describe, expect, it } from '@jest/globals';
import $ from '../../../core/renderer';
import { loadMessages, locale } from '../../../localization';
import Scheduler from '../../../ui/scheduler';
const SCHEDULER_CONTAINER_ID = 'schedulerContainer';
const SELECTORS = {
  schedulerContainer: '#schedulerContainer',
  invisibleState: '.dx-state-invisible',
  viewSwitcher: '.dx-scheduler-view-switcher',
  viewSwitcherButton: '.dx-scheduler-view-switcher .dx-button',
  viewButtonInDropdown: '.dx-scheduler-view-switcher-dropdown-button-content .dx-list-item'
};
const defaultViews = ['day', 'week', 'workWeek', 'month', 'timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth', 'agenda'];
const createScheduler = options => new Promise(resolve => {
  const $container = $('<div>').attr('id', SCHEDULER_CONTAINER_ID).appendTo(document.body);
  const instance = new Scheduler($container.get(0), _extends({}, options, {
    onContentReady: () => {
      resolve({
        $container,
        instance
      });
    }
  }));
});
describe('ViewSwitcher', () => {
  afterEach(() => {
    const $container = $(SELECTORS.schedulerContainer);
    const scheduler = $container.dxScheduler('instance');
    scheduler.dispose();
    $container.remove();
  });
  describe('Visibility', () => {
    it.each([{
      useDropDownViewSwitcher: true,
      views: ['day'],
      currentView: 'day',
      expectedVisibility: false
    }, {
      useDropDownViewSwitcher: true,
      views: ['day'],
      currentView: 'week',
      expectedVisibility: false
    }, {
      useDropDownViewSwitcher: true,
      views: [],
      currentView: 'day',
      expectedVisibility: false
    }, {
      useDropDownViewSwitcher: true,
      views: ['day', 'week'],
      currentView: 'day',
      expectedVisibility: true
    }, {
      useDropDownViewSwitcher: false,
      views: ['day'],
      currentView: 'day',
      expectedVisibility: false
    }, {
      useDropDownViewSwitcher: false,
      views: ['day'],
      currentView: 'week',
      expectedVisibility: false
    }, {
      useDropDownViewSwitcher: false,
      views: [],
      currentView: 'day',
      expectedVisibility: false
    }, {
      useDropDownViewSwitcher: false,
      views: ['day', 'week'],
      currentView: 'day',
      expectedVisibility: true
    }])('view switcher should be visible: $expectedVisibility, when useDropDownViewSwitcher: $useDropDownViewSwitcher views: $views, currentView: $currentView', async _ref => {
      let {
        useDropDownViewSwitcher,
        views,
        currentView,
        expectedVisibility
      } = _ref;
      const {
        $container
      } = await createScheduler({
        useDropDownViewSwitcher,
        currentView,
        views: views
      });
      const viewSwitcher = $container.find(SELECTORS.viewSwitcher);
      expect(!viewSwitcher.is(SELECTORS.invisibleState)).toBe(expectedVisibility);
    });
  });
  describe('Localization', () => {
    it('should display Russian view names when locale is set to Russian', async () => {
      loadMessages({
        ru: {
          'dxScheduler-switcherDay': 'День',
          'dxScheduler-switcherWeek': 'Неделя',
          'dxScheduler-switcherMonth': 'Месяц'
        }
      });
      locale('ru');
      const {
        $container
      } = await createScheduler({
        useDropDownViewSwitcher: false,
        currentView: 'day',
        views: ['day', 'week', 'month']
      });
      const buttons = $container.find(SELECTORS.viewSwitcherButton);
      const buttonTexts = [];
      buttons.each((_, button) => {
        buttonTexts.push($(button).text());
        return true;
      });
      expect(buttonTexts).toContain('День');
      expect(buttonTexts).toContain('Неделя');
      expect(buttonTexts).toContain('Месяц');
    });
    it('should display Russian view names in dropdown switcher when locale is set to Russian', async () => {
      loadMessages({
        ru: {
          'dxScheduler-switcherDay': 'День',
          'dxScheduler-switcherWeek': 'Неделя',
          'dxScheduler-switcherMonth': 'Месяц'
        }
      });
      locale('ru');
      const {
        $container
      } = await createScheduler({
        useDropDownViewSwitcher: true,
        currentView: 'day',
        views: ['day', 'week', 'month']
      });
      const viewSwitcher = $container.find(SELECTORS.viewSwitcher);
      const dropdown = viewSwitcher.find('.dx-dropdownbutton');
      const buttonText = dropdown.find('.dx-button-text');
      expect(buttonText.text()).toBe('День');
    });
  });
  it('currentView should equal type or name if it is set by config on switch, useDropDownViewSwitcher=false', async () => {
    const changes = [];
    await createScheduler({
      dataSource: [],
      views: [...defaultViews, {
        name: 'Week 2',
        type: 'week'
      }],
      currentView: 'timelineDay',
      width: 10000,
      useDropDownViewSwitcher: false,
      onOptionChanged: e => {
        if (e.name === 'currentView') {
          const currentView = e.component.option('currentView');
          changes.push(currentView ?? '');
        }
      }
    });
    const buttons = document.querySelectorAll(SELECTORS.viewSwitcherButton);
    buttons.forEach(button => {
      button.click();
    });
    expect(changes).toEqual([...defaultViews, 'Week 2']);
  });
  it('currentView should equal type or name if it is set by config on switch, useDropDownViewSwitcher=true', async () => {
    const changes = [];
    await createScheduler({
      dataSource: [],
      views: [...defaultViews, {
        name: 'Week 2',
        type: 'week'
      }],
      currentView: 'timelineDay',
      useDropDownViewSwitcher: true,
      onOptionChanged: e => {
        if (e.name === 'currentView') {
          const currentView = e.component.option('currentView');
          changes.push(currentView ?? '');
        }
      }
    });
    const dropdown = document.querySelector(SELECTORS.viewSwitcherButton);
    dropdown.click();
    const buttons = document.querySelectorAll(SELECTORS.viewButtonInDropdown);
    buttons.forEach(button => {
      button.click();
      dropdown.click();
    });
    expect(changes).toEqual([...defaultViews, 'Week 2']);
  });
});