import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../core/renderer';
import { isPlainObject, isString } from '../../core/utils/type';
import { value as viewPort } from '../../core/utils/view_port';
import { getWindow } from '../../core/utils/window';
import Toast from '../../ui/toast';
const window = getWindow();
let $notify = null;
const $containers = {};
const COORDINATE_ALIASES = {
  'top left': {
    top: 10,
    left: 10
  },
  'top right': {
    top: 10,
    right: 10
  },
  'bottom left': {
    bottom: 10,
    left: 10
  },
  'bottom right': {
    bottom: 10,
    right: 10
  },
  'top center': dimensions => ({
    top: 10,
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  }),
  'left center': dimensions => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    left: 10
  }),
  'right center': dimensions => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    right: 10
  }),
  center: dimensions => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  }),
  'bottom center': dimensions => ({
    bottom: 10,
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  })
};
const POSITION_STYLES_MAP = {
  up: (coordinates, dimensions) => ({
    bottom: coordinates.bottom ?? dimensions.windowHeight - dimensions.toastHeight - (coordinates.top ?? 0),
    top: '',
    left: coordinates.left ?? '',
    right: coordinates.right ?? ''
  }),
  down: (coordinates, dimensions) => ({
    top: coordinates.top ?? dimensions.windowHeight - dimensions.toastHeight - (coordinates.bottom ?? 0),
    bottom: '',
    left: coordinates.left ?? '',
    right: coordinates.right ?? ''
  }),
  left: (coordinates, dimensions) => ({
    right: coordinates.right ?? dimensions.windowWidth - dimensions.toastWidth - (coordinates.left ?? 0),
    left: '',
    top: coordinates.top ?? '',
    bottom: coordinates.bottom ?? ''
  }),
  right: (coordinates, dimensions) => ({
    left: coordinates.left ?? dimensions.windowWidth - dimensions.toastWidth - (coordinates.right ?? 0),
    right: '',
    top: coordinates.top ?? '',
    bottom: coordinates.bottom ?? ''
  })
};
const getDefaultDirection = position => {
  const condition = isString(position) && position.includes('top');
  return condition ? 'down-push' : 'up-push';
};
const createStackContainer = key => {
  const $container = $('<div>').appendTo(viewPort());
  $containers[key] = $container;
  return $container;
};
const getStackContainer = key => {
  const $container = $containers[key];
  return $container || createStackContainer(key);
};
const setContainerClasses = (container, direction) => {
  const containerClasses = `dx-toast-stack dx-toast-stack-${direction}-direction`;
  container.removeAttr('class').addClass(containerClasses);
};
const getNotifyCoordinatesByAlias = (alias, dimensions) => {
  const coordinate = alias ? COORDINATE_ALIASES[alias] : COORDINATE_ALIASES['bottom center'];
  return typeof coordinate === 'function' ? coordinate(dimensions) : coordinate;
};
const getPositionStylesByNotifyCoordinates = (direction, coordinates, dimensions) => {
  const directionKey = direction.replace(/-push|-stack/g, '');
  const styleFunction = POSITION_STYLES_MAP[directionKey];
  return styleFunction ? styleFunction(coordinates, dimensions) : {
    top: '',
    bottom: '',
    left: '',
    right: ''
  };
};
const setContainerStyles = (container, direction, position) => {
  const {
    // @ts-expect-error 'offsetWidth' does not exist on type 'Element'
    offsetWidth: toastWidth,
    // @ts-expect-error 'offsetHeight' does not exist on type 'Element'
    offsetHeight: toastHeight
  } = container.children().first().get(0);
  const dimensions = {
    toastWidth,
    toastHeight,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  };
  const coordinates = isString(position) ? getNotifyCoordinatesByAlias(position, dimensions) : position;
  const styles = getPositionStylesByNotifyCoordinates(direction, coordinates, dimensions);
  container.css(styles);
};
const getToastOptions = (message, typeOrStack, displayTime) => {
  const userOptions = isPlainObject(message) ? message : {
    message
  };
  const stack = isPlainObject(typeOrStack) ? typeOrStack : undefined;
  const type = isPlainObject(typeOrStack) ? undefined : typeOrStack;
  const {
    onHidden: userOnHidden,
    onShowing: userOnShowing
  } = userOptions;
  const defaultConfiguration = {
    onHidden: e => {
      $(e.element).remove();
      userOnHidden === null || userOnHidden === void 0 || userOnHidden(e);
    }
  };
  if (type !== undefined) {
    defaultConfiguration.type = type;
  }
  if (displayTime !== undefined) {
    defaultConfiguration.displayTime = displayTime;
  }
  if (stack !== null && stack !== void 0 && stack.position) {
    const {
      position
    } = stack;
    const direction = stack.direction || getDefaultDirection(position);
    const containerKey = isString(position) ? position : `${position.top}-${position.left}-${position.bottom}-${position.right}`;
    const $container = getStackContainer(containerKey);
    setContainerClasses($container, direction);
    const options = _extends({}, userOptions, defaultConfiguration, {
      container: $container,
      _skipContentPositioning: true,
      onShowing: e => {
        setContainerStyles($container, direction, position);
        userOnShowing === null || userOnShowing === void 0 || userOnShowing(e);
      }
    });
    return options;
  }
  const options = _extends({}, userOptions, defaultConfiguration);
  return options;
};
const notify = (message, typeOrStack, displayTime) => {
  const options = getToastOptions(message, typeOrStack, displayTime);
  $notify = $('<div>').appendTo(viewPort());
  // @ts-expect-error Toast constructor accepts jQuery element
  const toast = new Toast($notify, options);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  toast.show();
};
export default notify;