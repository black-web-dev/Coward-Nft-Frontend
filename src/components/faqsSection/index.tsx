import React from "react";
import clsx from "clsx";
import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper";
import BorderComponent from "../layout/borderComponent";

const slide = [1, 2, 3, 4, 5];
const text = [
    {
        title: 'How to get one or more SOM NFT?',
        content:
            <>
                <p>You will be able to purchase a SOM NFT from our website when the public sale goes live July 30th at 2 PM EST. Once you mint your token a random unrevealed warrior will be delivered to your Metamask wallet. You will then be able to see it on the OpenSea marketplace.</p>
                <div className='py-2' />
                <p>Once all SOMs have been minted, the only way to buy SOM will be on OpenSea.</p>
                <div className='py-2' />
                <p>You will be able to purchase a SOM NFT from our website when the public sale goes live July 30th at 2 PM EST. Once you mint your token a random unrevealed warrior will be delivered to your Metamask wallet. You will then be able to see it on the OpenSea marketplace.</p>
                <div className='py-2' />
                <p>Once all SOMs have been minted, the only way to buy SOM will be on OpenSea.</p>
            </>
    },
    {
        title: 'What is the total supply of SOM NFTs?',
        content: <p>There will be 5555 SOM NFTs originally minted on the Ethereum blockchain. Once the experience has finished, there will be a qualifying period where holders may burn their NFT in return for free entry into the Season 2 experience. Once the qualifying period has ended, the remaining SOM NFTs will be known as the official holders of Season 1.</p>
    },
    {
        title: 'What is a death state?',
        content: <p>Throughout the course of the experience, there will be 15 elimination rounds where a certain percentage of NFTs will ‘die’. What this means is that your token’s metadata will be changed on the blockchain so that your original token will be transformed into one of several unique death states. The death state of your token will be rendition of your lifelike warrior turned into a Romanesque statue. </p>
    },
    {
        title: 'What happens if my NFT dies?',
        content:
            <>
                <p>Your NFT is almost assured to die. There will be only one out of the whole collection that stays ‘living’. However, this is where the true holder’s experience begins. Once your character is dead it will automatically be memorialised as a statue and have instant utility.</p>
                <div className='py-2' />
                <p>At the end of the experience, 5 random NFTs that have died will be offered a prize for their service to the God Of War. This will occur at the same time the eventual winner is announced.</p>
            </>
    },
    {
        title: 'AIf I win, how will I get paid?',
        content:
            <>
                <p>If your warrior is the sole survivor of the experience, the team will place an offer of 200 ETH for your NFT on OpenSea. You will then have a choice. Keep the winning token or sell for a life-changing amount.</p>
                <div className='py-2' />
                <p>If your warrior is in a death state, you stand a chance to be bought out as well.5 random holders will receive an offer for 5 ETH at the same time as the sole survivor.</p>
            </>
    },
    {
        title: 'Will I have any input in the experience?',
        content: <p>Your purchase of the NFT is the start of a wild ride. Where you choose whether to stay in the experience or sell based on the likelihood of proceeding into the next rounds. There are otherwise no specific controls available to a holder. The code will act on the will of Mars and his will is absolute. </p>
    },
    {
        title: 'Will the code be fair?',
        content:
            <>
                <p>We are working and collaborating with industry leaders in the web3 space.This has led us to Oracle Chainlink who will act as the backbone of our randomised code.This means you can be assured that the code will be fair and open source.</p>
                <div className='py-2' />
                <p>We also pledge that none of the individuals in the team will own any SOM token and any tokens owned by the project for giveaways will be distributed before the final battle is fought.</p>
            </>
    },
    {
        title: 'What does holding an SOM get me?',
        content:
            <>
                <p>The experience offered by holding SOM is unlike anything in the NFT space.That said, after the experience we plan to continually break the mould in our journey to becoming one of the most well-known entertainment brands in the world.</p>
                <div className='py-2' />
                <p>SOM holders get the choice to burn their NFT for season 2; a choice that will lead down two distinctly different paths.</p>
                <div className='py-2' />
                <p>Keep your Season 1 NFT</p>
                <div className='py-2' />
                <p>- You will be a part of the season 1 community which have a say in the allocation of the secondary market sales and storyline decisions.</p>
                <div className='py-2' />
                <p>- You will also be in the front row seat as the storyline of SOM gets told through graphic novels, games & screen adaptions.</p>
                <div className='py-2' />
                <p>Burn your Season 1 NFT</p>
                <div className='py-2' />
                <p>- You will be gain free entry into the thrilling experience Season 2 has to offer.However, you will sacrifice the utility of being a Season 1 holder.</p>
            </>
    }
]
function FaqsSection() {
    const [seletedDiv, setSelecteDiv] = React.useState(0);
    const handleClick = (id: any) => () => {
        setSelecteDiv(id)
    }
    return (
        <div id='faqs' className='faqs relative w-full flex flex-col items-center bg-black bg-fixed bg-no-repeat bg-cover pb-10'>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                loopFillGroupWithBlank={true}
                modules={[Autoplay, Pagination]}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                }}
                className="mySwiper"
            >
                {
                    slide.map(item => {
                        return (
                            <SwiperSlide key={item}>
                                <img src={`/images/faq/${item}.png`} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className='z-10 w-full md:w-4/5 p-6 md:p-20'>
                <BorderComponent className='p-8'>
                    <div className="text-5xl text-white font-bold text-center py-2">FAQ</div>
                    {
                        text.map((item: any, key: any) => {
                            return (
                                <div key={key} className={clsx('faqs-wrapper my-4', seletedDiv == key ? 'active' : '')}>
                                    <BorderComponent className='p-3'>
                                        <button role="button" className='z-10 relative w-full flex flex-col flex-1 overflow-hidden items-stretch justify-center bg-transparent border-transparent text-left border-0 p-0 cursor-pointer border-solid' onClick={handleClick(key)}>
                                            <div className="faq-qs flex justify-between items-center p-2">
                                                <div className="faq-title w-[98%] breal-all tracking-wide text-base sm:text-xl pr-8 text-white">
                                                    {item.title}
                                                </div>
                                                <span className={clsx("faq-arrow bg-transparent text-[#b6373d] rounded-full w-8 h-8 flex items-center justify-center origin-center ease-linear transition-all", seletedDiv == key ? '-rotate-0' : 'rotate-180')}>
                                                    <ArrowCircleDownIcon className="block h-6 w-6" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </button>
                                        <div className={clsx("faqs-answer breal-all tracking-wide text-sm md:text-base sm:text-base text-center sm:text-left text-white overflow-hidden border-[#b6373d] ease-linear transition-all px-6", seletedDiv == key ? 'h-auto py-6 border-t' : 'h-0 py-0')}>
                                            {item.content}
                                        </div>
                                    </BorderComponent>
                                </div>
                            )
                        })
                    }
                </BorderComponent>
            </div>
        </div>
    )
}
export default FaqsSection;