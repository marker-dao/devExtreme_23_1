/**
* DevExtreme (esm/__internal/grids/new/grid_core/pager/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { computed, effect, signal } from '@preact/signals-core';
import { MAX_PAGES_COUNT } from '../../../../grids/grid_core/pager/m_pager';
import { View } from '../core/view';
import { DataController } from '../data_controller/index';
import { OptionsController } from '../options_controller/options_controller';
import { PagerView as Pager } from './pager';
import { calculatePageSizes, isVisible } from './utils';
export class PagerView extends View {
  constructor(dataController, options) {
    super();
    this.dataController = dataController;
    this.options = options;
    this.component = Pager;
    this.pageSizesConfig = this.options.oneWay('pager.allowedPageSizes');
    this.allowedPageSizes = signal(undefined);
    this.visibleConfig = this.options.oneWay('pager.visible');
    this.visible = computed(() => isVisible(this.visibleConfig.value, this.dataController.pageCount.value));
    effect(() => {
      this.allowedPageSizes.value = calculatePageSizes(this.allowedPageSizes.peek(), this.pageSizesConfig.value, this.dataController.pageSize.value);
    });
  }
  getProps() {
    return computed(() => ({
      itemCount: this.dataController.totalCount.value,
      allowedPageSizes: this.allowedPageSizes.value,
      visible: this.visible.value,
      pageIndex: this.dataController.pageIndex.value + 1,
      pageIndexChanged: value => {
        this.dataController.pageIndex.value = value - 1;
      },
      pageSize: this.dataController.pageSize.value,
      pageSizeChanged: value => {
        this.dataController.pageSize.value = value;
      },
      pageCount: this.dataController.pageCount.value,
      showPageSizeSelector: this.options.oneWay('pager.showPageSizeSelector').value,
      _skipValidation: true,
      tabIndex: 0,
      showInfo: this.options.oneWay('pager.showInfo').value,
      showNavigationButtons: this.options.oneWay('pager.showNavigationButtons').value,
      label: this.options.oneWay('pager.label').value,
      pagesNavigatorVisible: this.options.oneWay('pager.visible').value,
      displayMode: this.options.oneWay('pager.displayMode').value,
      maxPagesCount: MAX_PAGES_COUNT
    }));
  }
}
PagerView.dependencies = [DataController, OptionsController];
