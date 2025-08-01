/**
* DevExtreme (esm/__internal/grids/new/grid_core/accessibility/controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../../localization/message';
import { computed, effect, signal } from '@preact/signals-core';
import { ColumnsController } from '../columns_controller/columns_controller';
import { DataController } from '../data_controller/index';
export class AccessibilityController {
  constructor(columnsController, dataController) {
    this.columnsController = columnsController;
    this.dataController = dataController;
    this.firstRender = signal(true);
    this.description = computed(
    // @ts-expect-error ts-error
    () => messageLocalization.format('dxCardView-ariaCardView', this.dataController.totalCount.value, this.columnsController.visibleColumns.value.length));
    this.componentDescription = computed(() => this.description.value);
    this.componentStatus = computed(() => {
      if (this.firstRender.value) {
        return '';
      }
      return this.componentDescription.value;
    });
    let firstRender = true;
    effect(() => {
      // TODO: First Render refactor
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.componentDescription.value;
      if (!firstRender) {
        this.firstRender.value = false;
      }
      firstRender = false;
    });
  }
}
AccessibilityController.dependencies = [ColumnsController, DataController];
