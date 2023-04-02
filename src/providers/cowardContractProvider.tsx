import { useState } from 'react';
import CowardContractContext from '@/context/cowardContractContext';

export const LOAD_CONTRACT = 'LOAD_CONTRACT';

const defaultState = {
    contract: null,
    isRandomNumber: false,
    currentRound: null,
    cowardAmount: null,
    marsAmount: null,
    mainWinnerId: null,
    cowardWinnerId: null,
    totalAliveAmount: null,
    cowardFinished: null,
    marsFinished: null,
    timeLineId: null
}

const CowardContractProvider = (props: any) => {
    const [state, setState] = useState<any>(defaultState)

    const loadContractHandler = async (_web3: any, _contract: any) => {
        let contract,
            isRandomNumber = false,
            currentRoundId = 0,
            roundDetail,
            cowardAmount = 0,
            marsAmount = 0,
            mainWinnerId = 0,
            cowardWinnerId = 0,
            totalAliveAmount = 0,
            cowardFinished = false,
            marsFinished = false,
            timeLineId = 0;

        try {
            contract = new _web3.eth.Contract(_contract.abi, _contract.address);
            isRandomNumber = await contract.methods.isRandomNumber().call();
            currentRoundId = await contract.methods.currentRoundId().call();
            roundDetail = await contract.methods.rounds(currentRoundId).call();
            cowardAmount = await contract.methods.fetchCowardAmount().call();
            marsAmount = await contract.methods.fetchMarsAmount().call();
            mainWinnerId = await contract.methods.MainWinner().call();
            cowardWinnerId = await contract.methods.CowardWinner().call();
            totalAliveAmount = await contract.methods.fetchTotalAliveAmount().call();
            cowardFinished = await contract.methods.CowardFinished().call();
            marsFinished = await contract.methods.MarsFinished().call();
            timeLineId = await contract.methods.TimeLineID().call();

            setState({
                contract,
                isRandomNumber,
                currentRound: {
                    roundId: currentRoundId,
                    deathPercent: roundDetail.deathPercent
                },
                cowardAmount,
                marsAmount,
                mainWinnerId,
                cowardWinnerId,
                totalAliveAmount,
                cowardFinished,
                marsFinished,
                timeLineId
            });
            return contract;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    let cowardContractContext = {
        contract: state.contract,
        isRandomNumber: state.isRandomNumber,
        currentRound: state.currentRound,
        cowardAmount: state.cowardAmount,
        marsAmount: state.marsAmount,
        mainWinnerId: state.mainWinnerId,
        cowardWinnerId: state.cowardWinnerId,
        totalAliveAmount: state.totalAliveAmount,
        cowardFinished: state.cowardFinished,
        marsFinished: state.marsFinished,
        timeLineId: state.timeLineId,
        loadContract: loadContractHandler,
    }

    return (
        <CowardContractContext.Provider value={cowardContractContext}>
            {props.children}
        </CowardContractContext.Provider>
    )
}

export default CowardContractProvider;