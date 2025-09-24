"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.custom = exports.confirm = exports.alert = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _action = _interopRequireDefault(require("../../core/action"));
var _config = _interopRequireDefault(require("../../core/config"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _view_port = require("../../core/utils/view_port");
var _window = require("../../core/utils/window");
var _themes = require("../../ui/themes");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _m_dom = _interopRequireDefault(require("../core/utils/m_dom"));
var _m_popup = _interopRequireDefault(require("../ui/popup/m_popup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const window = (0, _window.getWindow)();
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
  text: _message.default.format('OK'),
  onClick: () => true
};
const getApplyButtonConfig = () => {
  if ((0, _themes.isFluent)((0, _themes.current)())) {
    return {
      stylingMode: 'contained',
      type: 'default'
    };
  }
  return {};
};
const getCancelButtonConfig = () => {
  if ((0, _themes.isFluent)((0, _themes.current)())) {
    return {
      stylingMode: 'outlined',
      type: 'normal'
    };
  }
  return {};
};
const custom = params => {
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
  const isMessageDefined = (0, _type.isDefined)(message);
  if (isMessageDefined) {
    _ui.default.log('W1013');
  }
  const isMessageHtmlDefined = (0, _type.isDefined)(messageHtml);
  const messageMarkup = String(isMessageHtmlDefined ? messageHtml : message);
  const messageId = title ? null : new _guid.default().toString();
  const deferred = (0, _deferred.Deferred)();
  const $element = (0, _renderer.default)('<div>').addClass(DX_DIALOG_CLASSNAME).appendTo((0, _view_port.value)());
  const $message = (0, _renderer.default)('<div>').addClass(DX_DIALOG_MESSAGE_CLASSNAME).html(messageMarkup).attr('id', messageId);
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
    _m_dom.default.resetActiveElement();
  };
  const onShown = e => {
    const component = e.component;
    const bottomToolbar = component.bottomToolbar();
    const $firstButton = bottomToolbar === null || bottomToolbar === void 0 ? void 0 : bottomToolbar.find(`.${DX_BUTTON_CLASSNAME}`).first();
    // @ts-expect-error trigger should be typed on type 'EventsEngineType'
    _events_engine.default.trigger($firstButton, 'focus');
  };
  const onHidden = e => {
    (0, _renderer.default)(e.element).remove();
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
    if (_devices.default.real().deviceType === 'phone') {
      var _popupInstance;
      const isPortrait = (0, _size.getHeight)(window) > (0, _size.getWidth)(window);
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
    const action = new _action.default(onClick, {
      context: popupInstance
    });
    const buttonItem = {
      toolbar: 'bottom',
      location: _devices.default.current().android ? 'after' : 'center',
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
    dragEnabled: (0, _common.ensureDefined)(dragEnabled, true),
    height: 'auto',
    ignoreChildEvents: false,
    onContentReady,
    onHidden,
    onHiding: () => {
      deferred.reject();
    },
    onShowing,
    onShown,
    // @ts-expect-error position should be typed correctly in popup.d.ts
    position: popupPosition,
    rtlEnabled: (0, _config.default)().rtlEnabled,
    showCloseButton: showCloseButton ?? false,
    showTitle: (0, _common.ensureDefined)(showTitle, true),
    title,
    toolbarItems,
    visualContainer: window,
    width
  };
  const options = _extends({}, configuration, popupOptions);
  // @ts-expect-error Incorrect constructor usage
  popupInstance = new _m_popup.default($element, options);
  popupInstance.$wrapper().addClass(DX_DIALOG_WRAPPER_CLASSNAME).addClass(DX_DIALOG_ROOT_CLASSNAME);
  const dialog = {
    show,
    hide
  };
  return dialog;
};
exports.custom = custom;
const isCustomDialogOptions = options => (0, _type.isPlainObject)(options);
// @ts-expect-error params and return types should be fixed in dialog.d.ts
const alert = (messageHtml, title, showTitle) => {
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
exports.alert = alert;
const confirm = (messageHtml, title, showTitle) => {
  const titleValue = title ?? '';
  const options = isCustomDialogOptions(messageHtml) ? messageHtml : {
    title: titleValue,
    messageHtml,
    showTitle,
    buttons: [_extends({
      text: _message.default.format('Yes'),
      onClick: () => true
    }, getApplyButtonConfig()), _extends({
      text: _message.default.format('No'),
      onClick: () => false
    }, getCancelButtonConfig())],
    dragEnabled: showTitle
  };
  return custom(options).show();
};
exports.confirm = confirm;