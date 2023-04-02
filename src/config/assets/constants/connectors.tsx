import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    0: "https://data-seed-prebsc-1-s1.binance.org:8545",
    1: "https://sgb.ftso.com.au/ext/bc/C/rpc",
    3: "https://mainnet.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825",
    4: "https://rinkeby.infura.io/v3/eaf5b124b2cc4797beb8fcabe2c50825"
};

const rpcUrl = RPC_URLS[3];//getNodeUrl();
const chainId = parseInt('1', 10);
export const injected = new InjectedConnector({
    // supportedChainIds: [1, 4, 19, 97, 56], 
    supportedChainIds: [1], 
});

export const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    qrcode: true,
    bridge: "https://bridge.walletconnect.org",
    // pollingInterval: POLLING_INTERVAL,
});
