import { set } from "immer/dist/internal"
import { useCallback, useEffect, useState } from "react"
import compareAdresses from "utils/compareAddresses"
import { sleep } from "utils/sleep"
import { serchHsiIndex, useHsiIndex } from "./useHdrnContractFunctions"

export  function useSerchHsiIndex(iMax: number, address: string,  exit: boolean, owner?: string) {

    const [i, setIvalue] = useState(0)
    const [wait, setWait] = useState(false)
    const [hsiIndexReady, setHsiIndexReady] = useState(false)
    const otherAddress = useHsiIndex(i, exit, owner) 
    // console.log("HOOK")

    const checkAddress = useCallback(async (): Promise<void> => {
        setWait(true)
        const address_ = await otherAddress
    if(iMax > 0 && address_ && address){
        console.log(address, address_)
      if(compareAdresses(address, address_)){
        setHsiIndexReady(true)
        setWait(false)
      }else if(i === iMax && iMax > 0 ){
        setIvalue(0)
        setWait(false) 
        setHsiIndexReady(false)
        console.log("Not found")
      }else{
      setIvalue(i+1)
      console.log(i+1)
      setWait(false)
   }
  }else{
    setWait(false)
    
  }
},[address, i, iMax, otherAddress])
// const onClickSomething = useCallback(debounce(async () => {
//     checkAddress()
//     }, 280), [i, address, hsiIndexReady, iMax, checkAddress]);
 useEffect( ()=>{
  if(!wait && iMax > 0 && !hsiIndexReady) {
    checkAddress()
  } 
  if(iMax == 0){
    setWait(false)
    setIvalue(0)
    setHsiIndexReady(false)
}
 },[checkAddress,  i, iMax, wait, hsiIndexReady])

return [i, wait, hsiIndexReady]
}    

// export  function useSerchHsiIndex(iMax: number, address: string, owner: string, exit?: boolean) {

//     const [i, setIvalue] = useState(0)
//     const [wait, setWait] = useState(false)
//     const [hsiIndexReady, setHsiIndexReady] = useState(false)
//     const otherAddress = useHsiIndex(i, exit) 
//     const estimatedGas = useHsiIndexFromEstimatedGas(i, owner, address)
//     console.log("HOOK")

//     const checkAddress = useCallback(async (): Promise<void> => {
//         setWait(true)
//         if(iMax > 0 && exit && address){
//         const address_ = await otherAddress
    
//         console.log(address, address_)
//       if(address_ && compareAdresses(address, address_)){
//         setHsiIndexReady(true)
//         setWait(false)
//       }else if(i === iMax && iMax > 0){
//         setIvalue(0)
//         setWait(false) 
//         setHsiIndexReady(false)
//         console.log("Not found")
//       }else if(!address_){
//         console.log("No address_, retry")
//         setWait(false)
//    }else{
//        setIvalue(i+1)
//       console.log(i+1)
//       setWait(false)
//    }
//   } else if(iMax > 0 && !exit && address && owner){
//   const estimatedGas_ = await estimatedGas
//   console.log(estimatedGas_)
//      if(estimatedGas_){
//         setHsiIndexReady(true)
//         setWait(false)
//      } else if(i === iMax && iMax > 0){
//         setIvalue(0)
//         setWait(false) 
//         setHsiIndexReady(false)
//         console.log("Not found")
//       }else{
//         setIvalue(i+1)
//         console.log(i+1)
//         setWait(false)
//      }
//   } else{
//     setWait(false)
//   }
// },[address, estimatedGas, exit, i, iMax, otherAddress, owner])
// // const onClickSomething = useCallback(debounce(async () => {
// //     checkAddress()
// //     }, 280), [i, address, hsiIndexReady, iMax, checkAddress]);
//  useEffect( ()=>{
//   if(!wait && iMax > 0 && !hsiIndexReady) {
//     checkAddress()
//   }else if(iMax === 0){
//     setWait(false)
//     setIvalue(iMax)
//     setHsiIndexReady(false)
// }
//  },[checkAddress,  i, iMax, wait, hsiIndexReady])

// return [i, wait, hsiIndexReady]
// }    


