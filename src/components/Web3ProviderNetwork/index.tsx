import { createWeb3ReactRoot } from '@web3-react/core'
import { NetworkContextName } from '@/constants'
import { isMobile } from "react-device-detect";
import BorderButtonComponent from '../layout/borderButtonComponent'

const Web3ReactRoot = createWeb3ReactRoot(NetworkContextName)


// @ts-ignore TYPE NEEDS FIXING
function Web3ProviderNetwork({ children, getLibrary }) {
  if (typeof window.ethereum === 'undefined' && !isMobile) {
    return (
      <Web3ReactRoot getLibrary={getLibrary}>
        <div className="w-full min-h-screen flex items-center justify-center bg-black">
          <a href='https://metamask.io/download/' target='_blank'>
            <BorderButtonComponent className='px-6 py-4'>
              Please Install MetaMask.
            </BorderButtonComponent>
          </a>
        </div>
      </Web3ReactRoot>
    )
  }
  return <Web3ReactRoot getLibrary={getLibrary}>{children}</Web3ReactRoot>
}

export default Web3ProviderNetwork
