/**
* DevExtreme (ui/pivot_grid_field_chooser.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import { DxEvent } from '../events';

import PivotGridDataSource, {
    Field,
} from './pivot_grid/data_source';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

import {
    FieldChooserLayout,
} from '../common';

import {
    ApplyChangesMode,
    HeaderFilterSearchConfig,
} from '../common/grids';

export {
    ApplyChangesMode,
    FieldChooserLayout,
};

/**
 * @docid _ui_pivot_grid_field_chooser_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxPivotGridFieldChooser>;

/**
 * @docid _ui_pivot_grid_field_chooser_ContextMenuPreparingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContextMenuPreparingEvent = EventInfo<dxPivotGridFieldChooser> & {
    /** @docid _ui_pivot_grid_field_chooser_ContextMenuPreparingEvent.area */
    readonly area?: string;
    /**
     * @docid _ui_pivot_grid_field_chooser_ContextMenuPreparingEvent.field
     * @type object
     */
    readonly field?: Field;
    /**
     * @docid _ui_pivot_grid_field_chooser_ContextMenuPreparingEvent.event
     * @type event
     */
    readonly event?: DxEvent;
    /**
     * @docid _ui_pivot_grid_field_chooser_ContextMenuPreparingEvent.items
     * @type Array<Object>
     */
    items?: Array<any>;
};

/**
 * @docid _ui_pivot_grid_field_chooser_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxPivotGridFieldChooser>;

/**
 * @docid _ui_pivot_grid_field_chooser_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxPivotGridFieldChooser>;

/**
 * @docid _ui_pivot_grid_field_chooser_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxPivotGridFieldChooser> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxPivotGridFieldChooserOptions extends WidgetOptions<dxPivotGridFieldChooser> {
    /**
     * @docid
     * @default false
     * @public
     */
    allowSearch?: boolean;
    /**
     * @docid
     * @default "instantly"
     * @public
     */
    applyChangesMode?: ApplyChangesMode;
    /**
     * @docid
     * @default null
     * @ref
     * @public
     */
    dataSource?: PivotGridDataSource | null;
    /**
     * @docid
     * @default true
     * @public
     */
    encodeHtml?: boolean;
    /**
     * @docid
     * @public
     */
    headerFilter?: {
      /**
       * @docid
       * @default false
       * @deprecated
       */
      allowSearch?: boolean;
      /**
       * @docid
       * @default true
       */
      allowSelectAll?: boolean;
      /**
       * @docid
       * @default 325
       */
      height?: number;
      /**
       * @docid
       */
      search?: HeaderFilterSearchConfig;
      /**
       * @docid
       * @default 500
       * @deprecated
       */
      searchTimeout?: number;
      /**
       * @docid
       * @default false
       */
      showRelevantValues?: boolean;
      /**
       * @docid
       */
      texts?: {
        /**
         * @docid
         * @default "Cancel"
         */
        cancel?: string;
        /**
         * @docid
         * @default "(Blanks)"
         */
        emptyValue?: string;
        /**
         * @docid
         * @default "Ok"
         */
        ok?: string;
      };
      /**
       * @docid
       * @default 252
       */
      width?: number;
    };
    /**
     * @docid
     * @default 400
     * @public
     */
    height?: number | string;
    /**
     * @docid
     * @default 0
     * @public
     */
    layout?: FieldChooserLayout;
    /**
     * @docid
     * @type_function_param1 e:{ui/pivot_grid_field_chooser:ContextMenuPreparingEvent}
     * @default null

     * @action
     * @public
     */
    onContextMenuPreparing?: ((e: ContextMenuPreparingEvent) => void);
    /**
     * @docid
     * @default 500
     * @public
     */
    searchTimeout?: number;
    /**
     * @docid
     * @default null
     * @public
     */
    state?: any;
    /**
     * @docid
     * @public
     */
    texts?: {
      /**
       * @docid
       * @default 'All Fields'
       */
      allFields?: string;
      /**
       * @docid
       * @default 'Column Fields'
       */
      columnFields?: string;
      /**
       * @docid
       * @default 'Data Fields'
       */
      dataFields?: string;
      /**
       * @docid
       * @default 'Filter Fields'
       */
      filterFields?: string;
      /**
       * @docid
       * @default 'Row Fields'
       */
      rowFields?: string;
    };
}
/**
 * @docid
 * @inherits Widget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxPivotGridFieldChooser extends Widget<dxPivotGridFieldChooserOptions> {
    /**
     * @docid
     * @publicName applyChanges()
     * @public
     */
    applyChanges(): void;
    /**
     * @docid
     * @publicName cancelChanges()
     * @public
     */
    cancelChanges(): void;
    /**
     * @docid
     * @publicName getDataSource()
     * @public
     */
    getDataSource(): PivotGridDataSource;
    /**
     * @docid
     * @publicName updateDimensions()
     * @public
     */
    updateDimensions(): void;
}

/** @public */
export type Properties = dxPivotGridFieldChooserOptions;

/** @deprecated use Properties instead */
export type Options = dxPivotGridFieldChooserOptions;


