/**
 * Return an array of css classes containing the base class
 * and combinations of the base class with BEM modifiers.
 */
export function withBemModifiers(
  baseClass: string,
  modifiers: Array<string | false | null | undefined>
): Array<string> {
  return [baseClass, ...modifiers.filter(Boolean).map(modifier => `${baseClass}--${modifier}`)];
}
