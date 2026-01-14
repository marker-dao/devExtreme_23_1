import { createComponentVNode, normalizeProps } from 'inferno';
// NOTE: React vs Inferno type conflict here
export const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, Object.assign({}, props))) : TemplateProp);