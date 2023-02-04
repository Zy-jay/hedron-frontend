import styled from "styled-components";
import { grid, flexbox } from "styled-system";

import Box from "./Box";
import { GridProps, GridWithGapProps } from "./types";

const Grid = styled(Box)<GridProps>`
  display: grid;
  ${flexbox}
  ${grid}
  overflow-x: auto;
  min-width: 1280px;
  gap: 10px;
  align-items: center;
  span{
    font-size: .975rem;
    font-weight: 500;
  }
`;

export const GridWithGap = styled(Box)<GridWithGapProps>`
  display: grid;
  ${({ gridGaps }) => gridGaps && `grid-grap: ${gridGaps};`}
  ${({ gridRowGaps }) => gridRowGaps && `row-gap: ${gridRowGaps};`}
  ${({ gridColumnGaps }) => gridColumnGaps && `column-gap: ${gridColumnGaps};`}
  ${({ gap }) => gap && `gap: ${gap};`}
  ${flexbox}
  ${grid}
`;

export default Grid;
