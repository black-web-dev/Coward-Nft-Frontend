import * as React from 'react';
import Image from 'next/image';
import Config from '@/config/app';
import BorderComponent from '../layout/borderComponent';

function JourneySection() {
	return (
		<div id='journey' className='journey relative flex flex-col items-center'>
			<div className='relative w-full h-[250px] bg-[url("/images/journey/banner.png")] bg-cover bg-center py-10 md:py-20'>
				<div className='absolute top-0 w-full h-full'>
					<div className='w-full h-full flex flex-col items-center justify-center'>
						<div className='text-center text-white text-xl md:text-3xl tracking-widest font-bold pb-4 md:pb-10'>
							FOLLOW THE JOURNEY
						</div>
						<div className='w-full flex items-center justify-center pt-4'>
							<div className='relative w-20 h-20 mx-4'>
								<a href={Config.twitter} target='_blank'>
									<Image src={'/images/journey/twitter.png'} layout='fill' objectFit='scale-down' />
								</a>
							</div>
							<div className='relative w-20 h-20 mx-4'>
								<a href={Config.instagram} target='_blank'>
									<Image src={'/images/journey/instagram.png'} layout='fill' objectFit='scale-down' />
								</a>
							</div>
							<div className='relative w-20 h-20 mx-4'>
								<a href={Config.discord} target='_blank'>
									<Image src={'/images/journey/discord.png'} layout='fill' objectFit='scale-down' />
								</a>
							</div>
							<div className='relative w-20 h-20 mx-4'>
								<a href={Config.tiktok} target='_blank'>
									<Image src={'/images/journey/tiktok.png'} layout='fill' objectFit='scale-down' />
								</a>
							</div>
						</div>
					</div>
				</div >
			</div >
			<div className='relative w-full flex flex-col lg:flex-row items-start justify-center p-8 md:p-28'>
				<div className='w-full h-full p-2 my-4'>
					<div className='backdrop-blur-sm'>
						<BorderComponent className='p-4'>
							<div className='flex flex-col items-center justify-center'>
								<div className='w-full flex items-center justify-start'>
									<div className='text-2xl md:text-4xl font-bold py-2'>BATTLE</div>
								</div>
								<div className='w-full flex items-center justify-end'>
									<div className='relative w-[300px] h-[200px]'>
										<Image src={'/images/journey/warrior1.png'} objectFit='scale-down' layout='fill' />
									</div>
								</div>
								<div className='uppercase text-[#E9F3FC] text-base md:text-lg text-justify leading-10 h-full lg:h-[500px] pt-4'>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											The first on-chain NFT experience drops on OpenSea.
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											The battle begins when the 5555th token is sold.
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											15 Fight rounds commence over 40 days. 5% more die each round until there is only one left alive
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											4 Statues Receive 5ETH Airdrop
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											1 winner receives an offer up to 200ETH
										</div>
									</div>
								</div>
							</div>
						</BorderComponent>
					</div>
				</div>
				<div className='w-full h-full p-2 my-4'>
					<div className='backdrop-blur-sm'>
						<BorderComponent className='p-4'>
							<div className='flex flex-col items-center justify-center'>
								<div className='w-full flex items-center justify-start'>
									<div className='text-2xl md:text-4xl font-bold py-2'>BURN</div>
								</div>
								<div className='w-full flex items-center justify-end'>
									<div className='relative w-[300px] h-[200px]'>
										<Image src={'/images/journey/warrior2.png'} objectFit='scale-down' layout='fill' />
									</div>
								</div>
								<div className='uppercase text-base md:text-lg text-justify leading-10 h-full lg:h-[500px] pt-4'>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											Preparation for Season 2 & Graphic Novel begins. Season 2 Introduces new timelines, continued storylines & larger prizes.
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											Holders of Season 1 can choose to hold their Season 1 token or burn it.
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											Should they burn it, they recieve a season 2 warrior.
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											Should they hold, they will receive passive income with royalties on the graphic novel.
										</div>
									</div>
								</div>
							</div>
						</BorderComponent>
					</div>
				</div>
				<div className='w-full h-full p-2 my-4'>
					<div className='backdrop-blur-sm'>
						<BorderComponent className='p-4'>
							<div className='flex flex-col items-center justify-center'>
								<div className='w-full flex items-center justify-start'>
									<div className='text-2xl md:text-4xl font-bold py-2'>BEYOND</div>
								</div>
								<div className='w-full flex items-center justify-end'>
									<div className='relative w-[300px] h-[200px]'>
										<Image src={'/images/journey/warrior3.png'} objectFit='scale-down' layout='fill' />
									</div>
								</div>
								<div className='uppercase text-base md:text-lg text-justify leading-10 h-full lg:h-[500px] pt-4'>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											Sons Of Mars prepares to launch in all areas of pop-culture.
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											Using the war chest funds from the seasons the SOM team gather the team to build graphic novels, real life events, metaverse battle royale games & scripts for television/movie adaptions.
										</div>
									</div>
									<div className='py-2'></div>
									<div className='flex items-start'>
										<img className='w-[40px] pt-3.5 md:pt-2 lg:pt-2' src='./images/journey/arrow.png' />
										<div>
											Each season tied to a pop culture entity, holders become the investors in the sons of mars machine.
										</div>
									</div>
								</div>
							</div>
						</BorderComponent>
					</div>
				</div>
			</div>
		</div >
	)
}
export default JourneySection;