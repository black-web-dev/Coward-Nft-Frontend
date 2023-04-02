import { createContext } from 'react';

const CowardContractContext = createContext({
  contract: null,
  isRandomNumber: false,
  currentRound: {
    roundId: null,
    deathPercent: null,
  },
  cowardAmount: null,
  totalAliveAmount: null,
  marsAmount: null,
  mainWinnerId: null,
  cowardWinnerId: null,
  cowardFinished: null,
  marsFinished: null,
  timeLineId: null,
  loadContract: (web: any, contract: any) => {},
});

export default CowardContractContext;
