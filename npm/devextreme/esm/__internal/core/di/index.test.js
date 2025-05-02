/**
* DevExtreme (esm/__internal/core/di/index.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
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
