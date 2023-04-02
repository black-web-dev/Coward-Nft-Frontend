import Image from 'next/image';
import * as React from 'react';
import BorderComponent from '../layout/borderComponent';

function AboutSection() {
	return (
		<div id='about' className='about relative flex flex-col items-center bg-black'>
			<div className='w-full h-full flex items-center justify-center bg-[url("/images/about/banner.png")] bg-cover bg-center p-10 md:p-20 text-[#b2040d] text-3xl md:text-8xl font-bold'>
				<div className=''>WIN</div>
				<div className='relative w-[100px] h-[100px]'>
					<Image src={'/images/about/eth.png'} layout='fill' objectFit='fill' />
				</div>
				<div className=''>200</div>
			</div>
			<div className='relative w-full flex flex-col md:flex-row items-center justify-end mb-10'>
				<div className='w-full md:absolute left-0'>
					<div className='relative w-[600px] h-[700px] flex items-center justify-start'>
						<Image className='top-0 left-0' src={'/images/about/head.png'} layout='fill' objectFit='scale-down' />
					</div>
				</div>
				<div className='w-full flex items-center justify-center md:w-[700px] p-12 md:p-24 md:mr-24'>
					<div className='backdrop-blur-sm'>
						<BorderComponent className='p-8'>
							<div className='flex flex-col items-center justify-center'>
								<div className='text-2xl md:text-3xl font-bold p-4 md:p-10'>
									Battle Royale X NFTS
								</div>
								<div className='text-[#E9F3FC] text-base md:text-xl text-justify leading-10'>
									Sons Of Mars is a battle royale game with a difference - it mixes Russian Roulette style gameplay with digital collectibles that can be traded and sold like any other NFT. This innovative game combines the best of both worlds, giving players the chance to not only collect and trade rare and valuable items, but also to compete against each other in one intense battle to win a grand prize of 200ETH. With its unique mix of gameplay, Sons Of Mars is sure to appeal to both collectors and gamers alike.
								</div>
							</div>
						</BorderComponent>
					</div>
				</div>
			</div>
		</div>
	)
}
export default AboutSection;