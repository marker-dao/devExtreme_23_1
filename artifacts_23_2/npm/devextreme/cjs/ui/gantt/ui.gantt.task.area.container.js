/**
* DevExtreme (cjs/ui/gantt/ui.gantt.task.area.container.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TaskAreaContainer = void 0;
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let TaskAreaContainer = /*#__PURE__*/function () {
  function TaskAreaContainer(element, ganttViewWidget) {
    this._element = element;
    this._scrollView = ganttViewWidget._createComponent(this._element, _scroll_view.default, {
      scrollByContent: false,
      scrollByThumb: true,
      showScrollbar: 'onHover',
      direction: 'both',
      onScroll: () => {
        ganttViewWidget.updateView();
      }
    });
  }

  // ITaskAreaContainer
  var _proto = TaskAreaContainer.prototype;
  _proto.getWidth = function getWidth() {
    return this._element.offsetWidth;
  };
  _proto.getHeight = function getHeight() {
    return this._element.offsetHeight;
  };
  _proto.getElement = function getElement() {
    return this._element;
  };
  _createClass(TaskAreaContainer, [{
    key: "scrollTop",
    get: function () {
      return this._scrollView.scrollTop();
    },
    set: function (value) {
      const diff = value - this._scrollView.scrollTop();
      if (diff !== 0) {
        this._scrollView.scrollBy({
          left: 0,
          top: diff
        });
      }
    }
  }, {
    key: "scrollLeft",
    get: function () {
      return this._scrollView.scrollLeft();
    },
    set: function (value) {
      const diff = value - this._scrollView.scrollLeft();
      if (diff !== 0) {
        this._scrollView.scrollBy({
          left: diff,
          top: 0
        });
      }
    }
  }, {
    key: "scrollWidth",
    get: function () {
      return this._scrollView.scrollWidth();
    }
  }, {
    key: "scrollHeight",
    get: function () {
      return this._scrollView.scrollHeight();
    }
  }, {
    key: "isExternal",
    get: function () {
      return true;
    }
  }]);
  return TaskAreaContainer;
}();
exports.TaskAreaContainer = TaskAreaContainer;