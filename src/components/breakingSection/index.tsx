import Image from 'next/image';
import * as React from 'react';

function BreakingSection() {
    return (
        <div id='breaking' className='breaking relative flex flex-col items-center bg-black bg-fixed bg-no-repeat bg-cover'>
            <div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-70'></div>
            <div className='header z-10 w-full flex justify-center items-center py-8 bg-black aos-animate' data-aos="fade-up">
				<div className='text-3xl sm:text-5xl text-center text-white font-bold'>BREAKING THE RULES</div>
            </div>
            <div className='z-10 flex items-center justify-center flex-col p-10 sm:px-20 sm:pb-20'>
                <div className='image-list text-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                    <div className='w-full flex flex-col items-center justify-start' data-aos="fade-down">
                        <div className='relative w-[250px] h-[250px] rounded-full'>
                            <Image className='rounded-full' src={'/images/breaking/1.webp'} layout='fill' objectFit='fill' />
                        </div>
                        <div className='flex items-center justify-center mt-8'>
                            <div className='text-white break-all tracking-wider'>
                                A NFT collection that is focused on story and world building. Subsequent seasons in different timelines, an adaptive story based on the outcome of the games, concrete plans for a graphic novel adaption & plans for Sons Of Mars to be a household name in pop culture around the world.
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center justify-start' data-aos="fade-up">
                        <div className='relative w-[250px] h-[250px] rounded-full'>
                            <Image className='rounded-full' src={'/images/breaking/2.webp'} layout='fill' objectFit='fill' />
                        </div>
                        <div className='flex items-center justify-center mt-8'>
                            <div className='text-white break-all tracking-wider'>
                                The first collection of this kind offering one lucky warrior a chance at changing their life forever and earning 200ETH.
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center justify-start' data-aos="fade-down">
                        <div className='relative w-[250px] h-[250px] rounded-full'>
                            <Image className='rounded-full' src={'/images/breaking/3.webp'} layout='fill' objectFit='fill' />
                        </div>
                        <div className='flex items-center justify-center mt-8'>
                            <div className='text-white break-all tracking-wider'>
                                A secure and fair randomised code acting like the God Mars himself. 5.5k warriors with 16 possible end states resulting in 88k images all to create the most engaging, fair and exciting experience for all. All native on OpenSea.
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center justify-start' data-aos="fade-up">
                        <div className='relative w-[250px] h-[250px] rounded-full'>
                            <Image className='rounded-full' src={'/images/breaking/4.webp'} layout='fill' objectFit='fill' />
                        </div>
                        <div className='flex items-center justify-center mt-8'>
                            <div className='text-white break-all tracking-wider'>

                                Introducing death states. The only NFT collection to have multiple death states with varying degrees of rarity attached to each.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BreakingSection;