import {
    createWatcher,
    getErc20BalanceMulticall,
    getBatchedValuesOnce,
  } from "@enzoferey/multicall-nitro";
  import { useBatchedValues } from "@enzoferey/multicall-nitro/react";
import { Call } from "@enzoferey/multicall-nitro";
import { HEDRON_ADDRESS, HEXS_STAKE_MANAGER_ADDRESS, MULTICALL_ADDRESS } from "constants/addresses";
import React, { useEffect, useMemo, useState } from "react";
import { supportedChainId } from "utils/supportedChainId";
import { SupportedChainId } from "constants/chains";
import { sleep } from "utils/sleep";
import { BigNumber, ethers } from "ethers";
import HDRN_ABI from "../abis/hedron.json"
import { useSingleContractMultipleData } from "lib/hooks/multicall";
import { useHdrnContract, useHexStakeContract, useInterfaceMulticall } from "./useContract";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { EventData } from "web3-eth-contract";




async function getAuctions(){


    // const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com")
    // // const {provider} = useWeb3React()

    // const hedronContract = useHdrnContract()
    let web3 = new Web3("https://mainnet.ethereumpow.org");
    const START_BLOCK = 16441116;
    var eventsData: EventData[];

    const contract = new web3.eth.Contract([
        {
          "inputs": [
            { "internalType": "address", "name": "hexAddress", "type": "address" },
            { "internalType": "uint256", "name": "hexLaunch", "type": "uint256" }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "claimant",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            }
          ],
          "name": "Claim",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "borrower",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            }
          ],
          "name": "LoanEnd",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "bidder",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "liquidationId",
              "type": "uint40"
            }
          ],
          "name": "LoanLiquidateBid",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "liquidator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "liquidationId",
              "type": "uint40"
            }
          ],
          "name": "LoanLiquidateExit",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "borrower",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "liquidationId",
              "type": "uint40"
            }
          ],
          "name": "LoanLiquidateStart",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "borrower",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            }
          ],
          "name": "LoanPayment",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "borrower",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            }
          ],
          "name": "LoanStart",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "minter",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint40",
              "name": "stakeId",
              "type": "uint40"
            }
          ],
          "name": "Mint",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "address", "name": "spender", "type": "address" }
          ],
          "name": "allowance",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
          ],
          "name": "approve",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "account", "type": "address" }
          ],
          "name": "balanceOf",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "borrower", "type": "address" },
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" }
          ],
          "name": "calcLoanPayment",
          "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "borrower", "type": "address" },
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" }
          ],
          "name": "calcLoanPayoff",
          "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" },
            {
              "internalType": "address",
              "name": "hsiStarterAddress",
              "type": "address"
            }
          ],
          "name": "claimInstanced",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "stakeIndex", "type": "uint256" },
            { "internalType": "uint40", "name": "stakeId", "type": "uint40" }
          ],
          "name": "claimNative",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "currentDay",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "dailyDataList",
          "outputs": [
            { "internalType": "uint72", "name": "dayMintedTotal", "type": "uint72" },
            { "internalType": "uint72", "name": "dayLoanedTotal", "type": "uint72" },
            { "internalType": "uint72", "name": "dayBurntTotal", "type": "uint72" },
            { "internalType": "uint32", "name": "dayInterestRate", "type": "uint32" },
            { "internalType": "uint8", "name": "dayMintMultiplier", "type": "uint8" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseAllowance",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "hsim",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
          ],
          "name": "increaseAllowance",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "liquidationList",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "liquidationStart",
              "type": "uint256"
            },
            { "internalType": "address", "name": "hsiAddress", "type": "address" },
            { "internalType": "uint96", "name": "bidAmount", "type": "uint96" },
            { "internalType": "address", "name": "liquidator", "type": "address" },
            { "internalType": "uint88", "name": "endOffset", "type": "uint88" },
            { "internalType": "bool", "name": "isActive", "type": "bool" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" }
          ],
          "name": "loanInstanced",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" }
          ],
          "name": "loanLiquidate",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "liquidationId", "type": "uint256" },
            { "internalType": "uint256", "name": "liquidationBid", "type": "uint256" }
          ],
          "name": "loanLiquidateBid",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "uint256", "name": "liquidationId", "type": "uint256" }
          ],
          "name": "loanLiquidateExit",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" }
          ],
          "name": "loanPayment",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" }
          ],
          "name": "loanPayoff",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "loanedSupply",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
            { "internalType": "address", "name": "hsiAddress", "type": "address" }
          ],
          "name": "mintInstanced",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "stakeIndex", "type": "uint256" },
            { "internalType": "uint40", "name": "stakeId", "type": "uint40" }
          ],
          "name": "mintNative",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
          ],
          "name": "proofOfBenevolence",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "shareList",
          "outputs": [
            {
              "components": [
                { "internalType": "uint40", "name": "stakeId", "type": "uint40" },
                { "internalType": "uint72", "name": "stakeShares", "type": "uint72" },
                { "internalType": "uint16", "name": "lockedDay", "type": "uint16" },
                { "internalType": "uint16", "name": "stakedDays", "type": "uint16" }
              ],
              "internalType": "struct HEXStakeMinimal",
              "name": "stake",
              "type": "tuple"
            },
            { "internalType": "uint16", "name": "mintedDays", "type": "uint16" },
            { "internalType": "uint8", "name": "launchBonus", "type": "uint8" },
            { "internalType": "uint16", "name": "loanStart", "type": "uint16" },
            { "internalType": "uint16", "name": "loanedDays", "type": "uint16" },
            { "internalType": "uint32", "name": "interestRate", "type": "uint32" },
            { "internalType": "uint8", "name": "paymentsMade", "type": "uint8" },
            { "internalType": "bool", "name": "isLoaned", "type": "bool" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "recipient", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
          ],
          "name": "transfer",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "sender", "type": "address" },
            { "internalType": "address", "name": "recipient", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
          ],
          "name": "transferFrom",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ], HEDRON_ADDRESS)

      await contract.getPastEvents("LoanLiquidateStart",
                  {                               
            fromBlock: START_BLOCK,     
            toBlock: 'latest'         
                  })                              
            .then(events => {eventsData = events; console.log(eventsData[0]);})
            .catch((err) => console.error(err));
    //   let eventFilter = contract?.filters.LoanLiquidateStart()
    //   let events = await contract.queryFilter(eventFilter)

}


  export async function useCustomCalls() {
    type Value = { curenthsiCount: BigNumber };
    const [count, setCount ] = useState(0)
      // You can define your calls inside the render function if dynamic
    //   const multicallContract = useHexStakeContract()
      
    

    //  const  validAddressInputs = [["0x0000000000000000000000000000000000000000"]]
    //   const results =  useSingleContractMultipleData(multicallContract, 'hsiCount', validAddressInputs)
    //   console.log( Number(results[0].result))
    //    return useMemo(()=>   {return results },[results])

    const calls = useMemo<Call[]>(() => {
        return [
            {
                target: HEXS_STAKE_MANAGER_ADDRESS,
                call: ["hsiCount(address)(uint256)","0x0000000000000000000000000000000000000000"],
                label: "curenthsiCount",
              },
        ];
      }, []);
//   const watcher = createWatcher<Value>(calls, {
//     rpcUrl: "https://rpc.ankr.com/eth",
//     multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
//   });
//    await watcher.start();
//    watcher.subscribe((update)=>{

//     console.log(`Call with label ${update.type} returned value ${update.value}`);
//     setCount(Number(update.value))

//   })


useEffect( () => {

    async function getAuctions(){


        // const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com")
        // // const {provider} = useWeb3React()
    
        // const hedronContract = useHdrnContract()
        let web3 = new Web3("https://eth.llamarpc.com");
        const START_BLOCK = 16481316;
        var eventsData: EventData[];
    
        const contract = new web3.eth.Contract([
            {
              "inputs": [
                { "internalType": "address", "name": "hexAddress", "type": "address" },
                { "internalType": "uint256", "name": "hexLaunch", "type": "uint256" }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Approval",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "claimant",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                }
              ],
              "name": "Claim",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                }
              ],
              "name": "LoanEnd",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "bidder",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "liquidationId",
                  "type": "uint40"
                }
              ],
              "name": "LoanLiquidateBid",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "liquidator",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "liquidationId",
                  "type": "uint40"
                }
              ],
              "name": "LoanLiquidateExit",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "liquidationId",
                  "type": "uint40"
                }
              ],
              "name": "LoanLiquidateStart",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                }
              ],
              "name": "LoanPayment",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                }
              ],
              "name": "LoanStart",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "minter",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint40",
                  "name": "stakeId",
                  "type": "uint40"
                }
              ],
              "name": "Mint",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Transfer",
              "type": "event"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "owner", "type": "address" },
                { "internalType": "address", "name": "spender", "type": "address" }
              ],
              "name": "allowance",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "spender", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
              ],
              "name": "approve",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "account", "type": "address" }
              ],
              "name": "balanceOf",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "borrower", "type": "address" },
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" }
              ],
              "name": "calcLoanPayment",
              "outputs": [
                { "internalType": "uint256", "name": "", "type": "uint256" },
                { "internalType": "uint256", "name": "", "type": "uint256" }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "borrower", "type": "address" },
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" }
              ],
              "name": "calcLoanPayoff",
              "outputs": [
                { "internalType": "uint256", "name": "", "type": "uint256" },
                { "internalType": "uint256", "name": "", "type": "uint256" }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" },
                {
                  "internalType": "address",
                  "name": "hsiStarterAddress",
                  "type": "address"
                }
              ],
              "name": "claimInstanced",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "stakeIndex", "type": "uint256" },
                { "internalType": "uint40", "name": "stakeId", "type": "uint40" }
              ],
              "name": "claimNative",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "currentDay",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "name": "dailyDataList",
              "outputs": [
                { "internalType": "uint72", "name": "dayMintedTotal", "type": "uint72" },
                { "internalType": "uint72", "name": "dayLoanedTotal", "type": "uint72" },
                { "internalType": "uint72", "name": "dayBurntTotal", "type": "uint72" },
                { "internalType": "uint32", "name": "dayInterestRate", "type": "uint32" },
                { "internalType": "uint8", "name": "dayMintMultiplier", "type": "uint8" }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "decimals",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "spender", "type": "address" },
                {
                  "internalType": "uint256",
                  "name": "subtractedValue",
                  "type": "uint256"
                }
              ],
              "name": "decreaseAllowance",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "hsim",
              "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "spender", "type": "address" },
                { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
              ],
              "name": "increaseAllowance",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "name": "liquidationList",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "liquidationStart",
                  "type": "uint256"
                },
                { "internalType": "address", "name": "hsiAddress", "type": "address" },
                { "internalType": "uint96", "name": "bidAmount", "type": "uint96" },
                { "internalType": "address", "name": "liquidator", "type": "address" },
                { "internalType": "uint88", "name": "endOffset", "type": "uint88" },
                { "internalType": "bool", "name": "isActive", "type": "bool" }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" }
              ],
              "name": "loanInstanced",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "owner", "type": "address" },
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" }
              ],
              "name": "loanLiquidate",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "liquidationId", "type": "uint256" },
                { "internalType": "uint256", "name": "liquidationBid", "type": "uint256" }
              ],
              "name": "loanLiquidateBid",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "uint256", "name": "liquidationId", "type": "uint256" }
              ],
              "name": "loanLiquidateExit",
              "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" }
              ],
              "name": "loanPayment",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" }
              ],
              "name": "loanPayoff",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "loanedSupply",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "hsiIndex", "type": "uint256" },
                { "internalType": "address", "name": "hsiAddress", "type": "address" }
              ],
              "name": "mintInstanced",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "stakeIndex", "type": "uint256" },
                { "internalType": "uint40", "name": "stakeId", "type": "uint40" }
              ],
              "name": "mintNative",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "name",
              "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
              ],
              "name": "proofOfBenevolence",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "name": "shareList",
              "outputs": [
                {
                  "components": [
                    { "internalType": "uint40", "name": "stakeId", "type": "uint40" },
                    { "internalType": "uint72", "name": "stakeShares", "type": "uint72" },
                    { "internalType": "uint16", "name": "lockedDay", "type": "uint16" },
                    { "internalType": "uint16", "name": "stakedDays", "type": "uint16" }
                  ],
                  "internalType": "struct HEXStakeMinimal",
                  "name": "stake",
                  "type": "tuple"
                },
                { "internalType": "uint16", "name": "mintedDays", "type": "uint16" },
                { "internalType": "uint8", "name": "launchBonus", "type": "uint8" },
                { "internalType": "uint16", "name": "loanStart", "type": "uint16" },
                { "internalType": "uint16", "name": "loanedDays", "type": "uint16" },
                { "internalType": "uint32", "name": "interestRate", "type": "uint32" },
                { "internalType": "uint8", "name": "paymentsMade", "type": "uint8" },
                { "internalType": "bool", "name": "isLoaned", "type": "bool" }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "symbol",
              "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "totalSupply",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "recipient", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
              ],
              "name": "transfer",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "sender", "type": "address" },
                { "internalType": "address", "name": "recipient", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
              ],
              "name": "transferFrom",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ], HEDRON_ADDRESS)
    
          await contract.getPastEvents("LoanLiquidateStart",
                      {                               
                fromBlock: START_BLOCK,     
                toBlock: 'latest'         
                      })                              
                .then(events => {eventsData = events; console.log(eventsData);})
                .catch((err) => console.error(err));
        //   let eventFilter = contract?.filters.LoanLiquidateStart()
        //   let events = await contract.queryFilter(eventFilter)
    
    }
  
async function getCallData() {
    const batchedValues = await getBatchedValuesOnce<Value>(calls, {
    rpcUrl: "https://eth.llamarpc.com",
    multicallAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  });
      if(batchedValues.curenthsiCount){
        setCount(Number(batchedValues.curenthsiCount))

      }
}
   console.log("VVVVVVV", count)
   getAuctions()
   getCallData()
    }, [calls, count])


//   await watcher.stop();
//   const batchedValues = await getBatchedValuesOnce<Value>(calls, {
//     rpcUrl: "https://rpc.ankr.com/eth",
//     multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
//   }); 
 return useMemo(()=> {
    return count
}, [count])
  }
    // const calls = [
    //     // Call method "getResult" on contract address 0x2222222222222222222222222222222222222222
    //     // This method takes an `uint256` and a `string` as argument and returns a `string`
    //     {
    //       target: "0x2222222222222222222222222222222222222222",
    //       call: ["getResult(uint256,string)(string)", 10, "hello"],
    //       label: "someCustomCallLabel1",
    //     },
    //     // Call method "getBestNumber" on contract address 0x3333333333333333333333333333333333333333
    //     // This method takes three `uint16` and returns a `uint16`
    //     {
    //       target: "0x3333333333333333333333333333333333333333",
    //       call: ["getBestNumber(uint16,uint16,uint16)(uint16)", 10, 12, 14],
    //       label: "someCustomCallLabel2",
    //     },
    //     // any other call you want to make
    //   ];
    
