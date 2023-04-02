import * as React from 'react';
import { useRouter } from 'next/router';
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
            <footer id='footer' className='footer'>
                <div className='footer-container flex justify-between items-center mx-16'>
                    <div className='infos'>
                        {
                            pathname !== '/' ? (
                                <Link href='/'>
                                    <img className='w-[80px] cursor-pointer' src={'/images/logo.webp'} />
                                </Link>
                            ) : (
                                <ScrollLink to={'home'} spy={true} smooth={true}>
                                    <img className='w-[80px] cursor-pointer' src={'/images/logo.webp'} />
                                </ScrollLink>
                            )
                        }
                    </div>
                    <div className="right flex items-center justify-center ">
                        <div className="items-center justify-center flex">
                            {
                                socials.map(item => (
                                    <div key={item.name} className='cursor-pointer rounded-lg border-transparent border-2 hover:border-2 hover:border-white px-4 py-2' onClick={handleSocialLink(item.link)}>
                                        <img className='w-6 h-6' src={`./images/socials/${item.name}.svg`} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default footerSection;