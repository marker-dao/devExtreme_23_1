/**
* DevExtreme (cjs/renovation/viz/common/tooltip.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.TooltipProps = exports.Tooltip = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _combine_classes = require("../../utils/combine_classes");
var _svg_path = require("./renderers/svg_path");
var _svg_text = require("./renderers/svg_text");
var _shadow_filter = require("./renderers/shadow_filter");
var _utils = require("./renderers/utils");
var _svg_root = require("./renderers/svg_root");
var _type = require("../../../core/utils/type");
var _tooltip_utils = require("./tooltip_utils");
var _utils2 = require("../../../viz/core/utils");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _utils3 = require("./utils");
const _excluded = ["argumentFormat", "arrowLength", "arrowWidth", "border", "className", "color", "container", "contentTemplate", "cornerRadius", "customizeTooltip", "data", "enabled", "eventData", "font", "format", "interactive", "location", "offset", "onTooltipHidden", "onTooltipShown", "opacity", "paddingLeftRight", "paddingTopBottom", "rootWidget", "rtl", "shadow", "shared", "visible", "x", "y", "zIndex"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DEFAULT_CANVAS = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
const DEFAULT_FONT = {
  color: '#232323',
  family: 'Segoe UI',
  opacity: 1,
  size: 12,
  weight: 400
};
const DEFAULT_SHADOW = {
  blur: 2,
  color: '#000',
  offsetX: 0,
  offsetY: 4,
  opacity: 0.4
};
const DEFAULT_BORDER = {
  color: '#d3d3d3',
  width: 1,
  dashStyle: 'solid',
  visible: true
};
const DEFAULT_SIZE = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
const viewFunction = _ref => {
  let {
    border,
    cloudRef,
    cloudSize,
    container,
    correctedCoordinates,
    cssClassName,
    customizedOptions,
    filterId,
    htmlRef,
    isEmptyContainer,
    pointerEvents,
    props: {
      arrowWidth,
      contentTemplate: TooltipTemplate,
      cornerRadius,
      data,
      font,
      interactive,
      opacity,
      rtl,
      shadow,
      visible,
      zIndex
    },
    textRef,
    textSize,
    textSizeWithPaddings,
    textSvgElementStyles
  } = _ref;
  if (!visible || !correctedCoordinates || (0, _tooltip_utils.isTextEmpty)(customizedOptions) || isEmptyContainer) {
    return (0, _inferno.createVNode)(1, "div");
  }
  const angle = (0, _tooltip_utils.getCloudAngle)(textSizeWithPaddings, correctedCoordinates);
  const d = (0, _tooltip_utils.getCloudPoints)(textSizeWithPaddings, correctedCoordinates, angle, {
    cornerRadius,
    arrowWidth
  }, true);
  let styles = interactive ? {
    msUserSelect: 'text',
    MozUserSelect: 'auto',
    WebkitUserSelect: 'auto'
  } : {};
  styles = _extends({}, styles, {
    position: 'absolute'
  });
  return (0, _inferno.createComponentVNode)(2, _inferno2.Portal, {
    "container": container,
    children: (0, _inferno.createVNode)(1, "div", cssClassName, [(0, _inferno.createComponentVNode)(2, _svg_root.RootSvgElement, {
      "width": cloudSize.width,
      "height": cloudSize.height,
      "styles": styles,
      children: [(0, _inferno.createVNode)(32, "defs", null, (0, _inferno.createComponentVNode)(2, _shadow_filter.ShadowFilter, {
        "id": filterId,
        "x": "-50%",
        "y": "-50%",
        "width": "200%",
        "height": "200%",
        "blur": shadow.blur,
        "color": shadow.color,
        "offsetX": shadow.offsetX,
        "offsetY": shadow.offsetY,
        "opacity": shadow.opacity
      }), 2), (0, _inferno.createVNode)(32, "g", null, [(0, _inferno.createComponentVNode)(2, _svg_path.PathSvgElement, {
        "pointerEvents": pointerEvents,
        "d": d,
        "fill": customizedOptions.color,
        "stroke": customizedOptions.borderColor,
        "strokeWidth": border.strokeWidth,
        "strokeOpacity": border.strokeOpacity,
        "dashStyle": border.dashStyle,
        "opacity": opacity,
        "rotate": angle,
        "rotateX": correctedCoordinates.x,
        "rotateY": correctedCoordinates.y
      }), customizedOptions.html || TooltipTemplate ? null : (0, _inferno.createVNode)(32, "g", null, (0, _inferno.createComponentVNode)(2, _svg_text.TextSvgElement, {
        "text": customizedOptions.text,
        "styles": textSvgElementStyles
      }), 2, {
        "text-anchor": "middle",
        "transform": "translate(".concat(correctedCoordinates.x, ", ").concat(correctedCoordinates.y - textSize.height / 2 - textSize.y, ")")
      }, null, textRef)], 0, {
        "filter": (0, _utils.getFuncIri)(filterId),
        "transform": "translate(".concat(-cloudSize.x, ", ").concat(-cloudSize.y, ")")
      }, null, cloudRef)]
    }), !(customizedOptions.html || TooltipTemplate) ? null : (0, _inferno.createVNode)(1, "div", null, TooltipTemplate && TooltipTemplate(_extends({}, data)), 0, {
      "style": (0, _inferno2.normalizeStyles)({
        position: 'relative',
        display: 'inline-block',
        left: correctedCoordinates.x - cloudSize.x - textSize.width / 2,
        top: correctedCoordinates.y - cloudSize.y - textSize.height / 2,
        fill: customizedOptions.fontColor,
        fontFamily: font.family,
        fontSize: font.size,
        fontWeight: font.weight,
        opacity: font.opacity,
        pointerEvents,
        direction: rtl ? 'rtl' : 'ltr'
      })
    }, null, htmlRef)], 0, {
      "style": (0, _inferno2.normalizeStyles)({
        position: 'absolute',
        pointerEvents: 'none',
        left: cloudSize.x,
        top: cloudSize.y,
        zIndex
      })
    })
  });
};
exports.viewFunction = viewFunction;
const TooltipProps = {
  color: '#fff',
  border: DEFAULT_BORDER,
  data: Object.freeze({}),
  paddingLeftRight: 18,
  paddingTopBottom: 15,
  x: 0,
  y: 0,
  cornerRadius: 0,
  arrowWidth: 20,
  arrowLength: 10,
  offset: 0,
  font: DEFAULT_FONT,
  shadow: DEFAULT_SHADOW,
  interactive: false,
  enabled: true,
  shared: false,
  location: 'center',
  visible: false,
  rtl: false
};
exports.TooltipProps = TooltipProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let Tooltip = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(Tooltip, _InfernoComponent);
  function Tooltip(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.cloudRef = (0, _inferno.createRef)();
    _this.textRef = (0, _inferno.createRef)();
    _this.htmlRef = (0, _inferno.createRef)();
    _this.__getterCache = {};
    _this.state = {
      filterId: (0, _utils.getNextDefsSvgId)(),
      textSize: DEFAULT_SIZE,
      cloudSize: DEFAULT_SIZE,
      currentEventData: undefined,
      isEmptyContainer: false,
      canvas: DEFAULT_CANVAS
    };
    _this.setHtmlText = _this.setHtmlText.bind(_assertThisInitialized(_this));
    _this.calculateSize = _this.calculateSize.bind(_assertThisInitialized(_this));
    _this.eventsEffect = _this.eventsEffect.bind(_assertThisInitialized(_this));
    _this.checkContainer = _this.checkContainer.bind(_assertThisInitialized(_this));
    _this.setCanvas = _this.setCanvas.bind(_assertThisInitialized(_this));
    _this.getLocation = _this.getLocation.bind(_assertThisInitialized(_this));
    _this.calculateContentSize = _this.calculateContentSize.bind(_assertThisInitialized(_this));
    _this.calculateCloudSize = _this.calculateCloudSize.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = Tooltip.prototype;
  _proto.createEffects = function createEffects() {
    var _this$props$rootWidge;
    return [new _inferno2.InfernoEffect(this.setHtmlText, [this.props.border, this.props.color, this.props.customizeTooltip, this.props.data, this.props.font, this.props.visible]), new _inferno2.InfernoEffect(this.calculateSize, [this.props.visible, this.props.x, this.props.y, this.props.shadow, this.state.textSize, this.state.cloudSize]), new _inferno2.InfernoEffect(this.eventsEffect, [this.props.eventData, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.visible, this.props.arrowLength, this.props.offset, this.props.x, this.props.y, this.state.canvas, this.props.paddingLeftRight, this.props.paddingTopBottom, this.state.textSize, this.state.currentEventData]), new _inferno2.InfernoEffect(this.checkContainer, [this.props.visible]), new _inferno2.InfernoEffect(this.setCanvas, [this.props.container, (_this$props$rootWidge = this.props.rootWidget) === null || _this$props$rootWidge === void 0 ? void 0 : _this$props$rootWidge.current])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$props$rootWidge2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.border, this.props.color, this.props.customizeTooltip, this.props.data, this.props.font, this.props.visible]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.visible, this.props.x, this.props.y, this.props.shadow, this.state.textSize, this.state.cloudSize]);
    (_this$_effects$3 = this._effects[2]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.eventData, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.visible, this.props.arrowLength, this.props.offset, this.props.x, this.props.y, this.state.canvas, this.props.paddingLeftRight, this.props.paddingTopBottom, this.state.textSize, this.state.currentEventData]);
    (_this$_effects$4 = this._effects[3]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.visible]);
    (_this$_effects$5 = this._effects[4]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.container, (_this$props$rootWidge2 = this.props.rootWidget) === null || _this$props$rootWidge2 === void 0 ? void 0 : _this$props$rootWidge2.current]);
  };
  _proto.setHtmlText = function setHtmlText() {
    const htmlText = this.customizedOptions.html;
    if (htmlText && this.htmlRef.current && this.props.visible) {
      this.htmlRef.current.innerHTML = htmlText;
    }
  };
  _proto.calculateSize = function calculateSize() {
    const contentSize = this.calculateContentSize();
    const cloudSize = this.calculateCloudSize();
    if ((0, _utils3.isUpdatedFlatObject)(this.state.textSize, contentSize)) {
      this.setState(__state_argument => ({
        textSize: contentSize
      }));
    }
    if ((0, _utils3.isUpdatedFlatObject)(this.state.cloudSize, cloudSize)) {
      this.setState(__state_argument => ({
        cloudSize: cloudSize
      }));
    }
  };
  _proto.eventsEffect = function eventsEffect() {
    const {
      eventData,
      onTooltipHidden,
      onTooltipShown,
      visible
    } = this.props;
    const isEqual = (object1, object2) => {
      if (!object1) {
        return false;
      }
      return JSON.stringify(object1.target) === JSON.stringify(object2.target);
    };
    if (visible && this.correctedCoordinates && !isEqual(this.state.currentEventData, eventData)) {
      this.state.currentEventData && (onTooltipHidden === null || onTooltipHidden === void 0 ? void 0 : onTooltipHidden(this.state.currentEventData));
      onTooltipShown === null || onTooltipShown === void 0 ? void 0 : onTooltipShown(eventData);
      this.setState(__state_argument => ({
        currentEventData: eventData
      }));
    }
    if (!visible && this.state.currentEventData) {
      onTooltipHidden === null || onTooltipHidden === void 0 ? void 0 : onTooltipHidden(this.state.currentEventData);
      this.setState(__state_argument => ({
        currentEventData: undefined
      }));
    }
  };
  _proto.checkContainer = function checkContainer() {
    if (this.htmlRef.current && this.props.visible) {
      const htmlTextSize = this.htmlRef.current.getBoundingClientRect();
      if (!htmlTextSize.width && !htmlTextSize.height) {
        this.setState(__state_argument => ({
          isEmptyContainer: true
        }));
      }
    }
  };
  _proto.setCanvas = function setCanvas() {
    this.setState(__state_argument => ({
      canvas: (0, _tooltip_utils.getCanvas)(this.container)
    }));
  };
  _proto.calculateContentSize = function calculateContentSize() {
    let size = DEFAULT_SIZE;
    if (this.props.visible) {
      if (this.textRef.current) {
        size = this.textRef.current.getBBox();
      } else if (this.htmlRef.current) {
        size = this.htmlRef.current.getBoundingClientRect();
      }
    }
    return size;
  };
  _proto.calculateCloudSize = function calculateCloudSize() {
    let cloudSize = DEFAULT_SIZE;
    if ((0, _type.isDefined)(this.props.x) && (0, _type.isDefined)(this.props.y) && this.props.visible && this.cloudRef.current) {
      const size = this.cloudRef.current.getBBox();
      const {
        bm,
        lm,
        rm,
        tm
      } = this.margins;
      cloudSize = {
        x: Math.floor(size.x - lm),
        y: Math.floor(size.y - tm),
        width: size.width + lm + rm,
        height: size.height + tm + bm
      };
    }
    return cloudSize;
  };
  _proto.getLocation = function getLocation() {
    return (0, _utils2.normalizeEnum)(this.props.location);
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoComponent.prototype.componentWillUpdate.call(this);
    if (this.props['border'] !== nextProps['border']) {
      this.__getterCache['border'] = undefined;
    }
    if (this.props['border'] !== nextProps['border'] || this.props['color'] !== nextProps['color'] || this.props['customizeTooltip'] !== nextProps['customizeTooltip'] || this.props['data'] !== nextProps['data'] || this.props['font'] !== nextProps['font']) {
      this.__getterCache['customizedOptions'] = undefined;
    }
    if (this.props['shadow'] !== nextProps['shadow']) {
      this.__getterCache['margins'] = undefined;
    }
    if (this.props['arrowLength'] !== nextProps['arrowLength'] || this.props['offset'] !== nextProps['offset'] || this.props['x'] !== nextProps['x'] || this.props['y'] !== nextProps['y'] || this.state['canvas'] !== nextState['canvas'] || this.props['paddingLeftRight'] !== nextProps['paddingLeftRight'] || this.props['paddingTopBottom'] !== nextProps['paddingTopBottom'] || this.state['textSize'] !== nextState['textSize']) {
      this.__getterCache['correctedCoordinates'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      filterId: this.state.filterId,
      textSize: this.state.textSize,
      cloudSize: this.state.cloudSize,
      currentEventData: this.state.currentEventData,
      isEmptyContainer: this.state.isEmptyContainer,
      canvas: this.state.canvas,
      cloudRef: this.cloudRef,
      textRef: this.textRef,
      htmlRef: this.htmlRef,
      textSvgElementStyles: this.textSvgElementStyles,
      textSizeWithPaddings: this.textSizeWithPaddings,
      border: this.border,
      container: this.container,
      customizedOptions: this.customizedOptions,
      margins: this.margins,
      pointerEvents: this.pointerEvents,
      cssClassName: this.cssClassName,
      fontStyles: this.fontStyles,
      correctedCoordinates: this.correctedCoordinates,
      calculateContentSize: this.calculateContentSize,
      calculateCloudSize: this.calculateCloudSize,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Tooltip, [{
    key: "textSvgElementStyles",
    get: function () {
      return _extends({}, this.fontStyles, {
        pointerEvents: this.pointerEvents
      });
    }
  }, {
    key: "textSizeWithPaddings",
    get: function () {
      const {
        paddingLeftRight,
        paddingTopBottom
      } = this.props;
      return {
        width: this.state.textSize.width + paddingLeftRight * 2,
        height: this.state.textSize.height + paddingTopBottom * 2
      };
    }
  }, {
    key: "border",
    get: function () {
      if (this.__getterCache['border'] !== undefined) {
        return this.__getterCache['border'];
      }
      return this.__getterCache['border'] = (() => {
        const {
          border
        } = this.props;
        if (border.visible) {
          return {
            stroke: border.color,
            strokeWidth: border.width,
            strokeOpacity: border.opacity,
            dashStyle: border.dashStyle
          };
        }
        return {};
      })();
    }
  }, {
    key: "container",
    get: function () {
      const propsContainer = this.props.container;
      if (propsContainer) {
        if (typeof propsContainer === 'string') {
          var _this$props$rootWidge3;
          const tmp = (_this$props$rootWidge3 = this.props.rootWidget) === null || _this$props$rootWidge3 === void 0 ? void 0 : _this$props$rootWidge3.current;
          let node = tmp === null || tmp === void 0 ? void 0 : tmp.closest(propsContainer);
          if (!node) {
            node = _dom_adapter.default.getDocument().querySelector(propsContainer);
          }
          if (node) {
            return node;
          }
        } else {
          return propsContainer;
        }
      }
      return _dom_adapter.default.getBody();
    }
  }, {
    key: "customizedOptions",
    get: function () {
      if (this.__getterCache['customizedOptions'] !== undefined) {
        return this.__getterCache['customizedOptions'];
      }
      return this.__getterCache['customizedOptions'] = (() => {
        const {
          border,
          color,
          customizeTooltip,
          data,
          font
        } = this.props;
        return (0, _tooltip_utils.prepareData)(data, color, border, font, customizeTooltip);
      })();
    }
  }, {
    key: "margins",
    get: function () {
      if (this.__getterCache['margins'] !== undefined) {
        return this.__getterCache['margins'];
      }
      return this.__getterCache['margins'] = (() => {
        const {
          max
        } = Math;
        const {
          shadow
        } = this.props;
        const xOff = shadow.offsetX;
        const yOff = shadow.offsetY;
        const blur = shadow.blur * 2 + 1;
        return {
          lm: max(blur - xOff, 0),
          rm: max(blur + xOff, 0),
          tm: max(blur - yOff, 0),
          bm: max(blur + yOff, 0)
        };
      })();
    }
  }, {
    key: "pointerEvents",
    get: function () {
      const {
        interactive
      } = this.props;
      return interactive ? 'auto' : 'none';
    }
  }, {
    key: "cssClassName",
    get: function () {
      const {
        className
      } = this.props;
      const classesMap = {
        [String(className)]: !!className
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "fontStyles",
    get: function () {
      const {
        font
      } = this.props;
      const result = {};
      font.family !== undefined && (result.fontFamily = font.family);
      font.size !== undefined && (result.fontSize = String(font.size));
      font.weight !== undefined && (result.fontWeight = String(font.weight));
      font.opacity !== undefined && (result.opacity = String(font.opacity));
      this.customizedOptions.fontColor !== undefined && (result.fill = this.customizedOptions.fontColor);
      return result;
    }
  }, {
    key: "correctedCoordinates",
    get: function () {
      if (this.__getterCache['correctedCoordinates'] !== undefined) {
        return this.__getterCache['correctedCoordinates'];
      }
      return this.__getterCache['correctedCoordinates'] = (() => {
        const {
          arrowLength,
          offset,
          x,
          y
        } = this.props;
        return (0, _tooltip_utils.recalculateCoordinates)({
          canvas: this.state.canvas,
          anchorX: x,
          anchorY: y,
          size: this.textSizeWithPaddings,
          offset,
          arrowLength
        });
      })();
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return Tooltip;
}(_inferno2.InfernoComponent);
exports.Tooltip = Tooltip;
Tooltip.defaultProps = TooltipProps;
