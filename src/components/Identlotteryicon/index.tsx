import jazzicon from '@metamask/jazzicon'
import { useWeb3React } from '@web3-react/core'
// import useENSAvatar from 'hooks/useENSAvatar'
import { useLayoutEffect, useMemo, useRef } from 'react'
import styled from 'styled-components/macro'
import LotteriesImg from '../../assets/svg/Lotteries-bg.svg'


const StyledIdenticon = styled.div`
  height: 266px;
  width: 262px;

  margin: auto;
  margin-top: 40px;
  display: inline-block;
  // background-color: #C3B3F9;
  font-size: initial;
  background-size: cover;
  background-image: url(${LotteriesImg});
   padding: 30px;
    div{
      border-radius: 0px;
   
  }
`

// const StyledAvatar = styled.img`
//   height: inherit;
//   width: inherit;
//   border-radius: inherit;
// `

export default function IdentLotteryicon() {
  const { account } = useWeb3React()
  // const { avatar } = useENSAvatar(account ?? undefined)
  // const [fetchable, setFetchable] = useState(true)
  const icon = useMemo(() => account && jazzicon(200, parseInt(account.slice(2, 10), 16)), [account])
  const iconRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const current = iconRef.current
    if (icon) {
      current?.appendChild(icon)
      return () => {
        try {
          current?.removeChild(icon)
        } catch (e) {
          console.error('Avatar icon not found')
        }
      }
    }
    return
  }, [icon, iconRef])
  console.log(icon)

  return (
    <StyledIdenticon >
      {/* {avatar && fetchable ? (
        <StyledAvatar alt="avatar" src={avatar} onError={() => setFetchable(false)}></StyledAvatar>
      ) : ( */}
      {/* )} */}
      <div ref={iconRef}>

      </div>
    </StyledIdenticon>
  )
}
