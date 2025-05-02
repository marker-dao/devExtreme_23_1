import _extends from "@babel/runtime/helpers/esm/extends";
import { lock } from '../../../common/core/events/core/emitter.feedback';
import eventsEngine from '../../../common/core/events/core/events_engine';
import holdEvent from '../../../common/core/events/hold';
import pointerEvents from '../../../common/core/events/pointer';
import { addNamespace } from '../../../common/core/events/utils/index';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import Widget from '../../core/widget/widget';
const SPIN_CLASS = 'dx-numberbox-spin';
const SPIN_BUTTON_CLASS = 'dx-numberbox-spin-button';
const SPIN_HOLD_DELAY = 100;
const NUMBER_BOX = 'dxNumberBox';
const POINTERUP_EVENT_NAME = addNamespace(pointerEvents.up, NUMBER_BOX);
const POINTERCANCEL_EVENT_NAME = addNamespace(pointerEvents.cancel, NUMBER_BOX);
class SpinButton extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      direction: 'up',
      // @ts-expect-error ts-error
      onChange: null,
      activeStateEnabled: true,
      hoverStateEnabled: true
    });
  }
  _initMarkup() {
    super._initMarkup();
    const {
      direction: spinDirection
    } = this.option();
    const direction = `${SPIN_CLASS}-${spinDirection}`;
    this.$element().addClass(SPIN_BUTTON_CLASS).addClass(direction);
    this._spinIcon = $('<div>').addClass(`${direction}-icon`).appendTo(this.$element());
  }
  _render() {
    super._render();
    // @ts-expect-error ts-error
    const eventName = addNamespace(pointerEvents.down, this.NAME);
    const $element = this.$element();
    eventsEngine.off($element, eventName);
    eventsEngine.on($element, eventName, this._spinDownHandler.bind(this));
    this._spinChangeHandler = this._createActionByOption('onChange');
  }
  _spinDownHandler(e) {
    e.preventDefault();
    this._clearTimer();
    eventsEngine.on(this.$element(), holdEvent.name, () => {
      this._feedBackDeferred = Deferred();
      lock(this._feedBackDeferred);
      this._spinChangeHandler({
        event: e
      });
      this._holdTimer = setInterval(this._spinChangeHandler, SPIN_HOLD_DELAY, {
        event: e
      });
    });
    const document = domAdapter.getDocument();
    eventsEngine.on(document, POINTERUP_EVENT_NAME, this._clearTimer.bind(this));
    eventsEngine.on(document, POINTERCANCEL_EVENT_NAME, this._clearTimer.bind(this));
    this._spinChangeHandler({
      event: e
    });
  }
  _dispose() {
    this._clearTimer();
    super._dispose();
  }
  _clearTimer() {
    eventsEngine.off(this.$element(), holdEvent.name);
    const document = domAdapter.getDocument();
    eventsEngine.off(document, POINTERUP_EVENT_NAME);
    eventsEngine.off(document, POINTERCANCEL_EVENT_NAME);
    if (this._feedBackDeferred) {
      this._feedBackDeferred.resolve();
    }
    if (this._holdTimer) {
      clearInterval(this._holdTimer);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onChange':
      case 'direction':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default SpinButton;