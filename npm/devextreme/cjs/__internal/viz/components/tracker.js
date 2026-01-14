/**
* DevExtreme (cjs/__internal/viz/components/tracker.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tracker = Tracker;
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-names */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */

const downPointerEventName = _pointer.default.down;
const movePointerEventName = _pointer.default.move;
function Tracker(parameters) {
  this._initHandlers(parameters);
}
Tracker.prototype = {
  constructor: Tracker,
  _initHandlers(parameters) {
    const document = _dom_adapter.default.getDocument();
    parameters.getCoords = function (e) {
      // TODO: Looks like "eventData" just returns e.pageX, e.pageY. Investigate and use just e.pageX, e.pageY is possible. Don't forget about touch.
      const data = (0, _index.eventData)(e);
      const offset = parameters.widget._renderer.getRootOffset();
      return [data.x - offset.left, data.y - offset.top];
    };
    parameters.root.on(_click.name, clickHandler);
    parameters.root.on(downPointerEventName, downHandler);
    _events_engine.default.on(document, downPointerEventName, downHandler);
    _events_engine.default.on(document, movePointerEventName, moveHandler);
    this._disposeHandlers = function () {
      parameters.root.off(_click.name, clickHandler);
      parameters.root.off(downPointerEventName, downHandler);
      _events_engine.default.off(document, downPointerEventName, downHandler);
      _events_engine.default.off(document, movePointerEventName, moveHandler);
    };
    function clickHandler(e) {
      processClick(e, parameters);
    }
    // Previously "stopPropagation" was called from the "downHandler" - so event triggered on "root" is not then triggered on "document".
    // Unfortunately it occurred (during T396917) that on touch devices calling "stopPropagation" prevents the following "dxclick" event.
    // Generally I think it would be better to use only (dxpointerdown, dxpointermove, dxpointerup) events (of course click is then implemented manually).
    // But for now removing "stopPropagation" will suffice - it can be implemented faster and with less changes, there are no known drawbacks in it.
    // We use "stopPropagation" to prevent unexpected scrolling or zooming when widget has some own scrolling behavior and is located inside another widget
    // (like dxScrollable) with its own scrolling behavior - dxTreeMap does not have own scrolling behavior.
    let isRootDown = false;
    function downHandler(e) {
      if (isRootDown) {
        isRootDown = false;
      } else {
        if (parameters.getData(e) !== undefined) {
          isRootDown = true;
        }
        moveHandler(e);
      }
    }
    function moveHandler(e) {
      processHover(e, parameters);
      parameters.widget._getOption('tooltip').enabled && processTooltip(e, parameters);
    }
  },
  dispose() {
    this._disposeHandlers();
  }
};
function processClick(e, params) {
  const id = params.getData(e);
  if (id >= 0) {
    params.click({
      node: params.getNode(id),
      coords: params.getCoords(e),
      event: e
    });
  }
}
function processHover(e, params) {
  const id = params.getData(e);
  if (id >= 0) {
    params.getNode(id).setHover();
  } else {
    params.widget.clearHover();
  }
}
function processTooltip(e, params) {
  const id = params.getData(e, true);
  let coords;
  if (id >= 0) {
    coords = (0, _index.eventData)(e);
    params.getNode(id).showTooltip([coords.x, coords.y]);
  } else {
    params.widget.hideTooltip();
  }
}
