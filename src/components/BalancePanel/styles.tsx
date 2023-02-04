import styled from "styled-components";

import { Flex } from "../Base";

export const Wrapper = styled(Flex)`
display: flex;
flex-wrap: nowrap;
gap: 20px;
justify-content: center;
align-items: center;
max-height: 150px;
width: 100%;
height: 150px;
`;

export const ItemBalance = styled(Flex)`
  background: #1E1E1E;
  padding: 20px;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 96px;
  span{
    font-size: 1.5rem;
  }
`;
