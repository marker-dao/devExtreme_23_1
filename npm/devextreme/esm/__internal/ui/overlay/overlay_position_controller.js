/**
* DevExtreme (esm/__internal/ui/overlay/overlay_position_controller.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import positionUtils from '../../../common/core/animation/position';
import { locate, move, resetPosition } from '../../../common/core/animation/translator';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { isDefined, isEvent, isString, isWindow } from '../../../core/utils/type';
import swatch from '../../core/utils/swatch_container';
import windowUtils from '../../core/utils/m_window';
const window = windowUtils.getWindow();
export const OVERLAY_POSITION_ALIASES = {
  top: {
    my: 'top center',
    at: 'top center'
  },
  bottom: {
    my: 'bottom center',
    at: 'bottom center'
  },
  right: {
    my: 'right center',
    at: 'right center'
  },
  left: {
    my: 'left center',
    at: 'left center'
  },
  center: {
    my: 'center',
    at: 'center'
  },
  'right bottom': {
    my: 'right bottom',
    at: 'right bottom'
  },
  'right top': {
    my: 'right top',
    at: 'right top'
  },
  'left bottom': {
    my: 'left bottom',
    at: 'left bottom'
  },
  'left top': {
    my: 'left top',
    at: 'left top'
  }
};
const DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
export const isPositionAlignment = position => isString(position);
export class OverlayPositionController {
  constructor(params) {
    const {
      properties,
      elements
    } = params;
    const {
      container,
      position,
      visualContainer
    } = properties;
    const {
      $root,
      $content,
      $wrapper
    } = elements;
    this._properties = properties;
    this._$root = $root;
    this._$content = $content;
    this._$wrapper = $wrapper;
    this._$markupContainer = undefined;
    this._$visualContainer = undefined;
    this._shouldRenderContentInitialPosition = true;
    this._visualPosition = undefined;
    this._initialPosition = undefined;
    this._previousVisualPosition = undefined;
    this.updateContainer(container);
    this.updatePosition(position);
    this.updateVisualContainer(visualContainer);
  }
  get $container() {
    // NOTE: swatch classes can be updated runtime
    this.updateContainer();
    return this._$markupContainer;
  }
  get $visualContainer() {
    return this._$visualContainer;
  }
  get position() {
    return this._position;
  }
  set fixWrapperPosition(fixWrapperPosition) {
    this._properties._fixWrapperPosition = fixWrapperPosition;
    this.styleWrapperPosition();
  }
  set restorePosition(restorePosition) {
    this._properties.restorePosition = restorePosition;
  }
  updatePosition(position) {
    this._properties.position = position;
    this._position = this._normalizePosition(position);
    this.updateVisualContainer();
  }
  updateContainer(container) {
    const element = container ?? this._properties.container;
    if (isDefined(container)) {
      this._properties.container = element;
    }
    if (element) {
      this._$markupContainer = $(element);
    } else if (this._$root) {
      this._$markupContainer = swatch.getSwatchContainer(this._$root);
    }
    this.updateVisualContainer(this._properties.visualContainer);
  }
  updateVisualContainer(visualContainer) {
    if (isDefined(visualContainer)) {
      this._properties.visualContainer = visualContainer;
    }
    this._$visualContainer = this._getVisualContainer();
  }
  restorePositionOnNextRender(value) {
    // NOTE: no visual position means it's a first render
    this._shouldRenderContentInitialPosition = value || !this._visualPosition;
  }
  openingHandled() {
    const shouldRestorePosition = Boolean(this._properties.restorePosition);
    this.restorePositionOnNextRender(shouldRestorePosition);
  }
  detectVisualPositionChange(event) {
    this._updateVisualPositionValue();
    this._raisePositionedEvents(event);
  }
  positionContent() {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      if (this._$content) {
        move(this._$content, this._visualPosition);
      }
      this.detectVisualPositionChange();
    }
  }
  positionWrapper() {
    if (this._$visualContainer) {
      positionUtils.setup(this._$wrapper, {
        my: 'top left',
        at: 'top left',
        of: this._$visualContainer
      });
    }
  }
  styleWrapperPosition() {
    var _this$$visualContaine, _this$_$wrapper;
    const isContainerWindow = isWindow((_this$$visualContaine = this.$visualContainer) === null || _this$$visualContaine === void 0 ? void 0 : _this$$visualContaine.get(0));
    const useFixed = isContainerWindow || this._properties._fixWrapperPosition;
    const positionStyle = useFixed ? 'fixed' : 'absolute';
    (_this$_$wrapper = this._$wrapper) === null || _this$_$wrapper === void 0 || _this$_$wrapper.css('position', positionStyle);
  }
  clean() {
    this._$root = undefined;
    this._$content = undefined;
    this._$wrapper = undefined;
    this._$markupContainer = undefined;
    this._$visualContainer = undefined;
  }
  _updateVisualPositionValue() {
    this._previousVisualPosition = this._visualPosition;
    if (this._$content) {
      this._visualPosition = locate(this._$content);
    }
  }
  _renderContentInitialPosition() {
    var _this$_$wrapper2, _this$_$wrapper3, _this$_$wrapper4;
    this._renderBoundaryOffset();
    if (this._$content) {
      resetPosition(this._$content);
    }
    const wrapperOverflow = ((_this$_$wrapper2 = this._$wrapper) === null || _this$_$wrapper2 === void 0 ? void 0 : _this$_$wrapper2.css('overflow')) ?? '';
    (_this$_$wrapper3 = this._$wrapper) === null || _this$_$wrapper3 === void 0 || _this$_$wrapper3.css('overflow', 'hidden');
    if (!this._properties._skipContentPositioning) {
      const resultPosition = positionUtils.setup(this._$content, this._position);
      this._initialPosition = resultPosition;
    }
    (_this$_$wrapper4 = this._$wrapper) === null || _this$_$wrapper4 === void 0 || _this$_$wrapper4.css('overflow', wrapperOverflow);
    this.detectVisualPositionChange();
  }
  _raisePositionedEvents(event) {
    var _this$_properties$onP, _this$_properties2;
    const previousPosition = this._previousVisualPosition;
    const newPosition = this._visualPosition;
    const isTopEqual = (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.top) === (newPosition === null || newPosition === void 0 ? void 0 : newPosition.top);
    const isLeftEqual = (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.left) === (newPosition === null || newPosition === void 0 ? void 0 : newPosition.left);
    const isVisualPositionChanged = !(isTopEqual && isLeftEqual);
    if (isVisualPositionChanged) {
      var _this$_properties$onV, _this$_properties;
      (_this$_properties$onV = (_this$_properties = this._properties).onVisualPositionChanged) === null || _this$_properties$onV === void 0 || _this$_properties$onV.call(_this$_properties, {
        event,
        previousPosition,
        position: newPosition
      });
    }
    (_this$_properties$onP = (_this$_properties2 = this._properties).onPositioned) === null || _this$_properties$onP === void 0 || _this$_properties$onP.call(_this$_properties2, {
      position: this._initialPosition
    });
  }
  _renderBoundaryOffset() {
    var _this$_position, _this$_$content;
    const boundaryOffset = ((_this$_position = this._position) === null || _this$_position === void 0 ? void 0 : _this$_position.boundaryOffset) ?? DEFAULT_BOUNDARY_OFFSET;
    const {
      v,
      h
    } = boundaryOffset;
    if (!(v && h)) {
      return;
    }
    (_this$_$content = this._$content) === null || _this$_$content === void 0 || _this$_$content.css('margin', `${boundaryOffset.v}px ${boundaryOffset.h}px`);
  }
  _getVisualContainer() {
    var _this$_properties$pos, _this$_properties$pos2, _this$_properties$pos3;
    const containerProp = this._properties.container;
    const visualContainerProp = this._properties.visualContainer;
    const positionOf = isEvent((_this$_properties$pos = this._properties.position) === null || _this$_properties$pos === void 0 ? void 0 : _this$_properties$pos.of) ? (_this$_properties$pos2 = this._properties.position) === null || _this$_properties$pos2 === void 0 || (_this$_properties$pos2 = _this$_properties$pos2.of) === null || _this$_properties$pos2 === void 0 ? void 0 : _this$_properties$pos2.target : (_this$_properties$pos3 = this._properties.position) === null || _this$_properties$pos3 === void 0 ? void 0 : _this$_properties$pos3.of;
    if (visualContainerProp) {
      return $(visualContainerProp);
    }
    if (containerProp) {
      return $(containerProp);
    }
    if (positionOf) {
      return $(positionOf);
    }
    return $(window);
  }
  _normalizePosition(position) {
    const defaultConfiguration = {
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET
    };
    if (isDefined(position)) {
      const positionObject = this._positionToObject(position);
      const configuration = extend(true, {}, defaultConfiguration, positionObject);
      return configuration;
    }
    return defaultConfiguration;
  }
  _positionToObject(position) {
    if (isPositionAlignment(position)) {
      const configuration = Object.assign({}, OVERLAY_POSITION_ALIASES[position]);
      return configuration;
    }
    return position;
  }
}
