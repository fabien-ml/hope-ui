import { children, JSX, Show, splitProps } from "solid-js";

import { useComponentStyleConfigs } from "@/theme/provider";
import { isFunction } from "@/utils/assertion";
import { classNames, createClassSelector } from "@/utils/css";
import { callAllHandlers } from "@/utils/function";

import { hope } from "../factory";
import { ElementType, HTMLHopeProps } from "../types";
import { useSelectContext } from "./select";
import { selectTriggerStyles } from "./select.styles";
import { SelectIcon } from "./select-icon";
import { SelectPlaceholder } from "./select-placeholder";
import { SelectValue } from "./select-value";

interface SelectTriggerRenderProps {
  value?: any;
}

interface SelectTriggerOptions {
  /**
   * The icon of the trigger.
   */
  icon?: JSX.Element;

  /**
   * The children of the trigger.
   */
  children?: JSX.Element | ((props: SelectTriggerRenderProps) => JSX.Element);
}

export type SelectTriggerProps<C extends ElementType = "button"> = HTMLHopeProps<C, SelectTriggerOptions>;

const hopeSelectTriggerClass = "hope-select__trigger";

/**
 * The trigger that toggles the select.
 */
export function SelectTrigger<C extends ElementType = "button">(props: SelectTriggerProps<C>) {
  const theme = useComponentStyleConfigs().Select;

  const selectContext = useSelectContext();

  const [local, others] = splitProps(props as SelectTriggerProps<"button">, ["ref", "class", "children", "icon"]);

  const classes = () => {
    return classNames(
      local.class,
      hopeSelectTriggerClass,
      selectTriggerStyles({
        variant: selectContext.state.variant,
        size: selectContext.state.size,
      })
    );
  };

  const assignButtonRef = (el: HTMLButtonElement) => {
    selectContext.assignButtonRef(el);

    if (isFunction(local.ref)) {
      local.ref(el);
    } else {
      // eslint-disable-next-line solid/reactivity
      local.ref = el;
    }
  };

  const onBlur: JSX.EventHandlerUnion<HTMLButtonElement, FocusEvent> = event => {
    const allHanders = callAllHandlers(selectContext.onButtonBlur, selectContext.formControlProps.onBlur);
    allHanders(event);
  };

  const resolvedChildren = children(() => {
    if (isFunction(local.children)) {
      return local.children({ value: selectContext.state.value });
    }

    return local.children;
  });

  return (
    <hope.button
      ref={assignButtonRef}
      id={selectContext.state.buttonId}
      disabled={selectContext.state.disabled}
      type="button"
      role="combobox"
      tabindex="0"
      aria-haspopup="listbox"
      aria-activedescendant={selectContext.state.activeDescendantId}
      aria-controls={selectContext.state.listboxId}
      aria-expanded={selectContext.state.opened}
      aria-required={selectContext.formControlProps["aria-required"]}
      aria-invalid={selectContext.formControlProps["aria-invalid"]}
      aria-readonly={selectContext.formControlProps["aria-readonly"]}
      aria-describedby={selectContext.formControlProps["aria-describedby"]}
      class={classes()}
      __baseStyle={theme?.baseStyle?.trigger}
      onFocus={selectContext.formControlProps.onFocus}
      onBlur={onBlur}
      onClick={selectContext.onButtonClick}
      onKeyDown={selectContext.onButtonKeyDown}
      {...others}
    >
      <Show when={selectContext.state.hasSelectedOptions} fallback={<SelectPlaceholder />}>
        <Show when={resolvedChildren()} fallback={<SelectValue />}>
          {resolvedChildren()}
        </Show>
      </Show>
      <SelectIcon>{local.icon}</SelectIcon>
    </hope.button>
  );
}

SelectTrigger.toString = () => createClassSelector(hopeSelectTriggerClass);
