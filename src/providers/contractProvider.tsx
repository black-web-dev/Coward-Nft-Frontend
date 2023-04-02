import { useReducer } from 'react';
import ContractContext from '@/context/contractContext';
import Config from '@/config/app';

export const LOAD_CONTRACT = 'LOAD_CONTRACT';
export const LOAD_TOTALSUPPLY = 'LOAD_TOTALSUPPLY';
export const LOAD_NFTLIST = 'LOAD_NFTLIST';
export const LOAD_CURRENTROUND = 'LOAD_CURRENTROUND';
export const LOAD_ISRANDOMNUMBER = 'LOAD_ISRANDOMNUMBER';
export const LOAD_ISREVEALED = 'LOAD_ISREVEALED';
export const LOAD_WINNER = 'LOAD_WINNER';
export const LOAD_RESTAMOUNT = 'LOAD_RESTAMOUNT';
export const LOAD_LOADING = 'LOAD_LOADING';

const defaultState = {
    contract: null,
    totalSupply: null,
    nftList: [],
    currentRound: null,
    isRandomNumber: null,
    isRevealed: null,
    winner: null,
    restAmount: null,
    loading: null,
}

const reducer = (state: any, action: any) => {
    if (action.type === LOAD_CONTRACT) {
        return {
            contract: action.contract,
            totalSupply: state.totalSupply,
            nftList: state.nftList,
            currentRound: state.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: state.winner,
            restAmount: state.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_TOTALSUPPLY) {
        return {
            contract: state.contract,
            totalSupply: action.totalSupply,
            nftList: state.nftList,
            currentRound: state.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: state.winner,
            restAmount: state.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_NFTLIST) {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            nftList: action.nftList,
            currentRound: state.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: state.winner,
            restAmount: state.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_CURRENTROUND) {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            nftList: state.nftList,
            currentRound: action.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: state.winner,
            restAmount: state.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_ISRANDOMNUMBER) {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            nftList: state.nftList,
            currentRound: state.currentRound,
            isRandomNumber: action.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: state.winner,
            restAmount: state.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_ISREVEALED) {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            nftList: state.nftList,
            currentRound: state.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: action.isRevealed,
            winner: state.winner,
            restAmount: state.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_WINNER) {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            nftList: state.nftList,
            currentRound: state.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: action.winner,
            restAmount: state.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_RESTAMOUNT) {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            nftList: state.nftList,
            currentRound: state.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: state.winner,
            restAmount: action.restAmount,
            loading: state.loading
        };
    }
    if (action.type === LOAD_LOADING) {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            nftList: state.nftList,
            currentRound: state.currentRound,
            isRandomNumber: state.isRandomNumber,
            isRevealed: state.isRevealed,
            winner: state.winner,
            restAmount: state.restAmount,
            loading: action.loading
        };
    }

    return defaultState;
}

const ContractProvider = (props: any) => {
    const [state, dispatchAction] = useReducer(reducer, defaultState)

    const loadContractHandler = (web3: any, contract: any) => {
        let _contract;
        try {
            _contract = new web3.eth.Contract(contract.abi, contract.address);
            dispatchAction({ type: LOAD_CONTRACT, contract: _contract });
            return _contract;
        } catch (error) {
            dispatchAction({ type: LOAD_CONTRACT, contract: _contract });
            return _contract;
        }
    }

    const loadTotalSupplyHandler = async (contract: any) => {
        let _totalSupply = 0;
        try {
            _totalSupply = await contract.methods.totalSupply().call();
            dispatchAction({ type: LOAD_TOTALSUPPLY, totalSupply: _totalSupply });
            return _totalSupply;
        } catch (error) {
            dispatchAction({ type: LOAD_TOTALSUPPLY, totalSupply: _totalSupply });
            return _totalSupply;
        }
    };

    const loadRestAmounthandler = async (contract: any) => {

        let restAmount = 0;
        try {
            const _nftList = await contract.methods.fetchSOMs().call();
            for (let i = 0; i < _nftList.length; i++) {
                let item = _nftList[i];
                let state = item.state;
                if (state == 1) restAmount++;
            }
            dispatchAction({ type: LOAD_RESTAMOUNT, restAmount: restAmount })
        } catch (error) {
            dispatchAction({ type: LOAD_RESTAMOUNT, restAmount: restAmount })
        }
    }

    const loadNftListhandler = async (contract: any) => {
        let _nftList: any = [];
        let newList: any = [];
        try {
            _nftList = await contract.methods.fetchSOMs().call();

            dispatchAction({ type: LOAD_LOADING, loading: true });
            for (let i = 0; i < _nftList.length; i++) {
                let item = _nftList[i];
                let tokenId = item.tokenId;
                let state = item.state;

                try {
                    let address = await contract.methods.ownerOf(item.tokenId).call();
                    let color = Config.stateColor[state - 1];
                    newList.push({ tokenId, state, color, address });
                    dispatchAction({ type: LOAD_NFTLIST, nftList: newList })
                } catch (error) {
                    continue;
                }
            }
            dispatchAction({ type: LOAD_LOADING, loading: false });
        } catch (error) {
            dispatchAction({ type: LOAD_NFTLIST, nftList: newList })
        }
    }

    const loadCurrentRoundhandler = async (contract: any) => {
        let _currentRoundId = 0;
        let _currentRound = {};
        try {
            _currentRoundId = await contract.methods.currentRoundId().call();
            _currentRound = await contract.methods.rounds(_currentRoundId).call();
            dispatchAction({ type: LOAD_CURRENTROUND, currentRound: _currentRound })
        } catch (error) {
            dispatchAction({ type: LOAD_CURRENTROUND, currentRound: _currentRound })
        }
    }

    const loadIsRandomNumberhandler = async (contract: any) => {
        let _isRandomNumber = false;
        try {
            _isRandomNumber = await contract.methods.isRandomNumber().call();
            dispatchAction({ type: LOAD_ISRANDOMNUMBER, isRandomNumber: _isRandomNumber })
        } catch (error) {
            dispatchAction({ type: LOAD_ISRANDOMNUMBER, isRandomNumber: _isRandomNumber })
        }
    }

    const loadIsRevealedhandler = async (contract: any) => {
        let _isRevealed = false;
        try {
            _isRevealed = await contract.methods.isRevealed().call();
            dispatchAction({ type: LOAD_ISREVEALED, isRevealed: _isRevealed })
        } catch (error) {
            dispatchAction({ type: LOAD_ISREVEALED, isRevealed: _isRevealed })
        }
    }

    const loadWinnerhandler = async (contract: any) => {
        let NFT;
        const winner = await contract.methods.winner().call();
        if (winner > 0) {
            const address = await contract.methods.ownerOf(winner).call();
            const hash = await contract.methods.tokenURI(winner).call();
            const isEndGame = await contract.methods.isEndGame().call();
            try {
                const response = await fetch(hash);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }

                const metadata = await response.json();

                NFT = {
                    id: parseInt(winner),
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                    address: address,
                    isEndGame: isEndGame
                };
            } catch {
                console.error('Something went wrong');
            }
            dispatchAction({ type: LOAD_WINNER, winner: NFT });
        }
    }

    let contractContext = {
        contract: state.contract,
        totalSupply: state.totalSupply,
        nftList: state.nftList,
        currentRound: state.currentRound,
        isRandomNumber: state.isRandomNumber,
        isRevealed: state.isRevealed,
        winner: state.winner,
        restAmount: state.restAmount,
        loading: state.loading,
        loadContract: loadContractHandler,
        loadTotalSupply: loadTotalSupplyHandler,
        loadNftList: loadNftListhandler,
        loadCurrentRound: loadCurrentRoundhandler,
        loadIsRandomNumber: loadIsRandomNumberhandler,
        loadIsRevealed: loadIsRevealedhandler,
        loadWinner: loadWinnerhandler,
        loadRestAmount: loadRestAmounthandler
    }
    return (
        <ContractContext.Provider value={contractContext}>
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractProvider;