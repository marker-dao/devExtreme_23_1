/**
* DevExtreme (esm/__internal/grids/new/card_view/widget.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
/* eslint-disable spellcheck/spell-checker */
import registerComponent from '../../../../core/component_registrator';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import { MainView as MainViewBase } from '../../../grids/new/grid_core/main_view';
import { OptionsController as OptionsControllerBase } from '../../../grids/new/grid_core/options_controller/options_controller';
import { GridCoreNew } from '../../../grids/new/grid_core/widget';
import * as ContentViewModule from './content_view/index';
import { ContextMenuController } from './context_menu/controller';
import { ContextMenuView } from './context_menu/view';
import * as di from './di';
import { HeaderPanelView } from './header_panel/view';
import { MainView } from './main_view';
import { defaultOptions } from './options';
import { OptionsController } from './options_controller';
export class CardViewBase extends GridCoreNew {
  _registerDIContext() {
    super._registerDIContext();
    di.register(this.diContext);
    this.diContext.register(MainViewBase, MainView);
    const optionsController = new OptionsController(this);
    this.diContext.registerInstance(OptionsController, optionsController);
    // @ts-expect-error
    this.diContext.registerInstance(OptionsControllerBase, optionsController);
  }
  _initMarkup() {
    super._initMarkup();
    $(this.$element()).addClass('dx-cardview');
  }
  _initDIContext() {
    super._initDIContext();
    this.contentView = this.diContext.get(ContentViewModule.View);
    this.headerPanel = this.diContext.get(HeaderPanelView);
    this.contextMenu = this.diContext.get(ContextMenuView);
    this.contextMenuController = this.diContext.get(ContextMenuController);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), extend(true, {}, defaultOptions));
  }
}
export class CardView extends ContentViewModule.PublicMethods(CardViewBase) {}
// @ts-expect-error
registerComponent('dxCardView', CardView);
export default CardView;
