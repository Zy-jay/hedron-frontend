
import styled, { keyframes } from 'styled-components/macro'
import Background from '../../assets/svg/Background.svg'

import Left from '../../assets/svg/left.svg'
import Right from '../../assets/svg/right.svg'
import { Footer } from 'components/Footer'

  import Carousel from 'nuka-carousel'
import  {Lottery}  from 'components/Lottery'
import { CSSProperties, useState } from 'react'
import { BUSD_TEST, LOTTERY_ADDRESS, MINI_CHADS_LOTTERY, WALES_ONLY_LOTTERY } from 'constants/addresses'
import { id } from 'make-plural'
import { useLotteryPrice } from 'hooks/useTicketsBalance'
    








const animWin = keyframes`
from {
    text-shadow: 4px -5px 0px #FEA623, 8px -12px 0px #F37A2D;
}
25%{
    text-shadow: 4px -9px 0px #FEA623, 14px -25px 0px #F37A2D;
}
50%{
    text-shadow: 4px -20px 0px #FEA623, 20px -40px 0px #F37A2D;
}
75%{
    text-shadow: 4px -9px 0px #FEA623, 14px -20px 0px #F37A2D;
to {
    text-shadow: 4px -5px 0px #FEA623, 8px -12px 0px #F37A2D;
}
`


const Wraper = styled.div`
width: 100%;
height: 100%;
text-align: center;  
padding: auto;
background: #1F0D35;
z-index: 0;
`
const HeaderBox = styled.div`
width: 100%;
top: 40px;
margin: auto;
display: flex;
height: 605px;
text-align: center;  
padding: auto;
background: #492E8B;
z-index: 0;
 text{
    font-family: 'Segoe UI';
    margin: auto;
    margin-top: 250px;
    max-width: 1440px;

    font-style: normal;
    font-weight: 700;
    font-size: 84.1416px;
    line-height: 112px;
    color: #FEBD23;
 }
 span{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 700;
    font-size: 102.508px;
    line-height: 136px;
    color: #FEBD23;
    -webkit-text-stroke: 1px #1F0D35;
    text-shadow: 4px -5px 0px #FEA623, 5px -6px 0px #1F0D35, 8px -12px 0px #F37A2D;
    :hover{
        position: relative;
        animation: 6s ${animWin} linear infinite;
        
    }
   
 }
`

const AppBody = styled.div`
width: 100%;
top: 40px;
height: fit-content;
text-align: center;  
padding: auto;
display: inline-flex;
grid-auto-flow: column;
  grid-gap: 50px;
min-height: 870px;
background: #1F0D35;
background-image: url(${Background});
z-index: 0;
img{
    padding: 10px 30px 10px 30px;

    cursor: pointer;

    :hover{
        scale: 1.1;
    }
    :active{
        scale: 0.98;
    }
}
`

interface DefaultControlsConfig {
    containerClassName?: string;
    nextButtonClassName?: string;
    nextButtonOnClick?: (event: React.MouseEvent) => void;
    nextButtonStyle?: CSSProperties;
    nextButtonText?: string;
    pagingDotsClassName?: string;
    pagingDotsContainerClassName?: string;
    pagingDotsOnClick?: (event: React.MouseEvent) => void;
    pagingDotsStyle?: CSSProperties;
    prevButtonClassName?: string;
    prevButtonOnClick?: (event: React.MouseEvent) => void;
    prevButtonStyle?: CSSProperties;
    prevButtonText?: string;
  }
  

function Lotteries() {

    
    //  const lotterys = useState([{ MINI_CHADS_LOTTERY,  WALES_ONLY_LOTTERY}  ]) 
    const defaultControlsConfig : DefaultControlsConfig ={
        nextButtonStyle: { display: "none"},
        prevButtonStyle: { display: "none"},
        prevButtonOnClick: ((event: React.MouseEvent<Element, MouseEvent>) => event) ,
        pagingDotsStyle: {
          fill: 'none'
        }
   }
   const [slideIndex, setSlideIndex] = useState(0)
 const prevSlide = () => {
    if(slideIndex>0)
    setSlideIndex(slideIndex-1)
    }
    const nextSlide = () => {
        if(slideIndex<1)
        setSlideIndex(slideIndex+1)
        }
      
    return (
   <>
   <Wraper>
   <HeaderBox>
    <text>Are you ready to <span>WIN ?</span></text>
   </HeaderBox>
   <AppBody> 
   <div style={{ margin: "auto", maxWidth: "1440px", width: "100%" }}>
    
   
   <Carousel slideIndex={slideIndex} defaultControlsConfig={defaultControlsConfig}  style={{width: "100%", margin: "auto", paddingBottom: "20px"}}>

   <Lottery lottery={WALES_ONLY_LOTTERY} />
   <Lottery lottery={MINI_CHADS_LOTTERY} />

 </Carousel>  
  <div style={{ margin: "auto", width: "fit-content", display: "grid", gridGap: '50px', right: '-45%', gridAutoFlow: 'column', position: "relative", left: "40%", top:"50px"}}>
    <img onClick={prevSlide} id="previousSlide"  src={Left} alt="" />
    <img onClick={nextSlide} src={Right} alt="" />
   </div>
</div> 

   </AppBody>
  <Footer/>
   </Wraper>
   </>  
    );
  }
  
  export default Lotteries;
