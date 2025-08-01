/**
* DevExtreme (cjs/__internal/scheduler/r1/appointment_popup/config.js)
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
exports.isPopupFullScreenNeeded = exports.getPopupToolbarItems = exports.getPopupSize = exports.getMaxWidth = exports.defaultAnimation = exports.POPUP_WIDTH = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _size = require("../../../../core/utils/size");
var _window = require("../../../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const POPUP_WIDTH = exports.POPUP_WIDTH = {
  DEFAULT: 485,
  RECURRENCE: 970,
  FULLSCREEN: 1000,
  MOBILE: {
    DEFAULT: 350,
    FULLSCREEN: 500
  }
};
const defaultAnimation = exports.defaultAnimation = {
  show: {
    type: 'pop',
    duration: 300,
    from: {
      scale: 0.55
    }
  },
  hide: {
    type: 'pop',
    duration: 300,
    to: {
      opacity: 0,
      scale: 0.55
    },
    from: {
      opacity: 1,
      scale: 1
    }
  }
};
const isMobile = () => _devices.default.current().deviceType !== 'desktop';
const isIOSPlatform = () => _devices.default.current().platform === 'ios';
const TOOLBAR_LOCATION = {
  AFTER: 'after',
  BEFORE: 'before'
};
const getButtonsConfig = () => ({
  doneButton: {
    shortcut: 'done',
    options: {
      text: _message.default.format('Done')
    },
    location: TOOLBAR_LOCATION.AFTER
  },
  cancelButton: {
    shortcut: 'cancel',
    location: isIOSPlatform() ? TOOLBAR_LOCATION.BEFORE : TOOLBAR_LOCATION.AFTER
  }
});
const getPopupToolbarItems = (allowUpdating, doneClick) => {
  const result = [];
  const buttonsConfig = getButtonsConfig();
  if (allowUpdating) {
    result.push(_extends({}, buttonsConfig.doneButton, {
      onClick: doneClick
    }));
  }
  result.push(buttonsConfig.cancelButton);
  return result;
};
exports.getPopupToolbarItems = getPopupToolbarItems;
const isPopupFullScreenNeeded = () => {
  const window = (0, _window.getWindow)();
  const width = window && (0, _size.getWidth)(window);
  if (width) {
    return isMobile() ? width < POPUP_WIDTH.MOBILE.FULLSCREEN : width < POPUP_WIDTH.FULLSCREEN;
  }
  return false;
};
exports.isPopupFullScreenNeeded = isPopupFullScreenNeeded;
const getMaxWidth = isRecurrence => {
  if (isMobile()) {
    return POPUP_WIDTH.MOBILE.DEFAULT;
  }
  return isRecurrence ? POPUP_WIDTH.RECURRENCE : POPUP_WIDTH.DEFAULT;
};
exports.getMaxWidth = getMaxWidth;
const getPopupSize = isRecurrence => ({
  fullScreen: isPopupFullScreenNeeded(),
  maxWidth: getMaxWidth(isRecurrence)
});
exports.getPopupSize = getPopupSize;
