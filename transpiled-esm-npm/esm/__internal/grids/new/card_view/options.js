import _extends from "@babel/runtime/helpers/esm/extends";
import * as GridCore from '../../../grids/new/grid_core/options';
import * as ContentView from './content_view/index';
import * as HeaderPanel from './header_panel/index';
export const defaultOptions = _extends({}, GridCore.defaultOptions, ContentView.defaultOptions, HeaderPanel.defaultOptions);