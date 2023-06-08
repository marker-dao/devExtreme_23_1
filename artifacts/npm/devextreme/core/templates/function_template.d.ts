/**
* DevExtreme (core/templates/function_template.d.ts)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DxElement } from '../element';

export class FunctionTemplate {
  render(template: {
    container: unknown;
    model?: object;
    transclude?: boolean;
  }): DxElement;
}
