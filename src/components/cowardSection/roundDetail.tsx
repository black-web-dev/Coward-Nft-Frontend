import React from 'react';
import TimeCounter from '../timeCounterSection';

type Props = {
    currentRoundId: number;
    deathPercent: number;
    state: string;
    cowards: number;
    mars: number;
    timeLineId: number;
}
const RoundDetail = ({ currentRoundId, deathPercent, state, cowards, mars, timeLineId }: Props): JSX.Element => {
    return (
        <div className='w-full max-w-[700px] mx-auto tracking-widest py-10 px-10'>
            <TimeCounter timeLineId={timeLineId}/>

            {/* current round detail */}
            <div className='text-xl my-10'>
                <div className='flex items-center justify-between py-2'>
                    <p className='first-letter:text-2xl uppercase'>round number</p>
                    <div>{currentRoundId}</div>
                </div>

                <div className='flex items-center justify-between py-2'>
                    <p className='first-letter:text-2xl uppercase'>death %</p>
                    <div>{deathPercent}</div>
                </div>

                <div className='flex items-center justify-between py-2'>
                    <p className='first-letter:text-2xl uppercase'>state</p>
                    <p className='first-letter:text-2xl uppercase'>{state}</p>
                </div>
            </div>

            {/* takens coward gambit */}
            <div className='text-xl my-10'>
                <div className='flex items-center justify-between py-2'>
                    <p className='first-letter:text-2xl uppercase'>Taken the Coward's Gambit</p>
                    <div>*{cowards}</div>
                </div>
                <p className='w-3/4 text-sm py-3 leading-10'>
                    *This number is only updated AFTER the round is finished. Meaning the number may already be over 200, so be careful.
                </p>
            </div>

            {/* takens mars gambit */}
            <div className='text-xl my-10'>
                <div className='flex items-center justify-between py-2'>
                    <p className='first-letter:text-2xl uppercase'>Taken the mars' Gambit</p>
                    <div>**{mars}</div>
                </div>
                <p className='w-3/4 text-sm py-3 leading-10'>
                    **This option is available for all who have died in rounds 1-5 and will
                    be made available for 48 hours between the end of round 5 and the
                    start of round 6. Beware there is a 90% chance your NFT statue will be
                    BURNED and lost forever.
                </p>
            </div>
        </div>
    )
}

export default RoundDetail;