/**
* DevExtreme (ui/speech_to_text.d.ts)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
  EventInfo,
  NativeEventInfo,
  InitializedEventInfo,
  ChangedOptionInfo,
} from '../common/core/events';

import Widget, { WidgetOptions } from './widget/ui.widget';
import type { ButtonStyle, ButtonType } from './button';

/**
 * @docid
 * @namespace DevExpress.ui.dxSpeechToText
 * @public
 */
export type SpeechRecognitionConfig = {
  /**
   * @docid
   * @public
   */
  continuous?: boolean;

  /**
   * @docid
   * @public
   */
  grammars?: string[];

  /**
   * @docid
   * @public
   */
  interimResults?: boolean;

  /**
   * @docid
   * @public
   */
  lang?: string;

  /**
   * @docid
   * @public
   */
  maxAlternatives?: number;
};

/**
 * @docid
 * @namespace DevExpress.ui.dxSpeechToText
 * @public
 */
export type CustomSpeechRecognizer = {
  /**
   * @docid
   * @default false
   * @public
   */
  enabled?: boolean;

  /**
   * @docid
   * @default false
   * @public
   */
  isListening?: boolean;
};

/**
 * @docid _ui_speech_to_text_StartClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type StartClickEvent = NativeEventInfo<dxSpeechToText, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent>;

/**
 * @docid _ui_speech_to_text_StopClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type StopClickEvent = NativeEventInfo<dxSpeechToText, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent>;

/**
 * @docid _ui_speech_to_text_ResultEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ResultEvent = EventInfo<dxSpeechToText> & { event: Event };

/**
 * @docid _ui_speech_to_text_ErrorEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ErrorEvent = EventInfo<dxSpeechToText> & { event: Event };

/**
 * @docid _ui_speech_to_text_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxSpeechToText>;

/**
 * @docid _ui_speech_to_text_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxSpeechToText>;

/**
 * @docid _ui_speech_to_text_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxSpeechToText>;

/**
 * @docid _ui_speech_to_text_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxSpeechToText> & ChangedOptionInfo;

/**
 * @public
 * @docid dxSpeechToTextOptions
 * @type object
 */
export interface Properties extends WidgetOptions<dxSpeechToText> {
  /**
   * @docid dxSpeechToTextOptions.customSpeechRecognizer
   * @public
   */
  customSpeechRecognizer?: CustomSpeechRecognizer;

  /**
   * @docid dxSpeechToTextOptions.startText
   * @default ""
   * @public
   */
  startText?: string;

  /**
   * @docid dxSpeechToTextOptions.stopText
   * @default ""
   * @public
   */
  stopText?: string;

  /**
   * @docid dxSpeechToTextOptions.stylingMode
   * @default 'contained'
   * @public
   */
  stylingMode?: ButtonStyle;

  /**
   * @docid dxSpeechToTextOptions.startIcon
   * @default 'micoutline'
   * @public
   */
  startIcon?: string;

  /**
   * @docid dxSpeechToTextOptions.stopIcon
   * @default 'stopfilled'
   * @public
   */
  stopIcon?: string;

  /**
   * @docid dxSpeechToTextOptions.type
   * @default 'normal'
   * @public
   */
  type?: ButtonType | string;

  /**
   * @docid dxSpeechToTextOptions.speechRecognitionConfig
   * @public
   */
  speechRecognitionConfig?: SpeechRecognitionConfig | { [key: string]: any };

  /**
   * @docid dxSpeechToTextOptions.onStartClick
   * @default undefined
   * @type_function_param1 e:{ui/speech_to_text:StartClickEvent}
   * @action
   * @public
   */
  onStartClick?: ((e: StartClickEvent) => void) | undefined;

  /**
   * @docid dxSpeechToTextOptions.onStopClick
   * @default undefined
   * @type_function_param1 e:{ui/speech_to_text:StopClickEvent}
   * @action
   * @public
   */
  onStopClick?: ((e: StopClickEvent) => void) | undefined;

  /**
   * @docid dxSpeechToTextOptions.onResult
   * @default undefined
   * @type_function_param1 e:{ui/speech_to_text:ResultEvent}
   * @action
   * @public
   */
  onResult?: ((e: ResultEvent) => void) | undefined;

  /**
   * @docid dxSpeechToTextOptions.onError
   * @default undefined
   * @type_function_param1 e:{ui/speech_to_text:ErrorEvent}
   * @action
   * @public
   */
  onError?: ((e: ErrorEvent) => void) | undefined;
}

/**
 * @docid
 * @inherits Widget
 * @namespace DevExpress.ui
 * @options Properties
 * @public
 */
export default class dxSpeechToText extends Widget<Properties> { }

/** @public */
export type ExplicitTypes = {
  Properties: Properties;
  ContentReadyEvent: ContentReadyEvent;
  DisposingEvent: DisposingEvent;
  InitializedEvent: InitializedEvent;
  OptionChangedEvent: OptionChangedEvent;
  StartClickEvent: StartClickEvent;
  StopClickEvent: StopClickEvent;
  ResultEvent: ResultEvent;
  ErrorEvent: ErrorEvent;
};


