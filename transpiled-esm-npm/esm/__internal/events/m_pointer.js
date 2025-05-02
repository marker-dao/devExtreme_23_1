import registerEvent from '../../common/core/events/core/event_registrator';
import MouseStrategy from '../../common/core/events/pointer/mouse';
import MouseAndTouchStrategy from '../../common/core/events/pointer/mouse_and_touch';
import TouchStrategy from '../../common/core/events/pointer/touch';
import GlobalConfig from '../../core/config';
import { each } from '../../core/utils/iterator';
import devices from '../core/m_devices';
import support from '../core/utils/m_support';
const getStrategy = (support, _ref) => {
  let {
    tablet,
    phone
  } = _ref;
  const pointerEventStrategy = getStrategyFromGlobalConfig();
  if (pointerEventStrategy) {
    return pointerEventStrategy;
  }
  if (support.touch && !(tablet || phone)) {
    return MouseAndTouchStrategy;
  }
  if (support.touch) {
    return TouchStrategy;
  }
  return MouseStrategy;
};
const EventStrategy = getStrategy(support, devices.real());
each(EventStrategy.map, (pointerEvent, originalEvents) => {
  registerEvent(pointerEvent, new EventStrategy(pointerEvent, originalEvents));
});
const pointer = {
  down: 'dxpointerdown',
  up: 'dxpointerup',
  move: 'dxpointermove',
  cancel: 'dxpointercancel',
  enter: 'dxpointerenter',
  leave: 'dxpointerleave',
  over: 'dxpointerover',
  out: 'dxpointerout'
};
function getStrategyFromGlobalConfig() {
  const eventStrategyName = GlobalConfig().pointerEventStrategy;
  return {
    'mouse-and-touch': MouseAndTouchStrategy,
    touch: TouchStrategy,
    mouse: MouseStrategy
    // @ts-expect-error
  }[eventStrategyName];
}
export default pointer;