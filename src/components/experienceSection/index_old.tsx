import * as React from 'react';
import Image from 'next/image';

const rounds = [
	{ rate: 5, round: 1, amount: 278, type: 'Silver' },
	{ rate: 10, round: 2, amount: 528, type: 'Black Marble' },
	{ rate: 15, round: 3, amount: 712, type: 'Faded Glass' },
	{ rate: 20, round: 4, amount: 807, type: 'Limestone' },
	{ rate: 25, round: 5, amount: 807, type: 'Cream Marble' },
	{ rate: 30, round: 6, amount: 727, type: 'Iron' },
	{ rate: 35, round: 7, amount: 594, type: 'Copper' },
	{ rate: 40, round: 8, amount: 441, type: 'Rusted Copper' },
	{ rate: 45, round: 9, amount: 297, type: 'Bule Marble' },
	{ rate: 50, round: 10, amount: 182, type: 'Red Marble' },
	{ rate: 55, round: 11, amount: 100, type: 'Black & Gold Accented Marble' },
	{ rate: 60, round: 12, amount: 49, type: 'Gold' },
	{ rate: 65, round: 13, amount: 21, type: 'Gold' },
	{ rate: 70, round: 14, amount: 8, type: 'Opal' },
	{ rate: 75, round: 15, amount: 3, type: 'Lava Marble' },
]

function ExperienceSection() {
	return (
		<div id='experience' className='experience relative flex flex-col items-center'>
			<div className='header z-10 w-full flex justify-center items-center py-8 aos-animate' data-aos="fade-up">
				<div className='text-3xl sm:text-5xl text-center text-white font-bold'>EXPERIENCE</div>
			</div>
			<div className='w-full'>
				<div className='flex items-center justify-start flex-row sm:flex-col md:flex-row lg:flex-row sm:px-20'>
					<div className='absolute right-[-400px] top-0 w-[800px] h-[800px] gradient-radial' data-aos="fade-left">
					</div>
					<div className='absolute right-0 w-[450px] h-[600px]' data-aos="fade-left">
						<Image src={'/images/experience/background.webp'} layout='fill' objectFit='fill' />
					</div>
					<div className='z-10 w-full md:w-3/4 p-10 sm:p-20 h-full flex flex-col items-start justify-start text-base text-white break-all tracking-wider text-center sm:text-left' data-aos="fade-right">
						<p>
							At SOM we are huge fans of Battle Royale and love the climactic nature of the genre—that's why we want to make an authentic BR experience that feels unique, exciting and native to the OpenSea platform.
						</p>
						<div className='py-4'></div>
						<p>
							The experience of season 1 will have no direct input from the holder other than the initial purchase and choices of when to buy and sell. The choices of who survives and dies will at all times be made by Oracle Chainlink using a randomisation software that is secure and safe.
						</p>
						<div className='py-4'></div>
						<p>
							The experience will occur a week after token reveals and a few weeks after the mint date. It will take 40 days to find our winner and 15 fight events with an increasing death rate of 5% extra per fight round.
						</p>
					</div>
				</div>
				{/* <div className='w-full bg-gradient-to-b from-black via-red-800 to-black px-12 py-10 sm:py-28'>
					<div className='text-center text-3xl font-bold py-8'>15 Fight Rounds</div>
					<div className='w-full h-full flex flex-col sm:flex-row items-start justify-center'>
						<div className='w-full sm:w-fit flex flex-col items-center sm:items-start justify-start p-2'>
							<div className='flex item-center py-2'>Death Ragte %</div>
							<div className='sm:h-[100px] flex flex-col items-center sm:items-start justify-center'>
								<div className=''>Fight Round:</div>
								<div className=''>Death Toll</div>
								<div className=''>Death State Type</div>
							</div>
						</div>
						<div className='flex-1 flex flex-wrap justify-center item-center'>
							{
								rounds.map(item => (
									<div key={item.rate} className='flex flex-col items-center justify-center p-2'>
										<div className='py-2'>{item.rate}%</div>
										<div className='w-[150px] h-[100px] flex flex-col items-center justify-center bg-white text-black'>
											<div className='text-xl font-bold'>{item.round}</div>
											<div className='text-center'>{item.amount}</div>
											<div className='text-center'>{item.type}</div>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</div> */}
			</div>
		</div >
	)
}
export default ExperienceSection;