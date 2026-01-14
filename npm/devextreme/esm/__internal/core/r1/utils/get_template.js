/**
* DevExtreme (esm/__internal/core/r1/utils/get_template.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode, normalizeProps } from 'inferno';
// NOTE: React vs Inferno type conflict here
export const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, Object.assign({}, props))) : TemplateProp);
