/**
 * Allows for extending a set of props (`Source`) by an overriding set of props (`Override`),
 * ensuring that any duplicates are overridden by the overriding set of props.
 */
export type OverrideProps<Source = {}, Override = {}> = Omit<Source, keyof Override> & Override;

/** All SolidJS props that apply css classes. */
export interface ClassProps {
  class?: string;
  classList?: { [key: string]: boolean };
}
