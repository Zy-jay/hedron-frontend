import LotteriesImg from '../../assets/svg/Lotteries-bg.svg'
import Web3Status from '../Web3Status'

import styled from 'styled-components/macro'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from 'constants/chains'
import { useLotteryCurrentSupply, useLotteryEndTime, useLotteryMaxSupply, useLotteryPrice, useTicketsBalance } from 'hooks/useTicketsBalance'
import { WALES_ONLY_LOTTERY, MINI_CHADS_LOTTERY, BUSD_TEST } from 'constants/addresses'
import { useMemo, useCallback, useState, useEffect, CSSProperties} from 'react'
import { useModalIsOpen, useToggleBuyModal, useToggleModal, useToggleWalletModal } from 'state/application/hooks'
import { ApprovalState, useApproval } from '../../lib/hooks/useApproval'
import { useHasPendingApproval, useTransactionAdder } from '../../state/transactions/hooks'
import { useBayTicket } from 'hooks/useLotteryFunction'
import { getConnection } from 'connection/utils'
import { useAppDispatch } from 'state/hooks'
import { updateConnectionError } from 'state/connection/reducer'
import { switchChain } from 'utils/switchChain'
import { addPopup, ApplicationModal } from 'state/application/reducer'
import { Trans } from '@lingui/macro'
import { Button3dDark, Button3dOrange } from 'components/Button'
import Modal from 'components/Modal'
import { shortenAddress } from 'utils'
import Minus from '../../assets/svg/minus.svg'
import Plus from '../../assets/svg/plus.svg'
import CloseIcon from '../../assets/svg/close-icon.svg'


const LotteryBoxWraper = styled.div`
width: 480px;
margin: auto;
height: 685px;
text-align: center;  
padding: auto;
background-size: cover;
display: block;

background-repeat: no-repeat;
background-position: top;
background-image: url(${LotteriesImg});
z-index: 0;
`

const LotteryInfo = styled.div`
width: fit-content;
margin: auto;
max-height: 680px;
max-width: 580px;
height: 100%;
text-align: start;  
padding: auto;
display: grid;
display: grid;
grid-gap: 5%;
z-index: 0;

text{
    font-family: 'Segoe UI';
font-style: normal;
font-weight: 700;
font-size: 60.9183px;
line-height: 81px;
color: #FEBD23;

}
span{
    font-family: 'Segoe UI';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 26px;
color: #FEBD23;
}

`


const CardValue = styled.div`
width: 100%;
height: 100%;
text-align: center;  
padding: 0px 0px 0px 0px;
text-align: center;  
display: block;
max-height: 89px;
max-width: 157px;
// min-height: 89px;
// min-width: 89px;
margin: auto;
background: #F37A2D;
z-index: 5;
span{
    font-family: 'Segoe UI';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 18px;
color: #FFFFFF;
margin-bottom: 10px;
text-align: center;
display: block;
padding: 15px 0px 0px 0px;
p{
    font-family: 'Segoe UI';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 18px;
color: #FFFFFF;
}

}
`
const LotteryBody = styled.div`
width: 100%;
height: 100%;
padding: 0px 0px 0px 0px;
text-align: center;  
display: grid;
grid-auto-flow: column;
grid-gap: 2%;
`
const WraperContent = styled.div`
width: 380px;
height: max-content;
padding: 0px 0px 0px 0px;
text-align: center;  
display: block;
margin: auto;
margin-top: 35px;
// grid-auto-flow: column;
// grid-gap: 5%;
span{
    font-family: Segoe UI;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 28px;
cursor: pointer;


color: rgba(254, 189, 35, 0.64);
}
h1{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 45px;
    line-height: 60px;
    color: #FEBD23; 
    margin: auto;
    cursor: pointer;
}
h2{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
    color: #FEBD23; 
    margin: auto;
}
img{
    margin: auto;
    padding: 20px 0px 20px 0px;
:hover{
    scale: 1.1;
    cursor: pointer;
}
:active{
    scale: 1;

}
}

`

export  const Lottery = (props: any) => {
    const lotteryAddress = props.lottery
  

    console.log(props.lottery)

    const  [ticketAmount, setTicketAmount]  = useState(1);
    
        
    const  price = Number(useLotteryPrice(lotteryAddress)) / 10 ** 18;
    const  totalAmount =  ticketAmount * price
    const currentSupply = useLotteryCurrentSupply(lotteryAddress)
    const maxSupply  = useLotteryMaxSupply(lotteryAddress);
    const plusTicket = () => {
        if(ticketAmount < Number(maxSupply) - Number(currentSupply)){
            setTicketAmount(ticketAmount + 1)
        }
        }
        const minusTicket = () => {
            if(ticketAmount > 1){
                setTicketAmount(ticketAmount - 1)
            }
            }
    const lotteryEndTime  = Number(useLotteryEndTime(lotteryAddress)) * 1000;
   const lotteryEndTimeFormated = lotteryEndTime?   new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(lotteryEndTime) : undefined
   const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

    const [approvalState, approveCallback] = useApproval(totalAmount, lotteryAddress, useHasPendingApproval)
    const handleApprove = useCallback(async () => {
         
          await approveCallback()

        }, [approveCallback])

        useEffect(() => {
            if (approvalState === ApprovalState.PENDING) {
              setApprovalSubmitted(true)
            }
          }, [approvalState, approvalSubmitted])
        
    const { account, chainId, connector } = useWeb3React()

    const ticketsBalance = useTicketsBalance(lotteryAddress, account )
    const [balanceBusd, useBayTicketCallback] = useBayTicket(
        ticketAmount,
        totalAmount,
        BUSD_TEST,
        lotteryAddress,
      );
    
    const approveTokenButtonDisabled =
    approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted 
    const dispatch = useAppDispatch()
    const onSelectChain = useCallback(
        async () => {
          if (!connector) return
    
          const connectionType = getConnection(connector).type
    
          try {
            dispatch(updateConnectionError({ connectionType, error: undefined }))
            await switchChain(connector, SupportedChainId.BSCTN)
          } catch (error) {
            console.error('Failed to switch networks', error)
    
            dispatch(updateConnectionError({ connectionType, error: error.message }))
            dispatch(addPopup({ content: { failedSwitchNetwork: SupportedChainId.BSCTN }, key: `failed-network-switch` }))
    
            // If we activate a chain and it fails, reset the query param to the current chainId
          }
    
        },
        [connector, dispatch]
       )
       const walletModalOpen = useModalIsOpen(ApplicationModal.WALLET)
        const toggleWalletModal = useToggleWalletModal()
       const bayModalOpen = useModalIsOpen(ApplicationModal.BUY)
    //    const toggleBuyModal = useToggleModal(ApplicationModal.BUY)

       const [isOpen, setIsOpen]  = useState(false)
       const toggleBuyModal = () => {
        if (isOpen===true){
        setIsOpen(false)
        setTicketAmount(1)
       }else{
        setIsOpen(true)
       }
    }
    
    const userAvatar = "https://avatars.dicebear.com/api/pixel-art/:" + account + ".svg"
    const lotteryIcon = "https://avatars.dicebear.com/api/identicon/:" + lotteryAddress + ".svg?colors=orange,purple,yellow"

   return(
  <LotteryBody>
   <LotteryBoxWraper>
  <img src={lotteryIcon} width={"300px"} style={{position: "relative", top: "30%"}} alt="" />
   </LotteryBoxWraper>
 
 

   <LotteryInfo>
      <text>Lotteri Type</text>
      <span>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </span>
   <div style={{ margin: "auto", width: "100%", display: "inline-flex", gridGap: '5%', gridAutoFlow: 'column' }}>
   <CardValue> <span> <Trans>  End data</Trans><p> {lotteryEndTimeFormated}</p> </span>   </CardValue>
   <CardValue><span> <Trans>  Total NFT Tickets</Trans><p>{currentSupply + "/" + maxSupply} 🎫</p></span>    </CardValue>
   <CardValue><span> <Trans> Price</Trans><p> {price + " "} BUSD</p></span>  </CardValue>
   </div> 
   
   <span> Remain Tickets: {ticketsBalance} 🎫 </span>
   <div style={{ margin: "auto", width: "100%", display: "grid", gridGap: '5%', gridAutoFlow: 'column' }}>
  
  
   {!account? 
   <>
   <Button3dOrange width={"550px"}
                   onClick={toggleWalletModal}>
                
  <Trans>CONNECT WALLET</Trans>
  </Button3dOrange> 
  <Web3Status/>
   </>
   :
   chainId !== SupportedChainId.BSCTN ? (
       <>
        <Button3dOrange width={"550px"}
        onClick={onSelectChain}>
          <Trans>BSC</Trans>
          </Button3dOrange>
          </>
     ) : 
      <>
  
    
     <Button3dOrange width={"230px"}
     onClick={toggleBuyModal}>
           <Trans>BUY TICKET</Trans>
     </Button3dOrange>
  
  
  <Button3dDark  width={"230px"}>
  <Trans>MY HISTORY</Trans>
  </Button3dDark>
  <Web3Status/>
   </>
   }
   </div>
   
   </LotteryInfo>
   <Modal isOpen={isOpen} onDismiss={toggleBuyModal} minHeight={false} maxHeight={700} maxWidth={680}>
    
    <div style={{width: "680px", background: "#492E8B", height: "540px" }} >
        <div style={{width: "95%", textAlign: "end", marginTop: "30px" }}>
        <img src={CloseIcon} onClick={toggleBuyModal} style={{cursor: "pointer"}} alt="" />

        </div>
        <WraperContent>
      <text style={{ fontWeight: "400", fontSize: "79px", lineHeight: "51px", color: "#FEBD23", WebkitTextStroke: "1px #1F0D35"}}>TICKETS</text> 
    </WraperContent>
    <WraperContent style={{textAlign: "start"}}>
        <span onClick={toggleWalletModal} > <img src={userAvatar} alt="" width={"50px"} style={{padding: "0 0 0 0"}} /> {account? shortenAddress(account): "Wallet adress" }</span>
    </WraperContent>
    <WraperContent style={{textAlign: "end", marginTop: "20px"}}>
        <span style={{fontSize: "17px", lineHeight: "20px"}}>Purchased</span>
    </WraperContent>
    <WraperContent style={{marginTop: "2px"}}>
        <div style={{width: "380px", margin: "auto", display: "inline-grid", gridAutoFlow: "column", gap: "20px"}}>
        <div style={{width: "280px", height: "80px", display: "inline-grid", gridAutoFlow: "column", background: "#1F0D35", }}>
            <img src={Minus} onClick={minusTicket}  style={{margin: "auto"}} alt="" />
            <h1 onClick={()=>setTicketAmount(1)} >{ticketAmount}</h1>
            <img src={Plus} onClick={plusTicket}  alt="" />
         </div>
         <div style={{width: "80px", height: "80px", display: "flex", background: "#1F0D35"}}>
            <h2 >{ticketsBalance}</h2>
         </div>
         </div>
    </WraperContent> 
    { approvalState === ApprovalState.APPROVED?  
    <Button3dOrange style={{margin: "auto", marginTop: "55px"}} width={"230px"}
                   onClick={useBayTicketCallback}>           
  <Trans>BUY</Trans>
  </Button3dOrange> 
  :
  <Button3dOrange width={"230px"}
  onClick={handleApprove}
  altDisabledStyle={approveTokenButtonDisabled}>
    <Trans>Approve BUSD</Trans>
  </Button3dOrange>
}
    </div>
    </Modal>
  </LotteryBody>
   )

  }
  
