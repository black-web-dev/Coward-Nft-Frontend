import * as React from 'react';
import Image from 'next/image';

const roadmaps = [
    { type: 'Q2', title: 'Battle Stations', content: 'The testing, artwork creation and marketing stage. Ready for SOM to become a market leader.' },
    { type: 'Q3', title: 'The Battle Begins', content: 'Season 1 of the experience launches onto OpenSea and the battle begins. The experience is played out, a winner is crowned & offered 200ETH.' },
    { type: 'Q4', title: 'The Start Of An Empire', content: 'Preparation for season 2 begins with all holders given the choice BURN or HOLD. Season 2 launches with more warriors, more prizes and more of the story being told.' },
    { type: 'Q1', title: 'Legacy Is Written', content: 'SOM is ready to break into the physical world. Work on the official SOM Graphic Novel begins.' },
    { type: 'Beyond', title: 'Mars Is Victorious', content: 'Season 3 is released. SOM enters the metaverse & the physical world with a battle royale game, graphic novels and real life events.' },
]
function RoadmapSection() {

    return (
        <div id='roadmap' className='roadmap relative flex flex-col items-center bg-black bg-fixed bg-no-repeat bg-cover'>
            <div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-70'></div>
            <div className='header z-10 w-full flex justify-center items-center py-8 bg-black aos-animate' data-aos="fade-up">
				<div className='text-3xl sm:text-5xl text-center text-white font-bold'>ROADMAP</div>
            </div>
            <div className='timeline z-10 flex mx-12'>
                <div className='timeline-left hidden sm:flex items-center justify-center'>
                    <div className='h-full flex flex-col items-center justify-end'>
                        <div className='h-1/2 flex items-center justify-center' data-aos="fade-left">
                            <div className='text-3xl rotate-[270deg]'>2022</div>
                        </div>
                        <div className='h-1/2 flex items-center justify-center' data-aos="fade-left">
                            <div className='text-3xl rotate-[270deg]'>2023</div>
                        </div>
                    </div>
                    <div className='w-16 h-full' data-aos="fade-up">
                        <div className='relative w-20 h-full'>
                            <Image src={'/images/roadmaps/rident.webp'} layout='fill' objectFit='fill' />
                        </div> 
                    </div>
                </div>
                <div className='timeline-right sm:py-20'>
                    <div className='text-white pb-6'>
                        {
                            roadmaps.map(item => (
                                <div key={item.type} className='flex items-center justify-start' data-aos="fade-right">
                                    <div className='pr-10 w-[100px] h-full flex flex-col items-center justify-center'>
                                        <div className='text-3xl rotate-[270deg]'>{item.type}</div>
                                    </div>
                                    <div className='sm:w-[400px] h-full py-4'>
                                        <div className='font-bold text-2xl sm:text-3xl py-4'>
                                            {item.title}
                                        </div>
                                        <ul className='text-base text-zinc-300 py-4'>
                                            <li className='break-all tracking-wider'>{item.content}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RoadmapSection;