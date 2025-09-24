"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTooltipCustomOptions = setTooltipCustomOptions;
var _extend2 = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
/* eslint-disable @stylistic/no-mixed-operators */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

const defaultCustomizeLinkTooltip = formatter => function (info) {
  return {
    html: `<strong>${info.source} > ${info.target}</strong><br/>Weight: ${formatter(info.weight)}`
  };
};
const defaultCustomizeNodeTooltip = formatter => function (info) {
  return {
    html: `<strong>${info.label}</strong><br/>Incoming weight: ${formatter(info.weightIn)}<br/>Outgoing weight: ${formatter(info.weightOut)}`
  };
};
const generateCustomCallback = function (customCallback, defaultCallback) {
  return function (objectInfo) {
    let res = (0, _type.isFunction)(customCallback) ? customCallback.call(objectInfo, objectInfo) : {};
    const hasOwnProperty = Object.prototype.hasOwnProperty.bind(res);
    if (!hasOwnProperty('html') && !hasOwnProperty('text')) {
      res = (0, _extend2.extend)(res, defaultCallback.call(objectInfo, objectInfo));
    }
    return res;
  };
};
function setTooltipCustomOptions(sankey) {
  sankey.prototype._setTooltipOptions = function () {
    const tooltip = this._tooltip;
    const options = tooltip && this._getOption('tooltip');
    let linkTemplate;
    let nodeTemplate;
    if (options.linkTooltipTemplate) {
      linkTemplate = this._getTemplate(options.linkTooltipTemplate);
    }
    if (options.nodeTooltipTemplate) {
      nodeTemplate = this._getTemplate(options.nodeTooltipTemplate);
    }
    tooltip && tooltip.update((0, _extend2.extend)({}, options, {
      customizeTooltip(args) {
        if (!(linkTemplate && args.type === 'link' || nodeTemplate && args.type === 'node')) {
          args.skipTemplate = true;
        }
        const formatter = value => tooltip.formatValue(value);
        if (args.type === 'node') {
          return generateCustomCallback(options.customizeNodeTooltip, defaultCustomizeNodeTooltip(formatter))(args.info);
        } else if (args.type === 'link') {
          return generateCustomCallback(options.customizeLinkTooltip, defaultCustomizeLinkTooltip(formatter))(args.info);
        }
        return {};
      },
      contentTemplate(arg, div) {
        const templateArgs = {
          model: arg.info,
          container: div
        };
        if (linkTemplate && arg.type === 'link') {
          return linkTemplate.render(templateArgs);
        }
        if (nodeTemplate && arg.type === 'node') {
          return nodeTemplate.render(templateArgs);
        }
      },
      enabled: options.enabled
    }));
  };
  sankey.prototype.hideTooltip = function () {
    this._tooltip && this._tooltip.hide();
  };
}