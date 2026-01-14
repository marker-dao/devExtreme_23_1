/**
* DevExtreme (cjs/__internal/ui/diagram/ui.diagram.context_toolbox.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _window = require("../../../core/utils/window");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _diagram = require("../../ui/diagram/diagram.importer");
var _m_popover = _interopRequireDefault(require("../../ui/popover/m_popover"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS = 'dx-diagram-context-toolbox-target';
const DIAGRAM_CONTEXT_TOOLBOX_CLASS = 'dx-diagram-context-toolbox';
const DIAGRAM_TOUCH_CONTEXT_TOOLBOX_CLASS = 'dx-diagram-touch-context-toolbox';
const DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS = 'dx-diagram-context-toolbox-content';
const DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT = 150;
class DiagramContextToolbox extends _widget.default {
  _init() {
    super._init();
    this._onShownAction = this._createActionByOption('onShown');
    const window = (0, _window.getWindow)();
    this._popoverPositionData = [{
      my: {
        x: 'center',
        y: 'top'
      },
      at: {
        x: 'center',
        y: 'bottom'
      },
      offset: {
        x: 0,
        y: 5
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, window.innerHeight - rect.bottom - 6)
    }, {
      my: {
        x: 'right',
        y: 'center'
      },
      at: {
        x: 'left',
        y: 'center'
      },
      offset: {
        x: -5,
        y: 0
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, Math.min(rect.top, window.innerHeight - rect.bottom) * 2 - 2)
    }, {
      my: {
        x: 'center',
        y: 'bottom'
      },
      at: {
        x: 'center',
        y: 'top'
      },
      offset: {
        x: 0,
        y: -5
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, rect.top - 6)
    }, {
      my: {
        x: 'left',
        y: 'center'
      },
      at: {
        x: 'right',
        y: 'center'
      },
      offset: {
        x: 5,
        y: 0
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, Math.min(rect.top, window.innerHeight - rect.bottom) * 2 - 2)
    }];
  }
  _initMarkup() {
    super._initMarkup();
    this._$popoverTargetElement = (0, _renderer.default)('<div>').addClass(DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS).appendTo(this.$element());
    const $popoverElement = (0, _renderer.default)('<div>').addClass(DIAGRAM_CONTEXT_TOOLBOX_CLASS).appendTo(this.$element());
    if (this._isTouchMode()) {
      $popoverElement.addClass(DIAGRAM_TOUCH_CONTEXT_TOOLBOX_CLASS);
    }
    this._popoverInstance = this._createComponent($popoverElement, _m_popover.default, {
      hideOnOutsideClick: false,
      container: this.$element()
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _isTouchMode() {
    const {
      Browser
    } = (0, _diagram.getDiagram)();
    return Browser.TouchUI;
  }
  _show(x, y, side, category, callback) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._popoverInstance.hide();
    this._$popoverTargetElement.css({
      // @ts-expect-error ts-error
      left: x + this._popoverPositionData[side].offset.x,
      // @ts-expect-error ts-error
      top: y + this._popoverPositionData[side].offset.y
    }).show();
    // correct offset when parent has position absolute, relative, etc (T1010677)
    const window = (0, _window.getWindow)();
    const targetDiv = this._$popoverTargetElement.get(0);
    this._$popoverTargetElement.css({
      left:
      // @ts-expect-error ts-error
      targetDiv.offsetLeft - (targetDiv.getBoundingClientRect().left + window.scrollX
      // @ts-expect-error ts-error
      - targetDiv.offsetLeft),
      top:
      // @ts-expect-error ts-error
      targetDiv.offsetTop - (targetDiv.getBoundingClientRect().top + window.scrollY
      // @ts-expect-error ts-error
      - targetDiv.offsetTop)
    });
    const posRect = targetDiv.getBoundingClientRect();
    this._popoverInstance.option({
      maxHeight: this._popoverPositionData[side].calcMaxHeight(posRect),
      width: this.option('toolboxWidth') !== undefined ? this.option('toolboxWidth') : undefined,
      position: {
        my: this._popoverPositionData[side].my,
        at: this._popoverPositionData[side].at,
        of: this._$popoverTargetElement
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      contentTemplate: () => (0, _renderer.default)('<div>').append((0, _renderer.default)('<div>').addClass(DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS))
      // @ts-expect-error ts-error
      .dxScrollView({
        width: '100%',
        height: '100%'
      }),
      onContentReady: () => {
        const $element = this.$element().find(`.${DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS}`);
        this._onShownAction({
          // @ts-expect-error ts-error
          category,
          callback,
          $element,
          hide: () => this._popoverInstance.hide()
        });
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._popoverInstance.show();
  }
  _hide() {
    this._$popoverTargetElement.hide();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._popoverInstance.hide();
  }
}
var _default = exports.default = DiagramContextToolbox;
