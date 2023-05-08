/**
* DevExtreme (esm/__internal/grids/data_grid/module_columns_controller.js)
* Version: 23.1.1
* Build date: Mon May 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { columnsControllerModule } from '../../../ui/grid_core/ui.grid_core.columns_controller';
import { extend } from '../../../core/utils/extend';
import gridCore from './module_core';
gridCore.registerModule('columns', {
  defaultOptions() {
    return extend(true, {}, columnsControllerModule.defaultOptions(), {
      commonColumnSettings: {
        allowExporting: true
      }
    });
  },
  controllers: columnsControllerModule.controllers
});
