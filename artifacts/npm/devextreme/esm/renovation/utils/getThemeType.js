/**
* DevExtreme (esm/renovation/utils/getThemeType.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isMaterial, isCompact, current } from '../../ui/themes';
var getThemeType = () => {
  var theme = current();
  return {
    isCompact: isCompact(theme),
    isMaterial: isMaterial(theme)
  };
};
export default getThemeType;
