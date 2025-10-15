/**
* DevExtreme (ui/themes_callback.d.ts)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export interface ThemeReadyCallback {
  add(fn?: Function): ThemeReadyCallback;
}

// eslint-disable-next-line @typescript-eslint/init-declarations
export const themeReadyCallback: ThemeReadyCallback;
