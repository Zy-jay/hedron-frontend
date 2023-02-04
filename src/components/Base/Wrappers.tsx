import styled from "styled-components";

import Flex from "./Flex";

import { CONTENT_WIDTH } from "../../theme/constants";

export const MainWrapper = styled(Flex)`
  position: relative;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: #1E1E1E;
  overflow-x: hidden;
`;
export const ContentWrapper = styled(Flex)`
  width: 100%;
  max-width: ${CONTENT_WIDTH}px;
  flex-direction: column;
  margin: 0 auto;
  flex: 1;
`;
