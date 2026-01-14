/**
* DevExtreme (esm/__internal/grids/new/grid_core/inferno_wrappers/utils.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Wraps inferno's ref into jquery object
 *
 * @remarks
 * Be careful using this as wrapper does not cover all dxElementWrapper functionality.
 * Careful testing will be needed after using this utility.
 */
export function wrapRef(ref) {
  return {
    // @ts-expect-error
    dxRenderer: true,
    get 0() {
      return ref.current;
    },
    get() {
      return ref.current;
    },
    length: 1
  };
}
