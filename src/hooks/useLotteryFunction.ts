import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { sendAnalyticsEvent } from 'components/AmplitudeAnalytics'
import { EventName } from 'components/AmplitudeAnalytics/constants'
import { BUSD_TEST } from 'constants/addresses'
import { useLotteryWalesContract, useTokenContract } from 'hooks/useContract'
import { useCallback, useMemo } from 'react'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { BigNumber } from 'ethers'
import { useIsTransactionPending, useTransactionAdder } from 'state/transactions/hooks'

export enum BalanceState {
  UNKNOWN = 'UNKNOWN',
  LOW_BALANCE = 'LOW_BALANCE',
  PENDING = 'PENDING',
  BALANCE = 'BALANCE',
}

export function useBalanceState(
  totalAmount: number,
  token: string ,
  isPendingBay : boolean
) : BalanceState {

  const { account } = useWeb3React()

const tokenContract = useTokenContract(token)
const inputs = useMemo(() => [account], [account])
  // check the current approval status
  const currentBalance = useSingleCallResult(tokenContract, 'balanceOf', inputs).result?.toString()
  
   return useMemo(() => {
  if ( !totalAmount || !token ) return BalanceState.UNKNOWN
  if ( !currentBalance) return BalanceState.UNKNOWN
   if (Number(currentBalance) / 10 **18 < totalAmount  ) return BalanceState.LOW_BALANCE
   
   return Number(currentBalance) / 10 **18 >= totalAmount
   ? isPendingBay
     ? BalanceState.PENDING
     : BalanceState.BALANCE
   : BalanceState.LOW_BALANCE
}, [token, currentBalance, isPendingBay, totalAmount])
}

export function useBayTicket(
    amount: number,
    totalAmount: number,
    token: string ,
    lottery: string,
  ):  [BalanceState, () => Promise<void>] {
    const isPendingBay = useIsTransactionPending()
    const { chainId } = useWeb3React()
    const lotteryContract = useLotteryWalesContract(lottery)
    const balanceState = useBalanceState(totalAmount, token, isPendingBay)
    const addTransaction = useTransactionAdder();
      const buyTickets = useCallback(async (): Promise<void> => {
        if (balanceState === BalanceState.LOW_BALANCE) {
          console.error('approve was called unnecessarily');
          return;
        }
        if (!token) {
          console.error('no token');
          return;
        }
    
        if (!lotteryContract) {
          console.error('lotteryContract is null');
          return;
        }
    
        if (!amount) {
          console.error('missing amount');
          return;
        }
    console.log(addTransaction)
        let useExact = false;
        const estimatedGas = await lotteryContract.estimateGas.buyTickets(amount).catch(() => {
          // general fallback for tokens who restrict approval amounts
          useExact = true;

          return lotteryContract.estimateGas.buyTickets(useExact ?? amount);
        });
              console.log(balanceState)

        return lotteryContract
          .buyTickets(amount, {
            gasLimit: calculateGasMargin(estimatedGas),
          })
          .catch((error: Error) => {
            console.debug('Failed to buy tickets', error);
            throw error;
          });
      }, [balanceState, token, lotteryContract, amount, addTransaction, lottery]);
      return [balanceState, buyTickets];
    }    