/**
* DevExtreme (viz/common.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxChartSeriesTypesCommonSeries,
} from './chart';

import {
    HorizontalAlignment,
    Orientation,
    Position,
    VerticalEdge,
} from '../common';

import {
    DashStyle,
    LegendMarkerState,
    SeriesType as CommonSeriesType,
    Font,
} from '../common/charts';

import type * as Common from '../common/charts';

/** @deprecated Use SeriesType from 'devextreme/common/charts' instead */
export type SeriesType = Common.SeriesType;

/** @deprecated Use TimeIntervalConfig from 'devextreme/common/charts' instead */
export type VizTimeInterval = Common.TimeIntervalConfig;

/** @deprecated Use ScaleBreak from 'devextreme/common/charts' instead */
export type ScaleBreak = Common.ScaleBreak;

/** @deprecated Use VisualRange from 'devextreme/common/charts' instead */
export type VisualRange = Common.VisualRange;

/**
 * @docid
 * @type object
 * @namespace DevExpress.common.charts
 * @hidden
 */
export interface BaseLegend {
    /**
     * @docid
     * @default undefined
     * @public
     */
    backgroundColor?: string | undefined;
    /**
     * @docid
     * @public
     */
    border?: {
      /**
       * @docid
       * @default '#d3d3d3'
       */
      color?: string;
      /**
       * @docid
       * @default 0
       */
      cornerRadius?: number;
      /**
       * @docid
       * @default 'solid'
       */
      dashStyle?: DashStyle;
      /**
       * @docid
       * @default undefined
       */
      opacity?: number | undefined;
      /**
       * @docid
       * @default false
       */
      visible?: boolean;
      /**
       * @docid
       * @default 1
       */
      width?: number;
    };
    /**
     * @docid
     * @default 0
     * @public
     */
    columnCount?: number;
    /**
     * @docid
     * @default 20
     * @public
     */
    columnItemSpacing?: number;
    /**
     * @docid
     * @default '#767676' &prop(color)
     * @public
     */
    font?: Font;
    /**
     * @docid
     * @default 'right'
     * @public
     */
    horizontalAlignment?: HorizontalAlignment;
    /**
     * @docid
     * @default undefined
     * @public
     */
    itemTextPosition?: Position | undefined;
    /**
     * @docid
     * @default undefined
     * @public
     */
    itemsAlignment?: HorizontalAlignment | undefined;
    /**
     * @docid
     * @default 10
     * @public
     */
    margin?: number | {
      /**
       * @docid
       * @default 10
       */
      bottom?: number;
      /**
       * @docid
       * @default 10
       */
      left?: number;
      /**
       * @docid
       * @default 10
       */
      right?: number;
      /**
       * @docid
       * @default 10
       */
      top?: number;
    };
    /**
     * @docid
     * @default 20
     * @public
     */
    markerSize?: number;
    /**
     * @docid
     * @default undefined
     * @public
     */
    orientation?: Orientation | undefined;
    /**
     * @docid
     * @default 10
     * @public
     */
    paddingLeftRight?: number;
    /**
     * @docid
     * @default 10
     * @public
     */
    paddingTopBottom?: number;
    /**
     * @docid
     * @default 0
     * @public
     */
    rowCount?: number;
    /**
     * @docid
     * @default 8
     * @public
     */
    rowItemSpacing?: number;
    /**
     * @docid
     * @public
     */
    title?: {
      /**
       * @docid
       * @default '#232323' &prop(color)
       * @default 18 &prop(size)
       * @default 200 &prop(weight)
       * @default "'Segoe UI Light', 'Helvetica Neue Light', 'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana, sans-serif" &prop(family)
       */
      font?: Font;
      /**
       * @docid
       * @default undefined
       */
      horizontalAlignment?: HorizontalAlignment | undefined;
      /**
       * @docid
       */
      margin?: {
        /**
         * @docid
         * @default 9
         */
        bottom?: number;
        /**
         * @docid
         * @default 0
         */
        left?: number;
        /**
         * @docid
         * @default 0
         */
        right?: number;
        /**
         * @docid
         * @default 0
         */
        top?: number;
      };
      /**
       * @docid
       * @default undefined
       */
      placeholderSize?: number | undefined;
      /**
       * @docid
       */
      subtitle?: {
        /**
         * @docid
         * @default '#232323' &prop(color)
         * @default 14 &prop(size)
         * @default 200 &prop(weight)
         * @default "'Segoe UI Light', 'Helvetica Neue Light', 'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana, sans-serif" &prop(family)
         */
        font?: Font;
        /**
         * @docid
         * @default 0
         */
        offset?: number;
        /**
         * @docid
         * @default null
         */
        text?: string;
      } | string;
      /**
       * @docid
       * @default null
       */
      text?: string;
      /**
       * @docid
       * @default 'top'
       */
      verticalAlignment?: VerticalEdge;
    } | string;
    /**
     * @docid
     * @default 'top'
     * @public
     */
    verticalAlignment?: VerticalEdge;
    /**
     * @docid
     * @default true
     * @public
     */
    visible?: boolean;
}

/**
 * @docid
 * @type object
 * @namespace DevExpress.common.charts
 * @hidden
 */
export interface BaseLegendItem {
    /**
     * @docid
     * @public
     */
    marker?: {
      /**
       * @docid
       */
      fill?: string;
      /**
       * @docid
       */
      opacity?: number;
      /**
       * @docid
       */
      size?: number;
      /**
       * @docid
       */
      state?: LegendMarkerState;
    };
    /**
     * @docid
     * @public
     */
    text?: string;
    /**
     * @docid
     * @public
     */
    visible?: boolean;
}

/**
 * @docid
 * @type object
 * @inherits dxChartSeriesTypes.CommonSeries
 * @hidden
 */
export interface ChartSeries extends dxChartSeriesTypesCommonSeries {
    /**
     * @docid
     * @default undefined
     * @public
     */
    name?: string | undefined;
    /**
     * @docid
     * @default undefined
     * @public
     */
    tag?: any | undefined;
    /**
     * @docid
     * @default 'line'
     * @type Enums.SeriesType
     * @public
     */
    type?: CommonSeriesType;
}
