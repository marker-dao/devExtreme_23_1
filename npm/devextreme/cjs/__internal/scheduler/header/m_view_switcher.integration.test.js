/**
* DevExtreme (cjs/__internal/scheduler/header/m_view_switcher.integration.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _localization = require("../../../localization");
var _scheduler = _interopRequireDefault(require("../../../ui/scheduler"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable i18n/no-russian-character */ /* eslint-disable spellcheck/spell-checker */
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
  const $container = (0, _renderer.default)('<div>').attr('id', SCHEDULER_CONTAINER_ID).appendTo(document.body);
  const instance = new _scheduler.default($container.get(0), _extends({}, options, {
    onContentReady: () => {
      resolve({
        $container,
        instance
      });
    }
  }));
});
(0, _globals.describe)('ViewSwitcher', () => {
  (0, _globals.afterEach)(() => {
    const $container = (0, _renderer.default)(SELECTORS.schedulerContainer);
    const scheduler = $container.dxScheduler('instance');
    scheduler.dispose();
    $container.remove();
  });
  (0, _globals.describe)('Visibility', () => {
    _globals.it.each([{
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
      (0, _globals.expect)(!viewSwitcher.is(SELECTORS.invisibleState)).toBe(expectedVisibility);
    });
  });
  (0, _globals.describe)('Localization', () => {
    (0, _globals.it)('should display Russian view names when locale is set to Russian', async () => {
      (0, _localization.loadMessages)({
        ru: {
          'dxScheduler-switcherDay': 'День',
          'dxScheduler-switcherWeek': 'Неделя',
          'dxScheduler-switcherMonth': 'Месяц'
        }
      });
      (0, _localization.locale)('ru');
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
        buttonTexts.push((0, _renderer.default)(button).text());
        return true;
      });
      (0, _globals.expect)(buttonTexts).toContain('День');
      (0, _globals.expect)(buttonTexts).toContain('Неделя');
      (0, _globals.expect)(buttonTexts).toContain('Месяц');
    });
    (0, _globals.it)('should display Russian view names in dropdown switcher when locale is set to Russian', async () => {
      (0, _localization.loadMessages)({
        ru: {
          'dxScheduler-switcherDay': 'День',
          'dxScheduler-switcherWeek': 'Неделя',
          'dxScheduler-switcherMonth': 'Месяц'
        }
      });
      (0, _localization.locale)('ru');
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
      (0, _globals.expect)(buttonText.text()).toBe('День');
    });
  });
  (0, _globals.it)('currentView should equal type or name if it is set by config on switch, useDropDownViewSwitcher=false', async () => {
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
    (0, _globals.expect)(changes).toEqual([...defaultViews, 'Week 2']);
  });
  (0, _globals.it)('currentView should equal type or name if it is set by config on switch, useDropDownViewSwitcher=true', async () => {
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
    (0, _globals.expect)(changes).toEqual([...defaultViews, 'Week 2']);
  });
});
