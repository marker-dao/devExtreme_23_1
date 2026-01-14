/**
* DevExtreme (esm/__internal/core/templates/m_function_template.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { TemplateBase } from '../../../core/templates/template_base';
import { normalizeTemplateElement } from '../../../core/utils/dom';
export class FunctionTemplate extends TemplateBase {
  constructor(render) {
    super();
    this._render = render;
  }
  // @ts-expect-error need type overload
  _renderCore(options) {
    return normalizeTemplateElement(this._render(options));
  }
}
