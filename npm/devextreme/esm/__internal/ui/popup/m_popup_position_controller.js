/**
* DevExtreme (esm/__internal/ui/popup/m_popup_position_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["fullScreen", "forceApplyBindings", "dragOutsideBoundary", "dragAndResizeArea", "outsideDragFactor"];
import { move } from '../../../common/core/animation/translator';
import $ from '../../../core/renderer';
import { originalViewPort } from '../../../core/utils/view_port';
import { OverlayPositionController } from '../../ui/overlay/m_overlay_position_controller';
import windowUtils from '../../core/utils/m_window';
const window = windowUtils.getWindow();
class PopupPositionController extends OverlayPositionController {
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
      move(this._$content, {
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
      return $(window);
    }
    if (this._props.dragAndResizeArea) {
      return $(this._props.dragAndResizeArea);
    }
    const isContainerDefined = originalViewPort().get(0) || this._props.container;
    return isContainerDefined ? this._$markupContainer : $(window);
  }
  _getVisualContainer() {
    if (this._props.fullScreen) {
      return $(window);
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
export { PopupPositionController };
