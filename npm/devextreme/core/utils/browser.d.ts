/**
* DevExtreme (core/utils/browser.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type BrowserInfo = {
    webkit?: boolean;
    chrome?: boolean;
    mozilla?: boolean;
    safari?: boolean;
    unknown?: boolean;
    version?: string;
};

declare const browser: BrowserInfo;
export default browser;
