import { createContext } from '../../../../core/r1/runtime/inferno/index';
export const ConfigContext = createContext({
  rtlEnabled: undefined,
  disabled: undefined,
  templatesRenderAsynchronously: undefined
});