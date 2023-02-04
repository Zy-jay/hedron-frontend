import { Button3dDark, Button3dOrange, Button3dPurp } from 'components/Button';
import styled from 'styled-components/macro'
import Background from '../../assets/svg/Background.svg'
import BackgroundRoadMap from '../../assets/svg/Pixel-bg.svg'
import PsFinanceImg from "../../assets/svg/ps_finance_text.svg"
import assetImg from "../../assets/svg/Coin-orbit.svg"
import { Trans } from '@lingui/macro'
import BorderWrapImg from '../../assets/svg/Border_Benefits.svg'
import RoadmapImg from '../../assets/svg/Roadmap_img.svg'
import { Grid } from 'react-feather';
import IdentLotteryicon from '../../components/Identlotteryicon'
import { Trace } from 'components/AmplitudeAnalytics/Trace'
import { PageName } from 'components/AmplitudeAnalytics/constants'
import { Footer } from 'components/Footer';
import { useLotteryCurrentSupply, useLotteryMaxSupply, useLotteryPrice } from 'hooks/useTicketsBalance';
import { MINI_CHADS_LOTTERY, WALES_ONLY_LOTTERY } from 'constants/addresses';
import { NavLink } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import LotteriesImg from "../../assets/svg/lottery-wraper.svg"










const Wraper = styled.div`
width: 100%;
position: relative;
top: 40px;
height: 835px;
text-align: center;  
padding: auto;
background: #1F0D35;
background-image: url(${Background});
background-repeat: repeat;
z-index: 0;
`

const OfferWrap = styled.div`
width: 100%;
height: 686px;
max-width: 1440px;
margin: auto;

z-index: 0;
padding-top: 0px;
text-align: start;
display: grid;
grid-auto-flow: column;
`

const ButtonBox = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 2px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 50px;
  margin-top: 290px;
  margin-left: 236px;

  align-items: end;
`
const TextOffer = styled.text`
font-style: normal;
font-weight: 400;
font-size: 115.974px;
line-height: 75px;
z-index: 10;
color: #FEBD23;
margin: auto; 
-webkit-text-stroke: 3px #1F0D35;

`

const TextSegoe = styled.text`
font-style: normal;
font-weight: 400;
font-size: 115.974px;
line-height: 75px;
z-index: 10;
color: #FEBD23;
margin: auto; 
`

const BoxOffer = styled.div`
width: 60%;
display: grid;
padding: auto;
z-index: 0;
text-align: start;
padding-top: 200px;
`
const AboutBox = styled.div`
width: 100%;
margin-top: 75px;
height: fit-content;
text-align: center;
padding: 20px;
padding-top: 30px;
grid-auto-flow: column;
  grid-gap: 50px;
background: #FEBD23;
color: #1F0D35;
z-index: 0;
`

const BenefitsWraper= styled.div`
width: 100%;
height: 3977px;
display: grid;
padding: auto;
z-index: 0;
text-align: start;
background: #492E8B;
`
const TextBox= styled.div`
width: 452px;
height: none;
display: grid;
grid-auto-flow: column;
padding: 0;
z-index: 0;
color: #FFFFFF;
text-align: start;
font-family: 'Segoe UI';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 48px;
`

const BenefitBorderBox = styled.div`
width: 285px;
position: relative;
height: 292px;
text-align: center;  
padding: 0;
margin: auto;
// background: #1F0D35;
background-image: url(${BorderWrapImg});
background-repeat: no-repeat;
z-index: 0;
`

const LotteriesBox = styled.div`
width: 380px;
max-width: 380px;
position: relative;
height: 685px;
text-align: center;  
padding: 0;
margin: auto;

background: #1F0D35;
z-index: 0;
`

const RoadmapWraper= styled.div`
width: 100%;
height: 250px;
display: grid;
grid-auto-flow: column;
padding: 0px;
margin: "auto";
z-index: 0;
text-align: start;
background-color: #FEBD23;
background-repeat: no-repeat;
background-position: bottom;
background-size: 100%;
`

const RoadmapBg= styled.div`
width: 100%;
height: 800px;
display: block;
position: relative;
padding: 0px;
margin: 0px;
z-index: 0;
background-color: #FEBD23;
background-image: url(${BackgroundRoadMap});
background-repeat: no-repeat;
background-position: bottom;
background-size: 100%;
`
const FooterWraper= styled.div`
width: 100%;
height: 490px;
display: inline-flex;
padding: 0px;
padding: 0px;
margin: 0px;
z-index: 0;
position: relative;
top: -2px;
text-align: start;
background-color: #1F0D35;
// background-image: url(${BackgroundRoadMap});
// background-repeat: no-repeat;
// background-position: bottom;
`

const SocialLink= styled.div`
width: 310px;
height: 160px; 
text-align: center;

img{
  :hover{
    cursor: pointer;
    scale: 1.1;
    position: relative;
    top: -5px;
  }
  :active{
    scale: 1;
    top: 0px;
  }
}
`
const StyledIdenticon = styled.div`
  height: 266px;
  width: 262px;

  margin: auto;
  margin-top: 40px;
  display: block;
  // background-color: #C3B3F9;
  font-size: initial;
  background-size: cover;
  background-image: url(${LotteriesImg});
   padding: 30px;
    div{
      border-radius: 0px;
   
  }
`

export function Lotteries(LotteryAddress: any){
  const  lotteryPrice = Number(useLotteryPrice(LotteryAddress.LotteryAddress)) / 10 ** 18;
  const maxSupply  = useLotteryMaxSupply(LotteryAddress.LotteryAddress);
  const currentSupply = useLotteryCurrentSupply(LotteryAddress.LotteryAddress)
  let svg = createAvatar(style, {
    seed: LotteryAddress.LotteryAddress,
    // ... and other options
  });
  const LotteryIcon = "https://avatars.dicebear.com/api/identicon/:"+ LotteryAddress.LotteryAddress +".svg?colors=orange,purple,yellow"

  return(
    <LotteriesBox>
    
    <div style={{ width: "100%",  margin: "auto", padding: "0px 0px 0 0px", display: "block", textAlign: "center", position: "static", justifyContent: "space-between" }}>
   <StyledIdenticon> <img src={LotteryIcon} width={"200px"} height={"170px"} style={{margin: "auto", position: "relative", top: "30px"}}/>
    </StyledIdenticon>
    <div style={{ width: "288px",  margin: "auto", padding: "35px 0px 0 0px", display: "block", textAlign: "center", position: "relative", justifyContent: "space-between" }}>
   <TextBox>
     <Trans>
       Name 3
     </Trans>
   </TextBox> 
     <LotteriesBox style={{background: "none", width: "none", height: "fit-content", display: "inline-flex", position: "relative"}}>
   <div style={{ width: "fit-content", height: "min-content",  margin: "0", padding: "0px 0px 0 60px", display: "block", textAlign: "center", position: "relative", justifyContent: "space-between" }}>

   <TextBox style={{ fontSize: "17px", fontWeight: "400", lineHeight: "23px", marginTop: "38px", height: "none", width: "fit-content"}}>
     <Trans>
       Tickets
     </Trans>
   </TextBox>
   <TextBox style={{ fontSize: "17px", fontWeight: "600", lineHeight: "23px", color: "#FEBD23", marginTop: "13px", width: "fit-content"  }}>
      {currentSupply + "/" + maxSupply}
   </TextBox>
   </div>
   <div style={{ width: "100%", height: "min-content",  margin: "auto", padding: "0px 0px 0px 66px", display: "block", textAlign: "center", position: "relative", justifyContent: "space-between" }}>

<TextBox style={{ fontSize: "17px", fontWeight: "400", lineHeight: "23px", marginTop: "38px", height: "none", width: "fit-content"  }}>
  <Trans>
    Price
  </Trans>
</TextBox>
<TextBox style={{ fontSize: "17px", fontWeight: "600", lineHeight: "23px", color: "#FEBD23", marginTop: "13px",  width: "fit-content" }}>
    {lotteryPrice + " "} BUSD
</TextBox>
</div>
   </LotteriesBox>
   
    </div>
    </div>
    <div style={{width: "100%", display: "block", height: 'fit-content', position: "relative", textAlign: "center", marginTop: "45px" }}>
    <NavLink style={{textDecoration: "none"}} to={"/lotteries"}>
    <Button3dOrange style={{width: "196px", height: "48px", position: "relative", margin: "auto"}}>
       <Trans> READ MORE </Trans>
    </Button3dOrange>
    </NavLink>
    </div>
    </LotteriesBox>
  )
}


function Lending() {
    return (
      <Trace page={PageName.HOME_PAGE} shouldLogImpression>
        <Wraper id="home-page">
       
       {/* <Button3dOrange> WIN </Button3dOrange>
       <Button3dDark> WIN</Button3dDark>
       <Button3dPurp> WIN </Button3dPurp> */}
       
       <OfferWrap>
       

       
       <BoxOffer>
       <TextOffer><Trans>OFFER</Trans></TextOffer>
         <ButtonBox>
         <Link style={{textDecoration: "none"}} to={"#lotteries"}>
       <Button3dOrange width={"238px"} height={"58px"}> 
       <Trans>SHOU LOTTERISE</Trans> 
       </Button3dOrange>
        </Link>
       <NavLink style={{textDecoration: "none"}} to={"/lotteries"}>
       <Button3dDark width={"238px"} height={"58px"}> 
       <Trans>BUY A TICKET</Trans>
       </Button3dDark>
       </NavLink>
       </ButtonBox>   
       </BoxOffer>

     <img src={assetImg} width={"500px"} style={{marginRight: "107px", marginTop: "240px", pointerEvents: "none" }} alt="" />
        {/* <PsLoader/> */}
       </OfferWrap>
       <div id='about' style={{ display:'flex', position: "absolute", padding: "70px"  }}></div>
       <AboutBox > 
        <div style={{display: "grid", gridAutoFlow: "column", gridGap: "20px" , width: "fit-content", maxWidth: "1440px", margin: "auto"}}>
        <div style={{display: "grid", textAlign: "start"}}>
       <TextOffer style={{color: "#1F0D35"}}><Trans>HOW</Trans></TextOffer>
       <TextSegoe style={{color: "#1F0D35", fontFamily: 'Segoe UI', fontStyle: "normal", fontWeight: "400", fontSize: "51px", lineHeight: "68px", WebkitTextStroke: "none"}}>
        it Works?</TextSegoe>
       </div> 
       <div style={{display: "grid", gridAutoFlow: "column", gridGap: "10px", width: "fit-content"}}>

       <div style={{ background: "#1F0D35", borderRadius: "50%", width: "59px", height: "59px", color: "#FEBD23", fontWeight: "400", fontSize: "46px", lineHeight: "55px", padding: "auto",  margin: "50px 5px 0px 30px" }}>
        1</div>
       <TextSegoe style={{color: "#1F0D35", fontFamily: 'Segoe UI', fontStyle: "normal", fontWeight: "400", fontSize: "29px", lineHeight: "25px", width: "145px", margin: "50px 0 0 0", textAlign: "start"}}>
       <Trans>Connect your wallet</Trans></TextSegoe>
      </div>
       <div style={{display: "grid", gridAutoFlow: "column", gridGap: "10px", width: "fit-content"}}>
       <div style={{ background: "#1F0D35", borderRadius: "50%", width: "59px", height: "59px", color: "#FEBD23", fontWeight: "400", fontSize: "46px", lineHeight: "55px", padding: "auto" , margin: "50px 5px 0px 30px" }}>
        2</div>
       <TextSegoe style={{color: "#1F0D35", fontFamily: 'Segoe UI', fontStyle: "normal", fontWeight: "400", fontSize: "29px", lineHeight: "25px", width: "145px", margin: "50px 0 0 0", textAlign: "start"}}>
       <Trans>Buy a ticket</Trans></TextSegoe>
       </div>
       <div style={{display: "grid", gridAutoFlow: "column", gridGap: "10px", width: "fit-content"}}>
       <div style={{ background: "#1F0D35", borderRadius: "50%", width: "59px", height: "59px", color: "#FEBD23", fontWeight: "400", fontSize: "46px", lineHeight: "55px", padding: "auto" , margin: "50px 5px 0px 30px" }}>
        3</div>
       <TextSegoe style={{color: "#1F0D35", fontFamily: 'Segoe UI', fontStyle: "normal", fontWeight: "400", fontSize: "29px", lineHeight: "25px", width: "145px", margin: "50px 0px 0px 0", textAlign: "start"}}>
       <Trans> Wait for a win</Trans></TextSegoe>
       </div>
       </div>
       </AboutBox>
       <BenefitsWraper>
       <img src={PsFinanceImg} width={"80%"} style={{margin: "auto", marginTop: "170px", pointerEvents: "none", maxWidth: "1209px"}} alt="" />
       <div style={{ margin: "auto", textAlign: "center", width: "100%", display: "grid", gridAutoFlow: "column", position: "relative" }}>
        <div style={{ width: "fit-content", margin: "auto", display: "-webkit-inline-box", textAlign: "start", position: "relative" }}>
       <TextBox><Trans>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Trans></TextBox>
       <TextBox style={{marginLeft: "48px"}}><Trans>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Trans></TextBox>
        </div>
         </div>
         <TextOffer  style={{ fontSize: "84px", lineHeight: '54px', width: "100%", maxWidth: "1190px", margin: "auto" }}>
        <div id='benefits' style={{ display:'flex', position: "relative", padding: "60px"  }}></div>
         <Trans>BENEFITS</Trans>
         </TextOffer>
         
         <div style={{ width: "100%", maxWidth: '1190px',  margin: "auto", padding: "0px 0px 0 0px", display: "inline-flex", textAlign: "center", position: "relative", justifyContent: "space-between" }}>
         
         <BenefitBorderBox>

         </BenefitBorderBox>
         <BenefitBorderBox>
            
            </BenefitBorderBox>
            <BenefitBorderBox>
            
            </BenefitBorderBox> 
            <BenefitBorderBox>
            
            </BenefitBorderBox>
         </div>
         <TextOffer style={{ fontSize: "84px", lineHeight: '54px', margin: "auto" }}>
         <div id='roadmap' style={{ display:'flex', position: "relative", padding: "60px"  }}></div>
         ROADMAP
         </TextOffer>
         <img src={RoadmapImg} width={"80%"} style={{margin: "auto", marginTop: "2px", pointerEvents: "none", maxWidth: "968px"}} alt="" />
         <TextOffer style={{ fontSize: "84px", lineHeight: '54px', width: "100%", maxWidth: "1190px", margin: "auto" }}>
         <div id='lotteries' style={{ display:'flex', position: "relative", padding: "60px"  }}></div>
         <Trans>LOTTERIES</Trans>
         </TextOffer>
         <div style={{ width: "100%", maxWidth: '1140px',  margin: "auto", padding: "0px 0px 0 0px", display: "inline-grid", gridAutoFlow: "column", gridGap: "20px",  textAlign: "center", position: "relative", justifyContent: "space-between" }}>
         <Lotteries LotteryAddress={WALES_ONLY_LOTTERY}/>
         <Lotteries LotteryAddress={MINI_CHADS_LOTTERY}/>

         </div>
       </BenefitsWraper>
       <div id='whitepaper' style={{ display:'flex', position: "absolute", padding: "50px", margin: "auto"  }}></div>
       <RoadmapWraper>
       <div style={{ width: "fit-content", maxWidth: '1140px', display: "block", color: "#1F0D35", fontFamily: 'Segoe UI', fontSize: "40px", fontWeight: "700", margin: "auto" }}>
     <span  style={{ width: "fit-content", display: "block", color: "#1F0D35", fontFamily: 'Segoe UI', fontSize: "71px", fontWeight: "700",  margin: "auto", lineHeight: "5px", height: "fit-content"}}> Do you want to <p></p> know more?</span>
     </div>
     <Button3dOrange width={"238px"} height={"58px"} style={{margin: "auto"}}> <Trans>GET WHITEPAPER</Trans> </Button3dOrange> 

       </RoadmapWraper>
       <RoadmapBg>
        
       </RoadmapBg>
     <Footer/>
       
       </Wraper>
       </Trace>
    )
}

export default Lending;