"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileTooltipStrategy = void 0;
var _size = require("../../../core/utils/size");
var _window = require("../../../core/utils/window");
var _ui = _interopRequireDefault(require("../../../ui/overlay/ui.overlay"));
var _m_tooltip_strategy_base = require("./m_tooltip_strategy_base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const SLIDE_PANEL_CLASS_NAME = 'dx-scheduler-overlay-panel';
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
        of: (0, _window.getWindow)()
      }
    },
    to: {
      position: {
        my: 'center',
        at: 'center',
        of: (0, _window.getWindow)()
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
        of: (0, _window.getWindow)()
      }
    },
    from: {
      position: {
        my: 'center',
        at: 'center',
        of: (0, _window.getWindow)()
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
    of: (0, _window.getWindow)()
  }
});
const createTabletDeviceConfig = listHeight => {
  const currentMaxHeight = (0, _size.getHeight)((0, _window.getWindow)()) * MAX_TABLET_OVERLAY_HEIGHT_FACTOR;
  return {
    shading: true,
    width: MAX_WIDTH.TABLET,
    height: listHeight > currentMaxHeight ? MAX_HEIGHT.TABLET : MAX_HEIGHT.DEFAULT,
    position: {
      my: 'center',
      at: 'center',
      of: (0, _window.getWindow)()
    }
  };
};
let MobileTooltipStrategy = /*#__PURE__*/function (_TooltipStrategyBase) {
  _inheritsLoose(MobileTooltipStrategy, _TooltipStrategyBase);
  function MobileTooltipStrategy() {
    return _TooltipStrategyBase.apply(this, arguments) || this;
  }
  var _proto = MobileTooltipStrategy.prototype;
  _proto._shouldUseTarget = function _shouldUseTarget() {
    return false;
  };
  _proto._onShowing = function _onShowing() {
    const isTabletWidth = (0, _size.getWidth)((0, _window.getWindow)()) > 700;
    this._tooltip.option('height', MAX_HEIGHT.DEFAULT);
    const listHeight = (0, _size.getOuterHeight)(this._list.$element());
    this._tooltip.option(isTabletWidth ? createTabletDeviceConfig(listHeight) : createPhoneDeviceConfig(listHeight));
  };
  _proto._createTooltip = function _createTooltip(target, dataList) {
    const element = this._createTooltipElement(SLIDE_PANEL_CLASS_NAME);
    return this._options.createComponent(element, _ui.default, {
      target: (0, _window.getWindow)(),
      hideOnOutsideClick: true,
      animation: animationConfig,
      onShowing: () => this._onShowing(),
      onShown: this._onShown.bind(this),
      contentTemplate: this._getContentTemplate(dataList),
      wrapperAttr: {
        class: SLIDE_PANEL_CLASS_NAME
      }
    });
  };
  return MobileTooltipStrategy;
}(_m_tooltip_strategy_base.TooltipStrategyBase);
exports.MobileTooltipStrategy = MobileTooltipStrategy;