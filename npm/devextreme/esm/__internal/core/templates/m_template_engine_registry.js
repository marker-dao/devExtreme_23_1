/**
* DevExtreme (esm/__internal/core/templates/m_template_engine_registry.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../core/errors';
import { isString } from '../../../core/utils/type';
const templateEngines = {};
let currentTemplateEngine;
export function registerTemplateEngine(name, templateEngine) {
  templateEngines[name] = templateEngine;
}
export function setTemplateEngine(templateEngine) {
  if (isString(templateEngine)) {
    currentTemplateEngine = templateEngines[templateEngine];
    if (!currentTemplateEngine) {
      throw errors.Error('E0020', templateEngine);
    }
  } else {
    currentTemplateEngine = templateEngine;
  }
}
export function getCurrentTemplateEngine() {
  return currentTemplateEngine;
}
