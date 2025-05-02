import { describe, expect, it, jest } from '@jest/globals';
import { filterOffsets, getAreaFromElement, getAreaFromObject, getDragOffsets, getMovingSides } from './utils';
jest.mock('@js/core/utils/size', () => ({
  getOuterWidth: _ref => {
    let {
      outerWidth
    } = _ref;
    return outerWidth;
  },
  getInnerWidth: _ref2 => {
    let {
      innerWidth
    } = _ref2;
    return innerWidth;
  },
  getOuterHeight: _ref3 => {
    let {
      outerHeight
    } = _ref3;
    return outerHeight;
  },
  getInnerHeight: _ref4 => {
    let {
      innerHeight
    } = _ref4;
    return innerHeight;
  },
  getOffset: _ref5 => {
    let {
      top,
      left
    } = _ref5;
    return {
      left,
      top
    };
  }
}));
const window = {
  innerWidth: 101,
  innerHeight: 102,
  pageXOffset: 90,
  pageYOffset: 101
};
// NOTE: for the "isWindow" check
window.window = window;
describe('Utils', () => {
  describe('getMovingSides', () => {
    it('should detect top side', () => {
      let el = {
        className: 'dx-resizable-handle-corner-top-left'
      };
      expect(getMovingSides(el)).toMatchObject({
        top: true
      });
      el = {
        className: 'dx-resizable-handle-top'
      };
      expect(getMovingSides(el)).toMatchObject({
        top: true
      });
      el = {
        className: 'dx-resizable-handle-corner-top-right'
      };
      expect(getMovingSides(el)).toMatchObject({
        top: true
      });
    });
    it('should detect bottom side', () => {
      let el = {
        className: 'dx-resizable-handle-bottom'
      };
      expect(getMovingSides(el)).toMatchObject({
        bottom: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-left'
      };
      expect(getMovingSides(el)).toMatchObject({
        bottom: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-right'
      };
      expect(getMovingSides(el)).toMatchObject({
        bottom: true
      });
    });
    it('should detect right side', () => {
      let el = {
        className: 'dx-resizable-handle-right'
      };
      expect(getMovingSides(el)).toMatchObject({
        right: true
      });
      el = {
        className: 'dx-resizable-handle-corner-top-right'
      };
      expect(getMovingSides(el)).toMatchObject({
        right: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-right'
      };
      expect(getMovingSides(el)).toMatchObject({
        right: true
      });
    });
    it('should detect left side', () => {
      let el = {
        className: 'dx-resizable-handle-left'
      };
      expect(getMovingSides(el)).toMatchObject({
        left: true
      });
      el = {
        className: 'dx-resizable-handle-corner-top-left'
      };
      expect(getMovingSides(el)).toMatchObject({
        left: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-left'
      };
      expect(getMovingSides(el)).toMatchObject({
        left: true
      });
    });
  });
  describe('Get area', () => {
    const emptyEl = {
      outerWidth: 0,
      outerHeight: 0,
      innerWidth: 0,
      innerHeight: 0,
      style: {
        borderLeftWidth: '0',
        borderTopWidth: '0'
      }
    };
    describe('getAreaFromElement', () => {
      it('should exclude resizable element\'s border width', () => {
        const areaEl = {
          innerWidth: 101,
          innerHeight: 102,
          left: 10,
          top: 50,
          style: {
            borderLeftWidth: '0',
            borderTopWidth: '0'
          }
        };
        const resizableEl = {
          innerWidth: 30,
          innerHeight: 40,
          outerWidth: 32,
          outerHeight: 44,
          style: {
            borderLeftWidth: '5',
            borderTopWidth: '6'
          }
        };
        expect(getAreaFromElement(areaEl, resizableEl)).toEqual({
          width: 39,
          height: 18,
          offset: {
            left: 15,
            top: 56
          }
        });
      });
      it('should include area element\'s left/top border width', () => {
        const areaEl = {
          innerWidth: 101,
          innerHeight: 102,
          left: 10,
          top: 50,
          style: {
            borderLeftWidth: '5',
            borderTopWidth: '6'
          }
        };
        expect(getAreaFromElement(areaEl, emptyEl)).toEqual({
          width: 101,
          height: 102,
          offset: {
            left: 15,
            top: 56
          }
        });
      });
      it('should ignore offset if element is window', () => {
        expect(getAreaFromElement(window, emptyEl)).toEqual({
          width: 101,
          height: 102,
          offset: {
            left: 0,
            top: 0
          }
        });
      });
      it('should get area from element innerWidth/innerHeight/offset ', () => {
        const areaEl = {
          innerWidth: 101,
          innerHeight: 102,
          top: 22,
          left: 33,
          style: {
            borderLeftWidth: '0',
            borderTopWidth: '0'
          }
        };
        expect(getAreaFromElement(areaEl, emptyEl)).toEqual({
          width: 101,
          height: 102,
          offset: {
            left: 33,
            top: 22
          }
        });
      });
    });
    describe('getAreaFromObject', () => {
      it('should exclude resizable element\'s border width', () => {
        const resizableEl = {
          innerWidth: 10,
          innerHeight: 12,
          outerWidth: 5,
          outerHeight: 10,
          style: {
            borderLeftWidth: '2',
            borderTopWidth: '3'
          }
        };
        expect(getAreaFromObject({
          left: 30,
          top: 40,
          right: 80,
          bottom: 70
        }, resizableEl)).toEqual({
          width: 35,
          height: 8,
          offset: {
            left: 32,
            top: 43
          }
        });
      });
      it('should build area from the object', () => {
        expect(getAreaFromObject({
          left: 3,
          top: 4,
          right: 5,
          bottom: 7
        }, emptyEl)).toEqual({
          width: 2,
          height: 3,
          offset: {
            left: 3,
            top: 4
          }
        });
      });
    });
  });
  describe('getDragOffsets', () => {
    it('should calculate drag limitations by area size and handle element size', () => {
      const handleEl = {
        outerWidth: 4,
        outerHeight: 6,
        left: 30,
        top: 30
      };
      const area = {
        width: 10,
        height: 20,
        offset: {
          left: 0,
          top: 0
        }
      };
      expect(getDragOffsets(area, handleEl, {})).toEqual({
        maxLeftOffset: 30,
        maxRightOffset: -24,
        maxTopOffset: 30,
        maxBottomOffset: -16
      });
    });
    it('should take into account area\'s offset', () => {
      const handleEl = {
        outerWidth: 4,
        outerHeight: 6,
        left: 30,
        top: 30
      };
      const area = {
        width: 10,
        height: 20,
        offset: {
          left: 5,
          top: 6
        }
      };
      expect(getDragOffsets(area, handleEl, {})).toEqual({
        maxLeftOffset: 25,
        maxRightOffset: -19,
        maxTopOffset: 24,
        maxBottomOffset: -10
      });
    });
    it('should take into account window\'s page offset', () => {
      const handleEl = {
        outerWidth: 4,
        outerHeight: 6,
        left: 30,
        top: 30
      };
      const area = {
        width: 10,
        height: 20,
        offset: {
          left: 0,
          top: 0
        }
      };
      expect(getDragOffsets(area, handleEl, window)).toEqual({
        maxBottomOffset: 85,
        maxLeftOffset: -60,
        maxRightOffset: 66,
        maxTopOffset: -71
      });
    });
  });
  describe('filterOffsets', () => {
    it('should exclude horizontal offset if top/bottom handle used', () => {
      const offset = {
        x: 100,
        y: 200
      };
      const handleEl = {
        className: 'dx-resizable-handle-right'
      };
      expect(filterOffsets(offset, handleEl)).toEqual({
        x: 100,
        y: 0
      });
    });
    it('should exclude vertical offset if left/right handle used', () => {
      const offset = {
        x: 100,
        y: 200
      };
      const handleEl = {
        className: 'dx-resizable-handle-bottom'
      };
      expect(filterOffsets(offset, handleEl)).toEqual({
        x: 0,
        y: 200
      });
    });
    it('should include all offsets for corner handle', () => {
      const offset = {
        x: 100,
        y: 200
      };
      const handleEl = {
        className: 'dx-resizable-handle-corner-top-right'
      };
      expect(filterOffsets(offset, handleEl)).toEqual({
        x: 100,
        y: 200
      });
    });
    it('should return zero if handle in not used', () => {
      const offset = {
        x: 100,
        y: 100
      };
      const handleEl = {
        className: ''
      };
      expect(filterOffsets(offset, handleEl)).toEqual({
        x: 0,
        y: 0
      });
    });
  });
});