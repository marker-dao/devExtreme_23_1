import $ from '../../../core/renderer';
import { FORM_LOAD_PANEL_CLASS, FORM_LOAD_PANEL_WRAPPER_CLASS } from '../../ui/form/constants';
import LoadIndicator, { AnimationType } from '../../ui/load_indicator';
export const FORM_LOAD_INDICATOR_SIZE = 120;
export class FormLoadPanel {
  constructor(dependencies) {
    this._dependencies = dependencies;
  }
  show() {
    var _this$_loadPanel;
    this._ensureLoadPanel();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_loadPanel = this._loadPanel) === null || _this$_loadPanel === void 0 || _this$_loadPanel.show();
  }
  hide() {
    var _this$_loadPanel2;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_loadPanel2 = this._loadPanel) === null || _this$_loadPanel2 === void 0 || _this$_loadPanel2.hide();
  }
  dispose() {
    if (!this._loadPanel) {
      return;
    }
    this._loadPanel.dispose();
    this._loadPanel.$element().remove();
    this._loadPanel = undefined;
  }
  get instance() {
    return this._loadPanel;
  }
  option(name) {
    var _this$_loadPanel3;
    return (_this$_loadPanel3 = this._loadPanel) === null || _this$_loadPanel3 === void 0 ? void 0 : _this$_loadPanel3.option(name);
  }
  _ensureLoadPanel() {
    if (this._loadPanel) {
      return;
    }
    const $loadPanel = $('<div>').addClass(FORM_LOAD_PANEL_CLASS).appendTo(this._dependencies.$container);
    this._loadPanel = this._dependencies.onLoadPanelCreate($loadPanel, {
      width: FORM_LOAD_INDICATOR_SIZE,
      height: FORM_LOAD_INDICATOR_SIZE,
      maxHeight: undefined,
      maxWidth: undefined,
      position: {
        of: this._dependencies.$container.get(0)
      },
      visible: false,
      showIndicator: true,
      showPane: false,
      shading: false,
      hideOnOutsideClick: false,
      hideOnParentScroll: false,
      deferRendering: false,
      disabled: false,
      message: '',
      wrapperAttr: {
        class: FORM_LOAD_PANEL_WRAPPER_CLASS
      }
    });
    this._configureLoadIndicator();
  }
  _configureLoadIndicator() {
    var _this$_loadPanel4;
    const $loadIndicator = (_this$_loadPanel4 = this._loadPanel) === null || _this$_loadPanel4 === void 0 ? void 0 : _this$_loadPanel4._$indicator;
    if ($loadIndicator !== null && $loadIndicator !== void 0 && $loadIndicator.length) {
      const loadIndicator = LoadIndicator.getInstance($loadIndicator.get(0));
      loadIndicator.option({
        animationType: AnimationType.Sparkle,
        width: FORM_LOAD_INDICATOR_SIZE,
        height: FORM_LOAD_INDICATOR_SIZE
      });
    }
  }
}