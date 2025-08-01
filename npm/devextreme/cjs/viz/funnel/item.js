/**
* DevExtreme (cjs/viz/funnel/item.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _type = require("../../core/utils/type");
const states = ['normal', 'hover', 'selection', 'selection'];
function parseStyles(color, style, baseStyle) {
  const border = style.border;
  const baseBorder = baseStyle.border;
  const borderVisible = (0, _type.isDefined)(border.visible) ? border.visible : baseBorder.visible;
  const borderWidth = (0, _type.isDefined)(border.width) ? border.width : baseBorder.width;
  return {
    fill: color,
    hatching: style.hatching,
    stroke: border.color || baseBorder.color,
    'stroke-width': borderVisible ? borderWidth : 0
  };
}
function Item(widget, options) {
  const that = this;
  const data = options.data;
  that.code = 0;
  that.widget = widget;
  that.figure = options.figure;
  that.argument = data.argument;
  that.value = data.value;
  that.data = data.dataItem;
  that.percent = options.percent;
  that.id = options.id;
  that.color = options.color;
  that.states = {
    normal: parseStyles(options.color, options.itemOptions, options.itemOptions),
    hover: parseStyles(options.color, options.itemOptions.hoverStyle, options.itemOptions),
    selection: parseStyles(options.color, options.itemOptions.selectionStyle, options.itemOptions)
  };
}
Item.prototype = {
  getState: function () {
    return states[this.code];
  },
  getNormalStyle: function () {
    return this.states.normal;
  },
  setHover: function () {
    this.hover(true);
  },
  hover: function (state) {
    if (!this.widget._getOption('hoverEnabled', true) || state === this.isHovered()) {
      return;
    }
    this.widget._suspend();
    state && this.widget.clearHover();
    this.setState(1, state);
    this.widget._eventTrigger('hoverChanged', {
      item: this
    });
    this.widget._resume();
  },
  setState: function (code, state) {
    if (state) {
      this.code |= code;
    } else {
      this.code &= ~code;
    }
    this.widget._applyTilesAppearance();
  },
  select: function (state) {
    const mode = this.widget._getOption('selectionMode', true);
    if (mode === 'none' || state === this.isSelected()) {
      return;
    }
    this.widget._suspend();
    if (state && mode !== 'multiple') {
      this.widget.clearSelection();
    }
    this.setState(2, state);
    this.widget._eventTrigger('selectionChanged', {
      item: this
    });
    this.widget._resume();
  },
  showTooltip: function (coords) {
    this.widget._showTooltip(this.id, coords);
  },
  getColor: function () {
    return this.color;
  },
  isHovered: function () {
    return !!(this.code & 1);
  },
  isSelected: function () {
    return !!(this.code & 2);
  }
};
var _default = exports.default = Item;
module.exports = exports.default;
module.exports.default = exports.default;
