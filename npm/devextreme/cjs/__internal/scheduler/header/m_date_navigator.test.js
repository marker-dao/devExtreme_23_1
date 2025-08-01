/**
* DevExtreme (cjs/__internal/scheduler/header/m_date_navigator.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _m_date_navigator = require("./m_date_navigator");
(0, _globals.describe)('getDateNavigator', () => {
  (0, _globals.it)('should return default options in case of item is empty', () => {
    (0, _globals.expect)((0, _m_date_navigator.getDateNavigator)({}, {})).toEqual({
      location: 'before',
      name: 'dateNavigator',
      widget: 'dxButtonGroup',
      cssClass: _m_date_navigator.CLASS.container,
      options: {
        stylingMode: 'contained',
        selectionMode: 'none',
        items: [_globals.expect.objectContaining({
          key: _m_date_navigator.DEFAULT_ITEMS[0]
        }), _globals.expect.objectContaining({
          key: _m_date_navigator.DEFAULT_ITEMS[1]
        }), _globals.expect.objectContaining({
          key: _m_date_navigator.DEFAULT_ITEMS[2]
        })],
        onItemClick: _globals.expect.any(Function)
      }
    });
  });
  (0, _globals.it)('should return replace items in correct order with custom options', () => {
    (0, _globals.expect)((0, _m_date_navigator.getDateNavigator)({}, {
      customField: 'customField',
      options: {
        customOption: 'customOption',
        items: ['dateInterval', 'next', {
          key: 'customButton'
        }]
      }
    })).toEqual({
      location: 'before',
      name: 'dateNavigator',
      widget: 'dxButtonGroup',
      cssClass: _m_date_navigator.CLASS.container,
      customField: 'customField',
      options: {
        stylingMode: 'contained',
        selectionMode: 'none',
        customOption: 'customOption',
        items: [_globals.expect.objectContaining({
          key: _m_date_navigator.ITEMS_NAME.calendarButton
        }), _globals.expect.objectContaining({
          key: _m_date_navigator.ITEMS_NAME.nextButton
        }), _globals.expect.objectContaining({
          key: 'customButton'
        })],
        onItemClick: _globals.expect.any(Function)
      }
    });
  });
  (0, _globals.it)('should handle default and custom click callback', () => {
    const customClick = _globals.jest.fn();
    const event = {
      itemData: {
        clickHandler: _globals.jest.fn()
      }
    };
    const config = (0, _m_date_navigator.getDateNavigator)({}, {
      options: {
        onItemClick: customClick
      }
    });
    config.options.onItemClick(event);
    (0, _globals.expect)(customClick).toHaveBeenCalledWith(event);
    (0, _globals.expect)(event.itemData.clickHandler).toHaveBeenCalledWith(event);
    (0, _globals.expect)(config).toEqual({
      location: 'before',
      name: 'dateNavigator',
      widget: 'dxButtonGroup',
      cssClass: _m_date_navigator.CLASS.container,
      options: {
        stylingMode: 'contained',
        selectionMode: 'none',
        items: [_globals.expect.objectContaining({
          key: _m_date_navigator.DEFAULT_ITEMS[0]
        }), _globals.expect.objectContaining({
          key: _m_date_navigator.DEFAULT_ITEMS[1]
        }), _globals.expect.objectContaining({
          key: _m_date_navigator.DEFAULT_ITEMS[2]
        })],
        onItemClick: _globals.expect.any(Function)
      }
    });
  });
});
