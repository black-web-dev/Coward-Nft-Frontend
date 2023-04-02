import * as React from 'react';
import Head from 'next/head';
import ScrollToTop from "react-scroll-to-top";
import { ArrowCircleUpIcon } from '@heroicons/react/outline';
import Header from '@/navigation/header';
import Seo from './seo';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Seo />
            <ScrollToTop smooth={true} component={<ArrowCircleUpIcon className='text-[#b9111a] hover:scale-110 transaction-all duration-500' />} style={{ zIndex: 20, animation: 'bounce 1s infinite', background: 'transparent', boxShadow: 'none' }} />
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                />
                <title>SOM</title>
                <meta name="description" content="NFT" />
                <link rel="icon" href="/favicon.png" type="image/gif" sizes="64x64" />
            </Head>
            <div className='bg-black'>
                <header >
                    {/* <div className='fixed w-full h-20 backdrop-blur-sm mask-header'></div> */}
                    <Header />
                </header>
                <main className='main'>
                    <div className='section'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}