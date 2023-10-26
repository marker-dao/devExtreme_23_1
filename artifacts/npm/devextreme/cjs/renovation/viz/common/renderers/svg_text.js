/**
* DevExtreme (cjs/renovation/viz/common/renderers/svg_text.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.TextSvgElementProps = exports.TextSvgElement = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _base_graphics_props = _interopRequireDefault(require("./base_graphics_props"));
var _utils = require("./utils");
var _type = require("../../../../core/utils/type");
var _config_context = require("../../../common/config_context");
const _excluded = ["align", "className", "dashStyle", "encodeHtml", "fill", "opacity", "rotate", "rotateX", "rotateY", "scaleX", "scaleY", "sharp", "sharpDirection", "stroke", "strokeOpacity", "strokeWidth", "styles", "text", "textsAlignment", "translateX", "translateY", "x", "y"];
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
const KEY_STROKE = 'stroke';
const viewFunction = _ref => {
  let {
    computedProps,
    isStroked,
    styles,
    textAnchor,
    textItems,
    textRef
  } = _ref;
  const texts = textItems !== null && textItems !== void 0 ? textItems : [];
  const {
    fill,
    opacity,
    stroke,
    strokeOpacity,
    strokeWidth,
    text,
    x,
    y
  } = computedProps;
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(32, "text", null, [texts.length ? isStroked && texts.map((_ref2, index) => {
    let {
      className,
      style,
      value
    } = _ref2;
    return (0, _inferno.createVNode)(32, "tspan", className, value, 0, {
      "style": (0, _inferno2.normalizeStyles)(style)
    }, index);
  }) : null, texts.length ? texts.map((_ref3, index) => {
    let {
      className,
      style,
      value
    } = _ref3;
    return (0, _inferno.createVNode)(32, "tspan", className, value, 0, {
      "style": (0, _inferno2.normalizeStyles)(style)
    }, index);
  }) : null, !texts.length && text], 0, _extends({
    "x": x,
    "y": y,
    "style": (0, _inferno2.normalizeStyles)(styles),
    "text-anchor": textAnchor,
    "fill": fill,
    "stroke": stroke,
    "stroke-width": strokeWidth,
    "stroke-opacity": strokeOpacity,
    "opacity": opacity
  }, (0, _utils.getGraphicExtraProps)(computedProps, x, y)), null, textRef));
};
exports.viewFunction = viewFunction;
const TextSvgElementProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_graphics_props.default), Object.getOwnPropertyDescriptors({
  text: '',
  x: 0,
  y: 0,
  align: 'center',
  encodeHtml: true
})));
exports.TextSvgElementProps = TextSvgElementProps;
let TextSvgElement = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(TextSvgElement, _InfernoComponent);
  function TextSvgElement(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.textRef = (0, _inferno.createRef)();
    _this.__getterCache = {};
    _this.effectUpdateText = _this.effectUpdateText.bind(_assertThisInitialized(_this));
    _this.parseTspanElements = _this.parseTspanElements.bind(_assertThisInitialized(_this));
    _this.alignTextNodes = _this.alignTextNodes.bind(_assertThisInitialized(_this));
    _this.locateTextNodes = _this.locateTextNodes.bind(_assertThisInitialized(_this));
    _this.strokeTextNodes = _this.strokeTextNodes.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = TextSvgElement.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.effectUpdateText, [this.props.text, this.props.encodeHtml, this.props.stroke, this.props.strokeWidth, this.props.textsAlignment, this.props.x, this.props.y, this.props.styles, this.props.strokeOpacity])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.text, this.props.encodeHtml, this.props.stroke, this.props.strokeWidth, this.props.textsAlignment, this.props.x, this.props.y, this.props.styles, this.props.strokeOpacity]);
  };
  _proto.effectUpdateText = function effectUpdateText() {
    const texts = this.textItems;
    if (texts) {
      const items = this.parseTspanElements(texts);
      this.alignTextNodes(items);
      if (this.props.x !== undefined || this.props.y !== undefined) {
        this.locateTextNodes(items);
      }
      this.strokeTextNodes(items);
    }
  };
  _proto.parseTspanElements = function parseTspanElements(texts) {
    const items = [...texts];
    const textElements = this.textRef.current.children;
    const strokeLength = !this.isStroked ? 0 : items.length;
    for (let i = 0; i < textElements.length; i++) {
      if (i < strokeLength) {
        items[i].stroke = textElements[i];
      } else {
        items[i % items.length].tspan = textElements[i];
      }
    }
    return items;
  };
  _proto.alignTextNodes = function alignTextNodes(items) {
    const alignment = this.props.textsAlignment;
    if (!items || !alignment || alignment === 'center') {
      return;
    }
    const direction = alignment === 'left' ? -1 : 1;
    const maxTextWidth = Math.max(...items.map(t => (0, _utils.getTextWidth)(t)));
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const textWidth = (0, _utils.getTextWidth)(item);
      if (maxTextWidth !== 0 && maxTextWidth !== textWidth) {
        const value = direction * (Math.round((maxTextWidth - textWidth) / 2 * 10) / 10);
        (0, _utils.setTextNodeAttribute)(item, 'dx', String(value));
      }
    }
  };
  _proto.locateTextNodes = function locateTextNodes(items) {
    const {
      styles,
      x,
      y
    } = this.props;
    const lineHeight = (0, _utils.getLineHeight)(styles !== null && styles !== void 0 ? styles : {});
    let item = items[0];
    (0, _utils.setTextNodeAttribute)(item, 'x', String(x));
    (0, _utils.setTextNodeAttribute)(item, 'y', String(y));
    for (let i = 1, ii = items.length; i < ii; ++i) {
      item = items[i];
      if ((0, _type.isDefined)(item.height) && item.height >= 0) {
        (0, _utils.setTextNodeAttribute)(item, 'x', String(x));
        const height = (0, _utils.getItemLineHeight)(item, lineHeight);
        (0, _utils.setTextNodeAttribute)(item, 'dy', String(height));
      }
    }
  };
  _proto.strokeTextNodes = function strokeTextNodes(items) {
    if (!this.isStroked) return;
    const {
      stroke,
      strokeWidth
    } = this.props;
    const strokeOpacity = Number(this.props.strokeOpacity) || 1;
    for (let i = 0, ii = items.length; i < ii; ++i) {
      const tspan = items[i].stroke;
      if (tspan) {
        tspan.setAttribute(KEY_STROKE, String(stroke));
        tspan.setAttribute('stroke-width', String(strokeWidth));
        tspan.setAttribute('stroke-opacity', String(strokeOpacity));
        tspan.setAttribute('stroke-linejoin', 'round');
      }
    }
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoComponent.prototype.componentWillUpdate.call(this);
    if (this.props['text'] !== nextProps['text'] || this.props['encodeHtml'] !== nextProps['encodeHtml'] || this.props['stroke'] !== nextProps['stroke'] || this.props['strokeWidth'] !== nextProps['strokeWidth']) {
      this.__getterCache['textItems'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props),
      textRef: this.textRef,
      config: this.config,
      styles: this.styles,
      textItems: this.textItems,
      isStroked: this.isStroked,
      textAnchor: this.textAnchor,
      computedProps: this.computedProps,
      parseTspanElements: this.parseTspanElements,
      alignTextNodes: this.alignTextNodes,
      locateTextNodes: this.locateTextNodes,
      strokeTextNodes: this.strokeTextNodes,
      restAttributes: this.restAttributes
    });
  };
  _createClass(TextSvgElement, [{
    key: "config",
    get: function () {
      if (this.context[_config_context.ConfigContext.id]) {
        return this.context[_config_context.ConfigContext.id];
      }
      return _config_context.ConfigContext.defaultValue;
    }
  }, {
    key: "styles",
    get: function () {
      var _this$props$styles;
      const style = (_this$props$styles = this.props.styles) !== null && _this$props$styles !== void 0 ? _this$props$styles : {};
      return _extends({
        whiteSpace: 'pre'
      }, style);
    }
  }, {
    key: "textItems",
    get: function () {
      if (this.__getterCache['textItems'] !== undefined) {
        return this.__getterCache['textItems'];
      }
      return this.__getterCache['textItems'] = (() => {
        let items;
        let parsedHtml = '';
        const {
          text
        } = this.props;
        if (!text) return;
        if (!this.props.encodeHtml && (/<[a-z][\s\S]*>/i.test(text) || text.includes('&'))) {
          parsedHtml = (0, _utils.removeExtraAttrs)(text);
          items = (0, _utils.parseHTML)(parsedHtml);
        } else if (/\n/g.test(text)) {
          items = (0, _utils.parseMultiline)(text);
        } else if (this.isStroked) {
          items = [{
            value: text.trim(),
            height: 0
          }];
        }
        return items;
      })();
    }
  }, {
    key: "isStroked",
    get: function () {
      return (0, _type.isDefined)(this.props.stroke) && (0, _type.isDefined)(this.props.strokeWidth);
    }
  }, {
    key: "textAnchor",
    get: function () {
      var _this$config;
      return (0, _utils.convertAlignmentToAnchor)(this.props.align, (_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.rtlEnabled);
    }
  }, {
    key: "computedProps",
    get: function () {
      return this.props;
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return TextSvgElement;
}(_inferno2.InfernoComponent);
exports.TextSvgElement = TextSvgElement;
TextSvgElement.defaultProps = TextSvgElementProps;
