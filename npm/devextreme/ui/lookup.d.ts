/**
* DevExtreme (ui/lookup.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
    ApplyValueMode,
    PageLoadMode,
} from '../common';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    ItemInfo,
} from '../common/core/events';

import {
    ValueChangedInfo,
} from './editor/editor';

import dxDropDownList, {
    dxDropDownListOptions,
    SelectionChangedInfo,
} from './drop_down_editor/ui.drop_down_list';

import {
    ScrollInfo,
} from './list';

import {
    Properties as PopoverProperties,
} from './popover';

import {
    TitleRenderedInfo,
} from './popup';

export {
    ApplyValueMode,
    PageLoadMode,
};

/**
 * @docid _ui_lookup_ClosedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ClosedEvent = EventInfo<dxLookup>;

/**
 * @docid _ui_lookup_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxLookup>;

/**
 * @docid _ui_lookup_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxLookup>;

/**
 * @docid _ui_lookup_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxLookup>;

/**
 * @docid _ui_lookup_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent = NativeEventInfo<dxLookup, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo;

/**
 * @docid _ui_lookup_OpenedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type OpenedEvent = EventInfo<dxLookup>;

/**
 * @docid _ui_lookup_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxLookup> & ChangedOptionInfo;

/**
 * @docid _ui_lookup_PageLoadingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type PageLoadingEvent = EventInfo<dxLookup>;

/**
 * @docid _ui_lookup_PullRefreshEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type PullRefreshEvent = EventInfo<dxLookup>;

/**
 * @docid _ui_lookup_ScrollEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ScrollInfo
 */
export type ScrollEvent = NativeEventInfo<dxLookup, MouseEvent | Event> & ScrollInfo;

/**
 * @docid _ui_lookup_SelectionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,_ui_drop_down_editor_ui_drop_down_list_SelectionChangedInfo
 */
export type SelectionChangedEvent = EventInfo<dxLookup> & SelectionChangedInfo;

/** @public */
export type TitleRenderedEvent = EventInfo<dxLookup> & TitleRenderedInfo;

/**
 * @docid _ui_lookup_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxLookup, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxLookupOptions extends dxDropDownListOptions<dxLookup> {
    /**
     * @docid
     * @default "OK"
     * @public
     */
    applyButtonText?: string;
    /**
     * @docid
     * @hidden false
     * @public
     */
    applyValueMode?: ApplyValueMode;
    /**
     * @docid
     * @default "Cancel"
     * @public
     */
    cancelButtonText?: string;
    /**
     * @docid
     * @default true
     * @public
     */
    cleanSearchOnOpening?: boolean;
    /**
     * @docid
     * @default "Clear"
     * @public
     */
    clearButtonText?: string;
    /**
     * @docid
     * @default null
     * @type_function_param1 selectedItem:object
     * @type_function_return string|Element|jQuery
     * @public
     */
    fieldTemplate?: template | ((selectedItem: any, fieldElement: DxElement) => string | UserDefinedElement);
    /**
     * @docid
     * @default false
     * @default true &for(desktop)
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid
     * @default "group"
     * @type_function_param1 itemData:object
     * @type_function_return string|Element|jQuery
     * @public
     */
    groupTemplate?: template | ((itemData: any, itemIndex: number, itemElement: DxElement) => string | UserDefinedElement);
    /**
     * @docid
     * @default false
     * @public
     */
    grouped?: boolean;
    /**
     * @docid
     * @default "More"
     * @public
     */
    nextButtonText?: string;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/lookup:PageLoadingEvent}
     * @action
     * @public
     */
    onPageLoading?: ((e: PageLoadingEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/lookup:PullRefreshEvent}
     * @action
     * @public
     */
    onPullRefresh?: ((e: PullRefreshEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/lookup:ScrollEvent}
     * @action
     * @public
     */
    onScroll?: ((e: ScrollEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/lookup:ValueChangedEvent}
     * @action
     * @public
     */
    onValueChanged?: ((e: ValueChangedEvent) => void);
    /**
     * @docid
     * @default "scrollBottom"
     * @public
     */
    pageLoadMode?: PageLoadMode;
    /**
     * @docid
     * @default "Loading..."
     * @public
     */
    pageLoadingText?: string;
    /**
     * @docid
     * @default "Select"
     * @public
     */
    placeholder?: string;
    /**
     * @docid
     * @default false
     * @public
     */
    pullRefreshEnabled?: boolean;
    /**
     * @docid
     * @default "Release to refresh..."
     * @public
     */
    pulledDownText?: string;
    /**
     * @docid
     * @default "Pull down to refresh..."
     * @public
     */
    pullingDownText?: string;
    /**
     * @docid
     * @default "Refreshing..."
     * @public
     */
    refreshingText?: string;
    /**
     * @docid
     * @default true
     * @publicName searchEnabled
     * @default false &for(Material)
     * @public
     */
    searchEnabled?: boolean;
    /**
     * @docid
     * @default "Search"
     * @public
     */
    searchPlaceholder?: string;
    /**
     * @docid
     * @default true
     * @publicName showCancelButton
     * @default false &for(Material)
     * @public
     */
    showCancelButton?: boolean;
    /**
     * @docid
     * @default false
     * @public
     */
    showClearButton?: boolean;
    /**
     * @docid
     * @default "input change keyup"
     * @public
     */
    searchStartEvent?: string;
    /**
     * @docid
     * @default true
     * @default false &for(desktop except Mac)
     * @public
     */
    useNativeScrolling?: boolean;
    /**
     * @docid
     * @default false
     * @default true &for(desktop|iOS)
     * @publicName usePopover
     * @default false &for(Material)
     * @public
     */
    usePopover?: boolean;
    /**
     * @docid
     * @default false
     * @default true &for(Material)
     * @public
     */
    dropDownCentered?: boolean;
    /**
     * @docid
     * @type dxPopoverOptions
     */
    dropDownOptions?: PopoverProperties;

}
/**
 * @docid
 * @isEditor
 * @inherits dxDropDownList
 * @namespace DevExpress.ui
 * @public
 */
export default class dxLookup extends dxDropDownList<dxLookupOptions> { }

/** @public */
export type Properties = dxLookupOptions;

/** @deprecated use Properties instead */
export type Options = dxLookupOptions;


