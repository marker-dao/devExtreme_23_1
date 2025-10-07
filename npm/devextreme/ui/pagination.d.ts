/**
* DevExtreme (ui/pagination.d.ts)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Widget, { WidgetOptions } from './widget/ui.widget';
import {
    DisplayMode,
    Mode,
} from '../common';

export {
    DisplayMode,
};

/**
 * @docid
 * @hidden
 * @namespace DevExpress.common
 */
export type PagerBase = {
    /**
     * @docid
     * @public
     * @default "adaptive"
     */
    displayMode?: DisplayMode;
    /**
     * @docid
     * @public
     * @default "Page {0} of {1} ({2} items)"
     */
    infoText?: string;
    /**
     * @docid
     * @public
     * @default false
     */
    showInfo?: boolean;
    /**
     * @docid
     * @public
     * @default false
     */
    showNavigationButtons?: boolean;
    /**
     * @docid
     * @public
     * @default "auto"
     */
    showPageSizeSelector?: boolean | Mode;
    /**
     * @docid
     * @public
     * @default "Page Navigation"
     */
    label?: string;
  };

/**
 * @public
 */
export type PageSize = number | 'all';

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @public
 * @docid
 * @inherits PagerBase
 */
export interface dxPaginationOptions extends PagerBase, WidgetOptions<dxPagination> {
    /**
     * @docid
     * @fires Properties.onOptionChanged
     * @default 1
     */
    pageIndex?: number;

    /**
     * @docid
     * @fires Properties.onOptionChanged
     * @default 5
     */
    pageSize?: number;

    /**
     * @docid
     * @default 1
     */
    itemCount?: number;

    /**
     * @docid
     * @default [5, 10]
     * @type Array<number | string>
     */
    allowedPageSizes?: Array<PageSize>;
}

/**
 * @docid
 * @namespace DevExpress.ui
 * @public
 * @inherits Widget
 * @options dxPaginationOptions
 */
export default class dxPagination extends Widget<Properties> {
    /**
     * @docid
     * @publicName getPageCount()
     * @public
     */
     getPageCount(): number;
}

/**
 * @public
 */
export type Properties = dxPaginationOptions;
