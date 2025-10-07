/**
* DevExtreme (ui/drop_down_editor/ui.drop_down_editor.d.ts)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement,
} from '../../core/element';

import {
    template,
    ApplyValueMode,
    Mode,
    Position,
    TextEditorButton,
} from '../../common';

import dxTextBox, {
    dxTextBoxOptions,
} from '../text_box';

import {
    Properties as PopoverProperties,
} from '../popover';

import {
    Properties as PopupProperties,
} from '../popup';

import {
    EventInfo,
} from '../../common/core/events';

import { EditorOptionsWithValue } from '../editor/editor';

/** @public */
export type DropDownPredefinedButton = 'clear' | 'dropDown';

export interface DropDownButtonTemplateDataModel {
    readonly text?: string;
    readonly icon?: string;
}

/**
 * @namespace DevExpress.ui
 * @docid
 */
export type FieldAddons = {
    /**
     * @docid
     * @type_function_param1 data:object
     * @type_function_return string|Element|jQuery
     */
    beforeTemplate?: template | ((data: any, element: DxElement) => string | UserDefinedElement);
    /**
     * @docid
     * @type_function_param1 data:object
     * @type_function_return string|Element|jQuery
     */
    afterTemplate?: template | ((data: any, element: DxElement) => string | UserDefinedElement);
};

/**
 * @namespace DevExpress.ui
 * @docid
 * @hidden
 */
export interface dxDropDownEditorOptions<TComponent> extends Omit<dxTextBoxOptions<TComponent>, 'validationMessagePosition'> {
    /**
     * @docid
     * @default true
     * @public
     */
    acceptCustomValue?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    activeStateEnabled?: boolean;
    /**
     * @docid
     * @default "instantly"
     * @public
     */
    applyValueMode?: ApplyValueMode;
    /**
     * @docid
     * @default {}
     * @public
     * @type dxPopupOptions | dxPopoverOptions
     */
    dropDownOptions?: PopupProperties | PopoverProperties;
    /**
     * @docid
     * @default undefined
     * @public
     */
    buttons?: Array<DropDownPredefinedButton | TextEditorButton>;
    /**
     * @docid
     * @default true
     * @public
     */
    deferRendering?: boolean;
    /**
     * @docid
     * @default "dropDownButton"
     * @type_function_param1 buttonData:object
     * @type_function_return string|Element|jQuery
     * @public
     */
    dropDownButtonTemplate?: template | ((buttonData: DropDownButtonTemplateDataModel, contentElement: DxElement) => string | UserDefinedElement);
    /**
     * @docid
     * @default null
     * @public
     */
    fieldAddons?: FieldAddons;
    /**
     * @docid
     * @default null
     * @action
     * @public
     */
    onClosed?: ((e: EventInfo<TComponent>) => void);
    /**
     * @docid
     * @default null
     * @action
     * @public
     */
    onOpened?: ((e: EventInfo<TComponent>) => void);
    /**
     * @docid
     * @default false
     * @public
     */
    openOnFieldClick?: boolean;
    /**
     * @docid
     * @default false
     * @fires dxDropDownEditorOptions.onOpened
     * @fires dxDropDownEditorOptions.onClosed
     * @public
     */
    opened?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    showDropDownButton?: boolean;
    /**
     * @docid
     * @default 'auto'
     * @public
     */
    validationMessagePosition?: Position | Mode;
    /**
     * @docid
     * @default null
     * @public
     */
    value?: any;
}
/**
 * @docid
 * @inherits dxTextBox
 * @hidden
 * @namespace DevExpress.ui
 * @options dxDropDownEditorOptions
 */
export default class dxDropDownEditor<
    TProperties extends EditorOptionsWithValue = Properties,
> extends dxTextBox<TProperties> {
    /**
     * @docid
     * @publicName close()
     * @public
     */
    close(): void;
    /**
     * @docid
     * @publicName content()
     * @public
     */
    content(): DxElement;
    /**
     * @docid
     * @publicName field()
     * @public
     */
    field(): DxElement;
    /**
     * @docid
     * @publicName open()
     * @public
     */
    open(): void;
    /**
     * @docid
     * @publicName reset(value)
     * @public
     * @param1 value:any
     */
    reset(value?: TProperties['value']): void;
}

interface DropDownEditorInstance extends dxDropDownEditor<Properties> { }
type Properties = dxDropDownEditorOptions<DropDownEditorInstance>;
export type Options = Properties;
