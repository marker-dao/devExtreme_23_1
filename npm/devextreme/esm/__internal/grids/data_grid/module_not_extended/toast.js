/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/toast.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ToastViewController } from '../../../grids/grid_core/toast/m_toast_controller';
import { ToastView } from '../../../grids/grid_core/toast/m_toast_view';
import gridCore from '../m_core';
gridCore.registerModule('toast', {
  defaultOptions() {
    return {};
  },
  controllers: {
    toastViewController: ToastViewController
  },
  views: {
    toastView: ToastView
  }
});
