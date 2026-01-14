/**
* DevExtreme (esm/__internal/core/utils/m_locker.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../core/errors';
const Locker = function () {
  const info = {};
  const currentCount = function (lockName) {
    return info[lockName] || 0;
  };
  return {
    obtain(lockName) {
      info[lockName] = currentCount(lockName) + 1;
    },
    release(lockName) {
      const count = currentCount(lockName);
      if (count < 1) {
        throw errors.Error('E0014');
      }
      if (count === 1) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete info[lockName];
      } else {
        info[lockName] = count - 1;
      }
    },
    locked(lockName) {
      return currentCount(lockName) > 0;
    }
  };
};
export { Locker };
