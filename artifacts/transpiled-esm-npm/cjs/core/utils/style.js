"use strict";

exports.stylePropPrefix = exports.styleProp = exports.setWidth = exports.setStyle = exports.setHeight = exports.parsePixelValue = exports.normalizeStyleProp = void 0;
var _inflector = require("./inflector");
var _call_once = _interopRequireDefault(require("./call_once"));
var _type = require("./type");
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var jsPrefixes = ['', 'Webkit', 'Moz', 'O', 'Ms'];
var cssPrefixes = {
  '': '',
  'Webkit': '-webkit-',
  'Moz': '-moz-',
  'O': '-o-',
  'ms': '-ms-'
};
var getStyles = (0, _call_once.default)(function () {
  return _dom_adapter.default.createElement('dx').style;
});
var forEachPrefixes = function forEachPrefixes(prop, callBack) {
  prop = (0, _inflector.camelize)(prop, true);
  var result;
  for (var i = 0, cssPrefixesCount = jsPrefixes.length; i < cssPrefixesCount; i++) {
    var jsPrefix = jsPrefixes[i];
    var prefixedProp = jsPrefix + prop;
    var lowerPrefixedProp = (0, _inflector.camelize)(prefixedProp);
    result = callBack(lowerPrefixedProp, jsPrefix);
    if (result === undefined) {
      result = callBack(prefixedProp, jsPrefix);
    }
    if (result !== undefined) {
      break;
    }
  }
  return result || '';
};
var styleProp = function styleProp(name) {
  if (name in getStyles()) {
    return name;
  }
  var originalName = name;
  name = name.charAt(0).toUpperCase() + name.substr(1);
  for (var i = 1; i < jsPrefixes.length; i++) {
    var prefixedProp = jsPrefixes[i].toLowerCase() + name;
    if (prefixedProp in getStyles()) {
      return prefixedProp;
    }
  }
  return originalName;
};
exports.styleProp = styleProp;
var stylePropPrefix = function stylePropPrefix(prop) {
  return forEachPrefixes(prop, function (specific, jsPrefix) {
    if (specific in getStyles()) {
      return cssPrefixes[jsPrefix];
    }
  });
};
exports.stylePropPrefix = stylePropPrefix;
var pxExceptions = ['fillOpacity', 'columnCount', 'flexGrow', 'flexShrink', 'fontWeight', 'lineHeight', 'opacity', 'zIndex', 'zoom'];
var parsePixelValue = function parsePixelValue(value) {
  if ((0, _type.isNumeric)(value)) {
    return value;
  } else if ((0, _type.isString)(value)) {
    return Number(value.replace('px', ''));
  }
  return NaN;
};
exports.parsePixelValue = parsePixelValue;
var normalizeStyleProp = function normalizeStyleProp(prop, value) {
  if ((0, _type.isNumeric)(value) && pxExceptions.indexOf(prop) === -1) {
    value += 'px';
  }
  return value;
};
exports.normalizeStyleProp = normalizeStyleProp;
var setDimensionProperty = function setDimensionProperty(elements, propertyName, value) {
  if (elements) {
    value = (0, _type.isNumeric)(value) ? value += 'px' : value;
    for (var i = 0; i < elements.length; ++i) {
      elements[i].style[propertyName] = value;
    }
  }
};
var setWidth = function setWidth(elements, value) {
  setDimensionProperty(elements, 'width', value);
};
exports.setWidth = setWidth;
var setHeight = function setHeight(elements, value) {
  setDimensionProperty(elements, 'height', value);
};
exports.setHeight = setHeight;
var setStyle = function setStyle(element, styleString) {
  var resetStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (resetStyle) {
    var styleList = [].slice.call(element.style);
    styleList.forEach(function (propertyName) {
      element.style.removeProperty(propertyName);
    });
  }
  styleString.split(';').forEach(function (style) {
    var parts = style.split(':').map(function (stylePart) {
      return stylePart.trim();
    });
    if (parts.length === 2) {
      var _parts = _slicedToArray(parts, 2),
        property = _parts[0],
        value = _parts[1];
      element.style[property] = value;
    }
  });
};
exports.setStyle = setStyle;