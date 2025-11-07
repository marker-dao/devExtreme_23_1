/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.dialogs.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import Widget from '../../core/widget/widget';
import Popup from '../../ui/popup/m_popup';
class DiagramDialog extends Widget {
  _init() {
    super._init();
    this._command = undefined;
    this._isShown = false;
    this._createOnGetContentOption();
    this._createOnHiddenOption();
  }
  _initMarkup() {
    super._initMarkup();
    const {
      command,
      title,
      maxWidth,
      height,
      toolbarItems
    } = this.option();
    this._command = command;
    this._$popupElement = $('<div>').appendTo(this.$element());
    this._popup = this._createComponent(this._$popupElement, Popup, {
      title,
      maxWidth,
      height,
      toolbarItems,
      onHidden: this._onHiddenAction
    });
  }
  _clean() {
    var _this$_$popupElement;
    delete this._popup;
    (_this$_$popupElement = this._$popupElement) === null || _this$_$popupElement === void 0 || _this$_$popupElement.remove();
  }
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(super._getDefaultOptions(), {
      title: '',
      maxWidth: 500,
      height: 'auto',
      toolbarItems: this._getToolbarItems()
    });
  }
  _getToolbarItems() {
    return [this._getOkToolbarItem(), this._getCancelToolbarItem()];
  }
  _getOkToolbarItem() {
    return {
      widget: 'dxButton',
      location: 'after',
      toolbar: 'bottom',
      options: {
        text: messageLocalization.format('dxDiagram-dialogButtonOK'),
        onClick: () => {
          this._command.execute(this._commandParameter);
          this._hide();
        }
      }
    };
  }
  _getCancelToolbarItem() {
    return {
      widget: 'dxButton',
      location: 'after',
      toolbar: 'bottom',
      options: {
        text: messageLocalization.format('dxDiagram-dialogButtonCancel'),
        onClick: this._hide.bind(this)
      }
    };
  }
  _optionChanged(args) {
    var _this$_popup;
    switch (args.name) {
      case 'title':
      case 'maxWidth':
      case 'height':
      case 'toolbarItems':
        (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.option(args.name, args.value);
        break;
      case 'command':
        this._command = args.value;
        break;
      case 'onGetContent':
        this._createOnGetContentOption();
        break;
      case 'onHidden':
        this._createOnHiddenOption();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _createOnGetContentOption() {
    this._onGetContentAction = this._createActionByOption('onGetContent');
  }
  _createOnHiddenOption() {
    this._onHiddenAction = this._createActionByOption('onHidden');
  }
  _hide() {
    var _this$_popup2;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 || _this$_popup2.hide();
    this._isShown = false;
  }
  _show() {
    var _this$_popup3, _this$_popup4;
    (_this$_popup3 = this._popup) === null || _this$_popup3 === void 0 || _this$_popup3.$content().empty().append(this._onGetContentAction());
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_popup4 = this._popup) === null || _this$_popup4 === void 0 || _this$_popup4.show();
    this._isShown = true;
  }
  isVisible() {
    return this._isShown;
  }
}
export default DiagramDialog;
