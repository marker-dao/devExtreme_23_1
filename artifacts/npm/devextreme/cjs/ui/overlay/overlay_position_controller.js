/**
* DevExtreme (cjs/ui/overlay/overlay_position_controller.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.OverlayPositionController = exports.OVERLAY_POSITION_ALIASES = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _position = _interopRequireDefault(require("../../animation/position"));
var _translator = require("../../animation/translator");
var _window = require("../../core/utils/window");
var _swatch_container = _interopRequireDefault(require("../widget/swatch_container"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const window = (0, _window.getWindow)();
const OVERLAY_POSITION_ALIASES = {
  'top': {
    my: 'top center',
    at: 'top center'
  },
  'bottom': {
    my: 'bottom center',
    at: 'bottom center'
  },
  'right': {
    my: 'right center',
    at: 'right center'
  },
  'left': {
    my: 'left center',
    at: 'left center'
  },
  'center': {
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
exports.OVERLAY_POSITION_ALIASES = OVERLAY_POSITION_ALIASES;
const OVERLAY_DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
let OverlayPositionController = /*#__PURE__*/function () {
  function OverlayPositionController(_ref) {
    let {
      position,
      container,
      visualContainer,
      $root,
      $content,
      $wrapper,
      onPositioned,
      onVisualPositionChanged,
      restorePosition,
      _fixWrapperPosition
    } = _ref;
    this._props = {
      position,
      container,
      visualContainer,
      restorePosition,
      onPositioned,
      onVisualPositionChanged,
      _fixWrapperPosition
    };
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
  var _proto = OverlayPositionController.prototype;
  _proto.restorePositionOnNextRender = function restorePositionOnNextRender(value) {
    // NOTE: no visual position means it's a first render
    this._shouldRenderContentInitialPosition = value || !this._visualPosition;
  };
  _proto.openingHandled = function openingHandled() {
    const shouldRestorePosition = this._props.restorePosition;
    this.restorePositionOnNextRender(shouldRestorePosition);
  };
  _proto.updatePosition = function updatePosition(positionProp) {
    this._props.position = positionProp;
    this._position = this._normalizePosition(positionProp);
    this.updateVisualContainer();
  };
  _proto.updateContainer = function updateContainer() {
    let containerProp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.container;
    this._props.container = containerProp;
    this._$markupContainer = containerProp ? (0, _renderer.default)(containerProp) : _swatch_container.default.getSwatchContainer(this._$root);
    this.updateVisualContainer(this._props.visualContainer);
  };
  _proto.updateVisualContainer = function updateVisualContainer() {
    let visualContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.visualContainer;
    this._props.visualContainer = visualContainer;
    this._$visualContainer = this._getVisualContainer();
  };
  _proto.detectVisualPositionChange = function detectVisualPositionChange(event) {
    this._updateVisualPositionValue();
    this._raisePositionedEvents(event);
  };
  _proto.positionContent = function positionContent() {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      (0, _translator.move)(this._$content, this._visualPosition);
      this.detectVisualPositionChange();
    }
  };
  _proto.positionWrapper = function positionWrapper() {
    if (this._$visualContainer) {
      _position.default.setup(this._$wrapper, {
        my: 'top left',
        at: 'top left',
        of: this._$visualContainer
      });
    }
  };
  _proto.styleWrapperPosition = function styleWrapperPosition() {
    const useFixed = (0, _type.isWindow)(this.$visualContainer.get(0)) || this._props._fixWrapperPosition;
    const positionStyle = useFixed ? 'fixed' : 'absolute';
    this._$wrapper.css('position', positionStyle);
  };
  _proto._updateVisualPositionValue = function _updateVisualPositionValue() {
    this._previousVisualPosition = this._visualPosition;
    this._visualPosition = (0, _translator.locate)(this._$content);
  };
  _proto._renderContentInitialPosition = function _renderContentInitialPosition() {
    this._renderBoundaryOffset();
    (0, _translator.resetPosition)(this._$content);
    const wrapperOverflow = this._$wrapper.css('overflow');
    this._$wrapper.css('overflow', 'hidden');
    const resultPosition = _position.default.setup(this._$content, this._position);
    this._$wrapper.css('overflow', wrapperOverflow);
    this._initialPosition = resultPosition;
    this.detectVisualPositionChange();
  };
  _proto._raisePositionedEvents = function _raisePositionedEvents(event) {
    const previousPosition = this._previousVisualPosition;
    const newPosition = this._visualPosition;
    const isVisualPositionChanged = (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.top) !== newPosition.top || (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.left) !== newPosition.left;
    if (isVisualPositionChanged) {
      this._props.onVisualPositionChanged({
        previousPosition: previousPosition,
        position: newPosition,
        event
      });
    }
    this._props.onPositioned({
      position: this._initialPosition
    });
  };
  _proto._renderBoundaryOffset = function _renderBoundaryOffset() {
    var _this$_position;
    const boundaryOffset = (_this$_position = this._position) !== null && _this$_position !== void 0 ? _this$_position : {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };
    this._$content.css('margin', "".concat(boundaryOffset.v, "px ").concat(boundaryOffset.h, "px"));
  };
  _proto._getVisualContainer = function _getVisualContainer() {
    var _this$_props$position, _this$_props$position2;
    const containerProp = this._props.container;
    const visualContainerProp = this._props.visualContainer;
    const positionOf = (0, _type.isEvent)((_this$_props$position = this._props.position) === null || _this$_props$position === void 0 ? void 0 : _this$_props$position.of) ? this._props.position.of.target : (_this$_props$position2 = this._props.position) === null || _this$_props$position2 === void 0 ? void 0 : _this$_props$position2.of;
    if (visualContainerProp) {
      return (0, _renderer.default)(visualContainerProp);
    }
    if (containerProp) {
      return (0, _renderer.default)(containerProp);
    }
    if (positionOf) {
      return (0, _renderer.default)(positionOf);
    }
    return (0, _renderer.default)(window);
  };
  _proto._normalizePosition = function _normalizePosition(positionProp) {
    const defaultPositionConfig = {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };
    if ((0, _type.isDefined)(positionProp)) {
      return (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    } else {
      return defaultPositionConfig;
    }
  };
  _proto._positionToObject = function _positionToObject(position) {
    if ((0, _type.isString)(position)) {
      return (0, _extend.extend)({}, OVERLAY_POSITION_ALIASES[position]);
    }
    return position;
  };
  _createClass(OverlayPositionController, [{
    key: "$container",
    get: function () {
      this.updateContainer(); // NOTE: swatch classes can be updated runtime

      return this._$markupContainer;
    }
  }, {
    key: "$visualContainer",
    get: function () {
      return this._$visualContainer;
    }
  }, {
    key: "position",
    get: function () {
      return this._position;
    }
  }, {
    key: "fixWrapperPosition",
    set: function (fixWrapperPosition) {
      this._props._fixWrapperPosition = fixWrapperPosition;
      this.styleWrapperPosition();
    }
  }, {
    key: "restorePosition",
    set: function (restorePosition) {
      this._props.restorePosition = restorePosition;
    }
  }]);
  return OverlayPositionController;
}();
exports.OverlayPositionController = OverlayPositionController;
