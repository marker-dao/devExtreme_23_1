/**
* DevExtreme (ui/scroll_view.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    DxPromise,
} from '../core/utils/deferred';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import dxScrollable, {
    dxScrollableOptions,
    ScrollEventInfo,
} from './scroll_view/ui.scrollable';

/**
 * @docid _ui_scroll_view_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxScrollView>;

/**
 * @docid _ui_scroll_view_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxScrollView>;

/**
 * @docid _ui_scroll_view_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxScrollView> & ChangedOptionInfo;

/**
 * @docid _ui_scroll_view_PullDownEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type PullDownEvent = EventInfo<dxScrollView>;

/**
 * @docid _ui_scroll_view_ReachBottomEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ReachBottomEvent = EventInfo<dxScrollView>;

/**
 * @docid _ui_scroll_view_ScrollEvent
 * @public
 * @type object
 * @inherits ScrollEventInfo
 */
export type ScrollEvent = ScrollEventInfo<dxScrollView>;

/**
 * @docid _ui_scroll_view_UpdatedEvent
 * @public
 * @type object
 * @inherits ScrollEventInfo
 */
export type UpdatedEvent = ScrollEventInfo<dxScrollView>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxScrollViewOptions extends dxScrollableOptions<dxScrollView> {
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/scroll_view:PullDownEvent}
     * @action
     * @public
     */
    onPullDown?: ((e: PullDownEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/scroll_view:ReachBottomEvent}
     * @action
     * @public
     */
    onReachBottom?: ((e: ReachBottomEvent) => void);
    /**
     * @docid
     * @default "Release to refresh..."
     * @default "" &for(Material)
     * @default "" &for(Fluent)
     * @public
     */
    pulledDownText?: string;
    /**
     * @docid
     * @default "Pull down to refresh..."
     * @default "" &for(Material)
     * @default "" &for(Fluent)
     * @public
     */
    pullingDownText?: string;
    /**
     * @docid
     * @default "Loading..."
     * @default "" &for(Material)
     * @default "" &for(Fluent)
     * @public
     */
    reachBottomText?: string;
    /**
     * @docid
     * @default "Refreshing..."
     * @default "" &for(Material)
     * @default "" &for(Fluent)
     * @public
     */
    refreshingText?: string;
}
/**
 * @docid
 * @inherits dxScrollable
 * @hasTranscludedContent
 * @namespace DevExpress.ui
 * @public
 */
export default class dxScrollView extends dxScrollable<dxScrollViewOptions> {
    /**
     * @docid
     * @publicName refresh()
     * @public
     */
    refresh(): void;
    /**
     * @docid
     * @publicName release(preventScrollBottom)
     * @return Promise<void>
     * @public
     */
    release(preventScrollBottom: boolean): DxPromise<void>;
}

/** @public */
export type Properties = dxScrollViewOptions;

/** @deprecated use Properties instead */
export type Options = dxScrollViewOptions;


