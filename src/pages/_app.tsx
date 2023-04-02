import { useState, useEffect, Fragment } from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic'
import NextNProgress from "nextjs-progressbar";
import '@/styles/colors.css';
import '@/styles/globals.css';
import '@/styles/home.css';
import '@/styles/font.css';

import Web3Provider from "@/providers/Web3Provider";
import { SyncWithRedux } from '@/components/SyncWithRedux'
import { Web3ReactProvider } from '@web3-react/core'
import Web3ReactManager from '@/components/Web3ReactManager'
import getLibrary from '@/functions/getLibrary'
import { PersistGate } from 'redux-persist/integration/react'
import Dots from '@/components/Dots'
import { RecoilRoot } from 'recoil'
// @ts-ignore TYPE NEEDS FIXING
import store, { persistor } from '@/state'
import SomContractProvider from '@/providers/somContractProvider';
import CowardContractProvider from '@/providers/cowardContractProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingScreen from '@/components/layout/loadingScreen';

const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })

if (typeof window !== 'undefined' && !!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

// @ts-ignore TYPE NEEDS FIXING
function MyApp({ Component, pageProps, fallback, err }) {
  const [loading, setLoading] = useState(false);

  // Allows for conditionally setting a provider to be hoisted per page
  const Provider = Component.Provider || Fragment

  // Allows for conditionally setting a guard to be hoisted per page
  const Guard = Component.Guard || Fragment

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);

  return (
    <>
      {
        loading ? (
          <>
            <NextNProgress
              color="red"
              startPosition={0.3}
              stopDelayMs={200}
              height={4}
              showOnShallow={true}
              options={{ showSpinner: false }}
            />
            {/* <Web3Provider> */}
            <Web3ReactProvider getLibrary={getLibrary}>
              <Web3ProviderNetwork getLibrary={getLibrary}>
                <Web3ReactManager>
                  <ReduxProvider store={store}>
                    <PersistGate loading={<Dots>loading</Dots>} persistor={persistor}>
                      <RecoilRoot>
                        <SyncWithRedux />
                        <SomContractProvider>
                          <CowardContractProvider>
                            <Provider>
                              <Guard>
                                <Component {...pageProps} />
                              </Guard>
                            </Provider>
                          </CowardContractProvider>
                        </SomContractProvider>
                      </RecoilRoot>
                    </PersistGate>
                  </ReduxProvider>
                  {/* </Web3Provider> */}
                </Web3ReactManager>
              </Web3ProviderNetwork>
            </Web3ReactProvider>
            <ToastContainer
              theme="colored"
              position="top-right"
              autoClose={4000}
              hideProgressBar={true}
              newestOnTop={false}
              draggable={false}
              closeOnClick
              pauseOnHover
            />
          </>
        ) : (
          <LoadingScreen />
        )
      }
    </>
  );
}

export default MyApp;
