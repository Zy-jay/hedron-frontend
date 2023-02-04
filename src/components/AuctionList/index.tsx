import React, { FC, useCallback, useEffect, useState } from "react";

import { ActiveHeader, BorrowedHeader } from "./helpers";
import { Wrapper, DataBox } from "./styles";
import { ActiveHSIHEXStakeAuctionsList, ActiveStatistic, AuctionHeaderProps, BaseBorrowedHSIHEXStakesList } from "./types";
import { Select, Space, Statistic, Pagination } from 'antd';
import Web3 from "web3"
import { Grid } from "../Base";
import { MediumText } from "../Base/Text";
import { getHdrnLiquidations, getHdrnLiquidationsActive, getHdrnLoans, getHdrnLoansActive } from "hooks/useGraphQuery";
import { getShortAddress } from "utils/getShortAddress";
import { ButtonDropdown } from "components/Button/ButtonDropdown";
import { useLoanLiquidate } from "hooks/useHdrnContractFunctions";
import Loader from "components/Loader";
import { SupportedChainId } from "constants/chains";
import { useWeb3React } from "@web3-react/core";
import { switchChain } from "utils/switchChain";
import { useSerchHsiIndex } from "hooks/SerchHsiIndex";
import { sleep } from "utils/sleep";
import { useCustomCalls } from "hooks/useMulticallNitro";

export const AuctionHeader: FC<AuctionHeaderProps> = ({ headers }) => {
  return (
    <Grid gridTemplateColumns="repeat(11, 1fr)" style={{padding: "10px 0 10px 5px", border: "1px solid #545454", borderTop: "none"}} >
      {headers.map((title, id) => {
        return (
          <MediumText key={id} fontWeight={700}>
            {title}
          </MediumText>
        );
      })}
    </Grid>
  );
};
const { Countdown } = Statistic;

 function compareAdresses(addressA: string, addressB: string) {
  return addressA.toLowerCase() === addressB.toLowerCase()
 }

function getDeadlineCountdown(liquidationExtension?:string | null, liquidationStart ?:string | null) {
   const sec = liquidationStart? ((Number(liquidationStart) - (Date.now() / 1000)  ) + 24 * 60 * 60) : 0
  if(sec && sec!== null && sec > 0){
  const deadline = Date.now() + (sec * 1000)
  return(
    <Countdown valueStyle={{color: sec > 60 * 60? "green" : "orange"}} value={deadline} onFinish={undefined} />
  )
  }else{
    return(
    <span style={{color: "red"}}> LOST</span>
    )
  
  }
  
}

function isLost(liquidationStart ?:string){
return liquidationStart?  ((Number(liquidationStart) - (Date.now() / 1000)  ) + 24 * 60 * 60) < 0 ? true : false : false
}

// async function useI(iMax?: number, address?: string) {
  

//   const [i, setIvalue] = useState(0)
//   const hsiIndexAddressForHsiLists = await useHsiIndex(i)
//   sleep(200)
//     if(!iMax || !address) return ["0", 0]
//     if(address.toLowerCase() ===  hsiIndexAddressForHsiLists.toLowerCase()){
//       return [i.toString(), i]
//     }else if(i >  iMax ){
//       setIvalue(0)
//       return ["0", 0]
//     }else{
//     setIvalue(i+1)
//     return [i.toString(), iMax]
// }
// }



export const AuctionList = () => {
  const { chainId, connector, account } = useWeb3React()
  const [hdrnLoans, setHexSharePrice] = useState([])
  const [hdrnLiquidations, setHdrnLiquidations] = useState([])
  const [activeLiquidationsStatistic, setActiveStatistic] = useState<ActiveStatistic>()
  const [activeLoansStatistic, setActiveLoansStatistic] = useState<ActiveStatistic>()
  
  // const [hsiIndex, setHsiIndex] = useState("")
  const [liquidationId, setLiquidationId] = useState("")
  const [hsiAddress, setHsiAddress] = useState("")
  const [owner, setOwner] = useState("")
  const [iMax, setiMax] = useState(0)

 
  const [isExit, setExit] = useState(true)
  const [cencel, setCencel] = useState(true)

  // const  heandelIsExit = () => {
  //   isExit? setExit(false) : setExit(true)
  // }
  
  const [i, wait, hsiIndexReady] = useSerchHsiIndex(iMax, hsiAddress, isExit ,owner)

  const setParm = useCallback((liquidationId: string, hsiAddress: string, iMax_?: string, owner?: string,  isExit?: boolean ) => {
    setLiquidationId(liquidationId)
    setHsiAddress(hsiAddress)
    setExit(owner? false: true)
    owner && setOwner(owner)
    setiMax(iMax_? Number(iMax_) : 0)
    setCencel(false)
    console.log("setParm")
  },[])
  
   const  result = useCustomCalls()

  async function name() {
    
    // 15475382
    var web3 = new Web3('https://rpc.ankr.com/eth');
    // web3.eth.getBlockNumber().then(console.log);
    const time = await web3.eth.getBlockNumber()
    console.log("Блок!", time, result)

    

  }
 
  
  const [firstStakes, setFirstStakes] = useState(10)
  const [firstLiquidation, setFirstLiquidation] = useState(10)
  const [skipStakes, setSkipStakes] = useState(0)
  const [skipLiquidation, setSkipLiquidation] = useState(0)

  const [isPending,  loanLiquidateExit, loanLiquidateBid, loanLiquidate] = useLoanLiquidate(
    liquidationId,
    hsiIndexReady
    ? 
    i.toString() 
    : 
    undefined, 
    owner, 
    hsiAddress

    )



  useEffect( () => {
    async function fetchData() {
    //   const hdrnLoans = await getHdrnLoans(firstStakes, skipStakes)
    //   const hdrnLiquidations = await getHdrnLiquidations(firstLiquidation, skipLiquidation)
    //  const activeLiquidationsStatistic = await getHdrnLiquidationsActive()
    //  const activeLoansStatistic = await getHdrnLoansActive() 
    // if(hdrnLoans){
    //     setHexSharePrice(hdrnLoans)  
    // }    
    // if(hdrnLiquidations){
    //   setHdrnLiquidations(hdrnLiquidations)  
    // }  
    // if(activeLiquidationsStatistic){
    //   setActiveStatistic(activeLiquidationsStatistic)  
    // }   
    // if(activeLoansStatistic){
    //   setActiveLoansStatistic(activeLoansStatistic)  
    // } 
    if(result){
      console.log(result)
    }
  }
  fetchData()
    }, [hdrnLoans, hdrnLiquidations, firstStakes, firstLiquidation, skipStakes, skipLiquidation, result])
    
    useEffect( () => {
      name()

      if(i === iMax && iMax > 0 && !wait && !hsiIndexReady){
        setiMax(0)
        // console.log("&&&&&&&")
        
      }
       if(!hsiIndexReady && iMax > 0){
      //  console.log("))))))))))")
      }
      if(cencel){
        setLiquidationId("")
    setHsiAddress("")
    setExit(true)
    setOwner("")
    setiMax(0)
    // console.log("cencel")
      }
     
      }, [hsiAddress, i, iMax, liquidationId, hsiIndexReady, wait, cencel, setiMax, setParm])

  const handleChangeFirstStakes = (value: number) => {
    setFirstStakes(value)
   } 
   const handleChangeFirstAuction = (value: number) => {
    setFirstLiquidation(value)
   } 
   const handleChangeSkipStakes = (value: number) => {
    setSkipStakes( firstStakes * (value - 1))
   } 
   const handleChangeSkipLiquidation = (value: number) => {
    setSkipLiquidation(firstLiquidation * (value - 1))
  }
  return (
    <>
    <Wrapper>
  <h2 style={{width: "100%", background: "#272727", padding: "20px" }}>Borrowed HSI HEX Stakes</h2>
  <DataBox>
      <AuctionHeader headers={BorrowedHeader} />
      {hdrnLoans.map((item: BaseBorrowedHSIHEXStakesList, id) => {
        return (
          <Grid key={id} gridTemplateColumns="repeat(11, 1fr)" style={{padding: "10px 0 10px 5px", border: "1px solid #545454"}} >
        <span>{getShortAddress(item.borrower.id)}</span>
        <span>{item.hexStake.stakeId}</span>
        <span>{(Number(item.loanStartDay) / Number(item.loanedDays) * 100 - 0.27).toFixed(2)  + "%"}</span>
        <span>{(Number(item.hexStake.stakeAmount) / 10 ** 8).toFixed(2)}</span>
        <span>{item.hexStake.stakedDays}</span>
        <span>{(Number(item.hexStake.stakeShares) /10 ** 9).toFixed(2) + " B-Shares"}</span>
        <span>{item.hexStake.hdrnLaunchBonus + "x"}</span>
        <span>1</span>
        <span>1</span>
        <span>NOW!</span>
        <span onClick={!cencel? async() => { await sleep(500);  setCencel(true)} : () =>  setParm(item.hexStake.stakeId, item.hexStake.hdrnHsiAddress, activeLoansStatistic?.value, item.borrower.id)}> 
         {chainId === SupportedChainId.MAINNET?  isPending? 
           <Loader/>
            : <span > 
               
             
           <ButtonDropdown  
               loading={!hsiIndexReady && !cencel} 
               clickFunction={loanLiquidate} 
               title={ item.hexStake.stakeId === liquidationId &&  i + " / " +  iMax}
               menuTitle={"Start Auction"}
               cancel={async() => { await sleep(500);  setCencel(true)}}
            />
             </span>
             : 
          <span onClick={  () => switchChain(connector, SupportedChainId.MAINNET)}>Switch chain</span> } </span>
        </Grid>
        );
      })} 
       </DataBox>
  <Space wrap style={{padding: "10px"}}>
    <Select
      defaultValue= {10}
      style={{ width: 70, color: "#fff", background: "RGB(30, 30, 30)" }}
      onChange={handleChangeFirstStakes}
      options={[
        { value: 10, label: '10' },
        { value: 20, label: "20" },
        { value: 50, label: '50' },
        { value: 100, label: '100', disabled: true },
      ]}
    />
    <span>{activeLoansStatistic?.value}</span>
    <br />
    { activeLoansStatistic?.value? <Pagination simple defaultCurrent={1} pageSize={firstStakes} onChange={handleChangeSkipStakes} total={Number(activeLoansStatistic.value) } /> : <Loader/>}
    <br />
  </Space>
    </Wrapper>
 
<Wrapper style={{marginTop: "50px"}}>
  <h2 style={{width: "100%", background: "#272727", padding: "20px" }}>Active HSI HEX Stake Auctions</h2>
  <DataBox>

<AuctionHeader headers={ActiveHeader} />
{hdrnLiquidations.map((item: ActiveHSIHEXStakeAuctionsList, id) => {
  return (
    <Grid key={id} gridTemplateColumns="repeat(11, 1fr)" style={{padding: "10px 0 10px 5px", border: "1px solid #545454"}} >
  <span>{item.loan.hexStake.stakeId}</span>
  <span>??
    {/* {(Number(item.loanStartDay) / Number(item.loanedDays) * 100 - 0.27).toFixed(2)  + "%"} */}
    </span>
  <span>{(Number(item.loan.hexStake.stakeAmount) / 10 ** 8).toFixed(2) + " HEX"}</span>
  <span>{item.loan.hexStake.stakedDays}</span>
  <span>{(Number(item.loan.hexStake.stakeShares) / 10 ** 9).toFixed(2) + " B-Shares"}</span>
  <span>{item.loan.hexStake.hdrnLaunchBonus + "x"}</span>
  <span>{"?"}</span>
  <span style={{ color: account && compareAdresses(item.currentBidder.id, account)? "green" : "red"}}>{getShortAddress(item.currentBidder.id)}</span>
  <span>{(Number(item.currentBid) / 10 ** 9).toFixed(2) + " HDRN"}</span>
  <span>{ getDeadlineCountdown(item.liquidationExtension, item.liquidationStart)}</span>
  <span onClick={!cencel? async() => { await sleep(500);  setCencel(true)} : () => setParm(item.id, item.loan.hexStake.hdrnHsiAddress, activeLiquidationsStatistic?.value, undefined, isLost(item.liquidationStart) ? true : false) }> 
  {chainId === SupportedChainId.MAINNET?  isPending? 
   <Loader/>
   : <span>
   <ButtonDropdown  
     loading={isLost(item.liquidationStart) && !hsiIndexReady && !cencel} 
     clickFunction={isLost(item.liquidationStart) ? loanLiquidateExit : loanLiquidateBid} 
     title={item.id === liquidationId &&  i + " / " +  Number(activeLiquidationsStatistic?.value)}
     menuTitle={isLost(item.liquidationStart) ? "Exit Auction" : "Bid"}
     cancel={ async() => { await sleep(500);  setCencel(true)}}
     />
     </span>
   : 
  <span onClick={ () => switchChain(connector, SupportedChainId.MAINNET)}>Switch chain</span> } </span>
</Grid>
  );
})}  
       </DataBox>

<Space wrap style={{padding: "10px"}}>
<Select
defaultValue= {10}
style={{ width: 80, color: "#fff", background: "RGB(30, 30, 30)" }}
onChange={handleChangeFirstAuction}
options={[
  { value: 10, label: '10' },
  { value: 20, label: "20" },
  { value: 50, label: '50' },
  { value: 100, label: '100', disabled: true },
]}
/>
<span>{activeLiquidationsStatistic?.value}</span>
<br />
    { activeLiquidationsStatistic?.value? <Pagination simple defaultCurrent={1} pageSize={firstLiquidation} onChange={handleChangeSkipLiquidation} total={Number(activeLiquidationsStatistic.value) } /> : <Loader/>}
    <br />
</Space> 

</Wrapper>
</>
  );
};


