import styled, { keyframes } from 'styled-components/macro'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledSVG = styled.svg<{ size: string; stroke?: string }>`
  animation: 2s ${rotate} linear infinite;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  path {
    stroke: ${({ stroke, theme }) => stroke ?? theme.deprecated_primary1};
  }
`


const rotate0 = keyframes`
from {
  transform:  scale(0.6);
  opacity: 1;
}
10%{
  transform:  scale(0.8);
  opacity: 1;
}
25%{
  transform:  scale(0.9);
  opacity: 1;
}
50%{
  transform:  scale(1);
  opacity: 1;
}
75%{
transform:  scale(1.1);
opacity: 0.5;
}

to {
  transform:  scale(1.24);
  opacity: 0;
}
`

const MultiCirclesEL0 = styled.div`
 
border-radius: 50%;
border: 1px solid #1F0D35;
width: 100px;
height: 100px;
text-align: center;
justify-content: space-between;
position: relative;
left: 43px;
top: -110px;
animation: 0.7s ${rotate0} linear infinite;

`
const MultiCirclesEL1 = styled.div`
display: block;
position: relative;
top: 15%;

border: 1px solid #1F0D35;
border-radius: 50%;
margin: auto;
width:70%;
height: 70%;



`
const MultiCirclesEL2 = styled.div`
 width:70%;
  height: 70%;
  margin: auto;
  border: 1px solid #1F0D35;
  border-radius: 50%;
  top: 15%;
  display: block;
 position: relative;


`

const MultiCirclesEL3 = styled.div`
width:70%;
height: 70%;
margin: auto;
border: 1px solid #1F0D35;
border-radius: 50%;
top: 15%;
display: block;
position: relative;



`
const MultiCirclesEL4 = styled.div`
width:70%;
height: 70%;
margin: auto;
border: 2px solid #1F0D35;
border-radius: 50%;
top: 15%;
display: block;
position: relative;

`
const WraperLogoPSfinance = styled.div`
width: auto;
height: auto;
padding: 20px;

`

const LogoPSfinance = styled.div`
width: 180px;
height: 140px;
padding: none;
background-color: #1F0D35;
z-index: 0;
font-size: 100px;
font-style: oblique;
position: absolute;
color: #FEBD23;
text-align: center;
font-family: "Segoe UI";
font-weight: 800;
margin: auto;
left: 40%;
top: 40%;
text-transform: uppercase;

`
const TextLogo = styled.div`
text-align: center;
width: 110%;
height: 150%;
font-weight: bold;
position: relative;
top: -140px;
font-size: 100px;
font-style: oblique;
line-height: 150px;
text-transform: uppercase;
background: #000;
color: #FFF;
mix-blend-mode: multiply;         
`

export function MultiCircles(){
return(
  <MultiCirclesEL0>
    <MultiCirclesEL1 >
      <MultiCirclesEL2 >
        <MultiCirclesEL3 >
          {/* <MultiCirclesEL4 >

          </MultiCirclesEL4> */}
        </MultiCirclesEL3>
      </MultiCirclesEL2>
    </MultiCirclesEL1>
  </MultiCirclesEL0>
)
}

export function PsLoader(){
  return(
    <WraperLogoPSfinance>
    <LogoPSfinance>
      PS
      <MultiCircles />
        {/* <TextLogo>
          PS
        </TextLogo> */}
      
    </LogoPSfinance>
    </WraperLogoPSfinance>
  )
  }




/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export default function Loader({
  size = '16px',
  stroke,
  ...rest
}: {
  size?: string
  stroke?: string
  [k: string]: any
}) {
  return (
    <StyledSVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size={size} stroke={stroke} {...rest}>
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSVG>
  )
}
