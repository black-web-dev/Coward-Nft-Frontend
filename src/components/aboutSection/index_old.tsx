import Image from 'next/image';
import * as React from 'react';

function AboutSection() {
	return (
		<div id='about' className='about relative flex flex-col items-center bg-black bg-fixed bg-no-repeat bg-cover'>
			<div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-70'></div>
			<div className='header z-10 w-full flex justify-center items-center py-8 bg-black aos-animate' data-aos="fade-up">
				<div className='text-3xl sm:text-5xl text-center text-white font-bold'>ABOUT</div>
			</div>
			<div className='z-10 flex items-center flex-col lg:flex-row sm:px-20 sm:pb-20'>
				<div id='aos-animation-1-1' className='description relative sm:w-full text-center lg:text-left lg:w-3/5 mx-8 text-base sm:text-xl p-4 sm:p-12' data-aos="fade-up" >
					<p className=''>
						The year is 50AD, the city of Rome and 5555 fathers, sons, and brothers arise with blood in their eyes. The roman God of War, Mars, is looking for his champion. He has chosen his combatants, and they will fight until the winner is found.
					</p>
					<div className='my-8'></div>
					<p className=''>
						SOM is an NFT collection unlike any other you have ever seen. 5555 Roman warriors will fight in the arena of OpenSea via a secure randomised code. Over 40 days, all but one of the warriors will perish and forever be transformed into a classic Roman statue. The last one standing will be crowned Mars Incarnate. After the experience, the owner of Mars Incarnate has a fateful decision to make; either they hold onto their victorious NFT or sell it back to the project for 200 ETH.
					</p>
				</div>
				<div id='aos-animation-1-2' className='about-right relative mx-12 md:mx-0 w-[400px] h-[400px]' data-aos="fade-down" >
					<Image src={'/images/about/head.webp'} layout='fill' objectFit='fill' />
				</div>
			</div>
		</div>
	)
}
export default AboutSection;