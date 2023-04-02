import React, { useRef, useEffect } from 'react';

const Video = (): JSX.Element => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        return () => {
            videoRef.current?.pause();
        }
    }, []);
    return (
        <div className='w-full max-w-[700px] mx-auto tracking-widest px-10'>
            <div className='w-full text-center text-normal font-black my-10 tracking-[.75em]'>
                GAME RULES
            </div>
            <div className='relative w-full h-[300px] mb-10'>
                <iframe src="https://www.youtube.com/embed/0MM6EHRyh2c?autoplay=1" allow='autoplay' className='w-full max-w-[700px] h-[300px]' frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className='w-full text-normal text-white text-center mb-10'>
                The Coward's Gambit is a brand new game brought to you by Sons Of Mars.
            </div>
            <div className='w-full text-normal text-center text-white mb-10'>
                A cut-throat social experience designed with game theory, where if you die your NFT dies with you and is memorialised as a classic Roman Statue
            </div>
            <div className='flex flex-col items-end justify-center'>
                <div className='uppercase text-xl font-bold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#e7656c] via-[#b50912] to-[#e7656c]'><a href=' https://sons-of-mars.gitbook.io/sons-of-mars-whitepaper/' target="_blank">FULL GAME RULES</a></div>
            </div>
        </div>

    )
}

export default Video;