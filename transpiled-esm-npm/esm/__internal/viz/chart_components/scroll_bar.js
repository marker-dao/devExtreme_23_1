/* eslint-disable @stylistic/no-mixed-operators */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
import eventsEngine from '../../../common/core/events/core/events_engine';
import { end as dragEventEnd, move as dragEventMove, start as dragEventStart } from '../../../common/core/events/drag';
import { fireEvent } from '../../../common/core/events/utils/index';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { isDefined } from '../../../core/utils/type';
import { Translator2D } from '../translators/translator2d';
const _min = Math.min;
const _max = Math.max;
const MIN_SCROLL_BAR_SIZE = 10;
export const ScrollBar = function (renderer, group) {
  this._translator = new Translator2D({}, {}, {});
  this._scroll = renderer.rect().append(group);
  this._addEvents();
};
function _getXCoord(canvas, pos, offset, width) {
  let x = 0;
  if (pos === 'right') {
    x = canvas.width - canvas.right + offset;
  } else if (pos === 'left') {
    x = canvas.left - offset - width;
  }
  return x;
}
function _getYCoord(canvas, pos, offset, width) {
  let y = 0;
  if (pos === 'top') {
    y = canvas.top - offset;
  } else if (pos === 'bottom') {
    y = canvas.height - canvas.bottom + width + offset;
  }
  return y;
}
ScrollBar.prototype = {
  _addEvents() {
    const scrollElement = this._scroll.element;
    eventsEngine.on(scrollElement, dragEventStart, e => {
      fireEvent({
        type: 'dxc-scroll-start',
        originalEvent: e,
        target: scrollElement
      });
    });
    eventsEngine.on(scrollElement, dragEventMove, e => {
      const dX = -e.offset.x * this._scale;
      const dY = -e.offset.y * this._scale;
      const lx = this._offset - (this._layoutOptions.vertical ? dY : dX) / this._scale;
      this._applyPosition(lx, lx + this._translator.canvasLength / this._scale);
      fireEvent({
        type: 'dxc-scroll-move',
        originalEvent: e,
        target: scrollElement,
        // @ts-expect-error
        offset: {
          x: dX,
          y: dY
        }
      });
    });
    eventsEngine.on(scrollElement, dragEventEnd, e => {
      fireEvent({
        type: 'dxc-scroll-end',
        originalEvent: e,
        target: scrollElement,
        // @ts-expect-error
        offset: {
          x: -e.offset.x * this._scale,
          y: -e.offset.y * this._scale
        }
      });
    });
  },
  update(options) {
    const that = this;
    let position = options.position;
    const isVertical = options.rotated;
    const defaultPosition = isVertical ? 'right' : 'top';
    const secondaryPosition = isVertical ? 'left' : 'bottom';
    if (position !== defaultPosition && position !== secondaryPosition) {
      position = defaultPosition;
    }
    that._scroll.attr({
      rotate: !options.rotated ? -90 : 0,
      rotateX: 0,
      rotateY: 0,
      fill: options.color,
      width: options.width,
      opacity: options.opacity
    });
    that._layoutOptions = {
      width: options.width,
      offset: options.offset,
      vertical: isVertical,
      position
    };
    return that;
  },
  init(range, stick) {
    const that = this;
    const isDiscrete = range.axisType === 'discrete';
    that._translateWithOffset = isDiscrete && !stick && 1 || 0;
    that._translator.update(extend({}, range, {
      minVisible: null,
      maxVisible: null,
      visibleCategories: null
    }, isDiscrete && {
      min: null,
      max: null
    } || {}), that._canvas, {
      isHorizontal: !that._layoutOptions.vertical,
      stick
    });
    return that;
  },
  getOptions() {
    return this._layoutOptions;
  },
  setPane(panes) {
    const position = this._layoutOptions.position;
    let pane;
    if (position === 'left' || position === 'top') {
      pane = panes[0];
    } else {
      pane = panes[panes.length - 1];
    }
    this.pane = pane.name;
    return this;
  },
  updateSize(canvas) {
    this._canvas = extend({}, canvas);
    const options = this._layoutOptions;
    const pos = options.position;
    const offset = options.offset;
    const width = options.width;
    this._scroll.attr({
      translateX: _getXCoord(canvas, pos, offset, width),
      translateY: _getYCoord(canvas, pos, offset, width)
    });
  },
  getMultipleAxesSpacing() {
    return 0;
  },
  estimateMargins() {
    return this.getMargins();
  },
  getMargins() {
    const options = this._layoutOptions;
    const margins = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    margins[options.position] = options.width + options.offset;
    return margins;
  },
  shift(margins) {
    const that = this;
    const options = that._layoutOptions;
    const side = options.position;
    const isVertical = options.vertical;
    const attr = {
      translateX: that._scroll.attr('translateX') ?? 0,
      translateY: that._scroll.attr('translateY') ?? 0
    };
    const shift = margins[side];
    attr[isVertical ? 'translateX' : 'translateY'] += (side === 'left' || side === 'top' ? -1 : 1) * shift;
    that._scroll.attr(attr);
  },
  // Axis like functions
  hideTitle: noop,
  hideOuterElements: noop,
  // Axis like functions
  setPosition(min, max) {
    const that = this;
    const translator = that._translator;
    const minPoint = isDefined(min) ? translator.translate(min, -that._translateWithOffset) : translator.translate('canvas_position_start');
    const maxPoint = isDefined(max) ? translator.translate(max, that._translateWithOffset) : translator.translate('canvas_position_end');
    that._offset = _min(minPoint, maxPoint);
    that._scale = translator.getScale(min, max);
    that._applyPosition(_min(minPoint, maxPoint), _max(minPoint, maxPoint));
  },
  customPositionIsAvailable() {
    return false;
  },
  dispose() {
    this._scroll.dispose();
    this._scroll = this._translator = null;
  },
  _applyPosition(x1, x2) {
    const that = this;
    const visibleArea = that._translator.getCanvasVisibleArea();
    const min = visibleArea.min;
    const max = visibleArea.max;
    if (max <= min) {
      return;
    }
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }
    x1 = Math.max(x1, min);
    x2 = Math.min(x2, max);
    if (x2 - x1 < MIN_SCROLL_BAR_SIZE) {
      if (max - min < MIN_SCROLL_BAR_SIZE) {
        x1 = min;
        x2 = max;
      } else {
        const center = (x1 + x2) / 2;
        x1 = center - MIN_SCROLL_BAR_SIZE / 2;
        x2 = center + MIN_SCROLL_BAR_SIZE / 2;
        if (x1 < min) {
          x1 = min;
          x2 = min + MIN_SCROLL_BAR_SIZE;
        } else if (x2 > max) {
          x2 = max;
          x1 = max - MIN_SCROLL_BAR_SIZE;
        }
      }
    }
    x1 = Math.max(x1, min);
    x2 = Math.min(x2, max);
    const height = Math.max(x2 - x1, 0);
    that._scroll.attr({
      y: x1,
      height
    });
  }
};