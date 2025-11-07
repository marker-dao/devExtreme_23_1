import $ from '../../../../core/renderer';
import { getImageContainer } from '../../../../core/utils/icon';
import { AI_CHAT_SPARKLE_OUTLINE, CLASSES } from './const';
export const createChatSparkleOutlineIcon = () => getImageContainer(AI_CHAT_SPARKLE_OUTLINE);
export const createAIHeaderContainer = () => $('<div>').addClass(CLASSES.aiColumnHeaderContent);