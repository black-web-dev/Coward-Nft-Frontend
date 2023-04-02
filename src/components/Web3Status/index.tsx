import Davatar from '@davatar/react'
import { Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { injected } from '@/config/wallets'
import { shortenAddress } from '@/functions'
import WalletModal from '@/components/walletModal'
import { useWalletModalToggle } from '@/state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '@/state/transactions/hooks'
import { TransactionDetails } from '@/state/transactions/reducer'
import Image from 'next/image'
import React, { useMemo } from 'react'

import Loader from '../Loader'
import Web3Connect from '../Web3Connect'
import { NetworkContextName } from '@/constants'


// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector; account: string; provider: Web3Provider }) {
  if (connector === injected) {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image
          src="https://app.sushi.com/images/wallets/metamask.png"
          alt="Injected (MetaMask etc...)"
          width={16}
          height={16}
        />
      </div>
    )
  } else if (connector.constructor.name === 'WalletConnectConnector') {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image
          src="https://app.sushi.com/images/wallets/wallet-connect.svg"
          alt={'Wallet Connect'}
          width="16px"
          height="16px"
        />
      </div>
    )
  } else if (connector.constructor.name === 'LatticeConnector') {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image src="https://app.sushi.com/images/wallets/lattice.png" alt={'Lattice'} width="16px" height="16px" />
      </div>
    )
  } else if (connector.constructor.name === 'WalletLinkConnector') {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image
          src="https://app.sushi.com/images/wallets/coinbase.svg"
          alt={'Coinbase Wallet'}
          width="16px"
          height="16px"
        />
      </div>
    )
  } else if (connector.constructor.name === 'FortmaticConnector') {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image src="https://app.sushi.com/images/wallets/fortmatic.png" alt={'Fortmatic'} width="16px" height="16px" />
      </div>
    )
  } else if (connector.constructor.name === 'PortisConnector') {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image src="https://app.sushi.com/images/wallets/portis.png" alt={'Portis'} width="16px" height="16px" />
      </div>
    )
  } else if (connector.constructor.name === 'KeystoneConnector') {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image src="https://app.sushi.com/images/wallets/keystone.png" alt={'Keystone'} width="16px" height="16px" />
      </div>
    )
  } else if (connector.constructor.name === 'CloverConnector') {
    return (
      <div className="flex flex-col items-center justify-center w-4 h-4 flex-nowrap">
        <Image src="https://app.sushi.com/images/wallets/clover.svg" alt={'Clover'} width="16px" height="16px" />
      </div>
    )
  }
  return null
}

function Web3StatusInner() {
  const { account, connector, library } = useWeb3React()

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length

  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    return (
      <div
        id="web3-status-connected"
        className="flex items-center gap-2 px-3 py-2 text-sm text-primary"
        onClick={toggleWalletModal}
      >
        {hasPendingTransactions ? (
          <div className="flex items-center justify-between gap-2">
            <div>
              {pending?.length} {`Pending`}
            </div>{' '}
            <Loader stroke="white" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div>{account && shortenAddress(account, 10)}</div>
            <Davatar
              size={40}
              address={account}
              defaultComponent={
                <Image src="./images/logo.webp" alt="" width={80} height={80} />
              }
              style={{ borderRadius: 5 }}
              provider={library}
            />
          </div>
        )}
        {/* {!hasPendingTransactions && connector && (
          <StatusIcon connector={connector} account={account} provider={library} />
        )} */}
      </div>
    )
  } else {
    return (
      <Web3Connect className="text-white h-[38px]" />
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={account ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
