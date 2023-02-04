import React from "react";

import { HeaderWrap } from "./styles";

import ConnectWalletPage from "../../pages/ConnectWalletPage/ConnectWalletPage";

export const Header = () => {
  return (
    <HeaderWrap>
      <h1>LOGO</h1>
      <ConnectWalletPage />
    </HeaderWrap>
  );
};
