/**
* DevExtreme (ui/action_sheet.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DataSourceLike } from '../data/data_source';
import {
    UserDefinedElement,
} from '../core/element';

import {
    DxPromise,
} from '../core/utils/deferred';

import {
    Cancelable,
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
    ButtonType,
    ButtonStyle,
} from '../common';

type ItemLike<TKey> = string | Item<TKey> | any;

export {
    ButtonType,
    ButtonStyle,
};

/**
 * @docid _ui_action_sheet_CancelClickEvent
 * @public
 * @type object
 * @inherits Cancelable,EventInfo
 */
export type CancelClickEvent<TItem extends ItemLike<TKey> = any, TKey = any> = Cancelable & EventInfo<dxActionSheet<TItem, TKey>>;

/**
 * @docid _ui_action_sheet_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent<TItem extends ItemLike<TKey> = any, TKey = any> = EventInfo<dxActionSheet<TItem, TKey>>;

/**
 * @docid _ui_action_sheet_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent<TItem extends ItemLike<TKey> = any, TKey = any> = EventInfo<dxActionSheet<TItem, TKey>>;

/**
 * @docid _ui_action_sheet_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent<TItem extends ItemLike<TKey> = any, TKey = any> = InitializedEventInfo<dxActionSheet<TItem, TKey>>;

/**
 * @docid _ui_action_sheet_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent<TItem extends ItemLike<TKey> = any, TKey = any> = NativeEventInfo<dxActionSheet<TItem, TKey>, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_action_sheet_ItemContextMenuEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemContextMenuEvent<TItem extends ItemLike<TKey> = any, TKey = any> = NativeEventInfo<dxActionSheet<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_action_sheet_ItemHoldEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemHoldEvent<TItem extends ItemLike<TKey> = any, TKey = any> = NativeEventInfo<dxActionSheet<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_action_sheet_ItemRenderedEvent
 * @public
 * @type object
 * @inherits EventInfo,ItemInfo
 */
export type ItemRenderedEvent<TItem extends ItemLike<TKey> = any, TKey = any> = EventInfo<dxActionSheet<TItem, TKey>> & ItemInfo<TItem>;

/**
 * @docid _ui_action_sheet_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent<TItem extends ItemLike<TKey> = any, TKey = any> = EventInfo<dxActionSheet<TItem, TKey>> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @public
 * @docid
 */
export interface dxActionSheetOptions<
    TItem extends ItemLike<TKey> = any,
    TKey = any,
> extends CollectionWidgetOptions<dxActionSheet<TItem, TKey>, TItem, TKey> {
    /**
     * @docid
     * @default "Cancel"
     * @public
     */
    cancelText?: string;
    /**
     * @docid
     * @type string | Array<string | dxActionSheetItem | any> | Store | DataSource | DataSourceOptions | null
     * @default null
     * @public
     */
    dataSource?: DataSourceLike<TItem, TKey> | null;
    /**
     * @docid
     * @type Array<string | dxActionSheetItem | any>
     * @fires dxActionSheetOptions.onOptionChanged
     * @public
     */
    items?: Array<TItem>;
    /**
     * @docid
     * @default null
     * @type function
     * @type_function_param1 e:{ui/action_sheet:CancelClickEvent}
     * @action
     * @public
     */
    onCancelClick?: ((e: CancelClickEvent<TItem, TKey>) => void) | string;
    /**
     * @docid
     * @default true
     * @public
     */
    showCancelButton?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    showTitle?: boolean;
    /**
     * @docid
     * @public
     */
    target?: string | UserDefinedElement;
    /**
     * @docid
     * @default ""
     * @public
     */
    title?: string;
    /**
     * @docid
     * @default false
     * @default true &for(iPad)
     * @public
     */
    usePopover?: boolean;
    /**
     * @docid
     * @default false
     * @fires dxActionSheetOptions.onOptionChanged
     * @public
     */
    visible?: boolean;
}
/**
 * @docid
 * @inherits CollectionWidget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxActionSheet<
    TItem extends ItemLike<TKey> = any,
    TKey = any,
> extends CollectionWidget<dxActionSheetOptions<TItem, TKey>, TItem, TKey> {
    /**
     * @docid
     * @publicName hide()
     * @return Promise<void>
     * @public
     */
    hide(): DxPromise<void>;
    /**
     * @docid
     * @publicName show()
     * @return Promise<void>
     * @public
     */
    show(): DxPromise<void>;
    /**
     * @docid
     * @publicName toggle(showing)
     * @return Promise<void>
     * @public
     */
    toggle(showing: boolean): DxPromise<void>;
}

/**
 * @public
 * @namespace DevExpress.ui.dxActionSheet
 */
export type Item<TKey = any> = dxActionSheetItem<TKey>;

/**
 * @deprecated Use Item instead
 * @namespace DevExpress.ui
 */
export interface dxActionSheetItem<TKey = any> extends CollectionWidgetItem {
    /**
     * @docid
     * @public
     */
    icon?: string;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:NativeEventInfo
     * @type function
     * @public
     */
    onClick?: ((e: NativeEventInfo<dxActionSheet<this, TKey>, MouseEvent | PointerEvent>) => void) | string;
    /**
     * @docid
     * @default 'normal'
     * @public
     */
    type?: ButtonType | string;
    /**
     * @docid
     * @default 'outlined'
     * @public
     */
    stylingMode?: ButtonStyle;
}

/** @public */
export type ExplicitTypes<
    TItem extends ItemLike<TKey>,
    TKey,
> = {
    Properties: Properties<TItem, TKey>;
    CancelClickEvent: CancelClickEvent<TItem, TKey>;
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
    TItem extends ItemLike<TKey> = any,
    TKey = any,
> = dxActionSheetOptions<TItem, TKey>;

/** @deprecated use Properties instead */
export type Options<
    TItem extends ItemLike<TKey> = any,
    TKey = any,
> = Properties<TItem, TKey>;


