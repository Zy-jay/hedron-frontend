import { Contract } from '@ethersproject/contracts'
// import QuoterV2Json from '@uniswap/swap-router-contracts/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
// import IUniswapV2PairJson from '@uniswap/v2-core/build/IUniswapV2Pair.json'
// import IUniswapV2Router02Json from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
// import QuoterJson from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
// import TickLensJson from '@uniswap/v3-periphery/artifacts/contracts/lens/TickLens.sol/TickLens.json'
import UniswapInterfaceMulticallJson from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'
// import NonfungiblePositionManagerJson from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
// import V3MigratorJson from '@uniswap/v3-periphery/artifacts/contracts/V3Migrator.sol/V3Migrator.json'
import { useWeb3React } from '@web3-react/core'
// import EIP_2612 from 'abis/eip_2612.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import ERC20_ABI from '../abis/erc20.json'
import HEX_ABI from 'abis/hex.json'
// import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import ERC721_ABI from '../abis/erc721.json'
import ERC1155_ABI from '../abis/erc1155.json'
import { ArgentWalletDetector, Erc20, Erc721, Erc1155, Weth, EnsRegistrar, EnsPublicResolver,  } from '../abis/types'
import WETH_ABI from '../abis/weth.json'
import LOTTERY_MINI_ABI from 'abis/lottery-abi.json'
import LOTTERY_WALES_ABI from 'abis/lottery-wales-abi.json'
import HDRN_ABI from "abis/hedron.json"
import HEX_STAKE_ABI from "abis/hex-stake.json"
import {
  MULTICALL_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  HEX_ADDRESS,
  HEDRON_ADDRESS,
  HEXS_STAKE_MANAGER_ADDRESS,
} from '../constants/addresses'
import { WRAPPED_NATIVE_CURRENCY } from '../constants/tokens'
import { useMemo } from 'react'
import {  UniswapInterfaceMulticall } from '../types/v3'
// import { V3Migrator } from '../types/v3/V3Migrator'

import { getContract } from '../utils'
import { supportedChainId } from 'utils/supportedChainId'
import { SupportedChainId } from '@uniswap/sdk-core'
import { ZERO_ADDRESS } from 'constants/misc'

// const { abi: IUniswapV2PairABI } = IUniswapV2PairJson
// const { abi: IUniswapV2Router02ABI } = IUniswapV2Router02Json
// const { abi: QuoterABI } = QuoterJson
// const { abi: QuoterV2ABI } = QuoterV2Json
// const { abi: TickLensABI } = TickLensJson
const { abi: MulticallABI } = UniswapInterfaceMulticallJson
// const { abi: NFTPositionManagerABI } = NonfungiblePositionManagerJson
// const { abi: V2MigratorABI } = V3MigratorJson

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

// export function useV2MigratorContract() {
//   return useContract<V3Migrator>(V3_MIGRATOR_ADDRESSES, V2MigratorABI, true)
// }

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useHexContract() {
  return useContract(HEX_ADDRESS, HEX_ABI, true)
}
export function useHexStakeContract() {
  return useContract(HEXS_STAKE_MANAGER_ADDRESS, HEX_STAKE_ABI, true)
}
export function useHdrnContract() {
  return useContract(HEDRON_ADDRESS, HDRN_ABI, true)
}


export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React()
  return useContract<Weth>(
    chainId ? WRAPPED_NATIVE_CURRENCY[chainId]?.address : undefined,
    WETH_ABI,
    withSignerIfPossible
  )
}

 

// export function useBGNTContract(withSignerIfPossible?: boolean): Contract | null {
//   return useContract(BGNT_ADDRESS, BGNT_ABI, withSignerIfPossible)
// }

export function useLotteryMiniContract(lotteryAddress?: string) {
  return useContract(lotteryAddress, LOTTERY_MINI_ABI, false)
}

export function useLotteryWalesContract(lotteryAddress?: string, withSignerIfPossible?: boolean ): Contract | null {
  return useContract(lotteryAddress, LOTTERY_WALES_ABI, withSignerIfPossible)
}

export function useERC721Contract(nftAddress?: string) {
  return useContract<Erc721>(nftAddress, ERC721_ABI, false)
}

export function useERC1155Contract(nftAddress?: string) {
  return useContract<Erc1155>(nftAddress, ERC1155_ABI, false)
}


export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

// export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
// }

// export function useEIP2612Contract(tokenAddress?: string): Contract | null {
//   return useContract(tokenAddress, EIP_2612, false)
// }

// export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
// }

// export function useV2RouterContract(): Contract | null {
//   return useContract(V2_ROUTER_ADDRESS, IUniswapV2Router02ABI, true)
// }

export function useInterfaceMulticall() {
  return useContract<UniswapInterfaceMulticall>(MULTICALL_ADDRESS, MulticallABI, false) as UniswapInterfaceMulticall
}

// export function useV3NFTPositionManagerContract(withSignerIfPossible?: boolean): NonfungiblePositionManager | null {
//   return useContract<NonfungiblePositionManager>(
//     NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
//     NFTPositionManagerABI,
//     withSignerIfPossible
//   )
// }

// export function useQuoter(useQuoterV2: boolean) {
//   return useContract<Quoter | QuoterV2>(QUOTER_ADDRESSES, useQuoterV2 ? QuoterV2ABI : QuoterABI)
// }

// export function useTickLens(): TickLens | null {
//   const { chainId } = useWeb3React()
//   const address = chainId ? TICK_LENS_ADDRESSES[chainId] : undefined
//   return useContract(address, TickLensABI) as TickLens | null
// }
