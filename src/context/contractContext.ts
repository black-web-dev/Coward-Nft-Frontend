import { createContext } from "react";

const ContractContext = createContext({
    contract: null,
    totalSupply: null,
    nftList: [],
    currentRound: {
        roundId: null,
        deathPercent: null,
    },
    isRandomNumber: null,
    isRevealed: null,
    winner: null,
    restAmount: null,
    loading: null,
    loadContract: (web: any, contract: any) => { },
    loadTotalSupply: (contract: any) => { },
    loadNftList: (contract: any) => { },
    loadCurrentRound: (contract: any) => { },
    loadIsRandomNumber: (contract: any) => { },
    loadIsRevealed: (contract: any) => { },
    loadWinner: (contract: any) => { },
    loadRestAmount: (contract: any) => { }
})

export default ContractContext;