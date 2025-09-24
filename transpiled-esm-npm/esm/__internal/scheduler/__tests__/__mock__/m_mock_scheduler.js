import { jest } from '@jest/globals';
import { logger } from '../../../core/utils/m_console';
import DOMComponent from '../../../core/widget/dom_component';
import SchedulerWorkSpace from '../../workspaces/m_work_space';
export const DEFAULT_CELL_WIDTH = 250;
export const DEFAULT_CELL_HEIGHT = 80;
export const DEFAULT_TIMELINE_CELL_HEIGHT = 450;
export const setupSchedulerTestEnvironment = function () {
  let {
    width = DEFAULT_CELL_WIDTH,
    height = DEFAULT_CELL_HEIGHT
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  jest.spyOn(logger, 'warn').mockImplementation(() => {});
  DOMComponent.prototype._isVisible = jest.fn(() => true);
  SchedulerWorkSpace.prototype._createCrossScrollingConfig = () => ({
    direction: 'both',
    onScroll: jest.fn(),
    onEnd: jest.fn()
  });
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    width,
    height,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    x: 0,
    y: 0,
    toJSON: () => {}
  }));
};