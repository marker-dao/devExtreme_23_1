/**
* DevExtreme (cjs/__internal/exporter/common/export_load_panel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportLoadPanel = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _load_panel = _interopRequireDefault(require("../../../ui/load_panel"));
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const EXPORT_LOAD_PANEL_CLASS = 'dx-export-loadpanel';
class ExportLoadPanel {
  constructor(component, $targetElement, $container, options) {
    this._$targetElement = $targetElement;
    this._$container = $container;
    this._loadPanel = component._createComponent((0, _renderer.default)('<div>').addClass(EXPORT_LOAD_PANEL_CLASS).appendTo(this._$container), _load_panel.default, this.getOptions(options));
  }
  getDefaultOptions() {
    return {
      animation: null,
      shading: false,
      height: 90,
      width: 200,
      container: this._$container
    };
  }
  getOptions(options) {
    if ((0, _type.isDefined)(options.text)) {
      options.message = options.text;
    } else {
      options.message = _message.default.format('dxDataGrid-exporting');
    }
    return (0, _extend.extend)(this.getDefaultOptions(), options);
  }
  show() {
    this._loadPanel.option('position', _m_utils.default.calculateLoadPanelPosition(this._$targetElement));
    this._loadPanel.show();
  }
  dispose() {
    (0, _renderer.default)(this._loadPanel.element()).remove();
    delete this._loadPanel;
  }
}
exports.ExportLoadPanel = ExportLoadPanel;
