/**
* DevExtreme (esm/__internal/viz/sankey/link_item.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-nested-ternary */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { isDefined } from '../../../core/utils/type';
import { COLOR_MODE_GRADIENT, COLOR_MODE_SOURCE, COLOR_MODE_TARGET } from '../../viz/sankey/constants';
const states = ['normal', 'adjacentNodeHover', 'hover'];
function compileAttrs(color, itemOptions, itemBaseOptions, gradient) {
  const border = itemOptions.border;
  const baseBorder = itemBaseOptions.border;
  const borderVisible = isDefined(border.visible) ? border.visible : baseBorder.visible;
  const borderWidth = isDefined(border.width) ? border.width : baseBorder.width;
  const borderOpacity = isDefined(border.opacity) ? border.opacity : isDefined(baseBorder.opacity) ? baseBorder.opacity : 1;
  const opacity = isDefined(itemOptions.opacity) ? itemOptions.opacity : isDefined(itemBaseOptions.opacity) ? itemBaseOptions.opacity : 1;
  let fill = itemOptions.color || color;
  if (itemBaseOptions.colorMode === COLOR_MODE_TARGET || itemBaseOptions.colorMode === COLOR_MODE_SOURCE) {
    fill = color;
  } else if (itemBaseOptions.colorMode === COLOR_MODE_GRADIENT && gradient && isDefined(gradient.id)) {
    fill = gradient.id;
  }
  return {
    fill,
    'stroke-width': borderVisible ? borderWidth : 0,
    stroke: itemOptions.border.color || itemBaseOptions.border.color,
    'stroke-opacity': borderOpacity,
    opacity,
    hatching: itemOptions.hatching
  };
}
function Link(widget, params) {
  const that = this;
  const widgetOffset = widget._renderer.getRootOffset();
  that.code = 0;
  that.widget = widget;
  that.color = params.color;
  that.connection = params.connection;
  that.d = params.d;
  that.options = params.options;
  that.boundingRect = params.boundingRect;
  that.coords = {
    x: params.boundingRect.x + params.boundingRect.width / 2 + widgetOffset.left,
    y: params.boundingRect.y + params.boundingRect.height / 2 + widgetOffset.top
  };
  that.states = {
    normal: compileAttrs(that.color, that.options, that.options, params.gradient),
    adjacentNodeHover: compileAttrs(that.color, {
      opacity: 0,
      border: {}
    }, that.options, params.gradient),
    hover: compileAttrs(that.color, {
      opacity: 0,
      border: {}
    }, that.options, params.gradient)
  };
  that.overlayStates = {
    normal: compileAttrs(that.color, {
      opacity: 0,
      border: {}
    }, that.options),
    adjacentNodeHover: compileAttrs(that.color, that.options.hoverStyle, that.options),
    hover: compileAttrs(that.color, that.options.hoverStyle, that.options)
  };
}
Link.prototype = {
  getState() {
    return states[this.code];
  },
  isHovered() {
    return this.code === 2;
  },
  isAdjacentNodeHovered() {
    return this.code === 1;
  },
  setState(code, state) {
    if (state) {
      this.code = code;
    } else {
      this.code = 0;
      this.hideTooltip();
    }
    this.widget._applyLinksAppearance();
  },
  setHover() {
    this.hover(true);
  },
  hover(state) {
    if (!this.widget._getOption('hoverEnabled', true) || state === this.isHovered()) {
      return;
    }
    this.widget._suspend();
    state && this.widget.clearHover();
    this.setState(2, state);
    this.widget._eventTrigger('linkHoverChanged', {
      target: this
    });
    this.widget._resume();
  },
  adjacentNodeHover(state) {
    if (!this.widget._getOption('hoverEnabled', true) || state === this.isAdjacentNodeHovered()) {
      return;
    }
    this.widget._suspend();
    this.setState(1, state);
    this.widget._resume();
  },
  setAdjacentNodeHover() {
    this.adjacentNodeHover(true);
  },
  showTooltip(coords) {
    this.widget._getOption('hoverEnabled', true) && this.widget._tooltip && this.widget._tooltip.show({
      type: 'link',
      info: {
        source: this.connection.source,
        target: this.connection.target,
        weight: this.connection.weight
      }
    }, typeof coords !== 'undefined' ? {
      x: coords[0],
      y: coords[1]
    } : this.coords);
  },
  hideTooltip() {
    this.widget._tooltip && this.widget._tooltip.hide();
  }
};
export default Link;
