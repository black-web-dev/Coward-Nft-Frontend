import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const MainVideo = (): JSX.Element => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        return () => {
            videoRef.current?.pause();
        }
    }, []);
    return (
        <div id='coward' className='coward relative flex tracking-widest items-center justify-center flex-col w-full h-screen bg-[url("/images/coward/background.png")] bg-cover bg-center' data-aos="fade-up">
            <div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-30'></div>
            <video autoPlay loop muted playsInline preload="" className="absolute w-auto min-w-full h-full max-w-none" ref={videoRef}>
                <source src="/videos/arena.mp4" type="video/mp4" />
            </video>
            <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black to-transparent'></div>
            <div className='absolute bottom-[60px] w-[278px] h-[197px]'>
                <Image src='/images/coward/cowardsgambit.png' className='absolute' layout='fill' />
            </div>
        </div>
    )
}

export default MainVideo;