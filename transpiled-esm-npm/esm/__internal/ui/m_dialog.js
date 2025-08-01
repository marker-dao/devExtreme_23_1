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
import { extend } from '../../core/utils/extend';
import { getHeight, getWidth } from '../../core/utils/size';
import { isPlainObject } from '../../core/utils/type';
import { value as getViewport } from '../../core/utils/view_port';
import { getWindow } from '../../core/utils/window';
import Popup from '../../ui/popup/ui.popup';
import { isFluent } from '../../ui/themes';
import errors from '../../ui/widget/ui.errors';
import domUtils from '../core/utils/m_dom';
const window = getWindow();
const DEFAULT_BUTTON = {
  text: 'OK',
  onClick() {
    return true;
  }
};
const DX_DIALOG_CLASSNAME = 'dx-dialog';
const DX_DIALOG_WRAPPER_CLASSNAME = `${DX_DIALOG_CLASSNAME}-wrapper`;
const DX_DIALOG_ROOT_CLASSNAME = `${DX_DIALOG_CLASSNAME}-root`;
const DX_DIALOG_CONTENT_CLASSNAME = `${DX_DIALOG_CLASSNAME}-content`;
const DX_DIALOG_MESSAGE_CLASSNAME = `${DX_DIALOG_CLASSNAME}-message`;
const DX_DIALOG_BUTTONS_CLASSNAME = `${DX_DIALOG_CLASSNAME}-buttons`;
const DX_DIALOG_BUTTON_CLASSNAME = `${DX_DIALOG_CLASSNAME}-button`;
const DX_BUTTON_CLASSNAME = 'dx-button';
const getApplyButtonConfig = () => {
  // @ts-expect-error
  if (isFluent()) {
    return {
      stylingMode: 'contained',
      type: 'default'
    };
  }
  return {};
};
const getCancelButtonConfig = () => {
  // @ts-expect-error
  if (isFluent()) {
    return {
      stylingMode: 'outlined',
      type: 'normal'
    };
  }
  return {};
};
export const custom = function (options) {
  const deferred = Deferred();
  options = options || {};
  const $element = $('<div>').addClass(DX_DIALOG_CLASSNAME).appendTo(getViewport());
  const isMessageDefined = 'message' in options;
  const isMessageHtmlDefined = 'messageHtml' in options;
  if (isMessageDefined) {
    errors.log('W1013');
  }
  const messageHtml = String(isMessageHtmlDefined ? options.messageHtml : options.message);
  const messageId = options.title ? null : new Guid();
  const $message = $('<div>').addClass(DX_DIALOG_MESSAGE_CLASSNAME).html(messageHtml)
  // @ts-expect-error
  .attr('id', messageId);
  const popupToolbarItems = [];
  // @ts-expect-error ts-error
  const popupInstance = new Popup($element, extend({
    title: options.title ?? '',
    showTitle: ensureDefined(options.showTitle, true),
    dragEnabled: ensureDefined(options.dragEnabled, true),
    height: 'auto',
    width: options.width,
    showCloseButton: options.showCloseButton || false,
    ignoreChildEvents: false,
    container: $element,
    visualContainer: window,
    dragAndResizeArea: window,
    onContentReady(args) {
      args.component.$content().addClass(DX_DIALOG_CONTENT_CLASSNAME).append($message);
      if (messageId) {
        args.component.$overlayContent().attr('aria-labelledby', messageId);
      }
    },
    onShowing(e) {
      e.component.bottomToolbar().addClass(DX_DIALOG_BUTTONS_CLASSNAME).find(`.${DX_BUTTON_CLASSNAME}`).addClass(DX_DIALOG_BUTTON_CLASSNAME);
      domUtils.resetActiveElement();
    },
    onShown(e) {
      const $firstButton = e.component.bottomToolbar().find(`.${DX_BUTTON_CLASSNAME}`).first();
      // @ts-expect-error
      eventsEngine.trigger($firstButton, 'focus');
    },
    onHiding() {
      deferred.reject();
    },
    onHidden(_ref) {
      let {
        element
      } = _ref;
      $(element).remove();
    },
    animation: {
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
    },
    rtlEnabled: config().rtlEnabled,
    position: {
      boundaryOffset: {
        h: 10,
        v: 0
      }
    }
  }, options.popupOptions));
  const buttonOptions = options.buttons || [DEFAULT_BUTTON];
  buttonOptions.forEach(options => {
    const action = new Action(options.onClick, {
      context: popupInstance
    });
    // @ts-expect-error
    popupToolbarItems.push({
      toolbar: 'bottom',
      location: devices.current().android ? 'after' : 'center',
      widget: 'dxButton',
      options: _extends({}, options, {
        onClick() {
          const result = action.execute(...arguments);
          hide(result);
        }
      })
    });
  });
  popupInstance.option('toolbarItems', popupToolbarItems);
  popupInstance.$wrapper().addClass(DX_DIALOG_WRAPPER_CLASSNAME);
  if (options.position) {
    popupInstance.option('position', options.position);
  }
  popupInstance.$wrapper().addClass(DX_DIALOG_ROOT_CLASSNAME);
  function show() {
    if (devices.real().deviceType === 'phone') {
      const isPortrait = getHeight(window) > getWidth(window);
      const width = isPortrait ? '90%' : '60%';
      popupInstance.option({
        width
      });
    }
    popupInstance.show();
    return deferred.promise();
  }
  function hide(value) {
    deferred.resolve(value);
    popupInstance.hide();
  }
  return {
    show,
    hide
  };
};
// eslint-disable-next-line @typescript-eslint/default-param-last
export const alert = function (messageHtml) {
  let title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let showTitle = arguments.length > 2 ? arguments[2] : undefined;
  const options = isPlainObject(messageHtml) ? messageHtml : {
    title,
    messageHtml,
    showTitle,
    buttons: [_extends({}, DEFAULT_BUTTON, getApplyButtonConfig())],
    dragEnabled: showTitle
  };
  return custom(options).show();
};
// eslint-disable-next-line @typescript-eslint/default-param-last
export const confirm = function (messageHtml) {
  let title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let showTitle = arguments.length > 2 ? arguments[2] : undefined;
  const options = isPlainObject(messageHtml) ? messageHtml : {
    title,
    messageHtml,
    showTitle,
    buttons: [_extends({
      text: messageLocalization.format('Yes'),
      onClick() {
        return true;
      }
    }, getApplyButtonConfig()), _extends({
      text: messageLocalization.format('No'),
      onClick() {
        return false;
      }
    }, getCancelButtonConfig())],
    dragEnabled: showTitle
  };
  return custom(options).show();
};