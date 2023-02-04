import { HEXS_STAKE_MANAGER_ADDRESS } from "constants/addresses";
import { ZERO_ADDRESS } from "constants/misc";
import { ethers } from "ethers";
import { useHdrnContract, useHexStakeContract } from "hooks/useContract";
import { useSingleCallResult } from "lib/hooks/multicall";
import { useCallback, useEffect, useMemo, useState } from "react";
import { calculateGasMargin } from "utils/calculateGasMargin";
import HEX_STAKE_ABI from "abis/hex-stake.json"

export async function useHsiIndex(i: number,  exit: boolean, owner?: string) {  
const hexStakeContract = useHexStakeContract()
// const inputs = useMemo(() => exit?  [ZERO_ADDRESS, i] : [owner, i], [exit, i, owner])
const res =  useSingleCallResult(hexStakeContract, 'hsiLists', exit?  [ZERO_ADDRESS, i] : [owner, i])
    return  res.result? res.result.toString() : ""
  }

// export async function useHsiIndexFromEstimatedGas(i: number, owner?: string, hsiAddress?: string) { 
//   const hdrnContract = useHdrnContract()
//   if(!hdrnContract || !owner || !hsiAddress) return undefined
//   try{
//   const estimatedGas = await hdrnContract.estimateGas.loanLiquidate(owner, i, hsiAddress ).catch(() => {
//     // general fallback for tokens who restrict approval amounts
//     return hdrnContract.estimateGas.loanLiquidate(owner, i, hsiAddress);
//   });
//   return estimatedGas
// }catch{
//   return undefined
// }
//       }
 
 


// export async function useHsiLists(activeLiquidations: number, hsiAddress: string)  {
//   // const { account } = useWeb3React()
// //  const [address , setAddress ] = useState("")
//  const [i, setI] = useState(0)
//  const [don, setDon] = useState(false)

//  const address = await useHsiIndex(i)
// //   const inputs = useMemo(() => [account], [account])
  
//   useEffect(()=>{ 
//      if(address === hsiAddress){
//       setDon(true)
      
//     }else{
//       setI(i+1) 
       
//     }

//   },[activeLiquidations, address, hsiAddress, i])
//   return useMemo(() => {
//     return i 
//  }, [i])
// }

// export function useLiquidationList(liquidationId: string) : any | undefined {
//   // const { account } = useWeb3React()
//  const [liquidationList, setLiquidationList] = useState([])
//  const hdrnContract = useHdrnContract()
// //   const inputs = useMemo(() => [account], [account])
//   const inputs = useMemo(() => [liquidationId], [liquidationId])
//   const res = useSingleCallResult(hdrnContract, 'liquidationList', inputs)
  
//   useEffect(()=>{
//       if(res.result){
//           const liquidationList = res.result[0]
//           setLiquidationList(liquidationList)

//       }
//   },[liquidationList, res.result])
  
//    return useMemo(() => {
//    return liquidationList 
// }, [liquidationList])
// }

export async function serchHsiIndex(i?:number, exit?: boolean) {
  const provider = new ethers.providers.JsonRpcProvider('https://uk.rpc.blxrbdn.com');

  const contract = new ethers.Contract(HEXS_STAKE_MANAGER_ADDRESS, HEX_STAKE_ABI, provider);
  
   const res = exit? await contract.hsiLists(ZERO_ADDRESS, i) : await contract.hsiToken(i); 
   console.log( await res)
   return  res? res.toString() : ""
}


export function useLoanLiquidate( 
  liquidationId: string,
  // liquidationBid?: string,
  hsiIndex?: string | undefined,
  owner?: string,
  hsiAddress?: string,
  ):  [boolean, () => Promise<void>, () => Promise<void>, () => Promise<void>] {
    const [isPending, setIsPending] = useState(false)
    const hdrnContract = useHdrnContract()
    const loanLiquidateExit = useCallback(async (): Promise<void> => {
      try{
        if (isPending) {
          console.error('exit was called unnecessarily');
          return;
        }
        if (!hdrnContract) {
          console.error('no hdrn Contract');
          return;
        }
        if (!liquidationId) {
          console.error('no liquidationId');
          return;
        }
    
        if (!hsiIndex) {
          console.error('No hsiIndex');
          return;
        } 
        //  if (!hsiIndex) {
        //   console.error('No hsiIndex')
        //   alert("Serch HSI Index")
        //   return;
        // }    
        setIsPending(true)
        const estimatedGas = await hdrnContract.estimateGas.loanLiquidateExit(hsiIndex, liquidationId ).catch(() => {
          // general fallback for tokens who restrict approval amounts

          return hdrnContract.estimateGas.loanLiquidateExit(hsiIndex, liquidationId);
        });
        return hdrnContract
          .loanLiquidateExit(hsiIndex, liquidationId, {
            gasLimit: calculateGasMargin(estimatedGas),
            
          })
          .catch((error: Error) => {
            console.log('Failed to buy Loan Liquidate Exit', error);
            setIsPending(false)
            throw error;
          })
        }catch(err){
          console.log(err) 
            alert("Cannot exit on active liquidation") 
          setIsPending(false)
        }
      }, [isPending, hdrnContract, liquidationId, hsiIndex]);

      const loanLiquidateBid = useCallback(async (): Promise<void> => {
        const value = prompt("Bid Amount", "0.00")
        try{
          if (isPending) {
            console.error('exit was called unnecessarily');
            return;
          }
          if (!hdrnContract) {
            console.error('no hdrn Contract');
            return;
          }
          if (!liquidationId) {
            console.error('no liquidationId');
            return;
          }
          if (Number(value) && Number(value) <= 0) {
            console.error('Bad value');
            alert("Enter valid amaunt of liquidationBid")
            return;
          }
        const liquidationBid = Number(value) * ( 10 ** 9)
          
          if (!liquidationBid) {
            console.error('No liquidation Bid value');
            return;
          } 
          setIsPending(true)
          const estimatedGas = await hdrnContract.estimateGas.loanLiquidateBid(liquidationId, liquidationBid ).catch(() => {
            // general fallback for tokens who restrict approval amounts
  
            return hdrnContract.estimateGas.loanLiquidateBid(liquidationId, liquidationBid);
          });
          return hdrnContract
            .loanLiquidateBid(liquidationId, liquidationBid, {
              gasLimit: calculateGasMargin(estimatedGas),
              
            })
            .catch((error: Error) => {
              console.log('Failed to buy Loan Liquidate Exit', error);
              setIsPending(false)
              throw error;
            })
          }catch(err){
            console.log(err) 
              alert(err.toString()) 
            setIsPending(false)
          }
        }, [isPending, hdrnContract, liquidationId]);

        const loanLiquidate = useCallback(async (): Promise<void> => {
          const value = prompt("Bid Amount", "0.00")
          try{
            if (isPending) {
              console.error('exit was called unnecessarily');
              return;
            }
            if (!hdrnContract) {
              console.error('no hdrn Contract');
              return;
            }
            if (!hsiIndex) {
              console.error('no hsiIndex');
              return;
            }
            if (!owner) {
              console.error('no owner');
              return;
            }
            if (!hsiAddress) {
              console.error('no hsiAddress');
              return;
            }
            if (Number(value) && Number(value) <= 0) {
              console.error('Bad value');
              alert("Enter valid amaunt of liquidationBid")
              return;
            }
          const liquidationBid = Number(value) * ( 10 ** 9)
            
            if (!liquidationBid) {
              console.error('No liquidation Bid value');
              return;
            } 
            setIsPending(true)
            const estimatedGas = await hdrnContract.estimateGas.loanLiquidate(owner, hsiIndex, hsiAddress ).catch(() => {
              // general fallback for tokens who restrict approval amounts
    
              return hdrnContract.estimateGas.loanLiquidate(owner, hsiIndex, hsiAddress);
            });
            return hdrnContract
              .loanLiquidate(owner, hsiIndex, hsiAddress, {
                gasLimit: calculateGasMargin(estimatedGas),
                
              })
              .catch((error: Error) => {
                console.log('Failed to buy Loan Liquidate Bit', error);
                setIsPending(false)
                throw error;
              })
            }catch(err){
              console.log(err) 
                alert(err.toString()) 
              setIsPending(false)
            }
          }, [isPending, hdrnContract, hsiIndex, owner, hsiAddress]);
    
      return [isPending, loanLiquidateExit, loanLiquidateBid, loanLiquidate];
    }    

