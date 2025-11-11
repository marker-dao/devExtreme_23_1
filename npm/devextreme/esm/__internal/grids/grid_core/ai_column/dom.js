/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/dom.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import { getImageContainer } from '../../../../core/utils/icon';
import { AI_CHAT_SPARKLE_OUTLINE, CLASSES } from './const';
export const createChatSparkleOutlineIcon = () => getImageContainer(AI_CHAT_SPARKLE_OUTLINE);
export const createAIHeaderContainer = () => $('<div>').addClass(CLASSES.aiColumnHeaderContent);
