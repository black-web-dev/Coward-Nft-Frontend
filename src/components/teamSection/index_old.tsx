import * as React from 'react';
import Image from 'next/image';

const members_founder = [
    { img: 1, name: 'Alessandro Frosali', type: 'Founder' },
    { img: 2, name: 'Sean Frosali', type: 'Founder' }
]

const memebers_artist = [
    { img: 3, name: 'Amine Amahadar', type: 'Artist' },
    { img: 4, name: 'Jérôme Malevez', type: 'Artist' },
    { img: 5, name: 'Laura Goset', type: 'Marketing' }
]

const memebers_dev = [
    { img: 6, name: 'Lee Gaughan Brown & Wang Jin', type: 'Developer Team' }
]
function TeamSection() {
    return (
        <div id='team' className='team relative flex flex-col items-center bg-black bg-fixed bg-no-repeat bg-cover'>
            <div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-70'></div>
            <div className='header z-10 w-full flex justify-center items-center py-8 bg-black aos-animate' data-aos="fade-up">
				<div className='text-3xl sm:text-5xl text-center text-white font-bold'>TEAM</div>
            </div>
            <div className='z-10 w-full flex flex-wrap items-start  justify-center px-20'>
                {
                    members_founder.map(item => (
                        <div key={item.name} className='w-full md:w-1/2 lg:w-1/4 flex flex-col items-center justify-start p-8'>
                            <div className='relative mt-8 w-[150px] h-[150px]'>
                                <Image src={`/images/team/${item.img}.webp`} layout='fill' objectFit='fill' />
                            </div>
                            <div className='w-full divider border-b-2 border-zinc-700 p-6'></div>
                            <div className='mt-6 text-center text-2xl flex flex-col items-center justify-center'>
                                <div className='font-bold'>{item.name}</div>
                                <div className='text-zinc-500 mt-4'>{item.type}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='z-10 w-full flex flex-wrap items-start justify-center px-10 sm:px-20'>
                {
                    memebers_artist.map(item => (
                        <div key={item.name} className='w-full md:w-1/2 lg:w-1/4 flex flex-col items-center justify-start p-8'>
                            <div className='relative w-[150px] h-[150px] mt-8'>
                                <Image src={`/images/team/${item.img}.webp`} layout='fill' objectFit='fill' />
                            </div>
                            <div className='w-full divider border-b-2 border-zinc-700 p-6'></div>
                            <div className='mt-6 text-2xl flex flex-col items-center justify-center'>
                                <div className='font-bold text-center'>{item.name}</div>
                                <div className='text-zinc-500 mt-4 text-center'>{item.type}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='z-10 w-full flex flex-wrap items-start justify-center px-10 sm:px-20'>
                {
                    memebers_dev.map(item => (
                        <div key={item.name} className='w-full md:w-1/2 lg:w-1/4 flex flex-col items-center justify-start p-8'>
                            <div className='relative w-[150px] h-[150px] mt-8'>
                                <Image src={`/images/team/${item.img}.webp`} layout='fill' objectFit='fill' />
                            </div>
                            <div className='w-full divider border-b-2 border-zinc-700 p-6'></div>
                            <div className='mt-6 text-2xl flex flex-col items-center justify-center'>
                                <div className='font-bold text-center'>{item.name}</div>
                                <div className='text-zinc-500 mt-4 text-center'>{item.type}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default TeamSection;