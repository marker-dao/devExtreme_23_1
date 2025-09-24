import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../../common/core/events/core/events_engine';
import pointerEvents from '../../../common/core/events/pointer';
import registerComponent from '../../../core/component_registrator';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import readyCallbacks from '../../../core/utils/ready_callbacks';
import { isString } from '../../../core/utils/type';
import Overlay from '../../../ui/overlay/ui.overlay';
import { current, isMaterialBased } from '../../../ui/themes';
const ready = readyCallbacks.add;
export const TOAST_CLASS = 'dx-toast';
const TOAST_WRAPPER_CLASS = 'dx-toast-wrapper';
const TOAST_CONTENT_CLASS = 'dx-toast-content';
const TOAST_MESSAGE_CLASS = 'dx-toast-message';
const TOAST_ICON_CLASS = 'dx-toast-icon';
const WIDGET_NAME = 'dxToast';
const toastTypes = ['info', 'warning', 'error', 'success'];
const TOAST_STACK = [];
const FIRST_Z_INDEX_OFFSET = 8000;
const POSITION_ALIASES = {
  top: {
    my: 'top',
    at: 'top',
    of: null,
    offset: '0 0'
  },
  bottom: {
    my: 'bottom',
    at: 'bottom',
    of: null,
    offset: '0 -20'
  },
  center: {
    my: 'center',
    at: 'center',
    of: null,
    offset: '0 0'
  },
  right: {
    my: 'center right',
    at: 'center right',
    of: null,
    offset: '0 0'
  },
  left: {
    my: 'center left',
    at: 'center left',
    of: null,
    offset: '0 0'
  }
};
const DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
const DEFAULT_MARGIN = 20;
ready(() => {
  const element = domAdapter.getDocument();
  const callback = e => {
    for (let i = TOAST_STACK.length - 1; i >= 0; i -= 1) {
      var _TOAST_STACK$i$_proxi, _TOAST_STACK$i;
      if (!((_TOAST_STACK$i$_proxi = (_TOAST_STACK$i = TOAST_STACK[i])._proxiedDocumentDownHandler) !== null && _TOAST_STACK$i$_proxi !== void 0 && _TOAST_STACK$i$_proxi.call(_TOAST_STACK$i, e))) {
        return;
      }
    }
  };
  // @ts-expect-error subscribeGlobal should be described in .d.ts
  eventsEngine.subscribeGlobal(element, pointerEvents.down, callback);
});
class Toast extends Overlay {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      message: '',
      type: 'info',
      displayTime: 2000,
      position: 'bottom center',
      animation: {
        show: {
          type: 'fade',
          duration: 400,
          from: 0,
          to: 1
        },
        hide: {
          type: 'fade',
          duration: 400,
          from: 1,
          to: 0
        }
      },
      shading: false,
      height: 'auto',
      hideTopOverlayHandler: null,
      preventScrollEvents: false,
      closeOnSwipe: true,
      closeOnClick: false
    });
  }
  _defaultOptionsRules() {
    const tabletAndMobileAnimation = {
      show: {
        type: 'fade',
        duration: 200,
        from: 0,
        to: 1
      },
      hide: {
        type: 'fade',
        duration: 200,
        from: 1,
        to: 0
      }
    };
    const tabletAndMobileCommonOptions = {
      displayTime: isMaterialBased(current()) ? 4000 : 2000,
      hideOnOutsideClick: true,
      animation: tabletAndMobileAnimation
    };
    const toastRules = [{
      device(device) {
        return device.deviceType === 'phone';
      },
      options: _extends({
        width: `calc(100vw - ${DEFAULT_MARGIN * 2}px)`
      }, tabletAndMobileCommonOptions)
    }, {
      device(device) {
        return device.deviceType === 'tablet';
      },
      options: _extends({
        width: 'auto',
        maxWidth: '80vw'
      }, tabletAndMobileCommonOptions)
    }, {
      device(device) {
        return isMaterialBased(current()) && device.deviceType === 'desktop';
      },
      options: {
        minWidth: 344,
        maxWidth: 568,
        displayTime: 4000
      }
    }];
    const rules = [...super._defaultOptionsRules(), ...toastRules];
    return rules;
  }
  _init() {
    super._init();
    this._posStringToObject();
  }
  _renderContentImpl() {
    const {
      message,
      type
    } = this.option();
    this._message = $('<div>').addClass(TOAST_MESSAGE_CLASS).text(message ?? '').appendTo(this.$content());
    this.setAria('role', 'alert', this._message);
    if (type && toastTypes.includes(type.toLowerCase())) {
      this.$content().prepend($('<div>').addClass(TOAST_ICON_CLASS));
    }
    return super._renderContentImpl();
  }
  _render() {
    super._render();
    this.$element().addClass(TOAST_CLASS);
    this.$wrapper().addClass(TOAST_WRAPPER_CLASS);
    const {
      type
    } = this.option();
    if (type) {
      this.$content().addClass(`${TOAST_CLASS}-${type.toLowerCase()}`);
    }
    this.$content().addClass(TOAST_CONTENT_CLASS);
    this._toggleCloseEvents('Swipe');
    this._toggleCloseEvents('Click');
  }
  _toggleCloseEvents(event) {
    const dxEvent = `dx${event.toLowerCase()}`;
    eventsEngine.off(this.$content(), dxEvent);
    const optionName = `closeOn${event}`;
    const optionValue = this.option(optionName);
    if (optionValue) {
      eventsEngine.on(this.$content(), dxEvent, this.hide.bind(this));
    }
  }
  _posStringToObject() {
    const {
      position
    } = this.option();
    if (!isString(position)) {
      return;
    }
    const verticalPosition = position.split(' ')[0];
    const horizontalPosition = position.split(' ')[1];
    const newPosition = _extends({
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET
    }, POSITION_ALIASES[verticalPosition]);
    this.option('position', newPosition);
    switch (horizontalPosition) {
      case 'center':
      case 'left':
      case 'right':
        {
          if (newPosition && typeof newPosition === 'object') {
            const at = `${newPosition.at} ${horizontalPosition}`;
            const my = `${newPosition.my} ${horizontalPosition}`;
            this.option('position.at', at);
            this.option('position.my', my);
          }
          break;
        }
      default:
        break;
    }
  }
  _show() {
    const callback = () => {
      clearTimeout(this._hideTimeout);
      const {
        displayTime
      } = this.option();
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-restricted-globals
      this._hideTimeout = setTimeout(this.hide.bind(this), displayTime);
    };
    const promise = super._show();
    promise.always(callback);
    return promise;
  }
  // @ts-expect-error Violation of the Principle of Liskov Substitutability
  // eslint-disable-next-line class-methods-use-this
  _overlayStack() {
    return TOAST_STACK;
  }
  _zIndexInitValue() {
    return super._zIndexInitValue() + FIRST_Z_INDEX_OFFSET;
  }
  _dispose() {
    clearTimeout(this._hideTimeout);
    super._dispose();
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'type':
        this.$content().removeClass(`${TOAST_CLASS}-${previousValue}`);
        if (value) {
          this.$content().addClass(`${TOAST_CLASS}-${String(value).toLowerCase()}`);
        }
        break;
      case 'message':
        if (this._message) {
          // @ts-expect-error ts-error
          this._message.text(value);
        }
        break;
      case 'closeOnSwipe':
        this._toggleCloseEvents('Swipe');
        break;
      case 'closeOnClick':
        this._toggleCloseEvents('Click');
        break;
      case 'displayTime':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
registerComponent(WIDGET_NAME, Toast);
export default Toast;