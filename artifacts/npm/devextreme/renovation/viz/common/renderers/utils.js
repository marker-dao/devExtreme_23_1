/**
* DevExtreme (renovation/viz/common/renderers/utils.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.textsAreEqual = exports.setTextNodeAttribute = exports.removeExtraAttrs = exports.parseMultiline = exports.parseHTML = exports.getTextWidth = exports.getNextDefsSvgId = exports.getLineHeight = exports.getItemLineHeight = exports.getGraphicExtraProps = exports.getFuncIri = exports.getElementBBox = exports.extend = exports.convertAlignmentToAnchor = exports.compensateSegments = exports.combinePathParam = exports.buildPathSegments = void 0;
var _type = require("../../../../core/utils/type");
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _utils = require("../../../../viz/core/utils");
var _window = require("../../../../core/utils/window");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const KEY_FONT_SIZE = 'font-size';
const DEFAULT_FONT_SIZE = 12;
const SHARPING_CORRECTION = 0.5;
const window = (0, _window.getWindow)();
const getNextDefsSvgId = (() => {
  let numDefsSvgElements = 1;
  return () => "DevExpress_".concat(numDefsSvgElements++);
})();
exports.getNextDefsSvgId = getNextDefsSvgId;
const getFuncIri = (id, pathModified) => id !== null ? "url(".concat(pathModified ? window.location.href.split('#')[0] : '', "#").concat(id, ")") : id;
exports.getFuncIri = getFuncIri;
const extend = (target, source) => {
  target = _extends({}, target, source);
  return target;
};
exports.extend = extend;
function buildSegments(points, buildSimpleSegment, close) {
  const list = [];
  if (Array.isArray(points[0])) {
    for (let i = 0, ii = points.length; i < ii; ++i) {
      buildSimpleSegment(points[i], close, list);
    }
  } else {
    buildSimpleSegment(points, close, list);
  }
  return list;
}
function buildSimpleLineSegment(points, close, list) {
  let i = 0;
  const k0 = list.length;
  let k = k0;
  const ii = (points || []).length;
  if (ii) {
    if (points[0].x !== undefined) {
      const arrPoints = points;
      for (; i < ii;) {
        list[k++] = ['L', arrPoints[i].x, arrPoints[i++].y];
      }
    } else {
      const arrPoints = points;
      for (; i < ii;) {
        list[k++] = ['L', arrPoints[i++], arrPoints[i++]];
      }
    }
    list[k0][0] = 'M';
  } else {
    list[k] = ['M', 0, 0];
  }
  close && list.push(['Z']);
  return list;
}
function buildSimpleCurveSegment(points, close, list) {
  let k = list.length;
  const ii = (points || []).length;
  if (ii) {
    if (points[0] !== undefined) {
      const arrPoints = points;
      list[k++] = ['M', arrPoints[0].x, arrPoints[0].y];
      for (let i = 1; i < ii;) {
        list[k++] = ['C', arrPoints[i].x, arrPoints[i++].y, arrPoints[i].x, arrPoints[i++].y, arrPoints[i].x, arrPoints[i++].y];
      }
    } else {
      const arrPoints = points;
      list[k++] = ['M', arrPoints[0], arrPoints[1]];
      for (let i = 2; i < ii;) {
        list[k++] = ['C', arrPoints[i++], arrPoints[i++], arrPoints[i++], arrPoints[i++], arrPoints[i++], arrPoints[i++]];
      }
    }
  } else {
    list[k] = ['M', 0, 0];
  }
  close && list.push(['Z']);
  return list;
}
function buildLineSegments(points, close) {
  return buildSegments(points, buildSimpleLineSegment, close);
}
function buildCurveSegments(points, close) {
  return buildSegments(points, buildSimpleCurveSegment, close);
}
const buildPathSegments = (points, type) => {
  let list = [['M', 0, 0]];
  if (type === 'line') {
    list = buildLineSegments(points, false);
  } else if (type === 'area') {
    list = buildLineSegments(points, true);
  } else if (type === 'bezier') {
    list = buildCurveSegments(points, false);
  } else if (type === 'bezierarea') {
    list = buildCurveSegments(points, true);
  }
  return list;
};
exports.buildPathSegments = buildPathSegments;
const combinePathParam = segments => {
  const d = [];
  const ii = segments.length;
  for (let i = 0; i < ii; ++i) {
    const segment = segments[i];
    for (let j = 0, jj = segment.length; j < jj; ++j) {
      d.push(segment[j]);
    }
  }
  return d.join(' ');
};
exports.combinePathParam = combinePathParam;
function prepareConstSegment(constSeg, type) {
  const x = constSeg[constSeg.length - 2];
  const y = constSeg[constSeg.length - 1];
  if (type === 'line' || type === 'area') {
    constSeg[0] = 'L';
  } else if (type === 'bezier' || type === 'bezierarea') {
    constSeg[0] = 'C';
    constSeg[1] = x;
    constSeg[3] = x;
    constSeg[5] = x;
    constSeg[2] = y;
    constSeg[4] = y;
    constSeg[6] = y;
  }
}
function makeEqualLineSegments(short, long, type) {
  const constSeg = [...short[short.length - 1]];
  let i = short.length;
  prepareConstSegment(constSeg, type);
  for (; i < long.length; i++) {
    short[i] = [...constSeg];
  }
}
function makeEqualAreaSegments(short, long, type) {
  const shortLength = short.length;
  const longLength = long.length;
  if ((shortLength - 1) % 2 === 0 && (longLength - 1) % 2 === 0) {
    const i = (shortLength - 1) / 2 - 1;
    const head = short.slice(0, i + 1);
    const constsSeg1 = [...head[head.length - 1]];
    const constsSeg2 = [...short.slice(i + 1)[0]];
    prepareConstSegment(constsSeg1, type);
    prepareConstSegment(constsSeg2, type);
    for (let j = i; j < (longLength - 1) / 2 - 1; j++) {
      short.splice(j + 1, 0, constsSeg1);
      short.splice(j + 3, 0, constsSeg2);
    }
  }
}
const compensateSegments = (oldSegments, newSegments, type) => {
  const oldLength = oldSegments.length;
  const newLength = newSegments.length;
  let originalNewSegments = [];
  const makeEqualSegments = type.includes('area') ? makeEqualAreaSegments : makeEqualLineSegments;
  if (oldLength === 0) {
    for (let i = 0; i < newLength; i++) {
      oldSegments.push([...newSegments[i]]);
    }
  } else if (oldLength < newLength) {
    makeEqualSegments(oldSegments, newSegments, type);
  } else if (oldLength > newLength) {
    originalNewSegments = [...newSegments];
    makeEqualSegments(newSegments, oldSegments, type);
  }
  return originalNewSegments;
};
exports.compensateSegments = compensateSegments;
const getElementBBox = element => {
  let bBox = new SVGRect(0, 0, 0, 0);
  if (element !== undefined) {
    bBox = element.getBBox();
  } else if (element !== undefined) {
    const el = element;
    bBox = new SVGRect(0, 0, el.offsetWidth, el.offsetHeight);
  }
  return bBox;
};
exports.getElementBBox = getElementBBox;
function maxLengthFontSize(fontSize1, fontSize2) {
  const height1 = fontSize1 !== null && fontSize1 !== void 0 ? fontSize1 : DEFAULT_FONT_SIZE;
  const height2 = fontSize2 !== null && fontSize2 !== void 0 ? fontSize2 : DEFAULT_FONT_SIZE;
  return height1 > height2 ? height1 : height2;
}
function orderHtmlTree(list, line, node, parentStyle, parentClassName) {
  const realStyle = node.style;
  if ((0, _type.isDefined)(node.wholeText)) {
    list.push({
      value: node.wholeText,
      style: parentStyle,
      className: parentClassName,
      line,
      height: parseFloat(parentStyle.fontSize) || 0
    });
  } else if (node.tagName === 'BR') {
    ++line;
  } else if (_dom_adapter.default.isElementNode(node)) {
    const style = extend({}, parentStyle);
    switch (node.tagName) {
      case 'B':
      case 'STRONG':
        style.fontWeight = 'bold';
        break;
      case 'I':
      case 'EM':
        style.fontStyle = 'italic';
        break;
      case 'U':
        style.textDecoration = 'underline';
        break;
      default:
        break;
    }
    realStyle.color && (style.fill = realStyle.color);
    realStyle.fontSize && (style.fontSize = realStyle.fontSize);
    realStyle.fontStyle && (style.fontStyle = realStyle.fontStyle);
    realStyle.fontWeight && (style.fontWeight = realStyle.fontWeight);
    realStyle.textDecoration && (style.textDecoration = realStyle.textDecoration);
    for (let i = 0, nodes = node.childNodes, ii = nodes.length; i < ii; ++i) {
      line = orderHtmlTree(list, line, nodes[i], style, node.className || parentClassName);
    }
  }
  return line;
}
function adjustLineHeights(items) {
  let currentItem = items[0];
  for (let i = 1, ii = items.length; i < ii; ++i) {
    const item = items[i];
    if (item.line === currentItem.line) {
      currentItem.height = maxLengthFontSize(currentItem.height, item.height);
      currentItem.inherits = !!currentItem.inherits || item.height === 0;
      item.height = NaN;
    } else {
      currentItem = item;
    }
  }
}
const removeExtraAttrs = html => {
  const findTagAttrs = /(?:(<[a-z0-9]+\s*))([\s\S]*?)(>|\/>)/gi;
  const findStyleAndClassAttrs = /(style|class)\s*=\s*(["'])(?:(?!\2).)*\2\s?/gi;
  return html.replace(findTagAttrs, (_, p1, p2, p3) => {
    var _p2$match, _p;
    p2 = ((_p2$match = (_p = p2) === null || _p === void 0 ? void 0 : _p.match(findStyleAndClassAttrs)) !== null && _p2$match !== void 0 ? _p2$match : []).map(str => str).join(' ');
    return p1 + p2 + p3;
  });
};
exports.removeExtraAttrs = removeExtraAttrs;
const parseHTML = text => {
  const items = [];
  const div = _dom_adapter.default.createElement('div');
  div.innerHTML = text.replace(/\r/g, '').replace(/\n/g, '<br/>');
  orderHtmlTree(items, 0, div, {}, '');
  adjustLineHeights(items);
  return items;
};
exports.parseHTML = parseHTML;
const parseMultiline = text => {
  const texts = text.replace(/\r/g, '').split(/\n/g);
  const items = [];
  for (let i = 0; i < texts.length; i++) {
    items.push({
      value: texts[i].trim(),
      height: 0,
      line: i
    });
  }
  return items;
};
exports.parseMultiline = parseMultiline;
const getTextWidth = text => {
  const {
    tspan,
    value
  } = text;
  return value.length && tspan ? tspan.getSubStringLength(0, value.length) : 0;
};
exports.getTextWidth = getTextWidth;
const setTextNodeAttribute = (item, name, value) => {
  var _item$tspan, _item$stroke;
  (_item$tspan = item.tspan) === null || _item$tspan === void 0 ? void 0 : _item$tspan.setAttribute(name, value);
  (_item$stroke = item.stroke) === null || _item$stroke === void 0 ? void 0 : _item$stroke.setAttribute(name, value);
};
exports.setTextNodeAttribute = setTextNodeAttribute;
const getItemLineHeight = (item, defaultValue) => item.inherits ? maxLengthFontSize(item.height, defaultValue) : Number(item.height) || defaultValue;
exports.getItemLineHeight = getItemLineHeight;
const getLineHeight = styles => styles && !Number.isNaN(parseFloat(styles[KEY_FONT_SIZE])) ? parseFloat(styles[KEY_FONT_SIZE]) : DEFAULT_FONT_SIZE;
exports.getLineHeight = getLineHeight;
const textsAreEqual = (newItems, renderedItems) => {
  if (!renderedItems || renderedItems.length !== newItems.length) return false;
  return renderedItems.every((item, index) => item.value === newItems[index].value);
};
exports.textsAreEqual = textsAreEqual;
const convertAlignmentToAnchor = function (value) {
  let rtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return value ? {
    left: rtl ? 'end' : 'start',
    center: 'middle',
    right: rtl ? 'start' : 'end'
  }[value] : undefined;
};
exports.convertAlignmentToAnchor = convertAlignmentToAnchor;
function getTransformation(props, x, y) {
  const {
    rotate,
    rotateX,
    rotateY,
    scaleX,
    scaleY,
    sharp,
    sharpDirection,
    strokeWidth,
    translateX,
    translateY
  } = props;
  const transformations = [];
  const transDir = sharpDirection === 'backward' ? -1 : 1;
  const strokeOdd = (strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : 0) % 2;
  const correctionX = strokeOdd && (sharp === 'h' || sharp === true) ? SHARPING_CORRECTION * transDir : 0;
  const correctionY = strokeOdd && (sharp === 'v' || sharp === true) ? SHARPING_CORRECTION * transDir : 0;
  if (translateX || translateY || correctionX || correctionY) {
    transformations.push("translate(".concat((translateX !== null && translateX !== void 0 ? translateX : 0) + correctionX, ",").concat((translateY !== null && translateY !== void 0 ? translateY : 0) + correctionY, ")"));
  }
  if (rotate) {
    var _ref, _ref2;
    transformations.push("rotate(".concat(rotate, ",").concat((_ref = Number(rotateX) || x) !== null && _ref !== void 0 ? _ref : 0, ",").concat((_ref2 = Number(rotateY) || y) !== null && _ref2 !== void 0 ? _ref2 : 0, ")"));
  }
  const scaleXDefined = (0, _type.isDefined)(scaleX);
  const scaleYDefined = (0, _type.isDefined)(scaleY);
  if (scaleXDefined || scaleYDefined) {
    transformations.push("scale(".concat(scaleXDefined ? scaleX : 1, ",").concat(scaleYDefined ? scaleY : 1, ")"));
  }
  return transformations.length ? transformations.join(' ') : undefined;
}
function getDashStyle(props) {
  const {
    dashStyle,
    strokeWidth
  } = props;
  if (!dashStyle || dashStyle === 'none' || dashStyle === 'solid') {
    return undefined;
  }
  const sw = Number(strokeWidth) || 1;
  const value = (0, _utils.normalizeEnum)(dashStyle);
  let dashArray = [];
  dashArray = value.replace(/longdash/g, '8,3,').replace(/dash/g, '4,3,').replace(/dot/g, '1,3,').replace(/,$/, '').split(',');
  let i = dashArray.length;
  while (i--) {
    dashArray[i] = parseInt(dashArray[i], 10) * sw;
  }
  return dashArray.join(',');
}
const getGraphicExtraProps = (props, x, y) => ({
  transform: getTransformation(props, x, y),
  'stroke-dasharray': getDashStyle(props)
});
exports.getGraphicExtraProps = getGraphicExtraProps;
