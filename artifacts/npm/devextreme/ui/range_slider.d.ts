/**
* DevExtreme (ui/range_slider.d.ts)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import {
    ValueChangedInfo,
} from './editor/editor';

import {
    dxSliderBaseOptions,
} from './slider';

import dxTrackBar from './track_bar';

/** @public */
export type ContentReadyEvent = EventInfo<dxRangeSlider>;

/** @public */
export type DisposingEvent = EventInfo<dxRangeSlider>;

/** @public */
export type InitializedEvent = InitializedEventInfo<dxRangeSlider>;

/** @public */
export type OptionChangedEvent = EventInfo<dxRangeSlider> & ChangedOptionInfo;

/**
 * @docid _ui_range_slider_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo, ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxRangeSlider, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | UIEvent | Event> & ValueChangedInfo & {
    readonly start?: number;
    readonly end?: number;
    readonly value?: Array<number>;
};

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxRangeSliderOptions extends dxSliderBaseOptions<dxRangeSlider> {
    /**
     * @docid
     * @default 60
     * @public
     */
    end?: number;
    /**
     * @docid
     * @default ""
     * @public
     */
    endName?: string;
    /**
     * @docid
     * @type_function_param1 e:{ui/range_slider:ValueChangedEvent}
     * @action
     * @default null
     * @public
     */
    onValueChanged?: ((e: ValueChangedEvent) => void);
    /**
     * @docid
     * @default 40
     * @public
     */
    start?: number;
    /**
     * @docid
     * @default ""
     * @public
     */
    startName?: string;
    /**
     * @docid
     * @default [40, 60]
     * @public
     */
    value?: Array<number>;
}
/**
 * @docid
 * @isEditor
 * @inherits dxSliderBase
 * @namespace DevExpress.ui
 * @public
 */
export default class dxRangeSlider extends dxTrackBar<dxRangeSliderOptions> { }

/** @public */
export type Properties = dxRangeSliderOptions;

/** @deprecated use Properties instead */
export type Options = dxRangeSliderOptions;


