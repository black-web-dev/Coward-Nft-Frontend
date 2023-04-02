import * as React from 'react';
import Image from 'next/image';
import BorderComponent from '../layout/borderComponent';

function TeamSection() {
    return (
        <div id='team' className='team relative flex flex-col items-center'>
            <div className='relative w-full h-full'>
                <img src='/images/team/banner.png' />
                <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black via-transparent to-black'></div>
            </div>
            <div className='relative w-full flex flex-col md:flex-row items-start justify-center p-4 lg:p-28'>
                <div className='w-full p-4 lg:p-8'>
                    <BorderComponent className='p-8'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='text-3xl font-bold pb-6'>FOUNDERS</div>
                            <div className='lg:min-h-[400px] text-lg text-[#E9F3FC] text-justify leading-10'>
                                <p>
                                    SOM is the first NFT project brought to you by The Frosali Brothers.
                                </p>
                                <p className='py-4'></p>
                                <p>
                                    Alessandro & Sean Frosali are avid storytellers & creators of music, film & fine art. Now they turn to NFTs to bring their imagination & passions to life.
                                </p>
                            </div>
                            <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-between'>
                                <div className='w-full flex-col items-center justify-center'>
                                    <div className='text-2xl text-center lg:text-left m-2'>
                                        Alessandro Frosali
                                    </div>
                                    <div className='flex items-center justify-center lg:justify-start'>
                                        <div className='relative w-10 h-10 m-2'>
                                            <Image src={`/images/team/gitbook.png`} layout='fill' objectFit='scale-down' />
                                        </div>
                                        <div className='relative w-10 h-10 m-2'>
                                            <Image src={`/images/team/tiktok.png`} layout='fill' objectFit='scale-down' />
                                        </div>
                                        <div className='relative w-10 h-10 m-2'>
                                            <Image src={`/images/team/in.png`} layout='fill' objectFit='scale-down' />
                                        </div>
                                        <div className='relative w-10 h-10 m-2'>
                                            <Image src={`/images/team/youtube.png`} layout='fill' objectFit='scale-down' />
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='relative w-[170px] h-[170px] m-10'>
                                        <Image src={`/images/team/1.webp`} layout='fill' objectFit='scale-down' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-between'>
                                <div className='w-full flex-col items-center justify-center'>
                                    <div className='text-2xl text-center lg:text-left m-2'>
                                        Sean Frosali
                                    </div>
                                    <div className='flex items-center justify-center lg:justify-start'>
                                        <div className='relative w-10 h-10 m-2'>
                                            <Image src={`/images/team/gitbook.png`} layout='fill' objectFit='scale-down' />
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='relative w-[170px] h-[170px] m-10'>
                                        <Image src={`/images/team/2.webp`} layout='fill' objectFit='scale-down' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BorderComponent>
                </div>
                <div className='w-full p-4 lg:p-8'>
                    <BorderComponent className='p-8'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='text-3xl font-bold pb-6'>FOUNDERS</div>
                            <div className='lg:min-h-[400px] text-lg text-[#E9F3FC] text-justify leading-10'>
                                <p>
                                    Known for their work on major motion pictures & television series’ such as <span className='text-white'>THE LION KING (2019), LOKI, WW84 & MALEFICENT: MISTRESS OF EVIL.</span>
                                </p>
                                <p className='py-4'></p>
                                <p className='uppercase'>
                                    Both Jerome & Amine are the founders of ANMP, a Creative Studio that has worked with well known clients such as Coldplay, Red Bull, Honda, Warner, and many more.
                                </p>
                            </div>
                            <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-between'>
                                <div className='w-full flex-col items-center justify-center'>
                                    <div className='text-2xl text-center lg:text-left m-2'>
                                        Amine Amahadar
                                    </div>
                                    <div className='flex items-center justify-center lg:justify-start'>
                                        <div className='relative w-10 h-10 m-2'>
                                            <Image src={`/images/team/imdb.png`} layout='fill' objectFit='scale-down' />
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='relative w-[170px] h-[170px] m-10'>
                                        <Image src={`/images/team/4.webp`} layout='fill' objectFit='scale-down' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-between'>
                                <div className='w-full flex-col items-center justify-center'>
                                    <div className='text-2xl text-center lg:text-left m-2'>
                                        Jerome Malevez
                                    </div>
                                    <div className='flex items-center justify-center lg:justify-start'>
                                        <div className='relative w-10 h-10 m-2'>
                                            <Image src={`/images/team/imdb.png`} layout='fill' objectFit='scale-down' />
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='relative w-[170px] h-[170px] m-10'>
                                        <Image src={`/images/team/3.webp`} layout='fill' objectFit='scale-down' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BorderComponent>
                </div>
            </div>
        </div >
    )
}
export default TeamSection;