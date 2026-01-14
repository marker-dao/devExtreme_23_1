/**
* DevExtreme (core/templates/template.d.ts)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type {
    template,
} from '../../common';

/**
 * @docid
 * @type object
 */
export interface dxTemplateOptions {
    /**
     * @docid
     * @public
     */
    name?: string;
}
/**
 * @docid
 * @section uiWidgetMarkupComponents
 * @type object
 * @public
 * @options dxTemplateOptions
 */
export type dxTemplate = Template;

 // eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Template {
    constructor(options?: dxTemplateOptions);
}
