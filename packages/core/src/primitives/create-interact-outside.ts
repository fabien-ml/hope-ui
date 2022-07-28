import { access, MaybeAccessor } from "@solid-primitives/utils";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

interface CreateInteractOutsideProps {
  /** Whether interact outside events should be disabled. */
  isDisabled?: MaybeAccessor<boolean | undefined>;

  /** Handler that is called when an interaction outside the `ref` element start. */
  onInteractOutsideStart?: (e: Event) => void;

  /** Handler that is called when interaction outside the `ref` element end. */
  onInteractOutside?: (e: Event) => void;
}

/**
 * Handles interaction outside a given element.
 * Used in components like Dialogs and Popovers, so they can close when a user clicks outside them.
 * @param props - Props for the interact outside primitive.
 * @param ref - A ref for the HTML element.
 */
export function createInteractOutside(
  props: CreateInteractOutsideProps,
  ref: Accessor<Element | undefined>
) {
  const [isPointerDown, setIsPointerDown] = createSignal(false);

  createEffect(() => {
    if (access(props.isDisabled)) {
      return;
    }

    const onPointerDown = (e: PointerEvent) => {
      if (isInteractOutsideEvent(e, ref())) {
        props.onInteractOutsideStart?.(e);
        setIsPointerDown(true);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isPointerDown() && isInteractOutsideEvent(e, ref())) {
        setIsPointerDown(false);
        props.onInteractOutside?.(e);
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerup", onPointerUp, true);

    onCleanup(() => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerup", onPointerUp, true);
    });
  });
}

/**
 * Returns whether the event is a valid interact outside event
 * (e.g. the event target is outside the `ref` element).
 */
function isInteractOutsideEvent(event: any, ref: Element | undefined) {
  if (event.button > 0) {
    return false;
  }

  // if the event target is no longer in the document
  if (event.target) {
    const ownerDocument = event.target.ownerDocument;

    if (!ownerDocument || !ownerDocument.documentElement.contains(event.target)) {
      return false;
    }
  }

  if (!ref) {
    return false;
  }

  return !ref.contains(event.target);
}
