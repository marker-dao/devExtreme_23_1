/**
* DevExtreme (common/ai-integration.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @namespace DevExpress.aiIntegration
 * @public
 */
export type Prompt = {
  /**
   * @docid
   * @public
   */
  system?: string;
  /**
   * @docid
   * @public
   */
  user?: string;
};

/**
 * @docid
 * @namespace DevExpress.aiIntegration
 * @public
 */
export type RequestParams = {
  /**
   * @docid
   * @public
   */
  prompt: Prompt;
};

/**
 * @docid
 * @namespace DevExpress.aiIntegration
 * @public
 */
export type Response = {
  /**
   * @docid
   * @public
   */
  promise: Promise<string>;
  /**
   * @docid
   * @public
   */
  abort: () => void;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type ChangeStyleCommandParams = {
  text: string;
  writingStyle: string;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type ChangeToneCommandParams = {
  text: string;
  tone: string;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type ExecuteCommandParams = {
  text: string;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type ExpandCommandParams = {
  text: string;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type ProofreadCommandParams = {
  text: string;
};

/**
* @namespace DevExpress.aiIntegration
*/
export type ShortenCommandParams = {
 text: string;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type SummarizeCommandParams = {
  text: string;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type TranslateCommandParams = {
  text: string;
  lang: string;
};

/**
 * @namespace DevExpress.aiIntegration
 */
export type ChangeStyleCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type ChangeToneCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type ExecuteCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type ExpandCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type ProofreadCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type ShortenCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type SummarizeCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type TranslateCommandResult = string;

/**
 * @namespace DevExpress.aiIntegration
 */
export type RequestCallbacks<T> = {
  onChunk?: (chunk: string) => void;
  onComplete?: (finalResponse: T) => void;
  onError?: (error: Error) => void;
};

/**
 * @docid
 * @namespace DevExpress.aiIntegration
 * @public
 */
export type AIProvider = {
  /**
   * @docid
   * @public
   */
  sendRequest: (params: RequestParams) => Response;
};

/**
 * @docid
 * @namespace DevExpress.aiIntegration
 * @public
 */
export class AIIntegration {
  /**
   * @docid
   * @param provider
   */
  constructor(provider: AIProvider);
  /**
   * @publicName changeStyle(params, callbacks)
   */
  changeStyle(params: ChangeStyleCommandParams, callbacks: RequestCallbacks<ChangeStyleCommandResult>): () => void;
  /**
   * @publicName changeTone(params, callbacks)
   */
  changeTone(params: ChangeToneCommandParams, callbacks: RequestCallbacks<ChangeToneCommandResult>): () => void;
  /**
   * @publicName execute(params, callbacks)
   */
  execute(params: ExecuteCommandParams, callbacks: RequestCallbacks<ExecuteCommandResult>): () => void;
  /**
   * @publicName expand(params, callbacks)
   */
  expand(params: ExpandCommandParams, callbacks: RequestCallbacks<ExpandCommandResult>): () => void;
  /**
   * @publicName proofread(params, callbacks)
   */
  proofread(params: ProofreadCommandParams, callbacks: RequestCallbacks<ProofreadCommandResult>): () => void;
  /**
   * @publicName shorten(params, callbacks)
   */
  shorten(params: ShortenCommandParams, callbacks: RequestCallbacks<ShortenCommandResult>): () => void;
  /**
   * @publicName summarize(params, callbacks)
   */
  summarize(params: SummarizeCommandParams, callbacks: RequestCallbacks<SummarizeCommandResult>): () => void;
  /**
   * @publicName translate(params, callbacks)
   */
  translate(params: TranslateCommandParams, callbacks: RequestCallbacks<TranslateCommandResult>): () => void;
}
