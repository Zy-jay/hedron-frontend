import { useWeb3React } from "@web3-react/core";
import React from "react";

import { ConnectWalletButton } from "./ConnectWalletPageStyles";
import { useToggleWalletModal } from 'state/application/hooks'
import Web3Status from "components/Web3Status";


const ConnectWalletPage = () => {
  const { account } = useWeb3React();
  const toggleWalletModal = useToggleWalletModal()
 

  return (
    <> {!account? <ConnectWalletButton onClick={toggleWalletModal}>
    Connect wallet 🦊
  </ConnectWalletButton> : null}
      
        <div onClick={toggleWalletModal}>
          <Web3Status/>
        </div>
    </>
  );
};

export default ConnectWalletPage;
