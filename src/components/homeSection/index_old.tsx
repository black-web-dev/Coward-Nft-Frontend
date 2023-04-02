import * as React from 'react';
import Image from 'next/image';
import ConnectWallet from '@/components/connectWallet';

function HomeSection() {
	return (
		<div className='section h-full w-full'>
			<div className='landing-section h-full w-full'>
				<div id='home' className='home relative flex items-center justify-center flex-col w-full h-screen bg-[url("/images/home/home_blank.webp")] bg-cover bg-center' data-aos="fade-up">
					<div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-30'></div>
					<div className='w-full h-full relative flex justify-center items-center'>
						<div className='z-10 w-4/5 flex flex-col items-start justify-center px-4'>
							<div className='w-full flex items-center justify-center sm:justify-start'>
								<div className='text-2xl'>WELCOME TO</div>
							</div>
							<div className='relative flex items-start justify-center w-full md:w-3/5 h-20 xl:h-40 my-12'>
								<Image src={'/images/home/som.webp'} layout='fill' objectFit='scale-down' />
							</div>
							<div className='w-3/5 text-left text-sm sm:text-lg'>
								<p>The <b>first Battle Royale </b>NFT experience native to OpenSea, where a unique randomised code will determine the fate of 5555 warriors. The last one alive is offered <b>200ETH</b>.</p>
							</div>
							<div className='action w-full flex items-start justify-start mt-12' data-aos="fade-up">
								{/* <ConnectWallet /> */}
								<a className='flex items-center justify-center rounded-[50px] border-2 border-white font-bold text-base sm:text-2xl transaction-all duration-100 px-6 py-2 sm:px-8 sm:py-4 backdrop-blur-sm bg-[#1d9cef] hover:shadow-lg hover:shadow-[#1d9cef]' target='_blank' href='https://twitter.com/sonsofmarsnft'>
									<div>Join Us on</div>
									<div className='ml-2'>
										<img className='w-6 h-6' src={`./images/socials/twitter.svg`} />
									</div>
								</a>
							</div>
						</div>
						<div className='absolute right-0 bottom-0 w-1/2 sm:w-2/5 h-3/5 md:h-2/3 lg:h-3/4'>
							<Image className='animate-slide' src={'/images/home/character.webp'} layout='fill' objectFit='scale-down' />
							<Image className='animate-slideRevert' src={'/images/home/characterMarbre.webp'} layout='fill' objectFit='scale-down' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HomeSection;