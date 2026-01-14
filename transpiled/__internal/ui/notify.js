"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _view_port = require("../../core/utils/view_port");
var _window = require("../../core/utils/window");
var _toast = _interopRequireDefault(require("../../ui/toast"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
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
  const condition = (0, _type.isString)(position) && position.includes('top');
  return condition ? 'down-push' : 'up-push';
};
const createStackContainer = key => {
  const $container = (0, _renderer.default)('<div>').appendTo((0, _view_port.value)());
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
  const coordinates = (0, _type.isString)(position) ? getNotifyCoordinatesByAlias(position, dimensions) : position;
  const styles = getPositionStylesByNotifyCoordinates(direction, coordinates, dimensions);
  container.css(styles);
};
const getToastOptions = (message, typeOrStack, displayTime) => {
  const userOptions = (0, _type.isPlainObject)(message) ? message : {
    message
  };
  const stack = (0, _type.isPlainObject)(typeOrStack) ? typeOrStack : undefined;
  const type = (0, _type.isPlainObject)(typeOrStack) ? undefined : typeOrStack;
  const {
    onHidden: userOnHidden,
    onShowing: userOnShowing
  } = userOptions;
  const defaultConfiguration = {
    onHidden: e => {
      (0, _renderer.default)(e.element).remove();
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
    const containerKey = (0, _type.isString)(position) ? position : `${position.top}-${position.left}-${position.bottom}-${position.right}`;
    const $container = getStackContainer(containerKey);
    setContainerClasses($container, direction);
    const options = Object.assign({}, userOptions, defaultConfiguration, {
      container: $container,
      _skipContentPositioning: true,
      onShowing: e => {
        setContainerStyles($container, direction, position);
        userOnShowing === null || userOnShowing === void 0 || userOnShowing(e);
      }
    });
    return options;
  }
  const options = Object.assign({}, userOptions, defaultConfiguration);
  return options;
};
const notify = (message, typeOrStack, displayTime) => {
  const options = getToastOptions(message, typeOrStack, displayTime);
  $notify = (0, _renderer.default)('<div>').appendTo((0, _view_port.value)());
  // @ts-expect-error Toast constructor accepts jQuery element
  const toast = new _toast.default($notify, options);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  toast.show();
};
/// #DEBUG
Object.setPrototypeOf(notify, {
  _resetContainers() {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    Object.keys($containers).forEach(key => delete $containers[key]);
  }
});
/// #ENDDEBUG
var _default = exports.default = notify;