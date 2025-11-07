/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.panel.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../common/core/events/core/events_engine';
import pointerEvents from '../../../common/core/events/pointer';
import { addNamespace } from '../../../common/core/events/utils';
import $ from '../../../core/renderer';
import Widget from '../../core/widget/widget';
const POINTERUP_EVENT_NAME = addNamespace(pointerEvents.up, 'dxDiagramPanel');
const PREVENT_REFOCUS_SELECTOR = '.dx-textbox';
class DiagramPanel extends Widget {
  _init() {
    super._init();
    this._createOnPointerUpAction();
  }
  _render() {
    super._render();
    this._attachPointerUpEvent();
  }
  _getPointerUpElements() {
    return [this.$element()];
  }
  _attachPointerUpEvent() {
    const elements = this._getPointerUpElements();
    elements.forEach(element => {
      eventsEngine.off(element, POINTERUP_EVENT_NAME);
      eventsEngine.on(element, POINTERUP_EVENT_NAME, e => {
        if (!$(e.target).closest(PREVENT_REFOCUS_SELECTOR).length) {
          this._onPointerUpAction();
        }
      });
    });
  }
  _createOnPointerUpAction() {
    this._onPointerUpAction = this._createActionByOption('onPointerUp');
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'onPointerUp':
        this._createOnPointerUpAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default DiagramPanel;
