import { useSingleCallResult } from "lib/hooks/multicall"
import { useEffect, useMemo, useState } from "react"
import { useHexContract } from "./useContract"

export function useHexGlobalInfo() : any | undefined {
    
    // const { account } = useWeb3React()
   const [hexSharePrice, setHexSharePrice] = useState(0)
   const hexContract = useHexContract()
//   const inputs = useMemo(() => [account], [account])
    // check the current approval status

    const globalInfo = useSingleCallResult(hexContract, 'globalInfo')
    
    useEffect(()=>{
        if(globalInfo.result){
            const res = globalInfo.result[0]
          setHexSharePrice(Number(res[2]) / 10)

        }
    },[globalInfo])
    
     return useMemo(() => {
     return hexSharePrice 
  }, [hexSharePrice])
  }
  