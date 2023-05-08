"use strict";

exports.createBodyOverflowManager = void 0;
var _window = require("../../core/utils/window");
var _type = require("../../core/utils/type");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _common = require("../../core/utils/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var overflowManagerMock = {
  setOverflow: _common.noop,
  restoreOverflow: _common.noop
};
var createBodyOverflowManager = function createBodyOverflowManager() {
  if (!(0, _window.hasWindow)()) {
    return overflowManagerMock;
  }
  var window = (0, _window.getWindow)();
  var documentElement = _dom_adapter.default.getDocument().documentElement;
  var body = _dom_adapter.default.getBody();
  var isIosDevice = _devices.default.real().platform === 'ios';
  var prevSettings = {
    overflow: null,
    overflowX: null,
    overflowY: null,
    paddingRight: null,
    position: null,
    top: null,
    left: null
  };
  var setBodyPositionFixed = function setBodyPositionFixed() {
    if ((0, _type.isDefined)(prevSettings.position) || body.style.position === 'fixed') {
      return;
    }
    var scrollY = window.scrollY,
      scrollX = window.scrollX;
    prevSettings.position = body.style.position;
    prevSettings.top = body.style.top;
    prevSettings.left = body.style.left;
    body.style.setProperty('position', 'fixed');
    body.style.setProperty('top', "".concat(-scrollY, "px"));
    body.style.setProperty('left', "".concat(-scrollX, "px"));
  };
  var restoreBodyPositionFixed = function restoreBodyPositionFixed() {
    if (!(0, _type.isDefined)(prevSettings.position)) {
      return;
    }
    var scrollY = -parseInt(body.style.top, 10);
    var scrollX = -parseInt(body.style.left, 10);
    ['position', 'top', 'left'].forEach(function (property) {
      if (prevSettings[property]) {
        body.style.setProperty(property, prevSettings[property]);
      } else {
        body.style.removeProperty(property);
      }
    });
    window.scrollTo(scrollX, scrollY);
    prevSettings.position = null;
  };
  var setBodyOverflow = function setBodyOverflow() {
    setBodyPaddingRight();
    if (prevSettings.overflow || body.style.overflow === 'hidden') {
      return;
    }
    prevSettings.overflow = body.style.overflow;
    prevSettings.overflowX = body.style.overflowX;
    prevSettings.overflowY = body.style.overflowY;
    body.style.setProperty('overflow', 'hidden');
  };
  var restoreBodyOverflow = function restoreBodyOverflow() {
    restoreBodyPaddingRight();
    ['overflow', 'overflowX', 'overflowY'].forEach(function (property) {
      if (!(0, _type.isDefined)(prevSettings[property])) {
        return;
      }
      var propertyInKebabCase = property.replace(/(X)|(Y)/, function (symbol) {
        return "-".concat(symbol.toLowerCase());
      });
      if (prevSettings[property]) {
        body.style.setProperty(propertyInKebabCase, prevSettings[property]);
      } else {
        body.style.removeProperty(propertyInKebabCase);
      }
      prevSettings[property] = null;
    });
  };
  var setBodyPaddingRight = function setBodyPaddingRight() {
    var scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    if (prevSettings.paddingRight || scrollBarWidth <= 0) {
      return;
    }
    var paddingRight = window.getComputedStyle(body).getPropertyValue('padding-right');
    var computedBodyPaddingRight = parseInt(paddingRight, 10);
    prevSettings.paddingRight = computedBodyPaddingRight;
    body.style.setProperty('padding-right', "".concat(computedBodyPaddingRight + scrollBarWidth, "px"));
  };
  var restoreBodyPaddingRight = function restoreBodyPaddingRight() {
    if (!(0, _type.isDefined)(prevSettings.paddingRight)) {
      return;
    }
    if (prevSettings.paddingRight) {
      body.style.setProperty('padding-right', "".concat(prevSettings.paddingRight, "px"));
    } else {
      body.style.removeProperty('padding-right');
    }
    prevSettings.paddingRight = null;
  };
  return {
    setOverflow: isIosDevice ? setBodyPositionFixed : setBodyOverflow,
    restoreOverflow: isIosDevice ? restoreBodyPositionFixed : restoreBodyOverflow
  };
};
exports.createBodyOverflowManager = createBodyOverflowManager;