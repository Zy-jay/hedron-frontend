import { useWeb3React } from "@web3-react/core";
import React from "react";

import { Wrapper } from "./styles";

import { AuctionList } from "../../components/AuctionList";
import { BalancePanel } from "components/BalancePanel";

function HomePage() {
  return (
    <Wrapper>
      <BalancePanel/>
      <AuctionList />
    </Wrapper>
  );
}

export default HomePage;
