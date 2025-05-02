import { describe, expect, it } from '@jest/globals';
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from '../consts';
import { getScrollbarSize } from './get_scrollbar_size';
describe('getScrollbarSize(element, direction)', () => {
  it('get vertical scrollbar width', () => {
    const containerEl = {
      offsetWidth: 100,
      clientWidth: 83
    };
    expect(getScrollbarSize(containerEl, DIRECTION_VERTICAL)).toEqual(17);
  });
  it('get horizontal scrollbar height', () => {
    const containerEl = {
      offsetHeight: 100,
      clientHeight: 83
    };
    expect(getScrollbarSize(containerEl, DIRECTION_HORIZONTAL)).toEqual(17);
  });
});