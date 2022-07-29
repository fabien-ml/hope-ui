import { isServer } from "solid-js/web";

import { MaybeColorMode, StorageManager } from "./types";

export const STORAGE_KEY = "hope-ui-color-mode";

export function createLocalStorageManager(key: string): StorageManager {
  return {
    ssr: false,
    type: "localStorage",
    get: (fallbackValue?): MaybeColorMode => {
      if (isServer) {
        return fallbackValue;
      }

      let value: any;
      try {
        value = localStorage.getItem(key) || fallbackValue;
      } catch (e) {
        // noop
      }

      return value || fallbackValue;
    },
    set: value => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        // noop
      }
    },
  };
}

export const localStorageManager = createLocalStorageManager(STORAGE_KEY);

function parseCookie(cookie: string, key: string): MaybeColorMode {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
  return match?.[2] as MaybeColorMode;
}

export function createCookieStorageManager(key: string, cookie?: string): StorageManager {
  return {
    ssr: !!cookie,
    type: "cookie",
    get: (fallbackValue?): MaybeColorMode => {
      if (cookie) {
        return parseCookie(cookie, key);
      }

      if (isServer) {
        return fallbackValue;
      }

      return parseCookie(document.cookie, key) || fallbackValue;
    },
    set: value => {
      document.cookie = `${key}=${value}; max-age=31536000; path=/`;
    },
  };
}

export const cookieStorageManager = createCookieStorageManager(STORAGE_KEY);

export function cookieStorageManagerSSR(cookie: string) {
  return createCookieStorageManager(STORAGE_KEY, cookie);
}
