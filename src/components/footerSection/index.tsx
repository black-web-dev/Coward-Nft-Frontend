import * as React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

const socials = [
    {
        name: 'discord', link: 'https://discord.gg/tBN5QV6e',
    },
    {
        name: 'tiktok', link: 'https://www.tiktok.com/@sonsofmarsnft'
    },
    {
        name: 'instagram', link: 'https://www.instagram.com/sonsofmars.nft/'
    },
    {
        name: 'twitter', link: 'https://twitter.com/sonsofmarsnft'
    }
]

const handleSocialLink = (link: string) => () => {
    // notify('warning', `please link the ${link}`);
    window.open(link, '_blank');
}

function footerSection() {
    const router = useRouter();
    const pathname = router.pathname;
    return (
        <>
            <footer id='footer' className='footer bg-white pt-8'>
                <div className='footer-container flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='text-lg md:text-3xl text-center font-bold text-slate-500 p-2 tracking-widest'>PROJECTS THAT OUR</div>
                        <div className='text-lg md:text-3xl text-center font-bold text-slate-500 p-2 tracking-widest'>ARTISTS HAVE WORKED ON</div>
                    </div>
                    <div className='w-full flex flex-col sm:flex-row items-center justify-center'>
                        <div className='relative w-[200px] h-[100px] mx-4'>
                            <Image src={'/images/footer/1.png'} layout='fill' objectFit='scale-down' />
                        </div>
                        <div className='relative w-[200px] h-[100px] mx-4'>
                            <Image src={'/images/footer/2.png'} layout='fill' objectFit='scale-down' />
                        </div>
                        <div className='relative w-[200px] h-[100px] mx-4'>
                            <Image src={'/images/footer/3.png'} layout='fill' objectFit='scale-down' />
                        </div>
                        <div className='relative w-[200px] h-[100px] mx-4'>
                            <Image src={'/images/footer/4.png'} layout='fill' objectFit='scale-down' />
                        </div>
                    </div>
                    <div className='text-xs md:text-lg text-center text-slate-500 pt-4'>
                        © 2022 - 2022 www.sonsofmars.io - All Rights Reserved.
                    </div>
                </div>
            </footer>
        </>
    )
}
export default footerSection;