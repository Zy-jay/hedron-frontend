import { ReactNode } from "react";
import { DefaultTheme } from "styled-components";

export type State<T> = {
  [key: string]: T;
};

export type BreakpointChecks = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} & State<boolean>;

export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  nav: string;
};
export type MediaQueriesAbstract = State<string>;

export type Spacing = number[];

export type ColorShades = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type Colors = {
  primary: {
    button: string;
    error: string;
    blue: string;
  };
  typography: ColorShades & {
    110: string;
    220: string;
    330: string;
    440: string;
    550: string;
    660: string;
    770: string;
    880: string;
    990: string;
  } & {
    body: string;
    title: string;
  };
  background: {
    main: string;
    menu: string;
    card: string;
    darkCard: string;
    input: string;
  };
};

export interface FontWeight {
  Thin: number;
  ExtraLight: number;
  Light: number;
  Regular: number;
  Medium: number;
  SemiBold: number;
  Bold: number;
}

export type Display = "block" | "inline-block" | "flex" | "grid" | "none";

export type Position = "absolute" | "relative" | "static" | "sticky" | "fixed";

export type ZIndices = {
  dropdown: number;
  modal: number;
};

export interface CustomThemeProviderProps {
  theme?: DefaultTheme;
  children: ReactNode;
}
