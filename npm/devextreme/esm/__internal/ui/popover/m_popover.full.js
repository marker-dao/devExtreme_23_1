/**
* DevExtreme (esm/__internal/ui/popover/m_popover.full.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/toolbar';
import registerComponent from '../../../core/component_registrator';
import Popover from '../../../ui/popover/ui.popover';
export default class PopoverFull extends Popover {
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
PopoverFull.defaultOptions = function (rule) {
  Popover.defaultOptions(rule);
};
registerComponent('dxPopover', PopoverFull);
