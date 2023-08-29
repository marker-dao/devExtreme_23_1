"use strict";

exports.viewFunction = exports.DroppableProps = exports.Droppable = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _drag = require("../../events/drag");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _combine_classes = require("../utils/combine_classes");
var _excluded = ["children", "className", "disabled", "onDragEnter", "onDragLeave", "onDrop"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var viewFunction = function viewFunction(_ref) {
  var cssClasses = _ref.cssClasses,
    children = _ref.props.children,
    restAttributes = _ref.restAttributes,
    widgetRef = _ref.widgetRef;
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", cssClasses, children, 0, _extends({}, restAttributes), null, widgetRef));
};
exports.viewFunction = viewFunction;
var DroppableProps = {
  disabled: false,
  className: ''
};
exports.DroppableProps = DroppableProps;
var Droppable = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(Droppable, _InfernoComponent);
  function Droppable(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.widgetRef = (0, _inferno.createRef)();
    _this.dropEventsEffect = _this.dropEventsEffect.bind(_assertThisInitialized(_this));
    _this.dragEnterHandler = _this.dragEnterHandler.bind(_assertThisInitialized(_this));
    _this.dragLeaveHandler = _this.dragLeaveHandler.bind(_assertThisInitialized(_this));
    _this.dropHandler = _this.dropHandler.bind(_assertThisInitialized(_this));
    _this.getEventArgs = _this.getEventArgs.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = Droppable.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.dropEventsEffect, [this.props.disabled, this.props.onDragEnter, this.props.onDragLeave, this.props.onDrop])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.disabled, this.props.onDragEnter, this.props.onDragLeave, this.props.onDrop]);
  };
  _proto.dropEventsEffect = function dropEventsEffect() {
    var _this2 = this;
    if (this.props.disabled) {
      return undefined;
    }
    _events_engine.default.on(this.widgetRef.current, _drag.enter, this.dragEnterHandler);
    _events_engine.default.on(this.widgetRef.current, _drag.leave, this.dragLeaveHandler);
    _events_engine.default.on(this.widgetRef.current, _drag.drop, this.dropHandler);
    return function () {
      _events_engine.default.off(_this2.widgetRef.current, _drag.enter, _this2.dragEnterHandler);
      _events_engine.default.off(_this2.widgetRef.current, _drag.leave, _this2.dragLeaveHandler);
      _events_engine.default.off(_this2.widgetRef.current, _drag.drop, _this2.dropHandler);
    };
  };
  _proto.dragEnterHandler = function dragEnterHandler(event) {
    var dragEnterArgs = this.getEventArgs(event);
    var onDragEnter = this.props.onDragEnter;
    onDragEnter === null || onDragEnter === void 0 ? void 0 : onDragEnter(dragEnterArgs);
  };
  _proto.dragLeaveHandler = function dragLeaveHandler(event) {
    var dragLeaveArgs = this.getEventArgs(event);
    var onDragLeave = this.props.onDragLeave;
    onDragLeave === null || onDragLeave === void 0 ? void 0 : onDragLeave(dragLeaveArgs);
  };
  _proto.dropHandler = function dropHandler(event) {
    var dropArgs = this.getEventArgs(event);
    var onDrop = this.props.onDrop;
    onDrop === null || onDrop === void 0 ? void 0 : onDrop(dropArgs);
  };
  _proto.getEventArgs = function getEventArgs(e) {
    return {
      event: e,
      itemElement: this.widgetRef.current
    };
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRef: this.widgetRef,
      cssClasses: this.cssClasses,
      dragEnterHandler: this.dragEnterHandler,
      dragLeaveHandler: this.dragLeaveHandler,
      dropHandler: this.dropHandler,
      getEventArgs: this.getEventArgs,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Droppable, [{
    key: "cssClasses",
    get: function get() {
      var _this$props = this.props,
        className = _this$props.className,
        disabled = _this$props.disabled;
      var classesMap = {
        [className]: !!className,
        'dx-droppable': true,
        'dx-state-disabled': !!disabled
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        disabled = _this$props2.disabled,
        onDragEnter = _this$props2.onDragEnter,
        onDragLeave = _this$props2.onDragLeave,
        onDrop = _this$props2.onDrop,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return Droppable;
}(_inferno2.InfernoComponent);
exports.Droppable = Droppable;
Droppable.defaultProps = DroppableProps;