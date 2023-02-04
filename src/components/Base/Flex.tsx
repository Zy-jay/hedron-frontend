import styled from "styled-components";
import { flexbox } from "styled-system";

import Box from "./Box";
import { FlexProps, FlexWithGapProps } from "./types";

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export const FlexWithGap = styled(Box)<FlexWithGapProps>`
  display: flex;
  ${flexbox};
  gap: ${({ gap }) => gap};
`;

export default Flex;
