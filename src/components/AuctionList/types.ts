export interface AuctionHeaderProps {
  headers: string[];
}

export interface AuctionListProps {
  list: ActiveList[] | BorrowedList[];
}
export interface BaseList{
  stakeId: number;
  progress: number;
  stakedHex: number;
  stakedDays: number;
  stakeShares: string;
  hdrnBonus: number;
  mintableHdrn: number;
}

export interface BaseBorrowedHSIHEXStakesList {
  borrower: {
    id: string;
  };
  hexStake :{ 
  hdrnHsiAddress: string;
  hdrnLaunchBonus: string;
  hdrnMintedDays:  string;
  isGoodAccounted: boolean;
  stakeAmount: string;
  stakeId: string;
  stakeShares: string;
  stakeStartDay: string;
  stakedDays: string;
  __typename: string;
  };
  interestRate: number;
 
liquidationDay: string;
loanStartDay: string;
loanedDays: string;
paymentsMade: string;
__typename: string;
}

export interface ActiveList extends BaseList {
  address: string;
  startingBid: number;
  available: string;
  actions: () => void;
}

export interface BorrowedList extends BaseList {
  currentBidder: number;
  currentBid: number;
  auctionEnd: Date;
  actions: () => void;
}


export interface ActiveHSIHEXStakeAuctionsList  {
  id: string;
  loan: {
      hexStake: {
          stakeId: string
          hdrnHsiAddress: string
          stakeAmount: string
          stakedDays: string
          stakeShares: string
          stakeStartDay: string
          hdrnLaunchBonus: string
          hdrnMintedDays: string
          isGoodAccounted: boolean
          __typename: string
      }
      __typename: string
  }
  currentBid: string
  currentBidder: {
      id: string
      __typename: string
  }
  liquidationStart: string
  liquidationExtension: string | null
  __typename: string
}

export interface ActiveStatistic  {

    value: string
    __typename: string

}

export interface LoanLiquidateStart {

  address: string,
  blockNumber: number,
  transactionHash: string,
  transactionIndex: number,
  blockHash: string,
  logIndex: number,
  removed: false,
  id: string,
  returnValues: {
      0: string,
      1: string,
      2: string,
      3: string,
      data: string,
      borrower: string,
      stakeId: string,
      liquidationId: string
  },
  event: string,
  signature: string,
}