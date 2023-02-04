import { errors } from 'ethers'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { useMemo } from 'react'
import { MINI_CHADS_LOTTERY } from '../constants/addresses'

import { useLotteryMiniContract, useLotteryWalesContract } from './useContract'

export function useTicketsBalance(lottery?: string, owner?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

  const inputs = useMemo(() => [owner], [owner])
    const ticketBalance = useSingleCallResult(contract, 'balanceOf', inputs).result
    console.log(contract)

  return useMemo(
    () => ( 
       ticketBalance ? ticketBalance.toString() : undefined),
    [ticketBalance]
  )
}

export function useLotteryPrice(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const ticketPrice = useSingleCallResult(contract, 'price').result

  return useMemo(
    () => ( 
      ticketPrice ? ticketPrice.toString() : undefined),
    [ticketPrice]
  )
}

export function useLotteryMaxSupply(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const maxSupply = useSingleCallResult(contract, 'maxSupply').result

  return useMemo(
    () => ( 
      maxSupply ? maxSupply.toString() : undefined),
    [maxSupply]
  )
}

export function useLotteryEndTime(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const lotteryEndTime = useSingleCallResult(contract, 'lotteryEndTime').result

  return useMemo(
    () => ( 
      lotteryEndTime ? lotteryEndTime.toString() : undefined),
    [lotteryEndTime]
  )
}
export function useLotteryCurrentSupply(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const currentSupply = useSingleCallResult(contract, 'currentSupply').result

  return useMemo(
    () => ( 
      currentSupply ? currentSupply.toString() : undefined),
    [currentSupply]
  )
}



