/**
* DevExtreme (core/utils/window.d.ts)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export declare function getWindow(): Window;
export declare function hasWindow(): boolean;
export declare function getNavigator(): Navigator;
export declare function hasProperty(property: string): boolean;
export declare function setWindow(
  newWindowObject: Window | Record<string, unknown>,

  hasWindow?: boolean
): void;
