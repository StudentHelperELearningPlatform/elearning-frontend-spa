// Define robust mock for Storage if missing in testing environment
if (typeof Storage === 'undefined') {
  class StorageMock {
    readonly length = 0;

    getItem(): string | null {
      return null;
    }

    setItem(): void {
      // Empty mock method
    }

    removeItem(): void {
      // Empty mock method
    }

    clear(): void {
      // Empty mock method
    }
  }

  Object.defineProperty(globalThis, 'Storage', {
    value: StorageMock,
    configurable: true,
  });
}

if (typeof Storage !== 'undefined') {
  const storeMap = new WeakMap<object, Record<string, string>>();

  const getStore = (ctx: object): Record<string, string> => {
    let storage = storeMap.get(ctx);

    if (!storage) {
      storage = {};
      storeMap.set(ctx, storage);
    }

    return storage;
  };

  Storage.prototype.getItem = function (key: string): string | null {
    const storage = getStore(this);

    return storage[key] !== undefined ? storage[key] : null;
  };

  Storage.prototype.setItem = function (key: string, value: string): void {
    const storage = getStore(this);

    storage[key] = String(value);
  };

  Storage.prototype.removeItem = function (key: string): void {
    const storage = getStore(this);

    delete storage[key];
  };

  Storage.prototype.clear = function (): void {
    const storage = getStore(this);

    Object.keys(storage).forEach((key) => {
      delete storage[key];
    });
  };

  Object.defineProperty(Storage.prototype, 'length', {
    get: function (): number {
      return Object.keys(getStore(this)).length;
    },
    configurable: true,
  });
}

if (typeof window !== 'undefined') {
  const localStore = Object.create(Storage.prototype) as Storage;

  Object.defineProperty(window, 'localStorage', {
    value: localStore,
    writable: true,
    configurable: true,
  });

  const sessionStore = Object.create(Storage.prototype) as Storage;

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStore,
    writable: true,
    configurable: true,
  });
}

if (typeof globalThis !== 'undefined' && typeof window !== 'undefined') {
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

import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Note: we intentionally avoid globally overriding TestBed.configureTestingModule
// because wrapping it can interfere with Angular's internal "instantiated" checks
// and cause errors like "Cannot configure the test module when the test module
// has already been instantiated." Tests that need NO_ERRORS_SCHEMA should add
// it explicitly in their TestBed configuration.
