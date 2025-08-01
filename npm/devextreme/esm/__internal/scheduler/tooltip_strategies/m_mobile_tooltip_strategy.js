/**
* DevExtreme (esm/__internal/scheduler/tooltip_strategies/m_mobile_tooltip_strategy.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getHeight, getOuterHeight, getWidth } from '../../../core/utils/size';
import { getWindow } from '../../../core/utils/window';
import Overlay from '../../../ui/overlay/ui.overlay';
import { TooltipStrategyBase } from './m_tooltip_strategy_base';
const CLASS = {
  slidePanel: 'dx-scheduler-overlay-panel',
  scrollableContent: '.dx-scrollable-content'
};
const MAX_TABLET_OVERLAY_HEIGHT_FACTOR = 0.9;
const MAX_HEIGHT = {
  PHONE: 250,
  TABLET: '90%',
  DEFAULT: 'auto'
};
const MAX_WIDTH = {
  PHONE: '100%',
  TABLET: '80%'
};
const animationConfig = {
  show: {
    type: 'slide',
    duration: 300,
    from: {
      position: {
        my: 'top',
        at: 'bottom',
        of: getWindow()
      }
    },
    to: {
      position: {
        my: 'center',
        at: 'center',
        of: getWindow()
      }
    }
  },
  hide: {
    type: 'slide',
    duration: 300,
    to: {
      position: {
        my: 'top',
        at: 'bottom',
        of: getWindow()
      }
    },
    from: {
      position: {
        my: 'center',
        at: 'center',
        of: getWindow()
      }
    }
  }
};
const createPhoneDeviceConfig = listHeight => ({
  shading: false,
  width: MAX_WIDTH.PHONE,
  height: listHeight > MAX_HEIGHT.PHONE ? MAX_HEIGHT.PHONE : MAX_HEIGHT.DEFAULT,
  position: {
    my: 'bottom',
    at: 'bottom',
    of: getWindow()
  }
});
const createTabletDeviceConfig = listHeight => {
  const currentMaxHeight = getHeight(getWindow()) * MAX_TABLET_OVERLAY_HEIGHT_FACTOR;
  return {
    shading: true,
    width: MAX_WIDTH.TABLET,
    height: listHeight > currentMaxHeight ? MAX_HEIGHT.TABLET : MAX_HEIGHT.DEFAULT,
    position: {
      my: 'center',
      at: 'center',
      of: getWindow()
    }
  };
};
export class MobileTooltipStrategy extends TooltipStrategyBase {
  _shouldUseTarget() {
    return false;
  }
  setTooltipConfig() {
    const isTabletWidth = getWidth(getWindow()) > 700;
    const listHeight = getOuterHeight(this._list.$element().find(CLASS.scrollableContent));
    this._tooltip.option(isTabletWidth ? createTabletDeviceConfig(listHeight) : createPhoneDeviceConfig(listHeight));
  }
  async _onShowing() {
    this._tooltip.option('height', MAX_HEIGHT.DEFAULT);
    /*
    NOTE: there are two setTooltipConfig calls to reduce blinking of overlay.
    The first one sets initial sizes, the second updates them after rendering async templates
    */
    this.setTooltipConfig();
    await Promise.all([...this.asyncTemplatePromises]);
    this.setTooltipConfig();
  }
  _createTooltip(target, dataList) {
    const element = this._createTooltipElement(CLASS.slidePanel);
    return this._options.createComponent(element, Overlay, {
      target: getWindow(),
      hideOnOutsideClick: true,
      animation: animationConfig,
      onShowing: () => this._onShowing(),
      onShown: this._onShown.bind(this),
      contentTemplate: this._getContentTemplate(dataList),
      wrapperAttr: {
        class: CLASS.slidePanel
      }
    });
  }
}
