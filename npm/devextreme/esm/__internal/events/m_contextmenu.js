/**
* DevExtreme (esm/__internal/events/m_contextmenu.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerEvent from '../../common/core/events/core/event_registrator';
import eventsEngine from '../../common/core/events/core/events_engine';
import holdEvent from '../../common/core/events/hold';
import { addNamespace, fireEvent, isMouseEvent } from '../../common/core/events/utils/index';
import Class from '../../core/class';
import $ from '../../core/renderer';
import devices from '../core/m_devices';
import supportUtils from '../core/utils/m_support';
const CONTEXTMENU_NAMESPACE = 'dxContexMenu';
const CONTEXTMENU_NAMESPACED_EVENT_NAME = addNamespace('contextmenu', CONTEXTMENU_NAMESPACE);
const HOLD_NAMESPACED_EVENT_NAME = addNamespace(holdEvent.name, CONTEXTMENU_NAMESPACE);
const CONTEXTMENU_EVENT_NAME = 'dxcontextmenu';
const ContextMenu = Class.inherit({
  setup(element) {
    const $element = $(element);
    eventsEngine.on($element, CONTEXTMENU_NAMESPACED_EVENT_NAME, this._contextMenuHandler.bind(this));
    if (supportUtils.touch || devices.isSimulator()) {
      eventsEngine.on($element, HOLD_NAMESPACED_EVENT_NAME, this._holdHandler.bind(this));
    }
  },
  _holdHandler(e) {
    if (isMouseEvent(e) && !devices.isSimulator()) {
      return;
    }
    this._fireContextMenu(e);
  },
  _contextMenuHandler(e) {
    this._fireContextMenu(e);
  },
  _fireContextMenu(e) {
    return fireEvent({
      type: CONTEXTMENU_EVENT_NAME,
      originalEvent: e
    });
  },
  teardown(element) {
    eventsEngine.off(element, `.${CONTEXTMENU_NAMESPACE}`);
  }
});
registerEvent(CONTEXTMENU_EVENT_NAME, new ContextMenu());
export const name = CONTEXTMENU_EVENT_NAME;
