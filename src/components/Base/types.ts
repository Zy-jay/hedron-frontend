import { HTMLAttributes } from "react";
import {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridProps as _GridProps,
} from "styled-system";

export type BoxProps = BackgroundProps &
  BorderProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  HTMLAttributes<HTMLDivElement>;

export type FlexProps = BoxProps & FlexboxProps;

export interface FlexWithGapProps extends FlexProps {
  gap: string;
}

export interface GridProps extends FlexProps, _GridProps {}
export interface GridWithGapProps extends FlexProps, _GridProps {
  gridGaps?: string;
  gridRowGaps?: string;
  gridColumnGaps?: string;
  gap?: string;
}
