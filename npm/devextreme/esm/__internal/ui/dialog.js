/**
* DevExtreme (esm/__internal/ui/dialog.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../common/core/events/core/events_engine';
import messageLocalization from '../../common/core/localization/message';
import Action from '../../core/action';
import config from '../../core/config';
import devices from '../../core/devices';
import Guid from '../../core/guid';
import $ from '../../core/renderer';
import { ensureDefined } from '../../core/utils/common';
import { Deferred } from '../../core/utils/deferred';
import { getHeight, getWidth } from '../../core/utils/size';
import { isDefined, isPlainObject } from '../../core/utils/type';
import { value as getViewport } from '../../core/utils/view_port';
import { getWindow } from '../../core/utils/window';
import { current, isFluent } from '../../ui/themes';
import errors from '../../ui/widget/ui.errors';
import domUtils from '../core/utils/m_dom';
import Popup from '../ui/popup/m_popup';
const window = getWindow();
const DX_DIALOG_CLASSNAME = 'dx-dialog';
const DX_DIALOG_WRAPPER_CLASSNAME = 'dx-dialog-wrapper';
const DX_DIALOG_ROOT_CLASSNAME = 'dx-dialog-root';
const DX_DIALOG_CONTENT_CLASSNAME = 'dx-dialog-content';
const DX_DIALOG_MESSAGE_CLASSNAME = 'dx-dialog-message';
const DX_DIALOG_BUTTONS_CLASSNAME = 'dx-dialog-buttons';
const DX_DIALOG_BUTTON_CLASSNAME = 'dx-dialog-button';
const DX_BUTTON_CLASSNAME = 'dx-button';
const DEFAULT_HORIZONTAL_OFFSET = 10;
const DEFAULT_VERTICAL_OFFSET = 0;
const DEFAULT_BOUNDARY_OFFSET = {
  h: DEFAULT_HORIZONTAL_OFFSET,
  v: DEFAULT_VERTICAL_OFFSET
};
const DEFAULT_BUTTON_OPTIONS = {
  text: messageLocalization.format('OK'),
  onClick: () => true
};
const getApplyButtonConfig = () => {
  if (isFluent(current())) {
    return {
      stylingMode: 'contained',
      type: 'default'
    };
  }
  return {};
};
const getCancelButtonConfig = () => {
  if (isFluent(current())) {
    return {
      stylingMode: 'outlined',
      type: 'normal'
    };
  }
  return {};
};
export const custom = params => {
  const {
    buttons,
    dragEnabled,
    message,
    messageHtml,
    popupOptions,
    showCloseButton,
    showTitle,
    title = '',
    width,
    position
  } = params ?? {};
  const isMessageDefined = isDefined(message);
  if (isMessageDefined) {
    errors.log('W1013');
  }
  const isMessageHtmlDefined = isDefined(messageHtml);
  const messageMarkup = String(isMessageHtmlDefined ? messageHtml : message);
  const messageId = title ? null : new Guid().toString();
  const deferred = Deferred();
  const $element = $('<div>').addClass(DX_DIALOG_CLASSNAME).appendTo(getViewport());
  const $message = $('<div>').addClass(DX_DIALOG_MESSAGE_CLASSNAME).html(messageMarkup).attr('id', messageId);
  const onContentReady = e => {
    const component = e.component;
    component.$content().addClass(DX_DIALOG_CONTENT_CLASSNAME).append($message);
    if (messageId) {
      component.$overlayContent().attr('aria-labelledby', messageId);
    }
  };
  const onShowing = e => {
    const component = e.component;
    const bottomToolbar = component.bottomToolbar();
    bottomToolbar === null || bottomToolbar === void 0 || bottomToolbar.addClass(DX_DIALOG_BUTTONS_CLASSNAME).find(`.${DX_BUTTON_CLASSNAME}`).addClass(DX_DIALOG_BUTTON_CLASSNAME);
    domUtils.resetActiveElement();
  };
  const onShown = e => {
    const component = e.component;
    const bottomToolbar = component.bottomToolbar();
    const $firstButton = bottomToolbar === null || bottomToolbar === void 0 ? void 0 : bottomToolbar.find(`.${DX_BUTTON_CLASSNAME}`).first();
    // @ts-expect-error trigger should be typed on type 'EventsEngineType'
    eventsEngine.trigger($firstButton, 'focus');
  };
  const animation = {
    show: {
      type: 'pop',
      duration: 400
    },
    hide: {
      type: 'pop',
      duration: 400,
      to: {
        opacity: 0,
        scale: 0
      },
      from: {
        opacity: 1,
        scale: 1
      }
    }
  };
  let popupInstance = null;
  const show = () => {
    var _popupInstance2;
    if (devices.real().deviceType === 'phone') {
      var _popupInstance;
      const isPortrait = getHeight(window) > getWidth(window);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const width = isPortrait ? '90%' : '60%';
      (_popupInstance = popupInstance) === null || _popupInstance === void 0 || _popupInstance.option({
        width
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_popupInstance2 = popupInstance) === null || _popupInstance2 === void 0 || _popupInstance2.show();
    return deferred.promise();
  };
  const hide = value => {
    var _popupInstance3;
    deferred.resolve(value);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_popupInstance3 = popupInstance) === null || _popupInstance3 === void 0 || _popupInstance3.hide();
  };
  const buttonOptions = buttons ?? [DEFAULT_BUTTON_OPTIONS];
  const toolbarItems = buttonOptions.map(configuration => {
    const {
      onClick
    } = configuration;
    const action = new Action(onClick, {
      context: popupInstance
    });
    const buttonItem = {
      toolbar: 'bottom',
      location: devices.current().android ? 'after' : 'center',
      widget: 'dxButton',
      options: _extends({}, configuration, {
        onClick: e => {
          const result = action.execute(e);
          hide(result);
        }
      })
    };
    return buttonItem;
  });
  const popupPosition = position ?? {
    boundaryOffset: _extends({}, DEFAULT_BOUNDARY_OFFSET)
  };
  const configuration = {
    // @ts-expect-error animation should be typed correctly in popup.d.ts
    animation,
    // @ts-expect-error container should be typed correctly in popup.d.ts
    container: $element,
    // @ts-expect-error dragAndResizeArea should be typed correctly in popup.d.ts
    dragAndResizeArea: window,
    dragEnabled: ensureDefined(dragEnabled, true),
    height: 'auto',
    ignoreChildEvents: false,
    onContentReady,
    onHiding: () => {
      deferred.reject();
    },
    onShowing,
    onShown,
    // @ts-expect-error position should be typed correctly in popup.d.ts
    position: popupPosition,
    rtlEnabled: config().rtlEnabled,
    showCloseButton: showCloseButton ?? false,
    showTitle: ensureDefined(showTitle, true),
    title,
    toolbarItems,
    visualContainer: window,
    width
  };
  const options = _extends({}, configuration, popupOptions, {
    onHidden: e => {
      var _popupOptions$onHidde;
      $(e.element).remove();
      popupOptions === null || popupOptions === void 0 || (_popupOptions$onHidde = popupOptions.onHidden) === null || _popupOptions$onHidde === void 0 || _popupOptions$onHidde.call(popupOptions, e);
    }
  });
  // @ts-expect-error Incorrect constructor usage
  popupInstance = new Popup($element, options);
  popupInstance.$wrapper().addClass(DX_DIALOG_WRAPPER_CLASSNAME).addClass(DX_DIALOG_ROOT_CLASSNAME);
  const dialog = {
    show,
    hide
  };
  return dialog;
};
const isCustomDialogOptions = options => isPlainObject(options);
// @ts-expect-error params and return types should be fixed in dialog.d.ts
export const alert = (messageHtml, title, showTitle) => {
  const titleValue = title ?? '';
  const options = isCustomDialogOptions(messageHtml) ? messageHtml : {
    title: titleValue,
    messageHtml,
    showTitle,
    buttons: [_extends({}, DEFAULT_BUTTON_OPTIONS, getApplyButtonConfig())],
    dragEnabled: showTitle
  };
  return custom(options).show();
};
// @ts-expect-error params and return types should be fixed in dialog.d.ts
export const confirm = (messageHtml, title, showTitle) => {
  const titleValue = title ?? '';
  const options = isCustomDialogOptions(messageHtml) ? messageHtml : {
    title: titleValue,
    messageHtml,
    showTitle,
    buttons: [_extends({
      text: messageLocalization.format('Yes'),
      onClick: () => true
    }, getApplyButtonConfig()), _extends({
      text: messageLocalization.format('No'),
      onClick: () => false
    }, getCancelButtonConfig())],
    dragEnabled: showTitle
  };
  return custom(options).show();
};
