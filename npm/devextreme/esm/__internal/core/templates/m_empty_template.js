/**
* DevExtreme (esm/__internal/core/templates/m_empty_template.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { TemplateBase } from '../../../core/templates/template_base';
export class EmptyTemplate extends TemplateBase {
  _renderCore() {
    return $();
  }
}
