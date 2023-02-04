import Loader from "components/Loader";
import { HEDRON_ADDRESS, HEX_ADDRESS } from "constants/addresses";
import { useBalance } from "lib/hooks/useCurrency";
import { ItemBalance, Wrapper } from "./styles";
import hexImg from "../../assets/images/hex-img.png"
import hdrnImg from "../../assets/images/hdron-img.png"
import { useHexGlobalInfo } from "hooks/useHexContractFunctions";

 export  const BalancePanel = ()=> {

    const hexBalance = useBalance(HEX_ADDRESS)
    const hdrnBalance = useBalance(HEDRON_ADDRESS)
    const hexSharePrice = useHexGlobalInfo()




    return(
     <Wrapper>
        <ItemBalance>
         <img src={hexImg} width={56} alt="" />
         <span>{hexBalance? (Number(hexBalance)/ 10 ** 8).toFixed(2) + " HEX" : <Loader/>}</span>
        </ItemBalance>
        <ItemBalance>
        <img src={hexImg} width={56} alt="" />
        <span>{hexSharePrice? Number(hexSharePrice).toFixed(1) + " HEX" : <Loader/>}</span>
        </ItemBalance>
        <ItemBalance>
        <img src={hdrnImg} width={56} alt="" />
        <span>{hdrnBalance? (Number(hdrnBalance) / 10 ** 9).toFixed(1) + " HDRN" : <Loader/>}</span>
        </ItemBalance>
        <ItemBalance>
        <img src={hdrnImg} width={56} alt="" />
        <span>0x</span>

        </ItemBalance>

     </Wrapper>

    )

}


