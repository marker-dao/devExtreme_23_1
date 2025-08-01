/**
* DevExtreme (esm/__internal/scheduler/header/m_date_navigator.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import { CLASS, DEFAULT_ITEMS, getDateNavigator, ITEMS_NAME } from './m_date_navigator';
describe('getDateNavigator', () => {
  it('should return default options in case of item is empty', () => {
    expect(getDateNavigator({}, {})).toEqual({
      location: 'before',
      name: 'dateNavigator',
      widget: 'dxButtonGroup',
      cssClass: CLASS.container,
      options: {
        stylingMode: 'contained',
        selectionMode: 'none',
        items: [expect.objectContaining({
          key: DEFAULT_ITEMS[0]
        }), expect.objectContaining({
          key: DEFAULT_ITEMS[1]
        }), expect.objectContaining({
          key: DEFAULT_ITEMS[2]
        })],
        onItemClick: expect.any(Function)
      }
    });
  });
  it('should return replace items in correct order with custom options', () => {
    expect(getDateNavigator({}, {
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
      cssClass: CLASS.container,
      customField: 'customField',
      options: {
        stylingMode: 'contained',
        selectionMode: 'none',
        customOption: 'customOption',
        items: [expect.objectContaining({
          key: ITEMS_NAME.calendarButton
        }), expect.objectContaining({
          key: ITEMS_NAME.nextButton
        }), expect.objectContaining({
          key: 'customButton'
        })],
        onItemClick: expect.any(Function)
      }
    });
  });
  it('should handle default and custom click callback', () => {
    const customClick = jest.fn();
    const event = {
      itemData: {
        clickHandler: jest.fn()
      }
    };
    const config = getDateNavigator({}, {
      options: {
        onItemClick: customClick
      }
    });
    config.options.onItemClick(event);
    expect(customClick).toHaveBeenCalledWith(event);
    expect(event.itemData.clickHandler).toHaveBeenCalledWith(event);
    expect(config).toEqual({
      location: 'before',
      name: 'dateNavigator',
      widget: 'dxButtonGroup',
      cssClass: CLASS.container,
      options: {
        stylingMode: 'contained',
        selectionMode: 'none',
        items: [expect.objectContaining({
          key: DEFAULT_ITEMS[0]
        }), expect.objectContaining({
          key: DEFAULT_ITEMS[1]
        }), expect.objectContaining({
          key: DEFAULT_ITEMS[2]
        })],
        onItemClick: expect.any(Function)
      }
    });
  });
});
