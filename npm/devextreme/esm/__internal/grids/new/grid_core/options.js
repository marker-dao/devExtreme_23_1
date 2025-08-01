/**
* DevExtreme (esm/__internal/grids/new/grid_core/options.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import browser from '../../../../core/utils/browser';
import { isMaterialBased } from '../../../../ui/themes';
import * as columnChooser from './column_chooser/index';
import * as columnsController from './columns_controller/index';
import * as contentView from './content_view/index';
import * as dataController from './data_controller/index';
import * as editing from './editing/index';
import * as filterSync from './filtering/filter_sync/index';
import * as headerFilter from './filtering/header_filter/index';
import * as filterController from './filtering/index';
import { filterPanel } from './filtering/index';
import * as keyboardNavigation from './keyboard_navigation/index';
import * as pager from './pager/index';
import * as searchPanel from './search/index';
import * as selection from './selection/index';
import * as sortingController from './sorting_controller/index';
import * as toolbar from './toolbar/index';
export const defaultOptions = _extends({}, dataController.defaultOptions, sortingController.defaultOptions, columnsController.defaultOptions, pager.defaultOptions, filterPanel.defaultOptions, filterController.defaultOptions, headerFilter.defaultOptions, filterSync.defaultOptions, contentView.defaultOptions, searchPanel.defaultOptions, columnChooser.defaultOptions, selection.defaultOptions, toolbar.defaultOptions, editing.defaultOptions, keyboardNavigation.defaultOptions);
// TODO: separate by modules
// TODO: add typing for defaultOptionRules
export const defaultOptionsRules = [{
  device() {
    // @ts-expect-error
    return isMaterialBased();
  },
  options: {
    headerFilter: {
      height: 315
    },
    editing: {
      useIcons: true
    },
    selection: {
      showCheckBoxesMode: 'always'
    }
  }
}, {
  device() {
    return browser.webkit;
  },
  options: {
    loadingTimeout: 30,
    loadPanel: {
      animation: {
        show: {
          easing: 'cubic-bezier(1, 0, 1, 0)',
          duration: 500,
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }
    }
  }
}];
