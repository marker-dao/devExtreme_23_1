/**
* DevExtreme (ui/draggable.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DOMComponent, {
    DOMComponentOptions,
} from '../core/dom_component';

import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
    DragDirection,
} from '../common';

import {
    Cancelable,
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import dxSortable from './sortable';

/**
 * @namespace DevExpress.ui
 * @docid
 * @type object
 */
export interface DraggableBaseOptions<TComponent> extends DOMComponentOptions<TComponent> {
    /**
     * @docid
     * @default true
     * @public
     */
    autoScroll?: boolean;
    /**
     * @docid
     * @default undefined
     * @public
     */
    boundary?: string | UserDefinedElement | undefined;
    /**
     * @docid
     * @default undefined
     * @public
     */
    container?: string | UserDefinedElement | undefined;
    /**
     * @docid
     * @public
     */
    cursorOffset?: string | {
      /**
       * @docid
       * @default 0
       */
      x?: number;
      /**
       * @docid
       * @default 0
       */
      y?: number;
    };
    /**
     * @docid
     * @default undefined
     * @public
     */
    data?: any | undefined;
    /**
     * @docid
     * @default "both"
     * @public
     */
    dragDirection?: DragDirection;
    /**
     * @docid
     * @default undefined
     * @public
     */
    group?: string | undefined;
    /**
     * @docid
     * @default ""
     * @public
     */
    handle?: string;
    /**
     * @docid
     * @default 60
     * @public
     */
    scrollSensitivity?: number;
    /**
     * @docid
     * @default 30
     * @public
     */
    scrollSpeed?: number;
}
/**
 * @docid
 * @inherits DOMComponent
 * @hidden
 * @namespace DevExpress.ui
 * @options DraggableBaseOptions
 */

export interface DraggableBase { }

/**
 * @docid _ui_draggable_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxDraggable>;

/**
 * @docid _ui_draggable_DragEndEvent
 * @public
 * @type object
 * @inherits Cancelable,NativeEventInfo
 */
export type DragEndEvent = Cancelable & NativeEventInfo<dxDraggable, PointerEvent | MouseEvent | TouchEvent> & {
    /** @docid _ui_draggable_DragEndEvent.itemData */
    readonly itemData?: any;
    /** @docid _ui_draggable_DragEndEvent.itemElement */
    readonly itemElement?: DxElement;
    /** @docid _ui_draggable_DragEndEvent.fromComponent */
    readonly fromComponent: dxSortable | dxDraggable;
    /** @docid _ui_draggable_DragEndEvent.toComponent */
    readonly toComponent: dxSortable | dxDraggable;
    /** @docid _ui_draggable_DragEndEvent.fromData */
    readonly fromData?: any;
    /** @docid _ui_draggable_DragEndEvent.toData */
    readonly toData?: any;
};

/**
 * @docid _ui_draggable_DragMoveEvent
 * @public
 * @type object
 * @inherits Cancelable,NativeEventInfo
 */
export type DragMoveEvent = Cancelable & NativeEventInfo<dxDraggable, PointerEvent | MouseEvent | TouchEvent> & {
    /** @docid _ui_draggable_DragMoveEvent.itemData */
    readonly itemData?: any;
    /** @docid _ui_draggable_DragMoveEvent.itemElement */
    readonly itemElement?: DxElement;
    /** @docid _ui_draggable_DragMoveEvent.fromComponent */
    readonly fromComponent: dxSortable | dxDraggable;
    /** @docid _ui_draggable_DragMoveEvent.toComponent */
    readonly toComponent: dxSortable | dxDraggable;
    /** @docid _ui_draggable_DragMoveEvent.fromData */
    readonly fromData?: any;
    /** @docid _ui_draggable_DragMoveEvent.toData */
    readonly toData?: any;
};

/**
 * @docid _ui_draggable_DragStartEvent
 * @public
 * @type object
 * @inherits Cancelable,NativeEventInfo
 */
export type DragStartEvent = Cancelable & NativeEventInfo<dxDraggable, PointerEvent | MouseEvent | TouchEvent> & {
    /** @docid _ui_draggable_DragStartEvent.itemData */
    itemData?: any;
    /** @docid _ui_draggable_DragStartEvent.itemElement */
    readonly itemElement?: DxElement;
    /** @docid _ui_draggable_DragStartEvent.fromData */
    readonly fromData?: any;
};

/**
 * @docid _ui_draggable_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxDraggable>;

/**
 * @docid _ui_draggable_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxDraggable> & ChangedOptionInfo;

/** @public */
export type DragTemplateData = {
    readonly itemData?: any;
    readonly itemElement: DxElement;
};

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxDraggableOptions extends DraggableBaseOptions<dxDraggable> {
    /**
     * @docid
     * @default false
     * @public
     */
    clone?: boolean;
    /**
     * @docid
     * @type_function_param1 dragInfo:object
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @public
     */
    dragTemplate?: template | ((dragInfo: DragTemplateData, containerElement: DxElement) => string | UserDefinedElement) | undefined;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/draggable:DragEndEvent}
     * @action
     * @public
     */
    onDragEnd?: ((e: DragEndEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/draggable:DragMoveEvent}
     * @action
     * @public
     */
    onDragMove?: ((e: DragMoveEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/draggable:DragStartEvent}
     * @action
     * @public
     */
    onDragStart?: ((e: DragStartEvent) => void);
}
/**
 * @docid
 * @inherits DraggableBase
 * @hasTranscludedContent
 * @namespace DevExpress.ui
 * @public
 */
export default class dxDraggable extends DOMComponent<dxDraggableOptions> implements DraggableBase { }

/** @public */
export type Properties = dxDraggableOptions;

/** @deprecated use Properties instead */
export type Options = dxDraggableOptions;


