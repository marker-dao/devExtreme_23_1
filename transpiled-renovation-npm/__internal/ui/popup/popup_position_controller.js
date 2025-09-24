"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupPositionController = void 0;
var _translator = require("../../../common/core/animation/translator");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _view_port = require("../../../core/utils/view_port");
var _overlay_position_controller = require("../../ui/overlay/overlay_position_controller");
var _m_window = _interopRequireDefault(require("../../core/utils/m_window"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const window = _m_window.default.getWindow();
class PopupPositionController extends _overlay_position_controller.OverlayPositionController {
  constructor(params) {
    super(params);
    const superProperties = this._properties;
    const {
      properties
    } = params;
    const {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = properties;
    this._properties = _extends({}, superProperties, {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
    this._$dragResizeContainer = undefined;
    this._updateDragResizeContainer();
  }
  get $dragResizeContainer() {
    return this._$dragResizeContainer;
  }
  get outsideDragFactor() {
    if (this._properties.dragOutsideBoundary) {
      return 1;
    }
    return this._properties.outsideDragFactor;
  }
  set outsideDragFactor(outsideDragFactor) {
    this._properties.outsideDragFactor = outsideDragFactor;
  }
  set fullScreen(fullScreen) {
    this._properties.fullScreen = fullScreen;
    if (fullScreen) {
      this._fullScreenEnabled();
    } else {
      this._fullScreenDisabled();
    }
  }
  set dragAndResizeArea(dragAndResizeArea) {
    this._properties.dragAndResizeArea = dragAndResizeArea;
    this._updateDragResizeContainer();
  }
  set dragOutsideBoundary(dragOutsideBoundary) {
    this._properties.dragOutsideBoundary = dragOutsideBoundary;
    this._updateDragResizeContainer();
  }
  updateContainer(container) {
    super.updateContainer(container);
    this._updateDragResizeContainer();
  }
  dragHandled() {
    this.restorePositionOnNextRender(false);
  }
  resizeHandled() {
    this.restorePositionOnNextRender(false);
  }
  positionContent() {
    if (this._properties.fullScreen) {
      (0, _translator.move)(this._$content, {
        top: 0,
        left: 0
      });
      this.detectVisualPositionChange();
    } else {
      var _this$_properties$for, _this$_properties;
      (_this$_properties$for = (_this$_properties = this._properties).forceApplyBindings) === null || _this$_properties$for === void 0 || _this$_properties$for.call(_this$_properties);
      super.positionContent();
    }
  }
  _normalizePosition(position) {
    const normalizedPosition = super._normalizePosition(position);
    if (this._properties.fullScreen) {
      normalizedPosition.of = 'window';
    }
    return normalizedPosition;
  }
  _updateDragResizeContainer() {
    this._$dragResizeContainer = this._getDragResizeContainer();
  }
  _getDragResizeContainer() {
    if (this._properties.dragOutsideBoundary) {
      return (0, _renderer.default)(window);
    }
    if (this._properties.dragAndResizeArea) {
      return (0, _renderer.default)(this._properties.dragAndResizeArea);
    }
    const isContainerDefined = (0, _view_port.originalViewPort)().get(0) || this._properties.container;
    return isContainerDefined ? this._$markupContainer : (0, _renderer.default)(window);
  }
  _getVisualContainer() {
    if (this._properties.fullScreen) {
      return (0, _renderer.default)(window);
    }
    return super._getVisualContainer();
  }
  _fullScreenEnabled() {
    this.restorePositionOnNextRender(false);
  }
  _fullScreenDisabled() {
    this.restorePositionOnNextRender(true);
  }
}
exports.PopupPositionController = PopupPositionController;