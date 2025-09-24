/* eslint-disable max-classes-per-file */
import { fx } from '../../../common/core/animation';
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { getOuterWidth, getWidth } from '../../../core/utils/size';
import Button from '../../../ui/button';
import { current, isMaterialBased } from '../../../ui/themes';
import SwitchableEditDecorator from '../../ui/list/list.edit.decorator.switchable';
import { register as registerDecorator } from '../../ui/list/list.edit.decorator_registry';
const SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS = 'dx-list-switchable-delete-button-container';
const SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS = 'dx-list-switchable-delete-button-wrapper';
const SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS = 'dx-list-switchable-delete-button-inner-wrapper';
const SWITCHABLE_DELETE_BUTTON_CLASS = 'dx-list-switchable-delete-button';
const SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION = 200;
class SwitchableButtonEditDecorator extends SwitchableEditDecorator {
  _init() {
    super._init();
    const $buttonContainer = $('<div>').addClass(SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS);
    const $buttonWrapper = $('<div>').addClass(SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS);
    const $buttonInnerWrapper = $('<div>').addClass(SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS);
    const $button = $('<div>').addClass(SWITCHABLE_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, Button, {
      text: messageLocalization.format('dxListEditDecorator-delete'),
      type: 'danger',
      stylingMode: isMaterialBased(current()) ? 'text' : 'contained',
      onClick: e => {
        this._deleteItem();
        const {
          event
        } = e;
        event === null || event === void 0 || event.stopPropagation();
      },
      // @ts-expect-error
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $buttonContainer.append($buttonWrapper);
    $buttonWrapper.append($buttonInnerWrapper);
    $buttonInnerWrapper.append($button);
    this._$buttonContainer = $buttonContainer;
  }
  _enablePositioning($itemElement) {
    super._enablePositioning($itemElement);
    fx.stop(this._$buttonContainer.get(0), true);
    this._$buttonContainer.appendTo($itemElement);
  }
  _disablePositioning($itemElement) {
    if ($itemElement) {
      super._disablePositioning($itemElement);
    }
    this._$buttonContainer.detach();
  }
  _animatePrepareDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = getWidth(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth : -buttonWidth;
    const toValue = rtl ? listWidth - buttonWidth : 0;
    return fx.animate(this._$buttonContainer.get(0), {
      // @ts-expect-error ts-error
      type: 'custom',
      duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
      // @ts-expect-error ts-error
      from: {
        right: fromValue
      },
      // @ts-expect-error ts-error
      to: {
        right: toValue
      }
    });
  }
  _animateForgetDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = getWidth(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth - buttonWidth : 0;
    const toValue = rtl ? listWidth : -buttonWidth;
    return fx.animate(this._$buttonContainer.get(0), {
      // @ts-expect-error ts-error
      type: 'custom',
      duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
      // @ts-expect-error ts-error
      from: {
        right: fromValue
      },
      // @ts-expect-error ts-error
      to: {
        right: toValue
      }
    });
  }
  _buttonWidth() {
    if (!this._buttonContainerWidth) {
      this._buttonContainerWidth = getOuterWidth(this._$buttonContainer);
    }
    return this._buttonContainerWidth;
  }
  dispose() {
    if (this._$buttonContainer) {
      this._$buttonContainer.remove();
    }
    super.dispose();
  }
}
const TOGGLE_DELETE_SWITCH_CONTAINER_CLASS = 'dx-list-toggle-delete-switch-container';
const TOGGLE_DELETE_SWITCH_CLASS = 'dx-list-toggle-delete-switch';
class SwitchableButtonToggleEditDecorator extends SwitchableButtonEditDecorator {
  beforeBag(config) {
    const {
      $itemElement,
      $container
    } = config;
    const $toggle = $('<div>').addClass(TOGGLE_DELETE_SWITCH_CLASS);
    this._list._createComponent($toggle, Button, {
      icon: 'toggle-delete',
      onClick: e => {
        var _e$event;
        fx.stop(this._$buttonContainer.get(0), false);
        this._toggleDeleteReady($itemElement);
        (_e$event = e.event) === null || _e$event === void 0 || _e$event.stopPropagation();
      },
      // @ts-expect-error
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $container.addClass(TOGGLE_DELETE_SWITCH_CONTAINER_CLASS);
    $container.append($toggle);
  }
}
registerDecorator('delete', 'toggle', SwitchableButtonToggleEditDecorator);
class SwitchableButtonSlideEditDecorator extends SwitchableButtonEditDecorator {
  _shouldHandleSwipe() {
    return true;
  }
  _swipeEndHandler($itemElement, args) {
    if (args.targetOffset !== 0) {
      fx.stop(this._$buttonContainer.get(0), false);
      this._toggleDeleteReady($itemElement);
    }
  }
}
registerDecorator('delete', 'slideButton', SwitchableButtonSlideEditDecorator);
export default SwitchableButtonEditDecorator;