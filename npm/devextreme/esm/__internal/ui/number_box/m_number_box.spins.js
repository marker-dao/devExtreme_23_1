/**
* DevExtreme (esm/__internal/ui/number_box/m_number_box.spins.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../common/core/events/core/events_engine';
import pointer from '../../../common/core/events/pointer';
import { addNamespace } from '../../../common/core/events/utils/index';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import TextEditorButton from '../../ui/text_box/texteditor_button_collection/m_button';
import SpinButton from './m_number_box.spin';
const SPIN_CLASS = 'dx-numberbox-spin';
const SPIN_CONTAINER_CLASS = 'dx-numberbox-spin-container';
const SPIN_TOUCH_FRIENDLY_CLASS = 'dx-numberbox-spin-touch-friendly';
export default class SpinButtons extends TextEditorButton {
  _attachEvents(instance, $spinContainer) {
    const {
      editor
    } = this;
    // @ts-expect-error
    const eventName = addNamespace(pointer.down, editor.NAME);
    const $spinContainerChildren = $spinContainer.children();
    const pointerDownAction = editor._createAction(
    // @ts-expect-error
    e => editor._spinButtonsPointerDownHandler(e));
    eventsEngine.off($spinContainer, eventName);
    eventsEngine.on($spinContainer, eventName, e => pointerDownAction({
      event: e
    }));
    SpinButton.getInstance($spinContainerChildren.eq(0)).option('onChange',
    // @ts-expect-error
    e => editor._spinUpChangeHandler(e));
    SpinButton.getInstance($spinContainerChildren.eq(1)).option('onChange',
    // @ts-expect-error
    e => editor._spinDownChangeHandler(e));
  }
  _create() {
    const {
      editor
    } = this;
    const $spinContainer = $('<div>').addClass(SPIN_CONTAINER_CLASS);
    const $spinUp = $('<div>').appendTo($spinContainer);
    const $spinDown = $('<div>').appendTo($spinContainer);
    const options = this._getOptions();
    this._addToContainer($spinContainer);
    editor._createComponent($spinUp, SpinButton, extend({
      direction: 'up'
    }, options));
    editor._createComponent($spinDown, SpinButton, extend({
      direction: 'down'
    }, options));
    this._legacyRender(editor.$element(), this._isTouchFriendly(), options.visible);
    return {
      instance: $spinContainer,
      $element: $spinContainer
    };
  }
  _getOptions() {
    const {
      editor
    } = this;
    const visible = this._isVisible();
    const disabled = editor.option('disabled');
    return {
      visible,
      disabled
    };
  }
  // @ts-expect-error
  _isVisible() {
    const {
      editor
    } = this;
    return super._isVisible() && editor.option('showSpinButtons');
  }
  _isTouchFriendly() {
    const {
      editor
    } = this;
    return editor.option('showSpinButtons') && editor.option('useLargeSpinButtons');
  }
  // TODO: get rid of it
  _legacyRender($editor, isTouchFriendly, isVisible) {
    $editor.toggleClass(SPIN_TOUCH_FRIENDLY_CLASS, isTouchFriendly);
    $editor.toggleClass(SPIN_CLASS, isVisible);
  }
  // @ts-expect-error
  update() {
    const shouldUpdate = super.update();
    if (shouldUpdate) {
      const {
        editor,
        instance
      } = this;
      const $editor = editor.$element();
      const isVisible = this._isVisible();
      const isTouchFriendly = this._isTouchFriendly();
      // @ts-expect-error
      const $spinButtons = instance.children();
      const spinUp = SpinButton.getInstance($spinButtons.eq(0));
      const spinDown = SpinButton.getInstance($spinButtons.eq(1));
      const options = this._getOptions();
      spinUp.option(options);
      spinDown.option(options);
      this._legacyRender($editor, isTouchFriendly, isVisible);
    }
  }
}
