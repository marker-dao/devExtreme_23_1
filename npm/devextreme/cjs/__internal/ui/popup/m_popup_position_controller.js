/**
* DevExtreme (cjs/__internal/ui/popup/m_popup_position_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupPositionController = void 0;
var _translator = require("../../../common/core/animation/translator");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _view_port = require("../../../core/utils/view_port");
var _m_overlay_position_controller = require("../../ui/overlay/m_overlay_position_controller");
var _m_window = _interopRequireDefault(require("../../core/utils/m_window"));
const _excluded = ["fullScreen", "forceApplyBindings", "dragOutsideBoundary", "dragAndResizeArea", "outsideDragFactor"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const window = _m_window.default.getWindow();
class PopupPositionController extends _m_overlay_position_controller.OverlayPositionController {
  constructor(_ref) {
    let {
        fullScreen,
        forceApplyBindings,
        dragOutsideBoundary,
        dragAndResizeArea,
        outsideDragFactor
      } = _ref,
      args = _objectWithoutPropertiesLoose(_ref, _excluded);
    super(args);
    this._props = _extends({}, this._props, {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
    this._$dragResizeContainer = undefined;
    this._updateDragResizeContainer();
  }
  set fullScreen(fullScreen) {
    this._props.fullScreen = fullScreen;
    if (fullScreen) {
      this._fullScreenEnabled();
    } else {
      this._fullScreenDisabled();
    }
  }
  get $dragResizeContainer() {
    return this._$dragResizeContainer;
  }
  get outsideDragFactor() {
    if (this._props.dragOutsideBoundary) {
      return 1;
    }
    return this._props.outsideDragFactor;
  }
  set dragAndResizeArea(dragAndResizeArea) {
    this._props.dragAndResizeArea = dragAndResizeArea;
    this._updateDragResizeContainer();
  }
  set dragOutsideBoundary(dragOutsideBoundary) {
    this._props.dragOutsideBoundary = dragOutsideBoundary;
    this._updateDragResizeContainer();
  }
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures, grouped-accessor-pairs
  set outsideDragFactor(outsideDragFactor) {
    this._props.outsideDragFactor = outsideDragFactor;
  }
  updateContainer(containerProp) {
    super.updateContainer(containerProp);
    this._updateDragResizeContainer();
  }
  dragHandled() {
    this.restorePositionOnNextRender(false);
  }
  resizeHandled() {
    this.restorePositionOnNextRender(false);
  }
  positionContent() {
    if (this._props.fullScreen) {
      (0, _translator.move)(this._$content, {
        top: 0,
        left: 0
      });
      this.detectVisualPositionChange();
    } else {
      var _this$_props$forceApp, _this$_props;
      (_this$_props$forceApp = (_this$_props = this._props).forceApplyBindings) === null || _this$_props$forceApp === void 0 || _this$_props$forceApp.call(_this$_props);
      super.positionContent();
    }
  }
  _normalizePosition(positionProp) {
    const normalizedPosition = super._normalizePosition(positionProp);
    if (this._props.fullScreen) {
      normalizedPosition.of = 'window';
    }
    return normalizedPosition;
  }
  _updateDragResizeContainer() {
    this._$dragResizeContainer = this._getDragResizeContainer();
  }
  _getDragResizeContainer() {
    if (this._props.dragOutsideBoundary) {
      return (0, _renderer.default)(window);
    }
    if (this._props.dragAndResizeArea) {
      return (0, _renderer.default)(this._props.dragAndResizeArea);
    }
    const isContainerDefined = (0, _view_port.originalViewPort)().get(0) || this._props.container;
    return isContainerDefined ? this._$markupContainer : (0, _renderer.default)(window);
  }
  _getVisualContainer() {
    if (this._props.fullScreen) {
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
