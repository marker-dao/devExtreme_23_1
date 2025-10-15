/**
* DevExtreme (esm/__internal/ui/popup/popup_position_controller.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { move } from '../../../common/core/animation/translator';
import $ from '../../../core/renderer';
import { originalViewPort } from '../../../core/utils/view_port';
import { OverlayPositionController } from '../../ui/overlay/overlay_position_controller';
import windowUtils from '../../core/utils/m_window';
const window = windowUtils.getWindow();
export class PopupPositionController extends OverlayPositionController {
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
      move(this._$content, {
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
      return $(window);
    }
    if (this._properties.dragAndResizeArea) {
      return $(this._properties.dragAndResizeArea);
    }
    const isContainerDefined = originalViewPort().get(0) || this._properties.container;
    return isContainerDefined ? this._$markupContainer : $(window);
  }
  _getVisualContainer() {
    if (this._properties.fullScreen) {
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
