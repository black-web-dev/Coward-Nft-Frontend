import { useState } from 'react';
import SomContractContext from '@/context/somContractContext';

export const LOAD_CONTRACT = 'LOAD_CONTRACT';
export const LOAD_ISREVEALED = 'LOAD_ISREVEALED';


const defaultState = {
    contract: null,
    isRevealed: false,
    restAmount: 0,
    totalSupply: 0
}

const SomContractProvider = (props: any) => {
    const [state, setState] = useState<any>(defaultState)

    const loadContractHandler = async (_web3: any, _contract: any, _account: any) => {
        let contract, isRevealed, restAmount, totalSupply;
        try {
            contract = new _web3.eth.Contract(_contract.abi, _contract.address);
            isRevealed = await contract.methods.isRevealed().call();
            restAmount = await contract.methods.NFTcountPerAddress(_account).call();
            totalSupply = await contract.methods.TotalMintCount().call();

            setState({
                contract,
                isRevealed,
                restAmount,
                totalSupply
            });
            return contract;
        } catch (error) {
            return null;
        }
    }

    let somContractContext = {
        contract: state.contract,
        isRevealed: state.isRevealed,
        restAmount: state.restAmount,
        totalSupply: state.totalSupply,
        loadContract: loadContractHandler,
    }

    return (
        <SomContractContext.Provider value={somContractContext}>
            {props.children}
        </SomContractContext.Provider>
    )
}

export default SomContractProvider;