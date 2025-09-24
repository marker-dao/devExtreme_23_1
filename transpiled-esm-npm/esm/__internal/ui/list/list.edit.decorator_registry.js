export const registry = {};
export function register(option, type, decoratorClass) {
  if (!registry[option]) {
    registry[option] = {};
  }
  registry[option][type] = decoratorClass;
}