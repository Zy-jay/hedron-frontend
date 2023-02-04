import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from 'react'

import { useTokenContract } from './useContract'

export async function useTokenAllowance(token?: string, owner?: string, spender?: string): Promise<string | undefined> {
  const contract = useTokenContract(token, false)
 

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  
    const allowance = useSingleCallResult(contract, 'allowance', inputs).result?.toString()
 
 return useMemo(
    () => ( allowance? allowance : undefined),
    [allowance] )
 
 
}



// export async function useBUSDAllowance(token?: string, owner?: string, spender?: string): Promise<string | undefined> {
//   const blockchain = useSelector((state) => state.blockchain);
 

//   const inputs = useMemo(() => [owner, spender], [owner, spender])
  
//     const allowance = await useSingleCallResult(contract, 'allowance', inputs)
//     console.log(allowance)
 
//  return useMemo(
//     () => (token && allowance ? allowance.toString() : undefined),
//     [token, allowance] )
 
 
// }