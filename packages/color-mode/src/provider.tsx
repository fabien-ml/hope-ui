import { noop } from "@chakra-ui/utils";
import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";

import { ColorModeContext } from "./context";
import { localStorageManager } from "./storage-manager";
import {
  ColorMode,
  ColorModeContextType,
  ColorModeProviderProps,
  ConfigColorMode,
  StorageManager,
} from "./types";
import {
  addColorModeListener,
  getSystemTheme,
  setColorModeClassName,
  setColorModeDataset,
} from "./utils";

function getTheme(manager: StorageManager, fallback?: ColorMode) {
  return manager.type === "cookie" && manager.ssr ? manager.get(fallback) : fallback;
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export function ColorModeProvider(props: ColorModeProviderProps) {
  const colorModeManager = createMemo(() => props.colorModeManager ?? localStorageManager);
  const defaultColorMode = createMemo(() =>
    props.options?.initialColorMode === "dark" ? "dark" : "light"
  );

  const [colorMode, rawSetColorMode] = createSignal(
    getTheme(colorModeManager(), defaultColorMode())
  );

  const [resolvedColorMode, setResolvedColorMode] = createSignal(getTheme(colorModeManager()));

  const resolvedValue = () => {
    return props.options?.initialColorMode === "system" && !colorMode()
      ? resolvedColorMode()
      : colorMode();
  };

  const setColorMode = (value: ConfigColorMode) => {
    const resolved = value === "system" ? getSystemTheme() : value;
    rawSetColorMode(resolved);

    setColorModeClassName(resolved === "dark");
    setColorModeDataset(resolved, props.options?.disableTransitionOnChange);

    colorModeManager().set(resolved);
  };

  onMount(() => {
    if (props.options?.initialColorMode === "system") {
      setResolvedColorMode(getSystemTheme());
    }
  });

  createEffect(
    on(
      [colorModeManager, defaultColorMode, () => props.options?.initialColorMode],
      ([colorModeManager, defaultColorMode, initialColorMode]) => {
        const managerValue = colorModeManager.get();

        if (managerValue) {
          setColorMode(managerValue);
          return;
        }

        if (initialColorMode === "system") {
          setColorMode("system");
          return;
        }

        setColorMode(defaultColorMode);
      }
    )
  );

  const toggleColorMode = () => {
    setColorMode(resolvedValue() === "dark" ? "light" : "dark");
  };

  createEffect(() => {
    if (!props.options?.useSystemColorMode) {
      return;
    }

    const cleanupFn = addColorModeListener(setColorMode);

    onCleanup(cleanupFn);
  });

  // presence of `value` indicates a controlled context
  const context: ColorModeContextType = {
    colorMode: resolvedValue as Accessor<ColorMode>,
    setColorMode,
    toggleColorMode,
  };

  return <ColorModeContext.Provider value={context}>{props.children}</ColorModeContext.Provider>;
}

/** Locks the color mode to `dark`, without any way to change it. */
export const DarkMode = (props: ParentProps) => {
  const context: ColorModeContextType = {
    colorMode: () => "dark",
    toggleColorMode: noop,
    setColorMode: noop,
  };

  return <ColorModeContext.Provider value={context}>{props.children}</ColorModeContext.Provider>;
};

/** Locks the color mode to `light` without any way to change it. */
export const LightMode = (props: ParentProps) => {
  const context: ColorModeContextType = {
    colorMode: () => "light",
    toggleColorMode: noop,
    setColorMode: noop,
  };

  return <ColorModeContext.Provider value={context}>{props.children}</ColorModeContext.Provider>;
};
