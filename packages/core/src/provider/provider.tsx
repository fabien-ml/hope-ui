import { ColorModeProvider, ColorModeProviderProps } from "../color-mode";

export type HopeAppProps = ColorModeProviderProps;

/** Root of a Hope UI application. */
export function HopeProvider(props: HopeAppProps) {
  return (
    <ColorModeProvider initialColorMode={props.initialColorMode}>
      {props.children}
    </ColorModeProvider>
  );
}
