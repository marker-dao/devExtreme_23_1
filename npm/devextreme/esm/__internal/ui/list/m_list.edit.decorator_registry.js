/**
* DevExtreme (esm/__internal/ui/list/m_list.edit.decorator_registry.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
export const registry = {};
export function register(option, type, decoratorClass) {
  const decoratorsRegistry = registry;
  const decoratorConfig = {};
  decoratorConfig[option] = decoratorsRegistry[option] ? decoratorsRegistry[option] : {};
  decoratorConfig[option][type] = decoratorClass;
  extend(decoratorsRegistry, decoratorConfig);
}
