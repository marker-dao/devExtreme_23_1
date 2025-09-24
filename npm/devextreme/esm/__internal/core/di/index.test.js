/**
* DevExtreme (esm/__internal/core/di/index.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import { describe, expect, it } from '@jest/globals';
import { DIContext } from './index';
describe('basic', () => {
  describe('register', () => {
    class MyClass {
      getNumber() {
        return 1;
      }
    }
    MyClass.dependencies = [];
    it('should return registered class', () => {
      const ctx = new DIContext();
      ctx.register(MyClass);
      expect(ctx.get(MyClass)).toBeInstanceOf(MyClass);
      expect(ctx.get(MyClass).getNumber()).toBe(1);
    });
    it('should return registered class with tryGet', () => {
      var _ctx$tryGet;
      const ctx = new DIContext();
      ctx.register(MyClass);
      expect(ctx.tryGet(MyClass)).toBeInstanceOf(MyClass);
      expect((_ctx$tryGet = ctx.tryGet(MyClass)) === null || _ctx$tryGet === void 0 ? void 0 : _ctx$tryGet.getNumber()).toBe(1);
    });
    it('should return same instance each time', () => {
      const ctx = new DIContext();
      ctx.register(MyClass);
      expect(ctx.get(MyClass)).toBe(ctx.get(MyClass));
    });
  });
  describe('registerInstance', () => {
    class MyClass {
      getNumber() {
        return 1;
      }
    }
    MyClass.dependencies = [];
    const ctx = new DIContext();
    const instance = new MyClass();
    ctx.registerInstance(MyClass, instance);
    it('should work', () => {
      expect(ctx.get(MyClass)).toBe(instance);
    });
  });
  describe('non registered items', () => {
    const ctx = new DIContext();
    class MyClass {
      getNumber() {
        return 1;
      }
    }
    MyClass.dependencies = [];
    it('should throw', () => {
      expect(() => ctx.get(MyClass)).toThrow();
    });
    it('should not throw if tryGet', () => {
      expect(ctx.tryGet(MyClass)).toBe(null);
    });
  });
});
describe('dependencies', () => {
  class MyUtilityClass {
    getNumber() {
      return 2;
    }
  }
  MyUtilityClass.dependencies = [];
  class MyClass {
    constructor(utility) {
      this.utility = utility;
    }
    getSuperNumber() {
      return this.utility.getNumber() * 2;
    }
  }
  MyClass.dependencies = [MyUtilityClass];
  const ctx = new DIContext();
  ctx.register(MyUtilityClass);
  ctx.register(MyClass);
  it('should return registered class', () => {
    expect(ctx.get(MyClass)).toBeInstanceOf(MyClass);
    expect(ctx.get(MyUtilityClass)).toBeInstanceOf(MyUtilityClass);
  });
  it('dependecies should work', () => {
    expect(ctx.get(MyClass).getSuperNumber()).toBe(4);
  });
});
describe('mocks', () => {
  class MyClass {
    getNumber() {
      return 1;
    }
  }
  MyClass.dependencies = [];
  class MyClassMock {
    getNumber() {
      return 2;
    }
  }
  MyClassMock.dependencies = [];
  const ctx = new DIContext();
  ctx.register(MyClass, MyClassMock);
  it('should return mock class when they are registered', () => {
    expect(ctx.get(MyClass)).toBeInstanceOf(MyClassMock);
    expect(ctx.get(MyClass).getNumber()).toBe(2);
  });
});
it('should work regardless of registration order', () => {
  class MyClass {
    getNumber() {
      return 1;
    }
  }
  MyClass.dependencies = [];
  class MyDependentClass {
    constructor(myClass) {
      this.myClass = myClass;
    }
    getSuperNumber() {
      return this.myClass.getNumber() * 2;
    }
  }
  MyDependentClass.dependencies = [MyClass];
  const ctx = new DIContext();
  ctx.register(MyDependentClass);
  ctx.register(MyClass);
  expect(ctx.get(MyDependentClass).getSuperNumber()).toBe(2);
});
describe('dependency cycle', () => {
  class MyClass1 {
    constructor(myClass2) {
      this.myClass2 = myClass2;
    }
  }
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  MyClass1.dependencies = [MyClass2];
  class MyClass2 {
    constructor(myClass1) {
      this.myClass1 = myClass1;
    }
  }
  MyClass2.dependencies = [MyClass1];
  const ctx = new DIContext();
  ctx.register(MyClass1);
  ctx.register(MyClass2);
  it('should throw', () => {
    expect(() => ctx.get(MyClass1)).toThrow();
    expect(() => ctx.get(MyClass2)).toThrow();
  });
});
describe('decorators', () => {
  class MyClass {
    constructor() {
      this.value = 1;
      this.tag = '';
    }
  }
  MyClass.dependencies = [];
  class AnotherClass {
    constructor() {
      this.counter = 0;
    }
  }
  AnotherClass.dependencies = [];
  it('should apply global decorators to created instances', () => {
    const ctx = new DIContext();
    ctx.register(MyClass);
    ctx.registerDecorator(instance => {
      if (instance instanceof MyClass) {
        instance.value = 2;
      }
      return instance;
    });
    expect(ctx.get(MyClass).value).toBe(2);
  });
  it('should apply global decorators to registered instances', () => {
    const ctx = new DIContext();
    const instance = new MyClass();
    ctx.registerDecorator(obj => {
      if (obj instanceof MyClass) {
        obj.value = 3;
      }
      return obj;
    });
    ctx.registerInstance(MyClass, instance);
    expect(ctx.get(MyClass).value).toBe(3);
    expect(instance.value).toBe(3);
  });
  it('should apply multiple global decorators in the correct order', () => {
    const ctx = new DIContext();
    ctx.register(MyClass);
    ctx.registerDecorator(instance => {
      if (instance instanceof MyClass) {
        instance.value += 1;
        instance.tag += 'A';
      }
      return instance;
    });
    ctx.registerDecorator(instance => {
      if (instance instanceof MyClass) {
        instance.value += 2;
        instance.tag += 'B';
      }
      return instance;
    });
    const result = ctx.get(MyClass);
    expect(result.value).toBe(4);
    expect(result.tag).toBe('AB');
  });
  it('should apply global decorators to instances created from fabrics', () => {
    const ctx = new DIContext();
    class BaseClass {
      constructor() {
        this.value = 1;
      }
    }
    BaseClass.dependencies = [];
    class ExtendedClass extends BaseClass {
      constructor() {
        super(...arguments);
        this.extraValue = 10;
      }
    }
    ExtendedClass.dependencies = [];
    ctx.register(BaseClass, ExtendedClass);
    ctx.registerDecorator(instance => {
      if (instance instanceof ExtendedClass) {
        instance.extraValue = 20;
      }
      return instance;
    });
    const result = ctx.get(BaseClass);
    expect(result).toBeInstanceOf(ExtendedClass);
    expect(result.extraValue).toBe(20);
  });
  it('should prevent adding decorators after instance creation', () => {
    const ctx = new DIContext();
    ctx.register(MyClass);
    ctx.register(AnotherClass);
    const myClassInstance = ctx.get(MyClass);
    expect(() => ctx.registerDecorator(obj => {
      if (obj instanceof MyClass) {
        obj.value = 42;
        obj.tag = 'decorated';
      }
    })).toThrowError();
    expect(myClassInstance.value).toBe(1);
    expect(myClassInstance.tag).toBe('');
  });
});
