/**
* DevExtreme (ui/responsive_box.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DataSourceLike } from '../data/data_source';

import {
  EventInfo,
  NativeEventInfo,
  InitializedEventInfo,
  ChangedOptionInfo,
  ItemInfo,
} from '../common/core/events';

import CollectionWidget, {
  CollectionWidgetItem,
  CollectionWidgetOptions,
} from './collection/ui.collection_widget.base';

import {
  Mode,
} from '../common';

type ItemLike = string | Item | any;

export {
  Mode,
};

/**
 * @docid _ui_responsive_box_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxResponsiveBox<TItem, TKey>>;

/**
 * @docid _ui_responsive_box_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxResponsiveBox<TItem, TKey>>;

/**
 * @docid _ui_responsive_box_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent<TItem extends ItemLike = any, TKey = any> = InitializedEventInfo<dxResponsiveBox<TItem, TKey>>;

/**
 * @docid _ui_responsive_box_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxResponsiveBox<TItem, TKey>, MouseEvent | PointerEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_responsive_box_ItemContextMenuEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemContextMenuEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxResponsiveBox<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_responsive_box_ItemHoldEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemHoldEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxResponsiveBox<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_responsive_box_ItemRenderedEvent
 * @public
 * @type object
 * @inherits EventInfo,ItemInfo
 */
export type ItemRenderedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxResponsiveBox<TItem, TKey>> & ItemInfo<TItem>;

/**
 * @docid _ui_responsive_box_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxResponsiveBox<TItem, TKey>> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @public
 * @docid
 */
export interface dxResponsiveBoxOptions<
  TItem extends ItemLike = any,
  TKey = any,
  > extends CollectionWidgetOptions<dxResponsiveBox<TItem, TKey>, TItem, TKey> {
    /**
     * @docid
     * @public
     */
    cols?: Array<{
      /**
       * @docid
       * @default 0
       */
      baseSize?: number | string;
      /**
       * @docid
       * @default 1
       */
      ratio?: number;
      /**
       * @docid
       * @default undefined
       */
      screen?: string | undefined;
      /**
       * @docid
       * @default 1
       */
      shrink?: number;
    }>;
    /**
     * @docid
     * @type string | Array<string | dxResponsiveBoxItem | any> | Store | DataSource | DataSourceOptions | null
     * @default null
     * @public
     */
    dataSource?: DataSourceLike<TItem, TKey> | null;
    /**
     * @docid
     * @default '100%'
     * @public
     */
    height?: number | string;
    /**
     * @docid
     * @type Array<string | dxResponsiveBoxItem | any>
     * @fires dxResponsiveBoxOptions.onOptionChanged
     * @public
     */
    items?: Array<TItem>;
    /**
     * @docid
     * @public
     */
    rows?: Array<{
      /**
       * @docid
       * @default 0
       */
      baseSize?: number | string;
      /**
       * @docid
       * @default 1
       */
      ratio?: number;
      /**
       * @docid
       * @default undefined
       */
      screen?: string | undefined;
      /**
       * @docid
       * @default 1
       */
      shrink?: number;
    }>;
    /**
     * @docid
     * @default null
     * @public
     */
    screenByWidth?: Function;
    /**
     * @docid
     * @default ""
     * @public
     */
    singleColumnScreen?: string;
    /**
     * @docid
     * @default '100%'
     * @public
     */
    width?: number | string;
}
/**
 * @docid
 * @inherits CollectionWidget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxResponsiveBox<
  TItem extends ItemLike = any,
  TKey = any,
  > extends CollectionWidget<dxResponsiveBoxOptions<TItem, TKey>, TItem, TKey> { }

/**
 * @public
 * @namespace DevExpress.ui.dxResponsiveBox
 */
export type Item = dxResponsiveBoxItem;

/**
 * @deprecated Use Item instead
 * @namespace DevExpress.ui
 */
export interface dxResponsiveBoxItem extends CollectionWidgetItem {
    /**
     * @docid
     * @public
     */
    location?: {
      /**
       * @docid
       */
      col?: number;
      /**
       * @docid
       * @default undefined
       */
      colspan?: number | undefined;
      /**
       * @docid
       */
      row?: number;
      /**
       * @docid
       * @default undefined
       */
      rowspan?: number | undefined;
      /**
       * @docid
       * @default undefined
       */
      screen?: string | undefined;
    } | Array<{ col?: number; colspan?: number; row?: number; rowspan?: number; screen?: string }>;
}

/** @public */
export type ExplicitTypes<
  TItem extends ItemLike,
  TKey,
> = {
  Properties: Properties<TItem, TKey>;
  ContentReadyEvent: ContentReadyEvent<TItem, TKey>;
  DisposingEvent: DisposingEvent<TItem, TKey>;
  InitializedEvent: InitializedEvent<TItem, TKey>;
  ItemClickEvent: ItemClickEvent<TItem, TKey>;
  ItemContextMenuEvent: ItemContextMenuEvent<TItem, TKey>;
  ItemHoldEvent: ItemHoldEvent<TItem, TKey>;
  ItemRenderedEvent: ItemRenderedEvent<TItem, TKey>;
  OptionChangedEvent: OptionChangedEvent<TItem, TKey>;
};

/** @public */
export type Properties<
  TItem extends ItemLike = any,
  TKey = any,
> = dxResponsiveBoxOptions<TItem, TKey>;

/** @deprecated use Properties instead */
export type Options<
  TItem extends ItemLike = any,
  TKey = any,
> = Properties<TItem, TKey>;


