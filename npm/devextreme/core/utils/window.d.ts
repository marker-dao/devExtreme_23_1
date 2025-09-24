/**
* DevExtreme (core/utils/window.d.ts)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
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
