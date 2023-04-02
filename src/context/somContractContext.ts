import { createContext } from 'react';

const SomContractContext = createContext({
  contract: null,
  isRevealed: false,
  restAmount: 0,
  totalSupply: 0,
  loadContract: (web: any, contract: any, account: any) => {},
});

export default SomContractContext;
