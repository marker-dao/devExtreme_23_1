/**
* DevExtreme (esm/__internal/exporter/common/export_load_panel.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { isDefined } from '../../../core/utils/type';
import LoadPanel from '../../../ui/load_panel';
import gridUtils from '../../grids/grid_core/m_utils';
const EXPORT_LOAD_PANEL_CLASS = 'dx-export-loadpanel';
class ExportLoadPanel {
  constructor(component, $targetElement, $container, options) {
    this._$targetElement = $targetElement;
    this._$container = $container;
    this._loadPanel = component._createComponent($('<div>').addClass(EXPORT_LOAD_PANEL_CLASS).appendTo(this._$container), LoadPanel, this.getOptions(options));
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
    if (isDefined(options.text)) {
      options.message = options.text;
    } else {
      options.message = messageLocalization.format('dxDataGrid-exporting');
    }
    return extend(this.getDefaultOptions(), options);
  }
  show() {
    this._loadPanel.option('position', gridUtils.calculateLoadPanelPosition(this._$targetElement));
    this._loadPanel.show();
  }
  dispose() {
    $(this._loadPanel.element()).remove();
    delete this._loadPanel;
  }
}
export { ExportLoadPanel };
