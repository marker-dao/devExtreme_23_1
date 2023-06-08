/**
* DevExtreme (ui/recurrence_editor.d.ts)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions, ValueChangedInfo,
} from './editor/editor';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    NativeEventInfo,
} from '../events/index';

/** @public */
export type ContentReadyEvent = EventInfo<dxRecurrenceEditor>;

/** @public */
export type DisposingEvent = EventInfo<dxRecurrenceEditor>;

/** @public */
export type InitializedEvent = InitializedEventInfo<dxRecurrenceEditor>;

/** @public */
export type OptionChangedEvent = EventInfo<dxRecurrenceEditor> & ChangedOptionInfo;

/** @public */
export type ValueChangedEvent = NativeEventInfo<dxRecurrenceEditor, Event> & ValueChangedInfo;

/**
 * @namespace DevExpress.ui
 * @docid
 * @type object
 */
export interface dxRecurrenceEditorOptions extends EditorOptions<dxRecurrenceEditor> {
    /**
     * @docid
     * @default null
     * @fires dxRecurrenceEditorOptions.onValueChanged
     * @public
     */
    value?: string;
}
/**
 * @docid
 * @isEditor
 * @inherits Editor
 * @namespace DevExpress.ui
 * @public
 */
export default class dxRecurrenceEditor extends Editor<dxRecurrenceEditorOptions> { }

export type Properties = dxRecurrenceEditorOptions;

/** @deprecated use Properties instead */
export type Options = dxRecurrenceEditorOptions;


