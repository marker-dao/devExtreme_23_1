"use strict";

exports.toggleDisplay = exports.createVisibilityGroup = exports.createTracker = void 0;
var createTracker = function createTracker(renderer, root) {
  return renderer.g().attr({
    stroke: 'none',
    'stroke-width': 0,
    fill: '#000000',
    opacity: 0.0001
  }).css({
    cursor: 'pointer'
  }).append(root);
};
exports.createTracker = createTracker;
var createVisibilityGroup = function createVisibilityGroup(renderer, root) {
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return renderer.g().attr({
    'class': className
  }).append(root);
};
exports.createVisibilityGroup = createVisibilityGroup;
var toggleDisplay = function toggleDisplay(blocks, isVisible) {
  var cssDisplayBlock = {
    display: 'block'
  };
  var cssDisplayNone = {
    display: 'none'
  };
  var style = isVisible ? cssDisplayBlock : cssDisplayNone;
  blocks.map(function (item) {
    return item.css(style);
  });
};
exports.toggleDisplay = toggleDisplay;