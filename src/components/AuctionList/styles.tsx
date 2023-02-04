import styled from "styled-components";

import { Flex } from "../Base";

export const Wrapper = styled(Flex)`
  background-color: #1E1E1E;
  flex-direction: column;
  padding: 20px;
  h2{
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  }

`;

export const DataBox = styled(Flex)`
  background-color: #1E1E1E;
  flex-direction: column;
  padding: 5px;
  overflow-x: auto;
`;
