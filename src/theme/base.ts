import { CONTENT_WIDTH } from "./constants";
import { MediaQueries, Breakpoints, Spacing, FontWeight } from "./types";

export const breakpointMap: { [key: string]: number } = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
};

const breakpoints: Breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`
);

const mediaQueries: MediaQueries = {
  xs: `@media screen and (max-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (max-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (max-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (max-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (max-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (max-width: ${breakpointMap.xxl}px)`,
  nav: `@media screen and (max-width: ${breakpointMap.lg}px)`,
};

const spacing: Spacing = [0, 4, 8, 16, 24, 32, 48, 64];

const fontWeight: FontWeight = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
};

const zIndices = {
  dropdown: 10,
  modal: 100,
};

export default {
  siteWidth: CONTENT_WIDTH,
  breakpoints,
  mediaQueries,
  spacing,
  zIndices,
  fontWeight,
};
