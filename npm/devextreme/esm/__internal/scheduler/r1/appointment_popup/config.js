/**
* DevExtreme (esm/__internal/scheduler/r1/appointment_popup/config.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../../common/core/localization/message';
import devices from '../../../../core/devices';
import { getWidth } from '../../../../core/utils/size';
import { getWindow } from '../../../../core/utils/window';
export const POPUP_WIDTH = {
  DEFAULT: 485,
  RECURRENCE: 970,
  FULLSCREEN: 1000,
  MOBILE: {
    DEFAULT: 350,
    FULLSCREEN: 500
  }
};
export const defaultAnimation = {
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
const isMobile = () => devices.current().deviceType !== 'desktop';
const isIOSPlatform = () => devices.current().platform === 'ios';
const TOOLBAR_LOCATION = {
  AFTER: 'after',
  BEFORE: 'before'
};
const getButtonsConfig = () => ({
  doneButton: {
    shortcut: 'done',
    options: {
      text: messageLocalization.format('Done')
    },
    location: TOOLBAR_LOCATION.AFTER
  },
  cancelButton: {
    shortcut: 'cancel',
    location: isIOSPlatform() ? TOOLBAR_LOCATION.BEFORE : TOOLBAR_LOCATION.AFTER
  }
});
export const getPopupToolbarItems = (allowUpdating, doneClick) => {
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
export const isPopupFullScreenNeeded = () => {
  const window = getWindow();
  const width = window && getWidth(window);
  if (width) {
    return isMobile() ? width < POPUP_WIDTH.MOBILE.FULLSCREEN : width < POPUP_WIDTH.FULLSCREEN;
  }
  return false;
};
export const getMaxWidth = isRecurrence => {
  if (isMobile()) {
    return POPUP_WIDTH.MOBILE.DEFAULT;
  }
  return isRecurrence ? POPUP_WIDTH.RECURRENCE : POPUP_WIDTH.DEFAULT;
};
export const getPopupSize = isRecurrence => ({
  fullScreen: isPopupFullScreenNeeded(),
  maxWidth: getMaxWidth(isRecurrence)
});
