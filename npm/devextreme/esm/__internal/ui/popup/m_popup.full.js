/**
* DevExtreme (esm/__internal/ui/popup/m_popup.full.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/toolbar';
import registerComponent from '../../../core/component_registrator';
import Popup from '../../../ui/popup/ui.popup';
export default class PopupFull extends Popup {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      preventScrollEvents: false
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _getToolbarName() {
    return 'dxToolbar';
  }
}
PopupFull.defaultOptions = function (rule) {
  Popup.defaultOptions(rule);
};
registerComponent('dxPopup', PopupFull);
