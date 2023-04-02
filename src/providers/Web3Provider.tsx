import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { isMobile } from "react-device-detect";
import BorderButtonComponent from '@/components/layout/borderButtonComponent';

declare const window: Window &
    typeof globalThis & {
        ethereum: any
    }

const Web3 = ({ children }: { children: any }) => {
    function getLibrary(provider: any) {
        const library = new Web3Provider(provider);
        library.pollingInterval = 3000;
        return library;
    }
    if (typeof window.ethereum === 'undefined' && !isMobile) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-black">
                <a href='https://metamask.io/download/' target='_blank'>
                    <BorderButtonComponent className='px-6 py-4'>
                        Please Install MetaMask.
                    </BorderButtonComponent>
                </a>
            </div>
        )
    } 

    return (
        <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    );
};

export default Web3;
