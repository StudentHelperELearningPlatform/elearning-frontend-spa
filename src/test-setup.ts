// Define robust mock for Storage if missing in testing environment
if (typeof Storage === 'undefined') {
  class StorageMock {
    readonly length = 0;
    getItem() { return null; }
    setItem() {
      // Empty mock method
    }
    removeItem() {
      // Empty mock method
    }
    clear() {
      // Empty mock method
    }
  }
  Object.defineProperty(globalThis, 'Storage', { value: StorageMock });
}

if (typeof Storage !== 'undefined') {
  const storeMap = new WeakMap<object, Record<string, string>>();
  
  const getStore = (ctx: object): Record<string, string> => {
    let s = storeMap.get(ctx);
    if (!s) {
      s = {};
      storeMap.set(ctx, s);
    }
    return s;
  };

  Storage.prototype.getItem = function (key: string) {
    const s = getStore(this);
    return s[key] !== undefined ? s[key] : null;
  };

  Storage.prototype.setItem = function (key: string, value: string) {
    const s = getStore(this);
    s[key] = String(value);
  };

  Storage.prototype.removeItem = function (key: string) {
    const s = getStore(this);
    delete s[key];
  };

  Storage.prototype.clear = function () {
    const s = getStore(this);
    Object.keys(s).forEach((k) => delete s[k]);
  };

  Object.defineProperty(Storage.prototype, 'length', {
    get: function () {
      return Object.keys(getStore(this)).length;
    },
    configurable: true,
  });
}

if (typeof window !== 'undefined') {
  const localStore = Object.create(Storage.prototype);
  Object.defineProperty(window, 'localStorage', {
    value: localStore,
    writable: true,
    configurable: true,
  });
  
  const sessionStore = Object.create(Storage.prototype);
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStore,
    writable: true,
    configurable: true,
  });
}

if (typeof globalThis !== 'undefined') {
  if (typeof window !== 'undefined') {
    Object.defineProperty(globalThis, 'localStorage', {
      value: window.localStorage,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: window.sessionStorage,
      writable: true,
      configurable: true,
    });
  }
}

import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
