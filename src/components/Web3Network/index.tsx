import { NETWORK_ICON } from '@/config/networks'
import NetworkModel from '@/components/NetworkModal'
import { useActiveWeb3React } from '@/services/web3'
import { useNetworkModalToggle } from '@/state/application/hooks'
import Image from 'next/image'
import React from 'react'

function Web3Network(): JSX.Element | null {
  const { chainId } = useActiveWeb3React()

  const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <div
      className="flex items-center whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
      onClick={() => toggleNetworkModal()}
    >
      <div className="grid items-center grid-flow-col justify-center h-[36px] w-[36px] text-sm rounded pointer-events-auto auto-cols-max text-white">
        {/*@ts-ignore TYPE NEEDS FIXING*/}
        <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-full" width="30px" height="30px" />
      </div>
      <NetworkModel />
    </div>
  )
}

export default Web3Network
