import React from 'react';
import Image from 'next/image';;

type Props = {
    coward: number;
    alive: number;
    dead: number;
    marsFinished: boolean;
}

const Amount = ({ coward, alive, dead, marsFinished }: Props): JSX.Element => {
    return (
        <div className='w-full lg:w-1/2 max-w-[700px] mx-auto tracking-widest my-20 px-5 flex flex-col sm:flex-row items-center sm:items-start justify-around tracking-[.5em] text-center'>
            <div className='w-[200px] h-full'>
                <Image src='/images/coward/coward.png' width={140} height={140} />
                <div className='text-3xl font-bold'>{coward}</div>
                <div className='text-xl font-medium my-4'>COWARDS</div>
            </div>
            <div className='w-[200px] h-full'>
                <Image src='/images/coward/logo.png' width={140} height={140} />
                <div className='text-3xl font-bold'>{alive}</div>
                <div className='text-xl font-medium my-4'>ALIVE</div>
            </div>
            <div className='w-[200px] h-full'>
                <Image src='/images/coward/mars.png' width={140} height={140} />
                <div className='text-3xl font-bold'>{dead - coward}</div>
                <div className='text-xl font-medium my-4'>DEAD</div>
                {!marsFinished && <div className='text-base font-normal tracking-wider'>& Eligible for Mars' Gambit</div>}
            </div>
        </div>
    )
}

export default Amount;