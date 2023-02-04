import {
  TextProps,
  sizes,
  fontWeightSemiBold,
  fontWeightReqular,
} from "./types";

export const getFontSize = ({ fontSize, size }: TextProps) => {
  return fontSize || sizes[size || sizes.md];
};

export const getFontWeight = ({ bold }: TextProps) =>
  bold ? fontWeightSemiBold : fontWeightReqular;
