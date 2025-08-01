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