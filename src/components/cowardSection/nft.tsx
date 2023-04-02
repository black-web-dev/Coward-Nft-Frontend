import React from 'react';
import BorderComponent from '../layout/borderComponent';
import NextImage from '../NextImage';
import Image from 'next/image';

import Config from '@/config/app';

export interface nftProps {
    tokenId: number;
    name: string;
    image: string;
    state: number;
    cowardState: boolean;
    marsState: boolean;
};

export interface globalProps {
    currentRoundId: number;
    isRevealed: boolean;
    cowardFinished: boolean;
    marsFinished: boolean;
}
export interface actionProps {
    onCoward: (id: number) => void;
    onMars: (id: number) => void;
}

interface Props extends nftProps, actionProps, globalProps { }

const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
    return `https://som.mypinata.cloud/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
}

const Nft = ({ tokenId, name, image, state, onCoward, onMars, currentRoundId, isRevealed, cowardFinished, marsFinished, cowardState, marsState }: Props) => {
    return (
        <div className='relative px-2 my-4 flex flex-col items-center justify-center'>
            <BorderComponent className='p-2'>
                <div className='z-[2] absolute top-0 right-0 p-4'>
                    <a href={Config.opensea_asset_url + Config.som.address + `/` + tokenId} target='_blank'>
                        <Image src='/images/coward/opensea.png' width={60} height={60} />
                    </a>
                </div>
                <div className='relative h-[400px] border-2 border-black'>
                    <NextImage
                        useSkeleton
                        loader={imgLoader}
                        src={image}
                        width='350'
                        height='400'
                        alt={name}
                    />
                </div>
                <div className='absolute inset-x-2 top-1/2 bottom-2 bg-gradient-to-t from-black to-transparent'></div>
                {
                    isRevealed &&
                    <div className='absolute bottom-2 inset-x-0 flex flex-col items-center justify-center p-2'>
                        {
                            cowardState &&
                            <Image src={`/images/coward/coward.png`} width={120} height={120} />
                        }
                        {
                            marsState &&
                            <Image src={`/images/coward/mars.png`} width={120} height={120} />
                        }
                        <div className='w-full flex items-center justify-between'>
                            <button className='w-1/2 cursor-pointer flex items-center justify-start' onClick={() => onCoward(tokenId)} disabled={state.toString() !== '1'}>
                                {
                                    (!cowardState && !cowardFinished && state.toString() === '1') &&
                                    <Image className='hover:scale-110 transition-all' src={`/images/coward/coward.png`} width={120} height={120} />
                                }
                            </button>
                            <button className='w-1/2 cursor-pointer flex items-center justify-end' onClick={() => onMars(tokenId)} disabled={!(state > 1 && state.toString() !== '15' && state.toString() !== '20' && currentRoundId.toString() === '6')}>
                                {
                                    (!marsFinished && !marsState && (currentRoundId.toString() === '6' && state > 1 && state.toString() !== '15' && state.toString() !== '20')) &&
                                    <Image className='hover:scale-110 transition-all' src={`/images/coward/mars.png`} width={120} height={120} />
                                }
                            </button>
                        </div>
                    </div>
                }
            </BorderComponent>
        </div>
    )
}

export default Nft;