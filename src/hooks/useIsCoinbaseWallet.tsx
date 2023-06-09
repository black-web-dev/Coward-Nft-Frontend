import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { useActiveWeb3React } from '@/services/web3'
import { useMemo } from 'react'

export default function useIsCoinbaseWallet(): boolean {
  const { connector } = useActiveWeb3React()
  return useMemo(() => {
    return (
      connector instanceof WalletLinkConnector ||
      (connector instanceof InjectedConnector && window.walletLinkExtension) ||
      window?.ethereum?.isCoinbaseWallet
    )
  }, [connector])
}
