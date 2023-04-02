import Davatar from '@davatar/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { HeadlessUiModal } from '@/components/Modal'
import { injected, SUPPORTED_WALLETS } from '@/config/wallets'
import { getExplorerLink } from '@/functions/explorer'
import { shortenAddress } from '@/functions/format'
import { useActiveWeb3React } from '@/services/web3'
import Image from 'next/image'
import React, { FC, useCallback, useMemo } from 'react'
import { ExternalLink as LinkIcon } from 'react-feather'

import Button from '../Button'
import ExternalLink from '../ExternalLink'
import Typography from '../Typography'
import Copy from './Copy'
import Transaction from './Transaction'

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

const AccountDetails: FC<AccountDetailsProps> = ({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}) => {
  const { chainId, account, connector, deactivate, library } = useActiveWeb3React()

  const connectorName = useMemo(() => {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return (
      <Typography variant="xs" weight={700} className="text-secondary">
        Connected with {name}
      </Typography>
    )
  }, [connector])


  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <HeadlessUiModal.Header header={`Wallet Detail`} onClose={toggleWalletModal} />
        <HeadlessUiModal.BorderedContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {connectorName}
            <Button variant="outlined" color="red" size="xs" onClick={deactivate}>
              {`Disconnect`}
            </Button>
          </div>
          <div id="web3-account-identifier-row" className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-full">
                <Davatar
                  size={48}
                  // @ts-ignore TYPE NEEDS FIXING
                  address={account}
                  defaultComponent={
                    <Image src="./images/logo.webp" alt="Sushi Chef" width={48} height={48} />
                  }
                  provider={library}
                />
              </div>
              <Typography weight={700} variant="lg" className="text-white">
                {account && shortenAddress(account, 10)}
              </Typography>
            </div>
            <div className="flex items-center justify-between gap-2 space-x-3">
              {chainId && account && (
                <a href={getExplorerLink(chainId, ENSName || account, 'address')} target='_blank'>
                  <div className='flex'>
                    <ExternalLinkIcon className="block h-4 w-4 text-[red]" aria-hidden="true" />
                    <Typography variant="xs" weight={700} className='text-[red]'>
                      {`View on explorer`}
                    </Typography>
                  </div>
                </a>
              )}
              {account && (
                <Copy toCopy={account}>
                  <Typography variant="xs" weight={700} className='text-secondary'>
                    {`Copy Address`}
                  </Typography>
                </Copy>
              )}
            </div>
          </div>
        </HeadlessUiModal.BorderedContent>
        <HeadlessUiModal.BorderedContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Typography variant="xs" weight={700} className="text-secondary">
              {`Recent Transactions`}
            </Typography>
            <Button variant="outlined" color="red" size="xs">
              {`Clear all`}
            </Button>
          </div>
          <div className="flex flex-col divide-y divide-dark-800">
            {!!pendingTransactions.length || !!confirmedTransactions.length ? (
              <>
                {pendingTransactions.map((el, index) => (
                  <Transaction key={index} hash={el} />
                ))}
                {confirmedTransactions.map((el, index) => (
                  <Transaction key={index} hash={el} />
                ))}
              </>
            ) : (
              <Typography variant="xs" weight={700} className="text-secondary">
                {`Your transactions will appear here...`}
              </Typography>
            )}
          </div>
        </HeadlessUiModal.BorderedContent>
      </div>
    </div>
  )
}

export default AccountDetails
