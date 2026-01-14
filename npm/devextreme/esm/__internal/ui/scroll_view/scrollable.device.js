/**
* DevExtreme (esm/__internal/ui/scroll_view/scrollable.device.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../core/devices';
import supportUtils from '../../core/utils/m_support';
export const deviceDependentOptions = function deviceDependentOptions() {
  return [{
    device() {
      return !supportUtils.nativeScrolling;
    },
    options: {
      useNative: false
    }
  }, {
    device(device) {
      return !devices.isSimulator() && devices.real().deviceType === 'desktop' && device.platform === 'generic';
    },
    options: {
      bounceEnabled: false,
      scrollByThumb: true,
      scrollByContent: supportUtils.touch,
      showScrollbar: 'onHover'
    }
  }];
};
