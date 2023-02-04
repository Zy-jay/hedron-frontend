// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let name = await store
        .getState()
        .blockchain.smartContract.methods.name()
        .call();
      let currentSupply = await store
        .getState()
        .blockchain.smartContract.methods.currentSupply()
        .call();
      let price = await store
        .getState()
        .blockchain.smartContract.methods.price()
        .call();
     let maxSupply = await store
        .getState()
        .blockchain.smartContract.methods.maxSupply()
        .call();
     let balanceOf = await store
        .getState()
        .blockchain.smartContract.methods.balanceOf(account)
        .call();
     let allowance = await store
        .getState()
        .blockchain.smartContractBusd.methods.allowance(account, "0xBa5d1f2Ee1384e7871725a41615787631080B9f7")
        .call();
      dispatch(
        fetchDataSuccess({
          name,
          currentSupply,
          price,
          maxSupply,
          balanceOf,
          allowance,
        })
        
      );
      console.log(currentSupply, price, balanceOf, allowance);
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
