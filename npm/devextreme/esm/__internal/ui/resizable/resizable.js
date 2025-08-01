/**
* DevExtreme (esm/__internal/ui/resizable/resizable.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { locate, move } from '../../../common/core/animation/translator';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { end as dragEventEnd, move as dragEventMove, start as dragEventStart } from '../../../common/core/events/drag';
import { addNamespace } from '../../../common/core/events/utils/index';
import { triggerResizeEvent } from '../../../common/core/events/visibility_change';
import registerComponent from '../../../core/component_registrator';
import $ from '../../../core/renderer';
// @ts-expect-error ts-error
import { pairToObject } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { fitIntoRange, inRange } from '../../../core/utils/math';
import { getHeight, getInnerHeight, getInnerWidth, getOuterHeight, getOuterWidth, getWidth } from '../../../core/utils/size';
import { isFunction, isPlainObject, isWindow } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import DOMComponent from '../../core/widget/dom_component';
const RESIZABLE = 'dxResizable';
const RESIZABLE_CLASS = 'dx-resizable';
const RESIZABLE_RESIZING_CLASS = 'dx-resizable-resizing';
const RESIZABLE_HANDLE_CLASS = 'dx-resizable-handle';
const RESIZABLE_HANDLE_TOP_CLASS = 'dx-resizable-handle-top';
const RESIZABLE_HANDLE_BOTTOM_CLASS = 'dx-resizable-handle-bottom';
const RESIZABLE_HANDLE_LEFT_CLASS = 'dx-resizable-handle-left';
const RESIZABLE_HANDLE_RIGHT_CLASS = 'dx-resizable-handle-right';
const RESIZABLE_HANDLE_CORNER_CLASS = 'dx-resizable-handle-corner';
const DRAGSTART_START_EVENT_NAME = addNamespace(dragEventStart, RESIZABLE);
const DRAGSTART_EVENT_NAME = addNamespace(dragEventMove, RESIZABLE);
const DRAGSTART_END_EVENT_NAME = addNamespace(dragEventEnd, RESIZABLE);
const SIDE_BORDER_WIDTH_STYLES = {
  left: 'borderLeftWidth',
  top: 'borderTopWidth',
  right: 'borderRightWidth',
  bottom: 'borderBottomWidth'
};
class Resizable extends DOMComponent {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      handles: 'all',
      // NOTE: does not affect proportional resize
      step: '1',
      stepPrecision: 'simple',
      minWidth: 30,
      maxWidth: Infinity,
      minHeight: 30,
      maxHeight: Infinity,
      roundStepValue: true,
      keepAspectRatio: true
    });
  }
  _init() {
    super._init();
    this.$element().addClass(RESIZABLE_CLASS);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderHandles();
  }
  _render() {
    super._render();
    this._renderActions();
  }
  _renderActions() {
    this._resizeStartAction = this._createActionByOption('onResizeStart');
    this._resizeEndAction = this._createActionByOption('onResizeEnd');
    this._resizeAction = this._createActionByOption('onResize');
  }
  _renderHandles() {
    this._handles = [];
    const {
      handles
    } = this.option();
    if (handles === 'none' || !handles) {
      return;
    }
    const directions = handles === 'all' ? ['top', 'bottom', 'left', 'right'] : handles.split(' ');
    const activeHandlesMap = {};
    each(directions, (index, handleName) => {
      activeHandlesMap[handleName] = true;
      this._renderHandle(handleName);
    });
    if (activeHandlesMap.bottom && activeHandlesMap.right) {
      this._renderHandle('corner-bottom-right');
    }
    if (activeHandlesMap.bottom && activeHandlesMap.left) {
      this._renderHandle('corner-bottom-left');
    }
    if (activeHandlesMap.top && activeHandlesMap.right) {
      this._renderHandle('corner-top-right');
    }
    if (activeHandlesMap.top && activeHandlesMap.left) {
      this._renderHandle('corner-top-left');
    }
    this._attachEventHandlers();
  }
  _renderHandle(handleName) {
    const $handle = $('<div>').addClass(RESIZABLE_HANDLE_CLASS).addClass(`${RESIZABLE_HANDLE_CLASS}-${handleName}`).appendTo(this.$element());
    this._handles.push($handle);
  }
  _attachEventHandlers() {
    if (this.option('disabled')) {
      return;
    }
    const handlers = {};
    handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
    handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
    handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
    this._handles.forEach(handleElement => {
      eventsEngine.on(handleElement, handlers, {
        direction: 'both',
        immediate: true
      });
    });
  }
  _detachEventHandlers() {
    this._handles.forEach(handleElement => {
      eventsEngine.off(handleElement);
    });
  }
  _toggleEventHandlers(shouldAttachEvents) {
    if (shouldAttachEvents) {
      this._attachEventHandlers();
    } else {
      this._detachEventHandlers();
    }
  }
  _getElementSize() {
    const $element = this.$element();
    // @ts-expect-error ts-error
    return $element.css('boxSizing') === 'border-box' ? {
      width: getOuterWidth($element),
      height: getOuterHeight($element)
    } : {
      width: getWidth($element),
      height: getHeight($element)
    };
  }
  _dragStartHandler(e) {
    var _this$_resizeStartAct;
    const $element = this.$element();
    if ($element.is('.dx-state-disabled, .dx-state-disabled *')) {
      e.cancel = true;
      return;
    }
    this._toggleResizingClass(true);
    this._movingSides = this._getMovingSides(e);
    this._elementLocation = locate($element);
    this._elementSize = this._getElementSize();
    this._renderDragOffsets(e);
    (_this$_resizeStartAct = this._resizeStartAction) === null || _this$_resizeStartAct === void 0 || _this$_resizeStartAct.call(this, {
      event: e,
      width: this._elementSize.width,
      height: this._elementSize.height,
      handles: this._movingSides
    });
    // @ts-expect-error ts-error
    e.targetElements = null;
  }
  _toggleResizingClass(value) {
    this.$element().toggleClass(RESIZABLE_RESIZING_CLASS, value);
  }
  _renderDragOffsets(e) {
    const area = this._getArea();
    if (!area) {
      return;
    }
    const $handle = $(e.target).closest(`.${RESIZABLE_HANDLE_CLASS}`);
    const handleWidth = getOuterWidth($handle);
    const handleHeight = getOuterHeight($handle);
    const handleOffset = $handle.offset() ?? {
      left: 0,
      top: 0
    };
    const areaOffset = area.offset;
    const scrollOffset = this._getAreaScrollOffset();
    this._leftMaxOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
    e.maxLeftOffset = this._leftMaxOffset;
    this._rightMaxOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
    e.maxRightOffset = this._rightMaxOffset;
    this._topMaxOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
    e.maxTopOffset = this._topMaxOffset;
    this._bottomMaxOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY;
    e.maxBottomOffset = this._bottomMaxOffset;
  }
  _getBorderWidth($element, direction) {
    if (isWindow($element.get(0))) return 0;
    // @ts-expect-error ts-error
    const borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
    return parseInt(borderWidth, 10) || 0;
  }
  _proportionate(direction, value) {
    const size = this._elementSize;
    const factor = direction === 'x' ? size.width / size.height : size.height / size.width;
    return value * factor;
  }
  _getProportionalDelta(delta) {
    const {
      x,
      y
    } = delta;
    const proportionalY = this._proportionate('y', x);
    if (proportionalY >= y) {
      return {
        x,
        y: proportionalY
      };
    }
    const proportionalX = this._proportionate('x', y);
    if (proportionalX >= x) {
      return {
        x: proportionalX,
        y
      };
    }
    return {
      x: 0,
      y: 0
    };
  }
  _getDirectionName(axis) {
    const sides = this._movingSides;
    if (axis === 'x') {
      return sides.left ? 'left' : 'right';
    }
    return sides.top ? 'top' : 'bottom';
  }
  _fitIntoArea(axis, value) {
    const directionName = this._getDirectionName(axis);
    return Math.min(value, this[`_${directionName}MaxOffset`] ?? Infinity);
  }
  _fitDeltaProportionally(delta) {
    let fittedDelta = _extends({}, delta);
    const size = this._elementSize;
    const {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    const calculateWidth = () => size.width + fittedDelta.x;
    const calculateHeight = () => size.height + fittedDelta.y;
    const getFittedWidth = () => fitIntoRange(calculateWidth(), minWidth, maxWidth);
    const getFittedHeight = () => fitIntoRange(calculateHeight(), minHeight, maxHeight);
    const isInArea = axis => fittedDelta[axis] === this._fitIntoArea(axis, fittedDelta[axis]);
    const isFittedX = () => inRange(calculateWidth(), minWidth, maxWidth) && isInArea('x');
    const isFittedY = () => inRange(calculateHeight(), minHeight, maxHeight) && isInArea('y');
    if (!isFittedX()) {
      const x = this._fitIntoArea('x', getFittedWidth() - size.width);
      fittedDelta = {
        x,
        y: this._proportionate('y', x)
      };
    }
    if (!isFittedY()) {
      const y = this._fitIntoArea('y', getFittedHeight() - size.height);
      fittedDelta = {
        x: this._proportionate('x', y),
        y
      };
    }
    return isFittedX() && isFittedY() ? fittedDelta : {
      x: 0,
      y: 0
    };
  }
  _fitDelta(delta) {
    const {
      x,
      y
    } = delta;
    const size = this._elementSize;
    const {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    return {
      x: fitIntoRange(size.width + x, minWidth, maxWidth) - size.width,
      y: fitIntoRange(size.height + y, minHeight, maxHeight) - size.height
    };
  }
  _getDeltaByOffset(offset) {
    const sides = this._movingSides;
    const shouldKeepAspectRatio = this._isCornerHandler(sides) && this.option('keepAspectRatio');
    let delta = {
      x: offset.x * (sides.left ? -1 : 1),
      y: offset.y * (sides.top ? -1 : 1)
    };
    if (shouldKeepAspectRatio) {
      const proportionalDelta = this._getProportionalDelta(delta);
      const fittedProportionalDelta = this._fitDeltaProportionally(proportionalDelta);
      delta = fittedProportionalDelta;
    } else {
      const fittedDelta = this._fitDelta(delta);
      const roundedFittedDelta = this._roundByStep(fittedDelta);
      delta = roundedFittedDelta;
    }
    return delta;
  }
  _updatePosition(delta, elementDimensions) {
    const {
      width,
      height
    } = elementDimensions;
    const location = this._elementLocation;
    const sides = this._movingSides;
    const $element = this.$element();
    const elementRect = this._getElementSize();
    const offsetTop = delta.y * (sides.top ? -1 : 1) - ((elementRect.height || height) - height);
    const offsetLeft = delta.x * (sides.left ? -1 : 1) - ((elementRect.width || width) - width);
    move($element, {
      top: location.top + (sides.top ? offsetTop : 0),
      left: location.left + (sides.left ? offsetLeft : 0)
    });
  }
  _dragHandler(e) {
    const offset = this._getOffset(e);
    const delta = this._getDeltaByOffset(offset);
    const dimensions = this._updateDimensions(delta);
    this._updatePosition(delta, dimensions);
    this._triggerResizeAction(e, dimensions);
  }
  _updateDimensions(delta) {
    const isAbsoluteSize = size => size.substring(size.length - 2) === 'px';
    const {
      stepPrecision
    } = this.option();
    const isStepPrecisionStrict = stepPrecision === 'strict';
    const size = this._elementSize;
    const width = size.width + delta.x;
    const height = size.height + delta.y;
    const elementStyle = this.$element()[0].style;
    const shouldRenderWidth = delta.x || isStepPrecisionStrict || isAbsoluteSize(elementStyle.width);
    const shouldRenderHeight = delta.y || isStepPrecisionStrict || isAbsoluteSize(elementStyle.height);
    if (shouldRenderWidth) this.option({
      width
    });
    if (shouldRenderHeight) this.option({
      height
    });
    return {
      width: shouldRenderWidth ? width : size.width,
      height: shouldRenderHeight ? height : size.height
    };
  }
  _triggerResizeAction(e, elementDimensions) {
    var _this$_resizeAction;
    const {
      width,
      height
    } = elementDimensions;
    (_this$_resizeAction = this._resizeAction) === null || _this$_resizeAction === void 0 || _this$_resizeAction.call(this, {
      event: e,
      width: this.option('width') || width,
      height: this.option('height') || height,
      handles: this._movingSides
    });
    triggerResizeEvent(this.$element());
  }
  _isCornerHandler(sides) {
    // eslint-disable-next-line no-bitwise
    return Object.values(sides).reduce((xor, value) => xor ^ value, 0) === 0;
  }
  _getOffset(e) {
    const {
      offset
    } = e;
    const sides = this._movingSides;
    if (!sides.left && !sides.right) offset.x = 0;
    if (!sides.top && !sides.bottom) offset.y = 0;
    return offset;
  }
  _roundByStep(delta) {
    const {
      stepPrecision
    } = this.option();
    return stepPrecision === 'strict' ? this._roundStrict(delta) : this._roundNotStrict(delta);
  }
  _getSteps() {
    const {
      step,
      roundStepValue
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pairToObject(step, !roundStepValue);
  }
  _roundNotStrict(delta) {
    const {
      h,
      v
    } = this._getSteps();
    return {
      x: delta.x - delta.x % h,
      y: delta.y - delta.y % v
    };
  }
  _roundStrict(delta) {
    const sides = this._movingSides;
    const offset = {
      x: delta.x * (sides.left ? -1 : 1),
      y: delta.y * (sides.top ? -1 : 1)
    };
    const steps = this._getSteps();
    const location = this._elementLocation;
    const size = this._elementSize;
    const xPos = sides.left ? location.left : location.left + size.width;
    const yPos = sides.top ? location.top : location.top + size.height;
    const newXShift = (xPos + offset.x) % steps.h;
    const newYShift = (yPos + offset.y) % steps.v;
    const sign = Math.sign || (x => {
      const offsetX = +x;
      if (offsetX === 0 || isNaN(offsetX)) {
        return offsetX;
      }
      return offsetX > 0 ? 1 : -1;
    });
    const separatorOffset = (stepValue, offsetValue) => (1 + sign(offsetValue) * 0.2) % 1 * stepValue;
    const isSmallOffset = (offsetValue, stepValue) => Math.abs(offsetValue) < 0.2 * stepValue;
    let newOffsetX = offset.x - newXShift;
    let newOffsetY = offset.y - newYShift;
    if (newXShift > separatorOffset(steps.h, offset.x)) {
      newOffsetX += steps.h;
    }
    if (newYShift > separatorOffset(steps.v, offset.y)) {
      newOffsetY += steps.v;
    }
    const roundedOffset = {
      x: (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0,
      y: (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0
    };
    return {
      x: roundedOffset.x * (sides.left ? -1 : 1),
      y: roundedOffset.y * (sides.top ? -1 : 1)
    };
  }
  _getMovingSides(e) {
    const $target = $(e.target);
    const hasCornerTopLeftClass = $target.hasClass(`${RESIZABLE_HANDLE_CORNER_CLASS}-top-left`);
    const hasCornerTopRightClass = $target.hasClass(`${RESIZABLE_HANDLE_CORNER_CLASS}-top-right`);
    const hasCornerBottomLeftClass = $target.hasClass(`${RESIZABLE_HANDLE_CORNER_CLASS}-bottom-left`);
    const hasCornerBottomRightClass = $target.hasClass(`${RESIZABLE_HANDLE_CORNER_CLASS}-bottom-right`);
    return {
      top: $target.hasClass(RESIZABLE_HANDLE_TOP_CLASS) || hasCornerTopLeftClass || hasCornerTopRightClass,
      left: $target.hasClass(RESIZABLE_HANDLE_LEFT_CLASS) || hasCornerTopLeftClass || hasCornerBottomLeftClass,
      bottom: $target.hasClass(RESIZABLE_HANDLE_BOTTOM_CLASS) || hasCornerBottomLeftClass || hasCornerBottomRightClass,
      right: $target.hasClass(RESIZABLE_HANDLE_RIGHT_CLASS) || hasCornerTopRightClass || hasCornerBottomRightClass
    };
  }
  _getArea() {
    let {
      area
    } = this.option();
    if (isFunction(area)) {
      area = area.call(this);
    }
    if (isPlainObject(area)) {
      return this._getAreaFromObject(area);
    }
    return this._getAreaFromElement(area);
  }
  _getAreaScrollOffset() {
    const {
      area
    } = this.option();
    const isElement = !isFunction(area) && !isPlainObject(area);
    const scrollOffset = {
      scrollY: 0,
      scrollX: 0
    };
    if (isElement) {
      const areaElement = $(area)[0];
      if (isWindow(areaElement)) {
        scrollOffset.scrollX = areaElement.pageXOffset;
        scrollOffset.scrollY = areaElement.pageYOffset;
      }
    }
    return scrollOffset;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _getAreaFromObject(area) {
    const result = {
      width: area.right - area.left,
      height: area.bottom - area.top,
      offset: {
        left: area.left,
        top: area.top
      }
    };
    this._correctAreaGeometry(result);
    return result;
  }
  _getAreaFromElement(area) {
    const $area = $(area);
    if (!$area.length) {
      return undefined;
    }
    const result = {
      width: getInnerWidth($area),
      height: getInnerHeight($area),
      offset: extend({
        top: 0,
        left: 0
      }, isWindow($area[0]) ? {} : $area.offset())
    };
    this._correctAreaGeometry(result, $area);
    return result;
  }
  _correctAreaGeometry(result, $area) {
    const areaBorderLeft = $area ? this._getBorderWidth($area, 'left') : 0;
    const areaBorderTop = $area ? this._getBorderWidth($area, 'top') : 0;
    result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), 'left');
    result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), 'top');
    result.width -= getOuterWidth(this.$element()) - getInnerWidth(this.$element());
    result.height -= getOuterHeight(this.$element()) - getInnerHeight(this.$element());
  }
  _dragEndHandler(e) {
    var _this$_resizeEndActio;
    const $element = this.$element();
    (_this$_resizeEndActio = this._resizeEndAction) === null || _this$_resizeEndActio === void 0 || _this$_resizeEndActio.call(this, {
      event: e,
      width: getOuterWidth($element),
      height: getOuterHeight($element),
      handles: this._movingSides
    });
    this._toggleResizingClass(false);
  }
  _renderWidth(width) {
    const {
      minWidth,
      maxWidth
    } = this.option();
    this.option('width', fitIntoRange(width, minWidth, maxWidth));
  }
  _renderHeight(height) {
    const {
      minHeight,
      maxHeight
    } = this.option();
    this.option('height', fitIntoRange(height, minHeight, maxHeight));
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'disabled':
        this._toggleEventHandlers(!value);
        super._optionChanged(args);
        break;
      case 'handles':
        this._invalidate();
        break;
      case 'minWidth':
      case 'maxWidth':
        if (hasWindow()) {
          this._renderWidth(getOuterWidth(this.$element()));
        }
        break;
      case 'minHeight':
      case 'maxHeight':
        if (hasWindow()) {
          this._renderHeight(getOuterHeight(this.$element()));
        }
        break;
      case 'onResize':
      case 'onResizeStart':
      case 'onResizeEnd':
        this._renderActions();
        break;
      case 'area':
      case 'stepPrecision':
      case 'step':
      case 'roundStepValue':
      case 'keepAspectRatio':
        break;
      default:
        super._optionChanged(args);
        break;
    }
  }
  _clean() {
    this.$element().find(`.${RESIZABLE_HANDLE_CLASS}`).remove();
  }
  _useTemplates() {
    return false;
  }
}
registerComponent(RESIZABLE, Resizable);
export default Resizable;
