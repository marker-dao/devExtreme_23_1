"use strict";

exports.PopupPositionController = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _translator = require("../../animation/translator");
var _window = require("../../core/utils/window");
var _view_port = require("../../core/utils/view_port");
var _overlay_position_controller = require("../overlay/overlay_position_controller");
var _excluded = ["fullScreen", "forceApplyBindings", "dragOutsideBoundary", "dragAndResizeArea", "outsideDragFactor"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var window = (0, _window.getWindow)();
var PopupPositionController = /*#__PURE__*/function (_OverlayPositionContr) {
  _inheritsLoose(PopupPositionController, _OverlayPositionContr);
  function PopupPositionController(_ref) {
    var _this;
    var fullScreen = _ref.fullScreen,
      forceApplyBindings = _ref.forceApplyBindings,
      dragOutsideBoundary = _ref.dragOutsideBoundary,
      dragAndResizeArea = _ref.dragAndResizeArea,
      outsideDragFactor = _ref.outsideDragFactor,
      args = _objectWithoutProperties(_ref, _excluded);
    _this = _OverlayPositionContr.call(this, args) || this;
    _this._props = _extends({}, _this._props, {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
    _this._$dragResizeContainer = undefined;
    _this._updateDragResizeContainer();
    return _this;
  }
  var _proto = PopupPositionController.prototype;
  _proto.updateContainer = function updateContainer(containerProp) {
    _OverlayPositionContr.prototype.updateContainer.call(this, containerProp);
    this._updateDragResizeContainer();
  };
  _proto.dragHandled = function dragHandled() {
    this.restorePositionOnNextRender(false);
  };
  _proto.resizeHandled = function resizeHandled() {
    this.restorePositionOnNextRender(false);
  };
  _proto.positionContent = function positionContent() {
    if (this._props.fullScreen) {
      (0, _translator.move)(this._$content, {
        top: 0,
        left: 0
      });
      this.detectVisualPositionChange();
    } else {
      var _this$_props$forceApp, _this$_props;
      (_this$_props$forceApp = (_this$_props = this._props).forceApplyBindings) === null || _this$_props$forceApp === void 0 ? void 0 : _this$_props$forceApp.call(_this$_props);
      _OverlayPositionContr.prototype.positionContent.call(this);
    }
  };
  _proto._updateDragResizeContainer = function _updateDragResizeContainer() {
    this._$dragResizeContainer = this._getDragResizeContainer();
  };
  _proto._getDragResizeContainer = function _getDragResizeContainer() {
    if (this._props.dragOutsideBoundary) {
      return (0, _renderer.default)(window);
    }
    if (this._props.dragAndResizeArea) {
      return (0, _renderer.default)(this._props.dragAndResizeArea);
    }
    var isContainerDefined = (0, _view_port.originalViewPort)().get(0) || this._props.container;
    return isContainerDefined ? this._$markupContainer : (0, _renderer.default)(window);
  };
  _proto._getVisualContainer = function _getVisualContainer() {
    if (this._props.fullScreen) {
      return (0, _renderer.default)(window);
    }
    return _OverlayPositionContr.prototype._getVisualContainer.call(this);
  };
  _proto._fullScreenEnabled = function _fullScreenEnabled() {
    this.restorePositionOnNextRender(false);
  };
  _proto._fullScreenDisabled = function _fullScreenDisabled() {
    this.restorePositionOnNextRender(true);
  };
  _createClass(PopupPositionController, [{
    key: "fullScreen",
    set: function set(fullScreen) {
      this._props.fullScreen = fullScreen;
      if (fullScreen) {
        this._fullScreenEnabled();
      } else {
        this._fullScreenDisabled();
      }
    }
  }, {
    key: "$dragResizeContainer",
    get: function get() {
      return this._$dragResizeContainer;
    }
  }, {
    key: "outsideDragFactor",
    get: function get() {
      if (this._props.dragOutsideBoundary) {
        return 1;
      }
      return this._props.outsideDragFactor;
    },
    set: function set(outsideDragFactor) {
      this._props.outsideDragFactor = outsideDragFactor;
    }
  }, {
    key: "dragAndResizeArea",
    set: function set(dragAndResizeArea) {
      this._props.dragAndResizeArea = dragAndResizeArea;
      this._updateDragResizeContainer();
    }
  }, {
    key: "dragOutsideBoundary",
    set: function set(dragOutsideBoundary) {
      this._props.dragOutsideBoundary = dragOutsideBoundary;
      this._updateDragResizeContainer();
    }
  }]);
  return PopupPositionController;
}(_overlay_position_controller.OverlayPositionController);
exports.PopupPositionController = PopupPositionController;