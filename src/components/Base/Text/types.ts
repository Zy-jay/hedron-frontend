import { LayoutProps, SpaceProps, TypographyProps } from "styled-system";

export const fontWeightReqular = 400;
export const fontWeightSemiBold = 600;

export const sizes: Record<string, string> = {
  sm: "12px",
  md: "14px",
  lg: "16px",
};

export type Size = typeof sizes[keyof typeof sizes];

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string;
  fontSize?: string;
  bold?: boolean;
  size?: Size;
  whiteSpace?: string;
  cursor?: "pointer" | "default" | "not-allowed";
  ellipsis?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}
